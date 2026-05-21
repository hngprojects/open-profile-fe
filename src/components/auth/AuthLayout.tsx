"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <div className="flex justify-center pt-6">
        <Link href="/">
          <Image
            src="/auth/logo.png"
            alt="Open.Profile"
            width={140}
            height={32}
            priority
            className="mb-12"
          />
        </Link>
      </div>

      <div
        className={`relative flex flex-1 items-center justify-center px-4 ${pathname !== "/create-profile" ? "py-10" : "md:mt-0"}`}
      >
        <div className="absolute bottom-15 left-0 z-0 hidden lg:block">
          <Image
            src="/auth/left-img.png"
            alt=""
            width={270}
            height={350}
            className="object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-input-b relative z-10 flex w-full max-w-2xl flex-col gap-5 rounded-2xl border bg-[#FEFEFE] px-6 py-8 shadow-none sm:px-20 sm:py-14"
        >
          <Button
            variant="links"
            onClick={() => router.back()}
            aria-label="Go back"
            className={`text-link-hover-text flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#065E69] ${pathname !== "/login" ? "hidden" : "flex"}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Button>
          {children}
        </motion.div>

        <div className="absolute top-15 right-0 z-0 hidden lg:block">
          <Image
            src="/auth/right-img.png"
            alt=""
            width={270}
            height={350}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
