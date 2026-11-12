// Route map integrity (SEO tasks T2.12 and T1.10). Every published pair is
// built, cross-linked by the language switcher and hreflang, and in the
// sitemap; unpublished (reserved) slugs appear nowhere.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");
const { routes } = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8"));
const published = routes.filter((r) => r.published);
const unpublished = routes.filter((r) => !r.published);
const HREFLANG = { en: "en-GB", pl: "pl-PL" };

const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);
const read = (f) => readFileSync(join(APP_DIR, f), "utf8");
const abs = (path) => `${SITE}${path === "/" ? "" : path}`;
const sitemap = () => read("sitemap.xml.body");

/** Every published single-locale page: { route, locale, path, html } */
const pages = published.flatMap((route) =>
  ["en", "pl"]
    .filter((l) => route[l])
    .map((locale) => ({ route, locale, path: route[locale].path })),
);

test("route map: keys and paths are unique; every path is lower-case and slash-led", () => {
  const keys = routes.map((r) => r.key);
  assert.equal(new Set(keys).size, keys.length, "duplicate key");
  const paths = routes.flatMap((r) => ["en", "pl"].filter((l) => r[l]).map((l) => r[l].path));
  assert.equal(new Set(paths).size, paths.length, "duplicate path");
  for (const p of paths) assert.match(p, /^\/[a-z0-9/-]*$/, `bad path ${p}`);
  for (const r of routes) if (r.pl) assert.ok(r.pl.path === "/pl" || r.pl.path.startsWith("/pl/"), `PL path ${r.pl.path}`);
});

test("protected slugs are unchanged", () => {
  const sa = routes.find((r) => r.key === "selfAssessment");
  assert.equal(sa.en.path, "/self-assessment-tax-returns");
  assert.equal(sa.pl.path, "/pl/self-assessment");
  assert.ok(sa.published);
});

test("published routes have a real lastModified date", () => {
  for (const r of published) assert.match(r.lastModified ?? "", /^\d{4}-\d{2}-\d{2}$/, r.key);
});

for (const { route, locale, path } of pages) {
  test(`${path}: prerendered, self-canonical, hreflang pair, switcher to its partner`, () => {
    const file = fileFor(path);
    assert.ok(existsSync(join(APP_DIR, file)), `missing build output for ${path}`);
    const html = read(file);
    assert.ok(html.includes(`<link rel="canonical" href="${abs(path)}"/>`), "self-canonical");

    const other = locale === "en" ? "pl" : "en";
    if (route[other]) {
      for (const l of ["en", "pl"]) {
        assert.ok(
          html.includes(`hrefLang="${HREFLANG[l]}" href="${abs(route[l].path)}"`),
          `hreflang ${HREFLANG[l]} → ${route[l].path}`,
        );
      }
      assert.ok(html.includes(`hrefLang="x-default" href="${abs(route.en.path)}"`), "x-default → EN page");
      // Visible switcher: the other language link points at the partner page.
      assert.match(
        html,
        new RegExp(`<a href="${route[other].path}"[^>]*hrefLang="${HREFLANG[other]}"`),
        `switcher ${other.toUpperCase()} → ${route[other].path}`,
      );
    }
  });

  test(`${path}: in the sitemap`, () => {
    assert.ok(sitemap().includes(`<loc>${abs(path)}</loc>`));
  });
}

test("sitemap lists exactly the published pages", () => {
  const locs = [...sitemap().matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
  assert.deepEqual(locs, pages.map((p) => abs(p.path)).sort());
});

for (const route of unpublished) {
  test(`unpublished ${route.key}: not built, not linked, not in sitemap`, () => {
    for (const l of ["en", "pl"]) {
      if (!route[l]) continue;
      const path = route[l].path;
      assert.ok(!existsSync(join(APP_DIR, fileFor(path))), `${path} should not be built yet`);
      assert.ok(!sitemap().includes(abs(path)), `${path} in sitemap`);
      for (const p of pages) {
        assert.ok(!read(fileFor(p.path)).includes(`href="${path}"`), `${p.path} links to unpublished ${path}`);
      }
    }
  });
}

test("inner pages highlight their own nav item, not Home", () => {
  const html = read(fileFor("/self-assessment-tax-returns"));
  assert.match(html, /<a href="\/self-assessment-tax-returns" class="[^"]*border-b-2 border-primary/);
  assert.doesNotMatch(html, /<a href="\/" class="[^"]*border-b-2 border-primary/);
});
