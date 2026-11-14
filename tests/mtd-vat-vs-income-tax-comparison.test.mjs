// Regression tests for the "MTD for VAT vs MTD for Income Tax" comparison
// section (SEO task T3.3) on the MTD for Income Tax guide. Reads prerendered
// HTML. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const routes = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8")).routes;
const bookkeeping = routes.find((r) => r.key === "bookkeeping");

const PAGES = {
  en: { file: "making-tax-digital-income-tax.html" },
  pl: { file: join("pl", "making-tax-digital-income-tax.html") },
};

function readHtml(file) {
  const full = join(APP_DIR, file);
  assert.ok(existsSync(full), `Missing prerendered ${file} — run \`npm run build\` first`);
  return readFileSync(full, "utf8");
}

function visibleText(html) {
  const body = html.slice(html.indexOf("<body"));
  return body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;| | /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

for (const [locale, p] of Object.entries(PAGES)) {
  const html = readHtml(p.file);
  const text = visibleText(html);
  const links = hrefs(html);

  test(`[${locale}] MTD VAT vs Income Tax comparison section is present`, () => {
    assert.ok(html.includes('id="mtd-vat-vs-income-tax"'), "section id present");
    assert.ok(html.includes('data-testid="mtd-vat-vs-income-tax"'), "section data-testid present");
  });

  test(`[${locale}] table covers who's covered, what's mandatory now, and what you send`, () => {
    const section = html.match(/data-testid="mtd-vat-vs-income-tax"[\s\S]*?<\/section>/)[0];
    const sectionText = visibleText(`<body>${section}`);
    for (const term of locale === "en"
      ? ["MTD for VAT", "MTD for Income Tax", "every VAT-registered business", "1 April 2022", "VAT Return", "quarterly update"]
      : ["MTD dla VAT", "MTD for Income Tax", "Każdą firmę zarejestrowaną do VAT", "1 kwietnia 2022", "Deklarację VAT", "Aktualizację kwartalną"]) {
      assert.ok(sectionText.includes(term), `missing "${term}"`);
    }
  });

  test(`[${locale}] reuses the exact MTD for Income Tax cohort thresholds/dates (no re-derivation)`, () => {
    const section = html.match(/data-testid="mtd-vat-vs-income-tax"[\s\S]*?<\/section>/)[0];
    const sectionText = visibleText(`<body>${section}`);
    for (const [amount, start] of [
      [/£50[ ,]000/, /6 (April|kwietnia) 2026/],
      [/£30[ ,]000/, /6 (April|kwietnia) 2027/],
      [/£20[ ,]000/, /6 (April|kwietnia) 2028/],
    ]) {
      assert.match(sectionText, amount);
      assert.match(sectionText, start);
    }
  });

  test(`[${locale}] "general information, not tax advice" and a checked date`, () => {
    assert.match(text, /general information, not tax advice|nie stanowi porady podatkowej/);
    assert.match(text, /14 (November|listopada) 2026/);
  });

  test(`[${locale}] links to Bookkeeping & VAT and the VAT MTD notice on GOV.UK`, () => {
    assert.ok(links.includes(bookkeeping[locale].path), "bookkeeping link");
    assert.ok(
      links.includes("https://www.gov.uk/government/publications/vat-notice-70022-making-tax-digital-for-vat"),
      "VAT notice link",
    );
  });

  test(`[${locale}] never claims everyone/all must use MTD for Income Tax`, () => {
    for (const re of [
      /\b(all|every) (self[- ]employed|sole traders?|landlords?|freelancers?)\b/i,
      /\beveryone (who is self[- ]employed|must|has to|needs to)\b/i,
      /\b(applies|is mandatory) (to|for) (everyone|all)\b/i,
    ]) {
      assert.doesNotMatch(text, re);
    }
  });
}
