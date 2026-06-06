"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserOption } from "@/api/auth/auth.options";
import { ROUTES } from "@/constants/routes";
import { useAuthCookie } from "@/hooks/useAuthCookie";
import { Button } from "@/components/ui/button";

export function HomeAuthCTA() {
  const hasAuthCookie = useAuthCookie();
  const { data: user, isPending } = useQuery({
    ...getCurrentUserOption(),
    enabled: hasAuthCookie,
    throwOnError: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || (hasAuthCookie && isPending)) {
    return (
      <div className="mt-8 flex w-full max-w-[512px] flex-col items-center gap-3 sm:flex-row lg:mt-10">
        <div className="bg-secondary-bg/50 h-12.5 w-full animate-pulse rounded-[8px] sm:w-[150px]" />
      </div>
    );
  }

  return (
    <div className="mt-8 flex w-full max-w-[512px] flex-col items-center gap-3 sm:flex-row lg:mt-10">
      {user ? (
        <Button
          asChild
          className="bg-brand hover:bg-brand-hover h-12.5 w-full rounded-[8px] px-8 text-[16px] font-medium text-white transition-colors sm:w-auto"
          style={{ fontFamily: "'Afacad', sans-serif" }}
        >
          <Link href={ROUTES.dashboard.home}>Go to dashboard</Link>
        </Button>
      ) : (
        <>
          <Button
            asChild
            variant="outline"
            className="h-12.5 w-full rounded-[8px] border-[#E5E5E5] px-8 text-[16px] font-medium text-[#050505] transition-colors hover:bg-[#F5F5F5] sm:w-auto"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            asChild
            className="bg-brand hover:bg-brand-hover h-12.5 w-full rounded-[8px] px-8 text-[16px] font-medium text-white transition-colors sm:w-auto"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            <Link href="/signup">Sign up for free</Link>
          </Button>
        </>
      )}
    </div>
  );
}
