import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Trash2,
  MessageSquare,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import {
  getImageUrl,
  sanitizeUrl,
  isProjectHighlighted,
  getSectionStyle,
} from "@/utils/profile";
import type { Section, ProfilePreview } from "../types";
import { getFontClass } from "../../templates/TemplateAppearanceProvider";
import { TemplateLinkCard, getLinkIcon } from "../../shared/TemplateLinkCard";
import HighlightPreviewCard from "./HighlightPreviewCard";
import { getInitials } from "@/utils/avatar";

interface CreatorPreviewProps {
  sections: Section[];
  profile?: ProfilePreview | null;
  selectedSectionId?: string | null;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
}

export default function CreatorPreview({
  sections,
  profile,
  selectedSectionId,
  onToggleSectionVisibility,
  onRemoveSection,
}: CreatorPreviewProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "links" | "about">(
    "projects"
  );

  useEffect(() => {
    if (selectedSectionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (selectedSectionId === "projects") setActiveTab("projects");
      else if (selectedSectionId === "links") setActiveTab("links");
      else if (selectedSectionId === "bio") setActiveTab("about");
    }
  }, [selectedSectionId]);

  const visibleSections = sections.filter((section) => section.visible);

  const bioSection = sections.find((s) => s.type === "bio");
  const linksSection = sections.find((s) => s.type === "links");
  const ctaSection = sections.find((s) => s.type === "experience");
  const bioSectionId = bioSection?.id ?? "bio";
  const resolvedName = profile?.fullName || "Micaela Robinson";

  const renderControls = (section?: Section, isBio: boolean = false) => {
    if (!section) return null;
    return (
      <div className="group/menu pointer-events-none absolute -top-12 right-0 z-50 opacity-0 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
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
      {(!selectedSectionId ||
        selectedSectionId === bioSectionId ||
        selectedSectionId === ctaSection?.id) && (
        <div
          className={`relative mx-auto mt-6 flex w-full max-w-4xl flex-col items-center gap-4 rounded-2xl p-6 text-center ${bioSection?.font ? getFontClass(bioSection.font) : ""}`}
          style={getSectionStyle(bioSection)}
        >
          {renderControls(bioSection, true)}

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
                {getInitials(resolvedName)}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-primary-text flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {resolvedName}
            </h1>
            <p className="text-secondary-text mt-1 text-[15px]">
              openprofile.app/{profile?.username || "micaela"}
            </p>
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-2 flex items-center gap-4">
              {socialLinks.map((link, i) => {
                return (
                  <div
                    key={i}
                    className="text-secondary-text transition-colors"
                  >
                    {getLinkIcon(
                      (link.url || "") + " " + (link.title || link.label || "")
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {ctaSection && ctaSection.visible && (
            <div className="group relative mt-4">
              <div className="group/menu absolute -top-8 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="text-tertiary-text hover:text-primary-text hover:bg-hover-bg flex h-8 w-8 cursor-pointer items-center justify-center rounded-[8px] transition-colors">
                  <MoreHorizontal size={16} />
                </button>

                <div className="border-border bg-background invisible absolute top-full left-1/2 mt-2 flex w-36 -translate-x-1/2 flex-col overflow-hidden rounded-xl border opacity-0 shadow-lg transition-all group-hover/menu:visible group-hover/menu:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSectionVisibility(ctaSection.id);
                    }}
                    className="text-secondary-text hover:bg-hover-bg hover:text-primary-text flex w-full items-center gap-3 px-3 py-2 text-[13px] font-medium transition-colors"
                  >
                    {ctaSection.visible ? (
                      <>
                        <EyeOff size={14} /> Hide
                      </>
                    ) : (
                      <>
                        <Eye size={14} /> Show
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      if (ctaSection.type !== "bio") {
                        e.stopPropagation();
                        onRemoveSection(ctaSection.id);
                      }
                    }}
                    disabled={ctaSection.type === "bio"}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-[13px] font-medium transition-colors ${ctaSection.type === "bio" ? "text-negative-text cursor-not-allowed opacity-50" : "text-negative-text hover:bg-negative-bg/20"}`}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="bg-brand-hover-bg hover:bg-button-brand-bg inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-white shadow-sm transition-all"
              >
                {ctaSection.iconSrc ? (
                  <Image
                    src={getImageUrl(ctaSection.iconSrc) || ""}
                    alt="CTA Icon"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain brightness-0 invert"
                    unoptimized
                  />
                ) : (
                  <MessageSquare size={16} />
                )}
                {ctaSection.buttonText || "Let's Collaborate"}
              </a>
            </div>
          )}
        </div>
      )}

      {/* CREATOR TABS */}
      {(!selectedSectionId ||
        ["projects", "links", "bio"].includes(selectedSectionId)) && (
        <>
          <div
            className="border-border flex items-center justify-center gap-8 border-b"
            style={{ marginTop: "var(--op-spacing, 2rem)" }}
          >
            <button
              onClick={() => setActiveTab("projects")}
              className={`relative pb-3 text-[15px] font-semibold transition-colors ${activeTab === "projects" ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
            >
              Projects
              {activeTab === "projects" && (
                <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("links")}
              className={`relative pb-3 text-[15px] font-semibold transition-colors ${activeTab === "links" ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
            >
              Links
              {activeTab === "links" && (
                <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`relative pb-3 text-[15px] font-semibold transition-colors ${activeTab === "about" ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
            >
              About
              {activeTab === "about" && (
                <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
              )}
            </button>
          </div>

          <div
            className="w-full"
            style={{ marginTop: "var(--op-spacing, 2rem)" }}
          >
            {/* CREATOR TAB CONTENT */}
            {visibleSections.map((section) => {
              if (
                selectedSectionId &&
                selectedSectionId !== section.id &&
                selectedSectionId !== bioSectionId &&
                section.id !== ctaSection?.id
              )
                return null;

              // Projects Tab
              if (section.type === "projects" && activeTab === "projects") {
                const projectsToRender = section.projects || [];
                const highlightedProject =
                  projectsToRender.find(isProjectHighlighted);
                const remainingProjects = projectsToRender.filter(
                  (p) => p.id !== highlightedProject?.id
                );

                return (
                  <div
                    key={section.id}
                    className={`relative mx-auto flex w-full max-w-4xl flex-col gap-6 ${section.font ? getFontClass(section.font) : ""}`}
                    style={(() => {
                      const { gap: _gap, ...rest } = getSectionStyle(section);
                      return rest;
                    })()}
                  >
                    <HighlightPreviewCard
                      projectsSection={section}
                      variant="transparent"
                    />
                    <div className="relative w-full">
                      {renderControls(section)}
                      {remainingProjects.length > 0 ? (
                        <div
                          className={`grid gap-6 ${
                            section.layout === "1"
                              ? "grid-cols-1"
                              : section.layout === "3"
                                ? "grid-cols-1 sm:grid-cols-2"
                                : section.layout === "4"
                                  ? "grid-cols-1 sm:grid-cols-2"
                                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                          }`}
                          style={{
                            gap: section.gap ? `${section.gap}px` : undefined,
                          }}
                        >
                          {remainingProjects.map((project) => {
                            const layoutType = section.layout || "2";
                            const hasUrl = Boolean(project.url);
                            const displayImg = getImageUrl(project.imageSrc);

                            const card = (
                              <div
                                className={`group border-border bg-background hover:border-brand-hover-bg/30 flex h-full rounded-3xl border p-4 shadow-sm transition-shadow hover:shadow-md ${
                                  layoutType === "1"
                                    ? "flex-col justify-between sm:flex-row sm:items-center"
                                    : layoutType === "3"
                                      ? "flex-col sm:flex-row sm:items-start"
                                      : layoutType === "4"
                                        ? "flex-col sm:flex-row-reverse sm:items-start"
                                        : "flex-col" // Layout 2
                                }`}
                              >
                                {/* IMAGE */}
                                {layoutType !== "1" && (
                                  <div
                                    className={`border-border bg-secondary-bg relative mb-4 shrink-0 overflow-hidden rounded-lg border ${
                                      layoutType === "2"
                                        ? "aspect-video w-full"
                                        : "h-[120px] w-full sm:mb-0 sm:w-[140px]"
                                    } ${layoutType === "3" ? "sm:mr-5" : ""} ${layoutType === "4" ? "sm:ml-5" : ""}`}
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
                                )}

                                {/* CONTENT */}
                                <div className="flex min-w-0 flex-1 flex-col items-start">
                                  <h5 className="text-primary-text text-xl font-bold break-all">
                                    {project.title}
                                  </h5>
                                  <p
                                    className={`text-secondary-text mt-1 break-all ${layoutType === "1" ? "line-clamp-1" : "line-clamp-2"}`}
                                  >
                                    {project.description}
                                  </p>
                                  {layoutType !== "1" && (
                                    <span className="text-brand-hover-bg mt-3 flex items-center gap-1 text-sm font-semibold hover:underline">
                                      {hasUrl ? "View project" : "Edit project"}
                                      <ChevronRight size={16} />
                                    </span>
                                  )}
                                </div>

                                {/* BUTTON FOR LAYOUT 1 */}
                                {layoutType === "1" && (
                                  <div className="mt-4 shrink-0 sm:mt-0 sm:ml-6">
                                    <span className="text-brand-hover-bg flex items-center gap-1 text-sm font-bold hover:underline">
                                      {hasUrl ? "View project" : "Edit project"}
                                      <ChevronRight size={16} />
                                    </span>
                                  </div>
                                )}
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
              if (section.type === "links" && activeTab === "links") {
                return (
                  <div
                    key={section.id}
                    className={`relative mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-3xl ${section.font ? getFontClass(section.font) : ""}`}
                    style={(() => {
                      const { gap: _gap, ...rest } = getSectionStyle(section);
                      return rest;
                    })()}
                  >
                    {renderControls(section)}
                    {allLinks.length > 0 ? (
                      <div
                        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        style={{
                          gap: section.gap ? `${section.gap}px` : undefined,
                        }}
                      >
                        {allLinks.map((link) => (
                          <TemplateLinkCard
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
              if (section.type === "bio" && activeTab === "about") {
                return (
                  <div
                    key={section.id}
                    className={`border-border mx-auto max-w-4xl rounded-3xl border p-8 sm:p-10 ${section.font ? getFontClass(section.font) : ""}`}
                    style={getSectionStyle(section)}
                  >
                    <p className="text-secondary-text text-center text-[15px] leading-relaxed break-all whitespace-pre-wrap">
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
