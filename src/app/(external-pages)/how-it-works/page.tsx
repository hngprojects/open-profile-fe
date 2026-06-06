"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "@/components/home/Journey";
import { ROUTES } from "@/constants/routes";

export default function HowItWorksPage() {
  const data = [
    "Show up when people search your name",
    "One profile for everything",
    "Build credibility with verification",
    "Grow your reach through invites",
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-19 flex flex-col items-center justify-center space-y-1 py-10 text-center lg:py-17"
      >
        <h1 className="text-[36px] leading-18 font-semibold tracking-[-1.51px] lg:text-[50px] lg:leading-18">
          Get started in simple steps
        </h1>
        <h3 className="text-label-text max-w-md text-[15px] leading-6.5 lg:max-w-full">
          No design skills needed. No coding required. Just you and your work.
        </h3>
      </motion.div>

      <div className="mx-auto flex w-[90%] flex-col gap-2 py-20 lg:w-[70%]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-100 self-center lg:self-start"
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={steps[0].ghostIcon}
              alt="step number"
              width={160}
              height={160}
              className="z-0 opacity-100"
            />
          </div>

          <Image src={steps[0].icon} alt="step icon" width={43} height={43} />

          <div className="relative z-10">
            <h3 className="text-brand text-[28px] leading-[1.05] font-bold tracking-[-0.04em]">
              {steps[0].title}
            </h3>

            <p className="text-secondary-foreground-text text-[16px] leading-[1.75]">
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
          className="w-100 self-center lg:self-end"
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={steps[1].ghostIcon}
              alt="step number"
              width={160}
              height={160}
              className="z-0 opacity-100"
            />
          </div>

          <Image src={steps[1].icon} alt="step icon" width={50} height={50} />

          <div className="relative z-10">
            <h3 className="text-label-text text-[28px] leading-[1.05] font-bold tracking-[-0.04em]">
              {steps[1].title}
            </h3>

            <p className="text-secondary-foreground-text text-[16px] leading-[1.75]">
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
          className="w-100 self-center lg:self-start"
        >
          <div className="flex justify-center lg:justify-end">
            <Image
              src={steps[2].ghostIcon}
              alt="step number"
              width={160}
              height={160}
              className="z-0 opacity-100"
            />
          </div>

          <Image src={steps[2].icon} alt="step icon" width={50} height={50} />

          <div className="relative z-10">
            <h3 className="text-[28px] leading-[1.12] font-bold tracking-[-0.04em] text-[#202020]">
              {steps[2].title}
            </h3>

            <p className="text-secondary-foreground-text text-[16px] leading-[1.75]">
              {steps[2].description}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="bg-brand-progress-bg mx-auto mt-10 p-5 lg:pt-16 lg:pb-20"
      >
        <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3 font-semibold">
              <Image
                src="/Container.svg"
                alt={`FAQ ${index + 1}`}
                width={24}
                height={24}
              />
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
              >
                {item}
              </motion.p>
            </div>
          ))}
        </div>
      </motion.div>

      <section className="mt-39 px-4 pb-10 lg:mt-0 lg:border-t lg:border-b lg:pt-12.75">
        <div className="mx-auto max-w-7xl">
          <div className="bg-brand relative mx-auto flex w-full max-w-6xl items-center justify-between overflow-hidden rounded-[8px] px-4 py-10 md:rounded-[32px] lg:px-16 lg:py-18">
            <div className="relative z-10 max-w-md space-y-6">
              <div className="flex flex-col gap-2">
                <p className="text-[32px] leading-[1.2] font-semibold tracking-tight text-[#FEFEFE] md:whitespace-nowrap">
                  Be the profile people find first
                </p>
                <p className="leading-relaxed font-normal text-[#FEFEFE] md:text-[18px]">
                  Create one searchable profile that shows who you are, what you
                  do and why people should trust you
                </p>
              </div>
              <div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-[12px] p-6"
                >
                  <Link href={`${ROUTES.auth.signup}`}>
                    Create Your Profile Now
                  </Link>
                </Button>
              </div>
            </div>
            <div className="absolute right-0 hidden md:block md:h-65 md:w-[320px] lg:h-82.5 lg:w-100">
              <Image src="/cta/cta.svg" className="object-cover" alt="" fill />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
