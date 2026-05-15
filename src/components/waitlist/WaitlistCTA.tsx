"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import { joinWaitlistAction } from "@/app/actions/waitlist";
import { Button } from "../ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" } as const,
});

export function WaitlistCTA() {
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
    <section className="relative w-full overflow-hidden bg-[#FAFAFA] px-6 py-16">
      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-auto w-auto select-none lg:block">
        <Image
          src="/waitlist/cta-left.svg"
          alt=""
          width={400}
          height={400}
          className="h-[400px] w-auto object-contain"
          style={{ width: "auto" }}
        />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 hidden h-auto w-auto select-none lg:block">
        <Image
          src="/waitlist/cta-right.svg"
          alt=""
          width={400}
          height={600}
          className="h-[400px] w-auto object-contain"
          style={{ width: "auto" }}
        />
      </div>

      <div className="bg-inverse-bg relative mx-auto flex max-w-[1280px] flex-col items-center overflow-hidden rounded-[24px] px-6 py-16 text-center md:px-12">
        <div className="relative z-10 flex w-full max-w-[700px] flex-col items-center">
          <motion.h2
            {...fadeUp(0)}
            className="mb-4 text-[32px] leading-[1.2] font-semibold text-white md:text-[48px]"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            Ready to own your online identity?
          </motion.h2>

          <motion.p
            {...fadeUp(0.1)}
            className="mb-10 max-w-[540px] text-[16px] text-[#E5E5E5] md:text-[18px]"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            Join the waitlist and be among the first to access the new way to
            present yourself online.
          </motion.p>

          <motion.form
            {...fadeUp(0.2)}
            onSubmit={handleSubmit}
            className="mb-2 flex w-full max-w-125 flex-col gap-3 md:flex-row"
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                onBlur={handleBlur}
                disabled={isPending}
                className={`h-13.5 w-full rounded-[10px] border bg-white px-5 text-[#050505] transition-colors outline-none placeholder:text-[#999] ${
                  emailError
                    ? "border-red-400"
                    : "border-transparent focus:border-[#087583]"
                }`}
                style={{ fontFamily: "'Afacad', sans-serif" }}
              />
            </div>
            <Button type="submit" disabled={isPending} className="h-13.5 px-8">
              {isPending ? "Joining..." : "Get Early Access"}
            </Button>
          </motion.form>

          {/* Error message */}
          <div className="h-6 w-full text-center">
            {emailError && (
              <p
                className="text-xs font-medium text-red-400"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                {emailError}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
