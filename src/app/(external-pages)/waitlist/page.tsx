import { WaitlistHero } from "@/components/waitlist/WaitlistHero";
import { WaitlistFAQ } from "@/components/waitlist/WaitlistFAQ";
import { WaitlistCTA } from "@/components/waitlist/WaitlistCTA";
import Target from "@/components/home/Target";

export default function WaitlistPage() {
  return (
    <main>
      <WaitlistHero />
      <section className="w-full bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <Target />
        </div>
      </section>
      <WaitlistFAQ />
      <WaitlistCTA />
    </main>
  );
}
