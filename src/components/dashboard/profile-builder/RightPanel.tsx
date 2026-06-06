"use client";

import type { Section } from "./types";
import { ColorPicker } from "@/components/ui/color-picker";
import { isValidHex } from "@/utils/color";
import { THEME_DEFAULTS } from "@/constants/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Type, ChevronLeft } from "lucide-react";

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
  onBackToGlobal: () => void;
  selectedSection: Section | null;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  template: string;
  onChangeTemplate?: (template: string | null) => void;
}

const FONT_OPTIONS = [
  { value: "Afacad", label: "Afacad" },
  { value: "Inter", label: "Inter Sans" },
  { value: "Serif", label: "Playfair Serif" },
  { value: "Mono", label: "Roboto Mono" },
  { value: "Geologica", label: "Geologica" },
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
  onBackToGlobal,
  selectedSection,
  onUpdateSection,
  template,
  onChangeTemplate,
}: RightPanelProps) {
  return (
    <aside className="border-tertiary-b animate-in fade-in bg-background hidden h-full w-[260px] shrink-0 flex-col rounded-2xl border p-6 shadow-sm duration-200 select-none lg:flex xl:w-[290px]">
      {/* Header */}
      <div className="border-tertiary-b border-b pb-4">
        {selectedSection ? (
          <button
            onClick={onBackToGlobal}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>Back to Global</span>
          </button>
        ) : (
          <div className="text-primary-text py-2 text-sm font-bold">
            Global Settings
          </div>
        )}
      </div>

      {/* Settings Body */}
      <div className="relative flex-1 overflow-x-visible overflow-y-auto py-6 pr-1">
        <div>
          {!selectedSection ? (
            <div className="flex flex-col gap-6">
              {/* Template Selection */}
              <div>
                <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                  Template
                </label>
                <Select
                  value={template ? template.toLowerCase() : "default"}
                  onValueChange={(val) => onChangeTemplate?.(val)}
                >
                  <SelectTrigger className="border-tertiary-b bg-background rounded-[12px] border px-4 py-3.5 text-sm font-semibold">
                    <span className="flex items-center">
                      <Palette size={16} className="text-secondary-text mr-2" />
                      <span className="capitalize">
                        {template || "Choose Template"}
                      </span>
                    </span>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Font Selection */}
              <div>
                <label className="text-primary-text mb-2 block text-xs font-bold tracking-wider uppercase">
                  Font
                </label>
                <Select value={font} onValueChange={onChangeFont}>
                  <SelectTrigger className="border-tertiary-b bg-background rounded-[12px] border px-4 py-3.5 text-sm font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
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

                <div className="border-tertiary-b bg-background flex flex-col gap-3 rounded-[16px] border p-4">
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
                <div className="border-tertiary-b bg-background relative flex h-[48px] w-full items-center overflow-hidden rounded-[12px] border">
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
                <div className="border-tertiary-b bg-background flex gap-1 rounded-[12px] border p-1">
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
                    onClick={() => onChangeBorderRadius("rounded")}
                    className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                      borderRadius === "rounded"
                        ? "bg-hover-bg text-primary-text"
                        : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                    }`}
                    title="Rounded"
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
                    onClick={() => onChangeBorderRadius("pill")}
                    className={`flex flex-1 items-center justify-center rounded-[8px] py-3 transition-all duration-200 ${
                      borderRadius === "pill"
                        ? "bg-hover-bg text-primary-text"
                        : "text-tertiary-text hover:bg-primary-bg hover:text-primary-text"
                    }`}
                    title="Pill"
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
                      <SelectTrigger className="border-tertiary-b bg-background rounded-[12px] border px-4 py-3.5 text-sm font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent position="popper">
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

                    <div className="border-tertiary-b bg-background flex flex-col gap-3 rounded-[16px] border p-4">
                      <ColorPicker
                        label="Text"
                        color={
                          isValidHex(selectedSection.textColor ?? textColor)
                            ? (selectedSection.textColor ?? textColor)
                            : THEME_DEFAULTS.TEXT_COLOR
                        }
                        onChange={(val) =>
                          onUpdateSection(selectedSection.id, {
                            textColor: val,
                          })
                        }
                      />
                      <ColorPicker
                        label="Bg"
                        color={
                          isValidHex(selectedSection.bgColor ?? bgColor)
                            ? (selectedSection.bgColor ?? bgColor)
                            : THEME_DEFAULTS.BG_COLOR
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
                            : THEME_DEFAULTS.ACCENT_COLORS.DEFAULT
                        }
                        onChange={(val) =>
                          onUpdateSection(selectedSection.id, {
                            iconColor: val,
                          })
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
                            <div className="border-tertiary-b bg-background relative flex h-[48px] w-full items-center overflow-hidden rounded-[12px] border">
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
                <div className="flex h-75 flex-col items-center justify-center px-4 text-center">
                  <Type size={32} className="text-disabled-text mb-3" />
                  <p className="text-primary-text text-sm font-semibold">
                    No section selected
                  </p>
                  <p className="text-tertiary-text mt-1 max-w-[200px] text-xs">
                    Select a section from the left sidebar to customize its
                    items and content.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
