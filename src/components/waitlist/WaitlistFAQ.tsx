"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, Variants } from "motion/react";

const waitlistFaqData = [
  {
    question: "What exactly is Open Profile?",
    answer:
      "Open Profile is a modern identity link that brings together your LinkedIn, portfolio, socials, projects, and professional presence into one public profile.",
  },
  {
    question: "What platforms can I connect?",
    answer:
      "You can connect LinkedIn, GitHub, X (Twitter), Behance, Dribbble, and any custom links you choose to showcase your full professional spectrum.",
  },
  {
    question: "Will my profile be searchable?",
    answer:
      "Yes, you can choose to be discoverable in our global directory, allowing clients and recruiters to find you based on your verified skills and profession.",
  },
  {
    question: "Do I need a personal website?",
    answer:
      "No! Open Profile is designed to replace the need for a complex personal website by providing a sleek, professional, and easy-to-manage profile.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, our core features including profile creation and verification are and will always be free for individual professionals.",
  },
];

export function WaitlistFAQ() {
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
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto max-w-[800px] px-6 md:px-8"
      >
        <div className="mb-12 text-center">
          <motion.h2
            variants={itemVariants}
            className="text-[32px] font-semibold text-[#050505] md:text-[40px]"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            FAQs
          </motion.h2>
        </div>

        <motion.div variants={containerVariants}>
          <Accordion type="single" collapsible className="w-full">
            {waitlistFaqData.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-[#E5E5E5]"
                >
                  <AccordionTrigger className="py-6 hover:no-underline">
                    <span
                      className="text-left text-[16px] font-medium text-[#050505] md:text-[18px]"
                      style={{ fontFamily: "'Afacad', sans-serif" }}
                    >
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-label-text pb-6 text-[15px] leading-relaxed md:text-[16px]"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                  >
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
