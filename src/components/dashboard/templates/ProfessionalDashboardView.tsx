import React from "react";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

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
  { id: "link-1", title: "Portfolio", url: "https://john.studio" },
  { id: "link-2", title: "Twitter", url: "https://twitter.com/johnsmith" },
  { id: "link-3", title: "GitHub", url: "https://github.com/johnsmith" },
] as LinkItem[];

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Atlas - Onboarding kit for SaaS",
    description: "A complete design system and onboarding flow",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature1.jpg",
  },
  {
    id: "proj-2",
    title: "Field - Mobile Journaling app",
    description: "A calm journaling experience with a custom typography stack.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature2.jpg",
  },
  {
    id: "proj-3",
    title: "Northwind Analytics",
    description: "Dashboard rework for a B2B analytics products.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature3.jpg",
  },
] as ProjectItem[];

export default function ProfessionalDashboardView({
  profile,
  content,
  isLoadingProfile,
  isLoadingContent,
  appearance,
  isPreview,
}: Props) {
  if (isLoadingProfile || isLoadingContent) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="border-brand-hover-bg h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  const rawSections = contentToSections(
    content || ({ content: {} } as ProfileContentResponse),
    profile || ({} as DashboardProfileResponse)
  );

  type ComponentsAppearance = Record<
    string,
    Record<string, string | undefined>
  >;
  const componentsAppearance =
    ((appearance as Record<string, unknown>)
      ?.components as ComponentsAppearance) ||
    ((
      (profile as unknown as Record<string, unknown>)?.appearance as Record<
        string,
        unknown
      >
    )?.components as ComponentsAppearance) ||
    ({} as ComponentsAppearance);

  const sections = rawSections.map((section) => {
    const appearanceKey = section.type;
    const secAppearance = componentsAppearance[appearanceKey] ?? {};
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
      font: secAppearance.font || section.font,
    };
  });

  return (
    <div className="flex w-full flex-col px-4 sm:px-6">
      <div
        className="text-primary-text mx-auto flex w-full max-w-4xl flex-col py-8 pt-6"
        style={{ gap: "var(--op-spacing, 2rem)" }}
      >
        {sections.map((section) => {
          if (!section.visible) return null;

          if (section.type === "bio") {
            return (
              <section
                key={section.id}
                className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${section.font ? getFontClass(section.font) : ""}`}
                style={getSectionStyle(section)}
              >
                <header
                  className="relative flex w-full flex-col justify-between sm:flex-row sm:items-start"
                  style={{
                    gap: "var(--op-spacing, 24px)",
                  }}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: "var(--op-spacing, 24px)" }}
                  >
                    <div className="border-border bg-secondary-bg relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border">
                      {getImageUrl(profile?.photoUrl) ? (
                        <Image
                          src={getImageUrl(profile?.photoUrl)!}
                          alt={profile?.fullName ?? "Profile avatar"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="text-brand-text flex h-full items-center justify-center text-[32px] font-bold">
                          {(profile?.fullName || "M").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h1 className="text-primary-text text-[28px] leading-tight font-bold tracking-tight break-words">
                        {profile?.fullName || "Micaela Robinson"}
                      </h1>
                      <p className="text-secondary-text mt-1 text-[15px] break-words">
                        {getDisplayProfileUrl(profile?.username || "micaela")}
                      </p>
                    </div>
                  </div>
                </header>

                <div className="mt-6">
                  <p className="text-secondary-text max-w-2xl text-[16px] leading-relaxed break-words whitespace-pre-wrap">
                    {section.bio || "Write a little bit about yourself here..."}
                  </p>
                </div>
              </section>
            );
          }

          if (section.type === "links") {
            const links = (
              section.links?.length
                ? section.links
                : isPreview
                  ? DEFAULT_LINKS
                  : []
            ) as SavedLink[];
            return (
              <section
                key={section.id}
                className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${section.font ? getFontClass(section.font) : ""}`}
                style={(() => {
                  const { gap: _gap, ...rest } = getSectionStyle(section);
                  return rest;
                })()}
              >
                <div className="mb-4 flex flex-col gap-1">
                  <h2 className="text-tertiary-text text-[13px]">
                    {section.title || "Links"}
                  </h2>
                  {section.subtitle && (
                    <p className="text-secondary-text text-xs">
                      {section.subtitle}
                    </p>
                  )}
                </div>
                <div
                  className="border-border flex flex-col border-t"
                  style={{
                    gap: section.gap ? `${section.gap}px` : undefined,
                  }}
                >
                  {links.length > 0 ? (
                    links.map((link: SavedLink, idx: number) => (
                      <a
                        key={link.id ?? idx}
                        href={sanitizeUrl(link.url || "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group border-border hover:bg-hover-bg/30 flex items-center justify-between border-b py-4 transition-colors"
                      >
                        <span className="text-primary-text group-hover:text-brand-hover-bg text-[15px] font-bold transition-colors">
                          {link.title || link.label}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-secondary-text text-[14px]">
                            {(() => {
                              try {
                                return link.url
                                  ? new URL(
                                      link.url.startsWith("http")
                                        ? link.url
                                        : `https://${link.url}`
                                    ).hostname.replace("www.", "")
                                  : "";
                              } catch {
                                return link.url || "";
                              }
                            })()}
                          </span>
                          <ExternalLink
                            size={16}
                            className="text-tertiary-text group-hover:text-brand-hover-bg transition-colors"
                          />
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-tertiary-text border-border mt-4 rounded-xl border border-dashed py-4 text-center text-sm">
                      No links added yet.
                    </p>
                  )}
                </div>
              </section>
            );
          }

          if (section.type === "projects") {
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
                className={`flex flex-col gap-6 ${section.font ? getFontClass(section.font) : ""}`}
              >
                {highlightedProject && (
                  <HighlightCard
                    projectsSection={section}
                    variant="transparent"
                  />
                )}

                <section
                  className="group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors"
                  style={(() => {
                    const { gap: _gap, ...rest } = getSectionStyle(section);
                    return rest;
                  })()}
                >
                  <div className="mb-4 flex flex-col gap-1">
                    <h2 className="text-tertiary-text text-[13px]">
                      {section.title || "Selected Work"}
                    </h2>
                    {section.subtitle && (
                      <p className="text-secondary-text text-xs">
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                  <div
                    className={`grid gap-6 ${
                      section.layout === "2"
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                    style={{
                      gap: section.gap ? `${section.gap}px` : undefined,
                    }}
                  >
                    {remainingProjects.length > 0 ? (
                      remainingProjects.map((project: ProjectItem) => {
                        const layoutType = section.layout || "2";
                        const isSideBySide =
                          layoutType === "3" || layoutType === "4";
                        const hasUrl = Boolean(project.url);
                        const displayImg = getImageUrl(project.imageSrc);
                        const desc = project.description || "";
                        const newlineIndex = desc.indexOf("\n");
                        const hasCategory = newlineIndex !== -1;
                        const categoryText = hasCategory
                          ? desc.substring(0, newlineIndex)
                          : "";
                        const descriptionText = hasCategory
                          ? desc.substring(newlineIndex + 1)
                          : desc;

                        const card = (
                          <div
                            className={`group border-border bg-background hover:border-brand-hover-bg/30 flex h-full rounded-[12px] border shadow-sm transition-shadow hover:shadow-md ${
                              isSideBySide
                                ? `flex-col gap-4 p-4 lg:gap-6 lg:p-6 ${
                                    layoutType === "3"
                                      ? "md:flex-row md:items-center"
                                      : "md:flex-row-reverse md:items-center"
                                  }`
                                : "flex-col p-4"
                            }`}
                          >
                            {/* IMAGE */}
                            <div
                              className={`bg-secondary-bg border-border relative shrink-0 overflow-hidden ${
                                isSideBySide
                                  ? "aspect-[16/10] w-full rounded-xl border md:w-[240px] lg:w-[320px]"
                                  : "mb-4 aspect-video w-full rounded-lg border"
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
                                isSideBySide ? "justify-center" : ""
                              }`}
                            >
                              <h3 className="text-primary-text text-[16px] font-bold">
                                {project.title}
                              </h3>
                              {hasCategory && (
                                <span className="text-brand-hover-bg mt-1 text-[12px] font-semibold">
                                  {categoryText}
                                </span>
                              )}
                              {descriptionText && (
                                <p className="text-secondary-text mt-1 line-clamp-2 text-[13px] break-words">
                                  {descriptionText}
                                </p>
                              )}
                              {hasUrl && (
                                <span className="text-brand-hover-bg mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold hover:underline">
                                  {project.buttonText || "View Project"}
                                  <ArrowRight size={14} strokeWidth={2.5} />
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
                      })
                    ) : (
                      <p className="text-tertiary-text border-border rounded-xl border border-dashed py-4 text-center text-sm">
                        No projects added yet.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            );
          }

          if (section.type === "cta") {
            return (
              <section
                key={section.id}
                className={`group hover:border-border hover:bg-background/50 relative w-full rounded-2xl border border-transparent p-6 transition-colors ${section.font ? getFontClass(section.font) : ""}`}
                style={getSectionStyle(section)}
              >
                <div
                  className={`flex flex-col ${section.layout === "2" ? "items-start text-left" : section.layout === "3" ? "items-end text-right" : "items-center text-center"}`}
                >
                  {section.iconSrc && (
                    <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-transparent">
                      <div
                        className="bg-brand-hover-bg h-8 w-8"
                        style={{
                          maskImage: `url(${getImageUrl(section.iconSrc)})`,
                          WebkitMaskImage: `url(${getImageUrl(section.iconSrc)})`,
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
                    {section.title || "Open to new projects."}
                  </h2>
                  <p className="text-secondary-text mt-3 mb-8 max-w-[600px] text-base leading-relaxed">
                    {section.subtitle ||
                      "Have an idea or product you're building?"}
                  </p>
                  <a
                    href={
                      section.ctaType === "email"
                        ? `mailto:${section.url}`
                        : section.ctaType === "phone"
                          ? `tel:${section.url}`
                          : section.ctaType === "whatsapp"
                            ? `https://wa.me/${(section.url || "").replace(/\D/g, "")}`
                            : sanitizeUrl(section.url || "#")
                    }
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
      {!isPreview && <TemplateFooter />}
    </div>
  );
}
