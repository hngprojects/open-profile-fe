"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  query,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <div className="border-secondary-b bg-background flex items-center gap-2 rounded-[8px] border p-2 shadow-sm">
        {(() => {
          const pages: (number | string)[] = [];
          if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
          } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
          }
          return pages.map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="text-link-hover-text px-1 font-bold tracking-wider"
                >
                  ...
                </span>
              );
            }
            return (
              <Link
                key={pageNum}
                href={`/search?q=${encodeURIComponent(query)}&page=${pageNum}`}
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-[6px] text-[13px] font-semibold transition-colors ${
                  currentPage === pageNum
                    ? "bg-brand-hover-bg pointer-events-none text-white"
                    : "bg-brand-subtle-bg text-link-hover-text hover:bg-[#D8F3F6]"
                }`}
              >
                {pageNum}
              </Link>
            );
          });
        })()}

        {currentPage < totalPages && (
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${
              currentPage + 1
            }`}
            className="text-link-hover-text hover:text-link-active-text mr-1 ml-2 flex items-center gap-1 text-[13px] font-semibold transition-colors"
          >
            Next <ChevronRight size={16} strokeWidth={2.5} />
          </Link>
        )}
      </div>
    </div>
  );
}
