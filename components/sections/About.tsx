import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 py-20 bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-square">
          <Image
            src="/Sabina.jpeg"
            alt="Sabina Krajewska — professional accountant and bookkeeper in Liverpool"
            width={500}
            height={1000}
          />
          <div
            className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-container -z-10"
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="font-serif text-[32px] leading-10 font-semibold text-primary mb-8">
            Professional Accounting with a Personal Approach
          </h2>
          <div className="space-y-4 text-on-surface-variant">
            <p className="text-lg leading-7">
              My name is Sabina Krajewska, and I am an Polish accountant working
              with clients across the United Kingdom. Based in St. Helens and
              working remotely, I provide professional and reliable accounting
              support to businesses nationwide.
            </p>
            <p className="text-lg leading-7">
              I help business owners keep their finances organised, compliant,
              and stress-free through a service tailored to the individual needs
              of each client. With a strong understanding of the UK financial
              system, I combine accuracy and professionalism with a personal and
              approachable way of working.
            </p>
            <p className="text-lg leading-7">
              I understand that behind every business there is a person, which
              is why I value relationships built on trust, understanding, and
              clear communication. For me, accounting is about more than
              numbers- it is about providing long-term support that helps my
              clients feel confident in their business decisions.
            </p>
            <p className="text-lg leading-7">
              My priority is to ensure your accounting is managed carefully and
              efficiently, giving you more time to focus on growing your
              business with confidence and peace of mind.
            </p>
            <p className="text-lg leading-7 italic border-l-2 border-secondary pl-4">
              &ldquo;I believe that well-managed accounting brings not only
              financial clarity, but also confidence and peace of mind in
              running a business.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
