import type { Locale } from "@/content/copy";

/**
 * Copy for the Bookkeeping & VAT pages (EN /bookkeeping-vat, PL
 * /pl/ksiegowosc-vat), task T2.2. Both languages carry the same facts.
 *
 * Every figure here was checked against the GOV.UK pages in `sources` on
 * FIGURES_CHECKED_ON. Re-check them all before changing that date.
 *
 * Owner-confirmed scope (Sabina, 11 Nov 2026): remote only, no named software,
 * registers for VAT and submits VAT Returns via MTD software, advises on VAT
 * schemes, any bookkeeping frequency, catches up late records, fees agreed
 * after the free call (no figures), no HMRC agent status claimed.
 */
export const FIGURES_CHECKED_ON = "2026-11-12";

export const GOV_UK = {
  vatRegistration: "https://www.gov.uk/vat-registration/when-to-register",
  vatReturns: "https://www.gov.uk/vat-returns",
  vatPenalties:
    "https://www.gov.uk/guidance/penalty-points-and-penalties-if-you-submit-your-vat-return-late",
  mtdIncomeTax:
    "https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax",
  vatRecords: "https://www.gov.uk/charge-reclaim-record-vat/keeping-vat-records",
  soleTraderRecords:
    "https://www.gov.uk/self-employed-records/how-long-to-keep-your-records",
  companyRecords:
    "https://www.gov.uk/running-a-limited-company/company-and-accounting-records",
  flatRate: "https://www.gov.uk/vat-flat-rate-scheme",
  cashAccounting: "https://www.gov.uk/vat-cash-accounting-scheme/eligibility",
} as const;

type Link = { label: string; href: string };
export type Faq = { question: string; answer: string };

export type BookkeepingCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  heroImageAlt: string;
  ctaBook: string;
  ctaContact: string;

  includesHeading: string;
  includes: string[];

  vatHeading: string;
  vatPoints: { label: string; text: string }[];
  vatWhatIDo: string;
  vatSchemes: string;

  mtdHeading: string;
  mtdParagraphs: string[];
  mtdMoreLink: string;

  documentsHeading: string;
  documentsIntro: string;
  documents: string[];
  recordsHeading: string;
  records: string;

  workingHeading: string;
  working: string[];

  faqHeading: string;
  faqs: Faq[];

  disclaimer: (checkedOn: string) => string;
  sourcesHeading: string;
  sources: Link[];
};

export const bookkeepingCopy: Record<Locale, BookkeepingCopy> = {
  en: {
    title: "Bookkeeping & VAT in St Helens & Liverpool | Sabina Krajewska",
    description:
      "Bookkeeping, VAT returns and Making Tax Digital for VAT for sole traders and small companies in St Helens and Liverpool, working remotely across the UK.",
    ogTitle: "Bookkeeping & VAT | St Helens & Liverpool",
    ogDescription:
      "Bookkeeping, VAT registration and VAT Returns under Making Tax Digital, working remotely across the UK in English or Polish.",
    h1: "Bookkeeping and VAT for small businesses in St Helens and Liverpool",
    lead: "I'm Sabina Krajewska, a bookkeeper based in St Helens. I keep the records of sole traders and small limited companies accurate and up to date, register clients for VAT, and prepare and submit VAT Returns through Making Tax Digital software. I work remotely with clients in St Helens, Liverpool, Merseyside and across the UK, in English or Polish.",
    heroImageAlt: "Desk with paperwork and a laptop",
    ctaBook: "Book a free introductory call",
    ctaContact: "Get in touch",

    includesHeading: "What my bookkeeping service includes",
    includes: [
      "Recording your sales, purchases and expenses from your invoices, receipts and bank statements.",
      "Reconciling your bank accounts so the books match what actually happened.",
      "Keeping your records in a form your Self Assessment or company accounts can be prepared from.",
      "Bookkeeping as often as suits you: monthly, quarterly or on another schedule we agree.",
      "Bringing your records up to date if they've fallen behind.",
      "Setting up bookkeeping software for you, if you'd like to keep your records online.",
    ],

    vatHeading: "VAT registration and VAT Returns",
    vatPoints: [
      {
        label: "When you must register",
        text: "You must register for VAT if your total taxable turnover for the last 12 months goes over £90,000, or if you expect it to go over £90,000 in the next 30 days alone.",
      },
      {
        label: "Registration deadline",
        text: "Under the 12-month test, you must register within 30 days of the end of the month you went over the threshold. Your registration takes effect from the first day of the second month after you went over.",
      },
      {
        label: "How often you file",
        text: "Most businesses send a VAT Return every 3 months. The return and any payment are usually due one calendar month and 7 days after the end of the period.",
      },
      {
        label: "Late returns",
        text: "Each late VAT Return earns a penalty point, including nil returns. For quarterly returns the threshold is 4 points, and when you reach it HMRC charges a £200 penalty.",
      },
    ],
    vatWhatIDo:
      "What I do: I can register you for VAT, prepare your VAT Return from your records, check it with you, and submit it through Making Tax Digital software.",
    vatSchemes:
      "HMRC also runs simplified VAT schemes, including the Flat Rate Scheme (for a VAT turnover of £150,000 or less, excluding VAT) and the Cash Accounting Scheme (for an estimated VAT taxable turnover of £1.35 million or less in the next 12 months). I can talk you through whether one of them suits your business.",

    mtdHeading: "Making Tax Digital: VAT and Income Tax are different",
    mtdParagraphs: [
      "Making Tax Digital (MTD) for VAT applies to VAT-registered businesses. You keep some of your VAT records digitally and send VAT Returns to HMRC through compatible software.",
      "MTD for Income Tax is a separate scheme for sole traders and landlords. It has applied since 6 April 2026 to people whose qualifying income was over £50,000 in the 2024 to 2025 tax year. From 6 April 2027 the threshold is over £30,000 (2025 to 2026 income), and from 6 April 2028 it is over £20,000 (2026 to 2027 income).",
      "You can be in one scheme, both or neither.",
    ],
    mtdMoreLink: "Read more about Making Tax Digital for Income Tax",

    documentsHeading: "What documents I'll need from you",
    documentsIntro: "To get started, I'll usually ask for:",
    documents: [
      "Sales invoices you've issued, and purchase invoices or receipts for what you've bought.",
      "Bank and card statements for your business account(s).",
      "Details of any loans, assets you've bought, or money you've put into or taken out of the business.",
      "Your Unique Taxpayer Reference (UTR) and, if you're VAT-registered, your VAT registration number.",
    ],
    recordsHeading: "How long to keep your records",
    records:
      "Keep VAT records for at least 6 years. Sole traders keep business records for at least 5 years after the 31 January submission deadline of the relevant tax year. Limited companies keep records for at least 6 years from the end of the last company financial year they relate to (longer in some cases).",

    workingHeading: "Working together",
    working: [
      "Based in St Helens, working remotely with clients in Liverpool, Merseyside and across the UK.",
      "I work in English or Polish, whichever you prefer.",
      "We start with a free 15-minute introductory call to talk through your business.",
      "Fees are agreed with you after the free introductory call, based on what you need.",
    ],

    faqHeading: "Frequently asked questions",
    faqs: [
      {
        question: "Do I need a bookkeeper if I'm a sole trader?",
        answer:
          "Not legally. You do have to keep records that support your tax return. A bookkeeper keeps them accurate and up to date as you go, so your return is easier to prepare.",
      },
      {
        question: "When do I have to register for VAT?",
        answer:
          "When your total taxable turnover for the last 12 months goes over £90,000, or you expect it to go over £90,000 in the next 30 days alone.",
      },
      {
        question: "How often are VAT Returns due?",
        answer:
          "Usually every 3 months. The return and payment are both due one calendar month and 7 days after the end of the period.",
      },
      {
        question: "Is Making Tax Digital for VAT the same as MTD for Income Tax?",
        answer:
          "No. MTD for VAT covers VAT-registered businesses. MTD for Income Tax covers sole traders and landlords whose qualifying income is over the threshold, which has applied since 6 April 2026 to qualifying income over £50,000.",
      },
      {
        question: "Can you work with me if I'm not in St Helens or Liverpool?",
        answer:
          "Yes. I work remotely with all my clients, wherever they are in the UK.",
      },
      {
        question: "Can you help in Polish?",
        answer: "Yes. I work in English and Polish.",
      },
      {
        question: "My records are behind. Can you help?",
        answer:
          "Yes. I can bring your records up to date and then keep them current at whatever frequency suits you.",
      },
    ],

    disclaimer: (checkedOn) =>
      `This page gives general information, not tax advice. Rules and thresholds change, so check GOV.UK or ask for advice about your own situation. Figures checked on ${checkedOn}.`,
    sourcesHeading: "Sources (GOV.UK)",
    sources: [
      { label: "VAT registration: when to register", href: GOV_UK.vatRegistration },
      { label: "VAT Returns", href: GOV_UK.vatReturns },
      { label: "Penalty points and penalties for late VAT Returns", href: GOV_UK.vatPenalties },
      { label: "Keeping VAT records", href: GOV_UK.vatRecords },
      { label: "VAT Flat Rate Scheme", href: GOV_UK.flatRate },
      { label: "VAT Cash Accounting Scheme: eligibility", href: GOV_UK.cashAccounting },
      { label: "Check if you're eligible for Making Tax Digital for Income Tax", href: GOV_UK.mtdIncomeTax },
      { label: "Self-employed records: how long to keep them", href: GOV_UK.soleTraderRecords },
      { label: "Company and accounting records", href: GOV_UK.companyRecords },
    ],
  },

  pl: {
    title: "Księgowość i VAT w St Helens i Liverpoolu | Sabina Krajewska",
    description:
      "Księgowość, deklaracje VAT i Making Tax Digital for VAT dla samozatrudnionych i małych spółek z St Helens i Liverpoolu. Zdalnie w całej UK, po polsku.",
    ogTitle: "Księgowość i VAT po polsku | St Helens i Liverpool",
    ogDescription:
      "Księgowość, rejestracja do VAT i deklaracje VAT w ramach Making Tax Digital — zdalnie w całej Wielkiej Brytanii, po polsku lub po angielsku.",
    h1: "Księgowość i VAT dla małych firm w St Helens i Liverpoolu",
    lead: "Nazywam się Sabina Krajewska i jestem księgową z St Helens. Prowadzę dokładną i aktualną księgowość osób samozatrudnionych (sole traders) i małych spółek Ltd, rejestruję klientów do VAT oraz przygotowuję i składam deklaracje VAT (VAT Returns) przez oprogramowanie zgodne z Making Tax Digital. Pracuję zdalnie z klientami z St Helens, Liverpoolu, Merseyside i całej Wielkiej Brytanii, po polsku lub po angielsku.",
    heroImageAlt: "Biurko z dokumentami i laptopem",
    ctaBook: "Umów bezpłatną rozmowę",
    ctaContact: "Skontaktuj się",

    includesHeading: "Co obejmuje prowadzenie księgowości",
    includes: [
      "Księgowanie sprzedaży, zakupów i wydatków na podstawie Twoich faktur, paragonów i wyciągów bankowych.",
      "Uzgadnianie rachunków bankowych, tak aby księgi zgadzały się z rzeczywistymi operacjami.",
      "Prowadzenie dokumentacji w formie, na podstawie której można przygotować Twoje zeznanie Self Assessment (roczne rozliczenie podatkowe) lub sprawozdanie finansowe spółki.",
      "Księgowość z taką częstotliwością, jaka Ci odpowiada: co miesiąc, co kwartał lub według innego, uzgodnionego harmonogramu.",
      "Uzupełnienie zaległej dokumentacji, jeśli masz zaległości.",
      "Konfigurację programu księgowego, jeśli chcesz prowadzić dokumentację online.",
    ],

    vatHeading: "Rejestracja do VAT i deklaracje VAT",
    vatPoints: [
      {
        label: "Kiedy rejestracja jest obowiązkowa",
        text: "Musisz zarejestrować się do VAT, jeśli Twój łączny obrót podlegający opodatkowaniu VAT (taxable turnover) za ostatnie 12 miesięcy przekroczy £90 000 albo jeśli spodziewasz się, że w samych najbliższych 30 dniach przekroczy £90 000.",
      },
      {
        label: "Termin rejestracji",
        text: "W przypadku testu 12-miesięcznego musisz się zarejestrować w ciągu 30 dni od końca miesiąca, w którym przekroczono próg. Rejestracja obowiązuje od pierwszego dnia drugiego miesiąca po przekroczeniu progu.",
      },
      {
        label: "Jak często składa się deklaracje",
        text: "Większość firm składa deklarację VAT (VAT Return) co 3 miesiące. Deklarację trzeba złożyć, a należny podatek zapłacić, zwykle w ciągu jednego miesiąca kalendarzowego i 7 dni od końca okresu rozliczeniowego.",
      },
      {
        label: "Spóźnione deklaracje",
        text: "Za każdą spóźnioną deklarację VAT HMRC przyznaje punkt karny, także za deklarację zerową. Przy deklaracjach kwartalnych próg wynosi 4 punkty, a po jego osiągnięciu HMRC nalicza karę w wysokości £200.",
      },
    ],
    vatWhatIDo:
      "Co robię: mogę zarejestrować Cię do VAT, przygotować deklarację VAT na podstawie Twojej dokumentacji, sprawdzić ją razem z Tobą i złożyć ją przez oprogramowanie zgodne z Making Tax Digital.",
    vatSchemes:
      "HMRC prowadzi też uproszczone schematy VAT, m.in. Flat Rate Scheme (ryczałtowy schemat VAT, dla obrotu VAT do £150 000 bez VAT) oraz Cash Accounting Scheme (rozliczanie VAT metodą kasową, dla szacowanego obrotu podlegającego VAT do £1,35 mln w najbliższych 12 miesiącach). Mogę omówić z Tobą, czy któryś z nich pasuje do Twojej firmy.",

    mtdHeading: "Making Tax Digital: VAT i podatek dochodowy to dwa różne obowiązki",
    mtdParagraphs: [
      "Making Tax Digital (MTD, cyfrowy system rozliczeń z HMRC) for VAT dotyczy firm zarejestrowanych do VAT. Część dokumentacji VAT prowadzi się cyfrowo, a deklaracje VAT wysyła do HMRC przez kompatybilne oprogramowanie.",
      "MTD for Income Tax to osobny system dla osób samozatrudnionych i osób wynajmujących nieruchomości. Od 6 kwietnia 2026 obejmuje osoby, których dochód kwalifikowany (qualifying income) w roku podatkowym 2024/25 przekroczył £50 000. Od 6 kwietnia 2027 próg wynosi ponad £30 000 (dochód z roku 2025/26), a od 6 kwietnia 2028 ponad £20 000 (dochód z roku 2026/27).",
      "Możesz podlegać jednemu z tych systemów, obu albo żadnemu.",
    ],
    mtdMoreLink: "Więcej o Making Tax Digital for Income Tax",

    documentsHeading: "Jakie dokumenty będą mi potrzebne",
    documentsIntro: "Na początek zwykle poproszę o:",
    documents: [
      "Wystawione faktury sprzedaży oraz faktury zakupu lub paragony za to, co kupujesz.",
      "Wyciągi z firmowych rachunków bankowych i kart.",
      "Informacje o pożyczkach, zakupionych środkach trwałych oraz pieniądzach wpłaconych do firmy lub z niej wypłaconych.",
      "Twój Unique Taxpayer Reference (UTR, indywidualny numer podatnika), a jeśli jesteś zarejestrowany do VAT, także numer VAT.",
    ],
    recordsHeading: "Jak długo przechowywać dokumenty",
    records:
      "Dokumentację VAT przechowuj co najmniej 6 lat. Osoby samozatrudnione przechowują dokumenty firmowe co najmniej 5 lat od terminu złożenia zeznania (31 stycznia) za dany rok podatkowy. Spółki Ltd przechowują dokumenty co najmniej 6 lat od końca ostatniego roku obrotowego, którego dotyczą (w niektórych przypadkach dłużej).",

    workingHeading: "Jak wygląda współpraca",
    working: [
      "Mam siedzibę w St Helens i pracuję zdalnie z klientami z Liverpoolu, Merseyside i całej Wielkiej Brytanii.",
      "Pracuję po polsku lub po angielsku, jak Ci wygodniej.",
      "Zaczynamy od bezpłatnej, 15-minutowej rozmowy wstępnej o Twojej firmie.",
      "Wynagrodzenie ustalamy razem po bezpłatnej rozmowie wstępnej, w zależności od tego, czego potrzebujesz.",
    ],

    faqHeading: "Najczęściej zadawane pytania",
    faqs: [
      {
        question: "Czy jako samozatrudniony potrzebuję księgowej?",
        answer:
          "Prawo tego nie wymaga. Musisz jednak prowadzić dokumentację, która potwierdza dane w Twoim zeznaniu podatkowym. Księgowa dba o to, by była dokładna i aktualna na bieżąco, dzięki czemu łatwiej przygotować zeznanie.",
      },
      {
        question: "Kiedy muszę zarejestrować się do VAT?",
        answer:
          "Gdy Twój łączny obrót podlegający VAT za ostatnie 12 miesięcy przekroczy £90 000 albo gdy spodziewasz się, że w samych najbliższych 30 dniach przekroczy £90 000.",
      },
      {
        question: "Jak często składa się deklaracje VAT?",
        answer:
          "Zwykle co 3 miesiące. Termin złożenia deklaracji i zapłaty to jeden miesiąc kalendarzowy i 7 dni od końca okresu rozliczeniowego.",
      },
      {
        question: "Czy Making Tax Digital for VAT to to samo co MTD for Income Tax?",
        answer:
          "Nie. MTD for VAT dotyczy firm zarejestrowanych do VAT. MTD for Income Tax dotyczy osób samozatrudnionych i wynajmujących nieruchomości, których dochód kwalifikowany przekracza próg — od 6 kwietnia 2026 jest to ponad £50 000.",
      },
      {
        question: "Czy możemy współpracować, jeśli nie mieszkam w St Helens ani w Liverpoolu?",
        answer:
          "Tak. Ze wszystkimi klientami pracuję zdalnie, niezależnie od tego, gdzie w Wielkiej Brytanii mieszkają.",
      },
      {
        question: "Czy mogę załatwić wszystko po polsku?",
        answer: "Tak. Pracuję po polsku i po angielsku.",
      },
      {
        question: "Mam zaległości w dokumentacji. Czy możesz pomóc?",
        answer:
          "Tak. Mogę uzupełnić zaległą dokumentację, a potem prowadzić ją na bieżąco z taką częstotliwością, jaka Ci odpowiada.",
      },
    ],

    disclaimer: (checkedOn) =>
      `Ta strona zawiera informacje ogólne i nie stanowi porady podatkowej. Przepisy i progi się zmieniają, dlatego sprawdź GOV.UK lub zasięgnij porady dotyczącej Twojej sytuacji. Dane sprawdzone ${checkedOn}`,
    sourcesHeading: "Źródła (GOV.UK, w języku angielskim)",
    sources: [
      { label: "Rejestracja do VAT: kiedy się zarejestrować", href: GOV_UK.vatRegistration },
      { label: "Deklaracje VAT (VAT Returns)", href: GOV_UK.vatReturns },
      { label: "Punkty karne i kary za spóźnione deklaracje VAT", href: GOV_UK.vatPenalties },
      { label: "Prowadzenie dokumentacji VAT", href: GOV_UK.vatRecords },
      { label: "VAT Flat Rate Scheme", href: GOV_UK.flatRate },
      { label: "VAT Cash Accounting Scheme: kto może skorzystać", href: GOV_UK.cashAccounting },
      { label: "Kogo obejmuje Making Tax Digital for Income Tax", href: GOV_UK.mtdIncomeTax },
      { label: "Dokumentacja samozatrudnionych: jak długo ją przechowywać", href: GOV_UK.soleTraderRecords },
      { label: "Dokumentacja spółki i księgi rachunkowe", href: GOV_UK.companyRecords },
    ],
  },
};
