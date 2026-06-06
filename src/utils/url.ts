export function normalizeHref(href?: string | null): string | null {
  if (!href) return null;
  const raw = String(href).trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return null;
  }

  if (raw.startsWith("//")) return "https:" + raw;

  if (raw.startsWith("/")) return raw;

  try {
    const u = new URL(raw);
    const scheme = u.protocol.replace(":", "");
    if (scheme === "http" || scheme === "https" || scheme === "mailto")
      return u.toString();
    return null;
  } catch (_e) {
    try {
      const pref = new URL("https://" + raw);
      return pref.toString();
    } catch (_err) {
      return null;
    }
  }
}

export default normalizeHref;
