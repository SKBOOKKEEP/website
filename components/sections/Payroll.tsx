import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import { FIGURES_CHECKED_ON, payrollCopy } from "@/content/payroll";
import { formatDate } from "@/content/self-assessment";
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
export function payrollJsonLd(locale: Locale) {
  const c = payrollCopy[locale];
  const route = getRoute("payroll");
  const url = abs(route[locale]!.path);
  const business = { "@id": `${SITE_URL}/#business` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: locale === "pl" ? "Payroll i rozliczenia PAYE" : "Payroll and PAYE processing",
        serviceType: "Payroll",
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

/** Shared body of the EN and PL Payroll pages (T2.8). */
export default function Payroll({ locale }: { locale: Locale }) {
  const c = payrollCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  // Only rendered once published.
  const limitedCompanyHref = publishedPath("limitedCompany", locale);
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(payrollJsonLd(locale)).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="relative py-20 bg-primary-container overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 md:px-16">
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-tight font-bold text-surface-bright mb-6">
            {c.h1}
          </h1>
          <p className="text-lg text-on-primary-container mb-8">{c.lead}</p>
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

      {/* What payroll involves */}
      <section className="py-20 bg-surface" aria-labelledby="what-payroll">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="what-payroll" className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.whatHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-10">{c.whatIntro}</p>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {c.what.map((item) => (
              <div key={item.title} className="p-6 bg-surface-container-low rounded-lg">
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
          <p>
            <a href={c.whatLink.href} className={linkClass}>
              {c.whatLink.label}
            </a>
          </p>
        </div>
      </section>

      {/* Workplace pensions / auto-enrolment */}
      <section className="py-20 bg-surface-container-lowest" aria-labelledby="pensions">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="pensions" className="font-serif text-3xl font-semibold text-primary mb-6">
            {c.pensionHeading}
          </h2>
          <div
            className="bg-surface-container-low border-l-4 border-secondary p-6 rounded-lg space-y-3 text-on-surface-variant max-w-3xl mb-6"
            data-testid="pension-note"
          >
            {c.pensionParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p>
            <a href={c.pensionLink.href} className={linkClass}>
              {c.pensionLink.label}
            </a>
          </p>
        </div>
      </section>

      {/* What I can help with */}
      <section className="py-20 bg-primary-container" aria-labelledby="services">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="services" className="font-serif text-3xl font-semibold text-surface-bright mb-8">
            {c.servicesHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {c.services.map((item) => (
              <li key={item} className="flex items-start gap-3 text-on-primary-container">
                <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {limitedCompanyHref && (
            <p className="mb-8 text-on-primary-container">
              <a
                href={limitedCompanyHref}
                className="underline underline-offset-2 hover:text-surface-bright"
              >
                {locale === "pl" ? "Rozliczenia spółek Ltd" : "Limited company accounts"}
              </a>
            </p>
          )}
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

      {/* Working together */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">{c.workingHeading}</h2>
          <ul className="grid sm:grid-cols-2 gap-6">
            {c.working.map((item) => (
              <li key={item} className="flex items-start gap-3 text-on-surface-variant">
                <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface" aria-labelledby="faq">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="faq" className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.faqHeading}
          </h2>
          <div className="space-y-6 max-w-3xl">
            {c.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-primary mb-1">{f.question}</h3>
                <p className="text-on-surface-variant">{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-sm text-on-surface-variant max-w-3xl">
            <p className="mb-4" data-testid="tax-disclaimer">
              {c.disclaimer(checkedOn)}
            </p>
            <h3 className="font-semibold text-primary mb-2">{c.sourcesHeading}</h3>
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
