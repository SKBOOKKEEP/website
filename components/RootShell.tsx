import { Manrope, Libre_Caslon_Text } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "@/app/globals.css";

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

/**
 * Shared document shell rendered by each locale's root layout. Each route group
 * ((en) and (pl)) is its own root layout, so the <html>/<body> live here to keep
 * fonts, analytics, and the JSON-LD script in one place.
 */
export default function RootShell({
  lang,
  jsonLd,
  children,
}: {
  lang: string;
  jsonLd: object;
  children: React.ReactNode;
}) {
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
      </body>
    </html>
  );
}
