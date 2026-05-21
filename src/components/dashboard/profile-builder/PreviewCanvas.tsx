"use client";

import Image from "next/image";
import { Folder, ExternalLink, Eye, EyeOff, Trash2 } from "lucide-react";
import { getImageUrl } from "@/utils/profile";
import type { Section, ProfilePreview } from "./types";

interface PreviewCanvasProps {
  font: string;
  textColor: string;
  bgColor: string;
  iconColor: string;
  spacing: number;
  borderRadius: "sharp" | "medium" | "round";
  theme: "light" | "dark";
  sections: Section[];
  profile?: ProfilePreview | null;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
}

export default function PreviewCanvas({
  font,
  textColor,
  bgColor,
  iconColor,
  spacing,
  borderRadius,
  theme,
  sections,
  profile,
  onToggleSectionVisibility,
  onRemoveSection,
}: PreviewCanvasProps) {
  const fontStyles: Record<string, string> = {
    Afacad: "font-afacad",
    Inter: "font-sans",
    Serif: "font-serif",
    Mono: "font-mono",
  };

  const selectedFontClass = fontStyles[font] || "font-afacad";

  const radiusMap = {
    sharp: "0px",
    medium: "16px",
    round: "32px",
  };
  const activeRadius = radiusMap[borderRadius] || "16px";

  const isDark = theme === "dark";

  const cardStyle = {
    backgroundColor:
      bgColor === "#FFFFFF" && isDark
        ? "#1E1E1E"
        : bgColor || (isDark ? "#1E1E1E" : "#FFFFFF"),
    borderRadius: activeRadius,
    color:
      textColor === "#050505" && isDark
        ? "#FAFAFA"
        : textColor || (isDark ? "#FAFAFA" : "#050505"),
    borderColor: isDark ? "#2D2D2D" : "#EDEDED",
    marginBottom: `${spacing}px`,
  };

  const textStyle = {
    color:
      textColor === "#050505" && isDark
        ? "#E0E0E0"
        : textColor || (isDark ? "#E0E0E0" : "#454545"),
  };

  const getRgbaColor = (hex: string, alpha: number) => {
    if (!hex) return `rgba(10, 146, 164, ${alpha})`;
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    const num = parseInt(cleanHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const iconStyle = {
    color: iconColor || "#0a92a4",
    backgroundColor: getRgbaColor(iconColor || "#0a92a4", isDark ? 0.15 : 0.08),
  };

  const visibleSections = sections.filter((section) => section.visible);

  const isBioVisible = visibleSections.some(
    (section) => section.type === "bio"
  );

  return (
    <div
      className={`animate-in fade-in flex flex-1 justify-center overflow-y-auto transition-colors duration-200 ${isDark ? "bg-[#121212]" : "bg-transparent"}`}
    >
      {/* Device wrapper */}
      <div className="flex w-full max-w-195 flex-col gap-6">
        {/* Dynamic Card Container with settings applied */}
        <div
          className={`flex w-full flex-col transition-all duration-300 ${selectedFontClass}`}
        >
          {/* 1. Main Bio Card (Standard Profile Header) */}
          {isBioVisible && (
            <div
              style={cardStyle}
              className="relative flex flex-col items-center gap-6 border p-6 shadow-sm transition-all duration-300 sm:flex-row sm:items-start sm:p-8"
            >
              {/* Avatar image */}
              <div className="border-brand-b/20 bg-brand-light-subtle-bg relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 shadow-inner">
                {getImageUrl(profile?.photoUrl) ? (
                  <Image
                    src={getImageUrl(profile?.photoUrl) || ""}
                    alt={profile?.fullName ?? "Profile avatar"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="text-brand-text text-3xl font-bold">
                    {(profile?.fullName || "M").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold tracking-tight">
                  {profile?.fullName || "Micaela Robinsonss"}
                </h2>
                <p
                  style={textStyle}
                  className="mt-3 text-[15px] leading-relaxed opacity-90 transition-colors"
                >
                  {profile?.bio ||
                    "I'm a digital creator focusing on the intersection of design, technology, and intentional living. Sharing insights to help you build better products and habits."}
                </p>
              </div>
            </div>
          )}

          {visibleSections.map((section) => {
            if (section.type === "bio") return null; // Already rendered in main card

            const isSectionHighlighted =
              section.type === "projects" && section.highlightSection;
            const currentCardStyle = isSectionHighlighted
              ? {
                  ...cardStyle,
                  borderColor: iconColor || "#0a92a4",
                  boxShadow: `0 0 16px ${iconColor || "#0a92a4"}25`,
                  borderWidth: "2px",
                }
              : cardStyle;

            return (
              <div
                key={section.id}
                style={currentCardStyle}
                className="relative flex flex-col border p-6 shadow-sm transition-all duration-300"
              >
                {/* Action buttons (View/Delete) */}
                <div className="absolute top-6 right-6 z-10 flex w-24 items-center justify-between gap-3 rounded-[10px] border border-[#EDEDED] bg-white p-3 shadow-none select-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSectionVisibility(section.id);
                    }}
                    className="text-[#3A3A3A] transition-opacity hover:opacity-80"
                    title="Toggle visibility"
                  >
                    {section.visible ? (
                      <Eye size={18} strokeWidth={2} />
                    ) : (
                      <EyeOff size={18} strokeWidth={2} />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSection(section.id);
                    }}
                    className="text-[#9F2B2B] transition-opacity hover:opacity-80"
                    title="Delete section"
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>
                {section.type === "experience" ? null : section.type ===
                  "links" ? (
                  <h3 className="mb-4 text-3xl font-bold">{section.title}</h3>
                ) : (
                  <div
                    className="mb-4 flex items-center justify-between border-b pr-24 pb-4"
                    style={{ borderColor: isDark ? "#2D2D2D" : "#F0F0F0" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        style={iconStyle}
                        className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                      >
                        {section.type === "projects" && <Folder size={18} />}
                      </span>
                      <h3 className="text-lg font-bold">{section.title}</h3>
                    </div>
                  </div>
                )}

                {/* Section-specific placeholders */}
                {section.type === "projects" && (
                  <div>
                    {section.subtitle && (
                      <p className="text-tertiary-text mb-6 text-sm leading-relaxed">
                        {section.subtitle}
                      </p>
                    )}

                    {section.projects && section.projects.length > 0 ? (
                      <div
                        className={
                          section.layout === "1"
                            ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                            : "flex flex-col gap-4"
                        }
                      >
                        {section.projects.map((project) => {
                          const isHighlighted = project.highlighted;
                          const projectCardStyle = {
                            borderColor: isHighlighted
                              ? iconColor || "#0a92a4"
                              : isDark
                                ? "#2D2D2D"
                                : "#EDEDED",
                            boxShadow: isHighlighted
                              ? `0 4px 12px ${iconColor || "#0a92a4"}20`
                              : undefined,
                            borderWidth: isHighlighted ? "2px" : "1px",
                            backgroundColor: "transparent",
                          };

                          // Render Layout 1: Grid Card
                          if (!section.layout || section.layout === "1") {
                            return (
                              <div
                                key={project.id}
                                style={projectCardStyle}
                                className="flex flex-col overflow-hidden rounded-xl border transition-all"
                              >
                                {project.imageSrc && (
                                  <div className="relative aspect-video w-full shrink-0 bg-gray-100 dark:bg-zinc-800">
                                    <Image
                                      src={project.imageSrc}
                                      alt={project.title}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <div className="flex flex-1 flex-col p-4">
                                  <h4 className="truncate text-sm font-bold">
                                    {project.title}
                                  </h4>
                                  <p className="text-tertiary-text mt-1 line-clamp-2 flex-1 text-xs">
                                    {project.description}
                                  </p>
                                  {project.url && (
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        backgroundColor: iconColor || "#0a92a4",
                                      }}
                                      className="mt-4 flex h-9 w-full items-center justify-center rounded-lg px-4 text-center text-xs font-bold text-white transition-opacity hover:opacity-90"
                                    >
                                      {project.buttonText || "View project"}
                                    </a>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // Render Layout 2: Full List Card (Image on top, full width)
                          if (section.layout === "2") {
                            return (
                              <div
                                key={project.id}
                                style={projectCardStyle}
                                className="flex flex-col overflow-hidden rounded-xl border transition-all"
                              >
                                {project.imageSrc && (
                                  <div className="relative h-44 w-full shrink-0 bg-gray-100 dark:bg-zinc-800">
                                    <Image
                                      src={project.imageSrc}
                                      alt={project.title}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <div className="flex flex-col p-5">
                                  <h4 className="text-base font-bold">
                                    {project.title}
                                  </h4>
                                  <p className="text-tertiary-text mt-2 text-xs leading-relaxed">
                                    {project.description}
                                  </p>
                                  {project.url && (
                                    <div className="mt-4 flex justify-start">
                                      <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          backgroundColor:
                                            iconColor || "#0a92a4",
                                        }}
                                        className="flex h-9 items-center justify-center rounded-lg px-5 text-center text-xs font-bold text-white transition-opacity hover:opacity-90"
                                      >
                                        {project.buttonText || "View project"}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // Render Layout 3: Image Left
                          if (section.layout === "3") {
                            return (
                              <div
                                key={project.id}
                                style={projectCardStyle}
                                className="flex items-center gap-4 rounded-xl border p-4 transition-all"
                              >
                                {project.imageSrc && (
                                  <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
                                    <Image
                                      src={project.imageSrc}
                                      alt={project.title}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <h4 className="truncate text-sm font-bold">
                                    {project.title}
                                  </h4>
                                  <p className="text-tertiary-text mt-1 line-clamp-2 text-xs">
                                    {project.description}
                                  </p>
                                  {project.url && (
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: iconColor || "#0a92a4" }}
                                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold hover:underline"
                                    >
                                      <span>
                                        {project.buttonText || "View project"}
                                      </span>
                                      <ExternalLink size={12} />
                                    </a>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // Render Layout 4: Image Right
                          if (section.layout === "4") {
                            return (
                              <div
                                key={project.id}
                                style={projectCardStyle}
                                className="flex items-center gap-4 rounded-xl border p-4 transition-all"
                              >
                                <div className="min-w-0 flex-1">
                                  <h4 className="truncate text-sm font-bold">
                                    {project.title}
                                  </h4>
                                  <p className="text-tertiary-text mt-1 line-clamp-2 text-xs">
                                    {project.description}
                                  </p>
                                  {project.url && (
                                    <a
                                      href={project.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: iconColor || "#0a92a4" }}
                                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold hover:underline"
                                    >
                                      <span>
                                        {project.buttonText || "View project"}
                                      </span>
                                      <ExternalLink size={12} />
                                    </a>
                                  )}
                                </div>
                                {project.imageSrc && (
                                  <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
                                    <Image
                                      src={project.imageSrc}
                                      alt={project.title}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    ) : (
                      <p className="text-tertiary-text py-4 text-center text-xs">
                        No projects added yet.
                      </p>
                    )}
                  </div>
                )}

                {section.type === "links" && (
                  <div className="flex flex-col gap-4">
                    {section.subtitle && (
                      <p className="text-tertiary-text leading-relaxed">
                        {section.subtitle}
                      </p>
                    )}

                    {section.links && section.links.length > 0 && (
                      <div className="grid grid-cols-1 gap-3">
                        {section.links.map((link) => (
                          <div
                            key={link.id}
                            className="border-tertiary-b flex items-center justify-between rounded-xl border bg-white/60 p-4 transition-colors hover:bg-black/5 dark:border-[#2D2D2D] dark:bg-white/5 dark:hover:bg-white/10"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              {link.imageSrc ? (
                                <Image
                                  src={link.imageSrc}
                                  alt={link.title}
                                  width={40}
                                  height={40}
                                  unoptimized
                                  className="h-10 w-10 shrink-0 rounded-md object-cover"
                                />
                              ) : link.iconSrc ? (
                                <span className="rounded-md border p-2">
                                  <Image
                                    src={link.iconSrc}
                                    alt={link.iconLabel ?? link.title}
                                    width={24}
                                    height={24}
                                    className="shrink-0"
                                  />
                                </span>
                              ) : (
                                <span className="bg-brand-light-subtle-bg text-brand-text flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-bold">
                                  {link.title.charAt(0).toUpperCase()}
                                </span>
                              )}

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                  {link.title}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                  {link.url}
                                </p>
                              </div>
                            </div>
                            <span className="cursor-pointer rounded-full border p-2">
                              <ExternalLink size={14} className="shrink-0" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {section.type === "experience" && (
                  <div
                    className={`flex flex-col py-4 ${
                      section.layout === "2"
                        ? "items-start text-left"
                        : section.layout === "3"
                          ? "items-end text-right"
                          : "items-center text-center"
                    }`}
                  >
                    {/* Icon card wrapper */}
                    {section.iconSrc && (
                      <div
                        style={{
                          borderColor: isDark ? "#2D2D2D" : "#EDEDED",
                        }}
                        className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-300"
                      >
                        <div className="relative h-7 w-7">
                          <Image
                            src={section.iconSrc}
                            alt={section.iconLabel || "CTA Icon"}
                            fill
                            className="object-contain filter dark:invert"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    <h4 className="text-[32px] leading-snug font-bold tracking-tight text-[#050505] dark:text-white">
                      {section.title || "Let's build something"}
                    </h4>

                    {/* Subtitle */}
                    {section.subtitle && (
                      <p
                        style={textStyle}
                        className="text-tertiary-text mt-3 max-w-lg text-[15px] leading-relaxed font-medium"
                      >
                        {section.subtitle}
                      </p>
                    )}

                    {/* Action Button */}
                    {section.buttonText && (
                      <a
                        href={section.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: iconColor || "#0a92a4",
                          borderRadius: activeRadius || "8px",
                        }}
                        className="mt-6 inline-flex h-11 items-center justify-center px-[32px] text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-95"
                      >
                        {section.buttonText}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
