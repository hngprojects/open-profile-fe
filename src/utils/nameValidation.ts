export function normalizeFullName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

const allowedFullNameCharactersPattern = /^[\p{L}\s'’-]+$/u;
const validNamePartPattern = /^\p{L}+(?:['’-]\p{L}+)*$/u;

export function validateFullName(name: string) {
  const normalizedName = normalizeFullName(name);

  if (!normalizedName) {
    return "Full name is required.";
  }

  if (!allowedFullNameCharactersPattern.test(normalizedName)) {
    return "Full name can only include letters, spaces, hyphens, and apostrophes.";
  }

  const nameParts = normalizedName.split(" ").filter(Boolean);

  const hasInvalidSeparatorPlacement = nameParts.some(
    (part) => !validNamePartPattern.test(part)
  );

  if (hasInvalidSeparatorPlacement) {
    return "Hyphens and apostrophes can only be used between letters.";
  }

  if (nameParts.length < 2) {
    return "Enter at least two names.";
  }

  return "";
}

export function isValidFullName(name: string) {
  return validateFullName(name) === "";
}
