import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import HomeFaq, { homeFaqJsonLd } from "@/components/sections/HomeFaq";
import { en } from "@/content/copy";
import { SITE_URL } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <PageJsonLd routeKey="home" locale="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeFaqJsonLd("en", SITE_URL)),
        }}
      />
      <NavBar content={en.nav} locale="en" routeKey="home" />
      <main className="mt-20">
        <Hero content={en.hero} />
        <About content={en.about} />
        <Services content={en.services} locale="en" />
        <Booking content={en.booking} />
        <HomeFaq locale="en" />
        <Contact content={en.contact} />
      </main>
      <Footer content={en.footer} locale="en" />
    </>
  );
}
