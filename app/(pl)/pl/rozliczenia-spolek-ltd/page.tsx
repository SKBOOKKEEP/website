import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import LimitedCompany from "@/components/sections/LimitedCompany";
import { pl } from "@/content/copy";
import { limitedCompanyCopy } from "@/content/limited-company";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = limitedCompanyCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("limitedCompany", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/rozliczenia-spolek-ltd`,
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

export default function LimitedCompanyPagePl() {
  return (
    <>
      <PageJsonLd routeKey="limitedCompany" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="limitedCompany" />
      <LimitedCompany locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
