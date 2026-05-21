"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, GripVertical, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectItem, Section } from "./types";

interface ProjectsSidebarProps {
  returnTab: () => void;
  section: Section | null;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
}

export default function ProjectsSidebar({
  returnTab,
  section,
  onUpdateSection,
}: ProjectsSidebarProps) {
  const [selectedTab, setSelectedTab] = useState<"content" | "section">(
    "content"
  );

  // Local state mirrored from section
  const [projects, setProjects] = useState<ProjectItem[]>(
    section?.projects ?? []
  );
  const [sectionTitle, setSectionTitle] = useState(
    section?.title || "Portfolio"
  );
  const [sectionSubtitle, setSectionSubtitle] = useState(
    section?.subtitle || ""
  );
  const [layout, setLayout] = useState(section?.layout || "1");
  const [highlightSection, setHighlightSection] = useState(
    section?.highlightSection ?? false
  );

  // State for single project editing
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(
    null
  );

  // Section tab / item editing form state
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemButtonText, setItemButtonText] = useState("View project");
  const [itemUrl, setItemUrl] = useState("");
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [itemHighlighted, setItemHighlighted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleHighlightSectionToggle = (checked: boolean) => {
    setHighlightSection(checked);
    syncSection({ highlightSection: checked });
  };

  const handleProjectsChange = (updatedProjects: ProjectItem[]) => {
    setProjects(updatedProjects);
    syncSection({ projects: updatedProjects });
  };

  const handleEditProjectClick = (proj: ProjectItem) => {
    setEditingProject(proj);
    setItemTitle(proj.title);
    setItemDesc(proj.description);
    setItemButtonText(proj.buttonText || "View project");
    setItemUrl(proj.url || "");
    setItemImage(proj.imageSrc || null);
    setItemHighlighted(proj.highlighted ?? false);
    setSelectedTab("section");
  };

  const handleDeleteProject = (projId: string) => {
    const updated = projects.filter((p) => p.id !== projId);
    handleProjectsChange(updated);
  };

  const handleAddNewProjectClick = () => {
    setEditingProject(null);
    setItemTitle("");
    setItemDesc("");
    setItemButtonText("View project");
    setItemUrl("");
    setItemImage(null);
    setItemHighlighted(false);
    setSelectedTab("section");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setItemImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemDesc.trim()) return;

    if (editingProject) {
      // Update existing project
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...p,
              title: itemTitle.trim(),
              description: itemDesc.trim(),
              buttonText: itemButtonText.trim() || "View project",
              url: itemUrl.trim() || undefined,
              imageSrc: itemImage,
              highlighted: itemHighlighted,
            }
          : p
      );
      handleProjectsChange(updated);
    } else {
      // Add new project
      const newProj: ProjectItem = {
        id: Math.random().toString(36).substring(2, 9),
        title: itemTitle.trim(),
        description: itemDesc.trim(),
        buttonText: itemButtonText.trim() || "View project",
        url: itemUrl.trim() || undefined,
        imageSrc: itemImage,
        highlighted: itemHighlighted,
      };
      handleProjectsChange([...projects, newProj]);
    }

    // Go back to list tab
    setEditingProject(null);
    setSelectedTab("content");
  };

  const highlightedCount = useMemo(() => {
    return projects.filter((p) => p.highlighted).length;
  }, [projects]);

  return (
    <aside className="border-tertiary-b animate-in fade-in flex h-full w-72.5 shrink-0 flex-col border bg-white shadow-sm duration-200 select-none">
      {/* Back Button */}
      <div className="p-6 pb-4">
        <button
          onClick={returnTab}
          className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
        >
          <ChevronLeft size={20} />
          <span>{editingProject ? "Project" : sectionTitle}</span>
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="border-tertiary-b flex border-b">
        <button
          type="button"
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
          type="button"
          onClick={() => {
            // If not editing anything, open new project form
            if (!editingProject) {
              handleAddNewProjectClick();
            } else {
              setSelectedTab("section");
            }
          }}
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

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4 pr-3.5">
        {selectedTab === "content" ? (
          <div className="flex flex-col gap-6">
            {/* Layout Section */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">Layout</label>
              <div className="grid grid-cols-2 gap-3">
                {["1", "2", "3", "4"].map((lay) => (
                  <button
                    key={lay}
                    type="button"
                    onClick={() => handleLayoutChange(lay)}
                    className={`group relative aspect-video overflow-hidden rounded-[8px] border-2 transition-all duration-200 outline-none focus:outline-none ${
                      layout === lay
                        ? "border-brand-b bg-transparent"
                        : "border-[#EDEDED] bg-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={`/profilebuilder_projects/${lay}.png`}
                      alt={`Layout ${lay}`}
                      fill
                      className="object-contain p-1.5"
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
                placeholder="Selected Projects"
                className="focus:border-brand-b focus:ring-brand-b w-full rounded-[10px] border border-[#EDEDED] px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:ring-1"
              />
            </div>

            {/* Subtitle Section */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Subtitle
              </label>
              <textarea
                value={sectionSubtitle}
                onChange={(e) => handleSubtitleChange(e.target.value)}
                maxLength={200}
                placeholder="Add Text here"
                rows={3}
                className="focus:border-brand-b focus:ring-brand-b w-full resize-none rounded-[10px] border border-[#EDEDED] px-4 py-3 text-sm text-[#050505] outline-none focus:ring-1"
              />
              <p className="text-right text-[11px] text-[#A2A2A2]">
                {sectionSubtitle.length}/200
              </p>
            </div>

            {/* Highlight Section Toggle */}
            <div className="flex items-center justify-between rounded-[10px] border border-[#EDEDED] bg-white p-3.5">
              <span className="text-sm font-bold text-[#050505]">
                Highlight
              </span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={highlightSection}
                  onChange={(e) =>
                    handleHighlightSectionToggle(e.target.checked)
                  }
                  className="peer sr-only"
                />
                <div className="peer peer-checked:bg-brand-hover-bg h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
              </label>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#050505]">Projects</span>
                <span className="font-medium text-gray-500">
                  {highlightedCount}/{projects.length} Highlighted
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleEditProjectClick(proj)}
                    className="group hover:border-brand-b/40 flex h-[50px] cursor-pointer items-center justify-between overflow-hidden rounded-[8px] border border-[#EDEDED] bg-white pl-4 transition-all"
                  >
                    <span className="flex-1 truncate text-sm font-semibold text-[#050505]">
                      {proj.title}
                    </span>
                    <div className="flex h-full items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(proj.id);
                        }}
                        className="flex h-full items-center px-3 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-600"
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex h-full w-[50px] shrink-0 items-center justify-center border-l border-[#EDEDED] bg-[#F4F4F5] text-gray-400">
                        <GripVertical size={16} />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Project trigger card */}
                <button
                  type="button"
                  onClick={handleAddNewProjectClick}
                  className="hover:border-brand-b/60 flex h-[50px] w-full items-center justify-between overflow-hidden rounded-[8px] border border-[#EDEDED] bg-white pl-4 text-left transition-all"
                >
                  <span className="text-sm font-semibold text-[#747474]">
                    Add Project
                  </span>
                  <div className="flex h-full w-[50px] shrink-0 items-center justify-center border-l border-[#EDEDED] bg-[#F4F4F5] text-[#747474]">
                    <Plus size={16} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
            {/* Project Item Title */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">Title</label>
              <input
                type="text"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="My Framework for Deep Work & Design"
                className="focus:border-brand-b focus:ring-brand-b w-full rounded-[10px] border border-[#EDEDED] px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:ring-1"
                required
              />
            </div>

            {/* Project Item Description/Subtitle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Subtitle
              </label>
              <textarea
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                maxLength={100}
                placeholder="A complete breakdown of..."
                rows={4}
                className="focus:border-brand-b focus:ring-brand-b w-full resize-none rounded-[10px] border border-[#EDEDED] px-4 py-3 text-sm text-[#050505] outline-none focus:ring-1"
                required
              />
              <p className="text-right text-[11px] text-[#A2A2A2]">
                {itemDesc.length}/100
              </p>
            </div>

            {/* Image Uploader */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex h-[50px] overflow-hidden rounded-[8px] border border-[#EDEDED] bg-white">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-w-0 flex-1 items-center gap-3 px-4 text-left transition-colors hover:bg-gray-50"
                >
                  {itemImage ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-100">
                      <Image
                        src={itemImage}
                        alt="Project avatar"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F5] text-gray-400">
                      <Upload size={14} />
                    </div>
                  )}
                  <span className="truncate text-xs font-semibold text-gray-500">
                    {itemImage ? "Change image" : "Upload image"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (itemImage) {
                      setItemImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                  className="flex w-[50px] shrink-0 items-center justify-center border-l border-[#EDEDED] text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-600"
                >
                  {itemImage ? <Trash2 size={16} /> : <Upload size={16} />}
                </button>
              </div>
            </div>

            {/* Project URL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Project URL
              </label>
              <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#EDEDED]">
                <input
                  type="text"
                  value={itemButtonText}
                  onChange={(e) => setItemButtonText(e.target.value)}
                  placeholder="View project"
                  className="w-full border-b border-[#EDEDED] px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:bg-gray-50/30"
                />
                <input
                  type="text"
                  value={itemUrl}
                  onChange={(e) => setItemUrl(e.target.value)}
                  placeholder="Search site or paste link ..."
                  className="w-full px-4 py-3 text-sm text-gray-600 outline-none focus:bg-gray-50/30"
                />
              </div>
            </div>

            {/* Project Item Highlight Toggle */}
            <div className="flex items-center justify-between rounded-[10px] border border-[#EDEDED] bg-white p-3.5">
              <span className="text-sm font-bold text-[#050505]">
                Highlight
              </span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={itemHighlighted}
                  onChange={(e) => setItemHighlighted(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer peer-checked:bg-brand-hover-bg h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
              </label>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingProject(null);
                  setSelectedTab("content");
                }}
                className="h-[46px] flex-1 rounded-[10px] border-[#EDEDED] font-semibold text-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!itemTitle.trim() || !itemDesc.trim()}
                className="bg-brand-hover-bg hover:bg-brand h-[46px] flex-1 rounded-[10px] font-semibold text-white disabled:opacity-50"
              >
                {editingProject ? "Update Project" : "Save Project"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </aside>
  );
}
