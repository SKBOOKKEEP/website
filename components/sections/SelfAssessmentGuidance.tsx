import { CheckCircle } from "@/components/ui/icons";
import type { Locale } from "@/content/copy";
import {
  MTD_COHORTS,
  SOURCES_CHECKED_ON,
  formatDate,
  formatPounds,
  saGuidance,
} from "@/content/self-assessment";

const linkClass =
  "text-secondary underline underline-offset-2 hover:text-primary transition-colors";

/**
 * "Who needs to file" + "Making Tax Digital for Income Tax" sections, shared by
 * the EN and PL Self Assessment pages so both languages render the same facts.
 */
export default function SelfAssessmentGuidance({ locale }: { locale: Locale }) {
  const c = saGuidance[locale];

  return (
    <>
      {/* Who Needs to File */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2 className="font-serif text-3xl font-semibold text-primary mb-4">
            {c.whoHeading}
          </h2>
          <p className="text-on-surface-variant mb-8">{c.whoIntro}</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.mustFile.map((item) => (
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

          <h3 className="font-semibold text-primary mt-10 mb-4">
            {c.otherIncomeHeading}
          </h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 list-disc pl-5 text-on-surface-variant">
            {c.otherIncome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-8 space-y-4 text-on-surface-variant max-w-3xl">
            <p>{c.changedRule}</p>
            <p>{c.hmrcNotice}</p>
            <p>
              <a href={c.checker.href} className={linkClass}>
                {c.checker.label}
              </a>
            </p>
            <p>{c.unsure}</p>
          </div>
        </div>
      </section>

      {/* Making Tax Digital for Income Tax */}
      <section className="py-20 bg-surface" aria-labelledby="mtd-income-tax">
        <div className="max-w-7xl mx-auto px-5 md:px-16">
          <h2
            id="mtd-income-tax"
            className="font-serif text-3xl font-semibold text-primary mb-6"
          >
            {c.mtdHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-on-surface-variant">
              <p>{c.mtdIntro}</p>
              <p>{c.mtdQualifying}</p>
              <p>{c.mtdScope}</p>
              <p>{c.mtdExemptions}</p>
              <p>{c.mtdVat}</p>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg self-start">
              <table className="w-full text-left text-on-surface-variant">
                <caption className="font-semibold text-primary mb-4 text-left">
                  {c.mtdTableCaption}
                </caption>
                <thead>
                  <tr className="text-sm">
                    <th scope="col" className="pb-2 pr-3 font-semibold">
                      {c.mtdColIncome}
                    </th>
                    <th scope="col" className="pb-2 pr-3 font-semibold">
                      {c.mtdColYear}
                    </th>
                    <th scope="col" className="pb-2 font-semibold">
                      {c.mtdColStart}
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
                        {c.mtdIncomeCell(formatPounds(row.threshold, locale))}
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

          <div className="mt-10 text-sm text-on-surface-variant">
            <h3 className="font-semibold text-primary mb-2">
              {c.sourcesHeading(formatDate(SOURCES_CHECKED_ON, locale))}
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
