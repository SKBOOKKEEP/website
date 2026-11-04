import { Manrope, Libre_Caslon_Text } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
  display: "swap",
});

export default function RootShell({
  lang,
  jsonLd,
  children,
}: {
  lang: string;
  jsonLd: object;
  children: React.ReactNode;
}) {
  const locale = lang.startsWith("pl") ? "pl" : "en";

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${libreCaslon.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
