import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { SavedLink } from "./LinkSidebar";

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    editingLink?.imageSrc ?? null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedIcon =
    presetIcons.find((icon) => icon.id === selectedIconId) ?? null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setUploadedImage(result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleSaveLink = () => {
    if (!title.trim() || !url.trim()) return;

    onSaveLink(
      {
        title: title.trim(),
        url: url.trim(),
        iconId: selectedIcon?.id ?? null,
        iconLabel: selectedIcon?.label ?? null,
        iconSrc: selectedIcon?.icon ?? null,
        imageSrc: uploadedImage,
      },
      editingLink?.id ?? null
    );

    setTitle("");
    setUrl("");
    setSelectedIconId(null);
    setIsIconMenuOpen(false);
    setUploadedImage(null);
    returnTab();
  };

  return (
    <div className="p-3">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSaveLink();
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
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add title"
            className="border-accent-foreground/30 focus:ring-accent rounded-md border p-2 focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </span>

        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="icon">
            Icon
          </label>
          <div className="relative">
            <div className="border-tertiary-b flex overflow-hidden rounded-md border bg-white">
              <button
                type="button"
                onClick={() => setIsIconMenuOpen((current) => !current)}
                className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left transition-colors hover:bg-[#F8FAFC]"
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
                className="text-muted-foreground border-tertiary-b flex w-14 shrink-0 items-center justify-center border-l transition-colors hover:bg-[#F8FAFC]"
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
              <div className="border-tertiary-b absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border bg-white p-2 shadow-lg">
                <div className="mb-2 px-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
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
                        className={`flex flex-col items-center gap-2 rounded-md border p-2 transition-all ${isActive ? "border-brand-b bg-brand-light-subtle-bg" : "hover:border-tertiary-b border-transparent hover:bg-[#F8FAFC]"}`}
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
        </span>

        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold">Image</label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-hidden
            />

            <div className="border-tertiary-b flex overflow-hidden rounded-md border bg-white">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left transition-colors hover:bg-[#F8FAFC]"
              >
                {uploadedImage ? (
                  <Image
                    src={uploadedImage}
                    alt="Uploaded"
                    width={40}
                    height={40}
                    unoptimized
                    className="h-10 w-10 shrink-0 rounded-md object-cover"
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
              </button>

              <button
                type="button"
                onClick={() => {
                  if (uploadedImage) {
                    setUploadedImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                    return;
                  }

                  fileInputRef.current?.click();
                }}
                className="text-muted-foreground border-tertiary-b flex w-14 shrink-0 items-center justify-center border-l transition-colors hover:bg-[#F8FAFC]"
                aria-label={
                  uploadedImage ? "Remove uploaded image" : "Upload image"
                }
                title={uploadedImage ? "Remove image" : "Upload image"}
              >
                {uploadedImage ? <Trash2 size={16} /> : <Upload size={16} />}
              </button>
            </div>
          </div>
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
            onChange={(event) => setUrl(event.target.value)}
            placeholder="Search site or paste link ...."
            className="border-accent-foreground/30 focus:ring-accent rounded-md border p-2 focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
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
