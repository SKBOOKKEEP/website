import type { Metadata } from "next";
import { Manrope, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Sabina Krajewska Bookkeeping",
  description:
    "Professional bookkeeping and HMRC consulting services in Liverpool and Merseyside.",
  url: "https://sabinakrajewska.co.uk",
  areaServed: [
    { "@type": "City", name: "Liverpool" },
    { "@type": "AdministrativeArea", name: "Merseyside" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Liverpool",
    addressRegion: "Merseyside",
    addressCountry: "GB",
  },
  priceRange: "££",
  knowsLanguage: ["en", "pl"],
  serviceType: [
    "Bookkeeping",
    "HMRC Consulting",
    "VAT Returns",
    "Payroll",
    "Corporate Tax Planning",
    "Sole Trader Accounts",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sabinakrajewska.co.uk"),
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
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabina Krajewska | Accountant & Bookkeeper Liverpool",
    description:
      "Expert bookkeeping and HMRC consulting for Liverpool businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${manrope.variable} ${libreCaslon.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
