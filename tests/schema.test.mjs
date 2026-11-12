// Business schema (SEO task T1.5): one #business AccountingService on every
// published page, geo coarsened to ~1 km (2 decimal places, central St Helens),
// owner-confirmed services listed, and no street address anywhere.
// Run with: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUSINESS_ID = "https://www.simple-bookkeeping.co.uk/#business";
const APP_DIR = join(process.cwd(), ".next", "server", "app");
const { routes } = JSON.parse(readFileSync(join(process.cwd(), "content", "routes.json"), "utf8"));
const paths = routes
  .filter((r) => r.published)
  .flatMap((r) => ["en", "pl"].filter((l) => r[l]).map((l) => r[l].path));

const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1]),
  );

/** Every object anywhere inside the JSON-LD (nested included). */
const walk = (value, out = []) => {
  if (Array.isArray(value)) value.forEach((v) => walk(v, out));
  else if (value && typeof value === "object") {
    out.push(value);
    Object.values(value).forEach((v) => walk(v, out));
  }
  return out;
};

const decimals = (n) => {
  assert.equal(typeof n, "number", `geo value ${n} is a number`);
  const [, frac = ""] = String(n).split(".");
  return frac.length;
};

test("routes.json lists published pages", () => {
  assert.ok(paths.length > 0);
});

for (const path of paths) {
  test(`${path}: one #business node, coarse geo, confirmed services, no street address`, () => {
    const file = join(APP_DIR, fileFor(path));
    assert.ok(existsSync(file), `Missing prerendered ${path} — run \`npm run build\` first`);
    const html = readFileSync(file, "utf8");
    const blocks = jsonLd(html);
    assert.ok(blocks.length > 0, "JSON-LD present");
    const nodes = walk(blocks);

    // Exactly one full definition; other nodes may only reference it by @id.
    const defs = nodes.filter((n) => n["@id"] === BUSINESS_ID && Object.keys(n).length > 1);
    assert.equal(defs.length, 1, "exactly one #business node");
    const business = defs[0];
    assert.equal(business["@type"], "AccountingService");

    assert.equal(business.geo["@type"], "GeoCoordinates");
    assert.ok(decimals(business.geo.latitude) <= 2, `latitude ${business.geo.latitude} has at most 2 dp`);
    assert.ok(decimals(business.geo.longitude) <= 2, `longitude ${business.geo.longitude} has at most 2 dp`);
    assert.equal(business.geo.latitude, 53.45);
    assert.equal(business.geo.longitude, -2.74);

    for (const s of ["Construction Industry Scheme (CIS)", "Company Formation"]) {
      assert.ok(business.serviceType.includes(s), `serviceType includes ${s}`);
    }
    assert.equal(business.makesOffer, undefined, "no Offers");

    for (const n of nodes) assert.equal(n.streetAddress, undefined, "no streetAddress in JSON-LD");
    assert.doesNotMatch(html, /streetAddress/, "no streetAddress anywhere in the page");
  });
}
