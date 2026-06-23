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
    default: "Sabina Krajewska | Accountant & Bookkeeper Liverpool",
    template: "%s | Sabina Krajewska Bookkeeping",
  },
  description:
    "Expert bookkeeping and HMRC consulting in Liverpool. Sabina Krajewska provides professional accounting services for sole traders, Ltd companies, and self-employed professionals across Merseyside.",
  keywords: [
    "accountant Liverpool",
    "bookkeeping Liverpool",
    "bookkeeper Liverpool",
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
    title: "Sabina Krajewska | Accountant & Bookkeeper Liverpool",
    description:
      "Expert bookkeeping and HMRC consulting tailored to Liverpool businesses. Clarity in your accounts so you can focus on growth.",
    url: SITE_URL,
    siteName: "Sabina Krajewska Bookkeeping",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pl_PL"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabina Krajewska | Accountant & Bookkeeper Liverpool",
    description:
      "Expert bookkeeping and HMRC consulting for Liverpool businesses.",
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
