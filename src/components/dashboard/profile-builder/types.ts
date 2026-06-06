export type SectionType = "bio" | "links" | "projects" | "experience";

export interface SavedLink {
  id: string;
  title: string;
  label?: string;
  url: string;
  iconId: string | null;
  iconLabel: string | null;
  iconSrc: string | null;
  imageSrc: string | null;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url?: string;
  buttonText?: string;
  imageSrc?: string | null;
  highlighted?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
}

export interface Section {
  id: string;
  title: string;
  type: SectionType | string;
  visible: boolean;
  fullName?: string;
  bio?: string;
  subtitle?: string;
  links?: SavedLink[];
  projects?: ProjectItem[];
  experience?: ExperienceItem[];
  font?: string;
  textColor?: string;
  bgColor?: string;
  iconColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
  gap?: number;
  padding?: number;
  layout?: string; // "1" | "2" | "3" | "4"
  highlightSection?: boolean;
  iconId?: string | null;
  iconLabel?: string | null;
  iconSrc?: string | null;
  buttonText?: string;
  url?: string;
  ctaType?: "link" | "email" | "phone" | "whatsapp";
}

export interface ProfilePreview {
  fullName?: string;
  bio?: string | null;
  photoUrl?: string | null;
  username?: string;
}
