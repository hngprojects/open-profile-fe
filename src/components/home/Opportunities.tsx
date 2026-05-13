import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Opportunities() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-20">
      <div className="relative mb-12">
        <div className="rounded-[24px] bg-[#F2FDFE] pl-3.5 pr-5.5 w-fit flex items-center gap-1 h-7.5 mb-4">
          <Image
            src="/target_assets/icon-flash.svg"
            alt=""
            width={16}
            height={16}
          />
          <p className="font-medium text-[12px] leading-4 text-brand font-sfpror">
            Opportunities
          </p>
        </div>
        <h2 className="text-[32px] md:text-[46px] font-bold tracking-tight text-[#050505] leading-tight">
          Scattered presence? Hard to verify?
        </h2>
        <div className="flex items-center gap-4 mt-2">
          <h2 className="text-[32px] md:text-[46px] font-bold tracking-tight text-[#8c8c8c] leading-tight flex items-center gap-3">
            Missed opportunities?
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[22px]">
        {/* Left Card */}
        <div className="lg:w-[45%] bg-[#087583] rounded-[8px] flex flex-col items-center text-center min-h-[370px] relative shadow-sm">
          <div className="relative z-10 w-full m-10 ">
            <h3 className="text-white font-semibold text-[17px] leading-snug mx-auto max-w-[280px]">
              A community of professionals and ecosystem of creatives
            </h3>
          </div>

          <div className="relative w-full h-[280px] mt-7">
            <Image
              src="/opportunity/rings.png"
              alt="Community Rings"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-[55%] flex flex-col gap-[22px]">
          {/* Top Right Card */}
          <div className="bg-white rounded-[8px] border border-[#ABABAB] px-6 py-5 flex items-center justify-between shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
            <div>
              <h3 className="text-[20px] font-bold text-[#050505]">2000+</h3>
              <p className="text-[13px] font-medium text-[#4b5563] mt-1">
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
          <div className="relative rounded-[8px] overflow-hidden flex-1 min-h-[280px] group shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
            <div className="absolute inset-0 bg-[#e2e8f0]" />
            <Image
              src="/opportunity/audience.jpg"
              alt="Monitor audience"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <h3 className="absolute bottom-8 left-8 text-white font-bold text-[24px] tracking-tight">
              -Monitor your audience
            </h3>
          </div>
        </div>
      </div>

      {/* Full width bottom card */}
      <div className="mt-[22px] bg-white rounded-[8px] border border-[#ABABAB] p-8 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_2px_15px_rgb(0,0,0,0.03)] gap-6 relative">
        <div>
          <h3 className="text-[20px] font-bold text-[#050505] tracking-tight">
            Get found, not just shared
          </h3>
          <p className="text-[#4b5563] text-[13px] font-medium mt-1.5">
            Make your profile searchable so people can find you when it matters.
          </p>
        </div>
        <Button className="bg-[#8850EE] hover:bg-[#8850EE] text-white rounded-[12px] font-bold px-10 h-12 shadow-sm text-[15px]">
          Get started
        </Button>
      </div>
    </section>
  );
}
