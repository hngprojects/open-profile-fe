import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Trash2,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import {
  getImageUrl,
  sanitizeUrl,
  isProjectHighlighted,
  getSectionStyle,
  getDisplayProfileUrl,
} from "@/utils/profile";
import type { Section, ProfilePreview, SavedLink, ProjectItem } from "../types";
import { getFontClass } from "../../templates/TemplateAppearanceProvider";
import { TemplateLinkCard } from "../../shared/TemplateLinkCard";
import HighlightPreviewCard from "./HighlightPreviewCard";

interface PortfolioPreviewProps {
  sections: Section[];
  profile?: ProfilePreview | null;
  selectedSectionId?: string | null;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
}

export default function PortfolioPreview({
  sections,
  profile,
  selectedSectionId: _selectedSectionId,
  onToggleSectionVisibility,
  onRemoveSection,
}: PortfolioPreviewProps) {
  const ctaSection = sections.find(
    (s) => s.type === "experience" || s.type === "cta"
  );

  const renderControls = (section?: Section, isBio: boolean = false) => {
    if (!section) return null;
    return (
      <div className="group/menu absolute -top-12 right-0 z-50">
        <button className="text-tertiary-text hover:text-primary-text hover:bg-hover-bg flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] transition-colors">
          <MoreHorizontal size={18} />
        </button>

        <div className="border-border bg-background invisible absolute top-full right-0 mt-2 flex w-40 flex-col overflow-hidden rounded-xl border opacity-0 shadow-lg transition-all group-hover/menu:visible group-hover/menu:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSectionVisibility(section.id);
            }}
            className="text-secondary-text hover:bg-hover-bg hover:text-primary-text flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors"
          >
            {section.visible ? (
              <>
                <EyeOff size={16} /> Hide Section
              </>
            ) : (
              <>
                <Eye size={16} /> Show Section
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              if (!isBio) {
                e.stopPropagation();
                onRemoveSection(section.id);
              }
            }}
            disabled={isBio}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isBio ? "text-negative-text cursor-not-allowed opacity-50" : "text-negative-text hover:bg-negative-bg/20"}`}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="text-primary-text mx-auto flex w-full max-w-5xl flex-col py-8 pt-6"
      style={{ gap: "var(--op-spacing, 2rem)" }}
    >
      {sections.map((section) => {
        if (section.type === "bio") {
          return (
            <div
              key={section.id}
              className={`group relative rounded-2xl transition-opacity duration-200 ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
              style={getSectionStyle(section)}
            >
              {renderControls(section, true)}

              <header
                className="hover:border-border hover:bg-background/50 relative flex w-full flex-col justify-between rounded-2xl border border-transparent transition-colors sm:flex-row sm:items-start"
                style={{
                  gap: "var(--op-spacing, 24px)",
                  padding: "var(--op-spacing, 24px)",
                }}
              >
                <div
                  className="flex flex-col"
                  style={{ gap: "var(--op-spacing, 24px)" }}
                >
                  <div className="border-border bg-secondary-bg relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full border">
                    {profile?.photoUrl ? (
                      <Image
                        src={getImageUrl(profile.photoUrl)!}
                        alt={profile?.fullName || "User"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="bg-brand-subtle-bg text-brand-hover-bg flex h-full w-full items-center justify-center text-[32px] font-bold">
                        {(profile?.fullName || "John Smith")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h1 className="text-primary-text text-[26px] leading-tight font-bold tracking-tight">
                        {profile?.fullName || "John Smith"}
                      </h1>
                    </div>
                    <p className="text-secondary-text mt-1 text-[14px]">
                      {getDisplayProfileUrl(profile?.username || "johnsmith")}
                    </p>
                  </div>
                </div>

                {ctaSection?.visible && ctaSection?.url && (
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="border-brand-hover-bg bg-background text-brand-hover-bg hover:bg-brand-hover-bg/5 inline-flex h-9 items-center justify-center gap-2 rounded-md border px-4 text-[13px] font-semibold transition-colors"
                  >
                    {ctaSection.iconSrc ? (
                      <div
                        className="bg-brand-hover-bg h-4 w-4"
                        style={{
                          maskImage: `url(${ctaSection.iconSrc})`,
                          WebkitMaskImage: `url(${ctaSection.iconSrc})`,
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                        }}
                      />
                    ) : (
                      <Mail size={16} />
                    )}
                    {ctaSection.buttonText || "Email"}
                  </a>
                )}
              </header>

              <section className="mt-8 px-6">
                <p className="text-secondary-text max-w-3xl text-[15px] leading-relaxed whitespace-pre-wrap">
                  {section.bio || "Write a little bit about yourself here..."}
                </p>
              </section>
            </div>
          );
        }

        if (section.type === "links") {
          return (
            <section
              key={section.id}
              className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
              style={(() => {
                const { gap: _gap, ...rest } = getSectionStyle(section);
                return rest;
              })()}
            >
              {renderControls(section)}

              <h2 className="text-tertiary-text mb-4 text-[13px]">
                {section.subtitle || "Links"}
              </h2>
              {section.links && section.links.length > 0 ? (
                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  style={{
                    gap: section.gap ? `${section.gap}px` : undefined,
                  }}
                >
                  {section.links.map((link: SavedLink) => (
                    <TemplateLinkCard
                      key={link.id}
                      id={link.id}
                      title={link.title || link.label || ""}
                      url={sanitizeUrl(link.url || "")}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-tertiary-text border-border rounded-xl border border-dashed py-4 text-center text-sm">
                  No links added yet.
                </p>
              )}
            </section>
          );
        }

        if (section.type === "projects") {
          const projectsToRender = section.projects || [];
          const highlightedProject =
            projectsToRender.find(isProjectHighlighted);
          const remainingProjects = projectsToRender.filter(
            (p: { id?: string | number }) => p.id !== highlightedProject?.id
          );

          return (
            <div key={section.id} className="flex flex-col gap-6">
              <HighlightPreviewCard
                projectsSection={section}
                variant="transparent"
              />
              <section
                className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                {renderControls(section)}

                <div className="mb-6 flex flex-col gap-1">
                  {section.title && (
                    <h2 className="text-primary-text text-[26px] font-bold">
                      {section.title}
                    </h2>
                  )}
                  {(section.subtitle || !section.title) && (
                    <h3 className="text-tertiary-text text-[13px]">
                      {section.subtitle || "Featured Projects"}
                    </h3>
                  )}
                </div>
                {remainingProjects.length > 0 ? (
                  <div
                    className={`grid gap-6 ${
                      section.layout === "1"
                        ? "grid-cols-1"
                        : section.layout === "3"
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                    style={{
                      gap: section.gap ? `${section.gap}px` : undefined,
                    }}
                  >
                    {remainingProjects.map(
                      (project: ProjectItem, idx: number) => {
                        const numberStr = String(idx + 1).padStart(2, "0");
                        return (
                          <div
                            key={project.id}
                            className={`group/proj border-border bg-background flex overflow-hidden rounded-[12px] border shadow-sm transition-shadow hover:shadow-md ${
                              section.layout === "1"
                                ? "flex-col sm:flex-row"
                                : "flex-col"
                            }`}
                          >
                            <div
                              className={`bg-secondary-bg border-border relative overflow-hidden ${
                                section.layout === "1"
                                  ? "w-full shrink-0 border-b sm:w-[320px] sm:border-r sm:border-b-0"
                                  : "aspect-16/10 w-full border-b"
                              }`}
                            >
                              {getImageUrl(project.imageSrc) ? (
                                <Image
                                  src={getImageUrl(project.imageSrc) || ""}
                                  alt={project.title || "Project"}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover/proj:scale-[1.02]"
                                  unoptimized
                                />
                              ) : (
                                <div className="h-full w-full bg-neutral-200 transition-transform duration-500 group-hover/proj:scale-[1.02]" />
                              )}
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                              <div className="mb-1 flex items-start gap-2">
                                <span className="text-primary-text text-[16px] font-bold">
                                  {numberStr}
                                </span>
                                <h3 className="text-primary-text text-[16px] font-bold">
                                  {project.title}
                                </h3>
                              </div>

                              {project.description && (
                                <p className="text-secondary-text mb-6 ml-6 line-clamp-2 text-[13px]">
                                  {project.description}
                                </p>
                              )}

                              {project.url && (
                                <a
                                  href={sanitizeUrl(project.url)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-hover-bg mt-auto ml-6 inline-flex items-center gap-1.5 text-[13px] font-bold hover:underline"
                                >
                                  {project.buttonText || "View Project"}
                                  <ArrowRight size={14} strokeWidth={2.5} />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <p className="text-tertiary-text border-border rounded-xl border border-dashed py-4 text-center text-sm">
                    No projects added yet.
                  </p>
                )}
              </section>
            </div>
          );
        }

        if (section.type === "experience") {
          return (
            <section
              key={section.id}
              className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
              style={getSectionStyle(section)}
            >
              {renderControls(section)}

              <div
                className={`flex flex-col ${section.layout === "2" ? "items-start text-left" : section.layout === "3" ? "items-end text-right" : "items-center text-center"}`}
              >
                {section.iconSrc && (
                  <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-transparent">
                    <div
                      className="bg-brand-hover-bg h-8 w-8"
                      style={{
                        maskImage: `url(${section.iconSrc})`,
                        WebkitMaskImage: `url(${section.iconSrc})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  </div>
                )}
                <h2 className="text-primary-text text-[28px] font-bold tracking-tight">
                  {section.title || "Interested in working together?"}
                </h2>
                <p className="text-secondary-text mt-3 mb-8 max-w-[600px] text-base leading-relaxed">
                  {section.subtitle ||
                    "I am currently available for freelance project"}
                </p>
                <a
                  href={sanitizeUrl(section.url || "#")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-hover-bg hover:bg-button-brand-bg inline-flex h-12 items-center justify-center rounded-xl px-8 text-[15px] font-bold text-white shadow-sm transition-all"
                >
                  {section.buttonText || "Let's Connect"}
                </a>
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
