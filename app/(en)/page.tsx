import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { en } from "@/content/copy";

export default function Home() {
  return (
    <>
      <NavBar content={en.nav} locale="en" />
      <main className="mt-20">
        <Hero content={en.hero} />
        <About content={en.about} />
        <Services content={en.services} />
        <Booking content={en.booking} />
        <Contact content={en.contact} />
      </main>
      <Footer content={en.footer} />
    </>
  );
}
