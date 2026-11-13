import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import CompanyFormation from "@/components/sections/CompanyFormation";
import { en } from "@/content/copy";
import { companyFormationCopy } from "@/content/company-formation";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = companyFormationCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("companyFormation", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/company-formation`,
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pl_PL"],
  },
  twitter: {
    card: "summary_large_image",
    title: c.ogTitle,
    description: c.ogDescription,
  },
};

export default function CompanyFormationPage() {
  return (
    <>
      <PageJsonLd routeKey="companyFormation" locale="en" />
      <NavBar content={en.nav} locale="en" routeKey="companyFormation" />
      <CompanyFormation locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
