import Image from "next/image";
import {
  getImageUrl,
  sanitizeUrl,
  isProjectHighlighted,
  getSectionStyle,
} from "@/utils/profile";
import { ExternalLink } from "lucide-react";
import type { Section } from "./profile-builder/types";
import { getFontClass } from "./templates/TemplateAppearanceProvider";

type Props = {
  projectsSection?: Section;
  variant?: "default" | "transparent";
};

export default function HighlightCard({
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

  const containerClass =
    variant === "default"
      ? "border-border bg-background w-full rounded-2xl border p-6 shadow-sm"
      : "group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors";

  return (
    <section
      className={`${containerClass} ${projectsSection?.font ? getFontClass(projectsSection.font) : ""}`}
      style={projectsSection ? getSectionStyle(projectsSection) : undefined}
    >
      {variant === "default" && (
        <h2 className="text-primary-text mb-6 text-[20px] font-bold tracking-tight">
          Highlight
        </h2>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center lg:gap-6">
        <div className="bg-secondary-bg border-border relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border md:w-[240px] lg:w-[320px]">
          {displayImg ? (
            <Image
              src={displayImg}
              alt={highlightedProject.title ?? "Project highlight"}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              unoptimized
            />
          ) : (
            <div
              className={`${variant === "default" ? "bg-background" : "bg-neutral-200"} text-tertiary-text flex h-full w-full items-center justify-center text-sm`}
            >
              No image
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <h3 className="text-primary-text text-[20px] font-bold wrap-break-word">
            {highlightedProject.title}
          </h3>
          <p className="text-secondary-text mt-3 text-[14px] leading-relaxed wrap-break-word">
            {highlightedProject.description}
          </p>
          {highlightedProject.url && (
            <a
              href={sanitizeUrl(highlightedProject.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="op-brand-fill bg-brand-hover-bg hover:bg-button-brand-bg mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[14px] font-bold text-white shadow-sm transition-all"
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
