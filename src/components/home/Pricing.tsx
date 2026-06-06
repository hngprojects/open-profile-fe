"use client";

import { Check } from "lucide-react";
import { motion, Variants } from "motion/react";
import { useState } from "react";
import { Button } from "../ui/button";

interface PricingPlan {
  name: string;
  priceMonth: string;
  priceYear: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  featureTitle?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    priceMonth: "0",
    priceYear: "0",
    features: [
      "Public profile (basic)",
      "Username URL",
      "Add links",
      "Limited template",
      "Email verification",
      "Search visibility",
    ],
    buttonText: "Get Started with free",
  },
  {
    name: "Pro",
    priceMonth: "8",
    priceYear: "80",
    featureTitle: "Includes everything in free +",
    features: [
      "Verification badge",
      "Unlimited links",
      "Custom themes (colors, fonts)",
      "Priority in search results",
      "Analytics (profile views, clicks)",
      "Username URL",
    ],
    buttonText: "Get Started with Pro",
    highlighted: true,
  },
  {
    name: "Elite",
    priceMonth: "20",
    priceYear: "200",
    featureTitle: "Includes everything in Pro +",
    features: [
      "Custom domain (yourname.com)",
      "Advanced analytics",
      "Featured placement in search",
      "Invite growth tools",
      "Early access features",
      "Priority support",
    ],
    buttonText: "Get Started with elite",
  },
];

export function Pricing() {
  const [isYear, setIsYear] = useState(false);
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
    <section id="pricing" className="bg-primary-bg w-full py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto flex max-w-7xl flex-col items-center px-4 md:px-8"
      >
        <motion.h2
          variants={itemVariants}
          className="text-primary-text mb-10 text-center text-[28px] font-semibold md:text-[40px]"
        >
          Choose the plan that fits your needs.
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="border-primary-foreground-b mb-10 inline-flex items-center rounded-2xl border bg-white text-center transition-all duration-300"
        >
          <Button
            variant={null}
            size="lg"
            onClick={() => setIsYear(false)}
            className={`w-28 cursor-pointer rounded-2xl px-4 py-3 font-semibold ${
              !isYear ? "bg-brand text-white" : "text-tertiary-foreground-text"
            }`}
          >
            Month
          </Button>
          <Button
            variant={null}
            size="lg"
            onClick={() => setIsYear(true)}
            className={`w-28 cursor-pointer rounded-2xl px-4 py-3 font-semibold ${
              isYear ? "bg-brand text-white" : "text-tertiary-foreground-text"
            }`}
          >
            Year
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex h-full flex-col rounded-[16px] border p-4 xl:p-8 ${
                plan.highlighted
                  ? "bg-brand-hover-bg border-brand text-white"
                  : "border-primary-foreground-b text-primary-text bg-white"
              }`}
            >
              <div className="mb-8">
                <p
                  className={`mb-4 text-base font-medium ${
                    plan.highlighted
                      ? "text-white"
                      : "text-tertiary-foreground-text"
                  }`}
                >
                  {plan.name}
                </p>
                <div
                  className={`flex items-baseline gap-1 border-b ${
                    plan.highlighted
                      ? "border-white/20"
                      : "border-primary-foreground-b"
                  }`}
                >
                  {isYear ? (
                    <span>
                      <span className="text-[36px] font-bold">
                        ${plan.priceYear}
                      </span>
                      <span
                        className={`text-base ${
                          plan.highlighted
                            ? "text-white/80"
                            : "text-tertiary-foreground-text"
                        }`}
                      >
                        /year
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span className="text-[36px] font-bold">
                        ${plan.priceMonth}
                      </span>
                      <span
                        className={`text-base ${
                          plan.highlighted
                            ? "text-white/80"
                            : "text-tertiary-foreground-text"
                        }`}
                      >
                        /month
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <p
                  className={`mb-6 text-[14px] font-bold ${
                    plan.highlighted ? "text-white" : "text-primary-text"
                  }`}
                >
                  {plan.featureTitle || "Includes:"}
                </p>
                <ul className="mb-10 space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-[14px]"
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.highlighted
                            ? "text-white"
                            : "text-link-hover-text"
                        }`}
                      />
                      <span
                        className={
                          plan.highlighted
                            ? "text-white"
                            : "text-tertiary-foreground-text"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled
                className={`flex h-auto w-full items-center justify-center rounded-[8px] py-4 text-[14px] font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                  plan.highlighted
                    ? "text-link-hover-text border border-transparent bg-white"
                    : "text-link-hover-text border-brand border bg-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
