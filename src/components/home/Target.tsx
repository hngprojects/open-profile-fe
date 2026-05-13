"use client";

import Image from "next/image";
import { motion } from "motion/react";

const audiences = [
  {
    bg: "#EFF6F8",
    right: "right-[-7px]",
    icon: "/target_assets/icon-code.svg",
    checkIcon: "/target_assets/icon-check.svg",
    title: "Freelancers",
    description:
      "Designers, developers, writers — win client trust faster with a verified profile that shows everything.",
    items: [
      "Showcase portfolio & credentials",
      "Get verified for credibility",
      "Be found by new clients",
    ],
  },
  {
    bg: "#FFF6EF",
    right: "right-[-20px]",
    icon: "/target_assets/icon-pencil.svg",
    checkIcon: "/target_assets/icon-orange-check.svg",
    title: "Creators",
    description:
      "Newsletter writers, podcasters, content makers — build a verified home base for your audience.",
    items: [
      "Unify your scattered presence",
      "Attract brand partnerships",
      "Own your identity",
    ],
  },
  {
    bg: "#F3FEF7",
    right: "right-[-21px]",
    icon: "/target_assets/icon-artboard.svg",
    checkIcon: "/target_assets/icon-green-check.svg",
    title: "Indie Builders",
    description:
      "Solo founders, makers, hackers — create a persistent identity that shows all your projects.",
    items: [
      "Showcase your full body of work",
      "Attract collaborators & investors",
      "Build recognition over time",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Target() {
  return (
    <div className="text-primary font-afacad w-full">
      {/* header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex h-7.5 w-fit items-center gap-1 rounded-[24px] bg-[#F2FDFE] pr-5.5 pl-3.5">
          <Image
            src="/target_assets/icon-flash.svg"
            alt="target"
            width={16}
            height={16}
          />
          <p className="text-brand font-sfpror text-[12px] leading-4 font-medium">
            Target Audience
          </p>
        </div>

        <p className="font-afacad mx-auto mt-2 max-w-[450px] text-center text-[28px] leading-9 font-semibold md:max-w-full md:text-[40px] md:leading-12 lg:text-[48px] lg:leading-14">
          Built for people who need to be discovered early
        </p>
      </motion.div>

      {/* cards grid */}
      <div className="mt-10 grid grid-cols-1 items-center justify-center gap-6 lg:grid-cols-3">
        {audiences.map(
          ({ bg, right, icon, checkIcon, title, description, items }, i) => (
            <motion.div
              key={title}
              style={{ backgroundColor: bg }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mx-auto flex h-full w-full max-w-[450px] flex-col space-y-4 overflow-hidden rounded-[16px] px-6 pt-20 pb-6"
            >
              {/* top icon */}
              <div className={`absolute top-0 ${right}`}>
                <Image
                  src={icon}
                  alt={title}
                  width={100}
                  height={75}
                  className="h-[75px] w-25"
                />
              </div>

              {/* title */}
              <p className="font-afacad text-[24px] leading-8 font-semibold tracking-[-0.5px]">
                {title}
              </p>

              {/* description */}
              <p className="font-afacad text-[#454545]">{description}</p>

              {/* checklist — pushed to bottom */}
              <div className="mt-auto space-y-2">
                {items.map((item, j) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 + j * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Image src={checkIcon} alt="check" width={16} height={16} />
                    <p className="font-afacad text-[#454545]">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
