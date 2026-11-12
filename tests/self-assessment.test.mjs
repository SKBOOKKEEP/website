// Regression tests for the Self Assessment pages (EN + PL).
//
// These read the prerendered HTML that `next build` writes to
// .next/server/app, so they check what is actually served (SSR output),
// not just source objects. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

const ROUTES = {
  en: { path: "/self-assessment-tax-returns", file: "self-assessment-tax-returns.html" },
  pl: { path: "/pl/self-assessment", file: join("pl", "self-assessment.html") },
};

function readHtml(file) {
  const full = join(APP_DIR, file);
  assert.ok(existsSync(full), `Missing prerendered ${file} — run \`npm run build\` first`);
  return readFileSync(full, "utf8");
}

/** Visible body text: tags stripped, entities decoded, whitespace collapsed. */
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
    .replace(/&nbsp;| | /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hrefs(html) {
  return [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
}

/** Pound amounts normalised to integers, e.g. "£50,000" / "£50 000" -> 50000. */
function poundAmounts(text) {
  return [...text.matchAll(/£\s?(\d{1,3}(?:[ ,]\d{3})+|\d+)/g)]
    .map((m) => Number(m[1].replace(/[ ,]/g, "")))
    .sort((a, b) => a - b);
}

/** Split into rough sentences so a number can be checked in its own context. */
function sentences(text) {
  return text.split(/(?<=[.!?])\s+/);
}

const pages = Object.fromEntries(
  Object.entries(ROUTES).map(([locale, r]) => {
    const html = readHtml(r.file);
    return [locale, { ...r, html, text: visibleText(html), links: hrefs(html) }];
  }),
);

for (const [locale, page] of Object.entries(pages)) {
  test(`[${locale}] £150,000 is never presented as a current filing trigger`, () => {
    for (const s of sentences(page.text)) {
      if (/150[ ,]?000/.test(s)) {
        assert.match(
          s,
          /2024\/25/,
          `£150,000 mentioned without the 2024/25 change context: "${s}"`,
        );
      }
    }
  });

  // £1,000 is valid only as the sole-trader trigger or the property allowance /
  // rental-income bands (T2.6) — never as a blanket "untaxed income" threshold.
  test(`[${locale}] £1,000 is only used for sole-trader income or the property allowance`, () => {
    for (const s of sentences(page.text)) {
      if (/£\s?1[ ,]?000(?!\d|[ ,]\d)/.test(s)) {
        assert.match(
          s,
          /sole trader|property allowance|rental|najm/i,
          `£1,000 used outside the sole-trader / property-allowance context: "${s}"`,
        );
      }
    }
    assert.doesNotMatch(page.text, /untaxed income (of |over |above )?£\s?1[ ,]?000/i);
  });

  test(`[${locale}] HICBC is a trigger only when not paid through PAYE`, () => {
    assert.match(page.text, /High Income Child Benefit Charge[^.]*PAYE/);
  });

  test(`[${locale}] removed company-director blanket criterion`, () => {
    assert.doesNotMatch(page.text, /Company directors and shareholders|Dyrektorzy i udziałowcy spółek/);
  });

  test(`[${locale}] links HMRC's eligibility checker and source pages`, () => {
    for (const url of [
      "https://www.gov.uk/check-if-you-need-tax-return",
      "https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return",
      "https://www.gov.uk/self-assessment-tax-returns/deadlines",
      "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax",
      "https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax",
      "https://www.gov.uk/guidance/find-out-if-you-can-get-an-exemption-from-making-tax-digital-for-income-tax",
    ]) {
      assert.ok(page.links.includes(url), `missing link to ${url}`);
    }
  });

  test(`[${locale}] MTD for Income Tax cohorts use strict "over" thresholds with correct years`, () => {
    const t = page.text;
    for (const [amount, basis, start] of [
      [/50[ ,]000/, "2024/25", /6 (April|kwietnia) 2026/],
      [/30[ ,]000/, "2025/26", /6 (April|kwietnia) 2027/],
      [/20[ ,]000/, "2026/27", /6 (April|kwietnia) 2028/],
    ]) {
      assert.match(t, amount);
      assert.ok(t.includes(basis), `missing basis year ${basis}`);
      assert.match(t, start);
    }
    assert.doesNotMatch(t, /at least £|co najmniej £/i);
    assert.match(t, locale === "en" ? /over £50,000/i : /ponad £50 000/i);
  });

  test(`[${locale}] MTD qualifying income is gross and excludes PAYE/dividends/pensions; not conflated with VAT`, () => {
    const t = page.text;
    assert.match(t, locale === "en" ? /before expenses/ : /przed odliczeniem kosztów/);
    assert.match(t, /PAYE/);
    assert.match(t, locale === "en" ? /dividends/ : /dywidend/);
    assert.match(t, locale === "en" ? /pensions/ : /emerytur/);
    assert.match(t, locale === "en" ? /separate from Making Tax Digital for VAT/ : /odrębny od Making Tax Digital dla VAT/);
    assert.doesNotMatch(t, /MTD (applies|is mandatory) (to|for) (everyone|all)/i);
  });

  test(`[${locale}] shows the current-year online filing deadline and a dated source check`, () => {
    assert.match(page.text, /31 (January|stycznia) 2027/);
    assert.match(page.text, /6 (November|listopada) 2026/);
  });

  test(`[${locale}] keeps canonical, hreflang pair and booking/contact links`, () => {
    const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, `https://www.simple-bookkeeping.co.uk${page.path}`);
    for (const p of Object.values(ROUTES)) {
      assert.ok(
        page.html.includes(`hrefLang`) || page.html.includes(`hreflang`),
        "missing hreflang alternates",
      );
      assert.ok(
        page.html.includes(`href="https://www.simple-bookkeeping.co.uk${p.path}"`),
        `missing alternate ${p.path}`,
      );
    }
    const home = locale === "pl" ? "/pl" : "/";
    assert.ok(page.links.includes(`${home === "/" ? "" : home}/#booking`.replace("/pl/#", "/pl#")));
    assert.ok(page.links.includes("tel:+447312026090"));
    assert.ok(page.links.includes(page.path), `footer link to ${page.path} missing`);
  });
}

test("EN/PL parity: same set of £ amounts on both SA pages", () => {
  assert.deepEqual(poundAmounts(pages.pl.text), poundAmounts(pages.en.text));
});

test("EN/PL parity: same tax years referenced on both SA pages", () => {
  const years = (t) => [...new Set(t.match(/20\d\d\/\d\d/g))].sort();
  assert.deepEqual(years(pages.pl.text), years(pages.en.text));
});

test("home pages still link to both SA routes (nav/cards/footer)", () => {
  const enHome = hrefs(readHtml("index.html"));
  const plHome = hrefs(readHtml("pl.html"));
  assert.ok(enHome.filter((h) => h === "/self-assessment-tax-returns").length >= 2);
  assert.ok(plHome.filter((h) => h === "/pl/self-assessment").length >= 2);
});

test("sitemap still lists all six routes", () => {
  const xml = readFileSync(join(APP_DIR, "sitemap.xml.body"), "utf8");
  for (const p of ["", "/pl", "/self-assessment-tax-returns", "/pl/self-assessment", "/privacy-policy", "/pl/privacy-policy"]) {
    assert.ok(xml.includes(`<loc>https://www.simple-bookkeeping.co.uk${p}</loc>`), `sitemap missing ${p || "/"}`);
  }
});
