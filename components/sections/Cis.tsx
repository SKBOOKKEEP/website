import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import { FIGURES_CHECKED_ON, cisCopy } from "@/content/cis";
import { formatDate } from "@/content/self-assessment";
import { SITE_URL } from "@/lib/seo";
import { getRoute } from "@/lib/routes";

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
export function cisJsonLd(locale: Locale) {
  const c = cisCopy[locale];
  const route = getRoute("cis");
  const url = abs(route[locale]!.path);
  const business = { "@id": `${SITE_URL}/#business` };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Construction Industry Scheme (CIS)",
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

/** Shared body of the EN and PL CIS pages (T2.9). */
export default function Cis({ locale }: { locale: Locale }) {
  const c = cisCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cisJsonLd(locale)).replace(/</g, "\\u003c"),
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

      {/* Contractors vs subcontractors */}
      <section className="py-20 bg-surface" aria-labelledby="roles">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="roles" className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.rolesHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-10">{c.rolesIntro}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {c.roles.map((item) => (
              <div key={item.title} className="p-6 bg-surface-container-low rounded-lg">
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deduction rates */}
      <section className="py-20 bg-surface-container-lowest" aria-labelledby="rates">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="rates" className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.ratesHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-10">{c.ratesIntro}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            {c.rates.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-surface-container-low rounded-lg text-center"
              >
                <p className="font-serif text-4xl font-bold text-primary mb-2">{item.title}</p>
                <p className="text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant max-w-3xl mb-6" data-testid="rates-note">
            {c.ratesNote}
          </p>
          <p>
            <a href={c.ratesLink.href} className={linkClass}>
              {c.ratesLink.label}
            </a>
          </p>
        </div>
      </section>

      {/* Reconciliation at year end */}
      <section className="py-20 bg-primary-container" aria-labelledby="reconcile">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="reconcile" className="font-serif text-3xl font-semibold text-surface-bright mb-6">
            {c.reconcileHeading}
          </h2>
          <div className="space-y-4 text-on-primary-container max-w-3xl mb-6">
            {c.reconcileParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mb-2">
            <a
              href={c.selfAssessmentHref}
              className="text-surface-bright underline underline-offset-2 hover:text-on-primary-container"
            >
              {c.selfAssessmentLinkLabel}
            </a>
          </p>
          <p>
            <a
              href={c.reconcileLink.href}
              className="text-surface-bright underline underline-offset-2 hover:text-on-primary-container"
            >
              {c.reconcileLink.label}
            </a>
          </p>
        </div>
      </section>

      {/* What I can help with */}
      <section className="py-20 bg-surface" aria-labelledby="services">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="services" className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.servicesHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {c.services.map((item) => (
              <li key={item} className="flex items-start gap-3 text-on-surface-variant">
                <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button href={bookingHref} variant="primary" size="lg">
              {c.ctaBook}
            </Button>
            <Button href={contactHref} variant="outline" size="lg">
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
