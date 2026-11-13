import Image from "next/image";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import { polishUkCopy } from "@/content/polish-uk";
import { SITE_URL } from "@/lib/seo";
import { PHONE_E164, PHONE_DISPLAY } from "@/lib/nap";
import { getRoute, publishedPath, type RouteKey } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Page-level structured data: WebPage + BreadcrumbList only. The WebPage is
 * `about` the single #business entity from the layout by @id reference; it
 * defines no business, address, geo or areaServed of its own. PL-only page
 * (task T4.2), so there is no EN counterpart to reference.
 */
export function polishUkJsonLd() {
  const c = polishUkCopy;
  const route = getRoute("polishUk");
  const home = getRoute("home");
  const url = abs(route.pl!.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: "pl-PL",
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
            name: home.pl!.label,
            item: abs(home.pl!.path),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: route.pl!.label,
            item: url,
          },
        ],
      },
    ],
  };
}

/** Body of the PL-only UK-wide page (T4.2): no Manchester office, genuinely
 * useful content on how remote working, document sharing and HMRC support
 * work, not a doorway page with a city name swapped into a template. */
export default function PolishUk() {
  const c = polishUkCopy;
  const bookingHref = "/pl#booking";
  const contactHref = "/pl#contact";
  // Only published pages are linked; the rest appear automatically once
  // their route is published in content/routes.json.
  const links = (Object.keys(c.links) as RouteKey[]).flatMap((key) => {
    const href = publishedPath(key, "pl");
    return href ? [{ href, label: c.links[key]! }] : [];
  });
  const hmrcHref = publishedPath("hmrcSupport", "pl");

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
          __html: JSON.stringify(polishUkJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero: the honest answer to "polski księgowy manchester" / "w uk" */}
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

      {/* Where I'm based, stated plainly: no Manchester office */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
            {c.whereHeading}
          </h2>
          <div className="space-y-4 text-on-surface-variant max-w-3xl">
            {c.whereParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* How remote working actually works, in practice */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.remoteHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-8">
            {c.remoteIntro}
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {c.remote.map((r) => (
              <div key={r.title} className="p-6 bg-surface rounded-lg">
                <h3 className="font-semibold text-primary mb-2">{r.title}</h3>
                <p className="text-on-surface-variant">{r.text}</p>
              </div>
            ))}
          </div>
          <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
            {c.docsHeading}
          </h3>
          <p className="text-on-surface-variant max-w-3xl mb-6">
            {c.docsIntro}
          </p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {c.docs.map((item) => (
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
        </div>
      </section>

      {/* What I can help with, with links to each service's own page */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.coverHeading}
          </h2>
          <p className="text-on-surface-variant max-w-3xl mb-8">
            {c.coverIntro}
          </p>
          <dl className="grid md:grid-cols-2 gap-6 mb-10">
            {c.cover.map((item) => (
              <div key={item.title} className="p-6 bg-surface-container-low rounded-lg">
                <dt className="font-semibold text-primary mb-2">{item.title}</dt>
                <dd className="text-on-surface-variant">{item.text}</dd>
              </div>
            ))}
          </dl>

          {/* HMRC support: linked to its own page rather than repeated here */}
          <div className="p-6 bg-primary-container rounded-lg mb-10">
            <h3 className="font-serif text-2xl font-semibold text-surface-bright mb-3">
              {c.hmrcHeading}
            </h3>
            <div className="space-y-3 text-on-primary-container max-w-3xl">
              {c.hmrcParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {hmrcHref && (
              <a
                href={hmrcHref}
                className="inline-block mt-4 text-surface-bright underline underline-offset-2 hover:text-secondary transition-colors font-semibold"
              >
                {c.hmrcLinkLabel} →
              </a>
            )}
          </div>

          {links.length > 0 && (
            <div>
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

      {/* Choosing a księgowa online: questions worth asking */}
      <section className="py-20 bg-surface-container-lowest">
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

      {/* FAQ */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-8">
            {c.faqHeading}
          </h2>
          <div className="space-y-6 max-w-3xl mb-12">
            {c.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-primary mb-1">
                  {f.question}
                </h3>
                <p className="text-on-surface-variant">{f.answer}</p>
              </div>
            ))}
          </div>
          {ctas}
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
