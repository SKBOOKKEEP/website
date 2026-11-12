// Regression tests for the Making Tax Digital for Income Tax guide (SEO task
// T2.5): EN /making-tax-digital-income-tax and PL
// /pl/making-tax-digital-income-tax. Reads the prerendered HTML from
// `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "making-tax-digital-income-tax.html",
    path: "/making-tax-digital-income-tax",
    sa: "self-assessment-tax-returns.html",
    title: "Making Tax Digital for Income Tax: who and when | Sabina Krajewska",
    h1: "Making Tax Digital for Income Tax: who needs it and when",
    disclaimer:
      /This page gives general information, not tax advice\.[^<]*? Figures checked on 12 November 2026\./,
    checked: /Checked against GOV\.UK on 12 November 2026\./,
    vatBox: /Not the same as Making Tax Digital for VAT/,
    remote: /work remotely/,
    saGuideLink: "Read the full guide to Making Tax Digital for Income Tax",
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "making-tax-digital-income-tax.html"),
    path: "/pl/making-tax-digital-income-tax",
    sa: join("pl", "self-assessment.html"),
    title: "MTD for Income Tax: kogo dotyczy i od kiedy | Sabina Krajewska",
    h1: "Making Tax Digital for Income Tax: kogo dotyczy i od kiedy",
    disclaimer:
      /Ta strona zawiera informacje ogólne i nie stanowi porady podatkowej\.[^<]*? Dane sprawdzone 12 listopada 2026 r\.(?!\.)/,
    checked: /Sprawdzone w GOV\.UK 12 listopada 2026 r\.(?!\.)/,
    vatBox: /To nie to samo co Making Tax Digital dla VAT/,
    remote: /Pracuję zdalnie/,
    saGuideLink: "Przeczytaj pełny przewodnik po Making Tax Digital for Income Tax",
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

/** All JSON-LD graph nodes on the page (layout + page scripts). */
function jsonLdNodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });
}

const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

/** Pound amounts normalised to integers, e.g. "£50,000" / "£50 000" -> 50000. */
const poundAmounts = (text) =>
  [...text.matchAll(/£\s?(\d{1,3}(?:[ ,]\d{3})+|\d+)/g)].map((m) => Number(m[1].replace(/[ ,]/g, ""))).sort((a, b) => a - b);

const texts = {};

for (const [locale, p] of Object.entries(PAGES)) {
  const html = readHtml(p.file);
  const text = visibleText(html);
  texts[locale] = text;

  test(`[${locale}] title, meta description, canonical and single H1`, () => {
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]);
    assert.equal(title, p.title);
    assert.ok(title.length <= 66, `title is ${title.length} chars`);
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
    assert.match(description, /Making Tax Digital for Income Tax/);
    assert.ok(description.length <= 160, `description is ${description.length} chars`);
    assert.ok(html.includes(`<link rel="canonical" href="${SITE}${p.path}"/>`), "self-canonical");
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
    assert.deepEqual(h1s, [p.h1]);
    assert.match(html, /<meta property="og:image" content="[^"]*making-tax-digital-income-tax\/opengraph-image/);
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
    assert.equal(webPage.dateModified, "2026-11-12");

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
    const visibleQuestions = [...html.matchAll(/<h3[^>]*>([^<]*\?)<\/h3>/g)].map((m) => decode(m[1]));
    assert.deepEqual(faq.mainEntity.map((q) => q.name), visibleQuestions);
    for (const q of faq.mainEntity) {
      assert.ok(text.includes(q.acceptedAnswer.text), `visible answer: ${q.acceptedAnswer.text}`);
    }
  });

  test(`[${locale}] "general information, not tax advice" line and the GOV.UK check date`, () => {
    assert.match(text, p.disclaimer);
    assert.match(text, p.checked);
  });

  test(`[${locale}] start dates and thresholds match GOV.UK (strict "over")`, () => {
    for (const [amount, basis, start] of [
      [/(Over|Ponad) £50[ ,]000/, "2024/25", /6 (April|kwietnia) 2026/],
      [/(Over|Ponad) £30[ ,]000/, "2025/26", /6 (April|kwietnia) 2027/],
      [/(Over|Ponad) £20[ ,]000/, "2026/27", /6 (April|kwietnia) 2028/],
    ]) {
      assert.match(text, amount);
      assert.ok(text.includes(basis), `basis year ${basis}`);
      assert.match(text, start);
    }
    assert.doesNotMatch(text, /at least £|co najmniej £/i);
    // Qualifying income is gross (before expenses) and excludes PAYE/dividends/pensions.
    assert.match(text, locale === "en" ? /before expenses/ : /przed odliczeniem kosztów/);
    assert.match(text, /PAYE/);
    // Quarterly deadlines and the 31 January tax return deadline.
    for (const d of locale === "en"
      ? ["7 August", "7 November", "7 February", "7 May", "31 January"]
      : ["7 sierpnia", "7 listopada", "7 lutego", "7 maja", "31 stycznia"]) {
      assert.ok(text.includes(d), `deadline ${d}`);
    }
    // GOV.UK: 1 April–31 March accounting periods "should use" calendar update periods.
    assert.match(text, locale === "en" ? /should use calendar update periods/ : /należy zamiast tego stosować okresy kalendarzowe/);
  });

  test(`[${locale}] exemptions link to HMRC's checker and exemption guidance; software links to HMRC's list`, () => {
    const links = hrefs(html);
    for (const url of [
      "https://www.tax.service.gov.uk/guidance/check-if-you-need-to-use-making-tax-digital-for-income-tax",
      "https://www.gov.uk/guidance/find-out-if-you-can-get-an-exemption-from-making-tax-digital-for-income-tax",
      "https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax",
      "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax",
      "https://www.gov.uk/guidance/find-software-that-works-with-making-tax-digital-for-income-tax",
    ]) {
      assert.ok(links.includes(url), `missing link to ${url}`);
    }
  });

  test(`[${locale}] "not the same as MTD for VAT" box`, () => {
    const box = html.match(/<aside[^>]*data-testid="not-mtd-vat"[^>]*>([\s\S]*?)<\/aside>/);
    assert.ok(box, "VAT box");
    assert.match(decode(box[1]), p.vatBox);
  });

  test(`[${locale}] never says everyone / all self-employed must use it`, () => {
    for (const re of [
      /\b(all|every|any) (self[- ]employed|sole traders?|landlords?|freelancers?)\b/i,
      /\beveryone (who is self[- ]employed|must|has to|needs to)\b/i,
      /\b(applies|is mandatory) (to|for) (everyone|all)\b/i,
      /wszyscy (samozatrudnieni|sole traderzy|wynajmujący|przedsiębiorcy)/i,
      /każdy (samozatrudniony|sole trader|wynajmujący|przedsiębiorca)/i,
      /wszystkich (samozatrudnionych|wynajmujących|przedsiębiorców)/i,
    ]) {
      assert.doesNotMatch(text, re);
    }
  });

  test(`[${locale}] no software brand names`, () => {
    const brands =
      /\b(Xero|QuickBooks|Sage|FreeAgent|FreshBooks|Zoho|Pandle|Coconut|IRIS|TaxCalc|Ember|Hammock|Dext|Crunch|GoSimpleTax|Rhino)\b/i;
    assert.doesNotMatch(text, brands);
    assert.doesNotMatch(JSON.stringify(jsonLdNodes(html)), brands);
  });

  test(`[${locale}] remote only, no HMRC agent claim`, () => {
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
    assert.match(text, p.remote);
    assert.doesNotMatch(text, /as your agent|on your behalf as|HMRC[- ]authorised agent|registered (HMRC )?agent|jako Twój agent|agent HMRC/i);
    assert.match(text, /UTR/);
  });

  test(`[${locale}] internal links: Self Assessment and contact; Bookkeeping only once published`, () => {
    const links = hrefs(html);
    const routes = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8")).routes;
    const route = (k) => routes.find((r) => r.key === k);
    assert.ok(links.includes(route("selfAssessment")[locale].path), "Self Assessment link");
    assert.ok(links.includes(locale === "en" ? "/#contact" : "/pl#contact"), "contact link");
    const bk = route("bookkeeping");
    assert.equal(links.includes(bk[locale].path), bk.published, "Bookkeeping link follows published flag");
  });

  test(`[${locale}] Self Assessment page MTD section links to the full guide`, () => {
    const sa = readHtml(p.sa);
    const section = sa.match(/<section[^>]*aria-labelledby="mtd-income-tax"[\s\S]*?<\/section>/);
    assert.ok(section, "SA MTD section");
    assert.match(section[0], new RegExp(`<a href="${p.path}"[^>]*>${p.saGuideLink}</a>`));
  });
}

test("EN/PL parity: same £ amounts and tax years on both guides", () => {
  assert.deepEqual(poundAmounts(texts.pl), poundAmounts(texts.en));
  const years = (t) => [...new Set(t.match(/20\d\d\/\d\d/g))].sort();
  assert.deepEqual(years(texts.pl), years(texts.en));
});
