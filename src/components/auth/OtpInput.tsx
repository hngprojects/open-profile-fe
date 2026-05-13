"use client";
import { useRef, useState } from "react";

type Props = {
  length?: number;
  onChange: (code: string[]) => void;
};

export function OtpInput({ length = 6, onChange }: Props) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function update(next: string[]) {
    setCode(next);
    onChange(next);
  }

  function handleChange(i: number, val: string) {
    const char = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = char;
    update(next);
    if (char && i < length - 1) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[i] && i > 0)
      inputs.current[i - 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    const next = [...code];
    pasted.split("").forEach((c, i) => {
      next[i] = c;
    });
    update(next);
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="flex gap-6" onPaste={handlePaste}>
      {code.map((val, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-full h-10 text-center text-lg font-semibold bg-[#FAFAFA] border border-[#EDEDED] rounded-lg outline-none focus:border-[#087583] transition-colors"
        />
      ))}
    </div>
  );
}
