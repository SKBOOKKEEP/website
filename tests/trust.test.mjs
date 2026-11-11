// Trust and qualification claims (SEO tasks T1.6 and T1.7).
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
const EN = ["index.html", "self-assessment-tax-returns.html", "privacy-policy.html"];
const PL = ["pl.html", join("pl", "self-assessment.html"), join("pl", "privacy-policy.html")];
const EN_LINE = "HMRC-supervised for anti-money laundering • ICO registered • Insured";
const PL_LINE = "Nadzór HMRC w zakresie przeciwdziałania praniu pieniędzy • Rejestracja w ICO • Ubezpieczenie";

for (const f of [...EN, ...PL]) {
  test(`${f}: no unsubstantiated qualification or professional-body claim`, () => {
    const html = read(f);
    assert.doesNotMatch(html, /qualified accountant|wykwalifikowan/i);
    assert.doesNotMatch(html, /\b(ACCA|AAT|ICB|IFA|ICAEW|CIMA|chartered)\b/);
    assert.doesNotMatch(html, /HMRC[- ](approved|registered agent|endorsed)/i);
  });
}

for (const [files, line] of [[EN, EN_LINE], [PL, PL_LINE]]) {
  for (const f of files) {
    test(`${f}: shows the approved trust line`, () => {
      assert.ok(read(f).includes(line), "trust line present (footer)");
    });
  }
}

test("home pages explain the registrations are not an endorsement", () => {
  assert.ok(read("index.html").includes("not an endorsement of my services or a quality mark"));
  assert.ok(read("pl.html").includes("nie rekomendacja moich usług ani znak jakości"));
});
