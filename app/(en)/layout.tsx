import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import {
  SITE_URL,
  sharedRobots,
  buildJsonLd,
} from "@/lib/seo";
import { pageAlternates } from "@/lib/routes";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Sabina Krajewska Bookkeeping",
  title: {
    default: "Accountant & Bookkeeper St Helens & Liverpool | Sabina Krajewska",
    template: "%s | Sabina Krajewska Bookkeeping",
  },
  description:
    "Bookkeeping, VAT, Self Assessment and Ltd company accounts in St Helens and Liverpool. Based in St Helens, working remotely across the UK, in English and Polish.",
  openGraph: {
    title: "Accountant & Bookkeeper St Helens & Liverpool | Sabina Krajewska",
    description:
      "Bookkeeping, VAT and Self Assessment support for businesses in St Helens and Liverpool, in English and Polish.",
    url: SITE_URL,
    siteName: "Sabina Krajewska Bookkeeping",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pl_PL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accountant & Bookkeeper St Helens & Liverpool | Sabina Krajewska",
    description:
      "Bookkeeping, VAT and Self Assessment support in St Helens and Liverpool.",
  },
  robots: sharedRobots,
  alternates: pageAlternates("home", "en"),
};

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootShell lang="en-GB" jsonLd={buildJsonLd("en")}>
      {children}
    </RootShell>
  );
}
