"use client";

import { useState } from "react";
import type { Section } from "./types";
import { ColorPicker } from "@/components/ui/color-picker";
import { THEME_DEFAULTS } from "@/constants/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Moon, Sun } from "lucide-react";

interface RightPanelProps {
  font: string;
  onChangeFont: (font: string) => void;
  textColor: string;
  onChangeTextColor: (color: string) => void;
  bgColor: string;
  onChangeBgColor: (color: string) => void;
  iconColor: string;
  onChangeIconColor: (color: string) => void;
  spacing: number;
  onChangeSpacing: (spacing: number) => void;
  borderRadius: "sharp" | "rounded" | "pill";
  onChangeBorderRadius: (radius: "sharp" | "rounded" | "pill") => void;
  appearanceTheme?: "light" | "dark";
  onChangeAppearanceTheme?: (theme: "light" | "dark") => void;
  onBackToGlobal: () => void;
  selectedSection: Section | null;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  template: string;
  onChangeTemplate?: (template: string | null) => void;
}

const BLEND_THEME_VALUE = "#7C3AED__blend";
const BLEND_THEME_GRADIENT =
  "linear-gradient(135deg, #D63384 0%, #A855F7 48%, #4F46E5 100%)";

const TEMPLATE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "creator", label: "Creator" },
  { value: "portfolio", label: "Portfolio" },
  { value: "default", label: "Default" },
];

const FONT_OPTIONS = [
  { value: "Afacad", label: "Afacad", sample: "Aa", className: "font-afacad" },
  {
    value: "Geologica",
    label: "Geologica",
    sample: "Aa",
    className: "font-geologica",
  },
  { value: "Inter", label: "Inter", sample: "Aa", className: "font-sans" },
  {
    value: "Serif",
    label: "Playfair Display",
    sample: "Aa",
    className: "font-playfair",
  },
];

const THEME_SWATCHES = [
  {
    name: "Teal",
    brand: THEME_DEFAULTS.ACCENT_COLORS.DEFAULT,
    background: "#F3FBF8",
    ring: THEME_DEFAULTS.ACCENT_COLORS.DEFAULT,
  },
  {
    name: "Blend",
    brand: BLEND_THEME_VALUE,
    background: "#FDF2F8",
    ring: BLEND_THEME_GRADIENT,
  },
  { name: "Clay", brand: "#9A604B", background: "#F8F4F1", ring: "#9A604B" },
  { name: "Red", brand: "#D92D20", background: "#FFF5F5", ring: "#D92D20" },
  { name: "Violet", brand: "#6D3FD1", background: "#F3F0FF", ring: "#6D3FD1" },
  { name: "Magenta", brand: "#D63384", background: "#FDF2F8", ring: "#D63384" },
  { name: "Green", brand: "#4D7C0F", background: "#F3FBF8", ring: "#4D7C0F" },
];

const BACKGROUND_SWATCHES = [
  "#FFFFFF",
  "#F8F4F1",
  "#FDF2F8",
  "#F3F0FF",
  "#F4F7FF",
  "#F3FBF8",
];

const SPACING_OPTIONS = [
  { label: "Compact", value: 12 },
  { label: "Regular", value: 20 },
  { label: "Spaced", value: 32 },
];

const RADIUS_OPTIONS: {
  label: string;
  value: "sharp" | "rounded" | "pill";
  icon: "sharp" | "soft" | "rounded";
}[] = [
  { label: "Sharp", value: "sharp", icon: "sharp" },
  { label: "Soft", value: "rounded", icon: "soft" },
  { label: "Rounded", value: "pill", icon: "rounded" },
];

function normalizeThemeValue(color: string) {
  return color.trim().toUpperCase();
}

function normalizeFontValue(value: string) {
  const normalized = value.trim().toLowerCase();

  if (normalized === "playfair display") return "serif";
  if (normalized === "inter sans") return "inter";

  return normalized;
}

function isSelectedColor(current: string, candidate: string) {
  return normalizeThemeValue(current) === normalizeThemeValue(candidate);
}

function RadiusIcon({ type }: { type: "sharp" | "soft" | "rounded" }) {
  if (type === "sharp") {
    return (
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden>
        <path
          d="M6 14V5H17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "soft") {
    return (
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden>
        <path
          d="M6 14V10C6 7.23858 8.23858 5 11 5H17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden>
      <path
        d="M6 14V12C6 8.13401 9.13401 5 13 5H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RightPanel({
  font,
  onChangeFont,
  bgColor,
  onChangeBgColor,
  iconColor,
  onChangeIconColor,
  spacing,
  onChangeSpacing,
  borderRadius,
  onChangeBorderRadius,
  appearanceTheme = "light",
  onChangeAppearanceTheme,
  template,
  onChangeTemplate,
}: RightPanelProps) {
  const selectedTemplate = template ? template.toLowerCase() : "creator";
  const [spacingMode, setSpacingMode] = useState<"basic" | "advanced">("basic");

  const [colorMode, setColorMode] = useState<"theme" | "custom">("custom");
  const [activeThemeName, setActiveThemeName] = useState<string | null>(null);
  const [manualBgColor, setManualBgColor] = useState<string | null>(null);
  const [manualBrandColor, setManualBrandColor] = useState<string | null>(null);

  const isThemeActive = colorMode === "theme" && Boolean(activeThemeName);
  const displayManualBgColor =
    colorMode === "custom" ? bgColor : (manualBgColor ?? bgColor);
  const displayManualBrandColor =
    colorMode === "custom" ? iconColor : (manualBrandColor ?? iconColor);

  const handleSelectTheme = (theme: (typeof THEME_SWATCHES)[number]) => {
    setManualBgColor(bgColor);
    setManualBrandColor(iconColor);
    setColorMode("theme");
    setActiveThemeName(theme.name);
    onChangeBgColor(theme.background);
    onChangeIconColor(theme.brand);
  };

  const handleUseManualColors = () => {
    const nextBgColor = manualBgColor ?? bgColor;
    const nextBrandColor = manualBrandColor ?? iconColor;

    setColorMode("custom");
    setActiveThemeName(null);
    onChangeBgColor(nextBgColor);
    onChangeIconColor(nextBrandColor);
  };

  const handleChangeBackgroundColor = (color: string) => {
    setColorMode("custom");
    setActiveThemeName(null);
    setManualBgColor(color);
    onChangeBgColor(color);
  };

  const handleChangeBrandColor = (color: string) => {
    setColorMode("custom");
    setActiveThemeName(null);
    setManualBrandColor(color);
    onChangeIconColor(color);
  };

  return (
    <aside className="border-tertiary-b bg-background hidden h-full w-[260px] shrink-0 flex-col border-l select-none lg:flex xl:w-[290px]">
      <div className="border-tertiary-b border-b px-4 py-4">
        <h2 className="text-primary-text text-sm font-bold">Customization</h2>
      </div>

      <div className="profile-builder-scrollbar flex-1 overflow-y-auto px-4 py-5">
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-primary-text mb-2 block text-xs font-bold">
              Template
            </label>
            <Select
              value={selectedTemplate}
              onValueChange={(val) => onChangeTemplate?.(val)}
            >
              <SelectTrigger className="border-tertiary-b bg-background h-11 w-full rounded-[10px] border px-3 text-sm font-medium shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {TEMPLATE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-primary-text mb-2 block text-xs font-bold">
              Font
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.map((option) => {
                const selected =
                  normalizeFontValue(font) === normalizeFontValue(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChangeFont(option.value)}
                    className={`border-tertiary-b bg-background flex min-h-[54px] flex-col items-start justify-center rounded-[8px] border px-3 py-2 text-left transition-all ${
                      selected
                        ? "border-brand-b bg-brand-light-subtle-bg text-primary-text"
                        : "text-secondary-text hover:border-brand-b hover:bg-hover-bg"
                    }`}
                  >
                    <span
                      className={`text-primary-text text-base leading-none font-semibold ${option.className}`}
                    >
                      {option.sample}
                    </span>
                    <span
                      className={`text-tertiary-text mt-1 text-xs leading-none ${option.className}`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-primary-text mb-2 block text-xs font-bold">
              Themes
            </label>
            <div className="border-tertiary-b bg-background flex w-full flex-nowrap items-center justify-between gap-1 rounded-[12px] border px-2 py-2">
              {THEME_SWATCHES.map((theme) => {
                const selected =
                  colorMode === "theme" && activeThemeName === theme.name;
                const isBlend = theme.name === "Blend";

                return (
                  <button
                    key={theme.name}
                    type="button"
                    aria-label={`Use ${theme.name} theme`}
                    aria-pressed={selected}
                    onClick={() => handleSelectTheme(theme)}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all hover:scale-105 active:scale-95 ${
                      selected
                        ? "border-primary-text bg-background ring-primary-text/10 shadow-sm ring-2"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    <span
                      className="relative block h-5 w-5 shrink-0 rounded-full"
                      style={
                        isBlend
                          ? { background: theme.ring }
                          : { backgroundColor: String(theme.ring) }
                      }
                    >
                      <span className="bg-background absolute inset-[3px] rounded-full" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-primary-text block text-xs font-bold">
                Colors
              </label>
              {isThemeActive && (
                <button
                  type="button"
                  onClick={handleUseManualColors}
                  className="text-link-hover-text text-[11px] font-semibold hover:underline"
                >
                  Use custom colors
                </button>
              )}
            </div>
            <div
              className={`border-tertiary-b bg-background flex flex-col gap-3 rounded-[12px] border p-3 ${
                isThemeActive ? "opacity-50" : ""
              }`}
              aria-disabled={isThemeActive}
            >
              {isThemeActive && (
                <p className="text-tertiary-text text-xs font-medium">
                  A theme is active. Switch to custom colors to edit background
                  or brand colors manually.
                </p>
              )}

              <div>
                <span className="text-tertiary-text mb-2 block text-xs font-medium">
                  Background
                </span>
                <div className="grid grid-cols-6 gap-1.5">
                  {BACKGROUND_SWATCHES.map((color) => {
                    const selected = isSelectedColor(
                      displayManualBgColor,
                      color
                    );

                    return (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Set background color to ${color}`}
                        disabled={isThemeActive}
                        onClick={() => handleChangeBackgroundColor(color)}
                        className={`flex h-8 w-full items-center justify-center rounded-[8px] border transition-all disabled:cursor-not-allowed ${
                          selected
                            ? "border-primary-text"
                            : "border-tertiary-b hover:border-primary-text"
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {selected && (
                          <Check size={12} className="text-primary-text" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ColorPicker
                label="Brand"
                color={
                  displayManualBrandColor ||
                  THEME_DEFAULTS.ACCENT_COLORS.DEFAULT
                }
                onChange={handleChangeBrandColor}
                disabled={isThemeActive}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-primary-text block text-xs font-bold">
                Spacing
              </label>
              <div className="border-tertiary-b bg-background grid grid-cols-2 rounded-full border p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setSpacingMode("basic")}
                  className={`rounded-full px-2.5 py-1 transition-all ${
                    spacingMode === "basic"
                      ? "bg-hover-bg text-primary-text shadow-sm"
                      : "text-tertiary-text hover:text-primary-text"
                  }`}
                >
                  Basic
                </button>
                <button
                  type="button"
                  onClick={() => setSpacingMode("advanced")}
                  className={`rounded-full px-2.5 py-1 transition-all ${
                    spacingMode === "advanced"
                      ? "bg-hover-bg text-primary-text shadow-sm"
                      : "text-tertiary-text hover:text-primary-text"
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>

            {spacingMode === "basic" ? (
              <div className="border-tertiary-b bg-background grid grid-cols-3 rounded-[10px] border p-1">
                {SPACING_OPTIONS.map((option) => {
                  const selected = spacing === option.value;

                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => onChangeSpacing(option.value)}
                      className={`rounded-[8px] px-2 py-2.5 text-xs font-semibold transition-all ${
                        selected
                          ? "bg-hover-bg text-primary-text shadow-sm"
                          : "text-secondary-text hover:bg-hover-bg"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="border-tertiary-b bg-background rounded-[10px] border p-3">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-tertiary-text font-medium">
                    Custom spacing
                  </span>
                  <span className="text-primary-text font-bold">
                    {spacing}px
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={40}
                  step={1}
                  value={spacing}
                  onChange={(event) =>
                    onChangeSpacing(Number(event.target.value))
                  }
                  className="accent-brand-hover-bg w-full cursor-pointer"
                  aria-label="Custom preview spacing"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-primary-text mb-2 block text-xs font-bold">
              Border Radius
            </label>
            <div className="border-tertiary-b bg-background grid grid-cols-3 rounded-[10px] border p-1">
              {RADIUS_OPTIONS.map((option) => {
                const selected = borderRadius === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChangeBorderRadius(option.value)}
                    className={`flex flex-col items-center justify-center rounded-[8px] px-2 py-2 text-xs font-semibold transition-all ${
                      selected
                        ? "bg-hover-bg text-primary-text shadow-sm"
                        : "text-secondary-text hover:bg-hover-bg"
                    }`}
                  >
                    <RadiusIcon type={option.icon} />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-primary-text mb-2 block text-xs font-bold">
              Appearance mode
            </label>
            <div className="border-tertiary-b bg-background grid grid-cols-2 rounded-[10px] border p-1">
              <button
                type="button"
                onClick={() => onChangeAppearanceTheme?.("light")}
                className={`flex items-center justify-center rounded-[8px] py-2.5 transition-all ${
                  appearanceTheme === "light"
                    ? "bg-hover-bg text-primary-text shadow-sm"
                    : "text-secondary-text hover:bg-hover-bg"
                }`}
                aria-label="Use light theme"
              >
                <Sun size={16} />
              </button>
              <button
                type="button"
                disabled
                className={`flex cursor-not-allowed items-center justify-center rounded-[8px] py-2.5 opacity-50 transition-all ${
                  appearanceTheme === "dark"
                    ? "bg-hover-bg text-primary-text shadow-sm"
                    : "text-secondary-text"
                }`}
                aria-label="Use dark theme"
              >
                <Moon size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
