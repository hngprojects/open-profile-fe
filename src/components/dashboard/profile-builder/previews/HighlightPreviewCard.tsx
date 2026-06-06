import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  getImageUrl,
  sanitizeUrl,
  isProjectHighlighted,
  getSectionStyle,
} from "@/utils/profile";
import type { Section } from "../types";
import { getFontClass } from "../../templates/TemplateAppearanceProvider";

type Props = {
  projectsSection?: Section;
  variant?: "default" | "transparent";
};

export default function HighlightPreviewCard({
  projectsSection,
  variant = "default",
}: Props) {
  const projectsToRender = projectsSection?.projects || [];
  const highlightedProject = projectsToRender.find(isProjectHighlighted);

  if (!highlightedProject) {
    return null;
  }

  const rawImageSrc = highlightedProject.imageSrc;
  const displayImg = rawImageSrc
    ? rawImageSrc.startsWith("/profile-preview/")
      ? rawImageSrc
      : getImageUrl(rawImageSrc)
    : null;

  return (
    <section
      className={`${variant === "default" ? "border-border bg-background rounded-[12px] border p-4 shadow-sm sm:p-6" : ""} transition-opacity duration-200 ${!projectsSection?.visible ? "opacity-50 grayscale" : ""} ${projectsSection?.font ? getFontClass(projectsSection.font) : ""}`}
      style={projectsSection ? getSectionStyle(projectsSection) : undefined}
    >
      <h2 className="text-xl font-bold">Highlight</h2>
      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="bg-secondary-bg flex flex-1 justify-center overflow-hidden rounded-[12px] p-4">
          {displayImg ? (
            <Image
              src={displayImg}
              alt={highlightedProject.title ?? "Project highlight"}
              width={160}
              height={120}
              className="h-auto w-full max-w-[160px] rounded-[12px] object-cover"
              unoptimized
            />
          ) : (
            <div className="text-tertiary-text flex h-[120px] w-full max-w-[160px] items-center justify-center rounded-[12px] bg-neutral-200 text-sm">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold wrap-break-word">
            {highlightedProject.title}
          </h3>
          <p className="text-secondary-text mt-2 text-sm wrap-break-word">
            {highlightedProject.description}
          </p>
          {highlightedProject.url && (
            <a
              href={sanitizeUrl(highlightedProject.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-hover-bg mt-4 flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              {highlightedProject.buttonText || "View project"}
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
