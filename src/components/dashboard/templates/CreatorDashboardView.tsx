"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, ChevronRight } from "lucide-react";
import { TemplateLinkCard, getLinkIcon } from "../shared/TemplateLinkCard";
import {
  DashboardProfileResponse,
  ProfileContentResponse,
  LinkItem,
  ProjectItem,
  ProfileAppearanceSettings,
} from "@/api/profile/profile.type";
import {
  getImageUrl,
  isProjectHighlighted,
  getSectionStyle,
  sanitizeUrl,
  getDisplayProfileUrl,
} from "@/utils/profile";
import { getInitials } from "@/utils/avatar";
import { TemplateFooter } from "./TemplateFooter";
import HighlightCard from "../HighlightCard";
import { contentToSections } from "../profile-builder/builder.utils";
import type { SavedLink } from "../profile-builder/types";
import { getFontClass } from "./TemplateAppearanceProvider";

type Props = {
  profile?: DashboardProfileResponse;
  content?: ProfileContentResponse;
  isLoadingProfile?: boolean;
  isLoadingContent?: boolean;
  appearance?: ProfileAppearanceSettings | null;
  isPreview?: boolean;
};

const DEFAULT_LINKS = [
  { id: "link-1", title: "Instagram", url: "https://instagram.com/johnsmith" },
  { id: "link-2", title: "Twitter / X", url: "https://twitter.com/johnsmith" },
  { id: "link-3", title: "LinkedIn", url: "https://linkedin.com/in/johnsmith" },
  { id: "link-4", title: "Facebook", url: "https://facebook.com/johnsmith" },
  { id: "link-5", title: "Website", url: "https://johnsmithdesign.com" },
] as LinkItem[];

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Summer Campaign x [Pitaya]",
    description:
      "A cross-platform content series reaching over 2M views, focusing on sustainable lifestyle.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature1.jpg",
  },
  {
    id: "proj-2",
    title: "The 30-Day Creative Challenge",
    description: "Launched a guided workshop series for 10,000+ creators.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature2.jpg",
  },
  {
    id: "proj-3",
    title: "Documentary Series",
    description: "A 3-part YouTube series exploring the creator economy.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature3.jpg",
  },
] as ProjectItem[];

export default function CreatorDashboardView({
  profile,
  content,
  isLoadingProfile,
  isLoadingContent,
  appearance,
  isPreview,
}: Props) {
  const [activeTab, setActiveTab] = useState<"projects" | "links" | "about">(
    "projects"
  );

  if (isLoadingProfile || isLoadingContent) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="border-brand-hover-bg h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  const rawSections = contentToSections(
    content || ({ content: {} } as any),
    profile || ({} as any)
  );

  const componentsAppearance =
    (appearance as any)?.components ||
    (profile as any)?.appearance?.components ||
    {};

  const sections = rawSections.map((section) => {
    const appearanceKey = section.type === "experience" ? "cta" : section.type;
    const secAppearance = componentsAppearance[appearanceKey] || {};
    return {
      ...section,
      bgColor:
        secAppearance.backgroundColour ||
        secAppearance.bgColor ||
        section.bgColor,
      textColor:
        secAppearance.textColour ||
        secAppearance.textColor ||
        section.textColor,
      iconColor:
        secAppearance.accentColour ||
        secAppearance.iconColor ||
        section.iconColor,
      font: (secAppearance as any).font || section.font,
    };
  });

  const visibleSections = sections.filter((section) => section.visible);

  const bioSection = sections.find((s) => s.type === "bio");
  const linksSection = sections.find((s) => s.type === "links");
  const ctaSection = sections.find((s) => s.type === "experience");
  const resolvedName = profile?.fullName || "Micaela Robinson";

  const allLinks = (
    linksSection?.links?.length
      ? linksSection.links
      : isPreview
        ? DEFAULT_LINKS
        : []
  ) as SavedLink[];

  const ctaHref = !ctaSection?.url
    ? null
    : ctaSection.ctaType === "email"
      ? `mailto:${ctaSection.url}`
      : ctaSection.ctaType === "phone"
        ? `tel:${ctaSection.url}`
        : ctaSection.ctaType === "whatsapp"
          ? `https://wa.me/${ctaSection.url.replace(/\D/g, "")}`
          : sanitizeUrl(ctaSection.url);

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
    <div className="flex w-full flex-col px-4 sm:px-6">
      {/* CREATOR HEADER (Bio Section) */}
      {(!bioSection || bioSection.visible !== false) && (
        <div
          className={`relative mt-6 flex w-full flex-col items-center gap-4 rounded-2xl p-6 text-center ${bioSection?.font ? getFontClass(bioSection.font) : ""}`}
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
                {getInitials(resolvedName)}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-primary-text flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {resolvedName}
            </h1>
            <p className="text-secondary-text mt-1 text-[15px]">
              {getDisplayProfileUrl(profile?.username || "micaela")}
            </p>
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-2 flex items-center gap-4">
              {socialLinks.map((link, i) => {
                return (
                  <a
                    key={i}
                    href={sanitizeUrl(link.url || "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-text hover:text-primary-text transition-colors"
                  >
                    {getLinkIcon(
                      (link.url || "") + " " + (link.title || link.label || "")
                    )}
                  </a>
                );
              })}
            </div>
          )}

          {ctaSection && ctaSection.visible && ctaHref && (
            <div className="relative mt-4">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
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
      {visibleSections.some((s) =>
        ["projects", "links", "bio"].includes(s.type)
      ) && (
        <div
          className="border-border flex items-center justify-center gap-8 border-b"
          style={{ marginTop: "var(--op-spacing, 2rem)" }}
        >
          {visibleSections
            .filter((s) => ["projects", "links", "bio"].includes(s.type))
            .map((section) => {
              const tabKey = section.type === "bio" ? "about" : section.type;
              const label =
                section.type === "bio"
                  ? "About"
                  : section.type === "links"
                    ? "Links"
                    : "Projects";
              return (
                <button
                  key={section.id}
                  onClick={() =>
                    setActiveTab(tabKey as "projects" | "links" | "about")
                  }
                  className={`relative pb-3 text-[15px] font-semibold transition-colors ${activeTab === tabKey ? "text-brand-hover-bg" : "text-secondary-text hover:text-primary-text"}`}
                >
                  {label}
                  {activeTab === tabKey && (
                    <span className="bg-brand-hover-bg absolute right-0 -bottom-px left-0 h-[2px]" />
                  )}
                </button>
              );
            })}
        </div>
      )}

      <div
        className="mt-12 w-full"
        style={{ paddingBottom: "var(--op-spacing, 4rem)" }}
      >
        {visibleSections.map((section) => {
          // Projects Tab
          if (section.type === "projects" && activeTab === "projects") {
            const projectsToRender = (
              section.projects?.length
                ? section.projects
                : isPreview
                  ? DEFAULT_PROJECTS
                  : []
            ) as ProjectItem[];
            const highlightedProject =
              projectsToRender.find(isProjectHighlighted);
            const remainingProjects = projectsToRender.filter(
              (p: { id?: string | number }) => p.id !== highlightedProject?.id
            );

            return (
              <div
                key={section.id}
                className={`relative flex w-full flex-col gap-6 ${section.font ? getFontClass(section.font) : ""}`}
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                {highlightedProject && (
                  <HighlightCard
                    projectsSection={section}
                    variant="transparent"
                  />
                )}

                <div className="relative w-full">
                  {remainingProjects.length > 0 ? (
                    <div
                      className={`grid gap-6 ${
                        remainingProjects.length === 1
                          ? "grid-cols-[minmax(0,420px)] justify-center"
                          : section.layout === "1"
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
                            className={`group border-border bg-background hover:border-brand-hover-bg/30 flex rounded-[12px] border p-4 shadow-sm transition-shadow hover:shadow-md ${
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
                              {layoutType !== "1" && hasUrl && (
                                <span className="text-brand-hover-bg mt-3 flex items-center gap-1 text-sm font-semibold hover:underline">
                                  {project.buttonText || "View project"}
                                  <ChevronRight size={16} />
                                </span>
                              )}
                            </div>

                            {/* BUTTON FOR LAYOUT 1 */}
                            {layoutType === "1" && hasUrl && (
                              <div className="mt-4 shrink-0 sm:mt-0 sm:ml-6">
                                <span className="text-brand-hover-bg flex items-center gap-1 text-sm font-bold hover:underline">
                                  {project.buttonText || "View project"}
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
                className={`relative mx-auto flex w-full flex-col gap-4 ${section.font ? getFontClass(section.font) : ""}`}
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                {allLinks.length > 0 ? (
                  <div
                    className={`grid gap-4 ${
                      allLinks.length === 1
                        ? "grid-cols-[minmax(0,220px)] justify-center"
                        : "w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    }`}
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
                className={`border-border mx-auto max-w-2xl rounded-3xl border p-8 sm:p-10 ${section.font ? getFontClass(section.font) : ""}`}
                style={getSectionStyle(section)}
              >
                <p className="text-secondary-text text-center text-[15px] leading-relaxed break-all whitespace-pre-wrap">
                  {section.bio || "Write a little bit about yourself here..."}
                </p>
              </div>
            );
          }

          return null;
        })}
      </div>
      {!isPreview && <TemplateFooter />}
    </div>
  );
}
