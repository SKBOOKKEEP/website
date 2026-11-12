import type { Locale } from "@/content/copy";
import { HMRC } from "@/content/self-assessment";

/**
 * Extra Self Assessment sections (T2.6): landlords, company directors and
 * foreign / Polish income. Rendered on both SA pages by
 * components/sections/SelfAssessmentDepth.tsx.
 *
 * Every figure and date here was checked against the linked GOV.UK pages on
 * DEPTH_SOURCES_CHECKED_ON. Update that date only after a genuine manual check.
 */
export const DEPTH_SOURCES_CHECKED_ON = "2026-11-12";

export const GOVUK = {
  rentingPayingTax: "https://www.gov.uk/renting-out-a-property/paying-tax",
  propertyAllowance:
    "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income",
  rentalRecords: "https://www.gov.uk/keeping-your-pay-tax-records/rental-income",
  dividends: "https://www.gov.uk/tax-on-dividends",
  reportDividends: "https://www.gov.uk/tax-on-dividends/how-to-report-tax-on-dividends",
  directorRecords:
    "https://www.gov.uk/keeping-your-pay-tax-records/employees-and-limited-company-directors",
  foreignIncome: "https://www.gov.uk/tax-foreign-income",
  residence: "https://www.gov.uk/tax-foreign-income/residence",
  reportForeignIncome: "https://www.gov.uk/tax-foreign-income/paying-tax",
  taxedTwice: "https://www.gov.uk/tax-foreign-income/taxed-twice",
  polandTreaty: "https://www.gov.uk/government/publications/poland-tax-treaties",
  fig: "https://www.gov.uk/guidance/check-if-you-can-claim-the-4-year-foreign-income-and-gains-regime",
  overseasRecords: "https://www.gov.uk/keeping-your-pay-tax-records/overseas-income",
  saOverview: "https://www.gov.uk/self-assessment-tax-returns",
} as const;

type Link = { label: string; href: string };

export type SelfAssessmentDepthCopy = {
  landlords: {
    heading: string;
    paragraphs: string[];
    allowanceLink: Link;
    recordsHeading: string;
    records: string[];
    mtd: string;
    mtdGuideLink: string;
    mtdSectionLink: string;
  };
  directors: {
    heading: string;
    paragraphs: string[];
    dividendsLink: Link;
    recordsHeading: string;
    records: string[];
  };
  foreign: {
    heading: string;
    paragraphs: string[];
    fig: string;
    figLink: Link;
    recordsHeading: string;
    records: string[];
    polishSide: string;
  };
  checker: Link;
  disclaimer: string;
  sourcesHeading: (date: string) => string;
  sources: Link[];
};

export const saDepth: Record<Locale, SelfAssessmentDepthCopy> = {
  en: {
    landlords: {
      heading: "Landlords and rental income",
      paragraphs: [
        "Money from renting out property or land is untaxed income that may mean you need to file.",
        "The first £1,000 of your income from property rental is tax-free under the property allowance.",
        "If your rental income is more than £1,000 but no more than £2,500 a year, GOV.UK says to contact HMRC.",
        "If it is more than £2,500 after allowable expenses, or more than £10,000 before them, you report it in a Self Assessment tax return.",
        "If you do not usually send a tax return, you need to register by 5 October following the tax year in which you had the rental income.",
        "If you use the property allowance, you cannot also deduct your actual expenses — it is one or the other.",
        "There are cases where you cannot use the property allowance at all. For example, GOV.UK says you cannot use it if you have any property income from a company you or someone connected to you owns or controls (such as renting to your own company), from a partnership where you or someone connected to you are partners, or from your employer or your spouse's or civil partner's employer. You also cannot use it on income from letting a room in your own home under the Rent a Room Scheme, if you deduct expenses from that room-letting income instead of using the scheme, or if you claim the tax reducer for finance costs (such as mortgage interest) on a residential property. See GOV.UK for the full list.",
      ],
      allowanceLink: {
        label: "Tax-free allowances on property and trading income (GOV.UK)",
        href: GOVUK.propertyAllowance,
      },
      recordsHeading: "Records GOV.UK says landlords should keep",
      records: [
        "The dates when you let out your property",
        "All rent you get",
        "Any income from services you give to tenants, such as charges for maintenance or repairs",
        "Rent books, receipts, invoices and bank statements",
        "Allowable expenses you pay to run your property, such as cleaning or gardening",
      ],
      mtd: "Property income counts towards your qualifying income for Making Tax Digital for Income Tax, together with any self-employment income, and it is measured before expenses. If you own a property jointly, only your share counts.",
      mtdGuideLink: "Read the full guide to Making Tax Digital for Income Tax",
      mtdSectionLink: "See when Making Tax Digital for Income Tax applies",
    },
    directors: {
      heading: "Company directors",
      paragraphs: [
        "GOV.UK's current guidance on who must send a tax return does not list being a company director as a reason on its own. Whether you need to file depends on your income and circumstances.",
        "You may still need to file — for example if you have dividends or other income that has not been taxed through PAYE, such as rental income or foreign income. You must also send a return if HMRC asks you to.",
        "Dividends: you get a £500 dividend allowance each year and only pay tax on dividend income above it, although dividends still count when working out your tax band. If your dividend income is over £10,000, you need to fill in a Self Assessment tax return. If it is £10,000 or less and you have tax to pay on it, you must tell HMRC — for example by asking HMRC to update your tax code — or report it on your tax return if you already send one.",
        "Your company's accounts and Company Tax Return are separate from your personal Self Assessment return.",
      ],
      dividendsLink: {
        label: "How to report tax on dividends (GOV.UK)",
        href: GOVUK.reportDividends,
      },
      recordsHeading: "Records GOV.UK says employees and directors should keep",
      records: [
        "Your P60, which shows your pay and tax for the tax year",
        "Your P45, if you leave a job",
        "Form P11D, which shows your expenses and benefits",
        "Information about any redundancy or termination payment",
      ],
    },
    foreign: {
      heading: "Foreign income, including income from Poland",
      paragraphs: [
        "If you are UK resident, you will normally pay UK tax on your foreign income — for example rental income on overseas property, or foreign investment income such as dividends and savings interest. Whether you are UK resident depends on your circumstances.",
        "You usually need to fill in a Self Assessment tax return if you are a UK resident with foreign income or capital gains. Include income that has already been taxed abroad, so you can claim Foreign Tax Credit Relief if you are eligible.",
        "The UK and Poland have a double taxation agreement: the 2006 UK–Poland double taxation convention, which is in force. How much relief you get depends on that agreement, and you may not get back the full amount of foreign tax you paid.",
      ],
      fig: "Since 6 April 2025, the remittance basis has been replaced by the 4-year foreign income and gains (FIG) regime, for people in their first 4 years of UK tax residence after at least 10 years as a non-UK resident. If that might apply to you, check GOV.UK's guidance.",
      figLink: {
        label: "Check if you can claim the 4-year foreign income and gains regime (GOV.UK)",
        href: GOVUK.fig,
      },
      recordsHeading: "Records GOV.UK says to keep for overseas income",
      records: [
        "Evidence of income you have earned from overseas, like payslips, bank statements or payment confirmations",
        "Receipts for any overseas expenses you want to claim",
        "Dividend certificates from overseas companies",
        "Certificates or other proof of tax you have already paid, in the UK or overseas",
      ],
      polishSide:
        "I can help with the UK side: your UK Self Assessment return, including the foreign income you need to report on it. I do not prepare Polish tax returns (PIT) or give advice on Polish tax — for the Polish side, please speak to a tax adviser in Poland.",
    },
    checker: {
      label: "Check if you need to send a Self Assessment tax return (HMRC)",
      href: HMRC.checker,
    },
    disclaimer:
      "This page is general information, not tax advice. Rules change and your own circumstances matter, so check GOV.UK or get advice for your situation.",
    sourcesHeading: (date) => `Sources for these sections (GOV.UK, checked ${date})`,
    sources: [
      { label: "Self Assessment tax returns", href: GOVUK.saOverview },
      { label: "Who must send a tax return", href: HMRC.whoMustSend },
      { label: "Renting out your property: paying tax", href: GOVUK.rentingPayingTax },
      { label: "Tax-free allowances on property and trading income", href: GOVUK.propertyAllowance },
      { label: "Keeping your pay and tax records: rental income", href: GOVUK.rentalRecords },
      {
        label: "Work out your qualifying income for Making Tax Digital for Income Tax",
        href: HMRC.mtdQualifyingIncome,
      },
      { label: "Tax on dividends", href: GOVUK.dividends },
      { label: "How to report tax on dividends", href: GOVUK.reportDividends },
      {
        label: "Keeping your pay and tax records: employees and limited company directors",
        href: GOVUK.directorRecords,
      },
      { label: "Tax on foreign income", href: GOVUK.foreignIncome },
      { label: "UK residence and tax", href: GOVUK.residence },
      { label: "Reporting your foreign income", href: GOVUK.reportForeignIncome },
      { label: "Tax on foreign income: if you're taxed twice", href: GOVUK.taxedTwice },
      { label: "Poland: tax treaties", href: GOVUK.polandTreaty },
      { label: "Keeping your pay and tax records: overseas income", href: GOVUK.overseasRecords },
      { label: "Check if you can claim the 4-year foreign income and gains regime", href: GOVUK.fig },
    ],
  },
  pl: {
    landlords: {
      heading: "Wynajmujący i przychody z najmu",
      paragraphs: [
        "Przychody z wynajmu nieruchomości lub gruntu to nieopodatkowane dochody, z powodu których może być potrzebna deklaracja.",
        "Pierwsze £1000 przychodu z najmu jest wolne od podatku — to tzw. property allowance.",
        "Jeśli przychód z najmu wynosi ponad £1000, ale nie więcej niż £2500 rocznie, według GOV.UK należy skontaktować się z HMRC.",
        "Jeśli przekracza £2500 po odliczeniu dopuszczalnych kosztów albo £10 000 przed ich odliczeniem, wykazuje się go w deklaracji Self Assessment.",
        "Jeśli zwykle nie składasz deklaracji, musisz zarejestrować się do 5 października po zakończeniu roku podatkowego, w którym był przychód z najmu.",
        "Korzystając z property allowance, nie możesz jednocześnie odliczyć faktycznych kosztów — jedno albo drugie.",
        "W niektórych sytuacjach z property allowance nie można skorzystać w ogóle. Według GOV.UK dzieje się tak na przykład wtedy, gdy masz jakiekolwiek przychody z nieruchomości od spółki, którą Ty lub osoba z Tobą powiązana posiada lub kontroluje (np. przy wynajmie własnej spółce), od spółki osobowej (partnership), w której Ty lub osoba z Tobą powiązana jest wspólnikiem, albo od Twojego pracodawcy lub pracodawcy Twojego małżonka lub partnera w związku partnerskim (civil partner). Z property allowance nie można też skorzystać przy przychodzie z wynajmu pokoju we własnym domu w ramach Rent a Room Scheme ani wtedy, gdy zamiast korzystać z tego programu odliczasz koszty od przychodu z wynajmu pokoju, ani gdy korzystasz z ulgi na koszty finansowania (np. odsetki od kredytu hipotecznego) nieruchomości mieszkalnej. Pełną listę znajdziesz na GOV.UK.",
      ],
      allowanceLink: {
        label: "Zwolnienia dla przychodów z nieruchomości i działalności (GOV.UK, po angielsku)",
        href: GOVUK.propertyAllowance,
      },
      recordsHeading: "Dokumentacja, którą według GOV.UK powinni prowadzić wynajmujący",
      records: [
        "Daty, w których nieruchomość była wynajmowana",
        "Cały otrzymany czynsz",
        "Przychody z usług świadczonych najemcom, np. opłaty za konserwację lub naprawy",
        "Książki czynszowe, paragony, faktury i wyciągi bankowe",
        "Dopuszczalne koszty utrzymania nieruchomości, np. sprzątanie lub prace ogrodowe",
      ],
      mtd: "Przychód z najmu wlicza się do przychodu kwalifikowanego w Making Tax Digital for Income Tax, razem z przychodem z samozatrudnienia, i liczy się go przed odliczeniem kosztów. Przy nieruchomości współwłasnej liczy się tylko Twój udział.",
      mtdGuideLink: "Przeczytaj pełny przewodnik po Making Tax Digital for Income Tax",
      mtdSectionLink: "Sprawdź, kiedy obowiązuje Making Tax Digital for Income Tax",
    },
    directors: {
      heading: "Dyrektorzy spółek (company directors)",
      paragraphs: [
        "Obecne wytyczne GOV.UK dotyczące tego, kto musi złożyć deklarację, nie wymieniają samej funkcji dyrektora spółki jako powodu. To, czy musisz złożyć deklarację, zależy od Twoich dochodów i sytuacji.",
        "Deklaracja może być jednak potrzebna — np. jeśli masz dywidendy lub inne dochody nieopodatkowane w systemie PAYE, takie jak przychody z najmu lub dochody zagraniczne. Deklarację trzeba też złożyć, jeśli HMRC o to wezwie.",
        "Dywidendy: co roku przysługuje dividend allowance w wysokości £500 — podatek płaci się tylko od dywidend powyżej tej kwoty, choć dywidendy nadal wlicza się do dochodu przy ustalaniu progu podatkowego. Jeśli dochód z dywidend przekracza £10 000, trzeba złożyć deklarację Self Assessment. Jeśli wynosi £10 000 lub mniej i jest od niego podatek do zapłaty, trzeba poinformować HMRC — np. prosząc o zmianę kodu podatkowego (tax code) — albo wykazać go w deklaracji, jeśli już ją składasz.",
        "Sprawozdanie finansowe spółki i jej deklaracja Company Tax Return są odrębne od Twojej osobistej deklaracja Self Assessment.",
      ],
      dividendsLink: {
        label: "Jak zgłosić podatek od dywidend (GOV.UK, po angielsku)",
        href: GOVUK.reportDividends,
      },
      recordsHeading: "Dokumenty, które według GOV.UK powinni przechowywać pracownicy i dyrektorzy",
      records: [
        "P60 — pokazuje wynagrodzenie i podatek za rok podatkowy",
        "P45 — jeśli kończysz pracę",
        "Formularz P11D — pokazuje wydatki i świadczenia",
        "Informacje o odprawie lub wypłacie z tytułu rozwiązania umowy",
      ],
    },
    foreign: {
      heading: "Dochody zagraniczne, w tym z Polski",
      paragraphs: [
        "Jeśli jesteś rezydentem podatkowym UK, zwykle płacisz w UK podatek od dochodów zagranicznych — np. od przychodów z wynajmu nieruchomości za granicą albo zagranicznych dochodów z inwestycji, takich jak dywidendy i odsetki od oszczędności. To, czy jesteś rezydentem UK, zależy od Twojej sytuacji.",
        "Rezydent UK z dochodami lub zyskami kapitałowymi z zagranicy zwykle musi złożyć deklarację Self Assessment. Wykaż w niej także dochody już opodatkowane za granicą, aby móc skorzystać z Foreign Tax Credit Relief (zaliczenia podatku zapłaconego za granicą), jeśli spełniasz warunki.",
        "Wielka Brytania i Polska mają umowę o unikaniu podwójnego opodatkowania: brytyjsko-polską konwencję z 2006 r., która obowiązuje. Wysokość ulgi zależy od tej umowy i możesz nie odzyskać całego podatku zapłaconego za granicą.",
      ],
      fig: "Od 6 kwietnia 2025 r. zasadę remittance basis zastąpił 4-letni system dla dochodów i zysków zagranicznych (foreign income and gains, FIG) — dla osób w pierwszych 4 latach rezydencji podatkowej w UK po co najmniej 10 latach bez niej. Jeśli może Cię to dotyczyć, sprawdź wytyczne GOV.UK.",
      figLink: {
        label: "Czy możesz skorzystać z 4-letniego systemu FIG (GOV.UK, po angielsku)",
        href: GOVUK.fig,
      },
      recordsHeading: "Dokumenty, które według GOV.UK powinno się przechowywać przy dochodach zagranicznych",
      records: [
        "Dowody dochodów uzyskanych za granicą, np. paski wynagrodzeń, wyciągi bankowe lub potwierdzenia płatności",
        "Paragony za zagraniczne wydatki, które chcesz odliczyć",
        "Zaświadczenia o dywidendach od zagranicznych spółek",
        "Zaświadczenia lub inne dowody podatku już zapłaconego w UK lub za granicą",
      ],
      polishSide:
        "Mogę pomóc po stronie brytyjskiej: przy Twojej deklaracji Self Assessment w UK, w tym przy wykazaniu w niej dochodów zagranicznych. Nie przygotowuję polskich zeznań podatkowych (PIT) i nie doradzam w sprawie polskich podatków — w tej kwestii skontaktuj się z doradcą podatkowym w Polsce.",
    },
    checker: {
      label: "Sprawdź, czy musisz złożyć deklarację Self Assessment (narzędzie HMRC, po angielsku)",
      href: HMRC.checker,
    },
    disclaimer:
      "Ta strona ma charakter ogólnoinformacyjny i nie stanowi porady podatkowej. Przepisy się zmieniają, a liczy się Twoja indywidualna sytuacja — sprawdź GOV.UK lub zasięgnij porady w swojej sprawie.",
    sourcesHeading: (date) => `Źródła do tych sekcji (GOV.UK, po angielsku; sprawdzone ${date})`,
    sources: [
      { label: "Deklaracje Self Assessment", href: GOVUK.saOverview },
      { label: "Kto musi złożyć deklarację podatkową", href: HMRC.whoMustSend },
      { label: "Wynajem nieruchomości: podatek", href: GOVUK.rentingPayingTax },
      { label: "Zwolnienia dla przychodów z nieruchomości i działalności", href: GOVUK.propertyAllowance },
      { label: "Dokumentacja: przychody z najmu", href: GOVUK.rentalRecords },
      {
        label: "Jak obliczyć przychód kwalifikowany do Making Tax Digital for Income Tax",
        href: HMRC.mtdQualifyingIncome,
      },
      { label: "Podatek od dywidend", href: GOVUK.dividends },
      { label: "Jak zgłosić podatek od dywidend", href: GOVUK.reportDividends },
      { label: "Dokumentacja: pracownicy i dyrektorzy spółek", href: GOVUK.directorRecords },
      { label: "Podatek od dochodów zagranicznych", href: GOVUK.foreignIncome },
      { label: "Rezydencja w UK a podatki", href: GOVUK.residence },
      { label: "Jak wykazać dochody zagraniczne", href: GOVUK.reportForeignIncome },
      { label: "Podatek od dochodów zagranicznych: podwójne opodatkowanie", href: GOVUK.taxedTwice },
      { label: "Polska: umowy podatkowe", href: GOVUK.polandTreaty },
      { label: "Dokumentacja: dochody zagraniczne", href: GOVUK.overseasRecords },
      { label: "Czy możesz skorzystać z 4-letniego systemu FIG", href: GOVUK.fig },
    ],
  },
};
