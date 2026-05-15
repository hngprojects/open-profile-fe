"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, Variants } from "motion/react";

const faqData = [
  {
    question: "Is OpenProfile free to Use ?",
    answer:
      "Yes! Creating your profile and getting verified is completely free. There are no hidden fees or credit card requirements.",
  },
  // {
  //   question: "How does verification work ?",
  //   answer:
  //     "Verification is a seamless process. We verify your identity through your connected social accounts and professional credentials to ensure every profile on our platform is authentic and trusted.",
  // },
  {
    question: "Can people find me if I don't share my profile link ?",
    answer:
      "By default, your profile is accessible via your unique link. However, you can choose to be discoverable in our global directory, allowing others to find you based on your skills and profession.",
  },
  // {
  //   question: "What happens when someone invites me ?",
  //   answer:
  //     "When someone invites you, you'll receive an instant notification. This allows you to connect, collaborate, and explore new opportunities within the OpenProfile ecosystem.",
  // },
  {
    question: "Can I customize my profile",
    answer:
      "Absolutely! You can personalize your profile with your own branding, featured projects, social links, and bio to truly make it your own.",
  },
];

export function FAQ() {
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
    <section className="w-full bg-[#FEFEFE] py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-7xl px-4 md:px-8"
      >
        <div className="mb-10 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-[32px] font-semibold tracking-tight text-[#050505] md:text-[40px]"
          >
            Frequently asked questions
          </motion.h2>
        </div>

        <motion.div variants={containerVariants} className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-[#E5E5E5]"
                >
                  <AccordionTrigger className="px-0 hover:no-underline">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-6 text-[15px] leading-relaxed text-[#525252]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}
