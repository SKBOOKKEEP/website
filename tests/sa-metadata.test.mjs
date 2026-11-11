// Regression tests for EN/PL Self Assessment titles, meta and social tags
// (SEO task T1.3). Reads prerendered HTML from `next build`.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");
const read = (f) => {
  const p = join(APP_DIR, f);
  assert.ok(existsSync(p), `Missing prerendered ${f} — run \`npm run build\` first`);
  return readFileSync(p, "utf8");
};
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").trim();
const meta = (html, attr, key) => {
  const m = html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`));
  return m ? decode(m[1]) : undefined;
};
const title = (html) => decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]);

const PAGES = {
  en: { file: "self-assessment-tax-returns.html", path: "/self-assessment-tax-returns" },
  pl: { file: join("pl", "self-assessment.html"), path: "/pl/self-assessment" },
};
const HOMES = { en: "index.html", pl: "pl.html" };

for (const [locale, { file, path }] of Object.entries(PAGES)) {
  test(`${locale} SA: title and description name Self Assessment, St Helens and Liverpool`, () => {
    const html = read(file);
    for (const [label, text] of [["title", title(html)], ["description", meta(html, "name", "description")]]) {
      assert.match(text, /Self Assessment/, `${label} names the service`);
      assert.match(text, /St Helens/, `${label} mentions St Helens`);
      assert.match(text, /Liverpool/, `${label} mentions Liverpool`);
    }
    assert.match(title(html), /Sabina Krajewska$/, "single brand suffix, no doubled template");
  });

  test(`${locale} SA: own og:image, og:title and twitter tags, not inherited from home`, () => {
    const html = read(file);
    const home = read(HOMES[locale]);
    const ogImage = meta(html, "property", "og:image");
    assert.ok(ogImage, "og:image present");
    assert.ok(ogImage.startsWith(`https://www.simple-bookkeeping.co.uk${path}/opengraph-image`), `og:image is the page's own: ${ogImage}`);
    for (const [attr, key] of [["property", "og:title"], ["name", "twitter:title"], ["name", "twitter:description"]]) {
      const v = meta(html, attr, key);
      assert.ok(v, `${key} present`);
      assert.notEqual(v, meta(home, attr, key), `${key} differs from home`);
      assert.match(v, /Self Assessment/, `${key} is about Self Assessment`);
    }
  });
}

test("EN and PL SA titles are unique", () => {
  assert.notEqual(title(read(PAGES.en.file)), title(read(PAGES.pl.file)));
});
