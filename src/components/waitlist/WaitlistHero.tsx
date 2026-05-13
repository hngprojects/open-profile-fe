"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { joinWaitlistAction } from "@/app/actions/waitlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" } as const,
});

export function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleBlur = () => {
    if (email && !EMAIL_RE.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);

      const result = await joinWaitlistAction(undefined, formData);

      if (result?.success) {
        toast.success("Successfully joined the waitlist!");
        setEmail("");
        setEmailError("");
      } else if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#FAFAFA] px-6 pt-8 md:h-[700px] md:min-h-[700px] md:pt-12">
      {/* Background Images */}
      <div className="pointer-events-none absolute bottom-0 -left-0 hidden select-none lg:block">
        <Image
          src="/waitlist/image-left.svg"
          alt=""
          width={400}
          height={600}
          priority
          className="h-[500px] w-auto"
          style={{ width: "auto" }}
        />
      </div>
      <div className="pointer-events-none absolute -top-[5px] -right-0 hidden select-none lg:block">
        <Image
          src="/waitlist/image-right.svg"
          alt=""
          width={400}
          height={600}
          priority
          className="h-[500px] w-auto"
          style={{ width: "auto" }}
        />
      </div>

      {/* Logo */}
      <motion.div {...fadeUp(0)} className="z-10 mt-10 mb-16 md:mb-24">
        <Image
          src="/logo.svg"
          alt="Open Profile"
          width={170}
          height={32}
          className="h-[32px] w-auto"
          style={{ width: "auto" }}
        />
      </motion.div>

      {/* Content */}
      <div className="z-10 flex w-full max-w-[800px] flex-col items-center text-center">
        <motion.h1
          {...fadeUp(0.1)}
          className="mb-6 text-[40px] leading-[1.1] font-semibold tracking-[-1.5px] text-[#050505] md:text-[60px]"
          style={{ fontFamily: "'Afacad', sans-serif" }}
        >
          Join the waitlist for <br className="hidden md:block" />
          <span className="text-link-hover-text">Openprofile</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-label-text mb-10 max-w-[740px] text-[16px] leading-[26px] md:text-[18px]"
          style={{ fontFamily: "'Afacad', sans-serif" }}
        >
          Stop losing clients to identity doubt. Open Profile is the first
          searchable identity platform with built-in verification, designed to
          turn your online presence into a professional powerhouse.
        </motion.p>

        {/* Form */}
        <motion.form
          {...fadeUp(0.3)}
          onSubmit={handleSubmit}
          className="mb-2 flex w-full max-w-[580px] flex-col gap-2.5 px-0 md:flex-row"
        >
          <div className="flex flex-1 flex-col items-start gap-1.5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              onBlur={handleBlur}
              disabled={isPending}
              className={`h-[50px] w-full rounded-[8px] border bg-[#FAFAFA] px-4 text-[#050505] transition-colors outline-none placeholder:text-[#999] ${
                emailError
                  ? "border-red-400"
                  : "border-[#E5E5E5] focus:border-[#087583]"
              }`}
              style={{ fontFamily: "'Afacad', sans-serif" }}
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="h-[50px] w-full rounded-[8px] bg-[#262626] px-8 font-medium whitespace-nowrap text-white transition-colors hover:bg-[#333] disabled:opacity-50 md:w-auto"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            {isPending ? "Joining..." : "Join the Waitlist"}
          </button>
        </motion.form>

        {/* Error message */}
        <div className="mb-2 h-6 w-full max-w-[580px] text-left">
          {emailError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium text-red-500"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              {emailError}
            </motion.p>
          )}
        </div>

        {/* Social Proof */}
        <motion.div {...fadeUp(0.4)} className="flex items-center gap-1">
          <div className="relative h-8 w-[60px]">
            <Image
              src="/waitlist/users.svg"
              alt="Users"
              fill
              className="object-contain object-left"
            />
          </div>
          <p
            className="text-label-text text-[14px] md:text-[15px]"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            <span className="hidden md:inline">
              Join the waitlist to secure your verified badge and unique URL
            </span>
            <span className="inline md:hidden">
              Join over 2000+ creators and freelancers that trusts us all over
              the world.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
