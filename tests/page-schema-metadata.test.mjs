// Page-level structured data, privacy social tags, meta keywords and favicon.
// Reads prerendered output from `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");
const { routes } = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8"));

const pages = routes
  .filter((r) => r.published)
  .flatMap((r) =>
    ["en", "pl"]
      .filter((l) => r[l])
      .map((l) => ({ key: r.key, kind: r.kind, locale: l, path: r[l].path })),
  );
const homePath = { en: "/", pl: "/pl" };
const abs = (p) => (p === "/" ? SITE : `${SITE}${p}`);
const fileFor = (p) => (p === "/" ? "index.html" : `${p.slice(1)}.html`);

const read = (p) => {
  const f = join(APP_DIR, fileFor(p));
  assert.ok(existsSync(f), `Missing prerendered ${p} — run \`npm run build\` first`);
  return readFileSync(f, "utf8");
};
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").trim();
const meta = (html, attr, key) =>
  decode(html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1]);
const nodes = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(
    (m) => {
      const j = JSON.parse(m[1]);
      return j["@graph"] ?? [j];
    },
  );
const byType = (ns, t) => ns.filter((n) => n["@type"] === t);

for (const page of pages) {
  const label = `${page.path} (${page.locale})`;

  test(`${label}: no meta keywords tag`, () => {
    assert.doesNotMatch(read(page.path), /<meta name="keywords"/);
  });

  test(`${label}: business has one canonical URL, logo, no page language`, () => {
    const [business] = nodes(read(page.path)).filter((n) => n["@id"] === `${SITE}/#business`);
    assert.equal(business.url, SITE, "same business URL in every language");
    assert.equal(business.inLanguage, undefined, "language belongs on WebPage, not the business");
    assert.equal(business.logo, `${SITE}/logo.png`);
    assert.deepEqual(business.sameAs, ["https://www.facebook.com/profile.php?id=61569974506640"], "official Facebook page");
  });

  test(`${label}: one WebSite node shared across languages`, () => {
    const sites = byType(nodes(read(page.path)), "WebSite");
    assert.equal(sites.length, 1);
    assert.equal(sites[0]["@id"], `${SITE}/#website`);
    assert.equal(sites[0].url, SITE);
    assert.deepEqual(sites[0].publisher, { "@id": `${SITE}/#business` });
  });

  test(`${label}: WebPage matches canonical URL and html lang`, () => {
    const html = read(page.path);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const lang = html.match(/<html[^>]*lang="([^"]+)"/)?.[1];
    const webPages = byType(nodes(html), "WebPage");
    assert.equal(webPages.length, 1, "exactly one WebPage");
    const wp = webPages[0];
    assert.equal(wp.url, canonical);
    assert.equal(wp["@id"], `${canonical}#webpage`);
    assert.equal(wp.inLanguage, lang);
    assert.ok(wp.name && wp.name.length > 3, "WebPage has a name");
    assert.deepEqual(wp.isPartOf, { "@id": `${SITE}/#website` });
    assert.deepEqual(wp.about, { "@id": `${SITE}/#business` });
  });

  test(`${label}: breadcrumb on inner pages only, ending at this page`, () => {
    const ns = nodes(read(page.path));
    const crumbs = byType(ns, "BreadcrumbList");
    if (page.kind === "home") {
      assert.equal(crumbs.length, 0);
      return;
    }
    assert.equal(crumbs.length, 1);
    const items = crumbs[0].itemListElement;
    assert.equal(items.length, 2);
    assert.deepEqual(items.map((i) => i.position), [1, 2]);
    assert.equal(items[0].item, abs(homePath[page.locale]));
    assert.equal(items[1].item, abs(page.path));
    const wp = byType(ns, "WebPage")[0];
    assert.deepEqual(wp.breadcrumb, { "@id": crumbs[0]["@id"] });
  });
}

for (const locale of ["en", "pl"]) {
  test(`${locale} privacy: own og/twitter tags, not the home page's`, () => {
    const path = locale === "en" ? "/privacy-policy" : "/pl/privacy-policy";
    const html = read(path);
    const home = read(homePath[locale]);
    assert.equal(meta(html, "property", "og:url"), abs(path));
    assert.notEqual(meta(html, "property", "og:title"), meta(home, "property", "og:title"));
    assert.match(meta(html, "property", "og:title"), locale === "en" ? /Privacy/ : /prywatności/);
    const img = meta(html, "property", "og:image");
    assert.ok(img?.startsWith(`${abs(path)}/opengraph-image`), `privacy og:image is its own: ${img}`);
    assert.doesNotMatch(meta(html, "property", "og:image:alt") ?? "", /15/, "no consultation length");
    assert.equal(meta(html, "name", "twitter:title"), meta(html, "property", "og:title"));
    assert.equal(meta(html, "name", "twitter:card"), "summary_large_image");
  });
}

test("favicon.ico is a real small ICO", () => {
  const ico = readFileSync(join(process.cwd(), "app", "favicon.ico"));
  assert.deepEqual([...ico.subarray(0, 4)], [0, 0, 1, 0], "ICO header");
  assert.ok(ico.length < 15_000, `favicon is ${ico.length} bytes`);
  const count = ico.readUInt16LE(4);
  const sizes = Array.from({ length: count }, (_, i) => ico[6 + i * 16] || 256);
  assert.ok(sizes.includes(32), `has a 32px image (has ${sizes})`);
});
