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
    default:
      "Polski Księgowy w UK | Sabina Krajewska — Księgowość po Polsku",
    template: "%s | Sabina Krajewska Księgowość",
  },
  description:
    "Polska księgowa w Wielkiej Brytanii. Sabina Krajewska oferuje rozliczenia Self Assessment, obsługę spółek Ltd, VAT i pomoc z HMRC — po polsku, dla Polaków w UK.",
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
    title: "Polski Księgowy w UK | Sabina Krajewska — Księgowość po Polsku",
    description:
      "Rozliczenia Self Assessment, spółki Ltd, VAT i pomoc z HMRC — po polsku, dla Polaków w Wielkiej Brytanii.",
    url: `${SITE_URL}/pl`,
    siteName: "Sabina Krajewska Bookkeeping",
    type: "website",
    locale: "pl_PL",
    alternateLocale: ["en_GB"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polski Księgowy w UK | Sabina Krajewska",
    description:
      "Księgowość po polsku dla Polaków w UK — Self Assessment, Ltd, VAT, HMRC.",
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
