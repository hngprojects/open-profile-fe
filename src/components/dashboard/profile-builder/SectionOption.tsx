import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { SavedLink } from "./LinkSidebar";
import { isValidUrl } from "./builder.utils";

const presetIcons = [
  {
    id: "mail",
    label: "Mail",
    icon: "/profilebuilder_home/icons/mail.svg",
  },
  {
    id: "insta",
    label: "Instagram",
    icon: "/profilebuilder_home/icons/insta.svg",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    icon: "/profilebuilder_home/icons/twitter.svg",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "/profilebuilder_home/icons/linkedin.svg",
  },
  {
    id: "github",
    label: "GitHub",
    icon: "/profilebuilder_home/icons/github.svg",
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: "/profilebuilder_home/icons/youtube.svg",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "/profilebuilder_home/icons/whatsapp.svg",
  },
  {
    id: "figma",
    label: "Figma",
    icon: "/profilebuilder_home/icons/figma.svg",
  },
  {
    id: "behance",
    label: "Behance",
    icon: "/profilebuilder_home/icons/behance.svg",
  },
  {
    id: "flickr",
    label: "Flickr",
    icon: "/profilebuilder_home/icons/flickr.svg",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: "/profilebuilder_home/icons/pinterest.svg",
  },
  {
    id: "global",
    label: "Website",
    icon: "/profilebuilder_home/icons/global.svg",
  },
  {
    id: "eye",
    label: "Eye",
    icon: "/profilebuilder_home/icons/eye.svg",
  },
  {
    id: "chat",
    label: "Chat",
    icon: "/profilebuilder_home/icons/chat.svg",
  },
  {
    id: "external",
    label: "External",
    icon: "/profilebuilder_home/icons/external.svg",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: "/profilebuilder_home/icons/tiktok.svg",
  },
];

type SavedLinkInput = {
  title: string;
  url: string;
  iconId: string | null;
  iconLabel: string | null;
  iconSrc: string | null;
  imageSrc: string | null;
};

export default function SectionOption({
  returnTab,
  editingLink,
  onSaveLink,
  linkCount,
  canAddMoreLinks,
}: {
  returnTab: () => void;
  editingLink: SavedLink | null;
  onSaveLink: (link: SavedLinkInput, editingId?: string | null) => void;
  linkCount: number;
  canAddMoreLinks: boolean;
}) {
  const [title, setTitle] = useState<string>(editingLink?.title ?? "");
  const [url, setUrl] = useState<string>(editingLink?.url ?? "");
  const [selectedIconId, setSelectedIconId] = useState<string | null>(
    editingLink?.iconId ?? null
  );
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [iconError, setIconError] = useState("");
  const [_validatingUrl, setValidatingUrl] = useState(false);

  const selectedIcon =
    presetIcons.find((icon) => icon.id === selectedIconId) ?? null;

  const handleSaveLink = async () => {
    let hasError = false;

    if (!title.trim()) {
      setTitleError("Title is required.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!url.trim()) {
      setUrlError("URL is required.");
      hasError = true;
    } else {
      setUrlError("");
    }

    if (!selectedIconId) {
      setIconError("An icon is required.");
      hasError = true;
    } else {
      setIconError("");
    }

    if (hasError) return;

    const trimmedUrl = url.trim();

    try {
      setValidatingUrl(true);
      if (!isValidUrl(trimmedUrl, selectedIconId)) {
        setUrlError("Please enter a valid link for the selected icon.");
        return;
      }

      onSaveLink(
        {
          title: title.trim(),
          url: trimmedUrl,
          iconId: selectedIcon?.id ?? null,
          iconLabel: selectedIcon?.label ?? null,
          iconSrc: selectedIcon?.icon ?? null,
          imageSrc: null,
        },
        editingLink?.id ?? null
      );

      setTitleError("");
      setUrl("");
      setUrlError("");
      setSelectedIconId(null);
      setIsIconMenuOpen(false);
      setIconError("");
      returnTab();
    } catch {
      setUrlError("Please enter a valid link for the selected icon.");
    } finally {
      setValidatingUrl(false);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSaveLink();
        }}
      >
        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value.trim()) setTitleError("");
            }}
            placeholder="Add title"
            className={`w-full rounded-[10px] border px-4 py-3 text-sm font-semibold text-[#050505] transition-colors outline-none ${
              titleError
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-brand-b"
            }`}
          />
          {titleError && <p className="text-xs text-red-500">{titleError}</p>}
        </span>

        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="icon">
            Icon
          </label>
          <div className="relative">
            <div
              className={`border-tertiary-b bg-background flex overflow-hidden rounded-md border ${
                iconError && !selectedIconId ? "border-red-500" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setIsIconMenuOpen((current) => !current)}
                className="hover:bg-secondary-bg flex min-w-0 flex-1 items-center gap-3 p-3 text-left transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isIconMenuOpen}
              >
                {selectedIcon ? (
                  <Image
                    src={selectedIcon.icon}
                    alt={selectedIcon.label}
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                ) : (
                  <Image
                    src="/profilebuilder_home/icons/placeholder.svg"
                    alt="placeholder"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                )}
                <span className="truncate text-sm font-medium text-gray-900">
                  {!selectedIcon && "Select an icon"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (selectedIcon) {
                    setSelectedIconId(null);
                    setIsIconMenuOpen(true);
                    return;
                  }

                  setIsIconMenuOpen((current) => !current);
                }}
                className="text-muted-foreground border-tertiary-b hover:bg-secondary-bg flex w-14 shrink-0 items-center justify-center border-l transition-colors"
                aria-label={
                  selectedIcon ? "Remove selected icon" : "Open icon list"
                }
                title={selectedIcon ? "Remove icon" : "Open icon list"}
              >
                {selectedIcon ? (
                  <Trash2 size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>

            {isIconMenuOpen && (
              <div className="border-tertiary-b bg-background absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border p-2 shadow-lg">
                <div className="text-secondary-text mb-2 px-2 text-xs font-semibold tracking-wide uppercase">
                  Preset icons
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {presetIcons.map((icon) => {
                    const isActive = icon.id === selectedIconId;

                    return (
                      <button
                        key={icon.id}
                        type="button"
                        onClick={() => {
                          setSelectedIconId(icon.id);
                          setIsIconMenuOpen(false);
                        }}
                        className={`flex flex-col items-center gap-2 rounded-md border p-2 transition-all ${isActive ? "border-brand-b bg-brand-light-subtle-bg" : "hover:border-tertiary-b hover:bg-secondary-bg border-transparent"}`}
                        aria-label={icon.label}
                      >
                        <Image
                          src={icon.icon}
                          alt={icon.label}
                          width={24}
                          height={24}
                          className="shrink-0"
                        />
                      </button>
                    );
                  })}
                </div>
                {selectedIcon && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIconId(null);
                      setIsIconMenuOpen(false);
                    }}
                    className="text-negative-text mt-3 inline-flex items-center gap-2 px-2 text-sm font-medium"
                  >
                    <Trash2 size={14} />
                    Remove icon
                  </button>
                )}
              </div>
            )}
          </div>
          {iconError && (
            <p className="mt-1 text-xs text-red-500">{iconError}</p>
          )}
        </span>

        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="url">
            URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(event) => {
              const val = event.target.value;
              setUrl(val);
              if (urlError) {
                if (!val.trim() || isValidUrl(val.trim(), selectedIconId)) {
                  setUrlError("");
                }
              }
            }}
            onBlur={(event) => {
              const val = event.target.value;
              if (val.trim() && !isValidUrl(val.trim(), selectedIconId)) {
                setUrlError("Please enter a valid link (e.g. yoursite.com)");
              } else {
                setUrlError("");
              }
            }}
            placeholder="Paste link (e.g. yoursite.com)..."
            className={`w-full rounded-[10px] border px-4 py-3 text-sm font-semibold text-[#050505] transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
              urlError
                ? "border-red-500 focus:border-red-500"
                : "border-border focus:border-brand-b"
            }`}
          />
          {urlError && <p className="text-xs text-red-500">{urlError}</p>}
        </span>

        <p className="text-muted-foreground text-xs font-medium">
          {linkCount}/20 links used
        </p>

        {!editingLink && !canAddMoreLinks && (
          <p className="text-negative-text text-sm font-medium">
            You can only add up to 20 links.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={!editingLink?.title && !canAddMoreLinks}
        >
          {editingLink ? "Update Link" : "Save Link"}
        </Button>
      </form>
    </div>
  );
}
