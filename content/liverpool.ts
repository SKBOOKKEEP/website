import type { Locale } from "@/content/copy";
import type { RouteKey } from "@/lib/routes";

/**
 * Copy for the Liverpool page pair (SEO task T2.4):
 * EN /bookkeeping-liverpool and PL /pl/ksiegowa-liverpool.
 *
 * The practice is based in St Helens, WA9 and serves Liverpool and
 * Merseyside remotely. This page must never imply a Liverpool office or
 * premises. Owner-confirmed rules (11 Nov 2026): remote only, no
 * face-to-face meetings, no street address or map, no prices, figures,
 * client names, local areas, years, reviews or rankings. Services are the
 * owner-confirmed list only.
 *
 * The one legal fact on the page (anti-money-laundering supervision) is
 * cited to GOV.UK, checked 12 Nov 2026. The "HMRC-supervised" statement
 * repeats the trust line already shown on the site (content/copy.ts).
 * The Polish copy is held for Sabina's review (T4.3).
 */

export const AML_SOURCE_URL =
  "https://www.gov.uk/guidance/money-laundering-regulations-who-needs-to-register";

export interface LiverpoolCopy {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  h1: string;
  lead: string;
  portraitAlt: string;
  ctaBook: string;
  ctaContact: string;
  ctaCall: string;
  whereHeading: string;
  whereParagraphs: string[];
  remoteHeading: string;
  remote: { title: string; text: string }[];
  roleHeading: string;
  roleIntro: string;
  roles: { title: string; text: string }[];
  coverHeading: string;
  cover: string[];
  linksHeading: string;
  /** Link text per page; a link only renders once that route is published. */
  links: Partial<Record<RouteKey, string>>;
  checklistHeading: string;
  checklistIntro: string;
  checklist: { question: string; answer: string; source?: string }[];
  sourceLabel: string;
  prepareHeading: string;
  prepareIntro: string;
  prepare: string[];
  polishHeading: string;
  polishParagraphs: string[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  disclaimer: string;
}

export const liverpoolCopy: Record<Locale, LiverpoolCopy> = {
  en: {
    title: "Bookkeeper for Liverpool & Merseyside | Sabina Krajewska",
    description:
      "Looking for a bookkeeper in Liverpool? I'm based in St Helens and work remotely with Liverpool and Merseyside businesses, in English or Polish.",
    ogTitle: "Bookkeeping for Liverpool businesses, from St Helens",
    ogDescription:
      "A St Helens-based bookkeeper working remotely with small businesses across Liverpool and Merseyside: bookkeeping, VAT, payroll and Self Assessment.",
    h1: "Looking for a bookkeeper in Liverpool?",
    lead: "I'm Sabina Krajewska. I'm based in St Helens, not in Liverpool itself, and I work with Liverpool and Merseyside businesses remotely, by phone, video call and email, in English or Polish.",
    portraitAlt:
      "Sabina Krajewska, bookkeeper based in St Helens working with Liverpool businesses",
    ctaBook: "Book a free introductory call",
    ctaContact: "Send a message",
    ctaCall: "Call",
    whereHeading: "Where I'm based, and how I work with Liverpool clients",
    whereParagraphs: [
      "To be clear from the start: my practice is based in St Helens, WA9. I don't have premises in Liverpool and I don't hold face-to-face meetings anywhere.",
      "That doesn't stop me working with businesses in Liverpool and across Merseyside. All of my work is done remotely, so where you are makes no difference to the service you get.",
    ],
    remoteHeading: "Why remote bookkeeping suits a Liverpool business",
    remote: [
      {
        title: "No travelling or parking",
        text: "You don't lose part of your working day getting to an appointment. We talk by phone or video call from wherever you are.",
      },
      {
        title: "Records sent digitally",
        text: "Receipts, invoices and bank statements can be sent electronically, so there are no carrier bags of paperwork to hand over.",
      },
      {
        title: "Calls at an agreed time",
        text: "We arrange calls at a time that suits us both, with no journey to fit around them.",
      },
      {
        title: "One person, start to finish",
        text: "You deal with me directly, the same person each time, so you don't have to explain your business again.",
      },
    ],
    roleHeading: "Bookkeeper or accountant: which do you need?",
    roleIntro:
      "People often search for one when they need the other. In general terms the two roles overlap but are not the same:",
    roles: [
      {
        title: "A bookkeeper",
        text: "keeps your day-to-day financial records accurate and up to date: sales, purchases, expenses and bank transactions. Good records are what everything else is built on.",
      },
      {
        title: "An accountant",
        text: "uses those records for returns, tax planning and dealing with HMRC, and helps you make decisions about the business.",
      },
    ],
    coverHeading: "What I can do for a Liverpool or Merseyside business",
    cover: [
      "Bookkeeping weekly, monthly, quarterly or as often as you need",
      "Catching up on late or missing records",
      "VAT registration, VAT Returns submitted using Making Tax Digital software, and advice on VAT schemes",
      "Setting up bookkeeping software",
      "Payroll",
      "Construction Industry Scheme (CIS)",
      "Company formation and company tax planning",
      "Self Assessment tax returns",
      "Dealing with HMRC letters and correspondence",
    ],
    linksHeading: "Related pages",
    links: {
      selfAssessment: "Self Assessment tax returns",
      bookkeeping: "Bookkeeping and VAT",
      mtdIncomeTax: "Making Tax Digital for Income Tax",
      limitedCompany: "Limited company accounts",
      payroll: "Payroll",
      hmrcSupport: "HMRC support",
      stHelens: "Bookkeeping in St Helens",
    },
    checklistHeading: "Choosing a bookkeeper in Liverpool: questions worth asking",
    checklistIntro:
      "Whoever you choose, these questions help you compare like with like. Here are my own answers.",
    checklist: [
      {
        question: "Are you supervised for anti-money laundering?",
        answer:
          "Businesses providing accountancy services must be supervised for anti-money laundering, either by a professional body or by HMRC. It's a legal requirement, not a mark of quality, but it's a fair thing to check. I'm supervised by HMRC.",
        source: AML_SOURCE_URL,
      },
      {
        question: "Where are you based, and will we meet?",
        answer:
          "I'm based in St Helens and work remotely only, by phone, video call and email. There are no face-to-face meetings.",
      },
      {
        question: "Who will I be dealing with?",
        answer: "You deal with me directly.",
      },
      {
        question: "How will I send you my records?",
        answer:
          "Electronically. If you don't use bookkeeping software yet, I can help you set it up.",
      },
      {
        question: "How are your fees set?",
        answer:
          "Fees are agreed after the free introductory call, once we both know what the work involves. I don't publish prices.",
      },
      {
        question: "Can we work in Polish?",
        answer: "Yes. Everything can be done in English or Polish.",
      },
    ],
    sourceLabel: "Source: GOV.UK",
    prepareHeading: "What to have ready for the first call",
    prepareIntro:
      "The introductory call is free and short. It helps if you can tell me:",
    prepare: [
      "How your business is set up: sole trader, partnership or limited company",
      "How you keep records now, whether that's software, spreadsheets or a box of receipts",
      "Whether you're registered for VAT or think you might need to be",
      "Whether you have staff or work in construction",
      "Any letters from HMRC or deadlines you're worried about",
      "What you'd like help with, and how often",
    ],
    polishHeading: "Polish-speaking business owners in Liverpool and Merseyside",
    polishParagraphs: [
      "If Polish is your first language, you can work with me entirely in Polish: the first call, your questions about HMRC letters and the regular work on your books.",
      "This page is also available in Polish, if someone in your business would rather read it in Polish.",
    ],
    faqHeading: "Questions from Liverpool businesses",
    faqs: [
      {
        question: "Can we meet in Liverpool?",
        answer:
          "No. I'm based in St Helens and work remotely only, so you never need to travel to see me.",
      },
      {
        question: "Do you work with businesses elsewhere in Merseyside?",
        answer:
          "Yes. Because the work is remote, I work with businesses across Merseyside and elsewhere in the UK in the same way.",
      },
      {
        question: "My records are behind. Can you still help?",
        answer:
          "Yes. Catching up on late or missing records is part of what I do. Tell me where things stand on the introductory call.",
      },
      {
        question: "Can you help me with HMRC?",
        answer:
          "I can help with HMRC letters and correspondence, and explain what they mean in plain English or Polish.",
      },
    ],
    disclaimer:
      "This page describes my services. It is general information, not tax advice.",
  },
  pl: {
    title: "Polska księgowa — Liverpool i Merseyside | Sabina Krajewska",
    description:
      "Szukasz księgowej w Liverpoolu? Działam w St Helens i zdalnie współpracuję z firmami z Liverpoolu i Merseyside — po polsku lub po angielsku.",
    ogTitle: "Księgowość dla firm z Liverpoolu — zdalnie z St Helens",
    ogDescription:
      "Księgowa działająca w St Helens, która zdalnie współpracuje z małymi firmami z Liverpoolu i Merseyside: księgowość, VAT, payroll i Self Assessment.",
    h1: "Szukasz księgowej w Liverpoolu?",
    lead: "Nazywam się Sabina Krajewska. Działam w St Helens, a nie w samym Liverpoolu, i współpracuję z firmami z Liverpoolu i Merseyside zdalnie — przez telefon, wideorozmowy i e-mail, po polsku lub po angielsku.",
    portraitAlt:
      "Sabina Krajewska, księgowa działająca w St Helens, współpracująca z firmami z Liverpoolu",
    ctaBook: "Umów bezpłatną rozmowę wstępną",
    ctaContact: "Napisz do mnie",
    ctaCall: "Zadzwoń:",
    whereHeading: "Gdzie działam i jak współpracuję z klientami z Liverpoolu",
    whereParagraphs: [
      "Od razu wyjaśniam: działam w St Helens, WA9. Nie przyjmuję klientów stacjonarnie w Liverpoolu i nigdzie nie prowadzę spotkań osobistych.",
      "Nie przeszkadza mi to w pracy z firmami z Liverpoolu i całego Merseyside. Całą pracę wykonuję zdalnie, więc to, gdzie jesteś, nie ma wpływu na jakość obsługi.",
    ],
    remoteHeading: "Dlaczego księgowość zdalna sprawdza się w Liverpoolu",
    remote: [
      {
        title: "Bez dojazdów i szukania parkingu",
        text: "Nie tracisz części dnia pracy na dojazd na spotkanie. Rozmawiamy przez telefon lub wideorozmowę, gdziekolwiek jesteś.",
      },
      {
        title: "Dokumenty w formie elektronicznej",
        text: "Paragony, faktury i wyciągi bankowe możesz przesłać elektronicznie — bez przekazywania toreb pełnych papierów.",
      },
      {
        title: "Rozmowy w uzgodnionym terminie",
        text: "Umawiamy rozmowy w terminie dogodnym dla obu stron, bez dojazdu, który trzeba by uwzględnić.",
      },
      {
        title: "Jedna osoba od początku do końca",
        text: "Kontaktujesz się bezpośrednio ze mną, za każdym razem z tą samą osobą, więc nie musisz od nowa tłumaczyć, czym zajmuje się Twoja firma.",
      },
    ],
    roleHeading: "Bookkeeper czy accountant — kogo potrzebujesz?",
    roleIntro:
      "Często szuka się jednego, a potrzebuje drugiego. Ogólnie rzecz biorąc, te role się przenikają, ale nie są tym samym:",
    roles: [
      {
        title: "Bookkeeper",
        text: "prowadzi bieżącą ewidencję finansową firmy i dba o jej poprawność: sprzedaż, zakupy, wydatki i operacje bankowe. Na rzetelnej ewidencji opiera się cała reszta.",
      },
      {
        title: "Accountant",
        text: "wykorzystuje tę ewidencję do rozliczeń, planowania podatkowego i kontaktów z HMRC oraz pomaga podejmować decyzje dotyczące firmy.",
      },
    ],
    coverHeading: "W czym mogę pomóc firmie z Liverpoolu lub Merseyside",
    cover: [
      "Prowadzenie księgowości co tydzień, co miesiąc, co kwartał lub tak często, jak potrzebujesz",
      "Uzupełnianie zaległej lub brakującej dokumentacji",
      "Rejestracja do VAT, deklaracje VAT (VAT Returns) składane za pomocą oprogramowania zgodnego z Making Tax Digital oraz doradztwo w wyborze schematu VAT",
      "Konfiguracja oprogramowania księgowego",
      "Payroll (obsługa wynagrodzeń)",
      "Rozliczenia w systemie CIS (Construction Industry Scheme)",
      "Zakładanie spółek i planowanie podatkowe spółki",
      "Rozliczenia Self Assessment",
      "Korespondencja z HMRC",
    ],
    linksHeading: "Powiązane strony",
    links: {
      selfAssessment: "Rozliczenie Self Assessment",
      bookkeeping: "Księgowość i VAT",
      mtdIncomeTax: "Making Tax Digital dla podatku dochodowego",
      limitedCompany: "Spółki Ltd",
      payroll: "Payroll",
      hmrcSupport: "Pomoc z HMRC",
      stHelens: "Księgowa w St Helens",
    },
    checklistHeading: "Jak wybrać księgową w Liverpoolu — pytania, które warto zadać",
    checklistIntro:
      "Niezależnie od tego, kogo wybierzesz, te pytania pomogą Ci porównać oferty. Poniżej moje odpowiedzi.",
    checklist: [
      {
        question: "Czy podlegasz nadzorowi w zakresie przeciwdziałania praniu pieniędzy?",
        answer:
          "Firmy świadczące usługi księgowe muszą podlegać nadzorowi w zakresie przeciwdziałania praniu pieniędzy — organizacji zawodowej albo HMRC. To wymóg prawny, a nie znak jakości, ale warto to sprawdzić. Ja podlegam nadzorowi HMRC.",
        source: AML_SOURCE_URL,
      },
      {
        question: "Gdzie działasz i czy się spotkamy?",
        answer:
          "Działam w St Helens i pracuję wyłącznie zdalnie — przez telefon, wideorozmowy i e-mail. Nie prowadzę spotkań osobistych.",
      },
      {
        question: "Z kim będę się kontaktować?",
        answer: "Kontaktujesz się bezpośrednio ze mną.",
      },
      {
        question: "Jak mam przekazywać dokumenty?",
        answer:
          "Elektronicznie. Jeśli nie korzystasz jeszcze z oprogramowania księgowego, pomogę Ci je skonfigurować.",
      },
      {
        question: "Jak ustalasz opłaty?",
        answer:
          "Opłaty ustalamy po bezpłatnej rozmowie wstępnej, kiedy znamy już zakres pracy. Nie publikuję cen.",
      },
      {
        question: "Czy możemy rozmawiać po polsku?",
        answer: "Tak. Wszystko możemy załatwić po polsku lub po angielsku.",
      },
    ],
    sourceLabel: "Źródło: GOV.UK (po angielsku)",
    prepareHeading: "Co przygotować na pierwszą rozmowę",
    prepareIntro:
      "Rozmowa wstępna jest bezpłatna i krótka. Przyda się, jeśli powiesz mi:",
    prepare: [
      "Jaką formę ma Twoja działalność: sole trader, partnership czy spółka Ltd",
      "Jak obecnie prowadzisz ewidencję — w programie, w arkuszu kalkulacyjnym czy w pudełku z paragonami",
      "Czy masz rejestrację do VAT albo czy może być potrzebna",
      "Czy zatrudniasz pracowników lub pracujesz w budownictwie",
      "Czy masz pisma z HMRC albo terminy, które Cię niepokoją",
      "W czym potrzebujesz pomocy i jak często",
    ],
    polishHeading: "Polskojęzyczni przedsiębiorcy w Liverpoolu i Merseyside",
    polishParagraphs: [
      "Jeśli polski jest Twoim pierwszym językiem, całą współpracę możemy prowadzić po polsku: pierwszą rozmowę, pytania o pisma z HMRC i bieżącą księgowość.",
      "Ta strona jest dostępna także po angielsku, jeśli ktoś w Twojej firmie woli czytać po angielsku.",
    ],
    faqHeading: "Pytania od firm z Liverpoolu",
    faqs: [
      {
        question: "Czy możemy spotkać się w Liverpoolu?",
        answer:
          "Nie. Działam w St Helens i pracuję wyłącznie zdalnie, więc nie musisz nigdzie dojeżdżać.",
      },
      {
        question: "Czy współpracujesz z firmami z innych części Merseyside?",
        answer:
          "Tak. Ponieważ pracuję zdalnie, w ten sam sposób współpracuję z firmami z całego Merseyside i z innych części Wielkiej Brytanii.",
      },
      {
        question: "Mam zaległości w dokumentach. Czy nadal możesz pomóc?",
        answer:
          "Tak. Uzupełnianie zaległej lub brakującej dokumentacji to część mojej pracy. Opowiedz mi o swojej sytuacji podczas rozmowy wstępnej.",
      },
      {
        question: "Czy pomożesz mi w sprawach z HMRC?",
        answer:
          "Pomagam w korespondencji z HMRC i wyjaśniam prostym językiem, po angielsku lub po polsku, czego dotyczą pisma.",
      },
    ],
    disclaimer:
      "Ta strona opisuje moje usługi. Zawiera informacje ogólne i nie stanowi porady podatkowej.",
  },
};
