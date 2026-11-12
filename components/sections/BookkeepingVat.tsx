import Image from "next/image";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import {
  FIGURES_CHECKED_ON,
  bookkeepingCopy,
} from "@/content/bookkeeping";
import { formatDate } from "@/content/self-assessment";
import { SITE_URL } from "@/lib/seo";
import { getRoute, publishedPath } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Page-level structured data: WebPage, BreadcrumbList, Service and FAQPage.
 * All of them point at the single #business entity from the layout; none
 * defines a business of its own. FAQPage is built from the same copy as the
 * visible FAQ, so the two always match word for word. No Offer or price.
 */
export function bookkeepingJsonLd(locale: Locale) {
  const c = bookkeepingCopy[locale];
  const route = getRoute("bookkeeping");
  const home = getRoute("home");
  const url = abs(route[locale]!.path);
  const business = { "@id": `${SITE_URL}/#business` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: locale === "pl" ? "pl-PL" : "en-GB",
        about: business,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(route.lastModified ? { dateModified: route.lastModified } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: home[locale]!.label,
            item: abs(home[locale]!.path),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: route[locale]!.label,
            item: url,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name:
          locale === "pl"
            ? "Księgowość i deklaracje VAT"
            : "Bookkeeping and VAT returns",
        serviceType: "Bookkeeping",
        description: c.description,
        provider: business,
        areaServed: [
          { "@type": "City", name: "St Helens" },
          { "@type": "City", name: "Liverpool" },
          { "@type": "AdministrativeArea", name: "Merseyside" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        availableLanguage: ["en", "pl"],
        url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/** Shared body of the EN and PL Bookkeeping & VAT pages (T2.2). */
export default function BookkeepingVat({ locale }: { locale: Locale }) {
  const c = bookkeepingCopy[locale];
  const homePath = locale === "pl" ? "/pl" : "/";
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  // MTD for Income Tax page once it exists, otherwise the SA page's MTD section.
  const mtdHref =
    publishedPath("mtdIncomeTax", locale) ??
    `${publishedPath("selfAssessment", locale) ?? homePath}#mtd-income-tax`;
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookkeepingJsonLd(locale)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Hero */}
      <section className="relative py-20 bg-primary-container overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-tight font-bold text-surface-bright mb-6">
                {c.h1}
              </h1>
              <p className="text-lg text-on-primary-container mb-8 max-w-xl">
                {c.lead}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href={bookingHref} variant="outline-light" size="lg">
                  {c.ctaBook}
                </Button>
                <Button href={contactHref} variant="outline-light" size="lg">
                  {c.ctaContact}
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/biuro.png"
                alt={c.heroImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What the service includes */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.includesHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 bg-surface-container-low rounded-lg"
              >
                <CheckCircle
                  className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-on-surface-variant">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VAT */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.vatHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <dl className="space-y-5 text-on-surface-variant">
              {c.vatPoints.map((p) => (
                <div key={p.label}>
                  <dt className="font-semibold text-primary">{p.label}</dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>
            <div className="space-y-4 text-on-surface-variant">
              <p className="bg-surface p-6 rounded-lg font-medium text-primary">
                {c.vatWhatIDo}
              </p>
              <p>{c.vatSchemes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MTD */}
      <section className="py-20 bg-surface" aria-labelledby="mtd-vat-income-tax">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="mtd-vat-income-tax"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.mtdHeading}
          </h2>
          <div className="space-y-4 text-on-surface-variant max-w-3xl">
            {c.mtdParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <a href={mtdHref} className={linkClass}>
                {c.mtdMoreLink}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
                {c.documentsHeading}
              </h2>
              <p className="text-on-surface-variant mb-4">{c.documentsIntro}</p>
              <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
                {c.documents.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface p-6 rounded-lg self-start">
              <h3 className="font-semibold text-primary mb-3">
                {c.recordsHeading}
              </h3>
              <p className="text-on-surface-variant">{c.records}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Working together */}
      <section className="py-20 bg-primary-container">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-surface-bright mb-8">
            {c.workingHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-6 mb-10">
            {c.working.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-on-primary-container"
              >
                <CheckCircle
                  className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button href={bookingHref} variant="outline-light" size="lg">
              {c.ctaBook}
            </Button>
            <Button href={contactHref} variant="outline-light" size="lg">
              {c.ctaContact}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface" aria-labelledby="faq">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="faq"
            className="font-serif text-3xl font-semibold text-primary mb-8"
          >
            {c.faqHeading}
          </h2>
          <div className="space-y-6 max-w-3xl">
            {c.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-primary mb-1">
                  {f.question}
                </h3>
                <p className="text-on-surface-variant">{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-sm text-on-surface-variant max-w-3xl">
            <p className="mb-4" data-testid="tax-disclaimer">
              {c.disclaimer(checkedOn)}
            </p>
            <h3 className="font-semibold text-primary mb-2">
              {c.sourcesHeading}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {c.sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
