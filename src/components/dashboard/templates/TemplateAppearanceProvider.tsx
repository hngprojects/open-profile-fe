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

function normalizeColor(color?: string | null) {
  if (!color) return null;

  if (color.startsWith("#")) return color;

  const hex = color.split("_")[0];

  return `#${hex}`;
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
    serif: "font-serif",
    mono: "font-mono",
    geologica: "font-sans",
    geoligica: "font-sans",
    manrope: "font-sans",

    Afacad: "font-afacad",
    Inter: "font-sans",
    Serif: "font-serif",
    Mono: "font-mono",
    Geologica: "font-sans",
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
  const accentColor =
    normalizeColor(appearance?.accentColour || appearance?.iconColor) ||
    "#087583";

  const bgColor =
    normalizeColor(
      appearance?.backgroundColour ||
        appearance?.bgColor ||
        appearance?.accentColour
    ) || "#FFFFFF";

  const surfaceColor = "#FFFFFF";
  const secondarySurfaceColor = "#F6F6F6";

  const textColor =
    normalizeColor(appearance?.textColour || appearance?.textColor) ||
    "#050505";

  const secondaryTextColor = "#454545";
  const tertiaryTextColor = "#747474";
  const borderColor = "#EDEDED";
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
    "--hover-bg": "#F1F1F1",

    "--brand": accentColor,
    "--brand-text": accentColor,
    "--brand-bg": accentColor,
    "--brand-hover-bg": accentColor,
    "--button-brand-bg": accentColor,
    "--brand-b": accentColor,
    "--link-text": accentColor,
    "--link-hover-text": accentColor,
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
        `}
      </style>
      {children}
    </div>
  );
}
