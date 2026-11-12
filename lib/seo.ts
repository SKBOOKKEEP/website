import type { Metadata } from "next";
import type { Locale } from "@/content/copy";
import { PHONE_E164, CONTACT_EMAIL } from "@/lib/nap";
import { getRoute, type RouteKey } from "@/lib/routes";

// Must match the primary domain configured on the host (apex redirects to www),
// otherwise canonicals and the sitemap point at a redirecting URL.
export const SITE_URL = "https://www.simple-bookkeeping.co.uk";

export const BUSINESS_NAME = "Sabina Krajewska Bookkeeping";

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
        name: BUSINESS_NAME,
        description: isPl
          ? "Polska księgowa w St Helens i Liverpoolu — rozliczenia, VAT i doradztwo HMRC po polsku."
          : "Accountant and bookkeeper in St Helens and Liverpool — bookkeeping, company tax, VAT returns, payroll and HMRC support.",
        // One canonical URL for the business in every language; the page's
        // language lives on its WebPage node (see buildPageJsonLd).
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
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
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS_NAME,
        inLanguage: ["en-GB", "pl-PL"],
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}

const absoluteUrl = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

/**
 * WebPage (+ BreadcrumbList on inner pages) for one published route. Rendered
 * by <PageJsonLd> on each page; references the layout's #website/#business.
 */
export function buildPageJsonLd(key: RouteKey, locale: Locale) {
  const page = getRoute(key)[locale];
  if (!page) throw new Error(`Route ${key} has no ${locale} path`);
  const url = absoluteUrl(page.path);
  const home = getRoute("home")[locale]!;
  const isHome = key === "home";
  // Page names come from the route map labels; home uses the business name.
  const name = isHome ? BUSINESS_NAME : page.label;
  const breadcrumbId = `${url}#breadcrumb`;

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    inLanguage: locale === "pl" ? "pl-PL" : "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#business` },
    ...(isHome ? {} : { breadcrumb: { "@id": breadcrumbId } }),
  };

  const graph: object[] = [webPage];
  if (!isHome) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: home.label, item: absoluteUrl(home.path) },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
