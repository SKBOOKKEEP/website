import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BookkeepingVat from "@/components/sections/BookkeepingVat";
import { en } from "@/content/copy";
import { bookkeepingCopy } from "@/content/bookkeeping";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = bookkeepingCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("bookkeeping", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/bookkeeping-vat`,
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

export default function BookkeepingVatPage() {
  return (
    <>
      <NavBar content={en.nav} locale="en" routeKey="bookkeeping" />
      <BookkeepingVat locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
