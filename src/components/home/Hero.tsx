"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleCheck, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBaseDisplayUrl } from "@/utils/profile";
import { useDebounce } from "@/hooks/useDebounce";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { searchProfilesOption } from "@/api/search/search.options";

const profiles = [
  {
    name: "James Smith",
    role: "Junior Product Designer",
    img: "/hero/large-profile1.jpg",
    mobileImg: "/hero/mobile-profilei.jpg",
  },
  {
    name: "Sandra Mensah",
    role: "Indie Hacker • Solo Founder",
    img: "/hero/large-profile2.jpg",
    mobileImg: "/hero/mobile-profileii.jpg",
  },
  {
    name: "Emmanuel Imoh",
    role: "Content Creator",
    img: "/hero/large-profile3.jpg",
    mobileImg: "/hero/mobile-profileiii.jpg",
  },
];

const miniAvatars = [
  "/hero/mini-profile1.png",
  "/hero/mini-profile2.jpg",
  "/hero/mini-profile3.jpg",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
});

export function Hero() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [inputFocused, setInputFocused] = useState(false);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const searchContainerRef = useOutsideClick(() => setInputFocused(false));

  const {
    data: searchData,
    isFetching,
    isError,
    error,
  } = useQuery({
    ...searchProfilesOption(debouncedQuery, 1, 2),
    enabled: debouncedQuery.trim().length >= 3,
  });

  const displayUrl = getBaseDisplayUrl();

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % profiles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isError && error) {
      const axiosError = error as unknown as AxiosError;
      const status = axiosError.response?.status;
      if (status === 429) {
        toast.error("Too many searches. Please slow down.");
      } else if (status !== 400) {
        toast.error("Search failed. Please check your connection.");
      }
    }
  }, [isError, error]);

  const getProfile = (offset: number) =>
    profiles[(current + offset) % profiles.length];

  function handleSearch() {
    const username = query.trim();
    if (username.length < 3) return;
    router.push(`/search?q=${encodeURIComponent(username)}`);
  }

  const showDropdown = inputFocused && debouncedQuery.trim().length >= 3;
  const searchResults = isError ? [] : searchData?.results || [];
  const isSearchPending = isFetching || query !== debouncedQuery;
  const previewResults = searchResults.slice(0, 2);
  const totalResults = searchData?.total || 0;
  const remainingCount = Math.max(0, totalResults - 2);

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col items-start gap-8 px-4 pt-[60px] pb-[40px] sm:px-6 md:pt-[80px] lg:flex-row lg:items-center lg:gap-4 lg:px-0">
        <div className="z-10 flex w-full shrink-0 flex-col gap-4 lg:max-w-[450px] xl:max-w-[500px]">
          <motion.h1
            {...fadeUp(0.05)}
            className="text-primary-text text-[38px] leading-[1.12] font-semibold tracking-[-1px] sm:text-[46px] md:text-[56px]"
          >
            Create{" "}
            <span className="relative mx-2 inline-block">
              <span className="text-link-hover-text absolute -top-5 left-1/2 -translate-x-1/2 text-xl leading-none tracking-wider whitespace-nowrap">
                \ | /
              </span>
              <span
                className="text-link-hover-text italic"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                One
              </span>
            </span>{" "}
            Searchable Profile People Can Find And Trust
          </motion.h1>

          <motion.p
            {...fadeUp(0.12)}
            className="text-primary-text max-w-[538px] text-[16px] leading-[26px] font-normal md:text-[18px]"
          >
            Turn your scattered online presence into one searchable profile that
            can show who you are, what you do, and why people should trust you.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="relative flex w-full max-w-[512px] flex-col items-stretch gap-1.75 sm:flex-row"
            ref={searchContainerRef}
          >
            <div className="border-secondary-b bg-primary-bg focus-within:ring-brand-hover-bg/40 relative flex h-12 min-h-12 flex-1 items-center rounded-[5.57px] border px-3.5 focus-within:ring-2 lg:h-12.5 lg:min-h-12.5">
              <span className="text-label-text shrink-0 text-[16px] leading-6 select-none">
                {displayUrl}/
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by name or username..."
                className="text-label-text placeholder:text-secondary-b h-full min-w-0 flex-1 bg-transparent pl-1 text-[16px] leading-6 outline-none disabled:opacity-50"
              />
              {isFetching && debouncedQuery.trim().length >= 3 && (
                <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin text-[#666]" />
              )}
            </div>
            <Button
              onClick={handleSearch}
              disabled={query.trim().length < 3}
              className="bg-link-hover-text hover:bg-button-brand-bg h-12 w-full rounded-[8px] px-4 text-[16px] leading-6 whitespace-nowrap text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#E5E5E5] disabled:text-[#A3A3A3] sm:w-auto lg:h-12.5"
            >
              Search a Profile
            </Button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="border-border absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-lg border bg-white shadow-lg"
                >
                  {isSearchPending && searchResults.length === 0 ? (
                    <div className="text-secondary-text p-4 text-center text-sm">
                      Searching...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-secondary-text p-4 text-center text-sm">
                      No profiles found for &quot;{debouncedQuery}&quot;.
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {previewResults.map((result) => (
                        <Link
                          key={result.id || result.username}
                          href={`/${result.username}`}
                          onClick={() => setInputFocused(false)}
                          className="border-border/50 flex items-center gap-3 border-b p-3 transition-colors last:border-0 hover:bg-[#FAFAFA]"
                        >
                          <Avatar className="border-border h-10 w-10 border">
                            <AvatarImage
                              src={
                                result.photoUrl ||
                                result.profilePicture ||
                                result.profileImage ||
                                result.avatar ||
                                ""
                              }
                            />
                            <AvatarFallback className="bg-brand text-xs text-white">
                              {(
                                result.fullName ||
                                result.name ||
                                result.username ||
                                "?"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-primary-text truncate text-[15px] font-semibold">
                              {result.fullName ||
                                result.name ||
                                result.username}
                            </span>
                            <span className="text-secondary-text truncate text-[13px]">
                              @{result.username}
                            </span>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(debouncedQuery)}`}
                        onClick={() => setInputFocused(false)}
                        className="border-border border-t bg-[#FEFEFE] p-3 text-center text-[14px] font-medium text-[#087583] transition-colors hover:bg-[#FAFAFA]"
                      >
                        {remainingCount > 0
                          ? `${remainingCount} more results, see more...`
                          : "See all results"}
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {query.trim().length > 0 && query.trim().length < 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 ml-1 flex items-center gap-1.5 overflow-hidden text-[13px] text-[#FF3158]"
              >
                <AlertCircle size={14} />
                <span>Please enter at least 3 characters to search</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            {...fadeUp(0.28)}
            className="mt-4 flex flex-row items-center gap-3"
          >
            <div
              className="relative shrink-0"
              style={{ height: "35px", width: "69px" }}
            >
              {miniAvatars.map((src, i) => (
                <div
                  key={i}
                  className="absolute overflow-hidden rounded-full border-[2.52px] border-white"
                  style={{
                    width: "35px",
                    height: "35px",
                    left: `${i * 17}px`,
                    zIndex: i + 1,
                  }}
                >
                  <Image
                    src={src}
                    alt={`User ${i + 1}`}
                    fill
                    sizes="35px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-secondary-text text-[14px] leading-[24px] font-normal md:text-[16px]">
              Join over Creators and freelancers that trusts us all over the
              world.
            </p>
          </motion.div>
        </div>

        <div className="relative hidden w-full flex-1 overflow-visible lg:block">
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: "-20px",
              width: "160px",
              background:
                "linear-gradient(to right, #ffffff 0%, #ffffff 40%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              right: "-40px",
              top: 0,
              bottom: "-20px",
              width: "220px",
              background:
                "linear-gradient(to left, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div className="flex w-full translate-x-[8px] items-start justify-center gap-4">
            {[0, 1, 2].map((offset, i) => {
              const p = getProfile(offset);
              return (
                <div
                  key={i}
                  className="relative shrink-0 overflow-hidden rounded-[9px]"
                  style={{ width: "210px", height: "365px" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={p.name}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        priority
                        quality={100}
                        unoptimized
                        sizes="210px"
                        className="object-cover object-center"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(360deg, rgba(0,0,0,0.9) 19.96%, rgba(102,102,102,0) 42.85%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 z-10 flex flex-col gap-1 p-[15px_18px]">
                        <div className="flex items-center gap-1">
                          <span className="text-span-text text-[20px] leading-[26px] font-bold">
                            {p.name}
                          </span>
                          <CircleCheck
                            className="h-5 w-5 shrink-0"
                            style={{ color: "#98FAC3" }}
                          />
                        </div>
                        <span className="text-span-text-100 text-[14px] leading-[24px] font-medium">
                          {p.role}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-full lg:hidden">
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: "-20px",
              width: "80px",
              background:
                "linear-gradient(to right, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: "-20px",
              width: "80px",
              background:
                "linear-gradient(to left, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0) 100%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          <div className="flex w-full gap-2">
            {[0, 1, 2].map((offset, i) => {
              const p = getProfile(offset);
              const isMiddle = i === 1;
              return (
                <div
                  key={i}
                  className="relative flex flex-col justify-end overflow-hidden rounded-[9px]"
                  style={{ height: "320px", flex: isMiddle ? "1.5" : "1" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={p.name}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.mobileImg}
                        alt={p.name}
                        fill
                        priority
                        quality={100}
                        unoptimized
                        sizes="33vw"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(360deg, rgba(0,0,0,0.9) 19.96%, rgba(102,102,102,0) 42.85%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 z-10 flex flex-col gap-0.5 p-[10px_12px]">
                    <div className="flex items-center gap-1">
                      <span className="text-span-text text-[13px] leading-[18px] font-bold whitespace-nowrap">
                        {p.name}
                      </span>
                      <CircleCheck
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: "#98FAC3" }}
                      />
                    </div>
                    <span className="text-span-text-100 text-[11px] leading-[16px] font-medium whitespace-nowrap">
                      {p.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto hidden w-full max-w-[1100px] pt-[40px] pb-[80px] lg:block">
        <div className="border-secondary-b border-t" />
      </div>
    </section>
  );
}
