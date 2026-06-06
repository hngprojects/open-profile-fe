import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Opportunities() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
      <div className="relative mb-12">
        <div className="mb-4 flex h-7.5 w-fit items-center gap-1 rounded-[24px] bg-[#F2FDFE] pr-5.5 pl-3.5">
          <Image
            src="/target_assets/icon-flash.svg"
            alt=""
            width={16}
            height={16}
          />
          <p className="text-brand font-sfpror text-[12px] leading-4 font-medium">
            Opportunities
          </p>
        </div>
        <h2 className="text-[32px] leading-tight font-bold tracking-tight text-[#050505] md:text-[46px]">
          Scattered presence? Hard to verify?
        </h2>
        <div className="mt-2 flex items-center gap-4">
          <h2 className="flex items-center gap-3 text-[32px] leading-tight font-bold tracking-tight text-[#8c8c8c] md:text-[46px]">
            Missed opportunities?
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-[22px] lg:flex-row">
        {/* Left Card */}
        <div className="bg-brand-hover-bg relative flex min-h-[370px] flex-col items-center rounded-[8px] text-center shadow-sm lg:w-[45%]">
          <div className="relative z-10 m-10 w-full">
            <h3 className="mx-auto max-w-[280px] text-[17px] leading-snug font-semibold text-white">
              A community of professionals and ecosystem of creatives
            </h3>
          </div>

          <div className="relative mt-7 h-[280px] w-full">
            <Image
              src="/opportunity/rings.png"
              alt="Community Rings"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[22px] lg:w-[55%]">
          {/* Top Right Card */}
          <div className="flex items-center justify-between rounded-[8px] border border-[#ABABAB] bg-white px-6 py-5 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
            <div>
              <h3 className="text-[20px] font-bold text-[#050505]">2000+</h3>
              <p className="mt-1 text-[13px] font-medium text-[#4b5563]">
                Join Creators and freelances
              </p>
            </div>

            <div className="flex items-center">
              <Image
                src="/hero/avatar.png"
                alt="Creators avatars"
                width={96}
                height={48}
                className="h-9 w-auto object-contain"
              />
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="group relative min-h-[280px] flex-1 overflow-hidden rounded-[8px] shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
            <div className="absolute inset-0 bg-[#e2e8f0]" />
            <Image
              src="/opportunity/audience.jpg"
              alt="Monitor audience"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <h3 className="absolute bottom-8 left-8 text-[24px] font-bold tracking-tight text-white">
              -Monitor your audience
            </h3>
          </div>
        </div>
      </div>

      {/* Full width bottom card */}
      <div className="relative mt-[22px] flex flex-col items-start justify-between gap-6 rounded-[8px] border border-[#ABABAB] bg-white p-8 shadow-[0_2px_15px_rgb(0,0,0,0.03)] md:flex-row md:items-center md:p-5">
        <div>
          <h3 className="text-[20px] font-bold tracking-tight text-[#050505]">
            Get found, not just shared
          </h3>
          <p className="mt-1.5 text-[13px] font-medium text-[#4b5563]">
            Make your profile searchable so people can find you when it matters.
          </p>
        </div>
        <Button className="bg-purple-brand hover:bg-purple-brand-hover h-12 rounded-[12px] px-10 text-[15px] font-bold text-white shadow-sm">
          Get started
        </Button>
      </div>
    </section>
  );
}
