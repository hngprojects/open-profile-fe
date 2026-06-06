"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOption } from "@/api/auth/auth.options";
import { ROUTES } from "@/constants/routes";
import { useAuthCookie } from "@/hooks/useAuthCookie";

export function CTA() {
  const hasAuthCookie = useAuthCookie();
  const { data: user } = useQuery({
    ...getCurrentUserOption(),
    enabled: hasAuthCookie,
    throwOnError: false,
  });

  return (
    <section className="bg-[#FAFAFA] px-4 py-24 md:px-8 md:py-26">
      <div className="mx-auto max-w-7xl">
        <div className="bg-brand relative mx-auto flex w-full max-w-6xl items-center justify-between overflow-hidden rounded-[24px] px-8 py-9 md:rounded-[32px] lg:px-16 lg:py-18">
          <div className="relative z-10 max-w-105 space-y-4">
            <h2 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-[#FEFEFE] md:text-[32px] md:whitespace-nowrap">
              Be the profile people find first
            </h2>

            <p className="text-[14px] leading-relaxed font-normal text-[#FEFEFE] md:text-[15px]">
              Create one searchable profile that shows who you are, what you do
              and why people should trust you
            </p>

            <div className="pt-3">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-[12px] p-6"
                asChild
              >
                <Link href={user ? ROUTES.dashboard.home : "/signup"}>
                  {user ? "Go to Dashboard" : "Get started for free"}
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
  );
}
