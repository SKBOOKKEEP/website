// Regression tests for the Payroll pages (SEO task T2.8):
// EN /payroll and PL /pl/payroll. Reads the prerendered HTML from
// `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "payroll.html",
    path: "/payroll",
    title: "Payroll & PAYE Processing | Sabina Krajewska",
    h1: "Payroll and PAYE processing",
    disclaimer: /This page gives general information, not tax or legal advice\./,
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "payroll.html"),
    path: "/pl/payroll",
    title: "Payroll i rozliczenia PAYE | Sabina Krajewska",
    h1: "Payroll i rozliczenia PAYE",
    disclaimer: /Ta strona zawiera informacje ogólne, a nie poradę podatkową ani prawną\./,
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
    assert.match(description, /[Pp]ayroll/);
    assert.ok(description.length <= 170, `description is ${description.length} chars`);
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

  test(`[${locale}] "general information, not tax or legal advice" disclaimer`, () => {
    assert.match(text, p.disclaimer);
  });

  test(`[${locale}] covers RTI reporting, payslips, payroll frequency and statutory deductions`, () => {
    assert.match(text, locale === "en" ? /RTI/ : /RTI/);
    assert.match(text, locale === "en" ? /payslip/i : /pasek wypłaty|pasków wypłat/i);
    assert.match(text, locale === "en" ? /weekly or monthly|weekly.*monthly/i : /tygodniowo.*miesięcznie|tygodniowy.*miesięczny/i);
    assert.match(text, locale === "en" ? /National Insurance/ : /National Insurance/);
  });

  test(`[${locale}] does not claim one payroll frequency is standard`, () => {
    assert.doesNotMatch(text, /\bmost employers pay monthly\b/i);
  });

  test(`[${locale}] auto-enrolment described as a general employer duty, with a direct caveat to ask`, () => {
    assert.match(
      text,
      locale === "en"
        ? /general legal duty[^.]*automatically enrol/i
        : /ogólny, ustawowy obowiązek[^.]*automatyczn/i,
    );
    assert.match(
      text,
      locale === "en"
        ? /ask (me )?about (it )?directly|ask about auto-enrolment/i
        : /zapytaj o to (wprost )?(podczas|bezpośrednio)/i,
    );
  });

  test(`[${locale}] no software brand names, remote only`, () => {
    assert.doesNotMatch(text, /\b(Xero|QuickBooks|Sage|FreeAgent|BrightPay|Moneysoft)\b/i);
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
  });

  test(`[${locale}] no invented client-size limit or guaranteed outcomes`, () => {
    assert.doesNotMatch(text, /\bguarantee|gwarantuj/i);
    assert.doesNotMatch(text, /\bup to \d+ employees\b/i);
  });

  test(`[${locale}] links to the live GOV.UK running payroll and workplace pensions pages`, () => {
    const links = hrefs(html);
    for (const url of [
      "https://www.gov.uk/running-payroll",
      "https://www.gov.uk/workplace-pensions",
    ]) {
      assert.ok(links.includes(url), `missing link to ${url}`);
    }
  });

  test(`[${locale}] links to the Limited company accounts page`, () => {
    const links = hrefs(html);
    assert.ok(
      links.includes(locale === "en" ? "/limited-company-accounts" : "/pl/rozliczenia-spolek-ltd"),
    );
  });
}
