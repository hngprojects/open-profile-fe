"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOption } from "@/api/auth/auth.options";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: user } = useQuery(getCurrentUserOption());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 w-full border-b border-[#EDEDED] transition-colors duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md" : "bg-white"}`}
      >
        <nav className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between gap-8 px-5 md:px-10 lg:px-[112px]">
          {/* Logo */}
          <Link href="/#" className="flex shrink-0 items-center gap-1">
            <Image
              src="/logo.svg"
              alt="Open Profile"
              width={170}
              height={32}
              className="h-[30px] w-auto md:h-[28px] lg:h-[32px]"
              style={{ width: "auto" }}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <Link
              href="#how-it-works"
              className="text-[17px] leading-[26px] font-medium text-[#050505] transition-colors hover:text-[#087583]"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="text-[16px] leading-[24px] font-medium text-[#050505] transition-colors hover:text-[#087583]"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-[16px] leading-[24px] font-medium text-[#050505] transition-colors hover:text-[#087583]"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              FAQ
            </Link>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-brand hover:bg-brand-hover flex h-[44px] items-center justify-center rounded-[8px] px-[16px] py-[12px] text-[15px] font-medium whitespace-nowrap text-white transition-colors"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex h-[44px] items-center justify-center rounded-[8px] bg-[#FAFAFA] px-[16px] py-[12px] text-[15px] font-semibold text-[#087583] transition-colors hover:bg-[#E5F4F6]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-brand hover:bg-brand-hover flex h-[44px] items-center justify-center rounded-[8px] px-[16px] py-[12px] text-[15px] font-medium whitespace-nowrap text-white transition-colors"
                  style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="z-50 flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-[#050505] transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[#050505] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-[#050505] transition-transform duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
          >
            <div className="flex h-[76px] items-center justify-between border-b border-[#EDEDED] px-6">
              <span
                className="text-[18px] font-semibold text-[#087583]"
                style={{ fontFamily: "'Afacad', sans-serif" }}
              >
                Menu
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#050505]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-8 px-6 pt-8">
              {[
                { label: "How it works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[18px] font-medium text-[#050505]"
                  style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 px-6 pb-10">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="bg-brand hover:bg-brand-hover flex h-[52px] w-full items-center justify-center rounded-[10px] text-[16px] font-medium text-white"
                  style={{ fontFamily: "'Afacad', sans-serif" }}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-[52px] w-full items-center justify-center rounded-[10px] border border-[#EDEDED] bg-[#F5F5F5] text-[16px] font-semibold text-[#087583]"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="bg-brand hover:bg-brand-hover flex h-[52px] w-full items-center justify-center rounded-[10px] text-[16px] font-medium text-white"
                    style={{ fontFamily: "'Afacad', sans-serif" }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
