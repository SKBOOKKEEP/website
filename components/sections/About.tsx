import Image from "next/image";
import type { Content } from "@/content/copy";

export default function About({ content }: { content: Content["about"] }) {
  return (
    <section id="about" className="scroll-mt-20 py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-square">
          <Image
            src="/Sabina.jpeg"
            alt={content.imageAlt}
            width={500}
            height={1000}
            className="h-auto w-full max-w-full"
          />
          <div
            className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-container -z-10"
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-8">
            {content.heading}
          </h2>
          <div className="space-y-4 text-on-surface-variant">
            {content.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-7">
                {paragraph}
              </p>
            ))}
            <p className="text-lg leading-7 italic border-l-2 border-secondary pl-4">
              {content.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
