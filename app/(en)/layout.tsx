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
      "Accountant & Bookkeeper Liverpool | Company Tax & VAT | Sabina Krajewska",
    template: "%s | Sabina Krajewska Bookkeeping",
  },
  description:
    "Accountant and bookkeeper in Liverpool. Bookkeeping, company tax (corporation tax), VAT returns, payroll and Self Assessment for sole traders and Ltd companies across Liverpool and Merseyside. Free 15-minute consultation.",
  keywords: [
    "accountant Liverpool",
    "bookkeeping Liverpool",
    "bookkeeper Liverpool",
    "company tax Liverpool",
    "corporation tax accountant Liverpool",
    "limited company accountant Liverpool",
    "accountant St Helens",
    "HMRC consulting Liverpool",
    "sole trader accountant Liverpool",
    "Ltd company accounts Liverpool",
    "VAT returns Liverpool",
    "self-employed accountant Liverpool",
    "tax returns Liverpool",
    "payroll Liverpool",
    "professional accountant Merseyside",
    "small business bookkeeping Liverpool",
    "Polish accountant Liverpool",
    "business accountant Liverpool",
    "affordable accountant Liverpool",
  ],
  openGraph: {
    title: "Accountant & Bookkeeper Liverpool | Company Tax & VAT | Sabina Krajewska",
    description:
      "Bookkeeping, company tax, VAT and HMRC support for Liverpool businesses. Clarity in your accounts so you can focus on growth.",
    url: SITE_URL,
    siteName: "Sabina Krajewska Bookkeeping",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pl_PL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accountant & Bookkeeper Liverpool | Sabina Krajewska",
    description:
      "Bookkeeping, company tax, VAT and HMRC support for Liverpool businesses.",
  },
  robots: sharedRobots,
  alternates: {
    canonical: "/",
    languages: hreflangLanguages,
  },
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
