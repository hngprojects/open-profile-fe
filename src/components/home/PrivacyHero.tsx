"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const PrivacyHero = () => {
  const [query, setQuery] = useState<string>("");
  return (
    <div className="h-80 w-screen bg-[#DBEFF2] pt-20 lg:pt-36">
      <div className="flex max-w-2xl flex-col gap-3 p-3 lg:ml-32">
        <div>
          <h3 className="text-3xl font-bold">Privacy Policy</h3>
          <p className="font-bold">Last updated on the 10th of May 2026</p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <span className="flex w-full items-center gap-2 rounded-[5.57px] border border-[#C9C9C9] bg-[#FAFAFA] px-3 sm:w-auto">
            <Search size={18} className="text-label-text" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="text-label-text placeholder:text-label-text h-12.5 flex-1 rounded-[5.57px] px-3 py-4 text-[16px] leading-6 transition outline-none sm:py-0"
              style={{ fontFamily: "'Afacad', sans-serif" }}
            />
          </span>

          <Button
            className="h-14 w-full px-4 sm:h-12.5 sm:w-auto"
            style={{ fontFamily: "'Afacad', sans-serif" }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyHero;
