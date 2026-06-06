import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
// import { HomeAuthCTA } from "@/components/home/HomeAuthCTA";
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
    <div className="min-h-screen overflow-hidden bg-white font-sans text-[#050505] selection:bg-[#065E69] selection:text-white">
      <Navbar />
      <div className="pt-19">
        <div className="w-full bg-[#FAFAFA]">
          <main className="relative mx-auto w-full">
            <Hero />
            {/* <div className="mx-auto -mt-8 flex max-w-[1440px] justify-center px-6 pb-[60px] md:px-[125px] lg:-mt-16 lg:justify-start">
              <HomeAuthCTA />
            </div> */}
          </main>
        </div>

        {/* impression */}
        <section className="w-full bg-[#FAFAFA]">
          <div className="max-w-9xl mx-auto px-4 py-16 md:px-8">
            <Impression />
          </div>
        </section>

        {/* target */}
        <section className="w-full bg-[#FEFEFE]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
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
