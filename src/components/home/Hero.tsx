"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";

const profiles = [
  {
    name: "James Smith",
    role: "Junior Product Designer",
    img: "/hero/large-profile1.jpg",
    mobileImg: "/hero/mobile-profilei.jpg",
  },
  {
    name: "David Mensah",
    role: "Indie Hacker • Solo Founder",
    img: "/hero/large-profile2.jpg",
    mobileImg: "/hero/mobile-profileii.jpg",
  },
  {
    name: "Emmanuel Imoh",
    role: "Content Creator",
    img: "/hero/large-profile3.jpg",
    mobileImg: "/hero/mobile-profileiii.jpg",
  },
];

const miniAvatars = [
  "/hero/mini-profile1.png",
  "/hero/mini-profile2.jpg",
  "/hero/mini-profile3.jpg",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export function Hero() {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % profiles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const getProfile = (offset: number) =>
    profiles[(current + offset) % profiles.length];

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 pt-[60px] pb-[40px] md:px-[125px] md:pt-[80px] lg:flex-row lg:items-center lg:gap-4">
        {/* ───────────────── LEFT COLUMN ───────────────── */}
        <div className="z-10 flex w-full shrink-0 flex-col gap-4 lg:max-w-[500px]">
          {/* Heading */}
          <motion.h1
            {...fadeUp(0.05)}
            className="text-[38px] leading-[1.12] font-semibold tracking-[-1px] text-[#050505] sm:text-[46px] md:text-[56px]"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            Create{" "}
            <span className="relative mx-2 inline-block">
              <span className="text-link-hover-text absolute -top-5 left-1/2 -translate-x-1/2 text-xl leading-none tracking-wider whitespace-nowrap">
                \ | /
              </span>
              <span
                className="text-link-hover-text italic"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                One
              </span>
            </span>{" "}
            Searchable Profile People Can Find And Trust
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.12)}
            className="max-w-[538px] text-[16px] leading-[26px] font-normal text-[#050505] md:text-[18px]"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            Turn your scattered online presence into one searchable profile that
            can show who you are, what you do, and why people should trust you.
          </motion.p>

          {/* Search */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex w-full max-w-[512px] flex-col items-stretch gap-[6.73px] sm:flex-row"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="open.profile/"
              className="text-label-text placeholder:text-label-text h-[50px] flex-1 rounded-[5.57px] border border-[#C9C9C9] bg-[#FAFAFA] px-[12px] py-4 text-[16px] leading-[24px] transition outline-none focus:ring-2 focus:ring-[#087583]/40 sm:py-0"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            />
            <button
              className="bg-brand-hover-bg h-[56px] w-full rounded-[8px] px-[16px] text-[16px] leading-[24px] whitespace-nowrap text-white transition-colors hover:bg-[#065E69] sm:h-[50px] sm:w-auto"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              Search a Profile
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            {...fadeUp(0.28)}
            className="flex flex-row items-center gap-3"
          >
            <div
              className="relative shrink-0"
              style={{ height: "35px", width: "69px" }}
            >
              {miniAvatars.map((src, i) => (
                <div
                  key={i}
                  className="absolute overflow-hidden rounded-full border-[2.52px] border-white"
                  style={{
                    width: "35px",
                    height: "35px",
                    left: `${i * 17}px`,
                    zIndex: i + 1,
                  }}
                >
                  <Image
                    src={src}
                    alt={`User ${i + 1}`}
                    fill
                    sizes="35px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p
              className="text-label-text text-[14px] leading-[24px] font-normal md:text-[16px]"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              Join over Creators and freelancers that trusts us all over the
              world.
            </p>
          </motion.div>
        </div>

        {/* ───────────────── RIGHT COLUMN — desktop only ───────────────── */}
        <div className="relative -ml-[10px] hidden w-full flex-1 overflow-visible lg:block">
          {/* LEFT fade */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: "-20px",
              width: "160px",
              background:
                "linear-gradient(to right, #ffffff 0%, #ffffff 40%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
          {/* RIGHT fade */}
          <div
            style={{
              position: "absolute",
              right: "-40px",
              top: 0,
              bottom: "-20px",
              width: "220px",
              background:
                "linear-gradient(to left, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div className="flex w-full translate-x-[8px] items-start justify-center gap-4">
            {[0, 1, 2].map((offset, i) => {
              const p = getProfile(offset);
              return (
                <div
                  key={i}
                  className="relative shrink-0 overflow-hidden rounded-[9px]"
                  style={{ width: "210px", height: "365px" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={p.name}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        priority
                        quality={100}
                        unoptimized
                        sizes="210px"
                        className="object-cover object-center"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(360deg, rgba(0,0,0,0.9) 19.96%, rgba(102,102,102,0) 42.85%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 z-10 flex flex-col gap-1 p-[15px_18px]">
                        <div className="flex items-center gap-1">
                          <span
                            className="text-[20px] leading-[26px] font-bold text-[#FEFEFE]"
                            style={{ fontFamily: "'Afacad', sans-serif" }}
                          >
                            {p.name}
                          </span>
                          <CircleCheck
                            className="h-5 w-5 shrink-0"
                            style={{ color: "#98FAC3" }}
                          />
                        </div>
                        <span
                          className="text-[14px] leading-[24px] font-medium text-[#E6E6E6]"
                          style={{ fontFamily: "'Afacad', sans-serif" }}
                        >
                          {p.role}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────────────── MOBILE CARDS ───────────────── */}
        <div className="relative w-full lg:hidden">
          {/* LEFT fade */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: "-20px",
              width: "80px",
              background:
                "linear-gradient(to right, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
          {/* RIGHT fade */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: "-20px",
              width: "80px",
              background:
                "linear-gradient(to left, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div className="flex w-full gap-2">
            {[0, 1, 2].map((offset, i) => {
              const p = getProfile(offset);
              const isMiddle = i === 1;
              return (
                <div
                  key={i}
                  className="relative flex flex-col justify-end overflow-hidden rounded-[9px]"
                  style={{ height: "320px", flex: isMiddle ? "1.5" : "1" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={p.name}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.mobileImg}
                        alt={p.name}
                        fill
                        priority
                        quality={100}
                        unoptimized
                        sizes="33vw"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(360deg, rgba(0,0,0,0.9) 19.96%, rgba(102,102,102,0) 42.85%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 z-10 flex flex-col gap-0.5 p-[10px_12px]">
                    <div className="flex items-center gap-1">
                      <span
                        className="text-[13px] leading-[18px] font-bold whitespace-nowrap text-[#FEFEFE]"
                        style={{ fontFamily: "'Afacad', sans-serif" }}
                      >
                        {p.name}
                      </span>
                      <CircleCheck
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: "#98FAC3" }}
                      />
                    </div>
                    <span
                      className="text-[11px] leading-[16px] font-medium whitespace-nowrap text-[#E6E6E6]"
                      style={{ fontFamily: "'Afacad', sans-serif" }}
                    >
                      {p.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hidden px-[125px] pt-[40px] pb-[80px] lg:block">
        <div className="border-t border-[#C9C9C9]" />
      </div>
    </section>
  );
}
