import type { Locale } from "@/content/copy";

/**
 * Copy for the Making Tax Digital for Income Tax guide (EN
 * /making-tax-digital-income-tax, PL /pl/making-tax-digital-income-tax),
 * task T2.5. Both languages live here so they carry the same facts.
 *
 * Every figure and date here was checked against the GOV.UK pages in
 * GOV_UK on FIGURES_CHECKED_ON. Re-check them all before changing that date.
 * The start-date cohorts come from MTD_COHORTS in content/self-assessment.ts
 * so the guide and the Self Assessment pages can never disagree.
 *
 * Owner-confirmed scope (Sabina, 11 Nov 2026): sets up bookkeeping software
 * (no product named), keeps digital records at any frequency and catches up
 * late records, prepares Self Assessment returns, remote only, English and
 * Polish, fees agreed after the free call (no figures). HMRC agent status is
 * NOT confirmed, so the copy says she prepares the figures for each quarterly
 * update and the tax return; it never says she submits them as your agent.
 */
export const FIGURES_CHECKED_ON = "2026-11-12";

export const GOV_UK = {
  whenToUse:
    "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax",
  checker:
    "https://www.tax.service.gov.uk/guidance/check-if-you-need-to-use-making-tax-digital-for-income-tax",
  qualifyingIncome:
    "https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax",
  exemptions:
    "https://www.gov.uk/guidance/find-out-if-you-can-get-an-exemption-from-making-tax-digital-for-income-tax",
  applyExemption:
    "https://www.gov.uk/guidance/apply-for-an-exemption-from-making-tax-digital-for-income-tax",
  quarterlyUpdates:
    "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates",
  taxReturn:
    "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/submit-your-tax-return",
  software:
    "https://www.gov.uk/guidance/choose-the-right-software-for-making-tax-digital-for-income-tax",
  softwareFinder:
    "https://www.gov.uk/guidance/find-software-that-works-with-making-tax-digital-for-income-tax",
  penalties:
    "https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax",
  vat: "https://www.gov.uk/charge-reclaim-record-vat",
} as const;

/**
 * Standard update periods (tax year 6 April to 5 April). Each update is
 * cumulative from 6 April. Deadlines are the same for calendar update periods.
 */
export const QUARTERS = [
  { en: "6 April to 5 July", pl: "od 6 kwietnia do 5 lipca", dueEn: "7 August", duePl: "7 sierpnia" },
  { en: "6 April to 5 October", pl: "od 6 kwietnia do 5 października", dueEn: "7 November", duePl: "7 listopada" },
  { en: "6 April to 5 January", pl: "od 6 kwietnia do 5 stycznia", dueEn: "7 February", duePl: "7 lutego" },
  { en: "6 April to 5 April", pl: "od 6 kwietnia do 5 kwietnia", dueEn: "7 May (the following tax year)", duePl: "7 maja (w następnym roku podatkowym)" },
] as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type MtdCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  serviceName: string;
  h1: string;
  lead: string;
  checkedLine: (date: string) => string;
  ctaBook: string;
  ctaContact: string;

  whoHeading: string;
  whoIntro: string;
  whoConditions: string[];
  tableCaption: string;
  colIncome: string;
  colYear: string;
  colStart: string;
  incomeCell: (amount: string) => string;
  whoNotes: string[];
  checker: Link;

  qualifyingHeading: string;
  qualifyingIntro: string;
  qualifyingExample: string;
  notQualifyingHeading: string;
  notQualifying: string[];
  qualifyingNote: string;

  exemptHeading: string;
  exemptIntro: string;
  exemptPoints: string[];
  exemptLinks: Link[];

  quarterlyHeading: string;
  quarterlyIntro: string[];
  quarterTableCaption: string;
  colPeriod: string;
  colDue: string;
  quarterlyNotes: string[];
  penaltiesHeading: string;
  penalties: string;

  finalHeading: string;
  finalParagraphs: string[];

  softwareHeading: string;
  software: string;
  softwareLinks: Link[];

  vatBoxHeading: string;
  vatBox: string[];
  vatBoxLink: string;

  helpHeading: string;
  helpIntro: string;
  help: string[];
  helpNote: string;
  saLink: string;
  bookkeepingLink: string;

  faqHeading: string;
  faqs: Faq[];

  disclaimer: (checkedOn: string) => string;
  sourcesHeading: string;
  sources: Link[];
};

export const mtdCopy: Record<Locale, MtdCopy> = {
  en: {
    title: "Making Tax Digital for Income Tax: who and when | Sabina Krajewska",
    description:
      "Who needs Making Tax Digital for Income Tax and when: HMRC start dates, qualifying income, exemptions and quarterly updates, in English or Polish.",
    ogTitle: "Making Tax Digital for Income Tax: who needs it and when",
    ogDescription:
      "HMRC start dates, qualifying income, exemptions, quarterly updates and the end-of-year tax return, explained in plain English.",
    serviceName: "Making Tax Digital for Income Tax support",
    h1: "Making Tax Digital for Income Tax: who needs it and when",
    lead: "Making Tax Digital for Income Tax applies to sole traders and landlords registered for Self Assessment whose qualifying income is over a threshold: over £50,000 from 6 April 2026, over £30,000 from 6 April 2027 and over £20,000 from 6 April 2028. If it applies to you, you keep digital records in compatible software, send HMRC a quarterly update every 3 months and submit your tax return through that software by 31 January. Whether it applies depends on your own income, so check before you assume either way.",
    checkedLine: (date) => `Checked against GOV.UK on ${date}.`,
    ctaBook: "Book Free Consultation",
    ctaContact: "Get in Touch",

    whoHeading: "Who needs to use it, and from when",
    whoIntro: "According to HMRC, you need to use Making Tax Digital for Income Tax if all of these apply:",
    whoConditions: [
      "You're a sole trader or a landlord registered for Self Assessment",
      "You get income from self-employment or property, or both",
      "Your qualifying income is more than the threshold for the relevant tax year",
    ],
    tableCaption: "When Making Tax Digital for Income Tax starts",
    colIncome: "Qualifying income",
    colYear: "In tax year",
    colStart: "Use it from",
    incomeCell: (amount) => `Over ${amount}`,
    whoNotes: [
      "HMRC checks your Self Assessment tax return each year. If your qualifying income is over the threshold, HMRC writes to tell you to start from the next tax year. If no letter arrives, it's still your responsibility to check.",
      "You still send a normal Self Assessment tax return for the tax year before you start.",
      "Partnerships don't need to use it yet. HMRC will set out a timeline for them later.",
    ],
    checker: {
      label: "Check if you need to use Making Tax Digital for Income Tax (HMRC tool)",
      href: GOV_UK.checker,
    },

    qualifyingHeading: "What \"qualifying income\" means",
    qualifyingIntro:
      "Qualifying income is your total income from self-employment and property before expenses (your turnover), based on the tax return you sent for the previous tax year. If you have more than one business or property, you add them together. For a jointly owned property, only your share counts.",
    qualifyingExample:
      "For example, £25,000 of rental income plus £27,000 of self-employment income gives qualifying income of £52,000, even if your profit after expenses is much lower.",
    notQualifyingHeading: "These don't count towards it:",
    notQualifying: [
      "Employment income taxed through PAYE",
      "Your share of profit from a partnership as an individual partner",
      "Dividends, including from your own company",
      "The State Pension and private pensions",
    ],
    qualifyingNote:
      "Some situations have special rules, such as ceased income sources, accounting periods longer or shorter than a year, and trusts. HMRC's qualifying income guidance covers them.",

    exemptHeading: "Exemptions and who doesn't need to use it",
    exemptIntro:
      "If you're exempt, you don't use Making Tax Digital for Income Tax, but you still report your income in a Self Assessment tax return as normal. Some exemptions are automatic and some you have to apply for. Examples from HMRC's guidance:",
    exemptPoints: [
      "If your qualifying income is £20,000 or less, you're automatically exempt.",
      "You're automatically exempt if you don't have a National Insurance number before the start of the tax year.",
      "You can apply for an exemption if you're digitally excluded, for example because your age, health or disability stops you using a computer, tablet or smartphone, or you can't get internet access where you live or work.",
      "Some exemptions are temporary, for example ones linked to certain claims or supplementary pages on your 2024/25 tax return. HMRC says these last until April 2027 at the earliest.",
      "HMRC won't accept an application if your only reason is that you're unfamiliar with accounting software, used to file on paper, or have few records.",
    ],
    exemptLinks: [
      { label: "Find out if you can get an exemption (GOV.UK)", href: GOV_UK.exemptions },
      { label: "Apply for an exemption (GOV.UK)", href: GOV_UK.applyExemption },
    ],

    quarterlyHeading: "Quarterly updates",
    quarterlyIntro: [
      "Every 3 months, your software adds up your digital records into totals of income and expenses for each self-employment and property business. You send these totals to HMRC as a quarterly update. HMRC calls them summaries, not tax returns, and you don't need to make accounting or tax adjustments first.",
      "Each update covers the tax year so far, from 6 April to the end of the update period. You must send an update even if you had no income or expenses in that period.",
    ],
    quarterTableCaption: "Standard update periods and deadlines",
    colPeriod: "Update period",
    colDue: "Send by",
    quarterlyNotes: [
      "If your accounting period runs from 1 April to 31 March, HMRC says you should use calendar update periods instead. The deadlines are the same. You need to select this in your software before your first update of the tax year.",
    ],
    penaltiesHeading: "Late updates",
    penalties:
      "HMRC won't apply penalty points for late quarterly updates in the 2026/27 tax year, but you still have to send them before you can submit your tax return. From the 2027/28 tax year, you get a penalty point for each missed deadline, and reaching 4 points means a £200 penalty. Late tax returns still get penalty points in 2026/27.",

    finalHeading: "The end-of-year tax return (final declaration)",
    finalParagraphs: [
      "After your last quarterly update, you make any accounting or tax adjustments, add any other income such as savings interest or dividends, check HMRC's calculation, and submit your tax return through your software. This end-of-year step is often called the final declaration.",
      "The deadline is 31 January following the end of the tax year. For example, a 2026/27 return is due by 31 January 2028.",
      "Making Tax Digital for Income Tax doesn't change how you pay your tax or when payments are due.",
    ],

    softwareHeading: "Software",
    software:
      "You, or someone acting for you, need software that works with Making Tax Digital for Income Tax. Some software creates digital records; bridging software connects existing records, such as spreadsheets, to HMRC. HMRC doesn't recommend any product, and neither do I. Use HMRC's own list to find options.",
    softwareLinks: [
      { label: "Find software that works with Making Tax Digital for Income Tax (GOV.UK)", href: GOV_UK.softwareFinder },
      { label: "Choose the right software (GOV.UK)", href: GOV_UK.software },
    ],

    vatBoxHeading: "Not the same as Making Tax Digital for VAT",
    vatBox: [
      "Making Tax Digital for VAT is a separate set of rules for VAT-registered businesses and their VAT Returns. Making Tax Digital for Income Tax is about Income Tax on self-employment and property income.",
      "You might be in one, both or neither. If you're in both, HMRC keeps your penalty points for each separately.",
    ],
    vatBoxLink: "Bookkeeping and VAT returns",

    helpHeading: "How I can help",
    helpIntro:
      "I'm Sabina Krajewska, a bookkeeper based in St Helens. I work remotely with sole traders and landlords across the UK, in English or Polish.",
    help: [
      "I help you get set up with compatible software. I don't name or sell a particular product; we choose what suits your records.",
      "I keep your digital records up to date, at whatever frequency you need, and catch up records that have fallen behind.",
      "I prepare the figures for each quarterly update and for your end-of-year tax return, so you know what is being reported.",
      "I prepare Self Assessment tax returns and work with your UTR and Self Assessment details.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],
    helpNote:
      "If you're not sure whether Making Tax Digital for Income Tax applies to you yet, we can look at your figures together on the free call.",
    saLink: "Self Assessment tax returns",
    bookkeepingLink: "Bookkeeping and VAT",

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "Do I have to use Making Tax Digital for Income Tax if I'm self-employed?",
        answer:
          "Only if your qualifying income is over the threshold. From 6 April 2026 it applies to qualifying income over £50,000 in 2024/25, from 6 April 2027 to over £30,000 in 2025/26, and from 6 April 2028 to over £20,000 in 2026/27. Qualifying income of £20,000 or less is automatically exempt, and some people are exempt for other reasons.",
      },
      {
        question: "Is qualifying income my profit?",
        answer:
          "No. It is your self-employment and property income before expenses, added together. Employment income through PAYE, dividends and pensions don't count.",
      },
      {
        question: "When are quarterly updates due?",
        answer:
          "By 7 August, 7 November, 7 February and 7 May, for periods ending 5 July, 5 October, 5 January and 5 April.",
      },
      {
        question: "Do I still need to send a tax return?",
        answer:
          "Yes. You submit it through your compatible software by 31 January following the end of the tax year. For the tax year before you start, you send a normal Self Assessment return.",
      },
      {
        question: "Is this the same as Making Tax Digital for VAT?",
        answer:
          "No. Making Tax Digital for VAT covers VAT-registered businesses and their VAT Returns. Making Tax Digital for Income Tax covers Income Tax on self-employment and property income.",
      },
      {
        question: "What if I haven't had a letter from HMRC?",
        answer:
          "HMRC says it is still your responsibility to check whether and when you need to use it. You can use HMRC's online checker.",
      },
      {
        question: "Can you help in Polish?",
        answer: "Yes. I work remotely, in English and Polish.",
      },
    ],

    disclaimer: (checkedOn) =>
      `This page gives general information, not tax advice. Rules and thresholds change, so check GOV.UK or ask for advice about your own situation. Figures checked on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "Find out if and when you need to use Making Tax Digital for Income Tax", href: GOV_UK.whenToUse },
      { label: "Work out your qualifying income for Making Tax Digital for Income Tax", href: GOV_UK.qualifyingIncome },
      { label: "Find out if you can get an exemption from Making Tax Digital for Income Tax", href: GOV_UK.exemptions },
      { label: "Use Making Tax Digital for Income Tax: send quarterly updates", href: GOV_UK.quarterlyUpdates },
      { label: "Use Making Tax Digital for Income Tax: submit your tax return", href: GOV_UK.taxReturn },
      { label: "Penalties for Making Tax Digital for Income Tax", href: GOV_UK.penalties },
      { label: "Choose the right software for Making Tax Digital for Income Tax", href: GOV_UK.software },
      { label: "Charge, reclaim and record VAT", href: GOV_UK.vat },
    ],
  },

  pl: {
    title: "MTD for Income Tax: kogo dotyczy i od kiedy | Sabina Krajewska",
    description:
      "Kogo i od kiedy obejmuje Making Tax Digital for Income Tax: terminy HMRC, przychód kwalifikowany, zwolnienia i aktualizacje kwartalne, po polsku.",
    ogTitle: "Making Tax Digital for Income Tax: kogo dotyczy i od kiedy",
    ogDescription:
      "Terminy HMRC, przychód kwalifikowany, zwolnienia, aktualizacje kwartalne i roczne zeznanie podatkowe, wyjaśnione po polsku.",
    serviceName: "Pomoc z Making Tax Digital for Income Tax",
    h1: "Making Tax Digital for Income Tax: kogo dotyczy i od kiedy",
    lead: "Making Tax Digital for Income Tax dotyczy osób prowadzących działalność jako sole trader oraz wynajmujących nieruchomości, zarejestrowanych w Self Assessment, których przychód kwalifikowany przekracza próg: ponad £50 000 od 6 kwietnia 2026 r., ponad £30 000 od 6 kwietnia 2027 r. i ponad £20 000 od 6 kwietnia 2028 r. Jeśli system Cię obejmuje, prowadzisz dokumentację cyfrową w zgodnym oprogramowaniu, co 3 miesiące wysyłasz do HMRC aktualizację kwartalną, a zeznanie podatkowe składasz przez to oprogramowanie do 31 stycznia. To, czy obowiązek Cię dotyczy, zależy od Twoich dochodów, dlatego warto to sprawdzić.",
    checkedLine: (date) => `Sprawdzone w GOV.UK ${date}`,
    ctaBook: "Umów bezpłatną konsultację",
    ctaContact: "Skontaktuj się",

    whoHeading: "Kogo dotyczy i od kiedy",
    whoIntro: "Według HMRC musisz korzystać z Making Tax Digital for Income Tax, jeśli spełniasz wszystkie te warunki:",
    whoConditions: [
      "Prowadzisz działalność jako sole trader lub wynajmujesz nieruchomości i masz rejestrację w Self Assessment",
      "Masz przychód z samozatrudnienia, z najmu albo z obu tych źródeł",
      "Twój przychód kwalifikowany przekracza próg dla danego roku podatkowego",
    ],
    tableCaption: "Od kiedy obowiązuje Making Tax Digital for Income Tax",
    colIncome: "Przychód kwalifikowany",
    colYear: "W roku podatkowym",
    colStart: "Obowiązek od",
    incomeCell: (amount) => `Ponad ${amount}`,
    whoNotes: [
      "HMRC co roku sprawdza Twoje zeznanie Self Assessment. Jeśli przychód kwalifikowany przekracza próg, HMRC wysyła list z informacją, że od następnego roku podatkowego musisz korzystać z systemu. Jeśli list nie dotrze, nadal to Ty odpowiadasz za sprawdzenie, czy obowiązek Cię dotyczy.",
      "Za rok podatkowy poprzedzający przejście do systemu nadal składasz zwykłe zeznanie Self Assessment.",
      "Spółki osobowe (partnerships) nie muszą jeszcze korzystać z systemu. HMRC ogłosi dla nich harmonogram później.",
    ],
    checker: {
      label: "Sprawdź, czy musisz korzystać z Making Tax Digital for Income Tax (narzędzie HMRC, po angielsku)",
      href: GOV_UK.checker,
    },

    qualifyingHeading: "Co oznacza „przychód kwalifikowany”",
    qualifyingIntro:
      "Przychód kwalifikowany (qualifying income) to łączny przychód z samozatrudnienia i najmu przed odliczeniem kosztów (obrót), na podstawie zeznania podatkowego złożonego za poprzedni rok podatkowy. Jeśli masz kilka działalności lub nieruchomości, sumujesz je. W przypadku nieruchomości współwłasnej liczy się tylko Twój udział.",
    qualifyingExample:
      "Na przykład £25 000 przychodu z najmu i £27 000 przychodu z samozatrudnienia dają przychód kwalifikowany £52 000, nawet jeśli zysk po odliczeniu kosztów jest dużo niższy.",
    notQualifyingHeading: "Do przychodu kwalifikowanego nie wlicza się:",
    notQualifying: [
      "Wynagrodzenia z etatu opodatkowanego w systemie PAYE",
      "Udziału w zysku spółki osobowej (partnership) jako wspólnik",
      "Dywidend, w tym z własnej spółki",
      "Emerytury państwowej (State Pension) i emerytur prywatnych",
    ],
    qualifyingNote:
      "Niektóre sytuacje mają osobne zasady, np. zakończone źródła przychodu, okresy rozliczeniowe dłuższe lub krótsze niż rok czy trusty. Opisuje je wytyczna HMRC dotycząca przychodu kwalifikowanego.",

    exemptHeading: "Zwolnienia i kto nie musi korzystać z systemu",
    exemptIntro:
      "Jeśli przysługuje Ci zwolnienie, nie korzystasz z Making Tax Digital for Income Tax, ale nadal zgłaszasz dochody w zwykłym zeznaniu Self Assessment. Część zwolnień przysługuje automatycznie, o inne trzeba wystąpić. Przykłady z wytycznych HMRC:",
    exemptPoints: [
      "Jeśli Twój przychód kwalifikowany wynosi £20 000 lub mniej, zwolnienie przysługuje Ci automatycznie.",
      "Zwolnienie przysługuje Ci automatycznie, jeśli przed początkiem roku podatkowego nie masz numeru National Insurance.",
      "Możesz wystąpić o zwolnienie z powodu wykluczenia cyfrowego, np. gdy wiek, stan zdrowia lub niepełnosprawność uniemożliwiają Ci korzystanie z komputera, tabletu lub smartfona albo nie masz dostępu do internetu w miejscu zamieszkania lub pracy.",
      "Niektóre zwolnienia są tymczasowe, np. związane z określonymi ulgami lub dodatkowymi stronami zeznania za rok 2024/25. Według HMRC obowiązują co najmniej do kwietnia 2027 r.",
      "HMRC nie przyjmie wniosku, jeśli jedynym powodem jest brak znajomości programów księgowych, wcześniejsze składanie zeznań na papierze lub niewielka liczba dokumentów.",
    ],
    exemptLinks: [
      { label: "Sprawdź, czy przysługuje Ci zwolnienie (GOV.UK, po angielsku)", href: GOV_UK.exemptions },
      { label: "Wniosek o zwolnienie (GOV.UK, po angielsku)", href: GOV_UK.applyExemption },
    ],

    quarterlyHeading: "Aktualizacje kwartalne",
    quarterlyIntro: [
      "Co 3 miesiące oprogramowanie sumuje Twoją dokumentację cyfrową w łączne kwoty przychodów i kosztów dla każdej działalności i każdego najmu. Te sumy wysyłasz do HMRC jako aktualizację kwartalną (quarterly update). HMRC określa je jako podsumowania, a nie zeznania podatkowe, i nie trzeba wcześniej robić korekt księgowych ani podatkowych.",
      "Każda aktualizacja obejmuje rok podatkowy do danego momentu, od 6 kwietnia do końca okresu. Aktualizację trzeba wysłać nawet wtedy, gdy w danym okresie nie było przychodów ani kosztów.",
    ],
    quarterTableCaption: "Standardowe okresy i terminy aktualizacji",
    colPeriod: "Okres",
    colDue: "Termin wysłania",
    quarterlyNotes: [
      "Jeśli Twój okres rozliczeniowy trwa od 1 kwietnia do 31 marca, według HMRC należy zamiast tego stosować okresy kalendarzowe. Terminy są takie same. Trzeba to ustawić w oprogramowaniu przed pierwszą aktualizacją w danym roku podatkowym.",
    ],
    penaltiesHeading: "Spóźnione aktualizacje",
    penalties:
      "W roku podatkowym 2026/27 HMRC nie nalicza punktów karnych za spóźnione aktualizacje kwartalne, ale trzeba je wysłać, zanim złożysz zeznanie podatkowe. Od roku podatkowego 2027/28 za każdy przekroczony termin otrzymujesz punkt karny, a po osiągnięciu 4 punktów nakładana jest kara £200. Za spóźnione zeznanie podatkowe punkty karne są naliczane także w roku 2026/27.",

    finalHeading: "Roczne zeznanie podatkowe (final declaration)",
    finalParagraphs: [
      "Po ostatniej aktualizacji kwartalnej wprowadzasz ewentualne korekty księgowe i podatkowe, dodajesz inne dochody, np. odsetki od oszczędności czy dywidendy, sprawdzasz wyliczenie HMRC i składasz zeznanie podatkowe przez oprogramowanie. Ten końcowy etap często nazywa się final declaration (deklaracja końcowa).",
      "Termin to 31 stycznia po zakończeniu roku podatkowego. Na przykład zeznanie za rok 2026/27 trzeba złożyć do 31 stycznia 2028 r.",
      "Making Tax Digital for Income Tax nie zmienia sposobu płacenia podatku ani terminów płatności.",
    ],

    softwareHeading: "Oprogramowanie",
    software:
      "Ty lub osoba działająca w Twoim imieniu potrzebujecie oprogramowania zgodnego z Making Tax Digital for Income Tax. Jedne programy tworzą dokumentację cyfrową, inne (tzw. bridging software) łączą istniejącą dokumentację, np. arkusze kalkulacyjne, z HMRC. HMRC nie poleca żadnego produktu i ja również tego nie robię. Opcje znajdziesz na liście HMRC.",
    softwareLinks: [
      { label: "Znajdź oprogramowanie zgodne z Making Tax Digital for Income Tax (GOV.UK, po angielsku)", href: GOV_UK.softwareFinder },
      { label: "Jak wybrać oprogramowanie (GOV.UK, po angielsku)", href: GOV_UK.software },
    ],

    vatBoxHeading: "To nie to samo co Making Tax Digital dla VAT",
    vatBox: [
      "Making Tax Digital dla VAT to odrębne zasady dla firm zarejestrowanych do VAT i ich deklaracji VAT (VAT Returns). Making Tax Digital for Income Tax dotyczy podatku dochodowego od przychodów z samozatrudnienia i najmu.",
      "Może Cię dotyczyć jeden z tych systemów, oba albo żaden. Jeśli oba, HMRC prowadzi punkty karne dla każdego z nich osobno.",
    ],
    vatBoxLink: "Księgowość i deklaracje VAT",

    helpHeading: "Jak mogę pomóc",
    helpIntro:
      "Nazywam się Sabina Krajewska i jestem księgową z St Helens. Pracuję zdalnie z osobami prowadzącymi działalność jako sole trader i wynajmującymi w całej Wielkiej Brytanii, po polsku lub po angielsku.",
    help: [
      "Pomagam skonfigurować zgodne oprogramowanie. Nie polecam ani nie sprzedaję konkretnego produktu; wybieramy to, co pasuje do Twojej dokumentacji.",
      "Prowadzę Twoją dokumentację cyfrową na bieżąco, z częstotliwością, jakiej potrzebujesz, i nadrabiam zaległości.",
      "Przygotowuję dane do każdej aktualizacji kwartalnej i do rocznego zeznania podatkowego, żebyś wiedział, co jest zgłaszane.",
      "Przygotowuję zeznania Self Assessment i pracuję z Twoim numerem UTR oraz danymi Self Assessment.",
      "Wynagrodzenie ustalamy po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],
    helpNote:
      "Jeśli nie wiesz jeszcze, czy Making Tax Digital for Income Tax Cię dotyczy, możemy razem przejrzeć Twoje dane podczas bezpłatnej rozmowy.",
    saLink: "Rozliczenie Self Assessment",
    bookkeepingLink: "Księgowość i VAT",

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Czy muszę korzystać z Making Tax Digital for Income Tax, jeśli prowadzę działalność na własny rachunek?",
        answer:
          "Tylko jeśli Twój przychód kwalifikowany przekracza próg. Od 6 kwietnia 2026 r. dotyczy przychodu ponad £50 000 w roku 2024/25, od 6 kwietnia 2027 r. ponad £30 000 w roku 2025/26, a od 6 kwietnia 2028 r. ponad £20 000 w roku 2026/27. Przychód kwalifikowany do £20 000 włącznie oznacza automatyczne zwolnienie, a niektóre osoby są zwolnione z innych powodów.",
      },
      {
        question: "Czy przychód kwalifikowany to mój zysk?",
        answer:
          "Nie. To łączny przychód z samozatrudnienia i najmu przed odliczeniem kosztów. Wynagrodzenie z PAYE, dywidendy i emerytury się nie liczą.",
      },
      {
        question: "Kiedy trzeba wysłać aktualizacje kwartalne?",
        answer:
          "Do 7 sierpnia, 7 listopada, 7 lutego i 7 maja, za okresy kończące się 5 lipca, 5 października, 5 stycznia i 5 kwietnia.",
      },
      {
        question: "Czy nadal muszę składać zeznanie podatkowe?",
        answer:
          "Tak. Składasz je przez zgodne oprogramowanie do 31 stycznia po zakończeniu roku podatkowego. Za rok poprzedzający przejście do systemu składasz zwykłe zeznanie Self Assessment.",
      },
      {
        question: "Czy to to samo co Making Tax Digital dla VAT?",
        answer:
          "Nie. Making Tax Digital dla VAT obejmuje firmy zarejestrowane do VAT i ich deklaracje VAT. Making Tax Digital for Income Tax dotyczy podatku dochodowego od przychodów z samozatrudnienia i najmu.",
      },
      {
        question: "Co, jeśli nie dostałem listu z HMRC?",
        answer:
          "Według HMRC nadal to Ty odpowiadasz za sprawdzenie, czy i od kiedy musisz korzystać z systemu. Możesz skorzystać z narzędzia HMRC online.",
      },
      {
        question: "Czy mogę liczyć na pomoc po polsku?",
        answer: "Tak. Pracuję zdalnie, po polsku i po angielsku.",
      },
    ],

    disclaimer: (checkedOn) =>
      `Ta strona zawiera informacje ogólne i nie stanowi porady podatkowej. Przepisy i progi się zmieniają, dlatego sprawdź GOV.UK lub zasięgnij porady dotyczącej Twojej sytuacji. Dane sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Czy i od kiedy musisz korzystać z Making Tax Digital for Income Tax", href: GOV_UK.whenToUse },
      { label: "Jak obliczyć przychód kwalifikowany", href: GOV_UK.qualifyingIncome },
      { label: "Zwolnienia z Making Tax Digital for Income Tax", href: GOV_UK.exemptions },
      { label: "Wysyłanie aktualizacji kwartalnych", href: GOV_UK.quarterlyUpdates },
      { label: "Składanie zeznania podatkowego", href: GOV_UK.taxReturn },
      { label: "Kary w Making Tax Digital for Income Tax", href: GOV_UK.penalties },
      { label: "Jak wybrać oprogramowanie", href: GOV_UK.software },
      { label: "Naliczanie, odliczanie i ewidencja VAT", href: GOV_UK.vat },
    ],
  },
};
