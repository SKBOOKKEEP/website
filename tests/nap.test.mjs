// NAP consistency (SEO task T1.4): every public page shows the phone in one
// format, links tel:+447312026090, and JSON-LD keeps the same NAP.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const PAGES = [
  "index.html",
  "pl.html",
  "self-assessment-tax-returns.html",
  join("pl", "self-assessment.html"),
  "privacy-policy.html",
  join("pl", "privacy-policy.html"),
];
const read = (f) => {
  const p = join(APP_DIR, f);
  assert.ok(existsSync(p), `Missing prerendered ${f} — run \`npm run build\` first`);
  return readFileSync(p, "utf8");
};

for (const file of PAGES) {
  test(`${file}: phone shown as +44 7312 026090 with tel:+447312026090`, () => {
    const html = read(file);
    assert.match(html, /\+44 7312 026090/, "display format present");
    assert.doesNotMatch(html, /731 202 6090/, "old grouping removed");
    assert.match(html, /href="tel:\+447312026090"/, "tel: link unchanged");
  });

  test(`${file}: JSON-LD NAP is St Helens, WA9, Merseyside, GB with no street address`, () => {
    const html = read(file);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length > 0, "JSON-LD present");
    const business = blocks
      .flatMap((b) => JSON.parse(b[1])["@graph"] ?? [])
      .find((n) => n["@id"] === "https://www.simple-bookkeeping.co.uk/#business");
    assert.ok(business, "#business node present");
    assert.equal(business.telephone, "+447312026090");
    assert.equal(business.email, "contact@simple-bookkeeping.co.uk");
    assert.equal(business.address.addressLocality, "St Helens");
    assert.equal(business.address.postalCode, "WA9");
    assert.equal(business.address.addressRegion, "Merseyside");
    assert.equal(business.address.addressCountry, "GB");
    assert.equal(business.address.streetAddress, undefined, "no street address");
  });
}
