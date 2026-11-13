import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PolishUk from "@/components/sections/PolishUk";
import { pl } from "@/content/copy";
import { polishUkCopy } from "@/content/polish-uk";
import { SITE_URL } from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

const c = polishUkCopy;

export const metadata: Metadata = {
  title: { absolute: c.title },
  description: c.description,
  alternates: pageAlternates("polishUk", "pl"),
  openGraph: {
    title: c.ogTitle,
    description: c.ogDescription,
    siteName: "Sabina Krajewska Bookkeeping",
    url: `${SITE_URL}/pl/polska-ksiegowa-uk`,
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

export default function PolishUkPage() {
  return (
    <>
      <NavBar content={pl.nav} locale="pl" routeKey="polishUk" />
      <PolishUk />
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
