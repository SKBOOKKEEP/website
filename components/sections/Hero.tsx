import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      className="relative h-[819px] flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      <Image
        src="/biuro.png"
        alt="Professional office workspace"
        fill
        className="object-cover grayscale-[20%]"
        priority
        sizes="100vw"
      />

      <div className="relative z-10 py-10 w-fit ml-10 px-5 md:px-16 bg-white/60 rounded-lg">
        <div className="max-w-2xl">
          <h1 className="font-serif text-[clamp(36px,5vw,48px)] leading-tight tracking-tight font-bold text-primary mb-4">
            Professional Accounting Support Across the UK
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant mb-8 max-w-xl">
            Reliable accounting support designed to bring clarity, confidence,
            and peace of mind to your business.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#booking" size="lg">
              Get in touch
            </Button>
            <Button href="#services" variant="outline" size="lg">
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
