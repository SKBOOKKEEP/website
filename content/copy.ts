export type Locale = "en" | "pl";

export type ServiceIcon = "bookOpen" | "user" | "building" | "bank";

export interface Content {
  nav: {
    brand: string;
    brandSub: string;
    homeAriaLabel: string;
    mainNavAriaLabel: string;
    links: { href: string; label: string }[];
    bookCta: string;
    openMenu: string;
    closeMenu: string;
    langSwitchAriaLabel: string;
  };
  hero: {
    ariaLabel: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    imageAlt: string;
    heading: string;
    paragraphs: string[];
    quote: string;
  };
  services: {
    heading: string;
    items: { icon: ServiceIcon; title: string; description: string }[];
  };
  booking: {
    heading: string;
    description: string;
    featuresAriaLabel: string;
    features: string[];
  };
  contact: {
    heading: string;
    subtitle: string;
    successTitle: string;
    successMessage: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phoneOptional: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    errorMessage: string;
    submit: string;
    submitting: string;
    orReachDirectly: string;
    phoneTitle: string;
    tapToCall: string;
    emailTitle: string;
    tapToCompose: string;
    copyPhoneAria: string;
    copyEmailAria: string;
  };
  footer: {
    name: string;
    copyright: string; // contains {year} placeholder
    navAriaLabel: string;
    hmrcLink: string;
    facebookLink: string;
  };
}

export const en: Content = {
  nav: {
    brand: "Simple Bookkeeping",
    brandSub: "Sabina Krajewska",
    homeAriaLabel: "Sabina Krajewska — home",
    mainNavAriaLabel: "Main navigation",
    links: [
      { href: "#", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#contact", label: "Contact" },
    ],
    bookCta: "Book Consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langSwitchAriaLabel: "Language",
  },
  hero: {
    ariaLabel: "Introduction",
    imageAlt: "Professional office workspace",
    title: "Professional Accounting Support Across the UK",
    subtitle:
      "Reliable accounting support designed to bring clarity, confidence, and peace of mind to your business.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "Our Services",
  },
  about: {
    imageAlt:
      "Sabina Krajewska — professional accountant and bookkeeper in Liverpool",
    heading: "Professional Accounting with a Personal Approach",
    paragraphs: [
      "My name is Sabina Krajewska, and I am an Polish accountant working with clients across the United Kingdom. Based in St. Helens and working remotely, I provide professional and reliable accounting support to businesses nationwide.",
      "I help business owners keep their finances organised, compliant, and stress-free through a service tailored to the individual needs of each client. With a strong understanding of the UK financial system, I combine accuracy and professionalism with a personal and approachable way of working.",
      "I understand that behind every business there is a person, which is why I value relationships built on trust, understanding, and clear communication. For me, accounting is about more than numbers- it is about providing long-term support that helps my clients feel confident in their business decisions.",
      "My priority is to ensure your accounting is managed carefully and efficiently, giving you more time to focus on growing your business with confidence and peace of mind.",
    ],
    quote:
      "“I believe that well-managed accounting brings not only financial clarity, but also confidence and peace of mind in running a business.”",
  },
  services: {
    heading: "Accounting Services Designed Around Your Business",
    items: [
      {
        icon: "bookOpen",
        title: "Bookkeeping",
        description:
          "Keeping your financial records accurate, organised, and up to date.",
      },
      {
        icon: "user",
        title: "Sole Trader & Freelancer Support",
        description:
          "Self Assessment tax return services for self-employed individuals and private clients.",
      },
      {
        icon: "building",
        title: "Limited Company Services",
        description:
          "Professional support for limited companies, including accounts, payroll, tax returns, and ongoing compliance.",
      },
      {
        icon: "bank",
        title: "Tax & HMRC Assistance",
        description:
          "Support with HMRC communication, tax matters, and representation in more complex financial cases.",
      },
    ],
  },
  booking: {
    heading: "Schedule a Consultation",
    description:
      "Ready to streamline your finances? Book a free 15-minute introductory call to discuss your business requirements and how we can assist you.",
    featuresAriaLabel: "What's included",
    features: [
      "Professional financial assessment",
      "HMRC compliance review",
      "Bespoke bookkeeping plan",
    ],
  },
  contact: {
    heading: "Get in Touch",
    subtitle:
      "Have a general inquiry? Fill out the form below and I'll get back to you within 24 hours.",
    successTitle: "Thank you!",
    successMessage:
      "Your message has been received. I'll be in touch within 24 hours.",
    nameLabel: "Full Name",
    namePlaceholder: "John Smith",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    phoneLabel: "Phone Number",
    phoneOptional: "(optional)",
    phonePlaceholder: "+44 0000 000000",
    messageLabel: "Message",
    messagePlaceholder: "How can I help your business?",
    errorMessage:
      "Something went wrong. Please try again or email me directly.",
    submit: "Send Inquiry",
    submitting: "Sending…",
    orReachDirectly: "Or reach me directly",
    phoneTitle: "Phone",
    tapToCall: "Tap to call",
    emailTitle: "Email",
    tapToCompose: "Tap to compose",
    copyPhoneAria: "Copy phone number",
    copyEmailAria: "Copy email address",
  },
  footer: {
    name: "Sabina Krajewska",
    copyright:
      "© {year} Sabina Krajewska Bookkeeping. Professional financial precision in Liverpool.",
    navAriaLabel: "Footer navigation",
    hmrcLink: "HMRC Guidance",
    facebookLink: "Facebook",
  },
};

export const pl: Content = {
  nav: {
    brand: "Simple Bookkeeping",
    brandSub: "Sabina Krajewska",
    homeAriaLabel: "Sabina Krajewska — strona główna",
    mainNavAriaLabel: "Nawigacja główna",
    links: [
      { href: "#", label: "Start" },
      { href: "#about", label: "O mnie" },
      { href: "#services", label: "Usługi" },
      { href: "#contact", label: "Kontakt" },
    ],
    bookCta: "Umów konsultację",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    langSwitchAriaLabel: "Wybór języka",
  },
  hero: {
    ariaLabel: "Wprowadzenie",
    imageAlt: "Profesjonalne biuro",
    title: "Profesjonalna księgowość dla Polaków w UK",
    subtitle:
      "Rzetelne wsparcie księgowe po polsku — jasność, pewność i spokój w prowadzeniu Twojego biznesu w Wielkiej Brytanii.",
    ctaPrimary: "Skontaktuj się",
    ctaSecondary: "Nasze usługi",
  },
  about: {
    imageAlt: "Sabina Krajewska — polska księgowa w Liverpoolu",
    heading: "Profesjonalna księgowość z indywidualnym podejściem",
    paragraphs: [
      "Nazywam się Sabina Krajewska i jestem polską księgową obsługującą klientów w całej Wielkiej Brytanii. Pracuję zdalnie z okolic St. Helens, zapewniając profesjonalne i rzetelne wsparcie księgowe firmom w całym kraju.",
      "Pomagam właścicielom firm utrzymać finanse w porządku, zgodnie z przepisami i bez stresu — dzięki usłudze dopasowanej do indywidualnych potrzeb każdego klienta. Dobrze znam brytyjski system podatkowy (HMRC), łącząc dokładność i profesjonalizm z osobistym, przyjaznym podejściem.",
      "Rozumiem, że za każdą firmą stoi człowiek, dlatego cenię relacje oparte na zaufaniu, zrozumieniu i jasnej komunikacji — po polsku. Dla mnie księgowość to coś więcej niż liczby: to długofalowe wsparcie, dzięki któremu czujesz się pewnie w decyzjach biznesowych.",
      "Moim priorytetem jest zadbanie o Twoją księgowość starannie i sprawnie, byś miał więcej czasu na rozwijanie firmy ze spokojem i pewnością.",
    ],
    quote:
      "“Wierzę, że dobrze prowadzona księgowość daje nie tylko jasność finansową, ale też pewność i spokój w prowadzeniu firmy.”",
  },
  services: {
    heading: "Usługi księgowe dopasowane do Twojej firmy",
    items: [
      {
        icon: "bookOpen",
        title: "Księgowość",
        description:
          "Prowadzenie Twojej dokumentacji finansowej dokładnie, w porządku i na bieżąco.",
      },
      {
        icon: "user",
        title: "Self-employed i freelancerzy",
        description:
          "Rozliczenia Self Assessment dla osób samozatrudnionych i klientów indywidualnych.",
      },
      {
        icon: "building",
        title: "Spółki Limited (Ltd)",
        description:
          "Profesjonalna obsługa spółek Ltd: sprawozdania, payroll, deklaracje podatkowe i bieżąca zgodność z przepisami.",
      },
      {
        icon: "bank",
        title: "Podatki i sprawy z HMRC",
        description:
          "Pomoc w kontakcie z HMRC, sprawach podatkowych i reprezentacja w bardziej złożonych przypadkach.",
      },
    ],
  },
  booking: {
    heading: "Umów konsultację",
    description:
      "Chcesz uporządkować finanse? Umów bezpłatną, 15-minutową rozmowę wstępną, aby omówić potrzeby Twojej firmy i to, jak mogę Ci pomóc.",
    featuresAriaLabel: "Co obejmuje",
    features: [
      "Profesjonalna ocena sytuacji finansowej",
      "Przegląd zgodności z HMRC",
      "Indywidualny plan księgowy",
    ],
  },
  contact: {
    heading: "Skontaktuj się",
    subtitle:
      "Masz pytanie? Wypełnij formularz poniżej, a odpowiem w ciągu 24 godzin.",
    successTitle: "Dziękuję!",
    successMessage:
      "Twoja wiadomość została wysłana. Odezwę się w ciągu 24 godzin.",
    nameLabel: "Imię i nazwisko",
    namePlaceholder: "Jan Kowalski",
    emailLabel: "Adres e-mail",
    emailPlaceholder: "jan@przyklad.pl",
    phoneLabel: "Numer telefonu",
    phoneOptional: "(opcjonalnie)",
    phonePlaceholder: "+44 0000 000000",
    messageLabel: "Wiadomość",
    messagePlaceholder: "W czym mogę pomóc Twojej firmie?",
    errorMessage:
      "Coś poszło nie tak. Spróbuj ponownie lub napisz do mnie bezpośrednio.",
    submit: "Wyślij wiadomość",
    submitting: "Wysyłanie…",
    orReachDirectly: "Albo skontaktuj się bezpośrednio",
    phoneTitle: "Telefon",
    tapToCall: "Kliknij, aby zadzwonić",
    emailTitle: "E-mail",
    tapToCompose: "Kliknij, aby napisać",
    copyPhoneAria: "Skopiuj numer telefonu",
    copyEmailAria: "Skopiuj adres e-mail",
  },
  footer: {
    name: "Sabina Krajewska",
    copyright:
      "© {year} Sabina Krajewska Bookkeeping. Profesjonalna precyzja finansowa w Liverpoolu.",
    navAriaLabel: "Nawigacja w stopce",
    hmrcLink: "Wskazówki HMRC",
    facebookLink: "Facebook",
  },
};

export const dictionaries: Record<Locale, Content> = { en, pl };
