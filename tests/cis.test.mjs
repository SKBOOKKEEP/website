// Regression tests for the Construction Industry Scheme (CIS) pages
// (SEO task T2.9): EN /cis and PL /pl/cis. Reads the prerendered HTML from
// `next build`. Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const PAGES = {
  en: {
    file: "cis.html",
    path: "/cis",
    title: "Construction Industry Scheme (CIS) | Sabina Krajewska",
    h1: "Construction Industry Scheme (CIS)",
    disclaimer: /This page gives general information, not tax advice\./,
    inLanguage: "en-GB",
  },
  pl: {
    file: join("pl", "cis.html"),
    path: "/pl/cis",
    title: "Construction Industry Scheme (CIS) | Sabina Krajewska",
    h1: "Construction Industry Scheme (CIS)",
    disclaimer: /Ta strona zawiera informacje ogólne, a nie poradę podatkową\./,
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
    assert.match(description, /CIS/);
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

  test(`[${locale}] "general information, not tax advice" disclaimer`, () => {
    assert.match(text, p.disclaimer);
  });

  test(`[${locale}] explains contractor vs subcontractor roles`, () => {
    assert.match(text, locale === "en" ? /\bcontractor/i : /\bwykonaw/i);
    assert.match(text, locale === "en" ? /\bsubcontractor/i : /\bpodwykonaw/i);
  });

  test(`[${locale}] current CIS deduction rates (20%, 30%, 0%) with GOV.UK source and today's date`, () => {
    assert.match(text, /20%/);
    assert.match(text, /30%/);
    assert.match(text, /0%/);
    assert.match(text, /gross payment/i);
    assert.match(text, /13 November 2026|13 listopada 2026/);
    const links = hrefs(html);
    assert.ok(
      links.includes("https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors"),
    );
  });

  test(`[${locale}] "no automatic refund" — reconciliation depends on full tax position`, () => {
    assert.match(
      text,
      locale === "en"
        ? /not( a)? refund(ed)? automatically|no automatic refund/i
        : /nie(,)? automatycznie|nie ma (tu )?automatycznego zwrotu/i,
    );
    assert.match(
      text,
      locale === "en"
        ? /depends on (their|your) full tax position/i
        : /zależy od (jego|Twojej) (całej|pełnej) sytuacji podatkowej/i,
    );
    assert.doesNotMatch(text, /typical refund|average refund|zwrot[^.]*zazwyczaj/i);
  });

  test(`[${locale}] reconciliation happens via Self Assessment, linked`, () => {
    assert.match(text, locale === "en" ? /Self Assessment/ : /Self Assessment/);
    const links = hrefs(html);
    assert.ok(
      links.includes(locale === "en" ? "/self-assessment-tax-returns" : "/pl/self-assessment"),
      "links to the Self Assessment page",
    );
  });

  test(`[${locale}] no invented pricing or guaranteed outcomes, remote only`, () => {
    assert.doesNotMatch(text, /\bguarantee|gwarantuj/i);
    assert.doesNotMatch(
      text,
      /face[- ]to[- ]face|in[- ]person|office visit|visit (you|your)|meet (you )?in|spotka\S* osobi|osobiście|wizyt\S* w biurze|w moim biurze/i,
    );
  });
}
