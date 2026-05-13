"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "At least one number", test: (p: string) => /\d/.test(p) },
  { label: "At least one uppercase", test: (p: string) => /[A-Z]/.test(p) },
  {
    label: "At least one special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

type Props = {
  value?: string;
  onChange: (v: string) => void;
  showRules?: boolean;
  required?: boolean;
  autoComplete?: string;
};

export function PasswordField({
  value,
  onChange,
  showRules,
  required,
  autoComplete = "current-password",
}: Props) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#454545]">Password</label>
      <div className="relative">
        <Input
          name="password"
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          required={required}
          autoComplete={autoComplete}
          {...(value !== undefined
            ? { value, onChange: (e) => onChange(e.target.value) }
            : {})}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-11 pr-10 bg-[#FAFAFA] border border-[#EDEDED] shadow-none placeholder:text-[#747474] transition-all duration-200 hover:border-[#ABABAB] hover:bg-white hover:shadow-sm"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12c2-4 5-6 10-6s8 2 10 6" />
              <path d="M2 12c2 4 5 6 10 6s8-2 10-6" />
              <path d="M12 16a4 4 0 0 1-4-4" />
              <path d="M12 16a4 4 0 0 0 4-4" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {showRules &&
        (() => {
          const v = value ?? "";
          const metCount = rules.filter((r) => r.test(v)).length;
          const allMet = metCount === rules.length;

          const label =
            v.length === 0
              ? "Password must contain:"
              : metCount <= 1
                ? "Weak password. Must contain:"
                : "Okay, but could be stronger. Must contain:";

          return (
            <div
              style={{
                maxHeight: focused ? "160px" : "0px",
                opacity: focused ? 1 : 0,
                overflow: "hidden",
                paddingTop: focused ? "20px" : "0px",
                transition:
                  "max-height 0.3s ease, opacity 0.3s ease, padding-top 0.3s ease",
              }}
            >
              <div className="flex flex-col">
                {!allMet && (
                  <p className="text-xs text-[#454545] mb-[16px]">{label}</p>
                )}
                <div className="flex flex-col gap-[12px]">
                  {rules.map((rule) => {
                    const met = rule.test(v);
                    return (
                      <div key={rule.label} className="flex items-center gap-2">
                        <div
                          style={{ borderRadius: "2px" }}
                          className={`w-4 h-4 border flex items-center justify-center transition-colors ${met ? "border-[#171717]" : "border-gray-300"}`}
                        >
                          {met && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M1.5 5l2.5 2.5 4.5-4.5"
                                stroke="#171717"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-xs ${met ? "text-[#171717]" : "text-[#747474]"}`}
                        >
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}

export function allPasswordRulesMet(password: string | undefined) {
  return rules.every((r) => r.test(password ?? ""));
}
