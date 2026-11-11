// Regression tests for the EN/PL home page title, meta description and H1
// (SEO task T1.2). Reads the prerendered HTML from `next build`.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(process.cwd(), ".next", "server", "app");

function readHtml(file) {
  const full = join(APP_DIR, file);
  assert.ok(existsSync(full), `Missing prerendered ${file} — run \`npm run build\` first`);
  return readFileSync(full, "utf8");
}

const decode = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").trim();

function head(html) {
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
  return { title, description, h1s };
}

const PAGES = {
  en: { file: "index.html", keyword: /bookkeep/i },
  pl: { file: "pl.html", keyword: /księgow/i },
};

for (const [locale, { file, keyword }] of Object.entries(PAGES)) {
  test(`${locale} home: title, description and single H1 name St Helens and Liverpool`, () => {
    const { title, description, h1s } = head(readHtml(file));
    assert.equal(h1s.length, 1, "exactly one H1");
    for (const [label, text] of [["title", title], ["description", description], ["H1", h1s[0]]]) {
      assert.match(text, /St Helens/, `${label} mentions St Helens`);
      assert.match(text, /Liverpool/, `${label} mentions Liverpool`);
      assert.match(text, keyword, `${label} names the service`);
    }
    assert.match(title, /Sabina Krajewska/, "brand in title is Sabina Krajewska");
    assert.doesNotMatch(title, /Simple Bookkeeping/, "title does not use Simple Bookkeeping brand");
  });
}

test("pl home title uses feminine 'księgowa', not 'Polski Księgowy'", () => {
  const { title } = head(readHtml("pl.html"));
  assert.doesNotMatch(title, /Polski Księgowy/);
  assert.match(title, /Polska księgowa/);
});

test("en home uses British 'enquiry', not 'inquiry'", () => {
  const html = readHtml("index.html");
  assert.doesNotMatch(html, /inquir/i);
});
