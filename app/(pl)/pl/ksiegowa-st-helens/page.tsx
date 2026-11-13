import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import StHelens from "@/components/sections/StHelens";
import { pl } from "@/content/copy";
import { stHelensCopy } from "@/content/st-helens";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = stHelensCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("stHelens", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/ksiegowa-st-helens`,
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

export default function StHelensPagePl() {
  return (
    <>
      <PageJsonLd routeKey="stHelens" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="stHelens" />
      <StHelens locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
