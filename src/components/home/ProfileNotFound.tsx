"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getBaseDisplayUrl } from "@/utils/profile";

export function ProfileNotFound() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const raw = pathname?.split("/")[1] ?? "";

  const searched = (() => {
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  })();

  function handleSearch() {
    const username = query.trim();
    if (!username || isLoading) return;
    setIsLoading(true);
    router.push(`/${encodeURIComponent(username)}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-white px-6 py-6">
      <Link href="/">
        <Image
          src="/auth/logo.png"
          alt="Open.Profile"
          width={140}
          height={32}
          priority
        />
      </Link>

      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-6">
        {/* Search bar */}
        <div className="flex w-full max-w-[512px] flex-col gap-1.75 sm:flex-row">
          <div className="border-secondary-b bg-primary-bg focus-within:ring-brand-hover-bg/40 flex h-12 min-h-12 flex-1 items-center rounded-[5.57px] border px-3.5 focus-within:ring-2 lg:h-12.5 lg:min-h-12.5">
            <span
              className="text-label-text shrink-0 text-[16px] leading-6 select-none"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              {getBaseDisplayUrl()}/
            </span>
            <input
              type="text"
              aria-label="Search username"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="username"
              className="placeholder:text-secondary-b text-label-text h-full min-w-0 flex-1 bg-transparent text-[16px] leading-6 outline-none disabled:opacity-50"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-link-hover-text hover:bg-button-brand-bg h-12 w-full rounded-[8px] px-4 text-[16px] leading-6 whitespace-nowrap text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto lg:h-12.5"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              "Search a Profile"
            )}
          </Button>
        </div>

        {/* Error state */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="bg-brand-hover-bg/8 flex h-14 w-14 items-center justify-center rounded-full">
            <SearchX className="text-link-hover-text h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p
              className="text-primary-text text-[18px] font-semibold"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              Your search for{" "}
              <span className="text-link-hover-text">
                &quot;{searched}&quot;
              </span>{" "}
              was not found
            </p>
            <p
              className="text-label-text text-[15px]"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            >
              Double-check the username or try a different one.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
