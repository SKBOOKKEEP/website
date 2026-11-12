// Home service cards: every card on / and /pl is clickable. Cards whose route
// is published link to that page; the rest link to the same-page #booking
// anchor (the hero CTA's target) and never to an unpublished (404) slug.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const { routes } = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8"));
const byKey = Object.fromEntries(routes.map((r) => [r.key, r]));

const read = (f) => {
  const p = join(APP_DIR, f);
  assert.ok(existsSync(p), `Missing prerendered ${f} — run \`npm run build\` first`);
  return readFileSync(p, "utf8");
};

/** The services <section> and its card-level children (one per card). */
const serviceCards = (html) => {
  const m = html.match(/<section id="services"[\s\S]*?<\/section>/);
  assert.ok(m, "services section present");
  const grid = m[0].match(/<div class="grid[^"]*">([\s\S]*)<\/div><\/div><\/section>$/);
  assert.ok(grid, "services grid present");
  return [...grid[1].matchAll(/<(a|div)\b([^>]*)>([\s\S]*?)<\/\1>(?=<(?:a|div)\b|$)/g)].map(
    ([, tag, attrs, inner]) => ({
      tag,
      href: attrs.match(/href="([^"]*)"/)?.[1],
      title: inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1],
    }),
  );
};

// Card order in content/copy.ts (same for both locales).
const CARD_ROUTES = ["bookkeeping", "selfAssessment", "limitedCompany", "hmrcSupport"];

for (const [locale, file] of [
  ["en", "index.html"],
  ["pl", "pl.html"],
]) {
  test(`${locale} home: all 4 service cards are links`, () => {
    const cards = serviceCards(read(file));
    assert.equal(cards.length, 4, "4 service cards");
    for (const c of cards) {
      assert.equal(c.tag, "a", `card "${c.title}" is an <a>`);
      assert.ok(c.href, `card "${c.title}" has an href`);
    }
  });

  test(`${locale} home: published cards link to their page, unpublished to #booking`, () => {
    const html = read(file);
    assert.match(html, /<section id="booking"/, "#booking target exists on the page");
    const cards = serviceCards(html);
    CARD_ROUTES.forEach((key, i) => {
      const route = byKey[key];
      const expected = route.published ? route[locale].path : "#booking";
      assert.equal(cards[i].href, expected, `${key} card href`);
    });
  });

  test(`${locale} home: no links to unpublished service pages`, () => {
    const html = read(file);
    for (const key of ["limitedCompany", "hmrcSupport"]) {
      const route = byKey[key];
      if (route.published) continue;
      for (const l of ["en", "pl"]) {
        assert.ok(!html.includes(`href="${route[l].path}"`), `no link to unpublished ${route[l].path}`);
      }
    }
  });
}
