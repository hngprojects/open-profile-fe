"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reorder } from "motion/react";
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
import type { Section } from "./types";

interface LeftSidebarProps {
  sections: Section[];
  selectedSectionId: string | null;
  selectedSection: Section | null;
  onSelectSection: (id: string) => void;
  onAddSection: (title: string, type: string) => void;
  onRemoveSection: (id: string) => void;
  onToggleSectionVisibility: (id: string) => void;
  onReorderSections: (sections: Section[]) => void;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  profile?: {
    fullName?: string;
  } | null;
}

export default function LeftSidebar({
  sections,
  selectedSectionId,
  selectedSection,
  onSelectSection,
  onAddSection,
  onRemoveSection,
  onToggleSectionVisibility,
  onReorderSections,
  onUpdateSection,
  profile,
}: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

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
  const [linkSidebarOpen, setLinkSidebarOpen] = useState(false);

  const filteredSections = sections.filter((section) => {
    const displayTitle =
      section.type === "bio" &&
      section.title === "Bio - John Smith" &&
      profile?.fullName
        ? `Bio - ${profile.fullName}`
        : section.title;
    return displayTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelectCard = (title: string, type: string) => {
    onAddSection(title, type);
    setIsAddingSection(false);
  };

  const isDisabled = sections.some((s) => s.type === "links");

  const handleSwitchToAddLinkSection = () => {
    handleSelectCard("Links", "links");
    setIsAddingSection(false);
    setLinkSidebarOpen(true);
  };

  if (isAddingSection) {
    return (
      <aside className="border-tertiary-b animate-in fade-in hidden h-full w-72.5 shrink-0 flex-col border bg-white p-6 shadow-sm duration-200 select-none lg:flex">
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
            className="group border-tertiary-b hover:border-brand-b flex h-35 w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border bg-white text-left transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex flex-1 items-center bg-white p-2">
              <Image
                src="/profilebuilder_home/bio.png"
                alt="Bio"
                width={107}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="text-primary-text flex h-9 items-center bg-[#F4F4F5] px-4 text-[13px] font-medium transition-colors group-hover:bg-[#E5E7EB]">
              Bio
            </div>
          </button>

          {/* Card 2: Links */}
          <button
            type="button"
            onClick={handleSwitchToAddLinkSection}
            disabled={isDisabled}
            className={`group border-tertiary-b hover:border-brand-b disabled:border-tertiary-b flex h-35 w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border bg-white text-left transition-all duration-200 hover:shadow-sm disabled:cursor-not-allowed disabled:bg-[#F4F4F5] disabled:opacity-70 ${isDisabled ? "cursor-not-allowed opacity-70" : "hover:shadow-sm"}`}
          >
            <div className="-mx-1 flex flex-1 items-center bg-white p-2">
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
            <div className="text-primary-text flex h-9 items-center bg-[#F4F4F5] px-4 text-[13px] font-medium transition-colors group-hover:bg-[#E5E7EB]">
              Links
            </div>
          </button>

          {/* Card 3: Portfolio */}
          <button
            type="button"
            onClick={() => handleSelectCard("Portfolio", "projects")}
            className="group border-tertiary-b hover:border-brand-b flex h-35 w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border bg-white text-left transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex flex-1 items-center bg-white p-2">
              <Image
                src="/profilebuilder_home/portfolio.png"
                alt="Portfolio"
                width={46}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="text-primary-text flex h-9 items-center bg-[#F4F4F5] px-4 text-[13px] font-medium transition-colors group-hover:bg-[#E5E7EB]">
              Portfolio
            </div>
          </button>

          {/* Card 4: CTA */}
          <button
            type="button"
            onClick={() => handleSelectCard("CTA", "experience")}
            className="group border-tertiary-b hover:border-brand-b flex h-35 w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border bg-white text-left transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex flex-1 items-center bg-white p-2">
              <Image
                src="/profilebuilder_home/cta.png"
                alt="CTA"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="text-primary-text flex h-9 items-center bg-[#F4F4F5] px-4 text-[13px] font-medium transition-colors group-hover:bg-[#E5E7EB]">
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
          returnTab={() => setEditingSectionId(null)}
          section={editingSection}
          onUpdateSection={onUpdateSection}
          profile={profile}
        />
      );
    }

    if (editingSection.type === "links") {
      return (
        <LinkSidebar
          returnTab={() => setEditingSectionId(null)}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    if (editingSection.type === "projects") {
      return (
        <ProjectsSidebar
          returnTab={() => setEditingSectionId(null)}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    if (editingSection.type === "experience" || editingSection.type === "cta") {
      return (
        <CtaSidebar
          returnTab={() => setEditingSectionId(null)}
          section={editingSection}
          onUpdateSection={onUpdateSection}
        />
      );
    }

    return (
      <aside className="border-tertiary-b animate-in fade-in flex h-full w-[290px] shrink-0 flex-col border bg-white p-6 shadow-sm duration-200 select-none">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setEditingSectionId(null)}
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
            <label className="mb-2 block text-xs font-bold tracking-wider text-[#747474] uppercase">
              Section title
            </label>
            <input
              type="text"
              value={editingSection.title}
              onChange={(e) =>
                onUpdateSection(editingSection.id, { title: e.target.value })
              }
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:border-[#087583]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-[#747474] uppercase">
              Component type
            </label>
            <select
              value={editingSection.type}
              onChange={(e) =>
                onUpdateSection(editingSection.id, { type: e.target.value })
              }
              className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:border-[#087583]"
            >
              <option value="bio">Bio / Header</option>
              <option value="links">Links</option>
              <option value="projects">Projects / Portfolio</option>
              <option value="experience">CTA / Experience</option>
            </select>
          </div>

          {editingSection.type === "bio" && (
            <div className="rounded-[12px] border border-dashed border-[#D0D5DD] p-4">
              <label className="mb-2 block text-sm font-bold text-[#050505]">
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
                className="w-full rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#050505] outline-none focus:border-[#087583]"
              />

              <label className="mt-4 mb-2 block text-sm font-bold text-[#050505]">
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
                className="w-full resize-none rounded-[10px] border border-[#EDEDED] bg-white px-4 py-3 text-sm text-[#050505] outline-none focus:border-[#087583]"
              />

              <p className="mt-1 text-right text-xs text-[#A2A2A2]">
                {(editingSection.bio ?? "").length}/200
              </p>
            </div>
          )}

          {editingSection.type === "experience" && (
            <div className="flex flex-col gap-4 rounded-[12px] border border-dashed border-[#D0D5DD] p-4">
              <h4 className="text-sm font-bold text-[#050505]">
                Experience / CTA List
              </h4>

              {/* Existing Experience Items */}
              <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
                {editingSection.experience &&
                editingSection.experience.length > 0 ? (
                  editingSection.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between rounded-lg border bg-gray-50 p-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold">
                          {exp.role} at {exp.company}
                        </p>
                        <p className="truncate text-[10px] text-gray-500">
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
                  <p className="py-2 text-center text-xs text-gray-500 italic">
                    No items added yet.
                  </p>
                )}
              </div>

              {/* Add New Experience Form */}
              <div className="flex flex-col gap-2 border-t pt-3">
                <h5 className="text-xs font-bold text-[#454545]">
                  Add New Experience
                </h5>
                <input
                  type="text"
                  placeholder="Role/Title * (e.g. Lead Designer)"
                  value={newExpRole}
                  onChange={(e) => setNewExpRole(e.target.value)}
                  className="w-full rounded-[8px] border border-[#EDEDED] px-3 py-2 text-xs outline-none focus:border-[#087583]"
                />
                <input
                  type="text"
                  placeholder="Company Name * (e.g. Acme Corp)"
                  value={newExpCompany}
                  onChange={(e) => setNewExpCompany(e.target.value)}
                  className="w-full rounded-[8px] border border-[#EDEDED] px-3 py-2 text-xs outline-none focus:border-[#087583]"
                />
                <input
                  type="text"
                  placeholder="Duration * (e.g. 2024 - Present)"
                  value={newExpDuration}
                  onChange={(e) => setNewExpDuration(e.target.value)}
                  className="w-full rounded-[8px] border border-[#EDEDED] px-3 py-2 text-xs outline-none focus:border-[#087583]"
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
                  className="h-8 w-full rounded-[6px] bg-[#087583] text-xs text-white hover:bg-[#065E69]"
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
              <div className="rounded-[12px] border border-dashed border-[#D0D5DD] p-6 text-center">
                <p className="text-xs font-semibold text-[#747474]">
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
    return (
      <LinkSidebar
        returnTab={() => setLinkSidebarOpen(false)}
        section={selectedSection?.type === "links" ? selectedSection : null}
        onUpdateSection={onUpdateSection}
      />
    );
  }

  return (
    <aside className="border-tertiary-b animate-in fade-in hidden h-full w-72.5 shrink-0 flex-col border bg-white p-6 shadow-sm duration-200 select-none lg:flex">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
        >
          <ChevronLeft size={20} />
          <span>Home</span>
        </Link>
      </div>

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
          className="border-tertiary-b text-primary-text placeholder-tertiary-text focus:border-brand-b focus:ring-brand-b w-full rounded-[10px] border bg-white py-3 pr-4 pl-10 text-sm font-medium transition-all outline-none focus:ring-1"
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
              <Reorder.Item
                key={section.id}
                value={section}
                onClick={() => handleOpenSectionForm(section.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenSectionForm(section.id);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`group focus:ring-brand-b flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border transition-all duration-200 focus:ring-2 focus:outline-none ${
                  isSelected
                    ? "border-brand-b bg-brand-light-subtle-bg shadow-sm"
                    : "border-tertiary-b hover:border-secondary-b hover:bg-primary-bg bg-white"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center justify-between px-4 py-3">
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-semibold transition-colors ${
                        !section.visible
                          ? "text-tertiary-text opacity-50"
                          : isSelected
                            ? "text-link-hover-text"
                            : "text-primary-text"
                      }`}
                    >
                      {section.type === "bio" &&
                      section.title === "Bio" &&
                      profile?.fullName
                        ? `Bio - ${profile.fullName}`
                        : section.title}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#747474]">
                      {getSectionDescriptor(section)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSectionVisibility(section.id);
                    }}
                    className="hover:bg-hover-bg ml-2 shrink-0 rounded-lg p-1.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100"
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
                    className="hover:bg-hover-bg hover:text-negative-text ml-2 shrink-0 rounded-lg p-1.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100"
                    title="Delete Section"
                    aria-label={`Delete section ${section.title}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => {
                    if (searchQuery) {
                      e.stopPropagation();
                      e.preventDefault();
                    } else {
                      e.stopPropagation();
                    }
                  }}
                  className={`border-tertiary-b bg-active-bg text-tertiary-text flex items-center justify-center self-stretch border-l px-3.5 transition-colors ${
                    searchQuery
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-hover-bg cursor-grab active:cursor-grabbing"
                  }`}
                  title={
                    searchQuery
                      ? "Clear search to reorder sections"
                      : "Drag to reorder"
                  }
                >
                  <GripVertical size={16} />
                </div>
              </Reorder.Item>
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
