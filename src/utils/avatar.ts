type GetInitialsOptions = {
  email?: string | null;
  fallback?: string;
};

export function getInitials(
  fullName?: string | null,
  { email, fallback = "U" }: GetInitialsOptions = {}
): string {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  if (email) {
    return email.slice(0, 2).toUpperCase();
  }

  return fallback;
}
