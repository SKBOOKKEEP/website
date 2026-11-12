// PL home and PL Self Assessment: title, meta description, H1 and lead describe a
// Polish-speaking księgowa (feminine) based in St Helens, working with Liverpool and
// remotely across the UK, without gender/keyword stuffing (SEO tasks T4.1 + T1.12).
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://www.simple-bookkeeping.co.uk";
const BUSINESS_ID = `${SITE}/#business`;
const APP_DIR = join(process.cwd(), ".next", "server", "app");

const read = (file) => {
  const full = join(APP_DIR, file);
  assert.ok(existsSync(full), `Missing prerendered ${file} — run \`npm run build\` first`);
  return readFileSync(full, "utf8");
};
const decode = (s) =>
  s
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

function parse(html) {
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
  // Lead = the first paragraph after the H1.
  const afterH1 = html.slice(html.indexOf("</h1>"));
  const lead = decode(afterH1.match(/<p[^>]*>([\s\S]*?)<\/p>/)[1]);
  return { title, description, h1s, lead };
}

const PAGES = {
  home: { file: "pl.html", path: "/pl", en: "/" },
  selfAssessment: {
    file: join("pl", "self-assessment.html"),
    path: "/pl/self-assessment",
    en: "/self-assessment-tax-returns",
  },
};

const MASCULINE = /polski księgowy/i;
const FEMININE = /polska księgowa/i;

for (const [key, { file, path, en }] of Object.entries(PAGES)) {
  test(`PL ${key}: title and H1 name the księgowa and St Helens`, () => {
    const { title, h1s } = parse(read(file));
    assert.equal(h1s.length, 1, "exactly one H1");
    for (const [label, text] of [["title", title], ["H1", h1s[0]]]) {
      assert.match(text, /księgowa/i, `${label} uses feminine 'księgowa': ${text}`);
      assert.match(text, /St Helens/, `${label} mentions St Helens: ${text}`);
      assert.doesNotMatch(text, MASCULINE, `${label} has no masculine 'polski księgowy'`);
      assert.doesNotMatch(text, /księgowy\b/i, `${label} has no masculine 'księgowy'`);
    }
    assert.ok(
      !(FEMININE.test(title) && MASCULINE.test(title)),
      "title is not a stuffed 'Polska księgowa / Polski księgowy' combination",
    );
    assert.ok(title.length <= 70, `title stays short (${title.length} chars)`);
  });

  test(`PL ${key}: meta description says remote, UK-wide, St Helens and Liverpool`, () => {
    const { description } = parse(read(file));
    assert.ok(description.length <= 155, `description ≤ 155 chars (${description.length})`);
    assert.match(description, /zdalnie/, "mentions remote work");
    assert.match(description, /Wielkiej Brytanii|\bUK\b/, "mentions the UK");
    assert.match(description, /St Helens/);
    assert.match(description, /Liverpool/);
    assert.match(description, /księgow/i);
    assert.doesNotMatch(description, MASCULINE);
  });

  test(`PL ${key}: lead says St Helens, Liverpool, remote and Polish/English`, () => {
    const { lead } = parse(read(file));
    assert.match(lead, /St Helens/, lead);
    assert.match(lead, /Liverpool/, lead);
    assert.match(lead, /zdalnie/, lead);
    assert.match(lead, /po polsku i po angielsku/, lead);
    assert.match(lead, /Wielkiej Brytanii/, lead);
  });

  test(`PL ${key}: lang, canonical, hreflang and single #business unchanged`, () => {
    const html = read(file);
    assert.match(html, /<html[^>]*lang="pl-PL"/, "lang pl-PL");
    assert.ok(html.includes(`<link rel="canonical" href="${SITE}${path}"/>`), "self-canonical");
    assert.ok(html.includes(`hrefLang="pl-PL" href="${SITE}${path}"`), "hreflang pl-PL");
    const enAbs = en === "/" ? SITE : `${SITE}${en}`;
    assert.ok(html.includes(`hrefLang="en-GB" href="${enAbs}"`), "hreflang en-GB");
    assert.ok(html.includes(`hrefLang="x-default" href="${enAbs}"`), "x-default → EN");
    const walk = (v, out = []) => {
      if (Array.isArray(v)) v.forEach((x) => walk(x, out));
      else if (v && typeof v === "object") {
        out.push(v);
        Object.values(v).forEach((x) => walk(x, out));
      }
      return out;
    };
    const nodes = walk(
      [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
        JSON.parse(m[1]),
      ),
    );
    const defs = nodes.filter((n) => n["@type"] === "AccountingService");
    assert.equal(defs.length, 1, "exactly one AccountingService node");
    assert.equal(defs[0]["@id"], BUSINESS_ID, "it is #business");
  });

  test(`PL ${key}: no office, in-person or map claims in title/description/H1/lead`, () => {
    const { title, description, h1s, lead } = parse(read(file));
    const text = [title, description, h1s[0], lead].join(" ");
    assert.doesNotMatch(text, /biur|osobiści|spotkani|mapa|£|agent HMRC|ACCA|AAT|CIMA/i, text);
  });
}

// Remote-only: hero image alts and the PL SA "About" copy must not imply an office or
// premises (reviewer follow-up on PR #16).
const NO_OFFICE = /office|biuro\b|biura\b|biurze\b|siedzib/i;
const imgAlts = (html) => [...html.matchAll(/<img[^>]*\balt="([^"]*)"/g)].map((m) => decode(m[1]));

for (const file of ["index.html", "pl.html", "self-assessment-tax-returns.html", join("pl", "self-assessment.html")]) {
  test(`${file}: image alts do not describe an office`, () => {
    const alts = imgAlts(read(file));
    assert.ok(alts.length > 0, "page has images with alt text");
    for (const alt of alts) assert.doesNotMatch(alt, NO_OFFICE, `alt: ${alt}`);
  });
}

test("PL SA About section says 'Działam z St Helens', no 'siedziba'", () => {
  const html = read(join("pl", "self-assessment.html"));
  const start = html.indexOf("Twoja polska księgowa w UK");
  assert.ok(start > 0, "About heading present");
  const about = decode(html.slice(start, html.indexOf("</section>", start)));
  assert.match(about, /Działam z St Helens/);
  assert.match(about, /zdalnie/);
  assert.doesNotMatch(about, NO_OFFICE);
});

// Post-release wording cleanup (12 Nov 2026, T4.3/T4.5 follow-up): no "siedziba" on the
// PL St Helens page, gender-neutral reader forms on PL pages and no over-promising
// "gwarantuje"/"guarantee" on any live page.
const ROUTES = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8")).routes;
const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);
const livePages = (locale) =>
  ROUTES.filter((r) => r.published && r[locale]).map((r) => fileFor(r[locale].path));

test("PL St Helens: no 'siedziba' in body, meta or OG", () => {
  const html = read(join("pl", "ksiegowa-st-helens.html"));
  assert.doesNotMatch(html, /siedzib/i);
});

for (const file of livePages("pl")) {
  test(`${file}: no masculine 'samozatrudniony' and no 'gwarant'`, () => {
    const html = read(file);
    // Whole word only: plural/neutral 'samozatrudnionych', 'samozatrudnione' are fine.
    assert.doesNotMatch(html, /samozatrudniony(?!\p{L})/iu);
    assert.doesNotMatch(html, /gwarant/i);
    // Other masculine reader forms replaced in the same cleanup.
    assert.doesNotMatch(
      html,
      /(?<!\p{L})(byłeś|musiałeś|miałeś|powinieneś)(?!\p{L})|jesteś (zwolniony|zarejestrowany|wykluczony)(?!\p{L})|możesz być zwolniony/iu,
    );
  });
}

for (const file of livePages("en")) {
  test(`${file}: no 'guarantee' promises`, () => {
    assert.doesNotMatch(read(file), /guarantee/i);
  });
}

test("EN SA: accountant 'helps make sure', does not 'ensure' the return", () => {
  const html = read("self-assessment-tax-returns.html");
  assert.doesNotMatch(html, /ensures? your return/i);
  assert.match(html, /helps make sure/);
});
