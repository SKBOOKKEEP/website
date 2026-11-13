import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import { FIGURES_CHECKED_ON, hmrcSupportCopy } from "@/content/hmrc-support";
import { formatDate } from "@/content/self-assessment";
import { SITE_URL } from "@/lib/seo";
import { getRoute } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Page-level structured data: WebPage, BreadcrumbList, Service and FAQPage.
 * All of them point at the single #business entity from the layout; none
 * defines a business of its own. FAQPage is built from the same copy as the
 * visible FAQ, so the two always match word for word. No Offer or price.
 */
export function hmrcSupportJsonLd(locale: Locale) {
  const c = hmrcSupportCopy[locale];
  const route = getRoute("hmrcSupport");
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
        name: locale === "pl" ? "Pomoc w kontaktach z HMRC" : "HMRC support",
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

/** Shared body of the EN and PL HMRC support pages (T2.10). */
export default function HmrcSupport({ locale }: { locale: Locale }) {
  const c = hmrcSupportCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hmrcSupportJsonLd(locale)).replace(
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

      {/* Scope */}
      <section className="py-20 bg-surface" aria-labelledby="scope">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="scope"
            className="font-serif text-3xl font-semibold text-primary mb-4"
          >
            {c.scopeHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-10">
            {c.scopeIntro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.scope.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-surface-container-low rounded-lg"
              >
                <h3 className="font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What happens in a compliance check */}
      <section
        className="py-20 bg-surface-container-lowest"
        aria-labelledby="what-happens"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="what-happens"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.whatHappensHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-on-surface-variant">{c.whatHappensIntro}</p>
            <ol className="space-y-3 text-on-surface-variant list-decimal pl-5">
              {c.whatHappens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <p className="mt-6">
            <a href={c.whatHappensLink.href} className={linkClass}>
              {c.whatHappensLink.label}
            </a>
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 bg-primary-container" aria-labelledby="what-to-expect">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="what-to-expect"
            className="font-serif text-3xl font-semibold text-surface-bright mb-8"
          >
            {c.expectHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-6">
            {c.expect.map((item) => (
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
        </div>
      </section>

      {/* Status note + working together */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div
              className="bg-surface-container-low border-l-4 border-secondary p-6 rounded-lg space-y-3 text-on-surface-variant"
              data-testid="status-note"
            >
              <h2 className="font-semibold text-primary text-xl">
                {c.statusHeading}
              </h2>
              {c.statusParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div>
              <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
                {c.workingHeading}
              </h2>
              <ul className="space-y-3 text-on-surface-variant">
                {c.working.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface-container-lowest" aria-labelledby="faq">
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
