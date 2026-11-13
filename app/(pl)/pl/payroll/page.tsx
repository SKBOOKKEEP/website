import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import Payroll from "@/components/sections/Payroll";
import { pl } from "@/content/copy";
import { payrollCopy } from "@/content/payroll";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = payrollCopy.pl;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("payroll", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/payroll`,
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

export default function PayrollPagePl() {
  return (
    <>
      <PageJsonLd routeKey="payroll" locale="pl" />
      <NavBar content={pl.nav} locale="pl" routeKey="payroll" />
      <Payroll locale="pl" />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
