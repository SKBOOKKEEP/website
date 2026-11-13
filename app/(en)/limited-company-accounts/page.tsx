import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LimitedCompany from "@/components/sections/LimitedCompany";
import { en } from "@/content/copy";
import { limitedCompanyCopy } from "@/content/limited-company";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = limitedCompanyCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("limitedCompany", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/limited-company-accounts`,
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

export default function LimitedCompanyPage() {
  return (
    <>
      <NavBar content={en.nav} locale="en" routeKey="limitedCompany" />
      <LimitedCompany locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
