"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Trash2, Smile } from "lucide-react";
import type { Section } from "./types";

interface CtaSidebarProps {
  returnTab: () => void;
  section: Section | null;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
}

const PRESET_ICONS = [
  { id: "chat", label: "Chat", src: "/profilebuilder_home/icons/chat.svg" },
  { id: "mail", label: "Email", src: "/profilebuilder_home/icons/mail.svg" },
  {
    id: "global",
    label: "Website",
    src: "/profilebuilder_home/icons/global.svg",
  },
  {
    id: "github",
    label: "GitHub",
    src: "/profilebuilder_home/icons/github.svg",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    src: "/profilebuilder_home/icons/linkedin.svg",
  },
  {
    id: "twitter",
    label: "Twitter",
    src: "/profilebuilder_home/icons/twitter.svg",
  },
  {
    id: "youtube",
    label: "YouTube",
    src: "/profilebuilder_home/icons/youtube.svg",
  },
  {
    id: "insta",
    label: "Instagram",
    src: "/profilebuilder_home/icons/insta.svg",
  },
  { id: "figma", label: "Figma", src: "/profilebuilder_home/icons/figma.svg" },
  {
    id: "behance",
    label: "Behance",
    src: "/profilebuilder_home/icons/behance.svg",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    src: "/profilebuilder_home/icons/whatsapp.svg",
  },
];

export default function CtaSidebar({
  returnTab,
  section,
  onUpdateSection,
}: CtaSidebarProps) {
  const [sectionTitle, setSectionTitle] = useState(
    section?.title || "Let's build something"
  );
  const [sectionSubtitle, setSectionSubtitle] = useState(
    section?.subtitle || ""
  );
  const [layout, setLayout] = useState(section?.layout || "1");
  const [buttonText, setButtonText] = useState(
    section?.buttonText || "Start a Conversation"
  );
  const [buttonUrl, setButtonUrl] = useState(section?.url || "");
  const [selectedIconId, setSelectedIconId] = useState<string | null>(
    section?.iconId || "chat"
  );
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);

  const iconSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        iconSelectorRef.current &&
        !iconSelectorRef.current.contains(event.target as Node)
      ) {
        setIsIconSelectorOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const syncSection = (updates: Partial<Section>) => {
    if (!section) return;
    onUpdateSection(section.id, updates);
  };

  const handleTitleChange = (val: string) => {
    setSectionTitle(val);
    syncSection({ title: val });
  };

  const handleSubtitleChange = (val: string) => {
    setSectionSubtitle(val);
    syncSection({ subtitle: val });
  };

  const handleLayoutChange = (lay: string) => {
    setLayout(lay);
    syncSection({ layout: lay });
  };

  const handleButtonTextChange = (val: string) => {
    setButtonText(val);
    syncSection({ buttonText: val });
  };

  const handleButtonUrlChange = (val: string) => {
    setButtonUrl(val);
    syncSection({ url: val });
  };

  const handleSelectIcon = (iconId: string, iconSrc: string, label: string) => {
    setSelectedIconId(iconId);
    syncSection({ iconId, iconSrc, iconLabel: label });
    setIsIconSelectorOpen(false);
  };

  const handleClearIcon = () => {
    setSelectedIconId(null);
    syncSection({ iconId: null, iconSrc: null, iconLabel: null });
    setIsIconSelectorOpen(false);
  };

  const currentIcon = PRESET_ICONS.find((i) => i.id === selectedIconId);

  return (
    <aside className="border-tertiary-b animate-in fade-in flex h-full w-72.5 shrink-0 flex-col border bg-white shadow-sm duration-200 select-none">
      {/* Back Button */}
      <div className="p-6 pb-4">
        <button
          onClick={returnTab}
          className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
        >
          <ChevronLeft size={20} />
          <span>CTA</span>
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="border-tertiary-b flex border-b">
        <button
          type="button"
          className="text-primary-text relative flex-1 py-4 text-center text-sm font-bold"
        >
          Content
          <span className="bg-primary-text absolute bottom-0 left-0 h-[2.5px] w-full" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4 pr-3.5">
        <div className="flex flex-col gap-6">
          {/* Layout Section */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#050505]">Layout</label>
            <div className="grid grid-cols-3 gap-2">
              {["1", "2", "3"].map((lay) => (
                <button
                  key={lay}
                  type="button"
                  onClick={() => handleLayoutChange(lay)}
                  className={`group relative aspect-square overflow-hidden rounded-xl border transition-all duration-200 outline-none focus:outline-none ${
                    layout === lay
                      ? "border-[#E4E4E7] bg-[#F4F4F5]"
                      : "border-[#EDEDED] bg-white hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={`/profilebuilder_cta/${lay}.svg`}
                    alt={`Layout ${lay}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title Section */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#050505]">Title</label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Let's build something"
              className="focus:border-brand-b focus:ring-brand-b w-full rounded-[10px] border border-[#EDEDED] px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:ring-1"
            />
          </div>

          {/* Subtitle Section */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#050505]">Subtitle</label>
            <textarea
              value={sectionSubtitle}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              maxLength={200}
              placeholder="I'm currently accepting new projects and consulting opportunities..."
              rows={4}
              className="focus:border-brand-b focus:ring-brand-b w-full resize-none rounded-[10px] border border-[#EDEDED] px-4 py-3 text-sm text-[#050505] outline-none focus:ring-1"
            />
            <p className="text-right text-[11px] text-[#A2A2A2]">
              {sectionSubtitle.length}/200
            </p>
          </div>

          {/* Icon Selector Section */}
          <div className="relative flex flex-col gap-2" ref={iconSelectorRef}>
            <label className="text-xs font-bold text-[#050505]">Icon</label>
            <div className="flex h-[50px] overflow-hidden rounded-[8px] border border-[#EDEDED] bg-white">
              <button
                type="button"
                onClick={() => setIsIconSelectorOpen(!isIconSelectorOpen)}
                className="flex min-w-0 flex-1 items-center gap-3 px-4 text-left transition-colors hover:bg-gray-50"
              >
                {currentIcon ? (
                  <div className="relative h-6 w-6">
                    <Image
                      src={currentIcon.src}
                      alt={currentIcon.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F4F5] text-gray-400">
                    <Smile size={14} />
                  </div>
                )}
                <span className="truncate text-xs font-semibold text-gray-500">
                  {currentIcon ? currentIcon.label : "Select Icon"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleClearIcon}
                className="flex w-[50px] shrink-0 items-center justify-center border-l border-[#EDEDED] text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-600"
                title="Remove Icon"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Presets Grid Dropdown */}
            {isIconSelectorOpen && (
              <div className="border-tertiary-b animate-in fade-in slide-in-from-bottom-2 absolute bottom-[55px] left-0 z-30 max-h-56 w-full overflow-y-auto rounded-xl border bg-white p-3.5 shadow-lg duration-150">
                <p className="mb-2.5 text-left text-xs font-bold tracking-wider text-[#747474] uppercase">
                  Select Presets
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_ICONS.map((ico) => (
                    <button
                      key={ico.id}
                      type="button"
                      onClick={() =>
                        handleSelectIcon(ico.id, ico.src, ico.label)
                      }
                      className={`flex h-11 items-center justify-center rounded-lg border transition-all ${
                        selectedIconId === ico.id
                          ? "border-brand-b bg-brand-light-subtle-bg/30"
                          : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative h-6 w-6">
                        <Image
                          src={ico.src}
                          alt={ico.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Button Section */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#050505]">Button</label>
            <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#EDEDED] bg-white">
              <input
                type="text"
                value={buttonText}
                onChange={(e) => handleButtonTextChange(e.target.value)}
                placeholder="Start a Conversation"
                className="w-full border-b border-[#EDEDED] px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:bg-gray-50/30"
              />
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={buttonUrl}
                  onChange={(e) => handleButtonUrlChange(e.target.value)}
                  placeholder="Search site or paste link"
                  className="w-full px-4 py-3 pr-10 text-sm text-gray-600 outline-none focus:bg-gray-50/30"
                />
                <span className="absolute right-4 text-xs font-bold text-gray-400 select-none">
                  ...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
