import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import {
  SITE_URL,
  hreflangLanguages,
  sharedRobots,
  buildJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Sabina Krajewska Bookkeeping",
  title: {
    default: "Polska księgowa St Helens i Liverpool | Sabina Krajewska",
    template: "%s | Sabina Krajewska Księgowość",
  },
  description:
    "Księgowość, VAT, Self Assessment i spółki Ltd — St Helens i Liverpool, a zdalnie w całej Wielkiej Brytanii. Po polsku i angielsku.",
  keywords: [
    "polski księgowy Liverpool",
    "polska księgowa Liverpool",
    "polski księgowy UK",
    "księgowość dla Polaków UK",
    "rozliczenie podatku w UK po polsku",
    "self assessment dla Polaków",
    "rozliczenie self assessment po polsku",
    "polski księgowy self employed",
    "VAT dla Polaków UK",
    "spółka LTD dla Polaków",
    "zakładanie firmy w UK po polsku",
    "doradztwo HMRC po polsku",
    "księgowy dla samozatrudnionych UK",
  ],
  openGraph: {
    title: "Polska księgowa St Helens i Liverpool | Sabina Krajewska",
    description:
      "Księgowość, Self Assessment, spółki Ltd, VAT i pomoc z HMRC po polsku — St Helens, Liverpool i zdalnie w całej Wielkiej Brytanii.",
    url: `${SITE_URL}/pl`,
    siteName: "Sabina Krajewska Bookkeeping",
    type: "website",
    locale: "pl_PL",
    alternateLocale: ["en_GB"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polska księgowa St Helens i Liverpool | Sabina Krajewska",
    description:
      "Księgowość po polsku w St Helens, Liverpoolu i zdalnie w UK — Self Assessment, Ltd, VAT, HMRC.",
  },
  robots: sharedRobots,
  alternates: {
    canonical: "/pl",
    languages: hreflangLanguages,
  },
};

export default function PlRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootShell lang="pl-PL" jsonLd={buildJsonLd("pl")}>
      {children}
    </RootShell>
  );
}
