// Regression tests for the Bookkeeping & VAT pages (SEO task T2.2):
// EN /bookkeeping-vat and PL /pl/ksiegowosc-vat. Reads the prerendered HTML
// from `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "bookkeeping-vat.html",
    path: "/bookkeeping-vat",
    home: "index.html",
    title: "Bookkeeping & VAT in St Helens & Liverpool | Sabina Krajewska",
    h1: "Bookkeeping and VAT for small businesses in St Helens and Liverpool",
    keyword: /bookkeeping/i,
    disclaimer: /This page gives general information, not tax advice\.[^<]*? Figures checked on 12 November 2026\./,
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "ksiegowosc-vat.html"),
    path: "/pl/ksiegowosc-vat",
    home: "pl.html",
    title: "Księgowość i VAT w St Helens i Liverpoolu | Sabina Krajewska",
    h1: "Księgowość i VAT dla małych firm w St Helens i Liverpoolu",
    keyword: /księgowoś/i,
    disclaimer: /Ta strona zawiera informacje ogólne i nie stanowi porady podatkowej\.[^<]*? Dane sprawdzone 12 listopada 2026 r\.(?!\.)/,
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
    .replace(/&nbsp;| | /g, " ")
    .replace(/\s+/g, " ")
    .trim();

function visibleText(html) {
  const body = html.slice(html.indexOf("<body"));
  return decode(body.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " "));
}

/** All JSON-LD graph nodes on the page (layout + page scripts). */
function jsonLdNodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]);
    return data["@graph"] ?? [data];
  });
}

for (const [locale, p] of Object.entries(PAGES)) {
  const html = readHtml(p.file);
  const text = visibleText(html);

  test(`[${locale}] title, meta description and single H1`, () => {
    assert.equal(decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]), p.title);
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
    for (const re of [/St Helens/, /Liverpool/, p.keyword, /VAT/]) assert.match(description, re);
    assert.ok(description.length <= 160, `description is ${description.length} chars`);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
    assert.deepEqual(h1s, [p.h1]);
  });

  test(`[${locale}] self-canonical`, () => {
    assert.ok(html.includes(`<link rel="canonical" href="${SITE}${p.path}"/>`));
  });

  test(`[${locale}] JSON-LD: WebPage, BreadcrumbList and Service reference #business; no Offer or price`, () => {
    const nodes = jsonLdNodes(html);
    const business = `${SITE}/#business`;
    const byType = (t) => nodes.filter((n) => n["@type"] === t);

    const [webPage] = byType("WebPage");
    assert.ok(webPage, "WebPage");
    assert.equal(webPage.about?.["@id"], business);
    assert.equal(webPage.inLanguage, p.inLanguage);
    assert.equal(webPage.url, `${SITE}${p.path}`);

    const [crumbs] = byType("BreadcrumbList");
    assert.ok(crumbs, "BreadcrumbList");
    assert.deepEqual(
      crumbs.itemListElement.map((i) => i.item),
      [locale === "en" ? SITE : `${SITE}/pl`, `${SITE}${p.path}`],
    );

    const [service] = byType("Service");
    assert.ok(service, "Service");
    assert.equal(service.provider?.["@id"], business);
    assert.deepEqual(service.availableLanguage, ["en", "pl"]);
    assert.ok(service.areaServed.length > 0);

    // One business entity only: the layout's AccountingService.
    const businesses = nodes.filter((n) => /AccountingService|LocalBusiness|Organization/.test(n["@type"]));
    assert.equal(businesses.length, 1);
    assert.equal(businesses[0]["@id"], business);

    const raw = JSON.stringify(nodes);
    assert.doesNotMatch(raw, /"Offer"|"offers"|"price"|"priceSpecification"/);
  });

  test(`[${locale}] FAQPage schema matches the visible FAQ word for word`, () => {
    const faq = jsonLdNodes(html).find((n) => n["@type"] === "FAQPage");
    assert.ok(faq, "FAQPage");
    assert.equal(faq.mainEntity.length, 7);
    for (const q of faq.mainEntity) {
      assert.ok(text.includes(q.name), `visible question: ${q.name}`);
      assert.ok(text.includes(q.acceptedAnswer.text), `visible answer: ${q.acceptedAnswer.text}`);
    }
  });

  test(`[${locale}] tax disclaimer with the figures-checked date`, () => {
    assert.match(text, p.disclaimer);
  });

  test(`[${locale}] remote only: no in-person wording`, () => {
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
    assert.match(text, locale === "en" ? /working remotely/ : /pracuję zdalnie/);
  });

  test(`[${locale}] no software brand names, no prices, no HMRC agent claim`, () => {
    assert.doesNotMatch(text, /Xero|QuickBooks|\bSage\b|FreeAgent/i);
    assert.doesNotMatch(html, /Xero|QuickBooks|\bSage\b|FreeAgent/i);
    assert.doesNotMatch(text, /HMRC[- ]authorised agent|registered (HMRC )?agent|agent HMRC/i);
    assert.match(text, /UTR/);
  });

  test(`[${locale}] GOV.UK figures match the 12 Nov 2026 check`, () => {
    for (const re of [/£90[ ,]000/, /£200/, /£150[ ,]000/, /£1[.,]35 m/, /6 (April|kwietnia) 2026/, /£50[ ,]000/]) {
      assert.match(text, re);
    }
    assert.match(text, locale === "en" ? /one calendar month and 7 days/ : /jednego miesiąca kalendarzowego i 7 dni/);
  });

  test(`[${locale}] home page Services card links to this page`, () => {
    assert.match(readHtml(p.home), new RegExp(`<a href="${p.path}"[^>]*>(?:(?!</a>)[\\s\\S])*<h3[^>]*>(Bookkeeping|Księgowość)</h3>`));
  });
}

test("PL home Księgowość card has the VAT and Making Tax Digital wording the EN card has", () => {
  const plHome = visibleText(readHtml("pl.html"));
  const enHome = visibleText(readHtml("index.html"));
  assert.match(enHome, /VAT returns and Making Tax Digital/);
  assert.match(plHome, /Księgowość Prowadzenie Twojej dokumentacji[^.]*VAT[^.]*Making Tax Digital/);
});
