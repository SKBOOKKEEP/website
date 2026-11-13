// PL-only "UK-wide Polish accountant" page (SEO task T4.2): /pl/polska-ksiegowa-uk.
// No English equivalent. Not a doorway: states plainly that the practice is
// registered in St Helens and works UK-wide remotely, including Greater
// Manchester, with no Manchester office; explains how remote working, document
// sharing and HMRC support actually work, and only references services that
// already have their own pages. No second business entity, no Liverpool/
// Manchester office claim, no prices or testimonials.
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
const route = routes.find((r) => r.key === "polishUk");
const PATH = "/pl/polska-ksiegowa-uk";

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

test("polishUk route is published, PL-only (no en pair), with a real lastModified date", () => {
  assert.equal(route.published, true);
  assert.equal(route.lastModified, "2026-11-13");
  assert.equal(route.pl.path, PATH);
  assert.equal(route.en, undefined, "no English pair for this route");
});

test(`${PATH}: prerendered with lang pl-PL and self-canonical`, () => {
  const html = read(fileFor(PATH));
  assert.match(html, /<html lang="pl-PL"/);
  assert.ok(html.includes(`<link rel="canonical" href="${SITE}${PATH}"/>`), "self-canonical");
});

test(`${PATH}: PL-only route has no reciprocal hreflang <link> pair (no en page to point at)`, () => {
  const html = read(fileFor(PATH));
  // There is no English counterpart, so lib/routes.ts#languageAlternates
  // returns {} for this route and no <link rel="alternate" hrefLang=...>
  // metadata tags are emitted at all (no fabricated x-default/en-GB
  // pointing at a page that doesn't carry this content). This mirrors how
  // every other single-locale route in content/routes.json is already
  // handled. The NavBar's EN language-switcher link (which always falls
  // back to the EN home page) still renders, and that is expected.
  assert.doesNotMatch(html, /<link[^>]*hrefLang/, "no alternate-language <link> tags");
});

test(`${PATH}: in the sitemap`, () => {
  assert.ok(read("sitemap.xml.body").includes(`<loc>${SITE}${PATH}</loc>`));
});

test(`${PATH}: unique title/description and its own og:image`, () => {
  const html = read(fileFor(PATH));
  const title = titleOf(html);
  const description = meta(html, "name", "description");
  assert.match(title, /Wielkiej Brytanii|UK/i);
  assert.match(description, /St Helens/, "description is honest about the base");
  const others = ["pl.html", join("pl", "ksiegowa-liverpool.html"), join("pl", "ksiegowa-st-helens.html")];
  for (const o of others) {
    const oh = read(o);
    assert.notEqual(title, titleOf(oh), `title differs from ${o}`);
    assert.notEqual(description, meta(oh, "name", "description"), `description differs from ${o}`);
  }
  assert.ok(meta(html, "property", "og:image")?.startsWith(`${SITE}${PATH}/opengraph-image`), "own og:image");
});

test(`${PATH}: states St Helens base, UK-wide remote service, and Greater Manchester clients`, () => {
  const body = text(read(fileFor(PATH)));
  assert.match(body, /St Helens, WA9/);
  assert.match(body, /Greater Manchester/);
  assert.match(body, /Wielkiej Brytanii/);
  assert.match(body, /zdalnie/);
});

test(`${PATH}: says plainly there is no Manchester office (does not dodge it)`, () => {
  const body = text(read(fileFor(PATH)));
  assert.match(body, /nie mam biura w Manchesterze/i, "plain no-Manchester-office statement");
});

test(`${PATH}: explains how remote working works in practice (calls, documents, signatures)`, () => {
  const body = text(read(fileFor(PATH)));
  assert.match(body, /wideorozmow/i, "video calls described");
  assert.match(body, /elektronicznie|elektroniczn/i, "digital document sharing described");
  assert.match(body, /[Pp]odpis/i, "signatures described");
});

test(`${PATH}: lists documents a client needs to send`, () => {
  const body = text(read(fileFor(PATH)));
  assert.match(body, /[Ff]aktur/);
  assert.match(body, /wyciąg/i, "bank statements mentioned");
});

test(`${PATH}: links to HMRC support instead of duplicating it`, () => {
  const m = main(read(fileFor(PATH)));
  assert.ok(m.includes(`href="/pl/pomoc-hmrc"`), "links to the HMRC support page");
  // The compliance-check detail lives on that page, not repeated here.
  assert.doesNotMatch(text(m), /compliance check|kontrol[ai] HMRC krok po kroku/i);
});

test(`${PATH}: no street address, full postcode, map, visit, prices, testimonials or Manchester/Liverpool office claim`, () => {
  const html = read(fileFor(PATH));
  const body = text(html);
  assert.doesNotMatch(body, /\bbiur(o|a|ze|em|ach)? w Liverpoolu\b/i, "no Liverpool office claim");
  assert.doesNotMatch(body, /WA9\s?\d[A-Z]{2}/, "no full postcode");
  assert.doesNotMatch(
    body,
    /\d+[A-Za-z]?\s+[A-Z][a-z]+\s+(Road|Street|Lane|Avenue|Close|Drive|Way|Rd|St)\b/,
    "no street address",
  );
  assert.doesNotMatch(body, /\bvisit|pop in|drop in|our premises|odwiedź|zapraszam do/i);
  assert.doesNotMatch(html, /<iframe|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|openstreetmap/i, "no map embed");
  assert.doesNotMatch(html, /streetAddress/);
  assert.doesNotMatch(body, /£\s?\d|\d\s?(zł|PLN)\b/, "no prices or figures");
  assert.doesNotMatch(body, /opini[ae]|recenzj|testimonial/i, "no testimonials");
  assert.doesNotMatch(body, /gwarant/i, "no absolute-guarantee language");
  assert.doesNotMatch(body, /ACCA|AAT|CIMA|agent HMRC/i, "no invented credentials");
  assert.match(body, /nie stanowi porady podatkowej/, "general information disclaimer");
});

test(`${PATH}: AML statement cites GOV.UK`, () => {
  const m = main(read(fileFor(PATH)));
  assert.ok(m.includes(`href="${AML_SOURCE}"`), "GOV.UK source link");
});

test(`${PATH}: only links to services that are actually offered and published`, () => {
  const m = main(read(fileFor(PATH)));
  assert.ok(m.includes(`href="/pl#booking"`), "booking CTA");
  assert.ok(m.includes(`href="/pl#contact"`), "contact CTA");
  assert.ok(m.includes(`href="tel:+447312026090"`), "phone CTA");
  for (const key of ["selfAssessment", "bookkeeping", "mtdIncomeTax", "limitedCompany", "hmrcSupport", "stHelens", "liverpool"]) {
    const r = routes.find((x) => x.key === key);
    const linked = m.includes(`href="${r.pl.path}"`);
    assert.equal(linked, r.published, `${key} linked only when published`);
  }
  // Payroll is unpublished and not one of the services named for this page.
  const payroll = routes.find((x) => x.key === "payroll");
  assert.ok(!m.includes(`href="${payroll.pl.path}"`), "payroll not linked");
});

test(`${PATH}: one #business entity; page schema only references it, no page-level areaServed`, () => {
  const nodes = jsonLdNodes(read(fileFor(PATH)));
  const defs = nodes.filter((n) => n["@id"] === BUSINESS_ID && Object.keys(n).length > 1);
  assert.equal(defs.length, 1, "exactly one #business definition");
  const types = nodes.map((n) => n["@type"]).filter(Boolean);
  assert.equal(types.filter((t) => /LocalBusiness|AccountingService|Organization/.test(t)).length, 1);
  const page = nodes.find((n) => n["@type"] === "WebPage");
  assert.ok(page, "WebPage node");
  assert.equal(page.url, `${SITE}${PATH}`);
  assert.deepEqual(page.about, { "@id": BUSINESS_ID });
  assert.equal(page.inLanguage, "pl-PL");
  assert.ok(nodes.some((n) => n["@type"] === "BreadcrumbList"), "BreadcrumbList node");
  assert.equal(page.areaServed, undefined, "no page-level areaServed");
});

test("PL home footer links the UK-wide page", () => {
  assert.ok(read("pl.html").includes(`href="${PATH}"`), "PL home footer links the page");
});

test(`${PATH}: no masculine 'samozatrudniony' singular or gendered past-tense reader forms`, () => {
  const html = read(fileFor(PATH));
  assert.doesNotMatch(html, /samozatrudniony(?!\p{L})/iu);
  assert.doesNotMatch(
    html,
    /(?<!\p{L})(byłeś|musiałeś|miałeś|powinieneś|dostałeś)(?!\p{L})/iu,
  );
});

test(`${PATH}: no 'siedziba' anywhere (there is no office to call one)`, () => {
  assert.doesNotMatch(read(fileFor(PATH)), /siedzib/i);
});
