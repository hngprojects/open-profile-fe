"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "../icons/UserIcon";
import { QuestionIcon } from "../icons/QuestionIcon";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOption } from "@/api/auth/auth.options";
import { ROUTES } from "@/constants/routes";
import { useAuthCookie } from "@/hooks/useAuthCookie";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const CARD_W = 143;
const CARD_H = 72;

// outer container dimensions at 1440px
const OUTER_W = 528;
const OUTER_H = 420;

// svg dimensions
const SVG_W = 363;
const SVG_H = 274;

// offset between outer container and centered SVG
const OFFSET_X = (OUTER_W - SVG_W) / 2; // 82.5
const OFFSET_Y = (OUTER_H - SVG_H) / 2; // 73

const socials = [
  {
    label: "GitHub",
    sub: "Projects",
    bg: "#171717",
    icon: "/impression/icon-github.svg",
  },
  {
    label: "Behance",
    sub: "Portfolio",
    bg: "#548BF1",
    icon: "/impression/icon-behance.svg",
  },
  {
    label: "LinkedIn",
    sub: "Experience",
    bg: "#548BF1",
    icon: "/impression/icon-linkedin.svg",
  },
  {
    label: "X",
    sub: "Thoughts",
    bg: "#171717",
    icon: "/impression/icon-twitter.svg",
  },
];

// card center positions in outer container space → converted to SVG coordinate space
const lines = [
  // top-left card (pl-[19px] offset)
  {
    x1: 19 + CARD_W / 2 - OFFSET_X,
    y1: CARD_H / 2 - OFFSET_Y,
    x2: SVG_W / 2,
    y2: SVG_H / 2,
  },
  // top-right card
  {
    x1: OUTER_W - CARD_W + CARD_W / 2 - OFFSET_X,
    y1: CARD_H / 2 - OFFSET_Y,
    x2: SVG_W / 2,
    y2: SVG_H / 2,
  },
  // bottom-left card (pb-1.5 offset)
  {
    x1: CARD_W / 2 - OFFSET_X,
    y1: OUTER_H - CARD_H + CARD_H / 2 - OFFSET_Y,
    x2: SVG_W / 2,
    y2: SVG_H / 2,
  },
  // bottom-right card (pr-0.5 offset)
  {
    x1: OUTER_W - CARD_W + CARD_W / 2 - OFFSET_X,
    y1: OUTER_H - CARD_H + CARD_H / 2 - OFFSET_Y,
    x2: SVG_W / 2,
    y2: SVG_H / 2,
  },
];

export default function Impression() {
  const hasAuthCookie = useAuthCookie();
  const { data: user } = useQuery({
    ...getCurrentUserOption(),
    enabled: hasAuthCookie,
    throwOnError: false,
  });

  return (
    <div className="font-afacad text-primary grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-20">
      {/* left visual */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto hidden w-full max-w-[528px] items-center justify-center overflow-hidden lg:flex"
        style={{ aspectRatio: `${OUTER_W} / ${OUTER_H}` }}
      >
        {/* SVG — dashes + user icon only, centered inside outer container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width={SVG_W}
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* dashes from card centers to user icon */}
            {lines.map((line, i) => (
              <motion.line
                key={i}
                {...line}
                stroke="#ABABAB"
                strokeWidth="1"
                strokeDasharray="6 6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            ))}

            {/* user icon at center */}
            <motion.g
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ transformOrigin: `${SVG_W / 2}px ${SVG_H / 2}px` }}
            >
              {/* circle bg */}
              <circle
                cx={SVG_W / 2}
                cy={SVG_H / 2}
                r="30"
                fill="#FEFEFE"
                stroke="white"
                strokeWidth="2"
              />
              {/* user icon */}
              <UserIcon x={SVG_W / 2 - 20} y={SVG_H / 2 - 20} />

              {/* red question badge */}
              <circle
                cx={SVG_W / 2 + 20}
                cy={SVG_H / 2 + 20}
                r="11"
                stroke="white"
                strokeWidth="2"
                className="fill-negative-bg"
              />
              {/* question icon */}
              <QuestionIcon x={SVG_W / 2 + 14} y={SVG_H / 2 + 14} />
            </motion.g>
          </svg>
        </div>

        {/* social cards — HTML divs absolutely positioned at corners */}

        {/* top row */}
        <div className="absolute top-0 right-0 left-0 flex items-start justify-between gap-4 sm:pl-[19px]">
          {socials.slice(0, 2).map(({ label, sub, bg, icon }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="border-input-b flex h-18 w-[143px] rotate-[0.82deg] items-center justify-start gap-2 rounded-[16px] border bg-[#FEFEFE] pl-4"
            >
              <div
                style={{ backgroundColor: bg }}
                className="border-input-b flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[4px] border"
              >
                <Image src={icon} alt={label} width={24} height={24} />
              </div>
              <p className="flex flex-col text-[14px] leading-5">
                <span>{label}</span>
                <span>{sub}</span>
              </p>
            </motion.div>
          ))}
        </div>

        {/* bottom row */}
        <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-4 sm:pr-0.5 sm:pb-1.5">
          {socials.slice(2).map(({ label, sub, bg, icon }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              className="border-input-b flex h-18 w-[143px] rotate-[0.82deg] items-center justify-start gap-2 rounded-[16px] border bg-[#FEFEFE] pl-4"
            >
              <div
                style={{ backgroundColor: bg }}
                className="border-input-b flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[4px] border"
              >
                <Image src={icon} alt={label} width={24} height={24} />
              </div>
              <p className="flex flex-col text-[14px] leading-5">
                <span>{label}</span>
                <span>{sub}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* right text */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex w-full flex-col items-start justify-center gap-6"
      >
        <div className="space-y-4">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-afacad text-[28px] leading-9 font-semibold tracking-[-1px] md:text-[34px] md:leading-11 lg:text-[40px] lg:leading-12"
          >
            Your Links Are Scattered.{" "}
            <span className="text-link-hover-text">
              Your First Impression Should Not Be
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-afacad flex flex-col gap-4 text-[15px] leading-6 md:gap-6 md:text-[16px] lg:text-[18px] lg:leading-6.5"
          >
            <span>
              Your projects may be on GitHub. Your designs may be on Behance.
              Your thoughts may be on X. Your experience may be on LinkedIn. But
              when someone wants to know who you are, what you do, and whether
              they can trust you, they should not have to piece it together
              across platforms.
            </span>
            <span>
              Open Profile gives you one clear place to be found, understood and
              contacted — a single, clean profile link that represents
              everything about you.
            </span>
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={user ? ROUTES.dashboard.home : "/signup"}
            className="bg-brand flex h-12 cursor-pointer items-center justify-center rounded-[8px] px-4 font-medium text-[#FEFEFE]"
          >
            {user ? "Go to Dashboard" : "Create Your Profile Now"}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
