import { Eye, EyeOff, Trash2 } from "lucide-react";
import type { Section } from "../types";

interface PreviewSectionControlsProps {
  section?: Section;
  positionClass?: string;
  hoverTarget?: "section" | "cta";
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
}

export default function PreviewSectionControls({
  section,
  positionClass = "top-4 right-4",
  hoverTarget = "section",
  onToggleSectionVisibility,
  onRemoveSection,
}: PreviewSectionControlsProps) {
  if (!section || section.type === "bio") return null;

  const visibilityClass =
    hoverTarget === "cta"
      ? "group-hover/cta:pointer-events-auto group-hover/cta:opacity-100 group-focus-within/cta:pointer-events-auto group-focus-within/cta:opacity-100"
      : "group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100";

  const visibilityLabel = section.visible ? "Hide" : "Show";
  const VisibilityIcon = section.visible ? EyeOff : Eye;

  return (
    <div
      className={`border-border/70 bg-background pointer-events-none absolute z-50 flex overflow-hidden rounded-[14px] border opacity-0 shadow-sm transition-opacity ${visibilityClass} ${positionClass}`}
    >
      <button
        type="button"
        aria-label={`${visibilityLabel} ${section.title || "section"}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggleSectionVisibility(section.id);
        }}
        className="text-secondary-text hover:bg-hover-bg hover:text-primary-text bg-background flex h-9 w-9 cursor-pointer items-center justify-center transition-colors"
      >
        <VisibilityIcon size={16} />
      </button>
      <button
        type="button"
        aria-label={`Delete ${section.title || "section"}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemoveSection(section.id);
        }}
        className="text-negative-text hover:bg-negative-bg/30 border-border/70 flex h-9 w-9 cursor-pointer items-center justify-center border-l bg-[#FEE4E2] transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
