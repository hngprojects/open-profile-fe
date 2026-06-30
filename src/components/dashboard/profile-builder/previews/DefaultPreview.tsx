import React from "react";
import Image from "next/image";
import { ExternalLink, ChevronRight } from "lucide-react";
import {
  getImageUrl,
  sanitizeUrl,
  getSectionStyle,
  isProjectHighlighted,
} from "@/utils/profile";
import type { Section, ProfilePreview, SavedLink, ProjectItem } from "../types";
import { getFontClass } from "../../templates/TemplateAppearanceProvider";
import { getLinkIcon } from "../../shared/TemplateLinkCard";
import HighlightPreviewCard from "./HighlightPreviewCard";
import PreviewSectionControls from "./PreviewSectionControls";

interface DefaultPreviewProps {
  sections: Section[];
  profile?: ProfilePreview | null;
  selectedSectionId?: string | null;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
  onSelectSection: (id: string) => void;
}

export default function DefaultPreview({
  sections,
  profile,
  selectedSectionId: _selectedSectionId,
  onToggleSectionVisibility,
  onRemoveSection,
  onSelectSection,
}: DefaultPreviewProps) {
  const rawPhotoUrl = profile?.photoUrl;
  const profileImageUrl = rawPhotoUrl
    ? rawPhotoUrl.startsWith("/profile-preview/")
      ? rawPhotoUrl
      : getImageUrl(rawPhotoUrl)
    : null;

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
      className="text-primary-text mx-auto flex w-full max-w-4xl flex-col py-12"
      style={{ gap: "var(--op-spacing, 1.5rem)" }}
    >
      {visibleSections.map((section) => {
        if (section.type === "bio") {
          return (
            <div
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group relative w-full cursor-pointer transition-opacity duration-200 ${section.font ? getFontClass(section.font) : ""}`}
            >
              <section
                className="border-border bg-background flex w-full flex-row items-start gap-6 rounded-2xl border p-6 shadow-sm"
                style={getSectionStyle(section)}
              >
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt={profile?.fullName ?? "Profile avatar"}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-brand-subtle-bg text-brand-hover-bg flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold">
                    {profile?.fullName?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h2 className="text-primary-text text-[26px] leading-tight font-bold tracking-tight break-words">
                    {profile?.fullName ?? "No Name"}
                  </h2>
                  <p className="text-brand-hover-bg mt-1 text-[14px] font-semibold">
                    @{profile?.username ?? "micaela"}
                  </p>
                  <p className="text-secondary-text mt-2 text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                    {section.bio || profile?.bio || "No bio added yet."}
                  </p>
                </div>
              </section>
            </div>
          );
        }

        if (section.type === "links") {
          return (
            <div
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group relative w-full cursor-pointer transition-opacity duration-200 ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
            >
              {renderControls(section)}
              <section
                className="border-border bg-background w-full rounded-2xl border p-6 shadow-sm"
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                <div className="mb-6 flex flex-col gap-1">
                  <h2 className="text-primary-text text-[20px] font-bold tracking-tight">
                    {section.title || "Featured Links"}
                  </h2>
                  {section.subtitle && (
                    <p className="text-secondary-text text-sm font-medium">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                {section.links && section.links.length > 0 ? (
                  <div
                    className="flex flex-col gap-4"
                    style={{
                      gap: section.gap ? `${section.gap}px` : undefined,
                    }}
                  >
                    {section.links.map((item: SavedLink, index: number) => {
                      const displayImg = getImageUrl(item.imageSrc);
                      return (
                        <a
                          key={item.id ?? index}
                          href={sanitizeUrl(item.url || "")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-border bg-background hover:border-brand-hover-bg/30 flex items-center justify-between rounded-2xl border p-4 no-underline shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex items-center gap-5">
                            <span className="border-border bg-background flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border">
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
                              <h3 className="text-primary-text text-[15px] font-bold break-words">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          <span className="border-border bg-background group-hover:border-brand-hover-bg/30 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border transition-colors">
                            <ExternalLink
                              className="text-brand-hover-bg shrink-0"
                              size={18}
                            />
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-secondary-text mt-4 flex items-center justify-between text-sm">
                    No links added yet
                  </span>
                )}
              </section>
            </div>
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
              className={`group relative flex w-full cursor-pointer flex-col gap-6 ${!section.visible ? "opacity-50 grayscale" : ""}`}
            >
              {renderControls(section)}
              <HighlightPreviewCard projectsSection={section} />

              <section
                className={`border-border bg-background w-full rounded-2xl border p-6 shadow-sm ${section.font ? getFontClass(section.font) : ""}`}
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                {(section.title || section.subtitle) && (
                  <div className="mb-6 flex flex-col gap-1">
                    {section.title && (
                      <h2 className="text-primary-text text-[20px] font-bold tracking-tight">
                        {section.title}
                      </h2>
                    )}
                    {section.subtitle && (
                      <p className="text-secondary-text text-sm font-medium">
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                )}
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
                    {remainingProjects.map(
                      (project: ProjectItem, index: number) => {
                        const hasUrl = Boolean(project.url);
                        const rawImageSrc = (project as { imageSrc?: string })
                          .imageSrc;
                        const displayImg = rawImageSrc
                          ? rawImageSrc.startsWith("/profile-preview/")
                            ? rawImageSrc
                            : getImageUrl(rawImageSrc)
                          : null;

                        const layoutType = section.layout || "2";
                        const isSideBySide =
                          layoutType === "3" || layoutType === "4";

                        const card = (
                          <div
                            className={`border-border bg-background group/proj flex h-full overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md ${
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
                              className={`bg-secondary-bg border-border relative aspect-[16/10] overflow-hidden ${
                                isSideBySide
                                  ? "w-full shrink-0 rounded-xl border xl:w-[240px] 2xl:w-[320px]"
                                  : "w-full border-b"
                              }`}
                            >
                              {displayImg ? (
                                <Image
                                  src={displayImg}
                                  alt={project.title ?? "Project preview"}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover/proj:scale-[1.02]"
                                  unoptimized
                                />
                              ) : (
                                <div className="text-tertiary-text flex h-full w-full items-center justify-center bg-neutral-200 text-sm">
                                  No image
                                </div>
                              )}
                            </div>
                            <div
                              className={`flex min-w-0 flex-1 flex-col ${
                                isSideBySide
                                  ? "items-start justify-center"
                                  : "p-6"
                              }`}
                            >
                              <h3 className="text-primary-text text-[18px] font-bold break-words">
                                {project.title}
                              </h3>
                              {project.description && (
                                <p className="text-brand-hover-bg mt-1 text-[14px] font-semibold wrap-break-word">
                                  {project.description}
                                </p>
                              )}
                              {hasUrl && (
                                <span className="text-primary-text mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold hover:underline">
                                  {project.buttonText || "View project"}
                                  <span className="text-lg leading-none">
                                    ›
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                        );

                        return hasUrl ? (
                          <a
                            key={project.id || index}
                            href={sanitizeUrl(project.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full no-underline"
                          >
                            {card}
                          </a>
                        ) : (
                          <div
                            key={project.id || index}
                            className="block h-full no-underline"
                          >
                            {card}
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <span className="text-secondary-text mt-4 flex items-center justify-between text-sm">
                    Add your projects
                  </span>
                )}
              </section>
            </div>
          );
        }

        if (section.type === "cta") {
          return (
            <div
              key={section.id}
              role="button"
              tabIndex={0}
              onClick={(event) => handleSelectSection(event, section)}
              onKeyDown={(event) => handleSectionKeyDown(event, section)}
              className={`group relative cursor-pointer transition-opacity duration-200 ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
            >
              {renderControls(section)}
              <section
                className="border-border bg-background relative w-full rounded-2xl border p-12 shadow-sm"
                style={getSectionStyle(section)}
              >
                <div
                  className={`flex flex-col ${section.layout === "2" ? "items-start text-left" : section.layout === "3" ? "items-end text-right" : "items-center text-center"}`}
                >
                  {section.iconSrc && (
                    <div className="border-border bg-background mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] border">
                      <div
                        className="bg-brand-hover-bg h-6 w-6"
                        style={{
                          maskImage: `url(${section.iconSrc.startsWith("/profile-preview/") || section.iconSrc.startsWith("http") ? section.iconSrc : getImageUrl(section.iconSrc)})`,
                          WebkitMaskImage: `url(${section.iconSrc.startsWith("/profile-preview/") || section.iconSrc.startsWith("http") ? section.iconSrc : getImageUrl(section.iconSrc)})`,
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
                  <div
                    className={`flex flex-col ${section.layout === "2" ? "items-start text-left" : section.layout === "3" ? "items-end text-right" : "items-center text-center"}`}
                  >
                    <h4 className="text-primary-text text-[28px] font-bold tracking-tight break-words">
                      {section.title || "Your CTA"}
                    </h4>
                    {section.subtitle && (
                      <p className="text-secondary-text mt-3 max-w-[600px] text-base leading-relaxed break-words whitespace-pre-wrap">
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                  {section.title || section.url ? (
                    <a
                      href={sanitizeUrl(section.url || "#")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!section.url) e.preventDefault();
                      }}
                      className="op-brand-fill bg-brand-hover-bg hover:bg-button-brand-bg mt-8 inline-flex h-12 items-center rounded-xl px-8 text-[15px] font-bold text-white transition-colors"
                    >
                      {section.buttonText || "Visit"}
                    </a>
                  ) : (
                    <span className="text-brand-hover-bg mt-8 flex cursor-pointer items-center gap-1 text-sm font-semibold hover:underline">
                      Add your CTA <ChevronRight size={14} />
                    </span>
                  )}
                </div>
              </section>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
