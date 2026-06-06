export type CreateProfileRequest = {
  username: string;
  fullName: string;
  bio: string;
  photoUrl?: string;
};

export type CreateProfileResponse = {
  username: string;
  fullName: string;
  bio: string;
  photoUrl: string | null;
};

export type UsernameCheckResponse = {
  available: boolean;
  username?: string;
};

export type ProfileResponse = {
  id?: string;
  username: string;
  fullName: string;
  bio: string | null;
  photoUrl: string | null;
  isPublished?: boolean;
  templateType?: TemplateType | null;
  themeSettings?: unknown | null;
  appearance?: ProfileAppearanceSettings | null;
  content?: ProfileContentDetails | null;
};

export type DashboardProfileResponse = {
  username: string;
  fullName: string;
  bio: string | null;
  photoUrl: string | null;
  templateType: TemplateType | null;
  themeSettings: unknown | null;
  isPublished: boolean;
  hasUnpublishedChanges: boolean;
  ctaLabel: string | null;
  ctaUrl: string | null;
  components: unknown[];
};

export type ProfileContentSectionBio = {
  visible: boolean;
  content: string;
};

export type TemplateType = "Professional" | "Creator" | "Portfolio" | "Default";

export type LinkItem = {
  id: string | number;
  url?: string;
  title?: string;
  label?: string;
  imageSrc?: string;
  iconSrc?: string;
  iconLabel?: string;
};

export type ProjectItem = {
  id: string | number;
  title?: string;
  description?: string;
  url?: string;
  buttonText?: string;
  imageSrc?: string;
  highlighted?: boolean;
};

export type ProfileContentSectionLinks = {
  visible: boolean;
  sectionTitle: string;
  items: LinkItem[];
};

export type ProfileContentSectionProjects = {
  visible: boolean;
  sectionTitle: string;
  items: ProjectItem[];
};

export type ProfileContentSectionCta = {
  visible: boolean;
  type?: "link" | "email" | "phone" | "whatsapp";
  label: string;
  url?: string | null;
  value?: string | null;
  title?: string;
  subtitle?: string;
  layout?: string;
  buttonText?: string;
  iconId?: string | null;
  iconSrc?: string | null;
  iconLabel?: string | null;
};

export type ProfileContentDetails = {
  sectionOrder: string[];
  bio: ProfileContentSectionBio;
  links: ProfileContentSectionLinks;
  projects: ProfileContentSectionProjects;
  cta: ProfileContentSectionCta;
};

export type ProfileContentResponse = {
  profileId: string;
  bio: string | null;
  photoUrl: string | null;
  content: ProfileContentDetails | null;
  source: "draft" | "published";
  updatedAt: string;
};

export type UpsertDraftRequest = {
  bio?: string | null;
  photoUrl?: string | null;
  themeSettings?: Record<string, unknown> | null;
  content?: {
    bio?: ProfileContentSectionBio;
    links?: ProfileContentSectionLinks;
    projects?: ProfileContentSectionProjects;
    cta?: ProfileContentSectionCta;
    sectionOrder?: string[];
  };
};

export type UpsertDraftResponse = {
  status: string;
  message: string;
  data: ProfileContentResponse;
};

export type DraftStateResponse = {
  status: string;
  hasDraft: boolean;
  draftId?: string;
  updatedAt?: string;
};

export type PublishProfileResponse = {
  status: string;
  message: string;
  data: {
    profileId: string;
    username: string;
    publishedAt: string;
  };
};

export type ProfileAppearanceFont =
  | "afacad"
  | "inter"
  | "serif"
  | "mono"
  | "geologica"
  | "manrope";

export type ProfileAppearanceCornerStyle =
  | "sharp"
  | "medium"
  | "round"
  | "rounded"
  | "pill";

export type ComponentAppearance = {
  backgroundColour?: string;
  /** @deprecated Use `backgroundColour` instead */
  bgColor?: string;
  textColour?: string;
  /** @deprecated Use `textColour` instead */
  textColor?: string;
  accentColour?: string;
  /** @deprecated Use `accentColour` instead */
  iconColor?: string;
  [key: string]: unknown;
};

export type ProfileAppearanceValues = {
  template: string;
  accentColour: string;
  backgroundColour?: string;
  textColour?: string;
  font: ProfileAppearanceFont;
  cornerStyle: ProfileAppearanceCornerStyle;
  spacing: number;
  theme?: string;
};

export type ProfileAppearanceSettings = {
  global?: {
    template: string;
    accentColour: string;
    backgroundColour?: string;
    textColour?: string;
    /** @deprecated Use `textColour` instead */
    textColor?: string;
    /** @deprecated Use `backgroundColour` instead */
    bgColor?: string;
    font: ProfileAppearanceFont;
    cornerStyle: ProfileAppearanceCornerStyle;
    spacing: number;
    theme?: string;
  };
  components?: Record<string, ComponentAppearance>;
  template?: string;
  accentColour?: string;
  backgroundColour?: string;
  textColour?: string;
  /** @deprecated Use `textColour` instead */
  textColor?: string;
  /** @deprecated Use `backgroundColour` instead */
  bgColor?: string;
  font?: ProfileAppearanceFont;
  cornerStyle?: ProfileAppearanceCornerStyle;
  spacing?: number;
  theme?: string;
};

export type ProfileAppearanceRequest = {
  global?: {
    template?: string;
    accentColour?: string;
    backgroundColour?: string;
    textColour?: string;
    font?: ProfileAppearanceFont;
    cornerStyle?: ProfileAppearanceCornerStyle;
    spacing?: number;
    theme?: string;
  };
  components?: {
    bio?: Record<string, unknown>;
    links?: Record<string, unknown>;
    projects?: Record<string, unknown>;
    cta?: Record<string, unknown>;
    [key: string]: unknown;
  };
};

export type ProfileAppearanceResponse = {
  status: string;
  message: string;
  appearance?: ProfileAppearanceSettings | null;
  data?: ProfileAppearanceSettings | null;
};

/**
 * Response for GET /profiles/appearance.
 *
 * `appearance` is the canonical response field returned by the current backend.
 * `data` is kept only as a temporary backwards-compatible fallback for older
 * response shapes and should be removed once the migration is complete.
 *
 * Callers should always prefer `appearance` before falling back to `data`.
 */
export type GetProfileAppearanceResponse = {
  status: string;
  message?: string;
  appearance?: ProfileAppearanceSettings | null;
  /** @deprecated Use `appearance` instead. */
  data?: ProfileAppearanceSettings | null;
};
