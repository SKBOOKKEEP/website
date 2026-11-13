import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import Cis from "@/components/sections/Cis";
import { pl } from "@/content/copy";
import { cisCopy } from "@/content/cis";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = cisCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("cis", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/cis`,
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

export default function CisPagePl() {
  return (
    <>
      <PageJsonLd routeKey="cis" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="cis" />
      <Cis locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
