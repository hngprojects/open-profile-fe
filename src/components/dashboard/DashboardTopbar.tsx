"use client";

import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type DashboardTopbarProps = {
  onOpenSidebar: () => void;
};

export default function DashboardTopbar({
  onOpenSidebar,
}: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#EDEDED] bg-white">
      <div className="flex h-19 items-center justify-between gap-8 px-4 md:px-10 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label="Open dashboard menu"
            className="rounded-[8px] border border-[#EDEDED] p-2 text-[#050505] lg:hidden"
          >
            <Menu size={22} />
          </button>

          <Image
            src="/logo.svg"
            alt="Open Profile"
            width={180}
            height={40}
            className="h-auto w-36 shrink-0 sm:w-40"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <button className="text-[#050505]" aria-label="Search">
            <Search size={24} />
          </button>

          <Button className="border-brand-b bg-brand-light-subtle-bg text-link-hover-text hidden h-10 rounded-[10px] border px-5 text-sm font-semibold shadow-none transition-all hover:bg-white active:scale-95 md:flex">
            Upgrade
          </Button>

          <Button className="bg-brand-hover-bg hover:bg-brand h-10 rounded-[10px] px-6 text-sm font-semibold text-white transition-all active:scale-95">
            Publish
          </Button>
        </div>
      </div>
    </header>
  );
}
