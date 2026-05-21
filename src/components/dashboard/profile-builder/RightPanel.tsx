"use client";

import { Sun, Moon, Type } from "lucide-react";
import type { Section } from "./types";
import { ColorPicker } from "@/components/ui/color-picker";
import { isValidHex } from "@/utils/color";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  borderRadius: "sharp" | "medium" | "round";
  onChangeBorderRadius: (radius: "sharp" | "medium" | "round") => void;
  theme: "light" | "dark";
  onChangeTheme: (theme: "light" | "dark") => void;
  activeTab: "general" | "section";
  onChangeTab: (tab: "general" | "section") => void;
  selectedSection: Section | null;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
}

const FONT_OPTIONS = [
  { value: "Afacad", label: "Afacad" },
  { value: "Inter", label: "Inter Sans" },
  { value: "Serif", label: "Playfair Serif" },
  { value: "Mono", label: "Roboto Mono" },
  { value: "Geoligica", label: "Geoligica" },
  { value: "Manrope", label: "Manrope" },
];

export default function RightPanel({
  font,
  onChangeFont,
  textColor,
  onChangeTextColor,
  bgColor,
  onChangeBgColor,
  iconColor,
  onChangeIconColor,
  spacing,
  onChangeSpacing,
  borderRadius,
  onChangeBorderRadius,
  theme,
  onChangeTheme,
  activeTab,
  onChangeTab,
  selectedSection,
  onUpdateSection,
}: RightPanelProps) {
  return (
    <aside className="border-tertiary-b animate-in fade-in hidden h-full w-[290px] shrink-0 flex-col border bg-white shadow-sm duration-200 select-none lg:flex">
      {/* Tabs Header */}
      <div className="border-tertiary-b flex border-b">
        <button
          onClick={() => onChangeTab("general")}
          className={`relative flex-1 py-4 text-center text-sm font-bold transition-all ${
            activeTab === "general"
              ? "text-primary-text"
              : "text-tertiary-text hover:text-primary-text"
          }`}
        >
          General
          {activeTab === "general" && (
            <span className="bg-primary-text absolute bottom-0 left-0 h-[2.5px] w-full transition-all" />
          )}
        </button>
        <button
          onClick={() => onChangeTab("section")}
          className={`relative flex-1 py-4 text-center text-sm font-bold transition-all ${
            activeTab === "section"
              ? "text-primary-text"
              : "text-tertiary-text hover:text-primary-text"
          }`}
        >
          Section
          {activeTab === "section" && (
            <span className="bg-primary-text absolute bottom-0 left-0 h-[2.5px] w-full transition-all" />
          )}
        </button>
      </div>

      {/* Settings Body */}
      <div className="flex-1 overflow-x-visible overflow-y-auto p-6">
        {activeTab === "general" ? (
          <div className="flex flex-col gap-6">
            {/* Font Selection */}
            <div>
              <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                Font
              </label>
              <Select value={font} onValueChange={onChangeFont}>
                <SelectTrigger className="border-tertiary-b rounded-[12px] border bg-white px-4 py-3.5 text-sm font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Colors Selection */}
            <div>
              <label className="text-primary-text mb-3 block text-xs font-bold tracking-wider uppercase">
                Colors
              </label>

              <div className="border-tertiary-b flex flex-col gap-3 rounded-[16px] border bg-white p-4">
                <ColorPicker
                  label="Text"
                  color={textColor}
                  onChange={onChangeTextColor}
                />
                <ColorPicker
                  label="Bg"
                  color={bgColor}
                  onChange={onChangeBgColor}
                />
                <ColorPicker
                  label="Icon"
                  color={iconColor}
                  onChange={onChangeIconColor}
                />
              </div>
            </div>

            {/* Spacing Slider */}
            <div>
              <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                Spacing
              </label>
              <div className="border-tertiary-b relative flex h-[48px] w-full items-center overflow-hidden rounded-[12px] border bg-white">
                {/* Left background fill block up to the active value */}
                <div
                  className="bg-hover-bg pointer-events-none absolute top-0 bottom-0 left-0 transition-all duration-75"
                  style={{ width: `${(spacing / 48) * 100}%` }}
                />

                {/* The actual native input slider overlaying everything */}
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={spacing}
                  onChange={(e) => onChangeSpacing(Number(e.target.value))}
                  className="custom-slider absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent px-4 outline-none focus:outline-none"
                />

                {/* Numeric display text absolutely positioned on the right */}
                <div className="text-primary-text pointer-events-none absolute right-4 text-sm font-semibold select-none">
                  {spacing}
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                Border Radius
              </label>
              <div className="border-tertiary-b flex gap-1 rounded-[12px] border bg-white p-1">
                <button
                  type="button"
                  onClick={() => onChangeBorderRadius("medium")}
                  className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                    borderRadius === "medium"
                      ? "bg-hover-bg text-primary-text"
                      : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                  }`}
                  title="Medium"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18V12C6 8.68629 8.68629 6 12 6H18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeBorderRadius("sharp")}
                  className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                    borderRadius === "sharp"
                      ? "bg-hover-bg text-primary-text"
                      : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                  }`}
                  title="Sharp"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18V6H18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeBorderRadius("round")}
                  className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                    borderRadius === "round"
                      ? "bg-hover-bg text-primary-text"
                      : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                  }`}
                  title="Round"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18V15C6 10.0294 10.0294 6 15 6H18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Theme Selector */}
            <div>
              <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                Theme
              </label>
              <div className="border-tertiary-b flex gap-1 rounded-[12px] border bg-white p-1">
                <button
                  type="button"
                  onClick={() => onChangeTheme("light")}
                  className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                    theme === "light"
                      ? "bg-hover-bg text-primary-text"
                      : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                  }`}
                >
                  <Sun size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeTheme("dark")}
                  className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-hover-bg text-primary-text"
                      : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                  }`}
                >
                  <Moon size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col gap-6">
            {selectedSection ? (
              <div className="flex flex-col gap-6">
                {/* Font Selection */}
                <div>
                  <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                    Font
                  </label>
                  <Select
                    value={selectedSection.font ?? font}
                    onValueChange={(val) =>
                      onUpdateSection(selectedSection.id, { font: val })
                    }
                  >
                    <SelectTrigger className="border-tertiary-b rounded-[12px] border bg-white px-4 py-3.5 text-sm font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Colors Selection */}
                <div>
                  <label className="text-primary-text mb-3 block text-xs font-bold tracking-wider uppercase">
                    Color
                  </label>

                  <div className="border-tertiary-b flex flex-col gap-3 rounded-[16px] border bg-white p-4">
                    <ColorPicker
                      label="Text"
                      color={
                        isValidHex(selectedSection.textColor ?? textColor)
                          ? (selectedSection.textColor ?? textColor)
                          : "#050505"
                      }
                      onChange={(val) =>
                        onUpdateSection(selectedSection.id, { textColor: val })
                      }
                    />
                    <ColorPicker
                      label="Bg"
                      color={
                        isValidHex(selectedSection.bgColor ?? bgColor)
                          ? (selectedSection.bgColor ?? bgColor)
                          : "#FFFFFF"
                      }
                      onChange={(val) =>
                        onUpdateSection(selectedSection.id, { bgColor: val })
                      }
                    />
                    <ColorPicker
                      label="Icon"
                      color={
                        isValidHex(selectedSection.iconColor ?? iconColor)
                          ? (selectedSection.iconColor ?? iconColor)
                          : "#087583"
                      }
                      onChange={(val) =>
                        onUpdateSection(selectedSection.id, { iconColor: val })
                      }
                    />
                  </div>
                </div>

                {/* Section Spacing */}
                <div>
                  <label className="text-primary-text mb-4 block text-xs font-bold tracking-wider uppercase">
                    Spacing
                  </label>
                  <div className="flex flex-col gap-4">
                    {(
                      [
                        { label: "Top", key: "paddingTop", defaultVal: 24 },
                        {
                          label: "Bottom",
                          key: "paddingBottom",
                          defaultVal: 24,
                        },
                        { label: "Gap", key: "gap", defaultVal: 20 },
                        { label: "Padding", key: "padding", defaultVal: 16 },
                      ] as {
                        label: string;
                        key: keyof Pick<
                          Section,
                          "paddingTop" | "paddingBottom" | "gap" | "padding"
                        >;
                        defaultVal: number;
                      }[]
                    ).map((item) => {
                      const val = Number(
                        selectedSection[item.key] ?? item.defaultVal
                      );
                      return (
                        <div key={item.label} className="flex flex-col gap-2">
                          <span className="text-primary-text text-sm font-semibold">
                            {item.label}
                          </span>
                          <div className="border-tertiary-b relative flex h-[48px] w-full items-center overflow-hidden rounded-[12px] border bg-white">
                            <div
                              className="bg-hover-bg pointer-events-none absolute top-0 bottom-0 left-0 transition-all duration-75"
                              style={{ width: `${(val / 48) * 100}%` }}
                            />
                            <input
                              type="range"
                              min="0"
                              max="48"
                              value={val}
                              onChange={(e) =>
                                onUpdateSection(selectedSection.id, {
                                  [item.key]: Number(e.target.value),
                                })
                              }
                              className="custom-slider absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent px-4 outline-none focus:outline-none"
                            />
                            <div className="text-primary-text pointer-events-none absolute right-4 text-sm font-semibold select-none">
                              {val}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center px-4 text-center">
                <Type size={32} className="text-disabled-text mb-3" />
                <p className="text-primary-text text-sm font-semibold">
                  No section selected
                </p>
                <p className="text-tertiary-text mt-1 max-w-[200px] text-xs">
                  Select a section from the left sidebar to customize its items
                  and content.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
