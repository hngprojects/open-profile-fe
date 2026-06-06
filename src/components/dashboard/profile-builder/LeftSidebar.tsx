"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reorder, useDragControls } from "motion/react";
import {
  ChevronLeft,
  Search,
  Plus,
  GripVertical,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LinkSidebar from "./LinkSidebar";
import BioSidebar from "./BioSidebar";
import ProjectsSidebar from "./ProjectsSidebar";
import CtaSidebar from "./CtaSidebar";
import type { Section, ProfilePreview } from "./types";

interface LeftSidebarProps {
  sections: Section[];
  selectedSectionId: string | null;
  selectedSection: Section | null;
  initialEditingSectionId?: string | null;
  onSelectSection: (id: string) => void;
  onDeselectSection: () => void;
  onAddSection: (title: string, type: string) => void;
  onRemoveSection: (id: string) => void;
  onToggleSectionVisibility: (id: string) => void;
  onReorderSections: (sections: Section[]) => void;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  profile?: {
    fullName?: string;
  } | null;
}

function getDisplayTitle(
  section: Section,
  profile: ProfilePreview | null | undefined
) {
  const isBioTitle =
    section.title === "Bio - John Smith" || section.title === "Bio";
  return section.type === "bio" && isBioTitle && profile?.fullName
    ? `Bio - ${profile.fullName}`
    : section.title;
}

export default function LeftSidebar({
  sections,
  selectedSectionId,
  selectedSection: _selectedSection,
  initialEditingSectionId,
  onSelectSection,
  onDeselectSection,
  onAddSection,
  onRemoveSection,
  onToggleSectionVisibility,
  onReorderSections,
  onUpdateSection,
  profile,
}: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(
    initialEditingSectionId ?? null
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditingSectionId(initialEditingSectionId ?? null);
  }, [initialEditingSectionId]);

  const [newExpRole, setNewExpRole] = useState("");
  const [newExpCompany, setNewExpCompany] = useState("");
  const [newExpDuration, setNewExpDuration] = useState("");

  const editingSection =
    sections.find((section) => section.id === editingSectionId) ?? null;

  function getSectionDescriptor(section: Section) {
    if (section.type === "bio") return "Add name";
    if (section.type === "links") return "Add links";
    if (section.type === "projects") return "Add projects";
    if (section.type === "experience") return "Add CTA";
    if (section.type === "cta") return "Add CTA";

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
  const [linkSidebarOpen, setLinkSidebarOpen] = useState(false);

  const filteredSections = sections.filter((section) => {
    const displayTitle = getDisplayTitle(section, profile);
    return displayTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelectCard = (title: string, type: string) => {
    onAddSection(title, type);
    setIsAddingSection(false);
  };

  const isLinksDisabled = sections.some((s) => s.type === "links");
  const isBioDisabled = sections.some((s) => s.type === "bio");
  const isProjectsDisabled = sections.some((s) => s.type === "projects");
  const isCtaDisabled = sections.some((s) => s.type === "experience");
  const isDisabled = isLinksDisabled;

  const handleSwitchToAddLinkSection = () => {
    handleSelectCard("Links", "links");
    setIsAddingSection(false);
    setLinkSidebarOpen(true);
  };

  if (isAddingSection) {
    return (
      <aside className="border-tertiary-b animate-in fade-in bg-background hidden h-full w-[260px] shrink-0 flex-col rounded-2xl border p-6 shadow-sm duration-200 select-none lg:flex xl:w-[290px]">
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
        <div className="grid auto-rows-max grid-cols-2 gap-4 overflow-y-auto pr-1">
          {/* Card 1: Bio */}
          <button
            type="button"
            onClick={() => handleSelectCard("Bio", "bio")}
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
            onClick={() => handleSelectCard("Portfolio", "projects")}
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
            onClick={() => handleSelectCard("CTA", "experience")}
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
    if (editingSection.type === "bio") {
      return (
        <BioSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
          profile={profile}
        />
      );
    }

    if (editingSection.type === "links") {
      return (
        <LinkSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    if (editingSection.type === "projects") {
      return (
        <ProjectsSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    if (editingSection.type === "experience" || editingSection.type === "cta") {
      return (
        <CtaSidebar
          returnTab={handleReturnToList}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    return (
      <aside className="border-tertiary-b animate-in fade-in bg-background flex h-full w-[260px] shrink-0 flex-col rounded-2xl border p-6 shadow-sm duration-200 select-none xl:w-[290px]">
        <div className="mb-6">
          <button
            type="button"
            onClick={handleReturnToList}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>
              {editingSection.type === "bio" ? "Bio" : editingSection.title}
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
              <option value="bio">Bio / Header</option>
              <option value="links">Links</option>
              <option value="projects">Projects / Portfolio</option>
              <option value="experience">CTA / Experience</option>
            </select>
          </div>

          {editingSection.type === "bio" && (
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

          {editingSection.type === "experience" && (
            <div className="border-secondary-b flex flex-col gap-4 rounded-[12px] border border-dashed p-4">
              <h4 className="text-primary-text text-sm font-bold">
                Experience / CTA List
              </h4>

              {/* Existing Experience Items */}
              <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
                {editingSection.experience &&
                editingSection.experience.length > 0 ? (
                  editingSection.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-secondary-bg flex items-center justify-between rounded-lg border p-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold">
                          {exp.role} at {exp.company}
                        </p>
                        <p className="text-secondary-text truncate text-[10px]">
                          {exp.duration}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (
                            editingSection.experience || []
                          ).filter((e) => e.id !== exp.id);
                          onUpdateSection(editingSection.id, {
                            experience: updated,
                          });
                        }}
                        className="shrink-0 p-1 text-red-500 hover:text-red-700"
                        title="Delete experience"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary-text py-2 text-center text-xs italic">
                    No items added yet.
                  </p>
                )}
              </div>

              {/* Add New Experience Form */}
              <div className="flex flex-col gap-2 border-t pt-3">
                <h5 className="text-secondary-text text-xs font-bold">
                  Add New Experience
                </h5>
                <input
                  type="text"
                  placeholder="Role/Title * (e.g. Lead Designer)"
                  value={newExpRole}
                  onChange={(e) => setNewExpRole(e.target.value)}
                  className="border-border focus:border-brand-hover-bg w-full rounded-[8px] border px-3 py-2 text-xs outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name * (e.g. Acme Corp)"
                  value={newExpCompany}
                  onChange={(e) => setNewExpCompany(e.target.value)}
                  className="border-border focus:border-brand-hover-bg w-full rounded-[8px] border px-3 py-2 text-xs outline-none"
                />
                <input
                  type="text"
                  placeholder="Duration * (e.g. 2024 - Present)"
                  value={newExpDuration}
                  onChange={(e) => setNewExpDuration(e.target.value)}
                  className="border-border focus:border-brand-hover-bg w-full rounded-[8px] border px-3 py-2 text-xs outline-none"
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (!newExpRole || !newExpCompany || !newExpDuration)
                      return;
                    const newItem = {
                      id: Math.random().toString(36).substr(2, 9),
                      role: newExpRole,
                      company: newExpCompany,
                      duration: newExpDuration,
                    };
                    const updated = [
                      ...(editingSection.experience || []),
                      newItem,
                    ];
                    onUpdateSection(editingSection.id, { experience: updated });
                    setNewExpRole("");
                    setNewExpCompany("");
                    setNewExpDuration("");
                  }}
                  disabled={!newExpRole || !newExpCompany || !newExpDuration}
                  className="bg-brand-hover-bg hover:bg-button-brand-bg h-8 w-full rounded-[6px] text-xs text-white"
                >
                  Add Experience
                </Button>
              </div>
            </div>
          )}

          {editingSection.type !== "bio" &&
            editingSection.type !== "links" &&
            editingSection.type !== "projects" &&
            editingSection.type !== "experience" && (
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
    const linksSection = sections.find((s) => s.type === "links") ?? null;
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
    <aside className="border-tertiary-b animate-in fade-in bg-background hidden h-full w-[260px] shrink-0 flex-col rounded-2xl border p-6 shadow-sm duration-200 select-none lg:flex xl:w-[290px]">
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
      <div className="flex-1 overflow-y-auto pr-1">
        <Reorder.Group
          axis="y"
          values={searchQuery ? filteredSections : sections}
          onReorder={(newOrder) => {
            if (!searchQuery) {
              onReorderSections(newOrder);
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
                onToggleSectionVisibility={onToggleSectionVisibility}
                onRemoveSection={onRemoveSection}
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
  onToggleSectionVisibility,
  onRemoveSection,
  handleOpenSectionForm,
  searchQuery,
  profile,
  getSectionDescriptor,
}: {
  section: Section;
  isSelected: boolean;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
  handleOpenSectionForm: (id: string) => void;
  searchQuery: string;
  profile?: { fullName?: string } | null;
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
      className={`group flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border transition-colors duration-200 focus:outline-none ${
        isSelected
          ? "border-brand-b bg-brand-light-subtle-bg shadow-sm"
          : "border-tertiary-b hover:border-brand-b hover:bg-primary-bg bg-background"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center justify-between px-4 py-3">
        <div className="w-20">
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
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSectionVisibility(section.id);
            }}
            className="hover:bg-hover-bg text-secondary-text shrink-0 rounded-lg p-1.5 opacity-40 transition-all group-hover:opacity-100 hover:opacity-100"
            title={section.visible ? "Hide section" : "Show section"}
            aria-label={`${section.visible ? "Hide" : "Show"} section ${section.title}`}
          >
            {section.visible ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveSection(section.id);
            }}
            className="hover:bg-hover-bg hover:text-negative-text text-secondary-text shrink-0 rounded-lg p-1.5 opacity-40 transition-all group-hover:opacity-100 hover:opacity-100"
            title="Delete Section"
            aria-label={`Delete section ${section.title}`}
          >
            <Trash2 size={15} />
          </button>
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
