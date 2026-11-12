import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BookkeepingVat from "@/components/sections/BookkeepingVat";
import { pl } from "@/content/copy";
import { bookkeepingCopy } from "@/content/bookkeeping";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = bookkeepingCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("bookkeeping", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/ksiegowosc-vat`,
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

export default function BookkeepingVatPagePl() {
  return (
    <>
      <NavBar content={pl.nav} locale="pl" routeKey="bookkeeping" />
      <BookkeepingVat locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
