"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { userQueryOptions, logoutOption } from "@/api/auth/auth.options";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { toast } from "sonner";
import { isApiError } from "@/api/base";
import { publishProfile } from "@/api/profile/profile.service";
import { dashboardProfileOption } from "@/api/profile/profile.options";
import { getInitials } from "@/utils/avatar";
import { getImageUrl } from "@/utils/profile";
import type { PublishProfileResponse } from "@/api/profile/profile.type";

const navLinks = [
  { label: "Home", href: ROUTES.dashboard.home },
  { label: "Profile Builder", href: ROUTES.dashboard.profileBuilder },
  // { label: "Settings", href: ROUTES.dashboard.settings.home },
];

export default function DashboardTopbar() {
  const pathname = usePathname();
  const { data: user } = useQuery(userQueryOptions);
  const { data: profile } = useQuery(dashboardProfileOption());
  const queryClient = useQueryClient();

  const draftUpdatedAtRef = useRef<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const dropdownRef = useOutsideClick(() => setDropdownOpen(false));
  const profileFullName = profile?.fullName?.trim();
  const userFullName = user?.fullName?.trim();
  const userEmail = user?.email?.trim();

  const displayName = profileFullName || userFullName || userEmail || "??";
  const initials = getInitials(displayName, {
    fallback: "??",
  });

  const profilePhotoUrl = getImageUrl(profile?.photoUrl || user?.photoUrl);

  const { mutate: doPublish, isPending: isPublishing } = useMutation<
    PublishProfileResponse,
    unknown,
    void
  >({
    mutationKey: ["profile", "publish"],
    mutationFn: publishProfile,
    onSuccess() {
      draftUpdatedAtRef.current = null;
      queryClient.invalidateQueries({ queryKey: ["profile", "content"] });
      queryClient.invalidateQueries({ queryKey: ["profile", "draft-state"] });
      queryClient.invalidateQueries({ queryKey: ["profile", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["profile", "appearance"] });
      toast.success("Profile published successfully.");
    },
    onError(error: unknown) {
      toast.error(
        isApiError(error)
          ? error.message
          : error instanceof Error
            ? error.message
            : "Failed to publish profile."
      );
    },
  });

  // ── Logout mutation ──
  const logoutMutation = useMutation({
    ...logoutOption,
    onSuccess: () => {
      sessionStorage.removeItem("resetToken");
      queryClient.clear();
      window.location.href = "/login";
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Logout failed."),
  });

  const isLogoutPending = logoutMutation.isPending;

  const handleCloseModal = () => {
    if (!isLogoutPending) setModalOpen(false);
  };

  return (
    <>
      <header className="bg-card border-tertiary-b sticky top-0 z-40 border-b">
        <div className="relative flex h-19 items-center justify-between gap-8 px-4 md:px-10 lg:px-8">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Open Profile"
              width={180}
              height={40}
              className="h-auto w-36 shrink-0 cursor-pointer sm:w-40"
            />
          </Link>

          {/* Center Nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
            {navLinks.map(({ label, href }) => {
              const isActive =
                href === ROUTES.dashboard.home
                  ? pathname === ROUTES.dashboard.home
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`py-1 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-link-hover-text"
                      : "text-primary-text hover:text-link-hover-text"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <Button
              asChild
              variant="outline"
              className="border-tertiary-b text-primary-text hover:bg-hover-bg h-10 rounded-[10px] px-4 text-sm font-semibold transition-all active:scale-95"
              title="Find user"
            >
              <Link href="/search" className="flex items-center gap-2">
                <Search size={16} />
                Search
              </Link>
            </Button>

            {/* <Button asChild className="border-brand-b bg-brand-light-subtle-bg text-link-hover-text hidden h-10 rounded-[10px] border px-5 text-sm font-semibold shadow-none transition-all hover:bg-background active:scale-95 md:flex">
              <Link href="/coming-soon">Upgrade</Link>
            </Button> */}

            {/* Publish — only on profile builder route, with real publish logic */}
            {pathname === ROUTES.dashboard.profileBuilder && (
              <Button
                type="button"
                onClick={() => doPublish()}
                disabled={isPublishing}
                className="bg-brand-hover-bg hover:bg-brand-active-bg h-10 rounded-[10px] px-6 text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-60"
              >
                {isPublishing ? "Publishing…" : "Publish"}
              </Button>
            )}

            {/* Avatar + Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                aria-label="User menu"
                className="bg-brand-hover-bg text-inverse-text flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full text-xs font-bold transition-opacity hover:opacity-90"
              >
                {!imageError && profilePhotoUrl ? (
                  <Image
                    src={profilePhotoUrl}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  initials
                )}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="border-tertiary-b bg-background absolute top-full right-0 mt-2 w-44 overflow-hidden rounded-xl border py-1 shadow-lg"
                  >
                    {displayName && (
                      <p className="border-tertiary-b text-tertiary-text text-md truncate border-b px-4 py-2">
                        {displayName}
                      </p>
                    )}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setModalOpen(true);
                      }}
                      className="text-negative-text hover:bg-negative-subtle-bg flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-card w-full max-w-sm rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-primary-text text-base font-semibold">
                Log out
              </h2>
              <button
                onClick={handleCloseModal}
                disabled={isLogoutPending}
                className="text-tertiary-text hover:bg-hover-bg rounded-full p-1 transition-colors disabled:pointer-events-none disabled:opacity-40"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-secondary-text mb-6 text-sm">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-tertiary-b text-primary-text hover:bg-hover-bg flex-1 rounded-[10px] text-sm font-semibold"
                onClick={handleCloseModal}
                disabled={isLogoutPending}
              >
                Cancel
              </Button>
              <Button
                className="bg-negative-bg hover:bg-negative-hover-bg flex-1 rounded-[10px] text-sm font-semibold text-white active:scale-95"
                onClick={() => logoutMutation.mutate()}
                disabled={isLogoutPending}
              >
                {isLogoutPending ? "Logging out…" : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
