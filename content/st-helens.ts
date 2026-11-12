import type { Locale } from "@/content/copy";
import type { RouteKey } from "@/lib/routes";

/**
 * Copy for the St Helens local page pair (SEO task T2.3):
 * EN /bookkeeping-st-helens and PL /pl/ksiegowa-st-helens.
 *
 * Rules (owner-confirmed, 11 Nov 2026): remote-only service, no face-to-face
 * meetings, no premises, no street address or map. Visible location at most
 * "St Helens, WA9". No prices, figures, client numbers, years or reviews.
 * Services listed here are only the owner-confirmed ones. No tax figures.
 * The Polish copy is held for Sabina's review (T4.3).
 */

export interface StHelensCopy {
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
  localHeading: string;
  localParagraphs: string[];
  whoHeading: string;
  who: { title: string; text: string }[];
  servicesHeading: string;
  services: string[];
  linksHeading: string;
  /** Link text per service page; a link only renders once that page is published. */
  serviceLinks: Partial<Record<RouteKey, string>>;
  bookingHeading: string;
  bookingSteps: { title: string; text: string }[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  disclaimer: string;
}

export const stHelensCopy: Record<Locale, StHelensCopy> = {
  en: {
    title: "Bookkeeper & Accountant in St Helens (WA9) | Sabina Krajewska",
    description:
      "Bookkeeping, VAT, payroll and Self Assessment from a bookkeeper based in St Helens, WA9. Remote by phone, video and email, in English or Polish.",
    ogTitle: "Bookkeeping in St Helens, WA9 | Sabina Krajewska",
    ogDescription:
      "A bookkeeper based in St Helens, working remotely by phone, video and email with sole traders, landlords and small companies, in English or Polish.",
    h1: "Bookkeeping and accounts in St Helens",
    lead: "I'm Sabina Krajewska, a bookkeeper and accountant based in St Helens, WA9. I work remotely, by phone, video call and email, with sole traders, landlords and small limited companies in St Helens and nearby, in English or Polish.",
    portraitAlt: "Sabina Krajewska, bookkeeper and accountant based in St Helens",
    ctaBook: "Book a free introductory call",
    ctaContact: "Send a message",
    ctaCall: "Call",
    localHeading: "Based in St Helens, working remotely",
    localParagraphs: [
      "My business is based in St Helens, WA9. I don't hold face-to-face meetings: everything is done by phone, video call and email, so you never need to travel or take time out to drop off paperwork.",
      "Being local is about knowing the area and sharing your time zone. You deal directly with one person, based here in St Helens.",
      "Because the work is remote, I work the same way with clients in Liverpool and elsewhere in the UK.",
    ],
    whoHeading: "Who I help in St Helens",
    who: [
      {
        title: "Sole traders and the self-employed",
        text: "Bookkeeping, Self Assessment tax returns, catching up on late records, and Construction Industry Scheme (CIS) paperwork if you work in construction.",
      },
      {
        title: "Landlords",
        text: "Keeping records of rental income and expenses, and including them in your Self Assessment tax return.",
      },
      {
        title: "Small limited companies",
        text: "Bookkeeping, VAT, payroll and company tax planning, plus help setting up a new company.",
      },
      {
        title: "Polish-speaking business owners",
        text: "Everything on this page in Polish, including explaining and replying to letters from HMRC.",
      },
    ],
    servicesHeading: "What I can do for you",
    services: [
      "Bookkeeping weekly, monthly, quarterly or as often as you need",
      "Catching up on late or missing records",
      "VAT registration, VAT Returns submitted through Making Tax Digital software, and advice on VAT schemes",
      "Setting up bookkeeping software",
      "Payroll",
      "Construction Industry Scheme (CIS)",
      "Company formation and company tax planning",
      "Self Assessment tax returns",
      "Dealing with HMRC letters and correspondence",
    ],
    linksHeading: "More about these services",
    serviceLinks: {
      selfAssessment: "Self Assessment tax returns",
      bookkeeping: "Bookkeeping and VAT",
      mtdIncomeTax: "Making Tax Digital for Income Tax",
      limitedCompany: "Limited company accounts",
      payroll: "Payroll",
      hmrcSupport: "HMRC support",
    },
    bookingHeading: "How to book",
    bookingSteps: [
      {
        title: "Book a free call or get in touch",
        text: "Book a free 15-minute introductory call online, send a message, or phone me.",
      },
      {
        title: "Talk through what you need",
        text: "On the call we go through your business and the help you're looking for. Fees are agreed after the free introductory call, once I know what the work involves.",
      },
      {
        title: "Work together remotely",
        text: "You send records and documents electronically, and we keep in touch by phone, video call and email.",
      },
    ],
    faqHeading: "Questions about working with me",
    faqs: [
      {
        question: "Can we meet in person in St Helens?",
        answer:
          "No. I work remotely only and don't hold face-to-face meetings. Everything is done by phone, video call and email.",
      },
      {
        question: "Do you only work with businesses in St Helens?",
        answer:
          "No. I'm based in St Helens, but because I work remotely I also work with clients in Liverpool and across the UK.",
      },
      {
        question: "Can we work in Polish?",
        answer:
          "Yes. I offer all my services in English or Polish, whichever you prefer.",
      },
      {
        question: "How much do you charge?",
        answer:
          "Fees are agreed after the free introductory call and depend on the work you need. I don't publish prices on this site.",
      },
    ],
    disclaimer:
      "This page describes my services. It is general information, not tax advice.",
  },
  pl: {
    title: "Polska księgowa w St Helens (WA9) | Sabina Krajewska",
    description:
      "Księgowość, VAT, payroll i Self Assessment — księgowa z St Helens, WA9. Pracuję zdalnie: telefon, wideorozmowy i e-mail, po polsku lub angielsku.",
    ogTitle: "Polska księgowa w St Helens, WA9 | Sabina Krajewska",
    ogDescription:
      "Księgowa z St Helens, pracująca zdalnie — przez telefon, wideorozmowy i e-mail — z osobami samozatrudnionymi, wynajmującymi i małymi spółkami, po polsku lub angielsku.",
    h1: "Księgowa w St Helens — po polsku i po angielsku",
    lead: "Nazywam się Sabina Krajewska i jestem księgową działającą w St Helens, WA9. Pracuję zdalnie — przez telefon, wideorozmowy i e-mail — z osobami samozatrudnionymi, wynajmującymi nieruchomości i małymi spółkami Ltd z St Helens i okolic, po polsku lub po angielsku.",
    portraitAlt: "Sabina Krajewska, polska księgowa działająca w St Helens",
    ctaBook: "Umów bezpłatną rozmowę wstępną",
    ctaContact: "Napisz do mnie",
    ctaCall: "Zadzwoń:",
    localHeading: "Działam w St Helens, pracuję zdalnie",
    localParagraphs: [
      "Moja firma działa w St Helens, WA9, ale nie prowadzę spotkań osobistych — wszystko załatwiamy przez telefon, wideorozmowy i e-mail, więc nie musisz nigdzie dojeżdżać ani tracić czasu na dostarczanie dokumentów.",
      "Lokalność oznacza tu znajomość okolicy i tę samą strefę czasową. Współpracujesz bezpośrednio z jedną osobą, która jest stąd, z St Helens.",
      "Ponieważ pracuję zdalnie, w ten sam sposób współpracuję z klientami z Liverpoolu i z innych części Wielkiej Brytanii.",
    ],
    whoHeading: "Komu pomagam w St Helens",
    who: [
      {
        title: "Osoby samozatrudnione (sole traders)",
        text: "Bieżąca księgowość, rozliczenie Self Assessment, uporządkowanie zaległej dokumentacji oraz rozliczenia w systemie CIS, jeśli pracujesz w budownictwie.",
      },
      {
        title: "Wynajmujący nieruchomości",
        text: "Ewidencja przychodów i kosztów z najmu oraz ich uwzględnienie w rozliczeniu Self Assessment.",
      },
      {
        title: "Małe spółki Ltd",
        text: "Księgowość, VAT, payroll i planowanie podatkowe spółki, a także pomoc w założeniu nowej spółki.",
      },
      {
        title: "Polskojęzyczni przedsiębiorcy",
        text: "Wszystko, co opisuję na tej stronie, po polsku — w tym wyjaśnianie pism z HMRC i odpowiadanie na nie.",
      },
    ],
    servicesHeading: "W czym mogę pomóc",
    services: [
      "Prowadzenie księgowości co tydzień, co miesiąc, co kwartał lub tak często, jak potrzebujesz",
      "Uzupełnianie zaległej lub brakującej dokumentacji",
      "Rejestracja do VAT, deklaracje VAT (VAT Returns) składane przez oprogramowanie zgodne z Making Tax Digital oraz doradztwo w wyborze schematu VAT",
      "Konfiguracja oprogramowania księgowego",
      "Payroll (obsługa wynagrodzeń)",
      "Rozliczenia w systemie CIS (Construction Industry Scheme)",
      "Zakładanie spółek i planowanie podatkowe spółki",
      "Rozliczenia Self Assessment",
      "Korespondencja z HMRC",
    ],
    linksHeading: "Więcej o tych usługach",
    serviceLinks: {
      selfAssessment: "Rozliczenie Self Assessment",
      bookkeeping: "Księgowość i VAT",
      mtdIncomeTax: "Making Tax Digital dla podatku dochodowego",
      limitedCompany: "Spółki Ltd",
      payroll: "Payroll",
      hmrcSupport: "Pomoc z HMRC",
    },
    bookingHeading: "Jak się umówić",
    bookingSteps: [
      {
        title: "Umów rozmowę lub napisz",
        text: "Umów online bezpłatną, 15-minutową rozmowę wstępną, napisz wiadomość albo zadzwoń.",
      },
      {
        title: "Omawiamy, czego potrzebujesz",
        text: "Podczas rozmowy omawiamy Twoją działalność i to, w czym mogę pomóc. Opłaty ustalamy po bezpłatnej rozmowie wstępnej, kiedy znam już zakres pracy.",
      },
      {
        title: "Współpracujemy zdalnie",
        text: "Dokumenty przesyłasz elektronicznie, a kontaktujemy się przez telefon, wideorozmowy i e-mail.",
      },
    ],
    faqHeading: "Pytania o współpracę",
    faqs: [
      {
        question: "Czy możemy spotkać się osobiście w St Helens?",
        answer:
          "Nie. Pracuję wyłącznie zdalnie i nie prowadzę spotkań osobistych. Wszystko załatwiamy przez telefon, wideorozmowy i e-mail.",
      },
      {
        question: "Czy współpracujesz tylko z firmami z St Helens?",
        answer:
          "Nie. Działam w St Helens, ale ponieważ pracuję zdalnie, współpracuję też z klientami z Liverpoolu i z całej Wielkiej Brytanii.",
      },
      {
        question: "Czy możemy rozmawiać po polsku?",
        answer:
          "Tak. Wszystkie usługi oferuję po polsku lub po angielsku — w języku, który Ci bardziej odpowiada.",
      },
      {
        question: "Ile to kosztuje?",
        answer:
          "Opłaty ustalamy po bezpłatnej rozmowie wstępnej, w zależności od zakresu pracy. Nie publikuję cen na stronie.",
      },
    ],
    disclaimer:
      "Ta strona opisuje moje usługi. Zawiera informacje ogólne i nie stanowi porady podatkowej.",
  },
};
