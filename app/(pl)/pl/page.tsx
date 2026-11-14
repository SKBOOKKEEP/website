import NavBar from "@/components/NavBar";
import PageJsonLd from "@/components/PageJsonLd";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import HomeFaq, { homeFaqJsonLd } from "@/components/sections/HomeFaq";
import { pl } from "@/content/copy";
import { SITE_URL } from "@/lib/seo";

export default function HomePl() {
  return (
    <>
      <PageJsonLd routeKey="home" locale="pl" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeFaqJsonLd("pl", `${SITE_URL}/pl`)),
        }}
      />
      <NavBar content={pl.nav} locale="pl" routeKey="home" />
      <main className="mt-20">
        <Hero content={pl.hero} />
        <About content={pl.about} />
        <Services content={pl.services} locale="pl" />
        <Booking content={pl.booking} />
        <HomeFaq locale="pl" />
        <Contact content={pl.contact} />
      </main>
      <Footer content={pl.footer} locale="pl" />
    </>
  );
}
