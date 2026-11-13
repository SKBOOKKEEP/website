import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import MtdIncomeTax from "@/components/sections/MtdIncomeTax";
import { pl } from "@/content/copy";
import { mtdCopy } from "@/content/mtd-income-tax";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = mtdCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("mtdIncomeTax", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/making-tax-digital-income-tax`,
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

export default function MtdIncomeTaxPagePl() {
  return (
    <>
      <PageJsonLd routeKey="mtdIncomeTax" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="mtdIncomeTax" />
      <MtdIncomeTax locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
