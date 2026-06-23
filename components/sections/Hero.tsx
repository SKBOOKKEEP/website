import Image from "next/image";
import Button from "../ui/Button";
import type { Content } from "@/content/copy";

export default function Hero({ content }: { content: Content["hero"] }) {
  return (
    <section
      className="relative h-[819px] flex items-center overflow-hidden"
      aria-label={content.ariaLabel}
    >
      <Image
        src="/biuro.png"
        alt={content.imageAlt}
        fill
        className="object-cover grayscale-[20%]"
        priority
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-16">
        <div className="max-w-2xl rounded-lg bg-white/60 px-5 py-10 md:px-8">
          <h1 className="font-serif text-[clamp(36px,5vw,48px)] leading-tight tracking-tight font-bold text-primary mb-4">
            {content.title}
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant mb-8 max-w-xl">
            {content.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#booking" size="lg">
              {content.ctaPrimary}
            </Button>
            <Button href="#services" variant="outline" size="lg">
              {content.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
