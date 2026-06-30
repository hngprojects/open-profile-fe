"use client";

import Link from "next/link";

export function WaitlistBanner() {
  const pattern = [
    {
      type: "waitlist",
      part1: "Join Our ",
      part2: "Waitlist",
    },
    {
      type: "tagline",
      part1: "Be among the first to build a profile that ",
      part2: "helps people discover and trust you.",
    },
  ];

  const items = [...Array(8)].flatMap(() => pattern);

  return (
    <Link
      href="/waitlist"
      aria-label="Join our waitlist"
      className="bg-primary-bg hover:bg-primary-bg/90 relative block w-full overflow-hidden py-2.5 transition-colors duration-200 select-none"
    >
      {/* Side Fade Gradients */}
      <div className="from-primary-bg pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent" />
      <div className="from-primary-bg pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l to-transparent" />

      {/* Marquee Track */}
      <div
        aria-hidden="true"
        className="animate-marquee-left flex w-max items-center gap-6 whitespace-nowrap"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border-tertiary-b bg-secondary-bg flex items-center rounded-full border px-5 py-2.5 text-[15px] leading-[22px] font-medium"
          >
            {item.type === "waitlist" ? (
              <span className="font-afacad text-primary-text font-medium">
                <span>{item.part1}</span>
                <span className="font-semibold">{item.part2}</span>
              </span>
            ) : (
              <span className="font-afacad text-primary-text font-medium">
                <span className="font-semibold">{item.part1}</span>
                <span>{item.part2}</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </Link>
  );
}
