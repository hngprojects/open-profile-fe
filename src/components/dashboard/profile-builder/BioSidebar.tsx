"use client";

import { ChevronLeft, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getImageUrl } from "@/utils/profile";
import { normalizeFullName, validateFullName } from "@/utils/nameValidation";
import { uploadImage } from "@/api/uploads/uploads.service";
import type { Section, ProfilePreview } from "./types";

interface BioSidebarProps {
  returnTab: () => void;
  section: Section;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  onSaveProfilePhoto?: (photoUrl: string | null) => Promise<void>;
  profile?: ProfilePreview | null;
}

export default function BioSidebar({
  returnTab,
  section,
  onUpdateSection,
  onSaveProfilePhoto,
  profile,
}: BioSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const savedFullName = section.fullName ?? profile?.fullName ?? "";
  const [fullNameDraftState, setFullNameDraftState] = useState<{
    sectionId: string;
    sourceValue: string;
    value: string;
  }>({
    sectionId: section.id,
    sourceValue: savedFullName,
    value: savedFullName,
  });

  const fullNameDraft =
    fullNameDraftState.sectionId === section.id &&
    fullNameDraftState.sourceValue === savedFullName
      ? fullNameDraftState.value
      : savedFullName;

  const bio = section.bio ?? "";
  const profilePhotoUrl = getImageUrl(profile?.photoUrl);
  const fullNameError = validateFullName(fullNameDraft);

  const handleFullNameChange = (value: string) => {
    setFullNameDraftState({
      sectionId: section.id,
      sourceValue: savedFullName,
      value,
    });

    const validationError = validateFullName(value);

    if (validationError) {
      return;
    }

    onUpdateSection(section.id, {
      fullName: normalizeFullName(value),
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    event.target.value = "";

    const prevUploadedImage = uploadedImage;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const { url } = await uploadImage(file, "profiles");
      setUploadedImage(url);
      onUpdateSection(section.id, { photoUrl: url } as never);
      await onSaveProfilePhoto?.(url);
    } catch {
      setUploadedImage(prevUploadedImage);
      onUpdateSection(section.id, { photoUrl: prevUploadedImage } as never);
      toast.error("Failed to upload profile photo.");
    } finally {
      setUploading(false);
    }
  };

  const displayImage = uploadedImage || profilePhotoUrl;

  return (
    <aside className="border-tertiary-b animate-in fade-in bg-background hidden h-full w-72.5 shrink-0 flex-col border-r p-6 duration-200 select-none lg:flex">
      {/* Back Button */}
      <div className="pb-4">
        <button
          onClick={returnTab}
          className="text-primary-text hover:text-link-hover-text inline-flex items-center gap-2 text-base font-semibold transition-all"
        >
          <ChevronLeft size={20} />
          <span>Bio</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-builder-scrollbar flex-1 overflow-y-auto py-6 pr-1">
        <div className="flex flex-col gap-6">
          {/* Full name */}
          <div>
            <label
              className="text-primary-text mb-2 block text-sm font-semibold"
              htmlFor="bio-fullname"
            >
              <span className="text-danger-text">*</span> Full name
            </label>
            <input
              type="text"
              id="bio-fullname"
              value={fullNameDraft}
              onChange={(e) => handleFullNameChange(e.target.value)}
              placeholder="Enter full name"
              aria-invalid={!!fullNameError}
              className={`bg-background text-primary-text w-full rounded-[10px] border px-4 py-3 text-sm transition-colors outline-none ${
                fullNameError
                  ? "border-warning-b focus:border-warning-b"
                  : "border-tertiary-b focus:border-brand-b"
              }`}
            />

            {fullNameError && (
              <p className="text-danger-text mt-1 text-xs font-medium">
                {fullNameError}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label
              className="text-primary-text mb-2 block text-sm font-semibold"
              htmlFor="bio-text"
            >
              <span className="text-danger-text">*</span> Bio
            </label>
            <textarea
              id="bio-text"
              value={bio}
              onChange={(e) =>
                onUpdateSection(section.id, { bio: e.target.value })
              }
              rows={5}
              placeholder="Write a short bio..."
              className={`profile-builder-scrollbar border-tertiary-b focus:border-brand-b bg-background w-full resize-none rounded-[10px] border px-4 py-3 text-sm transition-colors outline-none ${
                bio.length > 300
                  ? "border-warning-b text-danger-text focus:border-warning-b"
                  : "text-primary-text"
              }`}
            />
            <p
              className={`mt-1 text-right text-xs ${
                bio.length > 300
                  ? "text-danger-text font-medium"
                  : "text-disabled-text"
              }`}
            >
              {bio.length <= 300
                ? `${bio.length} / 300 characters`
                : `-${bio.length - 300} characters`}
            </p>
          </div>

          {/* Image — full-width row container */}
          <div>
            <label className="text-primary-text mb-2 block text-sm font-semibold">
              Image
            </label>
            <div className="border-tertiary-b bg-background flex overflow-hidden rounded-md border">
              {/* Left side — image / placeholder */}
              <button
                type="button"
                onClick={() => !displayImage && fileInputRef.current?.click()}
                className="hover:bg-primary-foreground-bg flex min-w-0 flex-1 items-center gap-3 p-1 text-left transition-colors"
              >
                {displayImage ? (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={displayImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
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

              {/* Right side — action button */}
              <button
                type="button"
                disabled={uploading}
                onClick={async () => {
                  if (displayImage) {
                    const prevUploadedImage = uploadedImage;

                    try {
                      setUploadedImage(null);
                      onUpdateSection(section.id, { photoUrl: null } as never);
                      await onSaveProfilePhoto?.(null);
                    } catch {
                      setUploadedImage(prevUploadedImage);
                      onUpdateSection(section.id, {
                        photoUrl: prevUploadedImage,
                      } as never);
                      toast.error("Failed to remove profile photo.");
                    }
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className="text-muted-foreground border-tertiary-b hover:bg-primary-foreground-bg flex w-14 shrink-0 items-center justify-center border-l transition-colors disabled:opacity-50"
                aria-label={displayImage ? "Remove image" : "Upload image"}
                title={
                  uploading
                    ? "Uploading..."
                    : displayImage
                      ? "Remove image"
                      : "Upload image"
                }
              >
                {uploading ? (
                  <span className="border-brand-hover-bg h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                ) : displayImage ? (
                  <Trash2 size={16} className="text-negative-bold-text" />
                ) : (
                  <Upload size={16} />
                )}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
