import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import StHelens from "@/components/sections/StHelens";
import { en } from "@/content/copy";
import { stHelensCopy } from "@/content/st-helens";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = stHelensCopy.en;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("stHelens", "en"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/bookkeeping-st-helens`,
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

export default function StHelensPage() {
  return (
    <>
      <NavBar content={en.nav} locale="en" routeKey="stHelens" />
      <StHelens locale="en" />
      <Footer content={en.footer} locale="en" />
    </>
  );
}
