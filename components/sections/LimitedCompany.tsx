import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import { FIGURES_CHECKED_ON, limitedCompanyCopy } from "@/content/limited-company";
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
export function limitedCompanyJsonLd(locale: Locale) {
  const c = limitedCompanyCopy[locale];
  const route = getRoute("limitedCompany");
  const url = abs(route[locale]!.path);
  const business = { "@id": `${SITE_URL}/#business` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name:
          locale === "pl"
            ? "Rozliczenia spółek Ltd i Corporation Tax"
            : "Limited company accounts and Corporation Tax",
        serviceType: "Accounting",
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

/** Shared body of the EN and PL Limited company accounts pages (T2.7). */
export default function LimitedCompany({ locale }: { locale: Locale }) {
  const c = limitedCompanyCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  // Only rendered once published.
  const hmrcSupportHref = publishedPath("hmrcSupport", locale);
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(limitedCompanyJsonLd(locale)).replace(
            /</g,
            "\\u003c",
          ),
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

      {/* Accounts vs Corporation Tax */}
      <section className="py-20 bg-surface" aria-labelledby="accounts-vs-ct">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="accounts-vs-ct"
            className="font-serif text-3xl font-semibold text-primary mb-4"
          >
            {c.differenceHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-10">
            {c.differenceIntro}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-6 rounded-lg">
              <h3 className="font-semibold text-primary text-xl mb-2">
                {c.accountsCard.heading}
              </h3>
              <p className="text-on-surface-variant mb-4">
                {c.accountsCard.text}
              </p>
              <ul className="space-y-2 text-on-surface-variant mb-4">
                {c.accountsCard.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a href={c.accountsCard.link.href} className={linkClass}>
                {c.accountsCard.link.label}
              </a>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg">
              <h3 className="font-semibold text-primary text-xl mb-2">
                {c.ctCard.heading}
              </h3>
              <p className="text-on-surface-variant mb-4">{c.ctCard.text}</p>
              <ul className="space-y-2 text-on-surface-variant mb-4">
                {c.ctCard.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a href={c.ctCard.link.href} className={linkClass}>
                {c.ctCard.link.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Director responsibilities */}
      <section
        className="py-20 bg-surface-container-lowest"
        aria-labelledby="director-responsibilities"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="director-responsibilities"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.directorHeading}
          </h2>
          <div className="space-y-4 text-on-surface-variant max-w-3xl">
            {c.directorParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <a href={c.directorLink.href} className={linkClass}>
                {c.directorLink.label}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="py-20 bg-surface" aria-labelledby="records">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2
                id="records"
                className="font-serif text-3xl font-semibold text-primary mb-4"
              >
                {c.recordsHeading}
              </h2>
              <p className="text-on-surface-variant mb-4">{c.recordsIntro}</p>
              <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
                {c.records.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg self-start">
              <p className="text-on-surface-variant mb-4">
                {c.recordsRetention}
              </p>
              <a href={c.recordsLink.href} className={linkClass}>
                {c.recordsLink.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What I can help with */}
      <section className="py-20 bg-primary-container" aria-labelledby="services">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="services"
            className="font-serif text-3xl font-semibold text-surface-bright mb-8"
          >
            {c.servicesHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {c.services.map((item) => (
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
          {hmrcSupportHref && (
            <p className="mb-8 text-on-primary-container">
              <a
                href={hmrcSupportHref}
                className="underline underline-offset-2 hover:text-surface-bright"
              >
                {locale === "pl" ? "Pomoc z HMRC" : "HMRC support"}
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
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.workingHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-6">
            {c.working.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-on-surface-variant"
              >
                <CheckCircle
                  className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
