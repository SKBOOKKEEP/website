import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-square">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo3pCEguI5bNuCaDtTXv8lEcxAcOv3zcOJMbxZ3ARnMbJ0Dh2Vd_CNMGG1dP1TIMivMqcA-NmlNxLaAZuYDBCwT4fCIolXmfI-Fh-aNnKRN0tAQyBo8XCilVzz6HgGZq2--T5oYPV-mp6JkwN6hYZc9ZRD4qwVufbtW2YidBGyaBHz9SwoMmoHLMGoBryImQxvG3b6WGbsEdHkFeF1p1UpPMjxby00aY_z6bN1OVuM4focFO2Ui_rOrB6NAsGTPZV0xPZ7zYlMEMA"
            alt="Sabina Krajewska — professional accountant and bookkeeper in Liverpool"
            fill
            className="object-cover grayscale-[10%]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-container -z-10"
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-8">
            Expertise Meets Local Knowledge
          </h2>
          <div className="space-y-4 text-on-surface-variant">
            <p className="text-lg leading-7">
              Sabina Krajewska is a Polish-born accountant who has built a
              reputation for meticulous accuracy and strategic insight within the
              Liverpool business community.
            </p>
            <p className="text-lg leading-7">
              With perfect English proficiency and deep UK market knowledge, she
              bridges the gap for diverse businesses navigating complex financial
              landscapes. Her commitment to precision ensures that every ledger is
              balanced and every tax filing is optimised.
            </p>
            <p className="text-lg leading-7 italic border-l-2 border-secondary pl-4">
              &ldquo;My goal isn&apos;t just to manage your books, but to provide
              the financial foundation your business needs to thrive locally and
              beyond.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
