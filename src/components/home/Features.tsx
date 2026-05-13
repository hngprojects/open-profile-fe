"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    id: 1,
    iconBg: "bg-green-100",
    icon: "/features/User.svg",
    title: "Be found by your name",
    description:
      "Ensure your brand or profile is easily discoverable across the ecosystem. Use a unique identifier that resonates with your community and makes identification seamless and professional.",
  },
  {
    id: 2,
    iconBg: "bg-pink-100",
    icon: "/features/Badge.svg",
    title: "Build trust faster",
    description:
      "Leverage social proof and our secure, invitation-only system to expand your network. Trust is the foundation of every successful digital interaction, helping you convert visitors into loyal advocates.",
  },
  {
    id: 3,
    iconBg: "bg-yellow-100",
    icon: "/features/Share.svg",
    title: "Make every share count",
    description:
      "Maximize the impact of your communication. Every link shared carries your brand's integrity, ensuring that engagement is tracked and every touchpoint provides measurable value for your audience.",
  },
  {
    id: 4,
    iconBg: "bg-purple-100",
    icon: "/features/Message.svg",
    title: "Dedicated support",
    description:
      "Our team is always here to help you navigate your journey. From setup to scale, we provide the tools and guidance needed to ensure your continued success on our platform.",
  },
];

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof features)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
      }}
      className="flex flex-col gap-3 rounded-2xl p-3 sm:p-4 md:p-6"
    >
      <div className="shrink-0">
        <Image
          src={feature.icon}
          alt={feature.title}
          width={50}
          height={50}
          className="object-contain"
        />
      </div>

      <h3
        className="text-lg leading-snug font-bold text-white sm:text-xl"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {feature.title}
      </h3>

      <p className="text-sm leading-7 text-teal-100/70">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "#0d3d3a" }}
      aria-labelledby="features-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 flex max-w-7xl flex-col items-center gap-4 px-4 text-center md:px-8"
      >
        <span className="mx-auto flex h-7.5 w-fit items-center gap-1 rounded-[24px] bg-[#F2FDFE] pr-5.5 pl-3.5">
          <Image
            src="/target_assets/icon-flash.svg"
            alt=""
            width={16}
            height={16}
          />
          <p className="text-brand font-sfpror text-[12px] leading-4 font-medium">
            Powerful Features
          </p>
        </span>

        <h2
          id="features-heading"
          className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          One link, clear Proof, faster opportunities
        </h2>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              delay={200 + i * 120}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mx-auto mt-12 flex max-w-7xl justify-center px-4 md:mt-20 md:px-8"
      >
        <Link
          href="/signup"
          className="w-full cursor-pointer rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-teal-700 transition-all duration-200 hover:scale-105 hover:bg-teal-50 active:scale-95 sm:w-auto sm:px-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Create Your Profile Now
        </Link>
      </motion.div>
    </section>
  );
}
