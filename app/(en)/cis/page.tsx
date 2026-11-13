import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import Cis from "@/components/sections/Cis";
import { en } from "@/content/copy";
import { cisCopy } from "@/content/cis";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = cisCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("cis", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/cis`,
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

export default function CisPage() {
  return (
    <>
      <PageJsonLd routeKey="cis" locale="en" />
      <NavBar content={en.nav} locale="en" routeKey="cis" />
      <Cis locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
