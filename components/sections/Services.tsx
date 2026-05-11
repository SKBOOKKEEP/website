const services = [
  {
    icon: "menu_book",
    title: "Full Bookkeeping",
    description:
      "Daily transaction tracking, bank reconciliation, and precise ledger management.",
  },
  {
    icon: "person",
    title: "Sole Trading Support",
    description:
      "Dedicated support for self-employed professionals and independent contractors.",
  },
  {
    icon: "corporate_fare",
    title: "Ltd Companies",
    description:
      "Comprehensive statutory accounts, payroll, and corporate tax planning.",
  },
  {
    icon: "account_balance",
    title: "HMRC Consulting",
    description:
      "Direct liaison with HMRC, VAT returns, and compliance audits.",
  },
] as const;

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-3">
            Core Financial Services
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto" aria-hidden="true" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map(({ icon, title, description }) => (
            <div
              key={title}
              className="p-8 border border-outline-variant hover:border-primary transition-colors flex flex-col items-center text-center"
            >
              <span
                className="material-symbols-outlined text-4xl text-secondary mb-4"
                aria-hidden="true"
              >
                {icon}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-primary mb-2">
                {title}
              </h3>
              <p className="text-base leading-6 text-on-surface-variant">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
