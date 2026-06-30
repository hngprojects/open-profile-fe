"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "David",
    role: "Product Designer",
    initials: "DA",
    avatarBg: "#7C3AED",
    text: "Before using Open Profile, I had my work scattered across different platforms—my portfolio on one site, links in my bio, and social media everywhere else. With Open Profile, I brought everything into one clean, professional page. Now I just send a single link.",
  },
  {
    name: "Tunde",
    role: "Frontend Developer",
    initials: "TU",
    avatarBg: "#D97706",
    text: "I like that people can actually find my profile instead of me always sharing it first.",
  },
  {
    name: "Linda",
    role: "Content Creator",
    initials: "LI",
    avatarBg: "#0D9488",
    text: "My whole online presence feels more cohesive now. Everything I do professionally lives under one link.",
  },
  {
    name: "James",
    role: "Backend Developer",
    initials: "JA",
    avatarBg: "#4338CA",
    text: "I used to send multiple links to clients. Now I just share one profile and everything they need is there.",
  },
  {
    name: "Chinedu",
    role: "Programmer",
    initials: "CH",
    avatarBg: "#16A34A",
    text: "What I like most about Open Profile is how simple it is to bring everything together into one clean, professional page. I feel more organized, more credible, and people take me more seriously.",
  },
];

const row1 = [testimonials[0], testimonials[1], testimonials[2]];
const row2 = [testimonials[3], testimonials[4], testimonials[1]];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="mx-3 flex w-70 shrink-0 flex-col justify-between rounded-[16px] bg-white p-5 shadow-sm md:w-80">
      <p className="mb-5 text-[13px] leading-relaxed text-[#4A4A4A]">
        &quot;{t.text}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: t.avatarBg }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-primary-text text-sm font-bold">{t.name}</p>
          <p className="text-tertiary-foreground-text text-sm font-medium">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Proof() {
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-primary-bg w-full overflow-hidden py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mb-10 flex w-full max-w-[1100px] flex-col items-center px-4 sm:px-6 lg:px-0"
      >
        <motion.div
          variants={headerVariants}
          className="bg-primary-foreground-bg mb-8 flex h-7.5 w-fit items-center gap-1 rounded-[24px] pr-5.5 pl-3.5"
        >
          <Image
            src="/target_assets/icon-flash.svg"
            alt=""
            width={16}
            height={16}
          />
          <p className="text-brand text-sm leading-4 font-medium">
            Social Proof
          </p>
        </motion.div>

        <motion.h2
          variants={headerVariants}
          className="text-primary-text text-center text-[32px] font-semibold lg:text-[40px]"
        >
          Join creators and freelancers building their identity online
        </motion.h2>
      </motion.div>

      <div className="mx-auto w-full max-w-[1100px] overflow-hidden px-4 sm:px-6 lg:px-0">
        <div className="relative mb-4 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-25%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>

        <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max"
            animate={{ x: ["-25%", "0%"] }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
