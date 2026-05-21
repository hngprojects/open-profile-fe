import { env } from "@/env/client";

export function getProfileUrl(username?: string, origin?: string) {
  if (!username) return "";

  const baseUrl =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");

  return `${baseUrl}/${username}`;
}

export function getDisplayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function getImageUrl(path?: string | null) {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return `${env.NEXT_PUBLIC_API_URL}${path}`;
}
