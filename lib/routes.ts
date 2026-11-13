import data from "@/content/routes.json";
import type { Locale } from "@/content/copy";

/**
 * Public EN/PL page pairs. Data lives in content/routes.json so the
 * node:test suite can read the same list. See that file for the rules.
 */
export type RouteKey =
  | "home"
  | "selfAssessment"
  | "bookkeeping"
  | "mtdIncomeTax"
  | "limitedCompany"
  | "payroll"
  | "hmrcSupport"
  | "cis"
  | "companyFormation"
  | "stHelens"
  | "liverpool"
  | "polishUk"
  | "privacy";

export type RouteKind = "home" | "service" | "location" | "legal";

interface LocaleRoute {
  path: string;
  label: string;
  priority: number;
}

export interface RoutePair {
  key: RouteKey;
  kind: RouteKind;
  published: boolean;
  lastModified: string | null;
  en?: LocaleRoute;
  pl?: LocaleRoute;
}

const HREFLANG: Record<Locale, string> = { en: "en-GB", pl: "pl-PL" };
const LOCALES: Locale[] = ["en", "pl"];
const HOME: Record<Locale, string> = { en: "/", pl: "/pl" };

export const ROUTES = data.routes as RoutePair[];

export function getRoute(key: RouteKey): RoutePair {
  const route = ROUTES.find((r) => r.key === key);
  if (!route) throw new Error(`Unknown route key: ${key}`);
  return route;
}

export function publishedRoutes(): RoutePair[] {
  return ROUTES.filter((r) => r.published);
}

/** Path for a locale only if the pair is published and that locale exists. */
export function publishedPath(key: RouteKey, locale: Locale): string | undefined {
  const route = getRoute(key);
  return route.published ? route[locale]?.path : undefined;
}

/**
 * hreflang map for a published pair. x-default points at the English page
 * when there is one (T1.10). Single-language pages get no alternates.
 */
export function languageAlternates(key: RouteKey): Record<string, string> {
  const route = getRoute(key);
  if (!route.published) return {};
  const present = LOCALES.filter((l) => route[l]);
  if (present.length < 2) return {};
  const languages: Record<string, string> = {};
  for (const l of present) languages[HREFLANG[l]] = route[l]!.path;
  languages["x-default"] = route.en!.path;
  return languages;
}

/** Canonical + alternates block for a page's Metadata. */
export function pageAlternates(key: RouteKey, locale: Locale) {
  const route = getRoute(key);
  const path = route[locale]?.path;
  if (!path) throw new Error(`Route ${key} has no ${locale} path`);
  return { canonical: path, languages: languageAlternates(key) };
}

/**
 * Where the language switcher should send someone on this page: the
 * equivalent page in the other language, or that language's home page.
 */
export function switcherHrefs(key: RouteKey): Record<Locale, string> {
  const result = { ...HOME };
  for (const l of LOCALES) {
    const path = publishedPath(key, l);
    if (path) result[l] = path;
  }
  return result;
}

/** Published service and location pages for footer lists, in file order. */
export function footerRoutes(locale: Locale): { href: string; label: string }[] {
  return publishedRoutes()
    .filter((r) => (r.kind === "service" || r.kind === "location") && r[locale])
    .map((r) => ({ href: r[locale]!.path, label: r[locale]!.label }));
}
