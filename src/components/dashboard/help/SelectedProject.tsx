"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Pin } from "lucide-react";
import {
  getImageUrl,
  sanitizeUrl,
  isProjectHighlighted,
} from "@/utils/profile";
import { ProfileContentResponse } from "@/api/profile/profile.type";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  content?: ProfileContentResponse;
  isLoading?: boolean;
};

export default function SelectedProject({ content, isLoading }: Props) {
  const rawProjects = (content?.content?.projects?.items ?? []) as {
    id?: string;
    title?: string;
    description?: string;
    url?: string;
    repoUrl?: string;
    imageSrc?: string | null;
    highlighted?: boolean;
    buttonText?: string;
  }[];

  const highlightedProjects = rawProjects.filter(isProjectHighlighted);
  const visibleProjects =
    highlightedProjects.length > 0
      ? highlightedProjects
      : rawProjects.slice(0, 4);
  const hasProjects = rawProjects.length > 0;

  return (
    <section className="border-border bg-background w-full rounded-[12px] border">
      <div className="border-border flex items-center justify-between gap-3 border-b p-5">
        <div>
          <h2 className="text-primary-text text-2xl font-extrabold">
            Highlighted Projects
          </h2>
          <p className="text-secondary-text mt-1 text-sm font-medium">
            Pinned work appears here for quick profile visitors.
          </p>
        </div>

        <Pin className="text-brand-hover-bg shrink-0" size={20} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="aspect-video" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : !hasProjects ? (
        <span className="text-secondary-text flex items-center justify-between p-5 text-sm font-medium">
          No projects added yet
        </span>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          {visibleProjects.map((project, index) => {
            const projectUrl = project.url || project.repoUrl;
            const hasUrl = Boolean(projectUrl);
            const rawImageSrc = project.imageSrc;
            const displayImg = rawImageSrc
              ? rawImageSrc.startsWith("/profile-preview/")
                ? rawImageSrc
                : getImageUrl(rawImageSrc)
              : null;

            const dummyImages = [
              "/profile-preview/feature1.jpg",
              "/profile-preview/feature2.jpg",
              "/profile-preview/feature3.jpg",
            ];
            const fallbackImg = dummyImages[index % dummyImages.length];
            const isHighlighted = isProjectHighlighted(project);

            const card = (
              <div className="border-border hover:border-brand-hover-bg/40 flex h-full flex-col gap-4 rounded-xl border p-4 transition-colors">
                <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
                  {displayImg ? (
                    <Image
                      src={displayImg}
                      alt={project.title ?? "Project"}
                      className="object-cover"
                      fill
                      unoptimized
                    />
                  ) : (
                    <Image
                      src={fallbackImg}
                      alt="Project placeholder"
                      className="object-cover"
                      fill
                      unoptimized
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col items-start">
                  {isHighlighted && (
                    <span className="bg-brand-subtle-bg text-brand-hover-bg mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold">
                      <Pin size={12} />
                      Pinned
                    </span>
                  )}

                  <h5 className="text-primary-text text-xl font-extrabold break-all">
                    {project.title}
                  </h5>

                  <p className="text-secondary-text mt-1 break-all">
                    {project.description}
                  </p>

                  <span className="text-brand-hover-bg mt-auto flex items-center gap-1 pt-3 text-sm font-bold">
                    {hasUrl
                      ? project.buttonText || "View project"
                      : "Edit project"}
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            );

            return hasUrl ? (
              <a
                key={project.id ?? index}
                href={sanitizeUrl(projectUrl!)}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                {card}
              </a>
            ) : (
              <Link
                key={project.id ?? index}
                href="/dashboard/profile-builder?section=projects"
                className="no-underline"
              >
                {card}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
