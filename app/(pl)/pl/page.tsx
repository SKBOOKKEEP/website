import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { pl } from "@/content/copy";

export default function HomePl() {
  return (
    <>
      <NavBar content={pl.nav} locale="pl" />
      <main className="mt-20">
        <Hero content={pl.hero} />
        <About content={pl.about} />
        <Services content={pl.services} />
        <Booking content={pl.booking} />
        <Contact content={pl.contact} />
      </main>
      <Footer content={pl.footer} />
    </>
  );
}
