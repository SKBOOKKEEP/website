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
  penalties: "https://www.gov.uk/self-assessment-tax-returns/penalties",
  foreignIncome: "https://www.gov.uk/tax-foreign-income",
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

/**
 * FAQ figures re-checked live against GOV.UK on FAQ_CHECKED_ON (T3.2). Kept
 * separate from SOURCES_CHECKED_ON above, which covers the rest of this file.
 */
export const FAQ_CHECKED_ON = "2026-11-14";

/** Self Assessment late-filing penalties (GOV.UK, checked on FAQ_CHECKED_ON). */
export const PENALTIES = {
  initial: 100,
  dailyRate: 10,
  dailyCapDays: 90,
  dailyCap: 900,
  furtherPercent: 5,
  furtherMinimum: 300,
} as const;

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
      "Działalność na własny rachunek jako sole trader z przychodem powyżej £1000 przed odliczeniem kosztów i ulg podatkowych",
      "Udział jako wspólnik w spółce osobowej (partnership)",
      "Obowiązek zapłaty podatku od zysków kapitałowych (Capital Gains Tax) od sprzedanego lub zbytego składnika majątku",
      "Obowiązek zapłaty High Income Child Benefit Charge, którego nie płacisz przez PAYE",
    ],
    otherIncomeHeading:
      "Deklaracja może być też potrzebna, jeśli w tym samym roku podatkowym pojawiły się inne nieopodatkowane dochody, na przykład:",
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
      "Zwolnienia i indywidualna sytuacja mogą wpływać na to, czy i od kiedy obowiązek Cię dotyczy — np. zwolnienie może przysługiwać osobom wykluczonym cyfrowo.",
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

export type Faq = { question: string; answer: string };

export type SelfAssessmentFaqCopy = {
  heading: string;
  faqs: Faq[];
  sourcesHeading: (date: string) => string;
  sources: Link[];
};

/**
 * Answer-first Self Assessment FAQ (T3.2): who must file, deadlines, late
 * penalty and foreign income. Same 4 topics in both languages for parity.
 * Figures re-checked live against GOV.UK on FAQ_CHECKED_ON above; the who/
 * deadline facts match saGuidance and the foreign-income facts match
 * content/self-assessment-depth.ts, so this never contradicts them.
 */
export const saFaq: Record<Locale, SelfAssessmentFaqCopy> = {
  en: {
    heading: "Frequently asked questions",
    faqs: [
      {
        question: "Who has to file a Self Assessment tax return?",
        answer:
          "You usually need to file if, in the last tax year, you were a sole trader who earned more than £1,000, were a partner in a business partnership, had Capital Gains Tax to pay, had to pay the High Income Child Benefit Charge outside PAYE, or had other untaxed income such as rental income, dividends, savings interest or foreign income. If you're not sure, HMRC's own checker tool can tell you.",
      },
      {
        question: "What are the Self Assessment deadlines for the 2025 to 2026 tax year?",
        answer:
          "If you need to register for the first time, tell HMRC by 5 October 2026. Paper returns are due by 31 October 2026. Online returns and any tax owed are due by 31 January 2027.",
      },
      {
        question: "What happens if I miss the Self Assessment deadline?",
        answer:
          "HMRC charges an initial £100 penalty for a late return, even if you have no tax to pay. After 3 months, daily penalties of £10 apply, up to a maximum of £900. After 6 months, and again after 12 months, a further penalty applies of 5% of the tax due or £300, whichever is greater.",
      },
      {
        question: "Do I pay UK tax on income from Poland or another country?",
        answer:
          "If you're UK resident, you'll normally pay UK tax on your foreign income too — for example rental income or investment income from Poland. You usually report it on your Self Assessment tax return, and relief may be available if you've already paid tax on it abroad.",
      },
    ],
    sourcesHeading: (date) => `Sources (GOV.UK, checked ${date})`,
    sources: [
      { label: "Who must send a tax return", href: HMRC.whoMustSend },
      { label: "Self Assessment deadlines", href: HMRC.deadlines },
      { label: "Self Assessment tax return penalties", href: HMRC.penalties },
      { label: "Tax on foreign income", href: HMRC.foreignIncome },
    ],
  },
  pl: {
    heading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Kto musi złożyć zeznanie Self Assessment?",
        answer:
          "Zazwyczaj musisz złożyć zeznanie, jeśli w ostatnim roku podatkowym dotyczyło Cię co najmniej jedno z poniższych: prowadzenie działalności na własny rachunek jako sole trader z przychodem powyżej £1000, udział jako wspólnik w spółce osobowej (partnership), obowiązek zapłaty podatku od zysków kapitałowych (Capital Gains Tax), obowiązek zapłaty High Income Child Benefit Charge poza PAYE, albo inne nieopodatkowane dochody, np. z najmu, dywidendy, odsetki od oszczędności lub dochody zagraniczne. Jeśli nie masz pewności, skorzystaj z narzędzia HMRC.",
      },
      {
        question: "Do kiedy trzeba złożyć Self Assessment za rok 2025/26?",
        answer:
          "Jeśli rejestrujesz się po raz pierwszy, zgłoś to do HMRC do 5 października 2026 r. Deklarację papierową trzeba złożyć do 31 października 2026 r. Deklarację online i należny podatek trzeba rozliczyć do 31 stycznia 2027 r.",
      },
      {
        question: "Co się stanie, jeśli spóźnię się ze złożeniem zeznania?",
        answer:
          "HMRC nalicza początkową karę w wysokości £100 za spóźnione zeznanie, nawet jeśli nie masz podatku do zapłaty. Po 3 miesiącach dolicza się karę dzienną w wysokości £10, do maksymalnie £900. Po 6 miesiącach, a potem ponownie po 12 miesiącach, nalicza się dodatkową karę w wysokości 5% należnego podatku lub £300 — w zależności od tego, która kwota jest wyższa.",
      },
      {
        question: "Czy muszę rozliczyć w UK dochody z Polski?",
        answer:
          "Jeśli jesteś rezydentem podatkowym UK, zwykle płacisz w UK podatek także od dochodów zagranicznych — np. z najmu lub inwestycji w Polsce. Zazwyczaj wykazujesz je w swojej deklaracji Self Assessment, a jeśli podatek za granicą został już zapłacony, możesz skorzystać z ulgi.",
      },
    ],
    sourcesHeading: (date) => `Źródła (GOV.UK, po angielsku; sprawdzone ${date})`,
    sources: [
      { label: "Kto musi złożyć deklarację podatkową", href: HMRC.whoMustSend },
      { label: "Terminy Self Assessment", href: HMRC.deadlines },
      { label: "Kary za spóźnione zeznanie Self Assessment", href: HMRC.penalties },
      { label: "Podatek od dochodów zagranicznych", href: HMRC.foreignIncome },
    ],
  },
};
