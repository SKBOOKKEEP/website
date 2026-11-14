// Regression tests for the "sole trader vs limited company" comparison
// section (SEO task T3.3), on both Self Assessment pages. Reads prerendered
// HTML. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const routes = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8")).routes;
const limitedCompany = routes.find((r) => r.key === "limitedCompany");

const PAGES = {
  en: { file: "self-assessment-tax-returns.html" },
  pl: { file: join("pl", "self-assessment.html") },
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

  test(`[${locale}] sole trader vs limited company comparison section is present`, () => {
    assert.ok(html.includes('id="sole-trader-vs-ltd"'), "section id present");
    assert.ok(html.includes('data-testid="sole-trader-vs-ltd"'), "section data-testid present");
  });

  test(`[${locale}] table covers liability, how profits are taxed, and what must be filed`, () => {
    const section = html.match(/data-testid="sole-trader-vs-ltd"[\s\S]*?<\/section>/)[0];
    const sectionText = visibleText(`<body>${section}`);
    for (const term of locale === "en"
      ? ["Liability", "How profits are taxed", "What must be filed", "unlimited liability", "limited liability", "Corporation Tax", "Self Assessment", "CT600"]
      : ["Odpowiedzialność", "opodatkowany jest zysk", "Co trzeba złożyć", "nieograniczona", "ograniczona", "Corporation Tax", "Self Assessment", "CT600"]) {
      assert.ok(sectionText.includes(term), `missing "${term}"`);
    }
  });

  test(`[${locale}] "general information, not tax advice" and a checked date`, () => {
    assert.match(text, locale === "en" ? /general information, not tax advice/ : /informacje ogólne.*nie stanowi porady podatkowej/);
    assert.match(text, /14 (November|listopada) 2026/);
  });

  test(`[${locale}] never recommends one structure over the other`, () => {
    assert.doesNotMatch(
      text,
      /\b(should|recommend|best to|better to) (choose|form|set up|register as|go with) (a |an )?(sole trader|limited company|Ltd)\b/i,
    );
    assert.doesNotMatch(text, /(polecam|rekomenduję|lepiej (założyć|wybrać)) (spółkę|sole trader)/i);
    assert.match(
      text,
      locale === "en"
        ? /not a recommendation to choose one structure over another/
        : /nie jest to rekomendacja wyboru jednej formy działalności nad drugą/,
    );
  });

  test(`[${locale}] links to the Limited company accounts page and the GOV.UK source`, () => {
    assert.ok(links.includes(limitedCompany[locale].path), "limited company link");
    assert.ok(links.includes("https://www.gov.uk/business-legal-structures"), "GOV.UK source link");
  });
}
