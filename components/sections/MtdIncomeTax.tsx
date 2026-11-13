import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import {
  FIGURES_CHECKED_ON,
  QUARTERS,
  mtdCopy,
} from "@/content/mtd-income-tax";
import {
  MTD_COHORTS,
  formatDate,
  formatPounds,
} from "@/content/self-assessment";
import { SITE_URL } from "@/lib/seo";
import { getRoute, publishedPath } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Page-level structured data: Service and FAQPage, both pointing at the
 * single #business entity from the layout; neither defines a business of
 * its own. FAQPage is built from the same copy as the visible FAQ, so the
 * two always match word for word. No Offer or price. WebPage + BreadcrumbList
 * for this route are rendered once, centrally, by <PageJsonLd> instead.
 */
export function mtdIncomeTaxJsonLd(locale: Locale) {
  const c = mtdCopy[locale];
  const route = getRoute("mtdIncomeTax");
  const url = abs(route[locale]!.path);
  const business = { "@id": `${SITE_URL}/#business` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: c.serviceName,
        serviceType: "Bookkeeping",
        description: c.description,
        provider: business,
        areaServed: { "@type": "Country", name: "United Kingdom" },
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

function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle
        className="w-5 h-5 text-secondary shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

/** Shared body of the EN and PL Making Tax Digital for Income Tax guides (T2.5). */
export default function MtdIncomeTax({ locale }: { locale: Locale }) {
  const c = mtdCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  const saHref = publishedPath("selfAssessment", locale);
  // Only rendered once the Bookkeeping & VAT pair is published (T2.2).
  const bookkeepingHref = publishedPath("bookkeeping", locale);
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mtdIncomeTaxJsonLd(locale)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Hero: answer first */}
      <section className="relative py-20 bg-primary-container overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 md:px-16">
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-tight font-bold text-surface-bright mb-6">
            {c.h1}
          </h1>
          <p className="text-lg text-on-primary-container mb-4">{c.lead}</p>
          <p className="text-sm text-on-primary-container mb-8">
            {c.checkedLine(checkedOn)}
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
      </section>

      {/* Who and when */}
      <section className="py-20 bg-surface" aria-labelledby="who-and-when">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="who-and-when"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.whoHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              <p>{c.whoIntro}</p>
              <ul className="space-y-3">
                {c.whoConditions.map((item) => (
                  <Tick key={item}>{item}</Tick>
                ))}
              </ul>
              {c.whoNotes.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <a href={c.checker.href} className={linkClass}>
                  {c.checker.label}
                </a>
              </p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg self-start">
              <table className="w-full text-left text-on-surface-variant">
                <caption className="font-semibold text-primary mb-4 text-left">
                  {c.tableCaption}
                </caption>
                <thead>
                  <tr className="text-sm">
                    <th scope="col" className="pb-2 pr-3 font-semibold">
                      {c.colIncome}
                    </th>
                    <th scope="col" className="pb-2 pr-3 font-semibold">
                      {c.colYear}
                    </th>
                    <th scope="col" className="pb-2 font-semibold">
                      {c.colStart}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MTD_COHORTS.map((row) => (
                    <tr
                      key={row.start}
                      className="border-t border-outline-variant"
                    >
                      <td className="py-2 pr-3">
                        {c.incomeCell(formatPounds(row.threshold, locale))}
                      </td>
                      <td className="py-2 pr-3">{row.basisYear}</td>
                      <td className="py-2 font-semibold text-secondary">
                        {formatDate(row.start, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifying income */}
      <section
        className="py-20 bg-surface-container-lowest"
        aria-labelledby="qualifying-income"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="qualifying-income"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.qualifyingHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-on-surface-variant">
            <div className="space-y-4">
              <p>{c.qualifyingIntro}</p>
              <p className="bg-surface p-6 rounded-lg">{c.qualifyingExample}</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">
                {c.notQualifyingHeading}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {c.notQualifying.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{c.qualifyingNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exemptions */}
      <section className="py-20 bg-surface" aria-labelledby="exemptions">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="exemptions"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.exemptHeading}
          </h2>
          <div className="space-y-4 text-on-surface-variant max-w-3xl">
            <p>{c.exemptIntro}</p>
            <ul className="list-disc pl-5 space-y-2">
              {c.exemptPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="space-y-1">
              {[c.checker, ...c.exemptLinks].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quarterly updates */}
      <section
        className="py-20 bg-surface-container-lowest"
        aria-labelledby="quarterly-updates"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="quarterly-updates"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.quarterlyHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              {c.quarterlyIntro.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {c.quarterlyNotes.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <h3 className="font-semibold text-primary pt-2">
                {c.penaltiesHeading}
              </h3>
              <p>{c.penalties}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg self-start">
              <table className="w-full text-left text-on-surface-variant">
                <caption className="font-semibold text-primary mb-4 text-left">
                  {c.quarterTableCaption}
                </caption>
                <thead>
                  <tr className="text-sm">
                    <th scope="col" className="pb-2 pr-3 font-semibold">
                      {c.colPeriod}
                    </th>
                    <th scope="col" className="pb-2 font-semibold">
                      {c.colDue}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {QUARTERS.map((q) => (
                    <tr key={q.en} className="border-t border-outline-variant">
                      <td className="py-2 pr-3">{q[locale]}</td>
                      <td className="py-2 font-semibold text-secondary">
                        {locale === "pl" ? q.duePl : q.dueEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Final declaration + software + VAT box */}
      <section className="py-20 bg-surface" aria-labelledby="final-declaration">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              <h2
                id="final-declaration"
                className="font-serif text-3xl font-semibold text-primary mb-2"
              >
                {c.finalHeading}
              </h2>
              {c.finalParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <h3 className="font-semibold text-primary pt-4">
                {c.softwareHeading}
              </h3>
              <p>{c.software}</p>
              <ul className="space-y-1">
                {c.softwareLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <aside
              className="bg-surface-container-low border-l-4 border-secondary p-6 rounded-lg self-start text-on-surface-variant space-y-3"
              aria-labelledby="not-mtd-vat"
              data-testid="not-mtd-vat"
            >
              <h2 id="not-mtd-vat" className="font-semibold text-primary text-xl">
                {c.vatBoxHeading}
              </h2>
              {c.vatBox.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {bookkeepingHref && (
                <p>
                  <a href={bookkeepingHref} className={linkClass}>
                    {c.vatBoxLink}
                  </a>
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* How I can help */}
      <section className="py-20 bg-primary-container" aria-labelledby="how-i-help">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="how-i-help"
            className="font-serif text-3xl font-semibold text-surface-bright mb-4"
          >
            {c.helpHeading}
          </h2>
          <p className="text-on-primary-container mb-8 max-w-3xl">
            {c.helpIntro}
          </p>
          <ul className="grid sm:grid-cols-2 gap-6 mb-8 text-on-primary-container">
            {c.help.map((item) => (
              <Tick key={item}>{item}</Tick>
            ))}
          </ul>
          <p className="text-on-primary-container mb-6 max-w-3xl">
            {c.helpNote}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-on-primary-container">
            {saHref && (
              <li>
                <a href={saHref} className="underline underline-offset-2 hover:text-surface-bright">
                  {c.saLink}
                </a>
              </li>
            )}
            {bookkeepingHref && (
              <li>
                <a href={bookkeepingHref} className="underline underline-offset-2 hover:text-surface-bright">
                  {c.bookkeepingLink}
                </a>
              </li>
            )}
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
