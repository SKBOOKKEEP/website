import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import Liverpool from "@/components/sections/Liverpool";
import { en } from "@/content/copy";
import { liverpoolCopy } from "@/content/liverpool";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = liverpoolCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("liverpool", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/bookkeeping-liverpool`,
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

export default function LiverpoolPage() {
  return (
    <>
      <PageJsonLd routeKey="liverpool" locale="en" />
      <NavBar content={en.nav} locale="en" routeKey="liverpool" />
      <Liverpool locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
