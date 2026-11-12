import type { Metadata } from "next";
import type { Locale } from "@/content/copy";
import { PHONE_E164, CONTACT_EMAIL } from "@/lib/nap";

// Must match the primary domain configured on the host (apex redirects to www),
// otherwise canonicals and the sitemap point at a redirecting URL.
export const SITE_URL = "https://www.simple-bookkeeping.co.uk";

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
          ? "Polska księgowa w St Helens i Liverpoolu — rozliczenia, VAT i doradztwo HMRC po polsku."
          : "Accountant and bookkeeper in St Helens and Liverpool — bookkeeping, company tax, VAT returns, payroll and HMRC support.",
        url: isPl ? `${SITE_URL}/pl` : SITE_URL,
        inLanguage: isPl ? "pl-PL" : "en-GB",
        telephone: PHONE_E164,
        email: CONTACT_EMAIL,
        image: `${SITE_URL}/Sabina.jpeg`,
        areaServed: [
          { "@type": "City", name: "St Helens" },
          { "@type": "City", name: "Liverpool" },
          { "@type": "AdministrativeArea", name: "Merseyside" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "St Helens",
          postalCode: "WA9",
          addressRegion: "Merseyside",
          addressCountry: "GB",
        },
        // Deliberately coarse (~1 km, central St Helens): home-based business,
        // no precise pin (T1.5, owner decision 11 Nov 2026).
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.45,
          longitude: -2.74,
        },
        knowsLanguage: ["en", "pl"],
        serviceType: [
          "Bookkeeping",
          "HMRC Consulting",
          "VAT Returns",
          "Payroll",
          "Corporation Tax Returns",
          "Company Tax Planning",
          "Limited Company Accounts",
          "Sole Trader Accounts",
          "Self Assessment Tax Returns",
          "Construction Industry Scheme (CIS)",
          "Company Formation",
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
