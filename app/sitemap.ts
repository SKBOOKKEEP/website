import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { publishedRoutes, languageAlternates } from "@/lib/routes";
import type { Locale } from "@/content/copy";

const LOCALES: Locale[] = ["en", "pl"];

/**
 * Built from the route map: only published pairs appear, each with its
 * hreflang alternates and the date its content last really changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return publishedRoutes().flatMap((route) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(route.key)).map(([lang, path]) => [
        lang,
        `${SITE_URL}${path === "/" ? "" : path}`,
      ]),
    );
    return LOCALES.flatMap((locale) => {
      const page = route[locale];
      if (!page) return [];
      return [
        {
          url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
          lastModified: route.lastModified ? new Date(route.lastModified) : undefined,
          changeFrequency: route.kind === "legal" ? "yearly" : "monthly",
          priority: page.priority,
          ...(Object.keys(languages).length ? { alternates: { languages } } : {}),
        } satisfies MetadataRoute.Sitemap[number],
      ];
    });
  });
}
