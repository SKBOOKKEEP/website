import Image from "next/image";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import { stHelensCopy } from "@/content/st-helens";
import { SITE_URL } from "@/lib/seo";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";
import { getRoute, publishedPath, type RouteKey } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Page-level structured data: WebPage + BreadcrumbList only. The WebPage is
 * `about` the single #business entity from the layout by @id reference; it
 * defines no business, address or areaServed of its own.
 */
export function stHelensJsonLd(locale: Locale) {
  const c = stHelensCopy[locale];
  const route = getRoute("stHelens");
  const home = getRoute("home");
  const url = abs(route[locale]!.path);

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
        about: { "@id": `${SITE_URL}/#business` },
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
    ],
  };
}

/** Shared body of the EN and PL St Helens pages (T2.3). */
export default function StHelens({ locale }: { locale: Locale }) {
  const c = stHelensCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  // Only published service pages are linked; unpublished ones appear
  // automatically once their route is published in content/routes.json.
  const serviceLinks = (Object.keys(c.serviceLinks) as RouteKey[]).flatMap(
    (key) => {
      const href = publishedPath(key, locale);
      return href ? [{ href, label: c.serviceLinks[key]! }] : [];
    },
  );

  const ctas = (
    <div className="flex flex-wrap gap-4">
      <Button
        href={bookingHref}
        variant="outline-light"
        size="lg"
      >
        {c.ctaBook}
      </Button>
      <Button
        href={contactHref}
        variant="outline-light"
        size="lg"
      >
        {c.ctaContact}
      </Button>
      <Button
        href={`tel:${PHONE_E164}`}
        variant="outline-light"
        size="lg"
      >
        {c.ctaCall} {PHONE_DISPLAY}
      </Button>
    </div>
  );

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(stHelensJsonLd(locale)).replace(
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
              {ctas}
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/Sabina.jpeg"
                alt={c.portraitAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Based in St Helens, working remotely */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
            {c.localHeading}
          </h2>
          <div className="space-y-4 text-on-surface-variant max-w-3xl">
            {c.localParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Who I help */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.whoHeading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.who.map((w) => (
              <div key={w.title} className="p-6 bg-surface rounded-lg">
                <h3 className="font-semibold text-primary mb-2">{w.title}</h3>
                <p className="text-on-surface-variant">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.servicesHeading}
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.services.map((item) => (
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
          {serviceLinks.length > 0 && (
            <div className="mt-10">
              <h3 className="font-semibold text-primary mb-3">
                {c.linksHeading}
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {serviceLinks.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className={linkClass}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* How to book */}
      <section className="py-20 bg-primary-container">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-surface-bright mb-8">
            {c.bookingHeading}
          </h2>
          <ol className="grid md:grid-cols-3 gap-6 mb-10">
            {c.bookingSteps.map((s, i) => (
              <li key={s.title} className="text-on-primary-container">
                <p className="font-semibold text-surface-bright mb-2">
                  <span className="text-secondary mr-2">{i + 1}.</span>
                  {s.title}
                </p>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          {ctas}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
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
          <p
            className="mt-12 text-sm text-on-surface-variant max-w-3xl"
            data-testid="tax-disclaimer"
          >
            {c.disclaimer}
          </p>
        </div>
      </section>
    </main>
  );
}
