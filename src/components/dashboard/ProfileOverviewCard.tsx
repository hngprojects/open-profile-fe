"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronRight,
  Copy,
  Eye,
  Link2,
  Palette,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { userQueryOptions } from "@/api/auth/auth.options";
import {
  DashboardProfileResponse,
  TemplateType,
} from "@/api/profile/profile.type";
import {
  profileAppearanceOption,
  profileContentOption,
} from "@/api/profile/profile.options";
import { getDisplayUrl, getProfileUrl } from "@/utils/profile";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { getAppearanceResponseGlobal } from "@/utils/profileAppearance";

const actions = [
  {
    title: "Manage links",
    description: "Update your links",
    icon: Link2,
    href: "/dashboard/profile-builder?section=links",
  },
  {
    title: "Your portfolio",
    description: "Add your portfolio",
    icon: Link2,
    href: "/dashboard/profile-builder?section=projects",
  },
  {
    title: "Customize your profile",
    description: "Adjust font, color, spacing and appearance",
    icon: Palette,
    href: "/dashboard/profile-builder",
  },
];

type Props = {
  profile?: DashboardProfileResponse;
  isLoading?: boolean;
  onPreviewChange?: (template: TemplateType | null) => void;
  previewTemplate?: TemplateType | null;
};

export default function ProfileOverviewCard({
  profile,
  isLoading,
  previewTemplate,
}: Props) {
  const { data: user } = useQuery(userQueryOptions);
  const { data: appearanceData } = useQuery(profileAppearanceOption());
  const { data: contentData } = useQuery(profileContentOption());
  const publicProfileUrl = getProfileUrl(profile?.username);
  const [copied, setCopied] = useState(false);
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const displayName = profile?.fullName ?? user?.fullName ?? "User";

  const themeSettings = (contentData as Record<string, unknown>)
    ?.themeSettings as Record<string, unknown> | undefined;

  const apiAppearance = getAppearanceResponseGlobal(appearanceData);

  const rawTemplate =
    previewTemplate ||
    apiAppearance?.template ||
    themeSettings?.template ||
    profile?.templateType;

  const activeTemplate: TemplateType =
    typeof rawTemplate === "string" && rawTemplate.toLowerCase() === "creator"
      ? "Creator"
      : typeof rawTemplate === "string" &&
          rawTemplate.toLowerCase() === "portfolio"
        ? "Portfolio"
        : typeof rawTemplate === "string" &&
            rawTemplate.toLowerCase() === "professional"
          ? "Professional"
          : typeof rawTemplate === "string" &&
              rawTemplate.toLowerCase() === "default"
            ? "Default"
            : "Default";

  const handleCopyProfileUrl = async () => {
    if (!publicProfileUrl) return;

    try {
      await navigator.clipboard.writeText(publicProfileUrl);
      setCopied(true);

      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }

      copyResetTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy profile URL:", error);
      toast.error("Failed to copy profile link");
    }
  };

  return (
    <>
      <section className="border-border bg-background rounded-[12px] border p-5">
        <p className="text-secondary-text text-sm font-bold tracking-wide uppercase">
          Profile Overview
        </p>

        <div className="bg-secondary-bg mt-3 rounded-[10px] p-5">
          {isLoading ? (
            <Skeleton className="h-10" />
          ) : (
            <h1 className="text-primary-text text-3xl font-extrabold tracking-tight md:text-4xl">
              Welcome, {displayName}
            </h1>
          )}

          <p className="text-secondary-text mt-3 max-w-[430px] text-base leading-7 font-medium">
            Your profile is live and ready to share. Manage your public page,
            update key sections, and keep things current from one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-brand-hover-bg hover:bg-button-brand-bg"
            >
              <a
                href={publicProfileUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye size={16} />
                View Profile
              </a>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard/profile-builder">
                <Pencil size={16} />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {actions.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            href={item.href}
            aria-label={item.title}
            className="border-border bg-background hover:bg-secondary-bg flex w-full items-center justify-between rounded-[12px] border p-5 text-left transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="border-border flex h-8 w-8 items-center justify-center rounded-[8px] border">
                <Icon size={17} />
              </span>

              <div>
                <h2 className="text-primary-text text-xl font-extrabold">
                  {item.title}
                </h2>
                <p className="text-secondary-text mt-1 text-base font-medium">
                  {item.description}
                </p>
              </div>
            </div>

            <ChevronRight size={22} />
          </Link>
        );
      })}

      <section className="border-border bg-background rounded-[12px] border p-4">
        <div className="bg-secondary-bg p-4">
          <p className="text-secondary-text text-sm font-bold tracking-wide uppercase">
            Page Details
          </p>

          <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="text-secondary-text font-semibold">
              Public URL
            </span>
            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : publicProfileUrl ? (
              <div className="flex min-w-0 items-center gap-2 sm:justify-end">
                <a
                  href={publicProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-hover-bg min-w-0 truncate text-right font-semibold hover:underline"
                  suppressHydrationWarning
                >
                  {getDisplayUrl(publicProfileUrl)}
                </a>

                <button
                  type="button"
                  onClick={handleCopyProfileUrl}
                  className="border-border bg-background text-brand-hover-bg hover:bg-hover-bg flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors"
                  aria-label="Copy public profile URL"
                  title="Copy public profile URL"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            ) : (
              <span className="text-right break-all">
                Profile URL not available
              </span>
            )}
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <span className="text-secondary-text">Template</span>
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <span className="text-right">{activeTemplate} Template</span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
