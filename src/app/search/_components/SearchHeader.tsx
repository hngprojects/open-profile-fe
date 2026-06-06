"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchHeaderProps {
  initialQuery: string;
}

export default function SearchHeader({ initialQuery }: SearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(initialQuery);
    setIsSearching(false);
  }, [initialQuery, searchParams]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const searchValue = query.trim();
    if (searchValue.length < 3) return;

    setIsSearching(true);
    router.push(`/search?q=${encodeURIComponent(searchValue)}&page=1`);
  }

  return (
    <section className="border-secondary-b bg-brand-subtle-bg border-b px-4 pt-[100px] pb-10 md:pt-[120px] md:pb-16">
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="mb-6 text-[28px] leading-tight font-semibold md:text-[36px]">
          Find Someone on Open Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 rounded-[8px] shadow-sm sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="text-disabled-text absolute top-1/2 left-4 -translate-y-1/2"
              size={20}
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or username..."
              className="focus-visible:ring-brand focus-visible:border-brand border-secondary-b bg-background h-[56px] w-full rounded-[8px] border pr-4 pl-11 text-[16px] shadow-none outline-none focus-visible:ring-2 focus-visible:ring-offset-0 sm:rounded-r-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || query.trim().length < 3}
            className="bg-brand-hover-bg disabled:bg-brand-hover-bg/70 h-[56px] w-full rounded-[8px] px-6 font-medium text-white transition-colors disabled:cursor-not-allowed sm:w-[140px] sm:rounded-l-none"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
        {query.trim().length > 0 && query.trim().length < 3 && (
          <p className="text-negative-text mt-2 flex items-center gap-1.5 text-left text-[14px]">
            <AlertCircle size={16} />
            Please enter at least 3 characters to search
          </p>
        )}
      </div>
    </section>
  );
}
