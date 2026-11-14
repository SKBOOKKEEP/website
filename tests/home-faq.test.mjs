// Regression tests for the Home page FAQ (SEO task T3.2): EN / and PL /pl.
// Reads the prerendered HTML from `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: { file: "index.html", path: "/" },
  pl: { file: "pl.html", path: "/pl" },
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

const EXPECTED = {
  en: {
    heading: "Frequently asked questions",
    faqs: [
      {
        question: "How much does a bookkeeper or accountant cost?",
        answer:
          "Fees are not published; they are agreed after the free introductory call, once Sabina knows what you need.",
      },
      {
        question: "Do you work in English and Polish?",
        answer:
          "Yes. I work remotely with clients across the UK, in English or Polish, whichever you prefer.",
      },
    ],
  },
  pl: {
    heading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Ile kosztuje księgowa?",
        answer:
          "Cennika nie publikuję — wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, kiedy poznam Twoje potrzeby.",
      },
      {
        question: "Czy obsługujecie klientów z całej Wielkiej Brytanii?",
        answer:
          "Sabina Krajewska to polskojęzyczna księgowa z St Helens, która zdalnie obsługuje klientów z całej Wielkiej Brytanii: księgowość, VAT, Self Assessment, płace i korespondencję z HMRC.",
      },
    ],
  },
};

for (const [locale, p] of Object.entries(PAGES)) {
  const html = readHtml(p.file);
  const text = visibleText(html);
  const expected = EXPECTED[locale];

  test(`[${locale}] home FAQ heading and both questions render with exact answers`, () => {
    assert.ok(text.includes(expected.heading), "FAQ heading");
    for (const f of expected.faqs) {
      assert.ok(text.includes(f.question), `question: ${f.question}`);
      assert.ok(text.includes(f.answer), `answer: ${f.answer}`);
    }
  });

  test(`[${locale}] home FAQ has no invented fee figures`, () => {
    const faqStart = text.indexOf(expected.heading);
    assert.ok(faqStart > 0);
    const section = text.slice(faqStart, faqStart + 600);
    assert.doesNotMatch(section, /£\s?\d/);
  });

  test(`[${locale}] FAQPage JSON-LD (optional) matches the visible FAQ word for word`, () => {
    const faq = jsonLdNodes(html).find((n) => n["@type"] === "FAQPage");
    assert.ok(faq, "FAQPage present");
    assert.equal(faq.mainEntity.length, expected.faqs.length);
    for (const q of faq.mainEntity) {
      assert.ok(text.includes(q.name), `visible question: ${q.name}`);
      assert.ok(text.includes(q.acceptedAnswer.text), `visible answer: ${q.acceptedAnswer.text}`);
    }
  });

  test(`[${locale}] page never claims FAQ/rich-result guarantees`, () => {
    assert.doesNotMatch(
      text,
      /rich result|rich snippet|featured snippet|guarantee[sd]? (a |to )?(rank|rich|appear)|gwarantuj\S* (wynik|pozycj)/i,
    );
  });
}

test("EN/PL parity: same cost fact (fees agreed after the free call, no figures)", () => {
  const en = visibleText(readHtml("index.html"));
  const pl = visibleText(readHtml("pl.html"));
  assert.match(en, /Fees are not published.*agreed after the free introductory call/);
  assert.match(pl, /Cennika nie publikuję.*po bezpłatnej rozmowie wstępnej/);
});

test("no FAQ copy anywhere on the site claims a promised or guaranteed rich result", () => {
  for (const file of [
    "index.html",
    "pl.html",
    "bookkeeping-vat.html",
    join("pl", "ksiegowosc-vat.html"),
    "self-assessment-tax-returns.html",
    join("pl", "self-assessment.html"),
    "making-tax-digital-income-tax.html",
    join("pl", "making-tax-digital-income-tax.html"),
    "limited-company-accounts.html",
    join("pl", "rozliczenia-spolek-ltd.html"),
  ]) {
    const html = readHtml(file);
    const text = visibleText(html);
    assert.doesNotMatch(
      text,
      /rich result|rich snippet|featured snippet|guarantee[sd]? (a |to )?(rank|rich|appear)|gwarantuj\S* (wynik|pozycj)/i,
      `${file} must not promise a rich result`,
    );
  }
});
