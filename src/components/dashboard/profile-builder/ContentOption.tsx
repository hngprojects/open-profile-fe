import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import type { SavedLink } from "./LinkSidebar";

export default function ContentOption({
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
  links,
  onDeleteLink,
  onEditLink,
  switchTab,
  canAddLink,
}: {
  title: string;
  subtitle: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  links: SavedLink[];
  onDeleteLink: (id: string) => void;
  onEditLink: (link: SavedLink) => void;
  switchTab: () => void;
  canAddLink: boolean;
}) {
  return (
    <div className="p-3">
      <div className="flex flex-col gap-4">
        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Add title"
            className="border-accent-foreground/30 focus:ring-accent rounded-md border p-2 focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </span>
        <span className="flex w-full flex-col gap-2">
          <label className="text-sm font-semibold" htmlFor="subtitle">
            Subtitle
          </label>
          <textarea
            id="subtitle"
            name="subtitle"
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            placeholder="Add subtitle"
            className="border-accent-foreground/30 focus:ring-accent rounded-md border p-2 focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </span>
        <span className="flex w-full flex-col gap-2">
          <span className="flex items-center justify-between">
            <span className="text-sm font-semibold">Links</span>
            <span className="text-muted-foreground text-xs">
              Tap a link to edit
            </span>
          </span>
          <div className="flex flex-col gap-3">
            {links.length === 0 ? (
              <div className="border-tertiary-b bg-primary-bg rounded-xl border p-4 text-sm text-gray-500">
                No links saved yet. Create one in the Section tab.
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Edit link ${link.title}`}
                  onClick={() => onEditLink(link)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onEditLink(link);
                    }
                  }}
                  className="group border-tertiary-b relative flex cursor-pointer items-center justify-between overflow-hidden rounded-md border p-3 transition-all duration-200 focus:ring-2 focus:outline-none"
                >
                  <div className="flex flex-1 items-center justify-between gap-3 px-4">
                    <p className="truncate text-sm text-black">{link.title}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLink(link.id);
                      }}
                      className="hover:text-negative-text mr-10 flex shrink-0 justify-end p-1.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100"
                      title="Delete link"
                      aria-label={`Delete link ${link.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="border-tertiary-b bg-active-bg text-tertiary-text hover:bg-hover-bg absolute top-0 right-0 flex h-13 cursor-grab items-center justify-center self-stretch border-l px-3.5 transition-colors active:cursor-grabbing">
                    <GripVertical size={16} />
                  </div>
                </div>
              ))
            )}
          </div>
        </span>

        <Button
          type="button"
          size="lg"
          variant="waitlist"
          onClick={switchTab}
          disabled={!canAddLink}
        >
          {canAddLink ? "Add New Link" : "Max 20 Links Reached"}
        </Button>
      </div>
    </div>
  );
}
