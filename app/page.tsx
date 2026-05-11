import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="mt-20">
        <Hero />
        <About />
        <Services />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
