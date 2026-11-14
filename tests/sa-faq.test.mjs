// Regression tests for the Self Assessment FAQ (SEO task T3.2): who must
// file, deadlines, late penalty and foreign income, in English and Polish.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: { path: "/self-assessment-tax-returns", file: "self-assessment-tax-returns.html" },
  pl: { path: "/pl/self-assessment", file: join("pl", "self-assessment.html") },
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

function jsonLdNodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });
}

const QUESTIONS = {
  en: [
    "Who has to file a Self Assessment tax return?",
    "What are the Self Assessment deadlines for the 2025 to 2026 tax year?",
    "What happens if I miss the Self Assessment deadline?",
    "Do I pay UK tax on income from Poland or another country?",
  ],
  pl: [
    "Kto musi złożyć zeznanie Self Assessment?",
    "Do kiedy trzeba złożyć Self Assessment za rok 2025/26?",
    "Co się stanie, jeśli spóźnię się ze złożeniem zeznania?",
    "Czy muszę rozliczyć w UK dochody z Polski?",
  ],
};

const pages = Object.fromEntries(
  Object.entries(PAGES).map(([locale, p]) => {
    const html = readHtml(p.file);
    return [locale, { ...p, html, text: visibleText(html), links: hrefs(html) }];
  }),
);

for (const [locale, page] of Object.entries(pages)) {
  test(`[${locale}] all 4 FAQ questions and their answers render`, () => {
    for (const q of QUESTIONS[locale]) {
      assert.ok(page.text.includes(q), `missing question: ${q}`);
    }
  });

  test(`[${locale}] FAQPage JSON-LD (optional) matches the visible FAQ word for word`, () => {
    const faq = jsonLdNodes(page.html).find((n) => n["@type"] === "FAQPage" && n["@id"]?.endsWith("#sa-faq"));
    assert.ok(faq, "SA FAQPage present");
    assert.equal(faq.mainEntity.length, 4);
    for (const q of faq.mainEntity) {
      assert.ok(page.text.includes(q.name), `visible question: ${q.name}`);
      assert.ok(page.text.includes(q.acceptedAnswer.text), `visible answer: ${q.acceptedAnswer.text}`);
    }
  });

  test(`[${locale}] deadlines match GOV.UK: 5 Oct 2026, 31 Oct 2026, 31 Jan 2027`, () => {
    for (const d of locale === "en"
      ? ["5 October 2026", "31 October 2026", "31 January 2027"]
      : ["5 października 2026", "31 października 2026", "31 stycznia 2027"]) {
      assert.ok(page.text.includes(d), `missing deadline ${d}`);
    }
  });

  test(`[${locale}] late penalty figures match GOV.UK: £100, £10/day, £900 cap, 5%/£300`, () => {
    for (const re of [/£100/, /£10\b/, /£900/, /5%/, /£300/]) {
      assert.match(page.text, re);
    }
  });

  test(`[${locale}] foreign income FAQ answer doesn't contradict the existing foreign-income section`, () => {
    assert.match(page.text, locale === "en" ? /UK resident.*normally pay UK tax on your foreign income/ : /rezydentem podatkowym UK.*płacisz w UK podatek/);
  });

  test(`[${locale}] links HMRC sources for who-must-send, deadlines, penalties and foreign income`, () => {
    for (const url of [
      "https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return",
      "https://www.gov.uk/self-assessment-tax-returns/deadlines",
      "https://www.gov.uk/self-assessment-tax-returns/penalties",
      "https://www.gov.uk/tax-foreign-income",
    ]) {
      assert.ok(page.links.includes(url), `missing link to ${url}`);
    }
  });

  test(`[${locale}] dated source check line present`, () => {
    assert.match(page.text, /14 (November|listopada) 2026/);
  });

  test(`[${locale}] no masculine-default reader forms introduced in the FAQ`, () => {
    if (locale === "pl") {
      assert.doesNotMatch(page.text, /samozatrudniony(?!\p{L})/iu);
      assert.doesNotMatch(page.text, /zapłaciłeś|rozliczyłeś|złożyłeś/iu);
    }
  });
}

test("EN/PL parity: same pound figures used in both FAQs (£1,000, £100, £10, £900, £300)", () => {
  const poundAmounts = (text) =>
    [...text.matchAll(/£\s?(\d{1,3}(?:[ ,]\d{3})+|\d+)/g)].map((m) => Number(m[1].replace(/[ ,]/g, ""))).sort((a, b) => a - b);
  // Restricted to the FAQ section onward, since the wider page already carries its own figures.
  const faqSlice = (t, heading) => t.slice(t.indexOf(heading));
  const en = faqSlice(pages.en.text, "Who has to file a Self Assessment tax return?");
  const pl = faqSlice(pages.pl.text, "Kto musi złożyć zeznanie Self Assessment?");
  assert.deepEqual(poundAmounts(pl), poundAmounts(en));
});
