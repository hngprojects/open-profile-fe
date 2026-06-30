import type {
  ProfileAppearanceRequest,
  ProfileAppearanceValues,
} from "@/api/profile/profile.type";

const COMPONENT_KEYS = ["bio", "links", "projects", "cta"] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getGlobalAppearance(
  appearance?: unknown
): Partial<ProfileAppearanceValues> | null {
  if (!isObject(appearance)) return null;

  if (isObject(appearance.global)) {
    return appearance.global as Partial<ProfileAppearanceValues>;
  }

  return appearance as Partial<ProfileAppearanceValues>;
}

export function mergeAppearanceSources(
  ...sources: unknown[]
): Partial<ProfileAppearanceValues> | null {
  const merged = sources.reduce<Partial<ProfileAppearanceValues>>(
    (acc, source) => {
      const globalAppearance = getGlobalAppearance(source);
      return globalAppearance ? { ...acc, ...globalAppearance } : acc;
    },
    {}
  );

  return Object.keys(merged).length > 0 ? merged : null;
}

export function createProfileAppearanceRequest(
  values: Partial<ProfileAppearanceValues>
): ProfileAppearanceRequest {
  const global: ProfileAppearanceValues = {
    template: values.template ?? "default",
    accentColour: values.accentColour ?? "#087583",
    backgroundColour: values.backgroundColour ?? "#FFFFFF",
    textColour: values.textColour ?? "#050505",
    font: values.font ?? "afacad",
    cornerStyle: values.cornerStyle ?? "rounded",
    spacing: typeof values.spacing === "number" ? values.spacing : 20,
    theme: values.theme ?? "light",
  };

  return {
    global,
    components: COMPONENT_KEYS.reduce<
      NonNullable<ProfileAppearanceRequest["components"]>
    >((components, key) => {
      components[key] = { ...global };
      return components;
    }, {}),
  };
}

export function getAppearanceResponseGlobal(
  response?: {
    appearance?: unknown;
    data?: unknown;
  } | null
): Partial<ProfileAppearanceValues> | null {
  return mergeAppearanceSources(response?.data, response?.appearance);
}
