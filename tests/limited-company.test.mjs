// Regression tests for the Limited company accounts pages (SEO task T2.7):
// EN /limited-company-accounts and PL /pl/rozliczenia-spolek-ltd. Reads the
// prerendered HTML from `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "limited-company-accounts.html",
    path: "/limited-company-accounts",
    home: "index.html",
    title: "Limited Company Accounts & Corporation Tax | Sabina Krajewska",
    h1: "Limited company accounts and Corporation Tax",
    disclaimer:
      /This page gives general information, not tax advice\.[^<]*? Figures checked on 13 November 2026\./,
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "rozliczenia-spolek-ltd.html"),
    path: "/pl/rozliczenia-spolek-ltd",
    home: "pl.html",
    title: "Rozliczenia spółek Ltd i Corporation Tax | Sabina Krajewska",
    h1: "Rozliczenia spółek Ltd i Corporation Tax",
    disclaimer:
      /Ta strona zawiera informacje ogólne i nie stanowi porady podatkowej\.[^<]*? Dane sprawdzone 13 listopada 2026 r\.(?!\.)/,
    inLanguage: "pl-PL",
  },
};

function readHtml(file) {
  const full = join(APP_DIR, file);
  assert.ok(existsSync(full), `Missing prerendered ${file} — run \`npm run build\` first`);
  return readFileSync(full, "utf8");
}

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;| | /g, " ")
    .replace(/\s+/g, " ")
    .trim();

function visibleText(html) {
  const body = html.slice(html.indexOf("<body"));
  return decode(
    body
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<!--[\s\S]*?-->/g, ""),
  );
}

function jsonLdNodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });
}

const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

for (const [locale, p] of Object.entries(PAGES)) {
  const html = readHtml(p.file);
  const text = visibleText(html);

  test(`[${locale}] title, meta description, canonical and single H1`, () => {
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]);
    assert.equal(title, p.title);
    assert.ok(title.length <= 66, `title is ${title.length} chars`);
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
    assert.match(description, /Corporation Tax|CT600/);
    assert.ok(description.length <= 160, `description is ${description.length} chars`);
    assert.ok(html.includes(`<link rel="canonical" href="${SITE}${p.path}"/>`), "self-canonical");
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
    assert.deepEqual(h1s, [p.h1]);
  });

  test(`[${locale}] JSON-LD: WebPage, BreadcrumbList, Service tie to one #business; no Offer or price`, () => {
    const nodes = jsonLdNodes(html);
    const business = `${SITE}/#business`;
    const byType = (t) => nodes.filter((n) => n["@type"] === t);

    const [webPage] = byType("WebPage");
    assert.ok(webPage, "WebPage");
    assert.equal(webPage.about?.["@id"], business);
    assert.equal(webPage.inLanguage, p.inLanguage);
    assert.equal(webPage.url, `${SITE}${p.path}`);
    assert.equal(webPage.dateModified, "2026-11-13");

    const [crumbs] = byType("BreadcrumbList");
    assert.ok(crumbs, "BreadcrumbList");
    assert.deepEqual(
      crumbs.itemListElement.map((i) => i.item),
      [locale === "en" ? SITE : `${SITE}/pl`, `${SITE}${p.path}`],
    );

    const [service] = byType("Service");
    assert.ok(service, "Service");
    assert.equal(service.provider?.["@id"], business);

    const businesses = nodes.filter((n) => /AccountingService|LocalBusiness|Organization/.test(n["@type"]));
    assert.equal(businesses.length, 1);
    assert.equal(businesses[0]["@id"], business);

    assert.doesNotMatch(JSON.stringify(nodes), /"Offer"|"offers"|"price"|"priceSpecification"/);
  });

  test(`[${locale}] FAQPage schema matches the visible FAQ word for word`, () => {
    const faq = jsonLdNodes(html).find((n) => n["@type"] === "FAQPage");
    assert.ok(faq, "FAQPage");
    assert.ok(faq.mainEntity.length >= 5);
    for (const q of faq.mainEntity) {
      assert.ok(text.includes(q.name), `visible question: ${q.name}`);
      assert.ok(text.includes(q.acceptedAnswer.text), `visible answer: ${q.acceptedAnswer.text}`);
    }
  });

  test(`[${locale}] "general information, not tax advice" disclaimer with the checked date`, () => {
    assert.match(text, p.disclaimer);
  });

  test(`[${locale}] explains accounts (Companies House) vs Corporation Tax / CT600 (HMRC) with real deadlines`, () => {
    assert.match(text, /Companies House/);
    assert.match(text, /CT600/);
    assert.match(text, /Corporation Tax/);
    // Deadlines fetched live from GOV.UK (checked 2026-11-13): first accounts 21 months,
    // later accounts 9 months, CT600 12 months, CT payment 9 months and 1 day.
    assert.match(text, locale === "en" ? /21 months/ : /21 miesięcy/);
    assert.match(text, locale === "en" ? /9 months after/ : /9 miesięcy od/);
    assert.match(text, locale === "en" ? /12 months after the end/ : /12 miesięcy od zakończenia/);
    assert.match(text, locale === "en" ? /9 months and 1 day/ : /9 miesięcy i 1 dzień/);
    assert.match(text, /£1[.,]5 m/);
  });

  test(`[${locale}] links to the live GOV.UK pages the deadlines were checked against`, () => {
    const links = hrefs(html);
    for (const url of [
      "https://www.gov.uk/prepare-file-annual-accounts-for-limited-company/filing-your-accounts",
      "https://www.gov.uk/pay-corporation-tax",
      "https://www.gov.uk/company-tax-returns/deadlines",
      "https://www.gov.uk/running-a-limited-company/company-and-accounting-records",
    ]) {
      assert.ok(links.includes(url), `missing link to ${url}`);
    }
  });

  test(`[${locale}] offers only the three confirmed services: accounts, CT600, tax planning`, () => {
    assert.match(text, /CT600/);
    assert.match(text, locale === "en" ? /tax planning/i : /planowanie podatkowe/i);
    // No invented extra services such as payroll or company formation on this page.
    assert.doesNotMatch(text, /payroll/i);
  });

  test(`[${locale}] remote only, no invented credentials, no HMRC agent claim`, () => {
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
    assert.doesNotMatch(text, /as your agent|on your behalf as|HMRC[- ]authorised agent|registered (HMRC )?agent|jako Twój agent|agent HMRC/i);
    assert.doesNotMatch(text, /\b(ACCA|ACA|AAT|CIMA|FCCA|CTA)\b/);
  });

  test(`[${locale}] no software brand names, no made-up figures`, () => {
    const brands = /\b(Xero|QuickBooks|Sage|FreeAgent|FreshBooks|Zoho|Pandle|Coconut|IRIS|TaxCalc)\b/i;
    assert.doesNotMatch(text, brands);
    assert.doesNotMatch(JSON.stringify(jsonLdNodes(html)), brands);
    assert.doesNotMatch(JSON.stringify(jsonLdNodes(html)), /"Offer"|"offers"|"price"/);
  });

  test(`[${locale}] home page Services card links to this page`, () => {
    assert.match(
      readHtml(p.home),
      new RegExp(`<a href="${p.path}"[^>]*>(?:(?!</a>)[\\s\\S])*<h3[^>]*>(Limited Company Accounts|Spółki Limited \\(Ltd\\))`),
    );
  });
}

test("EN/PL parity: same deadlines and £ figures on both pages", () => {
  const en = visibleText(readHtml(PAGES.en.file));
  const pl = visibleText(readHtml(PAGES.pl.file));
  const amounts = (t) =>
    [...t.matchAll(/£\s?(\d{1,3}(?:[ ,.]\d{3})*(?:[.,]\d+)?)\s?(m|mln)?/g)]
      .map((m) => `${m[1].replace(",", ".")}${m[2] ? "m" : ""}`)
      .sort();
  assert.deepEqual(amounts(pl), amounts(en));
  const months = (t) => [...new Set(t.match(/\b\d{1,2} months?\b/gi) ?? [])].length + [...new Set(t.match(/\b\d{1,2} miesi/gi) ?? [])].length;
  assert.ok(months(en) > 0 && months(pl) > 0);
});
