import { env } from "@/env/client";
import type { CSSProperties } from "react";

const APP_BASE_URL = env.NEXT_PUBLIC_APP_BASE_URL;

export function getProfileUrl(username?: string) {
  if (!username) return "";
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : APP_BASE_URL.replace(/\/$/, "");
  return `${baseUrl}/${username}`;
}

export function getDisplayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function getBaseDisplayUrl() {
  return getDisplayUrl(APP_BASE_URL);
}

export function getDisplayProfileUrl(username?: string) {
  return getDisplayUrl(getProfileUrl(username));
}

export function getImageUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("/profile-preview/")) return path;
  if (path.startsWith("/profilebuilder_home/")) return path;
  if (path.startsWith("/profilebuilder_cta/")) return path;
  if (path.startsWith("/profilebuilder_")) return path;

  try {
    if (path.startsWith("http")) {
      const parsedUrl = new URL(path);
      if (
        parsedUrl.hostname === "example.com" ||
        parsedUrl.hostname === "www.example.com"
      ) {
        return "";
      }
    }
  } catch {
    // Fail-safe substring match for relative placeholder links
    if (path.includes("example.com")) {
      return "";
    }
  }

  // Fallback check for any lingering relative example.com references
  if (path.includes("example.com")) {
    return "";
  }

  if (path.startsWith("http")) return path;

  return `${env.NEXT_PUBLIC_API_URL}${path}`;
}

/**
 * Safely sanitizes external and internal user-provided links.
 * Normalizes bare hostnames to include https:// protocol, and actively prevents
 * XSS script injection vectors by rejecting unsafe schemes (e.g. javascript:).
 */
export function sanitizeUrl(url?: string | null): string {
  if (!url) return "#";
  const trimmed = url.trim();

  // Block malicious script injection attempts
  if (/^javascript:/i.test(trimmed)) {
    return "#";
  }

  // Decode our internal hack for backend validation
  if (trimmed.startsWith("https://mailto.open-profile.com/")) {
    const email = trimmed.replace("https://mailto.open-profile.com/", "");
    return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`;
  }
  if (trimmed.startsWith("https://tel.open-profile.com/")) {
    return `tel:${trimmed.replace("https://tel.open-profile.com/", "")}`;
  }

  // Allow standard web links, mail links, and telephone numbers
  if (
    trimmed.startsWith("/") ||
    /^(https?:|mailto:|tel:|whatsapp:|sms:)/i.test(trimmed)
  ) {
    return trimmed;
  }

  // Handle wa.me links explicitly
  if (/^(?:https?:\/\/)?wa\.me\//i.test(trimmed)) {
    const extractedNumber = trimmed.split("wa.me/")[1];
    if (extractedNumber && /^\d+$/.test(extractedNumber)) {
      return `https://wa.me/${extractedNumber}`;
    }
  }

  // Auto-format email addresses
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return `mailto:${trimmed}`;
  }

  // Auto-format phone numbers to WhatsApp by default
  if (/^\+?[0-9\s()-]{7,20}$/.test(trimmed)) {
    return `https://wa.me/${trimmed.replace(/[\s()+-]/g, "")}`;
  }

  // Fallback for bare hostnames (e.g. "google.com")
  return `https://${trimmed}`;
}

export function encodeUrlForBackend(
  url?: string | null,
  iconId?: string | null
): string {
  if (!url) return "";
  const trimmed = url.trim();

  // If it's a wa.me shortlink, ensure it has https://
  if (/^(?:https?:\/\/)?wa\.me\//i.test(trimmed)) {
    const extractedNumber = trimmed.split("wa.me/")[1];
    if (extractedNumber && /^\d+$/.test(extractedNumber)) {
      return `https://wa.me/${extractedNumber}`;
    }
  }

  // If it's an email address
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return `https://mailto.open-profile.com/${trimmed}`;
  }

  // If it already explicitly starts with mailto:
  if (/^mailto:/i.test(trimmed)) {
    return `https://mailto.open-profile.com/${trimmed.substring(7)}`;
  }

  // If it's a phone number (default to whatsapp)
  if (/^\+?[0-9\s()-]{7,20}$/.test(trimmed)) {
    return `https://wa.me/${trimmed.replace(/[\s()+-]/g, "")}`;
  }

  // If it explicitly starts with tel:
  if (/^tel:/i.test(trimmed)) {
    return `https://tel.open-profile.com/${trimmed.substring(4)}`;
  }

  // Handle social media handles based on iconId
  if (iconId && !/^https?:\/\//i.test(trimmed)) {
    const handle = trimmed.replace(/^@/, ""); // remove leading @ if present

    switch (iconId) {
      case "insta":
        return `https://instagram.com/${handle}`;
      case "twitter":
        return `https://twitter.com/${handle}`;
      case "linkedin":
        return `https://linkedin.com/in/${handle}`;
      case "github":
        return `https://github.com/${handle}`;
      case "youtube":
        return `https://youtube.com/@${handle}`;
      case "tiktok":
        return `https://tiktok.com/@${handle}`;
      case "behance":
        return `https://behance.net/${handle}`;
      case "flickr":
        return `https://flickr.com/photos/${handle}`;
      case "pinterest":
        return `https://pinterest.com/${handle}`;
    }
  }

  // Ensure standard web links have a protocol
  if (!trimmed.startsWith("http") && trimmed.length > 0) {
    const cleanUrl = trimmed.replace(/^@/, "");
    return `https://${cleanUrl}`;
  }

  return trimmed;
}

export function decodeUrlForFrontend(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("https://mailto.open-profile.com/"))
    return url.replace("https://mailto.open-profile.com/", "");
  if (url.startsWith("https://tel.open-profile.com/"))
    return url.replace("https://tel.open-profile.com/", "");
  return url;
}

export function isProjectHighlighted(project?: {
  id?: string | number;
  highlighted?: boolean | string;
}): boolean {
  if (!project) return false;
  return (
    project.highlighted === true ||
    String(project.highlighted) === "true" ||
    String(project.id).startsWith("hl_")
  );
}

export function getSectionStyle(
  section?: {
    paddingTop?: number | string | null;
    paddingBottom?: number | string | null;
    gap?: number | string | null;
    padding?: number | string | null;
    bgColor?: string | null;
    textColor?: string | null;
  } | null
): CSSProperties {
  if (!section) return {};
  const style: CSSProperties = {};

  if (section.paddingTop != null) {
    style.paddingTop = `${section.paddingTop}px`;
  } else if (section.padding != null) {
    style.paddingTop = `${section.padding}px`;
  }

  if (section.paddingBottom != null) {
    style.paddingBottom = `${section.paddingBottom}px`;
  } else if (section.padding != null) {
    style.paddingBottom = `${section.padding}px`;
  }

  if (section.padding != null) {
    style.paddingLeft = `${section.padding}px`;
    style.paddingRight = `${section.padding}px`;
  }

  if (section.gap != null) {
    style.gap = `${section.gap}px`;
  }

  if (section.bgColor) {
    style.backgroundColor = section.bgColor;
    // Override Tailwind CSS variables for children
    (style as Record<string, unknown>)["--op-bg-color"] = section.bgColor;
    (style as Record<string, unknown>)["--primary-bg"] = section.bgColor;
    (style as Record<string, unknown>)["--background"] = section.bgColor;
  }

  if (section.textColor) {
    style.color = section.textColor;
    // Override Tailwind CSS variables for children
    (style as Record<string, unknown>)["--op-text-color"] = section.textColor;
    (style as Record<string, unknown>)["--primary-text"] = section.textColor;
  }

  return style;
}
