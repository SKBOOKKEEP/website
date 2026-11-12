import type { Locale } from "@/content/copy";

/**
 * Single source of truth for the tax facts shown on the Self Assessment pages
 * (EN /self-assessment-tax-returns and PL /pl/self-assessment).
 *
 * Every figure/date here must be re-checked against the linked GOV.UK pages
 * when HMRC guidance changes and at least each April. Update
 * SOURCES_CHECKED_ON only after a genuine manual check — never automatically.
 */
export const SOURCES_CHECKED_ON = "2026-11-06";

export const HMRC = {
  checker: "https://www.gov.uk/check-if-you-need-tax-return",
  whoMustSend:
    "https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return",
  deadlines: "https://www.gov.uk/self-assessment-tax-returns/deadlines",
  mtdWhen:
    "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax",
  mtdQualifyingIncome:
    "https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax",
  mtdExemptions:
    "https://www.gov.uk/guidance/find-out-if-you-can-get-an-exemption-from-making-tax-digital-for-income-tax",
} as const;

/** MTD for Income Tax cohorts — qualifying income must be OVER the threshold. */
export const MTD_COHORTS = [
  { threshold: 50_000, basisYear: "2024/25", start: "2026-04-06" },
  { threshold: 30_000, basisYear: "2025/26", start: "2027-04-06" },
  { threshold: 20_000, basisYear: "2026/27", start: "2028-04-06" },
] as const;

/** Standard online filing/payment deadline for the most recent tax year (2025/26). */
export const CURRENT_ONLINE_DEADLINE = { taxYear: "2025/26", date: "2027-01-31" } as const;

const LOCALE_TAG: Record<Locale, string> = { en: "en-GB", pl: "pl-PL" };

export function formatPounds(amount: number, locale: Locale) {
  return `£${new Intl.NumberFormat(LOCALE_TAG[locale]).format(amount)}`;
}

export function formatDate(iso: string, locale: Locale) {
  const d = new Date(`${iso}T12:00:00Z`);
  const s = new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(d);
  return locale === "pl" ? `${s.replace(/ r\.$/, "")} r.` : s;
}

type Link = { label: string; href: string };

export type SelfAssessmentGuidanceCopy = {
  whoHeading: string;
  whoIntro: string;
  mustFile: string[];
  otherIncomeHeading: string;
  otherIncome: string[];
  changedRule: string;
  hmrcNotice: string;
  checker: Link;
  unsure: string;
  deadlineNote: string;
  mtdHeading: string;
  mtdIntro: string;
  mtdTableCaption: string;
  mtdColIncome: string;
  mtdColYear: string;
  mtdColStart: string;
  mtdIncomeCell: (amount: string) => string;
  mtdQualifying: string;
  mtdScope: string;
  mtdExemptions: string;
  mtdVat: string;
  /** Link text to the full MTD for Income Tax guide (shown once it's published). */
  mtdGuideLink: string;
  sourcesHeading: (date: string) => string;
  sources: Link[];
};

export const saGuidance: Record<Locale, SelfAssessmentGuidanceCopy> = {
  en: {
    whoHeading: "Who Needs to File a Self Assessment?",
    whoIntro:
      "You must usually send a tax return if, in the last tax year (6 April to 5 April), any of these applied:",
    mustFile: [
      "You were self-employed as a sole trader and earned more than £1,000 before taking off anything you can claim tax relief on",
      "You were a partner in a business partnership",
      "You had to pay Capital Gains Tax on something you sold or disposed of",
      "You had to pay the High Income Child Benefit Charge and do not pay it through PAYE",
    ],
    otherIncomeHeading:
      "You may also need to file if you had other untaxed income, for example:",
    otherIncome: [
      "Money from renting out property or land",
      "Tips and commission",
      "Savings interest",
      "Dividends, including from investments",
      "Foreign income",
      "Taxable UK income while not a UK resident",
    ],
    changedRule:
      "From the 2024/25 tax year, employment income above £150,000 alone does not require a Self Assessment return. Other circumstances may still mean you need to file.",
    hmrcNotice:
      "If HMRC has asked you to send a return, do not ignore it — contact HMRC if you think you no longer need to file.",
    checker: {
      label: "Check if you need to send a tax return (HMRC)",
      href: HMRC.checker,
    },
    unsure:
      "Still not sure? Book a free consultation and we can go through your situation together.",
    deadlineNote:
      "For the 2025/26 tax year, the online return and any tax owed are due by 31 January 2027. Different deadlines can apply in some cases, for example if you register late.",
    mtdHeading: "Making Tax Digital for Income Tax",
    mtdIntro:
      "Making Tax Digital for Income Tax started on 6 April 2026 for qualifying sole traders and landlords whose combined gross self-employment and property income exceeded £50,000 in 2024/25. Further groups follow:",
    mtdTableCaption: "When Making Tax Digital for Income Tax applies",
    mtdColIncome: "Qualifying income",
    mtdColYear: "In tax year",
    mtdColStart: "Must use MTD from",
    mtdIncomeCell: (amount) => `Over ${amount}`,
    mtdQualifying:
      "Qualifying income is your combined self-employment and property income before expenses (turnover), based on your tax return. It does not include PAYE employment income, dividends or pensions.",
    mtdScope:
      "It applies to sole traders and landlords registered for Self Assessment. Partnerships will join later, on a timeline HMRC has yet to set.",
    mtdExemptions:
      "Exemptions and individual circumstances can affect whether and when you need to use it — for example, you may be exempt if you are digitally excluded.",
    mtdVat:
      "This is separate from Making Tax Digital for VAT, which has its own rules.",
    mtdGuideLink:
      "Read the full guide to Making Tax Digital for Income Tax",
    sourcesHeading: (date) => `Sources (GOV.UK, checked ${date})`,
    sources: [
      { label: "Who must send a tax return", href: HMRC.whoMustSend },
      { label: "Self Assessment deadlines", href: HMRC.deadlines },
      {
        label: "Find out if and when you need to use Making Tax Digital for Income Tax",
        href: HMRC.mtdWhen,
      },
      {
        label: "Work out your qualifying income for Making Tax Digital for Income Tax",
        href: HMRC.mtdQualifyingIncome,
      },
      {
        label: "Exemptions from Making Tax Digital for Income Tax",
        href: HMRC.mtdExemptions,
      },
    ],
  },
  pl: {
    whoHeading: "Kto musi złożyć Self Assessment?",
    whoIntro:
      "Zazwyczaj musisz złożyć deklarację, jeśli w ostatnim roku podatkowym (od 6 kwietnia do 5 kwietnia) dotyczyło Cię którekolwiek z poniższych:",
    mustFile: [
      "Byłeś samozatrudniony jako sole trader i Twój przychód przekroczył £1000 przed odliczeniem kosztów i ulg podatkowych",
      "Byłeś wspólnikiem w spółce osobowej (partnership)",
      "Musiałeś zapłacić podatek od zysków kapitałowych (Capital Gains Tax) od sprzedanego lub zbytego składnika majątku",
      "Musiałeś zapłacić High Income Child Benefit Charge i nie płacisz go przez PAYE",
    ],
    otherIncomeHeading:
      "Deklaracja może być też potrzebna, jeśli miałeś inne nieopodatkowane dochody, na przykład:",
    otherIncome: [
      "Dochód z wynajmu nieruchomości lub gruntu",
      "Napiwki i prowizje",
      "Odsetki od oszczędności",
      "Dywidendy, w tym z inwestycji",
      "Dochody z zagranicy",
      "Dochód opodatkowany w UK, gdy nie jesteś rezydentem UK",
    ],
    changedRule:
      "Od roku podatkowego 2024/25 sam dochód z zatrudnienia przekraczający £150 000 nie oznacza obowiązku złożenia Self Assessment. Obowiązek może jednak wynikać z innych okoliczności.",
    hmrcNotice:
      "Jeśli HMRC wezwał Cię do złożenia deklaracji, nie ignoruj tego — skontaktuj się z HMRC, jeśli uważasz, że nie musisz już jej składać.",
    checker: {
      label: "Sprawdź, czy musisz złożyć deklarację (narzędzie HMRC, po angielsku)",
      href: HMRC.checker,
    },
    unsure:
      "Nadal nie masz pewności? Umów bezpłatną konsultację, a razem omówimy Twoją sytuację.",
    deadlineNote:
      "Za rok podatkowy 2025/26 deklarację online należy złożyć, a należny podatek zapłacić do 31 stycznia 2027 r. W niektórych przypadkach obowiązują inne terminy, np. przy późnej rejestracji.",
    mtdHeading: "Making Tax Digital for Income Tax",
    mtdIntro:
      "Making Tax Digital for Income Tax obowiązuje od 6 kwietnia 2026 r. osoby prowadzące działalność jako sole trader oraz wynajmujących, których łączny przychód z działalności i najmu przed odliczeniem kosztów przekroczył £50 000 w roku 2024/25, o ile spełniają warunki objęcia systemem. Kolejne grupy dołączają później:",
    mtdTableCaption: "Kiedy obowiązuje Making Tax Digital for Income Tax",
    mtdColIncome: "Przychód kwalifikowany",
    mtdColYear: "W roku podatkowym",
    mtdColStart: "Obowiązek od",
    mtdIncomeCell: (amount) => `Ponad ${amount}`,
    mtdQualifying:
      "Przychód kwalifikowany to łączny przychód z samozatrudnienia i najmu przed odliczeniem kosztów (obrót), na podstawie Twojej deklaracji podatkowej. Nie obejmuje wynagrodzenia z PAYE, dywidend ani emerytur.",
    mtdScope:
      "Dotyczy osób prowadzących działalność jako sole trader oraz wynajmujących, zarejestrowanych w Self Assessment. Spółki osobowe (partnerships) dołączą później, w terminie, który HMRC dopiero ogłosi.",
    mtdExemptions:
      "Zwolnienia i indywidualna sytuacja mogą wpływać na to, czy i od kiedy obowiązek Cię dotyczy — np. możesz być zwolniony, jeśli jesteś wykluczony cyfrowo.",
    mtdVat:
      "Ten system jest odrębny od Making Tax Digital dla VAT, który ma własne zasady.",
    mtdGuideLink:
      "Przeczytaj pełny przewodnik po Making Tax Digital for Income Tax",
    sourcesHeading: (date) => `Źródła (GOV.UK, po angielsku; sprawdzone ${date})`,
    sources: [
      { label: "Kto musi złożyć deklarację podatkową", href: HMRC.whoMustSend },
      { label: "Terminy Self Assessment", href: HMRC.deadlines },
      {
        label: "Czy i od kiedy musisz korzystać z Making Tax Digital for Income Tax",
        href: HMRC.mtdWhen,
      },
      {
        label: "Jak obliczyć przychód kwalifikowany do Making Tax Digital for Income Tax",
        href: HMRC.mtdQualifyingIncome,
      },
      {
        label: "Zwolnienia z Making Tax Digital for Income Tax",
        href: HMRC.mtdExemptions,
      },
    ],
  },
};
