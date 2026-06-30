import type { CSSProperties, ReactNode } from "react";

type TemplateAppearanceInput = {
  font?: string | null;
  accentColour?: string | null;
  iconColor?: string | null;
  textColor?: string | null;
  textColour?: string | null;
  bgColor?: string | null;
  backgroundColour?: string | null;
  cornerStyle?: string | null;
  borderRadius?: string | null;
  spacing?: number | null;
  theme?: string | null;
};

type Props = {
  appearance?: TemplateAppearanceInput | null;
  children: ReactNode;
  className?: string;
};

function isBlendTheme(color?: string | null) {
  if (!color) return false;

  return color.trim().toLowerCase().includes("blend");
}

function normalizeColor(color?: string | null) {
  if (!color) return null;

  const normalized = color.trim();
  const baseColor = normalized.split("__")[0].split("_")[0];

  if (baseColor.startsWith("#")) return baseColor;

  return `#${baseColor}`;
}

function getAccentBackground(color?: string | null) {
  if (isBlendTheme(color)) {
    return "linear-gradient(135deg, #D63384 0%, #A855F7 48%, #4F46E5 100%)";
  }

  return normalizeColor(color) || "#087583";
}

function getRgbaColor(color: string, alpha: number) {
  const cleanHex = color.replace("#", "");

  if (cleanHex.length !== 6) {
    return `rgba(8, 117, 131, ${alpha})`;
  }

  const value = Number.parseInt(cleanHex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function getFontClass(font?: string | null) {
  const normalizedFont = font?.toLowerCase();

  const fontClassMap: Record<string, string> = {
    afacad: "font-afacad",
    inter: "font-sans",
    serif: "font-playfair",
    playfair: "font-playfair",
    "playfair display": "font-playfair",
    mono: "font-mono",
    geologica: "font-geologica",
    geoligica: "font-sans",
    manrope: "font-sans",

    Afacad: "font-afacad",
    Inter: "font-sans",
    Serif: "font-playfair",
    "Playfair Display": "font-playfair",
    Mono: "font-mono",
    Geologica: "font-geologica",
    Geoligica: "font-sans",
    Manrope: "font-sans",
  };

  return (
    fontClassMap[normalizedFont ?? ""] ||
    fontClassMap[font ?? ""] ||
    "font-afacad"
  );
}

function getRadius(cornerStyle?: string | null, borderRadius?: string | null) {
  const value = cornerStyle || borderRadius;

  if (value === "sharp") return "0px";
  if (value === "pill" || value === "round") return "32px";

  return "16px";
}

export default function TemplateAppearanceProvider({
  appearance,
  children,
  className = "",
}: Props) {
  const rawAccentColor = appearance?.accentColour || appearance?.iconColor;
  const accentColor = normalizeColor(rawAccentColor) || "#087583";
  const accentBackground = getAccentBackground(rawAccentColor);
  const accentGradient = isBlendTheme(rawAccentColor)
    ? "linear-gradient(135deg, #D63384 0%, #A855F7 48%, #4F46E5 100%)"
    : "none";

  const selectedBgColor =
    normalizeColor(appearance?.backgroundColour || appearance?.bgColor) ||
    "#FFFFFF";

  const isDarkTheme = appearance?.theme === "dark";
  const bgColor = isDarkTheme ? "#0F0F0F" : selectedBgColor;

  const surfaceColor = isDarkTheme ? "#151515" : "#FFFFFF";
  const secondarySurfaceColor = isDarkTheme ? "#202020" : "#F6F6F6";

  const textColor = isDarkTheme
    ? "#F7F7F7"
    : normalizeColor(appearance?.textColour || appearance?.textColor) ||
      "#050505";

  const secondaryTextColor = isDarkTheme ? "#D6D6D6" : "#454545";
  const tertiaryTextColor = isDarkTheme ? "#A3A3A3" : "#747474";
  const borderColor = isDarkTheme ? "#303030" : "#EDEDED";
  const radius = getRadius(appearance?.cornerStyle, appearance?.borderRadius);
  const spacing =
    typeof appearance?.spacing === "number" ? appearance.spacing : 20;

  const style = {
    "--primary-text": textColor,
    "--secondary-text": secondaryTextColor,
    "--tertiary-text": tertiaryTextColor,
    "--label-text": secondaryTextColor,

    "--primary-bg": bgColor,
    "--secondary-bg": secondarySurfaceColor,
    "--background": surfaceColor,
    "--hover-bg": isDarkTheme ? "#2A2A2A" : "#F1F1F1",

    "--brand": accentColor,
    "--brand-text": accentColor,
    "--brand-bg": accentBackground,
    "--brand-hover-bg": accentBackground,
    "--brand-active-bg": accentBackground,
    "--button-brand-bg": accentBackground,
    "--brand-b": accentColor,
    "--link-text": accentColor,
    "--link-hover-text": accentColor,
    "--link-active-text": accentColor,
    "--brand-subtle-bg": getRgbaColor(accentColor, 0.14),
    "--brand-light-subtle-bg": getRgbaColor(accentColor, 0.1),

    "--border": borderColor,
    "--tertiary-b": borderColor,
    "--input-b": borderColor,

    "--radius": radius,
    "--template-radius": radius,
    "--template-spacing": `${spacing}px`,

    "--op-text-color": textColor,
    "--op-secondary-text-color": secondaryTextColor,
    "--op-tertiary-text-color": tertiaryTextColor,
    "--op-bg-color": bgColor,
    "--op-surface-color": surfaceColor,
    "--op-secondary-bg-color": secondarySurfaceColor,
    "--op-accent-color": accentColor,
    "--op-accent-bg": accentBackground,
    "--op-accent-fill-color": accentColor,
    "--op-accent-fill-image": accentGradient,
    "--op-border-color": borderColor,
    "--op-rounded": radius,
    "--op-spacing": `${spacing}px`,

    color: "var(--op-text-color)",
    backgroundColor: "var(--op-bg-color)",
  } as CSSProperties;

  return (
    <div
      className={`template-appearance-scope ${getFontClass(
        appearance?.font
      )} ${className}`}
      style={style}
    >
      <style>
        {`
          .template-appearance-scope [class*="rounded-"]:not([class*="rounded-full"]) {
            border-radius: var(--op-rounded, var(--template-radius)) !important;
          }

          .template-appearance-scope .text-brand-hover-bg,
          .template-appearance-scope .text-brand-text,
          .template-appearance-scope .text-link-text {
            color: var(--op-accent-color) !important;
          }

          .template-appearance-scope .bg-brand-hover-bg,
          .template-appearance-scope .bg-brand-bg,
          .template-appearance-scope .bg-button-brand-bg,
          .template-appearance-scope .hover\:bg-button-brand-bg:hover,
          .template-appearance-scope .hover\:bg-brand-hover-bg:hover {
            background-color: var(--op-accent-color) !important;
          }

          .template-appearance-scope .op-brand-fill,
          .template-appearance-scope .op-brand-fill:hover {
            background-color: var(--op-accent-fill-color, var(--op-accent-color)) !important;
            background-image: var(--op-accent-fill-image, none) !important;
            background-size: 100% 100% !important;
            background-repeat: no-repeat !important;
          }

          .template-appearance-scope .border-brand-hover-bg,
          .template-appearance-scope .border-brand-b,
          .template-appearance-scope .border-brand-text {
            border-color: var(--op-accent-color) !important;
          }

          .template-appearance-scope .fill-brand-hover-bg,
          .template-appearance-scope .fill-brand-text {
            fill: var(--op-accent-color) !important;
          }

          .template-appearance-scope .stroke-brand-hover-bg,
          .template-appearance-scope .stroke-brand-text {
            stroke: var(--op-accent-color) !important;
          }
        `}
      </style>
      {children}
    </div>
  );
}
