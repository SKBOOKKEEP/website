import CalendlyWidget from "../CalendlyWidget";
import { CheckCircle } from "../ui/icons";

const features = [
  "Professional financial assessment",
  "HMRC compliance review",
  "Bespoke bookkeeping plan",
] as const;

export default function Booking() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

  return (
    <section id="booking" className="scroll-mt-20 py-20 bg-primary-container">
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-serif text-[32px] leading-10 font-semibold text-surface-bright mb-4">
              Schedule a Consultation
            </h2>
            <p className="text-lg leading-7 text-on-primary-container mb-8">
              Ready to streamline your finances? Book a free 15-minute
              introductory call to discuss your business requirements and how we
              can assist you.
            </p>
            <ul className="space-y-3" aria-label="What's included">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-2 text-on-primary-container">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-2 min-h-[400px] flex items-center justify-center">
            <CalendlyWidget url={calendlyUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
