"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { profileContentOption } from "@/api/profile/profile.options";
import { getImageUrl, sanitizeUrl } from "@/utils/profile";
import { getLinkIcon } from "./shared/TemplateLinkCard";
import { ProfileContentResponse } from "@/api/profile/profile.type";
import { Skeleton } from "../ui/skeleton";

type Props = {
  content?: ProfileContentResponse;
  isLoading?: boolean;
};

export default function FeaturedLinks({ content, isLoading }: Props) {
  const links = (content?.content?.links?.items ?? []) as {
    id?: string;
    title?: string;
    url?: string;
    iconSrc?: string | null;
    imageSrc?: string | null;
  }[];

  return (
    <section className="border-border bg-background rounded-[12px] border p-6">
      <h2 className="text-2xl font-bold">Featured Links</h2>

      {isLoading ? (
        <div className="mt-6 flex flex-col gap-4">
          {Array.from({ length: 1 }).map((_, i) => (
            <div
              key={i}
              className="border-border flex items-center justify-between rounded-[18px] border p-4"
            >
              <div className="flex items-center gap-5">
                <Skeleton className="h-14 w-14 shrink-0 rounded-[12px]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      ) : links.length === 0 ? (
        <span className="text-secondary-text mt-4 flex items-center justify-between text-sm">
          Add your links
        </span>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {links.map((item, index) => {
            const displayImg = getImageUrl(item.imageSrc);
            return (
              <a
                key={item.id ?? index}
                href={sanitizeUrl(item.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border flex items-center justify-between rounded-[18px] border p-4 no-underline"
              >
                <div className="flex items-center gap-5">
                  <span className="border-border flex h-14 w-14 items-center justify-center overflow-hidden rounded-[12px] border">
                    {displayImg ? (
                      <Image
                        src={displayImg}
                        alt={item.title ?? "Link"}
                        width={56}
                        height={56}
                        className="object-cover"
                        unoptimized
                      />
                    ) : getImageUrl(item.iconSrc) ? (
                      <Image
                        src={getImageUrl(item.iconSrc) || ""}
                        alt={item.title ?? "Link"}
                        width={24}
                        height={24}
                        unoptimized
                      />
                    ) : (
                      <span className="text-brand-hover-bg">
                        {getLinkIcon(
                          (item.url || "") + " " + (item.title || "")
                        )}
                      </span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-primary-text font-bold break-all">
                      {item.title}
                    </h3>
                    <p className="text-tertiary-text text-sm break-all">
                      {item.url}
                    </p>
                  </div>
                </div>
                <span className="border-border flex h-10 w-10 items-center justify-center rounded-full border">
                  <ExternalLink className="text-tertiary-text" size={20} />
                </span>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
