import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import CompanyFormation from "@/components/sections/CompanyFormation";
import { pl } from "@/content/copy";
import { companyFormationCopy } from "@/content/company-formation";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = companyFormationCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("companyFormation", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/zakladanie-spolki-ltd`,
    type: "website",
    locale: "pl_PL",
    alternateLocale: ["en_GB"],
  },
  twitter: {
    card: "summary_large_image",
    title: c.ogTitle,
    description: c.ogDescription,
  },
};

export default function CompanyFormationPagePl() {
  return (
    <>
      <PageJsonLd routeKey="companyFormation" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="companyFormation" />
      <CompanyFormation locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
