"use client";

import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { ChevronDown, Pipette } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { isValidHex, hexToRgb, hexToHsl } from "@/utils/color";

import { THEME_DEFAULTS, COLOR_PICKER_PRESETS } from "@/constants/theme";

interface ColorPickerProps {
  color: string;
  onChange: (val: string) => void;
  label: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"HEX" | "RGB" | "HSL">("HEX");
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const ref = useOutsideClick(() => setOpen(false));
  const safeColor = isValidHex(color) ? color : THEME_DEFAULTS.TEXT_COLOR;

  const rgb = hexToRgb(safeColor);
  const hsl = hexToHsl(safeColor);

  const inputValue =
    mode === "HEX"
      ? safeColor.replace("#", "")
      : mode === "RGB"
        ? `${rgb.r}, ${rgb.g}, ${rgb.b}`
        : `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;

  const handleOpen = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupHeight = 380;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < popupHeight && rect.top > popupHeight;
      setPopupStyle({
        position: "fixed",
        right: window.innerWidth - rect.right,
        ...(openUpward
          ? { top: rect.top - popupHeight - 8 }
          : { top: rect.top - 60 }),
        width: 260,
        zIndex: 9999,
      });
    }
    setOpen(!open);
  };

  return (
    <div className="relative flex items-center justify-between" ref={ref}>
      <span className="text-tertiary-text text-sm font-semibold">{label}</span>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className={`border-tertiary-b relative flex max-w-[145px] flex-1 cursor-pointer items-center gap-2 rounded-[12px] border p-1.5 transition-colors ${open ? "bg-active-bg" : "bg-hover-bg hover:bg-active-bg"}`}
      >
        <div
          style={{ backgroundColor: safeColor }}
          className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[8px] border border-black/10 shadow-sm"
        />
        <div className="text-primary-text w-16 border-0 bg-transparent p-0 text-left text-sm font-bold uppercase outline-none">
          {safeColor}
        </div>
      </button>

      {open && (
        <div
          className="animate-in fade-in zoom-in-95 overflow-hidden rounded-[16px] bg-white shadow-lg duration-200"
          style={popupStyle}
        >
          <style>{`
            .kiro-picker .react-colorful { width: 100% !important; gap: 10px !important; }
            .kiro-picker .react-colorful__saturation { border-radius: 8px !important; height: 160px !important; }
            .kiro-picker .react-colorful__hue { height: 12px !important; border-radius: 6px !important; }
            .kiro-picker .react-colorful__saturation-pointer { width: 20px !important; height: 20px !important; border: 3px solid white !important; box-shadow: 0 2px 6px #00000040 !important; }
            .kiro-picker .react-colorful__hue-pointer { width: 14px !important; height: 14px !important; border: 2px solid white !important; box-shadow: 0 1px 4px #0000004d !important; }
          `}</style>
          <div className="kiro-picker p-3 pb-0">
            <HexColorPicker
              color={safeColor}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </div>

          <div className="p-3 pt-2">
            <div className="border-tertiary-b mb-2.5 border-b border-dashed" />

            <div className="mb-1.5 flex items-center gap-1.5">
              <Pipette size={12} className="text-tertiary-text" />
              <button
                type="button"
                onClick={() =>
                  setMode(
                    mode === "HEX" ? "RGB" : mode === "RGB" ? "HSL" : "HEX"
                  )
                }
                className="text-tertiary-text flex items-center gap-0.5 text-xs font-medium"
              >
                {mode}
                <ChevronDown size={10} />
              </button>
            </div>

            <div className="border-tertiary-b mb-3 flex items-center rounded-[8px] border">
              <div className="flex flex-1 items-center gap-1 px-2 py-1.5">
                {mode === "HEX" && (
                  <span className="text-tertiary-text text-sm font-bold">
                    #
                  </span>
                )}
                <input
                  className="text-primary-text min-w-0 flex-1 bg-transparent text-sm font-bold uppercase outline-none"
                  value={inputValue}
                  readOnly={mode !== "HEX"}
                  onChange={(e) => {
                    if (mode === "HEX" && e.target.value.length <= 6)
                      onChange("#" + e.target.value);
                  }}
                />
              </div>
              <div className="border-tertiary-b h-6 w-px border-l" />
              <div className="px-2.5 py-1.5">
                <span className="text-tertiary-text text-sm font-medium">
                  100%
                </span>
              </div>
            </div>

            <div>
              <span className="text-tertiary-text mb-2 block text-[11px] font-medium">
                Recommended Colors
              </span>
              <div className="flex items-center gap-1.5">
                {COLOR_PICKER_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Set color to ${c}`}
                    onClick={() => onChange(c)}
                    className={`h-[22px] w-[22px] shrink-0 rounded-full border border-black/10 transition-transform hover:scale-110 active:scale-95 ${safeColor.toUpperCase() === c.toUpperCase() ? "ring-primary-text ring-2 ring-offset-1" : ""}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
