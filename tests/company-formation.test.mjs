// Regression tests for the Company formation pages (SEO task T2.11):
// EN /company-formation and PL /pl/zakladanie-spolki-ltd. Reads the
// prerendered HTML from `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "company-formation.html",
    path: "/company-formation",
    title: "Company Formation | Sabina Krajewska",
    h1: "Company formation",
    disclaimer: /This page gives general information, not tax or legal advice\./,
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "zakladanie-spolki-ltd.html"),
    path: "/pl/zakladanie-spolki-ltd",
    title: "Zakładanie spółki Ltd | Sabina Krajewska",
    h1: "Zakładanie spółki Ltd",
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
    assert.match(description, locale === "en" ? /limited company/i : /spółki Ltd/i);
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

  test(`[${locale}] covers company name, director, registered office, SIC code and governing documents`, () => {
    assert.match(text, locale === "en" ? /company name/i : /nazw[ya] spółki/i);
    assert.match(text, locale === "en" ? /director/i : /dyrektor/i);
    assert.match(text, locale === "en" ? /registered office/i : /siedzib[ay] spółki/i);
    assert.match(text, /SIC/);
    assert.match(text, locale === "en" ? /memorandum of association/i : /memorandum of association|statut spółki/i);
  });

  test(`[${locale}] does not claim a registered-office-address service`, () => {
    assert.doesNotMatch(
      text,
      locale === "en"
        ? /I (provide|offer|supply) a registered office/i
        : /oferuj[ęe] (adres )?siedzib[ęy]/i,
    );
    // The requirement is stated as Companies House's, explicitly separate from what's offered.
    assert.match(
      text,
      locale === "en"
        ? /Companies House requires every (limited )?compan(y|ies) to register an official address/i
        : /Companies House wymaga, aby każda spółka zarejestrowała oficjalny adres siedziby/i,
    );
  });

  test(`[${locale}] no name-reservation service or promised turnaround time`, () => {
    // The FAQ may ask about name reservation; only an affirmative claim of
    // offering it is disallowed.
    assert.doesNotMatch(
      text,
      locale === "en"
        ? /\bI (can |will |do )?reserve (a |your )?(company )?name\b/i
        : /\b(mogę|możemy) zarezerw\S* nazw/i,
    );
    assert.match(
      text,
      locale === "en" ? /don't offer a name.reservation service/i : /nie oferuj[ęe] usługi rezerwacji nazwy/i,
    );
    assert.doesNotMatch(text, /\bwithin 24 hours\b|\bsame[- ]day\b/i);
    assert.match(
      text,
      locale === "en" ? /can't promise a specific turnaround/i : /nie mogę obiecać konkretnego terminu/i,
    );
  });

  test(`[${locale}] links to the Limited company accounts page for ongoing CT600/accounts content`, () => {
    const links = hrefs(html);
    assert.ok(
      links.includes(locale === "en" ? "/limited-company-accounts" : "/pl/rozliczenia-spolek-ltd"),
    );
  });

  test(`[${locale}] no invented pricing, no guaranteed outcomes, remote only`, () => {
    assert.doesNotMatch(text, /\bguarantee|gwarantuj/i);
    assert.doesNotMatch(text, /£\d/);
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
  });
}
