// Regression tests for the HMRC support pages (SEO task T2.10):
// EN /hmrc-support and PL /pl/pomoc-hmrc. Reads the prerendered HTML from
// `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "hmrc-support.html",
    path: "/hmrc-support",
    home: "index.html",
    title: "HMRC Support & Correspondence | Sabina Krajewska",
    h1: "Help dealing with HMRC",
    disclaimer: /This page gives general information, not legal or tax advice\./,
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "pomoc-hmrc.html"),
    path: "/pl/pomoc-hmrc",
    home: "pl.html",
    title: "Pomoc w kontaktach z HMRC | Sabina Krajewska",
    h1: "Pomoc w kontaktach z HMRC",
    disclaimer: /Ta strona zawiera informacje ogólne, a nie poradę prawną ani podatkową\./,
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
    assert.match(description, /HMRC/);
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

  test(`[${locale}] "general information, not legal or tax advice" disclaimer`, () => {
    assert.match(text, p.disclaimer);
  });

  test(`[${locale}] covers correspondence, routine enquiries and compliance checks/investigations`, () => {
    assert.match(text, locale === "en" ? /correspond/i : /korespondencj/i);
    assert.match(text, locale === "en" ? /routine/i : /bieżąc/i);
    assert.match(text, locale === "en" ? /compliance check/i : /kontrol/i);
    assert.match(text, locale === "en" ? /investigation/i : /postępowani/i);
  });

  test(`[${locale}] no fear-based copy about investigations`, () => {
    for (const re of [
      /\b(don't panic|be afraid|serious trouble|worst[- ]case|could lose your business)\b/i,
      /\bnie panikuj\b/i,
    ]) {
      assert.doesNotMatch(text, re);
    }
    // Calm framing: most checks find nothing wrong.
    assert.match(
      text,
      locale === "en" ? /most (are resolved|checks)[^.]*without anything being wrong/ : /większość[^.]*bez stwierdzenia nieprawidłowości/,
    );
  });

  test(`[${locale}] no invented HMRC agent (64-8) authorisation or professional body membership`, () => {
    // Allow the FAQ to ask the question ("Are you a registered HMRC agent?");
    // only an affirmative claim of holding that status is disallowed.
    assert.doesNotMatch(text, /64-8/);
    assert.doesNotMatch(
      text,
      /\b(I am|I'm|as) a registered (HMRC )?agent\b|HMRC[- ]authorised agent|\bjako Twój agent\b|\bagent HMRC\b|\bjestem zarejestrowan\w* pełnomocnik/i,
    );
    assert.doesNotMatch(text, /\b(ACCA|ACA|AAT|CIMA|FCCA|CTA)\b/);
    // Only the existing site-wide AML/ICO/insurance facts are referenced.
    assert.match(text, locale === "en" ? /anti-money laundering/i : /praniu pieniędzy/i);
    assert.match(text, /ICO/);
  });

  test(`[${locale}] formal representation terms are agreed directly, not implied by default`, () => {
    assert.match(
      text,
      locale === "en"
        ? /formal representation[^.]*agreed[^.]*directly/i
        : /formalnej reprezentacji[^.]*ustalam[^.]*bezpośrednio/i,
    );
  });

  test(`[${locale}] links to the live GOV.UK compliance checks and appeals pages`, () => {
    const links = hrefs(html);
    for (const url of [
      "https://www.gov.uk/guidance/hmrc-compliance-checks-help-and-support",
      "https://www.gov.uk/tax-appeals",
    ]) {
      assert.ok(links.includes(url), `missing link to ${url}`);
    }
  });

  test(`[${locale}] remote only, no software brand names`, () => {
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
    assert.doesNotMatch(text, /\b(Xero|QuickBooks|Sage|FreeAgent)\b/i);
  });

  test(`[${locale}] home page Services card links to this page`, () => {
    assert.match(
      readHtml(p.home),
      new RegExp(`<a href="${p.path}"[^>]*>(?:(?!</a>)[\\s\\S])*<h3[^>]*>(Tax &amp; HMRC Assistance|Podatki i sprawy z HMRC)`),
    );
  });
}
