import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HmrcSupport from "@/components/sections/HmrcSupport";
import { en } from "@/content/copy";
import { hmrcSupportCopy } from "@/content/hmrc-support";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = hmrcSupportCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("hmrcSupport", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/hmrc-support`,
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

export default function HmrcSupportPage() {
  return (
    <>
      <NavBar content={en.nav} locale="en" routeKey="hmrcSupport" />
      <HmrcSupport locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
