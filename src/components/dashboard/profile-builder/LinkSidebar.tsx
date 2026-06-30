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
    const nextLinks = updateFn(links);
    setLinks(nextLinks);
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
    <aside className="border-tertiary-b animate-in fade-in bg-background flex h-full w-72.5 shrink-0 flex-col border-r p-6 duration-200 select-none">
      {/* Back Button */}
      <div className="border-tertiary-b border-b pb-4">
        {selectedTab === "content" ? (
          <button
            onClick={returnTab}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>Links</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setEditingLink(null);
              setSelectedTab("content");
            }}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>Back to Links</span>
          </button>
        )}
      </div>

      <div className="profile-builder-scrollbar flex-1 overflow-y-auto py-6 pr-1">
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
