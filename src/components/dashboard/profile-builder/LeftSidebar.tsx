"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reorder, useDragControls } from "motion/react";
import { ChevronLeft, Search, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import LinkSidebar from "./LinkSidebar";
import BioSidebar from "./BioSidebar";
import ProjectsSidebar from "./ProjectsSidebar";
import CtaSidebar from "./CtaSidebar";
import {
  SECTION_TYPE,
  type Section,
  type ProfilePreview,
  type SectionType,
} from "./types";

interface LeftSidebarProps {
  sections: Section[];
  selectedSectionId: string | null;
  selectedSection: Section | null;
  initialEditingSectionId?: string | null;
  onSelectSection: (id: string) => void;
  onDeselectSection: () => void;
  onAddSection: (title: string, type: SectionType) => void;
  onRemoveSection: (id: string) => void;
  onToggleSectionVisibility: (id: string) => void;
  onReorderSections: (sections: Section[]) => void;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  onSaveProfilePhoto?: (photoUrl: string | null) => Promise<void>;
  profile?: ProfilePreview | null;
}

const SECTION_STATIC_LABELS: Record<string, string> = {
  [SECTION_TYPE.BIO]: "Bio",
  [SECTION_TYPE.LINKS]: "Links",
  [SECTION_TYPE.PROJECTS]: "Projects",
  [SECTION_TYPE.CTA]: "CTA",
};

function getDisplayTitle(
  section: Section,
  _profile: ProfilePreview | null | undefined
) {
  return SECTION_STATIC_LABELS[section.type] ?? section.title;
}

export default function LeftSidebar({
  sections,
  selectedSectionId,
  selectedSection: _selectedSection,
  initialEditingSectionId,
  onSelectSection,
  onDeselectSection,
  onAddSection,
  onReorderSections,
  onUpdateSection,
  onSaveProfilePhoto,
  profile,
}: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(
    initialEditingSectionId ?? null
  );

  useEffect(() => {
    const sectionToEdit = selectedSectionId ?? initialEditingSectionId ?? null;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditingSectionId(sectionToEdit);
  }, [initialEditingSectionId, selectedSectionId]);

  const [linkSidebarOpen, setLinkSidebarOpen] = useState(false);

  const editingSection =
    sections.find((section) => section.id === editingSectionId) ?? null;

  function getSectionDescriptor(section: Section) {
    if (section.type === SECTION_TYPE.BIO) return "Add name";
    if (section.type === SECTION_TYPE.LINKS) return "Add links";
    if (section.type === SECTION_TYPE.PROJECTS) return "Add projects";
    if (section.type === SECTION_TYPE.CTA) return "Add CTA";

    return "Customize section";
  }

  function handleOpenSectionForm(sectionId: string) {
    setEditingSectionId(sectionId);
    onSelectSection(sectionId);
  }

  function handleReturnToList() {
    setEditingSectionId(null);
    onDeselectSection();
  }

  const orderedSections = [
    ...sections.filter((section) => section.type === SECTION_TYPE.BIO),
    ...sections.filter((section) => section.type !== SECTION_TYPE.BIO),
  ];

  const filteredSections = orderedSections.filter((section) => {
    const displayTitle = getDisplayTitle(section, profile);
    return displayTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelectCard = (title: string, type: SectionType) => {
    onAddSection(title, type);
    setIsAddingSection(false);
  };

  const isLinksDisabled = sections.some(
    (section) => section.type === SECTION_TYPE.LINKS
  );
  const isBioDisabled = sections.some(
    (section) => section.type === SECTION_TYPE.BIO
  );
  const isProjectsDisabled = sections.some(
    (section) => section.type === SECTION_TYPE.PROJECTS
  );
  const isCtaDisabled = sections.some(
    (section) => section.type === SECTION_TYPE.CTA
  );
  const isDisabled = isLinksDisabled;

  const handleSwitchToAddLinkSection = () => {
    handleSelectCard("Links", SECTION_TYPE.LINKS);
    setIsAddingSection(false);
    setLinkSidebarOpen(true);
  };

  if (isAddingSection) {
    return (
      <aside className="border-tertiary-b animate-in fade-in bg-background hidden h-full w-[260px] shrink-0 flex-col border-r p-6 duration-200 select-none lg:flex xl:w-[290px]">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAddingSection(false)}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>Add Section</span>
          </button>
        </div>

        {/* Subheader */}
        <div className="border-tertiary-b mb-6 flex items-center justify-between border-b pb-4">
          <span className="text-primary-text text-sm font-bold">Sections</span>
          <span className="bg-hover-bg text-primary-text flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
            4
          </span>
        </div>

        {/* Grid outline of Cards */}
        <div className="profile-builder-scrollbar grid auto-rows-max grid-cols-2 gap-4 overflow-y-auto pr-1">
          {/* Card 1: Bio */}
          <button
            type="button"
            onClick={() => handleSelectCard("Bio", SECTION_TYPE.BIO)}
            disabled={isBioDisabled}
            className={`group border-tertiary-b bg-background flex h-35 w-full flex-col overflow-hidden rounded-[16px] border text-left transition-all duration-200 ${isBioDisabled ? "bg-secondary-bg cursor-not-allowed opacity-70" : "hover:border-brand-b cursor-pointer hover:shadow-sm"}`}
          >
            <div className="bg-background flex flex-1 items-center p-2">
              <Image
                src="/profilebuilder_home/bio.png"
                alt="Bio"
                width={107}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="text-primary-text bg-secondary-bg group-hover:bg-hover-bg flex h-9 items-center px-4 text-[13px] font-medium transition-colors">
              Bio
            </div>
          </button>

          {/* Card 2: Links */}
          <button
            type="button"
            onClick={handleSwitchToAddLinkSection}
            disabled={isDisabled}
            className={`group border-tertiary-b hover:border-brand-b disabled:border-tertiary-b bg-background disabled:bg-secondary-bg flex h-35 w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border text-left transition-all duration-200 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-70 ${isDisabled ? "cursor-not-allowed opacity-70" : "hover:shadow-sm"}`}
          >
            <div className="bg-background -mx-1 flex flex-1 items-center p-2">
              {isDisabled ? (
                <Image
                  src="/profilebuilder_home/link_disabled.svg"
                  alt="Links"
                  width={84}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/profilebuilder_home/links.png"
                  alt="Links"
                  width={84}
                  height={48}
                  className="object-contain"
                />
              )}
            </div>
            <div className="text-primary-text bg-secondary-bg group-hover:bg-hover-bg flex h-9 items-center px-4 text-[13px] font-medium transition-colors">
              Links
            </div>
          </button>

          {/* Card 3: Portfolio */}
          <button
            type="button"
            onClick={() => handleSelectCard("Portfolio", SECTION_TYPE.PROJECTS)}
            disabled={isProjectsDisabled}
            className={`group border-tertiary-b bg-background flex h-35 w-full flex-col overflow-hidden rounded-[16px] border text-left transition-all duration-200 ${isProjectsDisabled ? "bg-secondary-bg cursor-not-allowed opacity-70" : "hover:border-brand-b cursor-pointer hover:shadow-sm"}`}
          >
            <div className="bg-background flex flex-1 items-center p-2">
              <Image
                src="/profilebuilder_home/portfolio.png"
                alt="Portfolio"
                width={46}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="text-primary-text bg-secondary-bg group-hover:bg-hover-bg flex h-9 items-center px-4 text-[13px] font-medium transition-colors">
              Portfolio
            </div>
          </button>

          {/* Card 4: CTA */}
          <button
            type="button"
            onClick={() => handleSelectCard("CTA", SECTION_TYPE.CTA)}
            disabled={isCtaDisabled}
            className={`group border-tertiary-b bg-background flex h-35 w-full flex-col overflow-hidden rounded-[16px] border text-left transition-all duration-200 ${isCtaDisabled ? "bg-secondary-bg cursor-not-allowed opacity-70" : "hover:border-brand-b cursor-pointer hover:shadow-sm"}`}
          >
            <div className="bg-background flex flex-1 items-center p-2">
              <Image
                src="/profilebuilder_home/cta.png"
                alt="CTA"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="text-primary-text bg-secondary-bg group-hover:bg-hover-bg flex h-9 items-center px-4 text-[13px] font-medium transition-colors">
              CTA
            </div>
          </button>
        </div>
      </aside>
    );
  }

  if (editingSection) {
    if (editingSection.type === SECTION_TYPE.BIO) {
      return (
        <BioSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
          onSaveProfilePhoto={onSaveProfilePhoto}
          profile={profile}
        />
      );
    }

    if (editingSection.type === SECTION_TYPE.LINKS) {
      return (
        <LinkSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    if (editingSection.type === SECTION_TYPE.PROJECTS) {
      return (
        <ProjectsSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    if (editingSection.type === SECTION_TYPE.CTA) {
      return (
        <CtaSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    return (
      <aside className="border-tertiary-b animate-in fade-in bg-background flex h-full w-[260px] shrink-0 flex-col border-r p-6 duration-200 select-none xl:w-[290px]">
        <div className="mb-6">
          <button
            type="button"
            onClick={handleReturnToList}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>
              {editingSection.type === SECTION_TYPE.BIO
                ? "Bio"
                : editingSection.title}
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-secondary-text mb-2 block text-xs font-bold tracking-wider uppercase">
              Section title
            </label>
            <input
              type="text"
              value={editingSection.title}
              onChange={(e) =>
                onUpdateSection(editingSection.id, { title: e.target.value })
              }
              className="border-border bg-background text-primary-text focus:border-brand-hover-bg w-full rounded-[10px] border px-4 py-3 text-sm font-semibold outline-none"
            />
          </div>

          <div>
            <label className="text-secondary-text mb-2 block text-xs font-bold tracking-wider uppercase">
              Component type
            </label>
            <select
              value={editingSection.type}
              onChange={(e) =>
                onUpdateSection(editingSection.id, { type: e.target.value })
              }
              className="border-border bg-background text-primary-text focus:border-brand-hover-bg w-full rounded-[10px] border px-4 py-3 text-sm font-semibold outline-none"
            >
              <option value={SECTION_TYPE.BIO}>Bio / Header</option>
              <option value={SECTION_TYPE.LINKS}>Links</option>
              <option value={SECTION_TYPE.PROJECTS}>
                Projects / Portfolio
              </option>
              <option value={SECTION_TYPE.CTA}>CTA</option>
            </select>
          </div>

          {editingSection.type === SECTION_TYPE.BIO && (
            <div className="border-secondary-b rounded-[12px] border border-dashed p-4">
              <label className="text-primary-text mb-2 block text-sm font-bold">
                Full name
              </label>
              <input
                type="text"
                value={editingSection.fullName ?? profile?.fullName ?? ""}
                onChange={(e) =>
                  onUpdateSection(editingSection.id, {
                    fullName: e.target.value,
                  })
                }
                placeholder="Enter full name"
                className="border-border bg-background text-primary-text focus:border-brand-hover-bg w-full rounded-[10px] border px-4 py-3 text-sm outline-none"
              />

              <label className="text-primary-text mt-4 mb-2 block text-sm font-bold">
                Bio
              </label>
              <textarea
                value={editingSection.bio ?? ""}
                onChange={(e) =>
                  onUpdateSection(editingSection.id, {
                    bio: e.target.value,
                  })
                }
                rows={5}
                maxLength={200}
                placeholder="Placeholder text..."
                className="border-border bg-background text-primary-text focus:border-brand-hover-bg w-full resize-none rounded-[10px] border px-4 py-3 text-sm outline-none"
              />

              <p className="text-tertiary-text mt-1 text-right text-xs">
                {(editingSection.bio ?? "").length}/200
              </p>
            </div>
          )}

          {editingSection.type !== SECTION_TYPE.BIO &&
            editingSection.type !== SECTION_TYPE.LINKS &&
            editingSection.type !== SECTION_TYPE.PROJECTS &&
            editingSection.type !== SECTION_TYPE.CTA && (
              <div className="border-secondary-b rounded-[12px] border border-dashed p-6 text-center">
                <p className="text-secondary-text text-xs font-semibold">
                  Additional dynamic items editor will display here based on
                  chosen component.
                </p>
              </div>
            )}
        </div>
      </aside>
    );
  }

  if (linkSidebarOpen) {
    const linksSection =
      sections.find((s) => s.type === SECTION_TYPE.LINKS) ?? null;
    return (
      <LinkSidebar
        returnTab={() => {
          setLinkSidebarOpen(false);
          onDeselectSection();
        }}
        section={linksSection}
        onUpdateSection={onUpdateSection}
      />
    );
  }

  return (
    <aside className="border-tertiary-b animate-in fade-in bg-background hidden h-full w-[260px] shrink-0 flex-col border-r p-6 duration-200 select-none lg:flex xl:w-[290px]">
      {/* Search Input */}
      <div className="relative mb-6">
        <span className="text-tertiary-text absolute inset-y-0 left-3 flex items-center">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-tertiary-b text-primary-text placeholder-tertiary-text focus:border-brand-b bg-background w-full rounded-[10px] border py-3 pr-4 pl-10 text-sm font-medium transition-colors outline-none"
        />
      </div>

      {/* Add Section Button */}
      <div className="mb-6">
        <Button
          onClick={() => setIsAddingSection(true)}
          className="bg-brand-hover-bg hover:bg-brand flex h-12 w-full items-center justify-start gap-3 rounded-[10px] px-5 text-sm font-semibold text-white transition-all active:scale-95"
        >
          <Plus size={18} />
          Add Section
        </Button>
      </div>

      {/* Sections List */}
      <div className="profile-builder-scrollbar flex-1 overflow-y-auto pr-1">
        <Reorder.Group
          axis="y"
          values={searchQuery ? filteredSections : orderedSections}
          onReorder={(newOrder) => {
            if (!searchQuery) {
              const bioSection = sections.find(
                (section) => section.type === SECTION_TYPE.BIO
              );
              const reorderedNonBioSections = newOrder.filter(
                (section) => section.type !== SECTION_TYPE.BIO
              );

              onReorderSections([
                ...(bioSection ? [bioSection] : []),
                ...reorderedNonBioSections,
              ]);
            }
          }}
          className="flex flex-col gap-3"
        >
          {filteredSections.map((section) => {
            const isSelected = selectedSectionId === section.id;
            return (
              <SortableSectionItem
                key={section.id}
                section={section}
                isSelected={isSelected}
                handleOpenSectionForm={handleOpenSectionForm}
                searchQuery={searchQuery}
                profile={profile}
                getSectionDescriptor={getSectionDescriptor}
              />
            );
          })}

          {filteredSections.length === 0 && (
            <p className="text-tertiary-text py-8 text-center text-xs font-medium">
              No sections found
            </p>
          )}
        </Reorder.Group>
      </div>
    </aside>
  );
}

function SortableSectionItem({
  section,
  isSelected,
  handleOpenSectionForm,
  searchQuery,
  profile,
  getSectionDescriptor,
}: {
  section: Section;
  isSelected: boolean;
  handleOpenSectionForm: (id: string) => void;
  searchQuery: string;
  profile?: ProfilePreview | null;
  getSectionDescriptor: (section: Section) => string;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={dragControls}
      onClick={() => handleOpenSectionForm(section.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenSectionForm(section.id);
        }
      }}
      role="button"
      tabIndex={0}
      className={`group flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border transition-colors duration-200 focus:outline-none ${!section.visible ? "opacity-50 grayscale" : ""} ${
        isSelected
          ? "border-brand-b bg-brand-light-subtle-bg shadow-sm"
          : "border-tertiary-b hover:border-brand-b hover:bg-primary-bg bg-background"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center justify-between px-4 py-3">
        <div className="min-w-0 flex-1 pr-3">
          <p
            className={`truncate text-sm font-semibold transition-colors ${
              !section.visible
                ? "text-tertiary-text opacity-50"
                : isSelected
                  ? "text-link-hover-text"
                  : "text-primary-text"
            }`}
          >
            {getDisplayTitle(section, profile)}
          </p>

          <p className="text-secondary-text mt-0.5 truncate text-xs">
            {getSectionDescriptor(section)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => {
          if (searchQuery) {
            e.stopPropagation();
            e.preventDefault();
          } else {
            e.stopPropagation();
            dragControls.start(e);
          }
        }}
        className={`border-tertiary-b bg-active-bg text-tertiary-text flex items-center justify-center self-stretch border-l px-3.5 transition-colors ${
          searchQuery
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-hover-bg cursor-grab active:cursor-grabbing"
        }`}
        title={
          searchQuery ? "Clear search to reorder sections" : "Drag to reorder"
        }
      >
        <GripVertical size={16} />
      </button>
    </Reorder.Item>
  );
}
