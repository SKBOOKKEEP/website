import Image from "next/image";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import { liverpoolCopy } from "@/content/liverpool";
import { SITE_URL } from "@/lib/seo";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";
import { getRoute, publishedPath, type RouteKey } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Page-level structured data: WebPage + BreadcrumbList only. The WebPage is
 * `about` the single #business entity from the layout by @id reference; it
 * defines no business, address, geo or areaServed of its own.
 */
export function liverpoolJsonLd(locale: Locale) {
  const c = liverpoolCopy[locale];
  const route = getRoute("liverpool");
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

/** Shared body of the EN and PL Liverpool pages (T2.4). */
export default function Liverpool({ locale }: { locale: Locale }) {
  const c = liverpoolCopy[locale];
  const bookingHref = locale === "pl" ? "/pl#booking" : "/#booking";
  const contactHref = locale === "pl" ? "/pl#contact" : "/#contact";
  // Only published pages are linked; the rest appear automatically once
  // their route is published in content/routes.json.
  const links = (Object.keys(c.links) as RouteKey[]).flatMap((key) => {
    const href = publishedPath(key, locale);
    return href ? [{ href, label: c.links[key]! }] : [];
  });

  const ctas = (
    <div className="flex flex-wrap gap-4">
      <Button href={bookingHref} variant="outline-light" size="lg">
        {c.ctaBook}
      </Button>
      <Button href={contactHref} variant="outline-light" size="lg">
        {c.ctaContact}
      </Button>
      <Button href={`tel:${PHONE_E164}`} variant="outline-light" size="lg">
        {c.ctaCall} {PHONE_DISPLAY}
      </Button>
    </div>
  );

  return (
    <main className="mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(liverpoolJsonLd(locale)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/* Hero: the honest answer to "bookkeeper Liverpool" */}
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

      {/* Where I'm based + why remote works */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
            {c.whereHeading}
          </h2>
          <div className="space-y-4 text-on-surface-variant max-w-3xl mb-12">
            {c.whereParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
            {c.remoteHeading}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {c.remote.map((r) => (
              <div key={r.title} className="p-6 bg-surface-container-low rounded-lg">
                <h4 className="font-semibold text-primary mb-2">{r.title}</h4>
                <p className="text-on-surface-variant">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bookkeeper or accountant + what I cover */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
            {c.roleHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-6">{c.roleIntro}</p>
          <dl className="grid md:grid-cols-2 gap-6 mb-12">
            {c.roles.map((r) => (
              <div key={r.title} className="p-6 bg-surface rounded-lg">
                <dt className="font-semibold text-primary mb-2">{r.title}</dt>
                <dd className="text-on-surface-variant">{r.text}</dd>
              </div>
            ))}
          </dl>
          <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
            {c.coverHeading}
          </h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.cover.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 bg-surface rounded-lg"
              >
                <CheckCircle
                  className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-on-surface-variant">{item}</span>
              </li>
            ))}
          </ul>
          {links.length > 0 && (
            <div className="mt-10">
              <h3 className="font-semibold text-primary mb-3">
                {c.linksHeading}
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {links.map(({ href, label }) => (
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

      {/* Choosing a bookkeeper: questions worth asking */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.checklistHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-8">
            {c.checklistIntro}
          </p>
          <ol className="space-y-6 max-w-3xl list-decimal pl-6 marker:text-secondary">
            {c.checklist.map((item) => (
              <li key={item.question}>
                <h3 className="font-semibold text-primary mb-1">
                  {item.question}
                </h3>
                <p className="text-on-surface-variant">
                  {item.answer}
                  {item.source && (
                    <>
                      {" "}
                      <a
                        href={item.source}
                        className={linkClass}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {c.sourceLabel}
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* First call + Polish speakers */}
      <section className="py-20 bg-primary-container">
        <div className="max-w-7xl mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-surface-bright mb-4">
              {c.prepareHeading}
            </h2>
            <p className="text-on-primary-container mb-4">{c.prepareIntro}</p>
            <ul className="space-y-2 text-on-primary-container list-disc pl-5">
              {c.prepare.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl font-semibold text-surface-bright mb-4">
              {c.polishHeading}
            </h2>
            <div className="space-y-4 text-on-primary-container">
              {c.polishParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">{ctas}</div>
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
