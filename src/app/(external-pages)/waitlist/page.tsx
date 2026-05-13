import { WaitlistHero } from "@/components/waitlist/WaitlistHero";
import { WaitlistFAQ } from "@/components/waitlist/WaitlistFAQ";
import { WaitlistCTA } from "@/components/waitlist/WaitlistCTA";
import Target from "@/components/home/Target";

export default function WaitlistPage() {
  return (
    <main>
      <WaitlistHero />
      <section className="w-full bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <Target />
        </div>
      </section>
      <WaitlistFAQ />
      <WaitlistCTA />
    </main>
  );
}
