import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import HmrcSupport from "@/components/sections/HmrcSupport";
import { pl } from "@/content/copy";
import { hmrcSupportCopy } from "@/content/hmrc-support";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = hmrcSupportCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("hmrcSupport", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/pomoc-hmrc`,
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

export default function HmrcSupportPagePl() {
  return (
    <>
      <PageJsonLd routeKey="hmrcSupport" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="hmrcSupport" />
      <HmrcSupport locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
