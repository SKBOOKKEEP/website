import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Footer from "@/components/Footer";
import Payroll from "@/components/sections/Payroll";
import { en } from "@/content/copy";
import { payrollCopy } from "@/content/payroll";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = payrollCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("payroll", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/payroll`,
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

export default function PayrollPage() {
  return (
    <>
      <PageJsonLd routeKey="payroll" locale="en" />
      <NavBar content={en.nav} locale="en" routeKey="payroll" />
      <Payroll locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
