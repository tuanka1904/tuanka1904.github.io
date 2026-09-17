import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#0c0a09] text-stone-200 font-sans">
      <Navbar />
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
