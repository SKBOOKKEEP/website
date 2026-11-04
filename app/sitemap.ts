import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-11-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const homeLanguages = {
    "en-GB": SITE_URL,
    "pl-PL": `${SITE_URL}/pl`,
    "x-default": SITE_URL,
  };

  const selfAssessmentLanguages = {
    "en-GB": `${SITE_URL}/self-assessment-tax-returns`,
    "pl-PL": `${SITE_URL}/pl/self-assessment`,
    "x-default": `${SITE_URL}/self-assessment-tax-returns`,
  };

  const privacyLanguages = {
    "en-GB": `${SITE_URL}/privacy-policy`,
    "pl-PL": `${SITE_URL}/pl/privacy-policy`,
  };

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${SITE_URL}/pl`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${SITE_URL}/self-assessment-tax-returns`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: selfAssessmentLanguages },
    },
    {
      url: `${SITE_URL}/pl/self-assessment`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: selfAssessmentLanguages },
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
    {
      url: `${SITE_URL}/pl/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
  ];
}
