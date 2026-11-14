import type { Locale } from "@/content/copy";
import { formatDate } from "@/content/self-assessment";
import { FIGURES_CHECKED_ON, structureComparison } from "@/content/self-assessment-structure";
import { publishedPath } from "@/lib/routes";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

/**
 * "Sole trader vs limited company" comparison (T3.3), shared by the EN and
 * PL Self Assessment pages. General information only, dated, and never a
 * recommendation of one structure over another.
 */
export default function SelfAssessmentStructure({ locale }: { locale: Locale }) {
  const c = structureComparison[locale];
  const limitedCompanyHref = publishedPath("limitedCompany", locale);
  const checkedOn = formatDate(FIGURES_CHECKED_ON, locale);

  return (
    <section
      className="py-20 bg-surface-container-lowest"
      aria-labelledby="sole-trader-vs-ltd"
      data-testid="sole-trader-vs-ltd"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <h2
          id="sole-trader-vs-ltd"
          className="font-serif text-3xl font-semibold text-primary mb-4"
        >
          {c.heading}
        </h2>
        <p className="text-on-surface-variant max-w-3xl mb-8">{c.intro}</p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-on-surface-variant bg-surface rounded-lg">
            <caption className="font-semibold text-primary mb-4 text-left px-2 pt-2">
              {c.tableCaption}
            </caption>
            <thead>
              <tr className="text-sm">
                <th scope="col" className="p-3 font-semibold">
                  {c.colAspect}
                </th>
                <th scope="col" className="p-3 font-semibold">
                  {c.colSoleTrader}
                </th>
                <th scope="col" className="p-3 font-semibold">
                  {c.colLimitedCompany}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.aspect} className="border-t border-outline-variant align-top">
                  <th scope="row" className="p-3 font-semibold text-primary whitespace-nowrap">
                    {row.aspect}
                  </th>
                  <td className="p-3">{row.soleTrader}</td>
                  <td className="p-3">{row.limitedCompany}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="max-w-3xl text-on-surface-variant space-y-4">
          <p className="font-medium text-primary">{c.note}</p>
          {limitedCompanyHref && (
            <p>
              <a href={limitedCompanyHref} className={linkClass}>
                {c.limitedCompanyLinkLabel}
              </a>
            </p>
          )}
          <p className="text-sm" data-testid="structure-disclaimer">
            {c.disclaimer(checkedOn)}
          </p>
          <div className="text-sm">
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
      </div>
    </section>
  );
}
