"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Headphones, House, LogOut, X } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { logoutOption, userQueryOptions } from "@/api/auth/auth.options";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isApiError } from "@/api/base";
import { Button } from "../ui/button";

const TOPBAR_HEIGHT = "76px";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    label: "Help and Support",
    href: "/dashboard/help",
    icon: Headphones,
  },
];

type DashboardSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DashboardSidebar({
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    ...logoutOption,
    onSuccess: () => {
      sessionStorage.removeItem("resetToken");
      queryClient.removeQueries({ queryKey: userQueryOptions.queryKey });
      router.push("/login");
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Logout failed."),
  });

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close dashboard menu overlay"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        style={
          {
            "--topbar-height": TOPBAR_HEIGHT,
          } as CSSProperties
        }
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-[210px] shrink-0 flex-col border-r border-border bg-background transition-transform duration-300 sm:w-70 lg:sticky lg:top-(--topbar-height) lg:z-30 lg:h-[calc(100vh-var(--topbar-height))] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-19 items-center justify-between border-b border-border px-4 lg:hidden">
          <span className="font-bold text-[#087583]">Menu</span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dashboard menu"
            className="cursor-pointer rounded-[8px] border border-border p-2"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 p-3 pt-6">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-[10px] px-4 py-4 text-[18px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#087583] text-white"
                    : "text-[#050505] hover:bg-[#F5F5F5]"
                }`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Button
          type="button"
          size="lg"
          variant="logout"
          disabled={logoutMutation.isPending}
          onClick={handleLogout}
        >
          <LogOut size={22} />
          <span className="text-[18px]">Logout</span>
        </Button>
      </aside>
    </>
  );
}
