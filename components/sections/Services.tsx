import { BookOpen, User, Building, Bank } from "../ui/icons";

const services = [
  {
    Icon: BookOpen,
    title: "Bookkeeping",
    description:
      "Bookkeeping: Keeping your financial records accurate, organised, and up to date.",
  },
  {
    Icon: User,
    title: "Sole Trader & Freelancer Support",
    description:
      "Self Assessment tax return services for self-employed individuals and private clients.",
  },
  {
    Icon: Building,
    title: "Limited Company Services",
    description:
      "Professional support for limited companies, including accounts, payroll, tax returns, and ongoing compliance.",
  },
  {
    Icon: Bank,
    title: "Tax & HMRC Assistance",
    description:
      "Support with HMRC communication, tax matters, and representation in more complex financial cases.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 my-20 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-3">
            Accounting Services Designed Around Your Business
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto" aria-hidden="true" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="p-8 border border-outline-variant hover:border-primary transition-colors flex flex-col items-center text-center"
            >
              <Icon
                className="w-9 h-9 text-secondary mb-4"
                aria-hidden="true"
              />
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
