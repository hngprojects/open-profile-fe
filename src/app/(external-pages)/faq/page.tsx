"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FaqPage() {
  const faqData = [
    {
      question: "Is OpenProfile free to Use ?",
      answer:
        "Yes! Creating your profile and getting verified is completely free. There are no hidden fees or credit card requirements.",
    },

    {
      question: "How do I share my profile",
      answer:
        "You can share your profile by copying your unique username link (e.g., openprofile.com/username) and adding it to your social media bios, email signature, resume, or portfolio.",
    },
    {
      question: "What types of information can I add to my profile?",
      answer:
        "You can customize your profile by adding your bio, professional title, location, profile picture, social media links (LinkedIn, GitHub, X, etc.), custom links to portfolios, projects, work history, and skills.",
    },
    {
      question: "How many links can I add?",
      answer:
        "There is no limit! You can add as many links and projects as you want to showcase your complete professional presence in one place.",
    },
    {
      question: "Can I change my profile picture anytime?",
      answer:
        "Yes, you can update your profile picture, bio, and other information at any time from your account settings or profile builder dashboard.",
    },
    {
      question: "Will my profile changes be visible instantly?",
      answer:
        "Yes, any updates or changes you make on your profile builder are saved and reflected on your public profile instantly after publishing.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "If you forget your password, simply click the 'Forgot Password' link on the login page. We will send you an email with instructions and a link to securely reset it.",
    },
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
        className="mt-19 flex flex-col items-center justify-center space-y-1 bg-[#DBEFF2] py-10 text-center lg:py-17"
      >
        <p className="text-[36px] leading-18 font-semibold tracking-[-1.51px] lg:text-[60px] lg:leading-18">
          Frequently asked questions
        </p>
        <p className="text-label-text max-w-82.5 text-[18px] leading-6.5 lg:max-w-full">
          Still have questions? Our support team is here to assist.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto mt-10 lg:pt-16 lg:pb-20"
      >
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-182.5"
        >
          {faqData.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger
                  className={`border-t px-6 text-[20px] hover:no-underline ${index === 0 ? "border-t-0" : ""}`}
                >
                  <span className="pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-[18px] leading-relaxed text-[#525252]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      <section className="mt-[153px] px-4 pb-10 lg:mt-0 lg:border-t lg:border-b lg:pt-12.75">
        <div className="mx-auto max-w-7xl">
          <div className="bg-brand relative mx-auto flex w-full max-w-6xl items-center justify-between overflow-hidden rounded-[8px] px-4 py-10 md:rounded-[32px] lg:px-16 lg:py-18">
            <div className="relative z-10 max-w-105 space-y-6">
              <div className="flex flex-col gap-2">
                <p className="text-[32px] leading-[1.2] font-semibold tracking-tight text-[#FEFEFE] md:whitespace-nowrap">
                  Be the profile people find first
                </p>
                <p className="leading-relaxed font-normal text-[#FEFEFE] md:text-[15px]">
                  Create one searchable profile that shows who you are, what you
                  do and why people should trust you
                </p>
              </div>
              <div>
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-[12px] p-6"
                >
                  <Link href="/signup">Create Your Profile Now</Link>
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
