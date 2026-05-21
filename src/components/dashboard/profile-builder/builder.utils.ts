import type {
  ProfileContentResponse,
  UpsertDraftRequest,
  DashboardProfileResponse,
} from "@/api/profile/profile.type";
import type { Section, SavedLink, ProjectItem } from "./types";

export function contentToSections(
  content: ProfileContentResponse,
  profile: DashboardProfileResponse
): Section[] {
  const order = content.sectionOrder.length
    ? content.sectionOrder
    : ["bio", "links", "projects", "cta"];

  return order.map((key) => {
    if (key === "bio") {
      return {
        id: "bio",
        title: "Bio",
        type: "bio" as const,
        visible: content.bio.visible,
        bio: content.bio.content || profile.bio || "",
        fullName: profile.fullName ?? "",
      };
    }

    if (key === "links") {
      return {
        id: "links",
        title: content.links.sectionTitle || "Links - Featured Links",
        type: "links" as const,
        visible: content.links.visible,
        subtitle: content.links.sectionTitle,
        links: content.links.items as unknown as SavedLink[],
      };
    }

    if (key === "projects") {
      return {
        id: "projects",
        title: content.projects.sectionTitle || "Projects - Portfolio",
        type: "projects" as const,
        visible: content.projects.visible,
        subtitle: content.projects.sectionTitle,
        projects: content.projects.items as unknown as ProjectItem[],
      };
    }

    // key === "cta"
    return {
      id: "cta",
      title: "Let's build something",
      type: "experience" as const,
      visible: content.cta.visible,
      buttonText: content.cta.label,
      url: content.cta.url ?? "",
    };
  });
}

export function sectionsToContent(
  sections: Section[]
): NonNullable<UpsertDraftRequest["content"]> {
  const sectionOrder = sections.map((s) =>
    s.type === "experience" ? "cta" : s.id
  );

  const bioSection = sections.find((s) => s.type === "bio");
  const linksSection = sections.find((s) => s.type === "links");
  const projectsSection = sections.find((s) => s.type === "projects");
  const ctaSection = sections.find((s) => s.type === "experience");

  return {
    sectionOrder,
    bio: bioSection
      ? { visible: bioSection.visible, content: bioSection.bio ?? "" }
      : undefined,
    links: linksSection
      ? {
          visible: linksSection.visible,
          sectionTitle: linksSection.subtitle ?? "Links",
          items: (linksSection.links ?? []) as unknown as Record<
            string,
            unknown
          >[],
        }
      : undefined,
    projects: projectsSection
      ? {
          visible: projectsSection.visible,
          sectionTitle: projectsSection.subtitle ?? "Projects",
          items: (projectsSection.projects ?? []) as unknown as Record<
            string,
            unknown
          >[],
        }
      : undefined,
    cta: ctaSection
      ? {
          visible: ctaSection.visible,
          label: ctaSection.buttonText ?? "",
          url: ctaSection.url || null,
        }
      : undefined,
  };
}
