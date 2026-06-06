"use client";

import Link from "next/link";
import { ChevronRight, MessageSquare } from "lucide-react";
import { sanitizeUrl } from "@/utils/profile";
import { ProfileContentResponse } from "@/api/profile/profile.type";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  content?: ProfileContentResponse;
  isLoading?: boolean;
};

export default function YourCTA({ content, isLoading }: Props) {
  const cta = content?.content?.cta;

  return (
    <section className="w-full rounded-[12px] border border-border bg-background p-16">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-md border p-2 text-sm font-medium">
            <MessageSquare size={12} />
          </span>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-11 w-28 rounded-xl" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-md border p-2 text-sm font-medium">
            <MessageSquare size={12} />
          </span>
          <h4 className="text-2xl font-bold">
            {cta?.visible && (cta?.label || cta?.url)
              ? cta.label || "CTA"
              : "Your CTA"}
          </h4>

          {cta?.visible && (cta?.label || cta?.url) ? (
            cta.url ? (
              <a
                href={sanitizeUrl(cta.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-xl bg-brand-hover-bg px-8 text-sm font-bold text-white hover:bg-button-brand-bg"
              >
                {cta.label || "Visit"}
              </a>
            ) : (
              <span className="inline-flex h-11 cursor-not-allowed items-center rounded-xl bg-brand-hover-bg px-8 text-sm font-bold text-white opacity-60">
                {cta.label}
              </span>
            )
          ) : (
            <Link
              href="/dashboard/profile-builder?section=cta"
              className="flex items-center gap-1 text-sm font-semibold text-brand-hover-bg hover:underline"
            >
              Add your CTA <ChevronRight size={14} />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
