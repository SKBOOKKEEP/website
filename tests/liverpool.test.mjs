// Liverpool page pair (SEO task T2.4): EN /bookkeeping-liverpool and
// PL /pl/ksiegowa-liverpool. Not a doorway: it states plainly that the
// practice is based in St Helens and serves Liverpool and Merseyside
// remotely; no Liverpool office, street address, map, prices or second
// business entity; links only to published pages.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const BUSINESS_ID = `${SITE}/#business`;
const AML_SOURCE = "https://www.gov.uk/guidance/money-laundering-regulations-who-needs-to-register";
const APP_DIR = join(process.cwd(), ".next", "server", "app");
const { routes } = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8"));
const route = routes.find((r) => r.key === "liverpool");

const read = (f) => {
  const p = join(APP_DIR, f);
  assert.ok(existsSync(p), `Missing prerendered ${f} — run \`npm run build\` first`);
  return readFileSync(p, "utf8");
};
const fileFor = (path) => `${path.slice(1)}.html`;
const main = (html) => {
  const m = html.match(/<main[\s\S]*?<\/main>/);
  assert.ok(m, "<main> present");
  return m[0];
};
/** Visible text of <main> (tags and JSON-LD stripped, whitespace collapsed). */
const text = (html) =>
  main(html)
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<!-- -->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
const meta = (html, attr, key) => html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1];
const titleOf = (html) => html.match(/<title>([^<]*)<\/title>/)[1];
const jsonLdNodes = (html) => {
  const out = [];
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      out.push(v);
      Object.values(v).forEach(walk);
    }
  };
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    walk(JSON.parse(m[1]));
  }
  return out;
};

const PAGES = {
  en: {
    lang: "en-GB",
    sa: "/self-assessment-tax-returns",
    office: /\boffices?\b/i,
    basedIn: /based in St Helens, not in Liverpool itself/,
    serves: /work with Liverpool and Merseyside businesses remotely/,
    remote: /phone, video call and email/,
    disclaimer: /general information, not tax advice/,
  },
  pl: {
    lang: "pl-PL",
    sa: "/pl/self-assessment",
    office: /\bbiur(o|a|ze|em|ach)?\b/i,
    basedIn: /Działam w St Helens, a nie w samym Liverpoolu/,
    serves: /współpracuję z firmami z Liverpoolu i Merseyside zdalnie/,
    remote: /telefon, wideorozmowy i e-mail/,
    disclaimer: /nie stanowi porady podatkowej/,
  },
};

test("liverpool route is published with a real lastModified date", () => {
  assert.equal(route.published, true);
  assert.equal(route.lastModified, "2026-11-12");
  assert.equal(route.en.path, "/bookkeeping-liverpool");
  assert.equal(route.pl.path, "/pl/ksiegowa-liverpool");
});

for (const [locale, p] of Object.entries(PAGES)) {
  const path = route[locale].path;
  const file = fileFor(path);

  test(`${path}: prerendered with lang, self-canonical and reciprocal hreflang + x-default`, () => {
    const html = read(file);
    assert.match(html, new RegExp(`<html lang="${p.lang}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${SITE}${path}"/>`), "self-canonical");
    assert.ok(html.includes(`hrefLang="en-GB" href="${SITE}${route.en.path}"`), "hreflang en-GB");
    assert.ok(html.includes(`hrefLang="pl-PL" href="${SITE}${route.pl.path}"`), "hreflang pl-PL");
    assert.ok(html.includes(`hrefLang="x-default" href="${SITE}${route.en.path}"`), "x-default → EN");
  });

  test(`${path}: in the sitemap`, () => {
    assert.ok(read("sitemap.xml.body").includes(`<loc>${SITE}${path}</loc>`));
  });

  test(`${path}: unique title/description and its own og:image`, () => {
    const html = read(file);
    const title = titleOf(html);
    const description = meta(html, "name", "description");
    assert.match(title, /Liverpool/);
    assert.match(description, /Liverpool/);
    assert.match(description, /St Helens/, "description is honest about the base");
    const others = ["index.html", "pl.html", "self-assessment-tax-returns.html", join("pl", "self-assessment.html")];
    const other = locale === "en" ? route.pl.path : route.en.path;
    others.push(fileFor(other));
    for (const o of others) {
      const oh = read(o);
      assert.notEqual(title, titleOf(oh), `title differs from ${o}`);
      assert.notEqual(description, meta(oh, "name", "description"), `description differs from ${o}`);
    }
    assert.ok(meta(html, "property", "og:image")?.startsWith(`${SITE}${path}/opengraph-image`), "own og:image");
  });

  test(`${path}: says Liverpool, Merseyside and based in St Helens`, () => {
    const body = text(read(file));
    assert.match(body, /Liverpool/);
    assert.match(body, /Merseyside/);
    assert.match(body, /St Helens/);
    assert.match(body, p.basedIn, "based-in-St-Helens statement");
    assert.match(body, p.serves, "serves Liverpool and Merseyside remotely");
    assert.match(body, /St Helens, WA9/);
  });

  test(`${path}: no Liverpool office, street address, full postcode, map, visit or prices`, () => {
    const html = read(file);
    const body = text(html);
    assert.doesNotMatch(body, p.office, "no office claim");
    assert.doesNotMatch(body, /WA9\s?\d[A-Z]{2}/, "no full postcode");
    assert.doesNotMatch(body, /\bL\d{1,2}\s?\d[A-Z]{2}\b/, "no Liverpool postcode");
    assert.doesNotMatch(
      body,
      /\d+[A-Za-z]?\s+[A-Z][a-z]+\s+(Road|Street|Lane|Avenue|Close|Drive|Way|Rd|St)\b/,
      "no street address",
    );
    assert.doesNotMatch(body, /\bvisit|pop in|drop in|our premises|odwiedź|zapraszam do/i);
    assert.doesNotMatch(html, /<iframe|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|openstreetmap/i, "no map embed");
    assert.doesNotMatch(html, /streetAddress/);
    assert.doesNotMatch(body, /£\s?\d|\d\s?(zł|PLN)\b/, "no prices or figures");
    assert.match(body, p.remote, "remote working stated");
    assert.match(body, p.disclaimer, "general information disclaimer");
  });

  test(`${path}: AML statement cites GOV.UK`, () => {
    const m = main(read(file));
    assert.ok(m.includes(`href="${AML_SOURCE}"`), "GOV.UK source link");
  });

  test(`${path}: links to Self Assessment, booking and contact; unpublished pages not linked`, () => {
    const m = main(read(file));
    assert.ok(m.includes(`href="${p.sa}"`), `links to ${p.sa}`);
    const home = locale === "pl" ? "/pl" : "/";
    assert.ok(m.includes(`href="${home}#booking"`), "booking CTA");
    assert.ok(m.includes(`href="${home}#contact"`), "contact CTA");
    assert.ok(m.includes(`href="tel:+447312026090"`), "phone CTA");
    for (const key of ["stHelens", "bookkeeping", "mtdIncomeTax", "limitedCompany", "payroll", "hmrcSupport"]) {
      const r = routes.find((x) => x.key === key);
      const linked = m.includes(`href="${r[locale].path}"`);
      assert.equal(linked, r.published, `${key} linked only when published`);
    }
  });

  test(`${path}: one #business entity; page schema only references it`, () => {
    const nodes = jsonLdNodes(read(file));
    const defs = nodes.filter((n) => n["@id"] === BUSINESS_ID && Object.keys(n).length > 1);
    assert.equal(defs.length, 1, "exactly one #business definition");
    const types = nodes.map((n) => n["@type"]).filter(Boolean);
    assert.equal(types.filter((t) => /LocalBusiness|AccountingService|Organization/.test(t)).length, 1);
    const page = nodes.find((n) => n["@type"] === "WebPage");
    assert.ok(page, "WebPage node");
    assert.equal(page.url, `${SITE}${path}`);
    assert.deepEqual(page.about, { "@id": BUSINESS_ID });
    assert.equal(page.inLanguage, p.lang);
    assert.ok(nodes.some((n) => n["@type"] === "BreadcrumbList"), "BreadcrumbList node");
    assert.equal(page.areaServed, undefined, "no page-level areaServed");
  });
}

test("EN and PL pages switch to each other and appear in each footer", () => {
  const en = read(fileFor(route.en.path));
  const pl = read(fileFor(route.pl.path));
  assert.match(en, new RegExp(`<a href="${route.pl.path}"[^>]*hrefLang="pl-PL"`));
  assert.match(pl, new RegExp(`<a href="${route.en.path}"[^>]*hrefLang="en-GB"`));
  assert.ok(read("index.html").includes(`href="${route.en.path}"`), "EN home footer links the page");
  assert.ok(read("pl.html").includes(`href="${route.pl.path}"`), "PL home footer links the page");
});
