import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  getImageUrl,
  sanitizeUrl,
  isProjectHighlighted,
  getSectionStyle,
} from "@/utils/profile";
import type { Section, ProfilePreview } from "../types";
import { getFontClass } from "../../templates/TemplateAppearanceProvider";
import { CreatorLinkCard, getLinkIcon } from "../../shared/TemplateLinkCard";
import HighlightPreviewCard from "./HighlightPreviewCard";
import PreviewSectionControls from "./PreviewSectionControls";
import { getInitials } from "@/utils/avatar";

interface CreatorPreviewProps {
  sections: Section[];
  profile?: ProfilePreview | null;
  selectedSectionId?: string | null;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
  onSelectSection: (id: string) => void;
}

export default function CreatorPreview({
  sections,
  profile,
  selectedSectionId,
  onToggleSectionVisibility,
  onRemoveSection,
  onSelectSection,
}: CreatorPreviewProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "links" | "about">(
    "projects"
  );

  useEffect(() => {
    if (!selectedSectionId) return;

    const selectedSection = sections.find(
      (section) => section.id === selectedSectionId
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selectedSection?.type === "projects") setActiveTab("projects");
    else if (selectedSection?.type === "links") setActiveTab("links");
    else if (selectedSection?.type === "bio") setActiveTab("about");
  }, [sections, selectedSectionId]);

  const visibleSections = sections;

  const bioSection = visibleSections.find((s) => s.type === "bio");
  const projectsSection = visibleSections.find((s) => s.type === "projects");
  const linksSection = visibleSections.find((s) => s.type === "links");
  const ctaSection = visibleSections.find((s) => s.type === "cta");

  const resolvedName = profile?.fullName ?? "";

  const availableTabIds = [
    projectsSection ? "projects" : null,
    linksSection ? "links" : null,
    bioSection ? "about" : null,
  ].filter(Boolean) as Array<"projects" | "links" | "about">;

  const currentActiveTab = availableTabIds.includes(activeTab)
    ? activeTab
    : availableTabIds[0] || "about";

  const handleSelectSection = (
    event: React.MouseEvent<HTMLElement>,
    section: Section
  ) => {
    event.preventDefault();
    onSelectSection(section.id);
  };

  const handleSelectNestedSection = (
    event: React.MouseEvent<HTMLElement>,
    section: Section
  ) => {
    event.preventDefault();
    event.stopPropagation();
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

  // Filter links for the header social row in Creator layout
  const allLinks = linksSection?.links || [];
  const socialLinks = allLinks
    .filter((link) => {
      const url = (link.url || "").toLowerCase();
      return (
        url.includes("twitter") ||
        url.includes("x.com") ||
        url.includes("linkedin") ||
        url.includes("instagram") ||
        url.includes("facebook") ||
        url.includes("youtube") ||
        url.includes("whatsapp")
      );
    })
    .slice(0, 4);

  return (
    <div className="flex w-full flex-col">
      {/* CREATOR HEADER (Bio Section) */}
      {bioSection && (
        <div
          role="button"
          tabIndex={0}
          onClick={(event) => handleSelectSection(event, bioSection)}
          onKeyDown={(event) => handleSectionKeyDown(event, bioSection)}
          className={`group relative mx-auto mt-6 flex w-full max-w-4xl cursor-pointer flex-col items-center gap-4 rounded-2xl p-6 text-center ${bioSection.font ? getFontClass(bioSection.font) : ""}`}
          style={getSectionStyle(bioSection)}
        >
          <div className="border-border bg-secondary-bg relative h-24 w-24 shrink-0 overflow-hidden rounded-full border">
            {getImageUrl(profile?.photoUrl) ? (
              <Image
                src={getImageUrl(profile?.photoUrl) || ""}
                alt={profile?.fullName ?? "Profile avatar"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="bg-brand-hover-bg text-inverse-text flex h-full w-full items-center justify-center text-[40px] font-bold">
                {resolvedName ? getInitials(resolvedName) : "?"}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-primary-text flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {resolvedName}
            </h1>
            <p className="text-brand-hover-bg mt-1 text-[15px]">
              openprofile.app/{profile?.username || "micaela"}
            </p>
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-2 flex items-center gap-4">
              {socialLinks.map((link, i) => {
                return (
                  <div
                    key={i}
                    className="text-brand-hover-bg transition-colors"
                  >
                    {getLinkIcon(
                      (link.url || "") + " " + (link.title || link.label || "")
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {ctaSection && (
            <div
              className={`group/cta relative mt-4 ${!ctaSection.visible ? "opacity-50 grayscale" : ""}`}
            >
              {renderControls(
                ctaSection,
                "top-1/2 left-full ml-3 -translate-y-1/2",
                "cta"
              )}
              <a
                href={sanitizeUrl(ctaSection.url || "#")}
                onClick={(event) =>
                  handleSelectNestedSection(event, ctaSection)
                }
                className="op-brand-fill bg-brand-hover-bg hover:bg-button-brand-bg inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-white shadow-sm transition-all"
              >
                {ctaSection.iconSrc && (
                  <Image
                    src={getImageUrl(ctaSection.iconSrc) || ""}
                    alt="CTA Icon"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain brightness-0 invert"
                    unoptimized
                  />
                )}
                {ctaSection.buttonText || "Let's Collaborate"}
              </a>
            </div>
          )}
        </div>
      )}

      {/* CREATOR TABS */}
      {availableTabIds.length > 0 && (
        <>
          <div
            className="border-border flex items-center justify-center gap-8 border-b"
            style={{ marginTop: "var(--op-spacing, 2rem)" }}
          >
            {projectsSection && (
              <button
                onClick={() => setActiveTab("projects")}
                className={`relative pb-3 text-[15px] font-semibold transition-colors ${currentActiveTab === "projects" ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
              >
                Projects
                {currentActiveTab === "projects" && (
                  <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
                )}
              </button>
            )}
            {linksSection && (
              <button
                onClick={() => setActiveTab("links")}
                className={`relative pb-3 text-[15px] font-semibold transition-colors ${currentActiveTab === "links" ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
              >
                Links
                {currentActiveTab === "links" && (
                  <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
                )}
              </button>
            )}
            {bioSection && (
              <button
                onClick={() => setActiveTab("about")}
                className={`relative pb-3 text-[15px] font-semibold transition-colors ${currentActiveTab === "about" ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
              >
                About
                {currentActiveTab === "about" && (
                  <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
                )}
              </button>
            )}
          </div>
          <div
            className="w-full"
            style={{ marginTop: "var(--op-spacing, 2rem)" }}
          >
            {/* CREATOR TAB CONTENT */}
            {visibleSections.map((section) => {
              // Projects Tab
              if (
                section.type === "projects" &&
                currentActiveTab === "projects"
              ) {
                const projectsToRender = section.projects || [];
                const highlightedProject =
                  projectsToRender.find(isProjectHighlighted);
                const remainingProjects = projectsToRender.filter(
                  (p) => p.id !== highlightedProject?.id
                );

                return (
                  <div
                    key={section.id}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => handleSelectSection(event, section)}
                    onKeyDown={(event) => handleSectionKeyDown(event, section)}
                    className={`group relative mx-auto flex w-full max-w-4xl cursor-pointer flex-col gap-6 ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
                    style={(() => {
                      const {
                        gap: _gap,
                        backgroundColor: _bg,
                        ...rest
                      } = getSectionStyle(section);
                      return rest;
                    })()}
                  >
                    {renderControls(section)}
                    <HighlightPreviewCard
                      projectsSection={section}
                      variant="transparent"
                    />
                    <div className="relative w-full">
                      {remainingProjects.length > 0 ? (
                        <div
                          className={`grid w-full gap-6 ${
                            section.layout === "2"
                              ? "grid-cols-1 sm:grid-cols-2"
                              : "grid-cols-1"
                          }`}
                          style={{
                            gap: section.gap ? `${section.gap}px` : undefined,
                          }}
                        >
                          {remainingProjects.map((project) => {
                            const hasUrl = Boolean(project.url);
                            const displayImg = getImageUrl(project.imageSrc);
                            const layoutType = section.layout || "2";

                            const desc = project.description || "";
                            const newlineIndex = desc.indexOf("\n");
                            const hasCategory = newlineIndex !== -1;
                            const categoryText = hasCategory
                              ? desc.substring(0, newlineIndex)
                              : "";
                            const descriptionText = hasCategory
                              ? desc.substring(newlineIndex + 1)
                              : desc;

                            const isSideBySide =
                              layoutType === "3" || layoutType === "4";

                            const card = (
                              <div
                                className={`group border-border bg-background hover:border-brand-hover-bg/30 flex h-full overflow-hidden rounded-3xl border shadow-sm transition-shadow hover:shadow-md ${
                                  isSideBySide
                                    ? `flex-col gap-4 p-4 2xl:gap-6 2xl:p-6 ${
                                        layoutType === "3"
                                          ? "xl:flex-row xl:items-center"
                                          : "xl:flex-row-reverse xl:items-center"
                                      }`
                                    : "flex-col"
                                }`}
                              >
                                {/* IMAGE */}
                                <div
                                  className={`bg-secondary-bg border-border relative shrink-0 overflow-hidden ${
                                    isSideBySide
                                      ? "aspect-[16/10] w-full rounded-xl border xl:w-[240px] 2xl:w-[320px]"
                                      : "aspect-video w-full border-b"
                                  }`}
                                >
                                  {displayImg ? (
                                    <Image
                                      src={displayImg}
                                      alt={project.title ?? "Project"}
                                      className="object-cover"
                                      fill
                                      unoptimized
                                    />
                                  ) : (
                                    <div className="text-tertiary-text flex h-full w-full items-center justify-center text-xs">
                                      No image
                                    </div>
                                  )}
                                </div>

                                {/* CONTENT */}
                                <div
                                  className={`flex min-w-0 flex-1 flex-col items-start ${
                                    isSideBySide ? "justify-center" : "p-5"
                                  }`}
                                >
                                  <h5 className="text-primary-text text-xl font-bold break-words">
                                    {project.title}
                                  </h5>

                                  {hasCategory && (
                                    <span className="text-tertiary-text mt-1 text-[13px] font-medium">
                                      {categoryText}
                                    </span>
                                  )}

                                  <p className="text-secondary-text mt-2 line-clamp-3 text-[14px] leading-relaxed break-words">
                                    {descriptionText}
                                  </p>
                                  {hasUrl && (
                                    <span className="text-brand-hover-bg mt-4 flex items-center gap-1 text-[14px] font-bold hover:underline">
                                      {project.buttonText || "View project"}
                                      <ChevronRight size={16} />
                                    </span>
                                  )}
                                </div>
                              </div>
                            );

                            return (
                              <div key={project.id} className="w-full">
                                {hasUrl ? (
                                  <a
                                    href={sanitizeUrl(project.url || "")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full no-underline"
                                  >
                                    {card}
                                  </a>
                                ) : (
                                  <div className="h-full">{card}</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-tertiary-text border-border rounded-xl border border-dashed py-8 text-center text-sm">
                          No projects added yet.
                        </p>
                      )}
                    </div>
                  </div>
                );
              }

              // Links Tab
              if (section.type === "links" && currentActiveTab === "links") {
                return (
                  <div
                    key={section.id}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => handleSelectSection(event, section)}
                    onKeyDown={(event) => handleSectionKeyDown(event, section)}
                    className={`group relative mx-auto flex w-full max-w-2xl cursor-pointer flex-col gap-4 rounded-3xl ${!section.visible ? "opacity-50 grayscale" : ""} ${section.font ? getFontClass(section.font) : ""}`}
                    style={(() => {
                      const {
                        gap: _gap,
                        backgroundColor: _bg,
                        ...rest
                      } = getSectionStyle(section);
                      return rest;
                    })()}
                  >
                    {renderControls(section)}
                    {allLinks.length > 0 ? (
                      <div
                        className="flex w-full flex-col gap-3"
                        style={{
                          gap: section.gap ? `${section.gap}px` : undefined,
                        }}
                      >
                        {allLinks.map((link) => (
                          <CreatorLinkCard
                            key={link.id}
                            id={link.id}
                            title={link.title || link.label || ""}
                            url={link.url ? sanitizeUrl(link.url) : "#"}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-tertiary-text border-border rounded-xl border border-dashed py-8 text-center text-sm">
                        No links added yet.
                      </p>
                    )}
                  </div>
                );
              }

              // About Tab
              if (section.type === "bio" && currentActiveTab === "about") {
                return (
                  <div
                    key={section.id}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => handleSelectSection(event, section)}
                    onKeyDown={(event) => handleSectionKeyDown(event, section)}
                    className={`border-border group mx-auto max-w-4xl cursor-pointer rounded-3xl border p-8 sm:p-10 ${section.font ? getFontClass(section.font) : ""}`}
                    style={getSectionStyle(section)}
                  >
                    <p className="text-secondary-text text-center text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                      {section.bio ||
                        "Write a little bit about yourself here..."}
                    </p>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
}
