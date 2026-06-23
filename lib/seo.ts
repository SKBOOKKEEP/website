import type { Metadata } from "next";
import type { Locale } from "@/content/copy";

export const SITE_URL = "https://simple-bookkeeping.co.uk";

/**
 * Reciprocal hreflang map shared by every localized page. Both the English (/)
 * and Polish (/pl) pages reference the same set so the alternates cross-link.
 */
export const hreflangLanguages = {
  "en-GB": "/",
  "pl-PL": "/pl",
  "x-default": "/",
};

export const sharedRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

/**
 * Single business/person entity, localized per page. The @id values stay
 * constant so search engines treat both pages as the same organisation.
 */
export function buildJsonLd(locale: Locale) {
  const isPl = locale === "pl";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": `${SITE_URL}/#business`,
        name: "Sabina Krajewska Bookkeeping",
        description: isPl
          ? "Polska księgowa w Liverpoolu i Merseyside — rozliczenia, VAT i doradztwo HMRC po polsku."
          : "Professional bookkeeping and HMRC consulting services in Liverpool and Merseyside.",
        url: isPl ? `${SITE_URL}/pl` : SITE_URL,
        inLanguage: isPl ? "pl-PL" : "en-GB",
        telephone: "+447312026090",
        email: "contact@simple-bookkeeping.co.uk",
        image: `${SITE_URL}/Sabina.jpeg`,
        sameAs: ["https://www.facebook.com/share/1EWvARkhhL/"],
        areaServed: [
          { "@type": "City", name: "Liverpool" },
          { "@type": "AdministrativeArea", name: "Merseyside" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Liverpool",
          addressRegion: "Merseyside",
          addressCountry: "GB",
        },
        priceRange: "££",
        knowsLanguage: ["en", "pl"],
        serviceType: [
          "Bookkeeping",
          "HMRC Consulting",
          "VAT Returns",
          "Payroll",
          "Corporate Tax Planning",
          "Sole Trader Accounts",
        ],
        founder: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Sabina Krajewska",
        jobTitle: "Accountant & Bookkeeper",
        image: `${SITE_URL}/Sabina.jpeg`,
        knowsLanguage: ["en", "pl"],
        worksFor: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}
