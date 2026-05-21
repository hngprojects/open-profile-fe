import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
import ContentOption from "./ContentOption";
import SectionOption from "./SectionOption";

import type { SavedLink } from "./types";
export type { SavedLink } from "./types";

type LinkSection = {
  id: string;
  title: string;
  type: string;
  subtitle?: string;
  links?: SavedLink[];
};

const LinkSidebar = ({
  returnTab,
  section,
  onUpdateSection,
}: {
  returnTab: () => void;
  section: LinkSection | null;
  onUpdateSection: (id: string, updates: Partial<LinkSection>) => void;
}) => {
  const [selectedTab, setSelectedTab] = useState<"content" | "section">(
    "content"
  );
  const [links, setLinks] = useState<SavedLink[]>(section?.links ?? []);
  const [editingLink, setEditingLink] = useState<SavedLink | null>(null);
  const [sectionTitle, setSectionTitle] = useState(section?.title || "Links");
  const [sectionSubtitle, setSectionSubtitle] = useState(
    section?.subtitle || ""
  );

  const syncSection = (updates: Partial<LinkSection>) => {
    if (!section) return;

    onUpdateSection(section.id, updates);
  };

  const handleTitleChange = (value: string) => {
    setSectionTitle(value);
    syncSection({ title: value });
  };

  const handleSubtitleChange = (value: string) => {
    setSectionSubtitle(value);
    syncSection({ subtitle: value });
  };

  const handleLinksChange = (
    updateFn: (currentLinks: SavedLink[]) => SavedLink[]
  ) => {
    let nextLinks;
    setLinks((currentLinks) => {
      nextLinks = updateFn(currentLinks);
      return nextLinks;
    });
    syncSection({ links: nextLinks });
  };

  const canAddMoreLinks = useMemo(
    () => links.length < 20 || Boolean(editingLink),
    [editingLink, links.length]
  );

  const handleSaveLink = (
    link: Omit<SavedLink, "id">,
    editingId: string | null = null
  ) => {
    if (!editingId && links.length >= 20) {
      return;
    }

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${links.length + 1}`;

    handleLinksChange((currentLinks) => {
      if (editingId) {
        return currentLinks.map((currentLink) =>
          currentLink.id === editingId
            ? { ...currentLink, ...link, id: editingId }
            : currentLink
        );
      }

      return [...currentLinks, { ...link, id }];
    });

    setEditingLink(null);
    setSelectedTab("content");
  };

  const handleDeleteLink = (id: string) => {
    handleLinksChange((currentLinks) =>
      currentLinks.filter((link) => link.id !== id)
    );
  };

  const handleEditLink = (link: SavedLink) => {
    setEditingLink(link);
    setSelectedTab("section");
  };

  return (
    <aside className="border-tertiary-b animate-in fade-in flex h-full w-72.5 shrink-0 flex-col border bg-white shadow-sm duration-200 select-none">
      {/* Back Button */}
      <div className="p-6 pb-4">
        <button
          onClick={returnTab}
          className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
        >
          <ChevronLeft size={20} />
          <span>Links</span>
        </button>
      </div>
      {/* tabs */}

      <div className="border-tertiary-b flex border-b">
        <button
          onClick={() => setSelectedTab("content")}
          className={`relative flex-1 py-4 text-center text-sm font-bold transition-all ${
            selectedTab === "content"
              ? "text-primary-text"
              : "text-tertiary-text hover:text-primary-text"
          }`}
        >
          Content
          {selectedTab === "content" && (
            <span className="bg-primary-text absolute bottom-0 left-0 h-[2.5px] w-full transition-all" />
          )}
        </button>
        <button
          className={`relative flex-1 py-4 text-center text-sm font-bold transition-all ${
            selectedTab === "section"
              ? "text-primary-text"
              : "text-tertiary-text hover:text-primary-text"
          }`}
        >
          Section
          {selectedTab === "section" && (
            <span className="bg-primary-text absolute bottom-0 left-0 h-[2.5px] w-full transition-all" />
          )}
        </button>
      </div>

      <div>
        {selectedTab === "content" ? (
          <ContentOption
            title={sectionTitle}
            subtitle={sectionSubtitle}
            onTitleChange={handleTitleChange}
            onSubtitleChange={handleSubtitleChange}
            links={links}
            onDeleteLink={handleDeleteLink}
            onEditLink={handleEditLink}
            switchTab={() => {
              setEditingLink(null);
              setSelectedTab("section");
            }}
            canAddLink={canAddMoreLinks}
          />
        ) : (
          <SectionOption
            key={editingLink?.id ?? "new-link"}
            returnTab={() => setSelectedTab("content")}
            editingLink={editingLink}
            onSaveLink={handleSaveLink}
            linkCount={links.length}
            canAddMoreLinks={canAddMoreLinks}
          />
        )}
      </div>
    </aside>
  );
};

export default LinkSidebar;
