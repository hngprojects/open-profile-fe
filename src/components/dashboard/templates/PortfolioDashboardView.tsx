import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
import { TemplateLinkCard } from "../shared/TemplateLinkCard";
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
  { id: "link-1", title: "Website", url: "https://john.studio" },
  { id: "link-2", title: "Instagram", url: "https://instagram.com/johnsmith" },
  { id: "link-3", title: "Twitter/X", url: "https://twitter.com/johnsmith" },
  { id: "link-4", title: "LinkedIn", url: "https://linkedin.com/in/johnsmith" },
] as LinkItem[];

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Fintech Dashboard",
    description:
      "A financial analytics dashboard that helps users track their investments",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature1.jpg",
  },
  {
    id: "proj-2",
    title: "Landing page Design",
    description: "A minimal landing page design for an e-commerce website",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature2.jpg",
  },
  {
    id: "proj-3",
    title: "Nova Health SaaS",
    description: "A minimalist SaaS platform designed for doctors.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature3.jpg",
  },
  {
    id: "proj-4",
    title: "Crypto Wallet App",
    description: "A mobile app design for a cryptocurrency wallet.",
    buttonText: "View Project",
    url: "#",
    imageSrc: "/profile-preview/feature4.jpg",
  },
] as ProjectItem[];

export default function PortfolioDashboardView({
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

  // Patch sections with overrides from profile appearance components

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
        className="text-primary-text mx-auto flex w-full max-w-5xl flex-col py-8 pt-6"
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
                    className="flex flex-col"
                    style={{ gap: "var(--op-spacing, 24px)" }}
                  >
                    <div className="border-border bg-secondary-bg relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-full border">
                      {getImageUrl(profile?.photoUrl) ? (
                        <Image
                          src={getImageUrl(profile?.photoUrl)!}
                          alt={profile?.fullName || "User"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="bg-brand-subtle-bg text-brand-hover-bg flex h-full w-full items-center justify-center text-[32px] font-bold">
                          {(profile?.fullName || "M").charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h1 className="text-primary-text text-[26px] leading-tight font-bold tracking-tight">
                          {profile?.fullName || "Micaela Robinson"}
                        </h1>
                      </div>
                      <p className="text-secondary-text mt-1 text-[14px]">
                        {getDisplayProfileUrl(profile?.username || "micaela")}
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
                {links.length > 0 ? (
                  <div
                    className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    style={{
                      gap: section.gap ? `${section.gap}px` : undefined,
                    }}
                  >
                    {links.map((link: SavedLink) => (
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

                        const card = (
                          <div
                            className={`group/proj border-border bg-background flex h-full overflow-hidden rounded-[12px] border shadow-sm transition-shadow hover:shadow-md ${
                              isSideBySide
                                ? `flex-col gap-4 p-4 lg:gap-6 lg:p-6 ${
                                    layoutType === "3"
                                      ? "md:flex-row md:items-center"
                                      : "md:flex-row-reverse md:items-center"
                                  }`
                                : "flex-col"
                            }`}
                          >
                            <div
                              className={`bg-secondary-bg border-border relative overflow-hidden ${
                                isSideBySide
                                  ? "aspect-[16/10] w-full rounded-xl border md:w-[240px] lg:w-[320px]"
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
                                <span className="text-brand-hover-bg mt-auto inline-flex items-center gap-1.5 text-[13px] font-bold hover:underline">
                                  {project.buttonText || "View Project"}
                                  <ArrowRight size={14} strokeWidth={2.5} />
                                </span>
                              )}
                            </div>
                          </div>
                        );

                        return (
                          <div key={project.id} className="w-full">
                            {project.url ? (
                              <a
                                href={sanitizeUrl(project.url)}
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
                    {section.title || "Interested in working together?"}
                  </h2>
                  <p className="text-secondary-text mt-3 mb-8 max-w-[600px] text-base leading-relaxed">
                    {section.subtitle ||
                      "I am currently available for freelance project"}
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
