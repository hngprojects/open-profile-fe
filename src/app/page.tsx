import { Navbar } from "@/components/layout/Navbar";
import { WaitlistBanner } from "@/components/home/WaitlistBanner";
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
    <div className="font-afacad min-h-screen overflow-hidden bg-white text-[#050505] selection:bg-[#065E69] selection:text-white">
      <Navbar />

      <div className="pt-19">
        <WaitlistBanner />
        <div className="w-full bg-[#FAFAFA]">
          <main className="relative mx-auto w-full">
            <Hero />
          </main>
        </div>

        <section className="w-full bg-[#FAFAFA]">
          <div className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-6 lg:px-0">
            <Impression />
          </div>
        </section>

        <section className="w-full bg-[#FEFEFE]">
          <div className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-6 lg:px-0">
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
