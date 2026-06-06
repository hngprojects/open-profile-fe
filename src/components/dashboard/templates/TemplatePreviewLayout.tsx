"use client";

import { ArrowLeft, Eye } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface TemplatePreviewLayoutProps {
  templateName: string;
  children: React.ReactNode;
}

export default function TemplatePreviewLayout({ templateName, children }: TemplatePreviewLayoutProps) {
  const handleClose = () => {
    window.close();
    setTimeout(() => {
      window.location.href = ROUTES.dashboard.profileBuilder;
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary-bg pb-24 font-sans text-primary-text antialiased">
      {/* Floating Preview Banner */}
      <div className="sticky top-0 z-50 w-full border-b border-inverse-b bg-inverse-bg/95 px-4 py-3 text-inverse-text shadow-md backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-brand-hover-bg px-2 py-0.5 text-xs font-bold tracking-wider text-white uppercase">
              <Eye size={12} /> Preview
            </span>
            <p className="text-sm font-medium text-neutral-300">
              Viewing{" "}
              <span className="font-bold text-white">{templateName} Template</span>.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            <ArrowLeft size={13} />
            Close Preview
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 pt-12">
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}
