import { BookOpen, User, Building, Bank } from "../ui/icons";
import type { Content, ServiceIcon } from "@/content/copy";

const icons: Record<ServiceIcon, typeof BookOpen> = {
  bookOpen: BookOpen,
  user: User,
  building: Building,
  bank: Bank,
};

export default function Services({
  content,
}: {
  content: Content["services"];
}) {
  return (
    <section id="services" className="scroll-mt-20 my-20 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <div className="text-center mb-20">
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-3">
            {content.heading}
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto" aria-hidden="true" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {content.items.map(({ icon, title, description }) => {
            const Icon = icons[icon];
            return (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
