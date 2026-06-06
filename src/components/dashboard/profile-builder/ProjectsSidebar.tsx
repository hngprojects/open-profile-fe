"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, GripVertical, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectItem, Section } from "./types";
import { uploadImage } from "@/api/uploads/uploads.service";
import { isValidUrl } from "./builder.utils";

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
  // const [highlightSection, setHighlightSection] = useState(
  //   section?.highlightSection ?? false
  // );

  // State for single project editing
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(
    null
  );

  // Section tab / item editing form state
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemButtonText, setItemButtonText] = useState("View project");
  const [itemUrl, setItemUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [itemHighlighted, setItemHighlighted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [btnTextError, setBtnTextError] = useState("");
  const [imageError, setImageError] = useState("");

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

  // const handleHighlightSectionToggle = (checked: boolean) => {
  //   setHighlightSection(checked);
  //   syncSection({ highlightSection: checked });
  // };

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
    setUrlError("");
    setTitleError("");
    setDescError("");
    setBtnTextError("");
    setImageError("");
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
    setUrlError("");
    setTitleError("");
    setDescError("");
    setBtnTextError("");
    setImageError("");
    setItemImage(null);
    setItemHighlighted(false);
    setSelectedTab("section");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    try {
      setUploading(true);
      const { url } = await uploadImage(file, "projects");
      setItemImage(url);
    } catch (err) {
      console.error("Failed to upload project image:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!itemTitle.trim()) {
      setTitleError("Title is required.");
      hasError = true;
    } else {
      setTitleError("");
    }

    if (!itemDesc.trim()) {
      setDescError("Description is required.");
      hasError = true;
    } else {
      setDescError("");
    }

    if (!itemButtonText.trim()) {
      setBtnTextError("Button text is required.");
      hasError = true;
    } else {
      setBtnTextError("");
    }

    if (!itemUrl.trim()) {
      setUrlError("URL is required.");
      hasError = true;
    } else if (!isValidUrl(itemUrl.trim())) {
      setUrlError("Please enter a valid link (e.g. yoursite.com)");
      hasError = true;
    } else {
      setUrlError("");
    }

    if (!itemImage) {
      setImageError("Image is required.");
      hasError = true;
    } else {
      setImageError("");
    }

    if (hasError) return;

    const validatedProjectUrl = itemUrl.trim() || undefined;

    if (editingProject) {
      const updated = projects.map((p) => {
        const isCurrentProject = p.id === editingProject.id;
        return {
          ...p,
          title: isCurrentProject ? itemTitle.trim() : p.title,
          description: isCurrentProject ? itemDesc.trim() : p.description,
          buttonText: isCurrentProject
            ? itemButtonText.trim() || "View project"
            : p.buttonText,
          url: isCurrentProject ? validatedProjectUrl : p.url,
          imageSrc: isCurrentProject ? itemImage : p.imageSrc,
          highlighted: isCurrentProject
            ? itemHighlighted
            : itemHighlighted
              ? false
              : p.highlighted,
        };
      });
      handleProjectsChange(updated);
    } else {
      const newProj: ProjectItem = {
        id: Math.random().toString(36).substring(2, 9),
        title: itemTitle.trim(),
        description: itemDesc.trim(),
        buttonText: itemButtonText.trim() || "View project",
        url: validatedProjectUrl,
        imageSrc: itemImage,
        highlighted: itemHighlighted,
      };

      const updated = itemHighlighted
        ? projects.map((p) => ({ ...p, highlighted: false }))
        : projects;

      handleProjectsChange([...updated, newProj]);
    }

    setEditingProject(null);
    setSelectedTab("content");
  };

  const highlightedCount = useMemo(() => {
    const count = projects.filter((p) => p.highlighted).length;
    return count;
  }, [projects]);

  return (
    <aside className="border-tertiary-b animate-in fade-in bg-background flex h-full w-72.5 shrink-0 flex-col rounded-2xl border p-6 shadow-sm duration-200 select-none">
      {/* Back Button */}
      <div className="border-tertiary-b border-b pb-4">
        {selectedTab === "content" ? (
          <button
            onClick={returnTab}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>Projects</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setEditingProject(null);
              setSelectedTab("content");
            }}
            className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
          >
            <ChevronLeft size={20} />
            <span>Back to Projects</span>
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-6 pr-1">
        {selectedTab === "content" ? (
          projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-secondary-text mb-6 text-sm font-medium">
                Add your first project to get started
              </p>
              <Button
                onClick={handleAddNewProjectClick}
                className="bg-brand-hover-bg hover:bg-brand flex h-12 w-full max-w-[200px] items-center justify-center gap-2 rounded-[10px] text-sm font-semibold text-white transition-all active:scale-95"
              >
                <Plus size={18} />
                Add project
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Title Section */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#050505]">
                  Title
                </label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Selected Projects"
                  className="focus:border-brand-b border-border w-full rounded-[10px] border px-4 py-3 text-sm font-semibold text-[#050505] transition-colors outline-none"
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
                  className="focus:border-brand-b border-border w-full resize-none rounded-[10px] border px-4 py-3 text-sm text-[#050505] transition-colors outline-none"
                />
                <p className="text-right text-[11px] text-[#A2A2A2]">
                  {sectionSubtitle.length}/200
                </p>
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
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleEditProjectClick(proj);
                        }
                      }}
                      className="group hover:border-brand-b/40 border-border bg-background flex h-[50px] cursor-pointer items-center justify-between overflow-hidden rounded-[8px] border pl-4 transition-all"
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
                        <div className="border-border flex h-full w-[50px] shrink-0 items-center justify-center border-l bg-[#F4F4F5] text-gray-400">
                          <GripVertical size={16} />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Project trigger button */}
                  <Button
                    type="button"
                    size="lg"
                    variant="waitlist"
                    onClick={handleAddNewProjectClick}
                  >
                    Add New Project
                  </Button>
                </div>
              </div>

              {/* Layout Section */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#050505]">
                  Layout
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["1", "2", "3", "4"].map((lay) => (
                    <button
                      key={lay}
                      type="button"
                      onClick={() => handleLayoutChange(lay)}
                      className={`group relative aspect-video overflow-hidden rounded-[8px] border-2 transition-all duration-200 outline-none focus:outline-none ${
                        layout === lay
                          ? "border-brand-b bg-transparent"
                          : "border-border bg-transparent hover:border-gray-300"
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
            </div>
          )
        ) : (
          <form onSubmit={handleSaveProject} className="flex flex-col gap-5">
            {/* Project Item Title */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Title<span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                value={itemTitle}
                onChange={(e) => {
                  setItemTitle(e.target.value);
                  if (e.target.value.trim()) setTitleError("");
                }}
                placeholder="My Framework for Deep Work & Design"
                className={`w-full rounded-[10px] border px-4 py-3 text-sm font-semibold text-[#050505] transition-colors outline-none ${
                  titleError
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-brand-b"
                }`}
                required
              />
              {titleError && (
                <p className="text-xs text-red-500">{titleError}</p>
              )}
            </div>

            {/* Project Item Description/Subtitle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Subtitle<span className="ml-1 text-red-500">*</span>
              </label>
              <textarea
                value={itemDesc}
                onChange={(e) => {
                  setItemDesc(e.target.value);
                  if (e.target.value.trim()) setDescError("");
                }}
                maxLength={100}
                placeholder="A complete breakdown of..."
                rows={4}
                className={`w-full resize-none rounded-[10px] border px-4 py-3 text-sm text-[#050505] transition-colors outline-none ${
                  descError
                    ? "border-red-500 focus:border-red-500"
                    : "border-border focus:border-brand-b"
                }`}
                required
              />
              <div className="flex items-center justify-between">
                {descError ? (
                  <p className="text-xs text-red-500">{descError}</p>
                ) : (
                  <span />
                )}
                <p className="text-right text-[11px] text-[#A2A2A2]">
                  {itemDesc.length}/100
                </p>
              </div>
            </div>

            {/* Image Uploader */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Image<span className="ml-1 text-red-500">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                className={`bg-background flex h-[50px] overflow-hidden rounded-[8px] border ${
                  imageError && !itemImage ? "border-red-500" : "border-border"
                }`}
              >
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
                  className="border-border flex w-[50px] shrink-0 items-center justify-center border-l text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-600"
                >
                  {itemImage ? <Trash2 size={16} /> : <Upload size={16} />}
                </button>
              </div>
              {imageError && (
                <p className="text-xs text-red-500">{imageError}</p>
              )}
            </div>

            {/* Project URL */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#050505]">
                Project URL<span className="ml-1 text-red-500">*</span>
              </label>
              <div
                className={`flex flex-col overflow-hidden rounded-[10px] border ${
                  btnTextError || urlError ? "border-red-500" : "border-border"
                }`}
              >
                <input
                  type="text"
                  value={itemButtonText}
                  onChange={(e) => {
                    setItemButtonText(e.target.value);
                    if (e.target.value.trim()) setBtnTextError("");
                  }}
                  placeholder="View project"
                  className="border-border w-full border-b px-4 py-3 text-sm font-semibold text-[#050505] outline-none focus:bg-gray-50/30"
                />
                <input
                  type="text"
                  value={itemUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setItemUrl(val);
                    if (urlError) {
                      if (!val.trim() || isValidUrl(val.trim())) {
                        setUrlError("");
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const val = e.target.value;
                    if (val.trim() && !isValidUrl(val.trim())) {
                      setUrlError(
                        "Please enter a valid link (e.g. yoursite.com)"
                      );
                    } else {
                      setUrlError("");
                    }
                  }}
                  placeholder="Paste link (e.g. yoursite.com)..."
                  className={`w-full px-4 py-3 text-sm outline-none focus:bg-gray-50/30 ${
                    urlError ? "text-red-500" : "text-gray-600"
                  }`}
                />
              </div>
              {btnTextError && (
                <p className="text-xs text-red-500">{btnTextError}</p>
              )}
              {urlError && <p className="text-xs text-red-500">{urlError}</p>}
            </div>

            {/* Project Item Highlight Toggle */}
            <div className="border-border bg-background flex items-center justify-between rounded-[10px] border p-3.5">
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
                <div className="peer peer-checked:bg-brand-hover-bg after:bg-background h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
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
                className="border-border h-[46px] flex-1 rounded-[10px] font-semibold text-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || !itemTitle.trim() || !itemDesc.trim()}
                className="bg-brand-hover-bg hover:bg-brand h-[46px] flex-1 rounded-[10px] font-semibold text-white disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : editingProject
                    ? "Update Project"
                    : "Save Project"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </aside>
  );
}
