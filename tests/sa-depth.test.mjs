// T2.6: landlords / company directors / foreign (Polish) income sections on
// both Self Assessment pages. Reads prerendered HTML: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const SITE = "https://www.simple-bookkeeping.co.uk";
const routes = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8")).routes;
const sa = routes.find((r) => r.key === "selfAssessment");
const mtd = routes.find((r) => r.key === "mtdIncomeTax");

const PAGES = {
  en: { path: "/self-assessment-tax-returns", file: "self-assessment-tax-returns.html", lang: "en-GB" },
  pl: { path: "/pl/self-assessment", file: join("pl", "self-assessment.html"), lang: "pl-PL" },
};

const HEADINGS = {
  en: ["Landlords and rental income", "Company directors", "Foreign income, including income from Poland"],
  pl: ["Wynajmujący i przychody z najmu", "Dyrektorzy spółek (company directors)", "Dochody zagraniczne, w tym z Polski"],
};

const GOVUK_LINKS = [
  "https://www.gov.uk/check-if-you-need-tax-return",
  "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income",
  "https://www.gov.uk/renting-out-a-property/paying-tax",
  "https://www.gov.uk/tax-on-dividends/how-to-report-tax-on-dividends",
  "https://www.gov.uk/tax-foreign-income",
  "https://www.gov.uk/tax-foreign-income/taxed-twice",
  "https://www.gov.uk/government/publications/poland-tax-treaties",
  "https://www.gov.uk/guidance/check-if-you-can-claim-the-4-year-foreign-income-and-gains-regime",
];

function visibleText(html) {
  return html
    .slice(html.indexOf("<body"))
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

const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

test("SA slugs unchanged in routes.json and lastModified bumped", () => {
  assert.equal(sa.en.path, "/self-assessment-tax-returns");
  assert.equal(sa.pl.path, "/pl/self-assessment");
  assert.equal(sa.published, true);
  assert.equal(sa.lastModified, "2026-11-12");
});

for (const [locale, p] of Object.entries(PAGES)) {
  const full = join(APP_DIR, p.file);
  const html = existsSync(full) ? readFileSync(full, "utf8") : "";
  const text = visibleText(html);
  const links = hrefs(html);

  test(`[${locale}] still prerenders with same canonical, hreflang and lang`, () => {
    assert.ok(html, `missing ${p.file}; run npm run build`);
    assert.match(html, new RegExp(`<html[^>]*lang="${p.lang}"`));
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], `${SITE}${p.path}`);
    for (const [hl, path] of [["en-GB", sa.en.path], ["pl-PL", sa.pl.path], ["x-default", sa.en.path]]) {
      assert.match(html, new RegExp(`hrefLang="${hl}" href="${SITE}${path}"`), `hreflang ${hl}`);
    }
  });

  test(`[${locale}] new section headings and anchors present`, () => {
    for (const h of HEADINGS[locale]) assert.ok(text.includes(h), `missing heading "${h}"`);
    for (const id of ["landlords", "company-directors", "foreign-income"]) {
      assert.ok(html.includes(`id="${id}"`), `missing #${id}`);
    }
  });

  test(`[${locale}] links GOV.UK sources and HMRC checker`, () => {
    for (const url of GOVUK_LINKS) assert.ok(links.includes(url), `missing link ${url}`);
    assert.match(text, /12 (November|listopada) 2026/, "dated source check");
  });

  test(`[${locale}] points to the MTD guide (or MTD section until the guide is published)`, () => {
    const target = mtd.published ? mtd[locale].path : "#mtd-income-tax";
    assert.ok(links.includes(target), `missing MTD pointer ${target}`);
    if (!mtd.published) assert.ok(!links.includes(mtd[locale].path), "unpublished MTD path linked");
  });

  test(`[${locale}] no blanket "directors must file" claim`, () => {
    assert.doesNotMatch(
      text,
      /(all|every) (company )?directors (must|need to|have to)|directors must (file|send|register)|(you must|must) (file|send)[^.]*because you are a (company )?director|każdy dyrektor|dyrektorzy (muszą|mają obowiązek)/i,
    );
    assert.match(text, locale === "en" ? /does not list being a company director/ : /nie wymieniają samej funkcji dyrektora/);
  });

  test(`[${locale}] UK returns only — Polish side referred to a Polish adviser`, () => {
    assert.match(text, locale === "en" ? /do not prepare Polish tax returns \(PIT\)/ : /Nie przygotowuję polskich zeznań podatkowych \(PIT\)/);
    assert.doesNotMatch(text, /I (prepare|file|submit) (your )?Polish|(przygotowuję|składam) (Twój |Twoje )?PIT/i);
  });

  test(`[${locale}] not-tax-advice line and existing filing-rule corrections kept`, () => {
    assert.match(text, locale === "en" ? /general information, not tax advice/ : /nie stanowi porady podatkowej/);
    assert.match(text, /2024\/25[^.]*150[ ,]?000/);
    assert.match(text, /High Income Child Benefit Charge[^.]*PAYE/);
  });

  test(`[${locale}] no invented savings and no eligibility calculator`, () => {
    assert.doesNotMatch(text, /save (you )?(up to )?£|zaoszczędzisz|oszczędność £/i);
    assert.doesNotMatch(html, /<input[^>]+(income|przych)/i);
  });

  test(`[${locale}] exactly one #business entity`, () => {
    const ids = html.match(/"@id":"https:\/\/www\.simple-bookkeeping\.co\.uk\/#business"/g) ?? [];
    const defs = [...html.matchAll(/"@type":"AccountingService"/g)];
    assert.ok(ids.length >= 1, "#business present");
    assert.equal(defs.length, 1, "one AccountingService node");
  });
}
