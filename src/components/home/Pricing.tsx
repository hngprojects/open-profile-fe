"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "motion/react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  featureTitle?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "0",
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
    price: "8",
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
    price: "20",
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
    <section className="w-full bg-[#FAFAFA] py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto flex max-w-7xl flex-col items-center px-4 md:px-8"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-10 text-center text-[28px] font-semibold text-[#050505] md:text-[40px]"
        >
          Choose the plan that fits your needs.
        </motion.h2>

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
                  ? "bg-brand-hover-bg border-[#087583] text-white"
                  : "border-[#E5E5E5] bg-white text-[#050505]"
              }`}
            >
              <div className="mb-8">
                <p
                  className={`mb-4 text-[16px] font-medium ${
                    plan.highlighted ? "text-white" : "text-[#525252]"
                  }`}
                >
                  {plan.name}
                </p>
                <div
                  className={`flex items-baseline gap-1 border-b ${
                    plan.highlighted ? "border-white/20" : "border-[#E5E5E5]"
                  }`}
                >
                  <span className="text-[36px] font-bold">${plan.price}</span>
                  <span
                    className={`text-[15px] ${
                      plan.highlighted ? "text-white/80" : "text-[#525252]"
                    }`}
                  >
                    /month
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <p
                  className={`mb-6 text-[14px] font-bold ${
                    plan.highlighted ? "text-white" : "text-[#050505]"
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
                          plan.highlighted ? "text-white" : "text-[#525252]"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                className={`h-auto w-full rounded-[8px] py-4 text-[14px] font-bold transition-all duration-300 ${
                  plan.highlighted
                    ? "text-link-hover-text border-transparent bg-white hover:bg-white/95"
                    : "text-link-hover-text hover:bg-brand-hover-bg/5 border-[#087583] bg-white"
                }`}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
