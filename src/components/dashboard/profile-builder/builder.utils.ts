import type {
  ProfileContentResponse,
  UpsertDraftRequest,
  DashboardProfileResponse,
  LinkItem,
  ProjectItem as ApiProjectItem,
} from "@/api/profile/profile.type";
import type { Section, SavedLink, ProjectItem } from "./types";
import { encodeUrlForBackend, decodeUrlForFrontend } from "@/utils/profile";

export function deserializeTitleAndSubtitle(
  rawTitle: string,
  defaultTitle: string
): { title: string; subtitle: string } {
  if (!rawTitle) {
    return { title: defaultTitle, subtitle: "" };
  }
  if (rawTitle.includes("///")) {
    const delimiterIndex = rawTitle.indexOf("///");
    const titlePart = rawTitle.slice(0, delimiterIndex);
    const subtitlePart = rawTitle.slice(delimiterIndex + 3);
    return {
      title: titlePart || defaultTitle,
      subtitle: subtitlePart || "",
    };
  }
  const isDefaultTitle = [
    "links",
    "featured links",
    "selected projects",
    "projects",
    "portfolio",
  ].includes(rawTitle.toLowerCase().trim());
  if (isDefaultTitle) {
    return { title: rawTitle, subtitle: "" };
  }
  return { title: defaultTitle, subtitle: rawTitle };
}

export function contentToSections(
  rawContent: ProfileContentResponse,
  profile: DashboardProfileResponse
): Section[] {
  const content = rawContent?.content;
  let order = content?.sectionOrder?.length
    ? [...new Set(content.sectionOrder)]
    : ["bio"];

  // Derive fallback order from existing keys in content if sectionOrder is missing to prevent data loss
  if (!content?.sectionOrder?.length) {
    if (content?.links) order.push("links");
    if (content?.projects) order.push("projects");
    if (content?.cta) order.push("cta");
    order = [...new Set(order)];
  }

  return order.map((key) => {
    if (key === "bio") {
      return {
        id: "bio",
        title: "Bio",
        type: "bio" as const,
        visible: content?.bio?.visible ?? true,
        bio: content?.bio?.content || profile?.bio || "",
        fullName: profile?.fullName ?? "",
        textColor: (content?.bio as Record<string, unknown>)?.textColor as
          | string
          | undefined,
        bgColor: (content?.bio as Record<string, unknown>)?.bgColor as
          | string
          | undefined,
        font: (content?.bio as Record<string, unknown>)?.font as
          | string
          | undefined,
        iconColor: (content?.bio as Record<string, unknown>)?.iconColor as
          | string
          | undefined,
        paddingTop: (content?.bio as Record<string, unknown>)?.paddingTop as
          | number
          | undefined,
        paddingBottom: (content?.bio as Record<string, unknown>)
          ?.paddingBottom as number | undefined,
        gap: (content?.bio as Record<string, unknown>)?.gap as
          | number
          | undefined,
        padding: (content?.bio as Record<string, unknown>)?.padding as
          | number
          | undefined,
      };
    }

    if (key === "links") {
      const rawTitle = content?.links?.sectionTitle || "Featured Links";
      const { title, subtitle } = deserializeTitleAndSubtitle(
        rawTitle,
        "Featured Links"
      );
      return {
        id: "links",
        title,
        type: "links" as const,
        visible: content?.links?.visible ?? true,
        subtitle,
        links: (content?.links?.items ?? []).map(
          (l: Record<string, unknown>) => ({
            ...l,
            title: l.label || l.title || "",
            url: decodeUrlForFrontend(l.url as string),
          })
        ) as unknown as SavedLink[],
        textColor: (content?.links as Record<string, unknown>)?.textColor as
          | string
          | undefined,
        bgColor: (content?.links as Record<string, unknown>)?.bgColor as
          | string
          | undefined,
        font: (content?.links as Record<string, unknown>)?.font as
          | string
          | undefined,
        iconColor: (content?.links as Record<string, unknown>)?.iconColor as
          | string
          | undefined,
        paddingTop: (content?.links as Record<string, unknown>)?.paddingTop as
          | number
          | undefined,
        paddingBottom: (content?.links as Record<string, unknown>)
          ?.paddingBottom as number | undefined,
        gap: (content?.links as Record<string, unknown>)?.gap as
          | number
          | undefined,
        padding: (content?.links as Record<string, unknown>)?.padding as
          | number
          | undefined,
      };
    }

    if (key === "projects") {
      const rawTitle = content?.projects?.sectionTitle || "Selected Projects";
      const { title, subtitle } = deserializeTitleAndSubtitle(
        rawTitle,
        "Selected Projects"
      );
      return {
        id: "projects",
        title,
        type: "projects" as const,
        visible: content?.projects?.visible ?? true,
        subtitle,
        projects: (content?.projects?.items ?? []).map(
          (p: Record<string, unknown>) => {
            const isHl = String(p.id).startsWith("hl_");
            return {
              ...p,
              id: isHl ? String(p.id).slice(3) : p.id,
              highlighted: isHl,
              url: decodeUrlForFrontend(
                (p.repoUrl as string) || (p.url as string)
              ),
            };
          }
        ) as unknown as ProjectItem[],
        layout: (content?.projects as Record<string, unknown>)?.layout as
          | string
          | undefined,
        textColor: (content?.projects as Record<string, unknown>)?.textColor as
          | string
          | undefined,
        bgColor: (content?.projects as Record<string, unknown>)?.bgColor as
          | string
          | undefined,
        font: (content?.projects as Record<string, unknown>)?.font as
          | string
          | undefined,
        iconColor: (content?.projects as Record<string, unknown>)?.iconColor as
          | string
          | undefined,
        paddingTop: (content?.projects as Record<string, unknown>)
          ?.paddingTop as number | undefined,
        paddingBottom: (content?.projects as Record<string, unknown>)
          ?.paddingBottom as number | undefined,
        gap: (content?.projects as Record<string, unknown>)?.gap as
          | number
          | undefined,
        padding: (content?.projects as Record<string, unknown>)?.padding as
          | number
          | undefined,
      };
    }

    // key === "cta"
    return {
      id: "cta",
      title: content?.cta?.title || "Let's build something",
      type: "cta" as const,
      visible: content?.cta?.visible ?? true,
      subtitle: content?.cta?.subtitle ?? "",
      layout: content?.cta?.layout ?? "1",
      buttonText: content?.cta?.label ?? "",
      url: decodeUrlForFrontend(content?.cta?.value),
      ctaType:
        (content?.cta?.type as "link" | "email" | "phone" | "whatsapp") ??
        "link",
      iconId: content?.cta?.iconId ?? null,
      iconSrc: content?.cta?.iconSrc ?? null,
      iconLabel: content?.cta?.iconLabel ?? null,
      textColor: (content?.cta as Record<string, unknown>)?.textColor as
        | string
        | undefined,
      bgColor: (content?.cta as Record<string, unknown>)?.bgColor as
        | string
        | undefined,
      font: (content?.cta as Record<string, unknown>)?.font as
        | string
        | undefined,
      iconColor: (content?.cta as Record<string, unknown>)?.iconColor as
        | string
        | undefined,
      paddingTop: (content?.cta as Record<string, unknown>)?.paddingTop as
        | number
        | undefined,
      paddingBottom: (content?.cta as Record<string, unknown>)
        ?.paddingBottom as number | undefined,
      gap: (content?.cta as Record<string, unknown>)?.gap as number | undefined,
      padding: (content?.cta as Record<string, unknown>)?.padding as
        | number
        | undefined,
    };
  });
}

export const isValidUrl = (urlString: string, iconId?: string | null) => {
  if (!urlString) return true;
  const trimmed = urlString.trim();

  // Allow explicit protocols
  if (/^(mailto:|tel:|whatsapp:|sms:)/i.test(trimmed)) return true;

  // Allow wa.me links
  if (/^(?:https?:\/\/)?wa\.me\//i.test(trimmed)) {
    const extractedNumber = trimmed.split("wa.me/")[1];
    if (extractedNumber && /^\d+$/.test(extractedNumber)) return true;
    return false;
  }

  // Allow plain phone numbers
  if (/^\+?[0-9\s()-]{7,20}$/.test(trimmed)) return true;

  // Allow email addresses
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;

  // Allow social media usernames starting with @
  if (/^@[\w.-]+$/.test(trimmed)) {
    const supportedSocials = [
      "insta",
      "twitter",
      "linkedin",
      "github",
      "youtube",
      "tiktok",
      "behance",
      "flickr",
      "pinterest",
    ];
    if (iconId && supportedSocials.includes(iconId)) {
      return true;
    }
    return false; // Context-aware rejection of handles for unsupported or global links
  }

  // Allow plain domains without http/www
  if (
    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{2,63}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i.test(
      trimmed
    )
  )
    return true;

  return /^(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{2,63}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i.test(
    trimmed
  );
};

export function sectionsToContent(
  sections: Section[]
): NonNullable<UpsertDraftRequest["content"]> {
  const sectionOrder = sections.map((s) => s.id);

  const bioSection = sections.find((s) => s.type === "bio");
  const linksSection = sections.find((s) => s.type === "links");
  const projectsSection = sections.find((s) => s.type === "projects");
  const ctaSection = sections.find((s) => s.type === "cta");

  const sectionStyleFields = (s: Section) => ({
    ...(s.textColor && { textColor: s.textColor }),
    ...(s.bgColor && { bgColor: s.bgColor }),
    ...(s.font && { font: s.font }),
    ...(s.iconColor && { iconColor: s.iconColor }),
    ...(s.paddingTop != null && { paddingTop: s.paddingTop }),
    ...(s.paddingBottom != null && { paddingBottom: s.paddingBottom }),
    ...(s.gap != null && { gap: s.gap }),
    ...(s.padding != null && { padding: s.padding }),
  });

  return {
    sectionOrder,
    bio: bioSection
      ? {
          visible: bioSection.visible,
          content: bioSection.bio ?? "",
          ...sectionStyleFields(bioSection),
        }
      : undefined,
    links: linksSection
      ? {
          visible: linksSection.visible,
          sectionTitle: `${linksSection.title ?? "Featured Links"}///${linksSection.subtitle ?? ""}`,
          items: (linksSection.links ?? []).map((l) => ({
            id: l.id,
            label: l.title || "",
            url: l.url ? encodeUrlForBackend(l.url, l.iconId) : "",
            visible: true,
          })) as unknown as LinkItem[],
          ...sectionStyleFields(linksSection),
        }
      : undefined,
    projects: projectsSection
      ? {
          visible: projectsSection.visible,
          sectionTitle: `${projectsSection.title ?? "Selected Projects"}///${projectsSection.subtitle ?? ""}`,
          ...(projectsSection.layout && { layout: projectsSection.layout }),
          ...sectionStyleFields(projectsSection),
          items: (projectsSection.projects ?? []).map((p) => {
            const isHighlighted =
              p.highlighted === true || String(p.highlighted) === "true";
            // Note: The "hl_" prefix is a presentation-layer convention used for the highlighted project feature.
            // We defensively strip it here to ensure the backend only receives the original UUID.
            const baseId = String(p.id).startsWith("hl_")
              ? String(p.id).slice(3)
              : p.id;
            const mappedProject: Record<string, unknown> = {
              id: isHighlighted ? `hl_${baseId}` : baseId,
              title: p.title || "",
              description: p.description || "",
              visible: true,
            };
            if (p.imageSrc) {
              mappedProject.imageSrc = p.imageSrc;
            }
            if (p.buttonText) {
              mappedProject.buttonText = p.buttonText;
            }
            if (p.url) {
              mappedProject.repoUrl = encodeUrlForBackend(p.url);
            }
            return mappedProject;
          }) as unknown as ApiProjectItem[],
        }
      : undefined,
    cta: ctaSection
      ? {
          visible: ctaSection.visible,
          ...sectionStyleFields(ctaSection),
          type:
            ctaSection.ctaType ??
            (ctaSection.url?.includes("@") ||
            ctaSection.url?.startsWith("mailto:")
              ? "email"
              : "link"),
          label: ctaSection.buttonText ?? "",
          value: ctaSection.url
            ? encodeUrlForBackend(ctaSection.url, ctaSection.iconId)
            : null,
          title: ctaSection.title ?? "",
          subtitle: ctaSection.subtitle ?? "",
          layout: ctaSection.layout ?? "1",
          iconId: ctaSection.iconId ?? null,
          iconSrc: ctaSection.iconSrc ?? null,
          iconLabel: ctaSection.iconLabel ?? null,
        }
      : undefined,
  };
}
