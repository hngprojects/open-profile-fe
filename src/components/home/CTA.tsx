import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#FAFAFA] py-24 md:py-26 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-brand rounded-[24px] md:rounded-[32px] overflow-hidden flex items-center w-full max-w-6xl mx-auto justify-between px-8 lg:px-16 py-9 lg:py-18">
          <div className="relative z-10 max-w-105 space-y-4">
            <h2 className="text-[28px] md:text-[32px] font-semibold text-[#FEFEFE] leading-[1.2] tracking-tight md:whitespace-nowrap">
              Be the profile people find first
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#FEFEFE] font-normal leading-relaxed">
              Create one searchable profile that shows who you are, what you do
              and why people should trust you
            </p>

            <div className="pt-3">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-[12px] p-6"
              >
                <Link href="/signup"> Create Your Profile Now</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block absolute right-0 md:w-[320px] md:h-65 lg:w-100 lg:h-82.5">
            <Image src="/cta/cta.svg" className="object-cover" alt="" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
