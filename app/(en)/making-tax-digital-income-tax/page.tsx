import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import MtdIncomeTax from "@/components/sections/MtdIncomeTax";
import { en } from "@/content/copy";
import { mtdCopy } from "@/content/mtd-income-tax";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = mtdCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("mtdIncomeTax", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/making-tax-digital-income-tax`,
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

export default function MtdIncomeTaxPage() {
  return (
    <>
      <PageJsonLd routeKey="mtdIncomeTax" locale="en" />
      <NavBar content={en.nav} locale="en" routeKey="mtdIncomeTax" />
      <MtdIncomeTax locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
