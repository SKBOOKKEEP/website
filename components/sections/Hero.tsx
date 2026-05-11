import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      className="relative h-[819px] flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsSXemV5a6_wGEufEUniPEm6sGIFq0e8YjanlcIlmkyAkb1Gf_CFdWA6u9H7HbgG5s2t1zQmBw64b9Tp6Z8vwaWBMZSXACkuao47PJCt3CjFYrRKr5vVzLfM8XQaU0l5-xMS1ROqlL8PTmB8YfswMOrVmHEDw6tfSBTGPdPWGWEqVGMR7G5s3BiNl9iatf566XVRHSS0B-XnGjqIpH6h0wY2DADL0mCfQrY3LzrfwqJNKXcO_VBFqi8oCKTm8dFZHg3oHWVqJBnJU"
          alt="Minimalist financial workspace with laptop and professional documents"
          fill
          className="object-cover grayscale-[20%]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-16 w-full">
        <div className="max-w-2xl">
          <h1 className="font-serif text-[clamp(36px,5vw,48px)] leading-tight tracking-tight font-bold text-primary mb-4">
            Professional Financial Precision in Liverpool
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant mb-8 max-w-xl">
            Expert bookkeeping and HMRC consulting tailored to your business
            needs. We bring clarity to your accounts so you can focus on growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#booking" size="lg">
              Get Started
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
