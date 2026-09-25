import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Bump when page content meaningfully changes. A per-build `new Date()` makes
// every deploy look like a content change, so Google learns to ignore lastmod.
const LAST_MODIFIED = new Date("2026-09-24");

export default function sitemap(): MetadataRoute.Sitemap {
  // Both pages share the same hreflang alternates so they cross-reference.
  const languages = {
    "en-GB": SITE_URL,
    "pl-PL": `${SITE_URL}/pl`,
    "x-default": SITE_URL,
  };

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/pl`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
