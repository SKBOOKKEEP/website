import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import Liverpool from "@/components/sections/Liverpool";
import { pl } from "@/content/copy";
import { liverpoolCopy } from "@/content/liverpool";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = liverpoolCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("liverpool", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/ksiegowa-liverpool`,
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

export default function LiverpoolPagePl() {
  return (
    <>
      <PageJsonLd routeKey="liverpool" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="liverpool" />
      <Liverpool locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
