import type { Locale } from "@/content/copy";
import { formatDate } from "@/content/self-assessment";
import { DEPTH_SOURCES_CHECKED_ON, saDepth } from "@/content/self-assessment-depth";
import { publishedPath } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

function Records({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-lg self-start">
      <h3 className="font-semibold text-primary mb-4">{heading}</h3>
      <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Landlords, company directors and foreign/Polish income (T2.6), shared by the
 * EN and PL Self Assessment pages so both languages render the same facts.
 */
export default function SelfAssessmentDepth({ locale }: { locale: Locale }) {
  const c = saDepth[locale];
  // Link the full MTD guide once that page pair is published; until then,
  // point at the MTD section on this page.
  const mtdGuideHref = publishedPath("mtdIncomeTax", locale);

  return (
    <>
      {/* Landlords */}
      <section className="py-20 bg-surface-container-lowest" aria-labelledby="landlords">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 id="landlords" className="font-serif text-3xl font-semibold text-primary mb-6">
            {c.landlords.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              {c.landlords.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <a href={c.landlords.allowanceLink.href} className={linkClass}>
                  {c.landlords.allowanceLink.label}
                </a>
              </p>
              <p>{c.landlords.mtd}</p>
              <p>
                <a
                  href={mtdGuideHref ?? "#mtd-income-tax"}
                  className={`${linkClass} font-semibold`}
                >
                  {mtdGuideHref ? c.landlords.mtdGuideLink : c.landlords.mtdSectionLink}
                </a>
              </p>
            </div>
            <Records heading={c.landlords.recordsHeading} items={c.landlords.records} />
          </div>
        </div>
      </section>

      {/* Company directors */}
      <section className="py-20 bg-surface" aria-labelledby="company-directors">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="company-directors"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.directors.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              {c.directors.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <a href={c.directors.dividendsLink.href} className={linkClass}>
                  {c.directors.dividendsLink.label}
                </a>
              </p>
            </div>
            <Records heading={c.directors.recordsHeading} items={c.directors.records} />
          </div>
        </div>
      </section>

      {/* Foreign income, including Polish income */}
      <section className="py-20 bg-surface-container-lowest" aria-labelledby="foreign-income">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="foreign-income"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.foreign.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              {c.foreign.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>{c.foreign.fig}</p>
              <p>
                <a href={c.foreign.figLink.href} className={linkClass}>
                  {c.foreign.figLink.label}
                </a>
              </p>
              <p className="font-semibold text-primary">{c.foreign.polishSide}</p>
            </div>
            <Records heading={c.foreign.recordsHeading} items={c.foreign.records} />
          </div>

          <div className="mt-10 space-y-4 text-on-surface-variant max-w-3xl">
            <p>
              <a href={c.checker.href} className={linkClass}>
                {c.checker.label}
              </a>
            </p>
            <p className="text-sm">{c.disclaimer}</p>
          </div>

          <div className="mt-8 text-sm text-on-surface-variant">
            <h3 className="font-semibold text-primary mb-2">
              {c.sourcesHeading(formatDate(DEPTH_SOURCES_CHECKED_ON, locale))}
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
    </>
  );
}
