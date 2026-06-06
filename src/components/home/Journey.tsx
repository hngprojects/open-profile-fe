"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Step {
  id: string;
  title: string;
  titleColor: "teal" | "dark";
  description: string;
  icon: string;
  ghostIcon: string;
  mobileGhostClassName: string;
  mobileIconBoxSize: number;
  mobileIconImageSize: number;
}
export const steps: Step[] = [
  {
    id: "create-profile",
    ghostIcon: "/journey/step01.svg",
    title: "Create Your Profile",
    titleColor: "teal",
    description:
      "Sign up in seconds with email, Google, or LinkedIn. Craft your bio, and link your work.",
    icon: "/journey/User.svg",
    mobileGhostClassName: "top-[-12px] right-[24px]",
    mobileIconBoxSize: 45,
    mobileIconImageSize: 45,
  },
  {
    id: "verify-identity",
    ghostIcon: "/journey/step02.svg",
    title: "Verify Your Identity",
    titleColor: "dark",
    description:
      "Verify your email and connect social accounts. Build credibility with verification badges.",
    icon: "/journey/check.svg",
    mobileGhostClassName: "top-[-18px] right-[4px]",
    mobileIconBoxSize: 75,
    mobileIconImageSize: 75,
  },
  {
    id: "share-link",
    ghostIcon: "/journey/step03.svg",
    title: "Share Your Link And Get Discovered",
    titleColor: "dark",
    description:
      "Share your link, appear in searches, and grow your network. Not found? Invite them to join.",
    icon: "/journey/cross.svg",
    mobileGhostClassName: "top-[-18px] right-[24px]",
    mobileIconBoxSize: 75,
    mobileIconImageSize: 75,
  },
];

function MobileStepCard({ step }: { step: Step }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* Ghost Number */}
      <Image
        src={step.ghostIcon}
        alt="step number"
        width={96}
        height={96}
        className={`absolute opacity-100 ${step.mobileGhostClassName}`}
      />

      {/* Icon */}
      <div
        className="relative z-20 mb-4 flex items-center justify-center"
        style={{
          width: `${step.mobileIconBoxSize}px`,
          height: `${step.mobileIconBoxSize}px`,
        }}
      >
        <Image
          key={step.id}
          src={step.icon}
          alt="step icon"
          width={step.mobileIconImageSize}
          height={step.mobileIconImageSize}
          unoptimized
          style={{
            maxWidth: "none",
          }}
          className="shrink-0 object-contain"
        />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <h3
          className={`pb-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] ${
            step.titleColor === "teal" ? "text-brand-text" : "text-primary-text"
          }`}
        >
          {step.title}
        </h3>

        <p className="mt-5 text-[17px] leading-[32px] text-[#6B7280]">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FBFBFB] py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <div className="mx-auto flex h-7.5 w-fit items-center gap-1 rounded-[24px] bg-[#F2FDFE] pr-5.5 pl-3.5">
            <Image
              src="/target_assets/icon-flash.svg"
              alt=""
              width={16}
              height={16}
            />
            <p className="text-brand font-sfpror text-[12px] leading-4 font-medium">
              Your Journey Starts Here
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-6 max-w-[900px] text-[34px] leading-[1.05] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]">
            Create the profile people should find first
          </h2>
        </motion.div>

        {/* DESKTOP */}
        <div className="relative mx-auto hidden h-[580px] w-full max-w-[1180px] lg:block">
          {/* Wave */}
          <div className="absolute top-[220px] left-1/2 z-0 w-[820px] -translate-x-1/2">
            <Image
              src="/journey/Wave.svg"
              alt="wave"
              width={820}
              height={260}
              className="h-auto w-full"
              priority
            />
          </div>

          {/* STEP 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute top-[190px] left-[80px] w-[300px]"
          >
            <Image
              src={steps[0].ghostIcon}
              alt="step number"
              width={160}
              height={160}
              className="absolute top-[-105px] left-[130px] z-0 opacity-100"
            />

            <div className="absolute top-[150px] left-[100px] z-20 -translate-x-1/2 -translate-y-1/2">
              <Image
                src={steps[0].icon}
                alt="step icon"
                width={43}
                height={43}
              />
            </div>

            <div className="relative z-10 -translate-x-12">
              <h3 className="text-[28px] leading-[1.05] font-semibold tracking-[-0.04em] text-[#00798C]">
                {steps[0].title}
              </h3>

              <p className="mt-4 max-w-[275px] text-[16px] leading-[1.75] text-[#6B7280]">
                {steps[0].description}
              </p>
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute top-[325px] left-[500px] w-[310px]"
          >
            <Image
              src={steps[1].ghostIcon}
              alt="step number"
              width={160}
              height={160}
              className="absolute top-[-40px] left-[130px] z-0 opacity-100"
            />

            <div className="absolute top-[-130px] left-[145px] z-20">
              <Image
                src={steps[1].icon}
                alt="step icon"
                width={64}
                height={64}
              />
            </div>

            <div className="relative z-10 -translate-x-8 pt-15">
              <h3 className="text-label-text text-[28px] leading-[1.05] font-semibold tracking-[-0.04em]">
                {steps[1].title}
              </h3>

              <p className="mt-4 max-w-[285px] text-[16px] leading-[1.75] text-[#6B7280]">
                {steps[1].description}
              </p>
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute top-[315px] left-[815px] w-[340px]"
          >
            <Image
              src={steps[2].ghostIcon}
              alt="step number"
              width={160}
              height={160}
              className="absolute top-[-35px] left-[250px] z-0 opacity-100"
            />

            <div className="absolute top-[-60px] left-[165px] z-20">
              <Image
                src={steps[2].icon}
                alt="step icon"
                width={64}
                height={64}
              />
            </div>

            <div className="relative z-10 pt-18">
              <h3 className="max-w-[335px] text-[28px] leading-[1.12] font-semibold tracking-[-0.04em] text-[#202020]">
                {steps[2].title}
              </h3>

              <p className="mt-4 max-w-[320px] text-[16px] leading-[1.75] text-[#6B7280]">
                {steps[2].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* MOBILE */}
        <div className="mt-20 flex flex-col gap-24 lg:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
            >
              <MobileStepCard step={step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
