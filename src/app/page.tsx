import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { FAQ } from "@/components/home/FAQ";
import { Pricing } from "@/components/home/Pricing";
import { CTA } from "@/components/home/CTA";
import { Journey } from "@/components/home/Journey";
import { Features } from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import Impression from "@/components/home/Impression";
import Target from "@/components/home/Target";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#065E69] selection:text-white overflow-hidden text-[#050505]">
      <Navbar />
      <div className="pt-[76px]">
        <div className="w-full bg-[#FAFAFA]">
          <main className="w-full relative mx-auto">
            <Hero />
          </main>
        </div>

        {/* impression */}
        <section className="w-full bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
            <Impression />
          </div>
        </section>

        {/* target */}
        <section className="w-full bg-[#FEFEFE]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
            <Target />
          </div>
        </section>
      </div>
      <Journey />

      <Features />
      <Proof />

      <FAQ />

      <Pricing />

      <CTA />
      <Footer />
    </div>
  );
}
