import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
import PreviewSectionControls from "./PreviewSectionControls";

interface PortfolioPreviewProps {
  sections: Section[];
  profile?: ProfilePreview | null;
  selectedSectionId?: string | null;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
  onSelectSection: (id: string) => void;
}

export default function PortfolioPreview({
  sections,
  profile,
  selectedSectionId: _selectedSectionId,
  onToggleSectionVisibility,
  onRemoveSection,
  onSelectSection,
}: PortfolioPreviewProps) {
  const visibleSections = sections;

  const handleSelectSection = (
    event: React.MouseEvent<HTMLElement>,
    section: Section
  ) => {
    event.preventDefault();
    onSelectSection(section.id);
  };

  const handleSectionKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    section: Section
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (event.target !== event.currentTarget) return;

    event.preventDefault();
    onSelectSection(section.id);
  };

  const renderControls = (
    section?: Section,
    positionClass = "top-4 right-4",
    hoverTarget: "section" | "cta" = "section"
  ) => (
    <PreviewSectionControls
      section={section}
      positionClass={positionClass}
      hoverTarget={hoverTarget}
      onToggleSectionVisibility={onToggleSectionVisibility}
      onRemoveSection={onRemoveSection}
    />
  );

  return (
    <div
      className="text-primary-text mx-auto flex w-full max-w-5xl flex-col py-8 pt-6"
      style={{ gap: "var(--op-spacing, 2rem)" }}
    >
      {visibleSections.map((section) => {
        if (section.type === "bio") {
          return (
            <section
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group hover:border-border hover:bg-background/50 relative w-full cursor-pointer rounded-2xl border border-transparent p-6 transition-colors ${section.font ? getFontClass(section.font) : ""}`}
              style={getSectionStyle(section)}
            >
              <header
                className="relative flex w-full flex-col justify-between sm:flex-row sm:items-start"
                style={{
                  gap: "var(--op-spacing, 24px)",
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
                        {(profile?.fullName ?? "").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h1 className="text-primary-text text-[26px] leading-tight font-bold tracking-tight">
                        {profile?.fullName ?? ""}
                      </h1>
                    </div>
                    <p className="text-brand-hover-bg mt-1 text-[14px]">
                      {getDisplayProfileUrl(profile?.username || "johnsmith")}
                    </p>
                  </div>
                </div>
              </header>

              <div className="mt-8">
                <p className="text-secondary-text max-w-3xl text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                  {section.bio || "Write a little bit about yourself here..."}
                </p>
              </div>
            </section>
          );
        }

        if (section.type === "links") {
          return (
            <section
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group hover:border-border hover:bg-background/50 relative w-full cursor-pointer rounded-2xl border border-transparent p-6 transition-colors ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
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
                  className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2"
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
            <div
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group relative flex cursor-pointer flex-col gap-6 ${!section.visible ? "opacity-50 grayscale" : ""}`}
            >
              {renderControls(section)}
              <HighlightPreviewCard
                projectsSection={section}
                variant="transparent"
              />
              <section
                className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${section.font ? getFontClass(section.font) : ""}`}
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                <div className="mb-4 flex flex-col gap-1">
                  <h2 className="text-tertiary-text text-[13px]">
                    {section.title || "Featured Projects"}
                  </h2>
                  {section.subtitle && (
                    <p className="text-secondary-text text-xs">
                      {section.subtitle}
                    </p>
                  )}
                </div>
                {remainingProjects.length > 0 ? (
                  <div
                    className={`grid gap-6 ${
                      section.layout === "2"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                    style={{
                      gap: section.gap ? `${section.gap}px` : undefined,
                    }}
                  >
                    {remainingProjects.map((project: ProjectItem) => {
                      const layoutType = section.layout || "2";
                      const isSideBySide =
                        layoutType === "3" || layoutType === "4";
                      const desc = project.description || "";
                      const newlineIndex = desc.indexOf("\n");
                      const hasCategory = newlineIndex !== -1;
                      const categoryText = hasCategory
                        ? desc.substring(0, newlineIndex)
                        : "";
                      const descriptionText = hasCategory
                        ? desc.substring(newlineIndex + 1)
                        : desc;
                      return (
                        <div
                          key={project.id}
                          className={`group/proj border-border bg-background flex h-full overflow-hidden rounded-[12px] border shadow-sm transition-shadow hover:shadow-md ${
                            isSideBySide
                              ? `flex-col gap-4 p-4 2xl:gap-6 2xl:p-6 ${
                                  layoutType === "3"
                                    ? "xl:flex-row xl:items-center"
                                    : "xl:flex-row-reverse xl:items-center"
                                }`
                              : "flex-col"
                          }`}
                        >
                          <div
                            className={`bg-secondary-bg border-border relative overflow-hidden ${
                              isSideBySide
                                ? "aspect-[16/10] w-full rounded-xl border xl:w-[240px] 2xl:w-[320px]"
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

                          <div
                            className={`flex min-w-0 flex-1 flex-col ${
                              isSideBySide ? "justify-center" : "p-6"
                            }`}
                          >
                            <div className="mb-1 flex items-start gap-2">
                              <h3 className="text-primary-text text-[16px] font-bold">
                                {project.title}
                              </h3>
                            </div>

                            {hasCategory && (
                              <span className="text-brand-hover-bg text-[12px] font-semibold">
                                {categoryText}
                              </span>
                            )}

                            {descriptionText && (
                              <p className="text-secondary-text mb-6 line-clamp-2 text-[13px]">
                                {descriptionText}
                              </p>
                            )}

                            {project.url && (
                              <a
                                href={sanitizeUrl(project.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-hover-bg mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold hover:underline"
                              >
                                {project.buttonText || "View Project"}
                                <ArrowRight size={14} strokeWidth={2.5} />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

        if (section.type === "cta") {
          return (
            <section
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group hover:border-border hover:bg-background/50 relative w-full cursor-pointer rounded-2xl border border-transparent p-6 transition-colors ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
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
                  className="op-brand-fill bg-brand-hover-bg hover:bg-button-brand-bg inline-flex h-12 items-center justify-center rounded-xl px-8 text-[15px] font-bold text-white shadow-sm transition-all"
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
