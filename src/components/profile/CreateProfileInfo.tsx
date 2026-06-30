import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Camera, X as _X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { validateFullName } from "@/utils/nameValidation";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE_MB = 5;
const IMAGE_UPLOAD_HELPER_TEXT =
  "Image files only: JPG, PNG, WebP, GIF, or SVG. Max size: 5MB.";

type CreateProfileInfoProps = {
  bio: string;
  onUpdateBio: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  fullName: string;
  onUpdateFullName: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdateStep: () => void;
  isPending?: boolean;
  photoUrl?: string;
  onPhotoUrl?: (url: string) => void;
  photoFile?: File | null;
  onPhotoFile?: (file: File | null) => void;
};

export default function CreateProfileInfo({
  bio,
  onUpdateBio,
  onUpdateStep,
  isPending,
  photoUrl,
  onPhotoUrl,
  onPhotoFile,
  fullName,
  onUpdateFullName,
}: CreateProfileInfoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentBlobRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hasTouchedFullName, setHasTouchedFullName] = useState(false);
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    return () => {
      if (currentBlobRef.current) {
        URL.revokeObjectURL(currentBlobRef.current);
      }
    };
  }, []);

  const displayPhoto = preview ?? photoUrl;

  const [errors, setErrors] = useState<{
    fullName?: string;
    bio?: string;
  }>({});

  const characterCount = bio?.length || 0;
  const fullNameError = validateFullName(fullName);
  const isFullNameValid = !fullNameError;
  const shouldShowFullNameError =
    Boolean(errors.fullName) || (hasTouchedFullName && Boolean(fullNameError));

  const displayedFullNameError = errors.fullName || fullNameError;

  function handleContinue() {
    const newErrors: { fullName?: string; bio?: string } = {};
    const currentFullNameError = validateFullName(fullName);

    setHasTouchedFullName(true);

    if (currentFullNameError) {
      newErrors.fullName = currentFullNameError;
    }

    if (!bio.trim()) {
      newErrors.bio = "Bio is required.";
    } else if (characterCount > 300) {
      newErrors.bio = "Maximum 300 characters allowed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onUpdateStep();
  }

  function resetFileInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function _handleRemovePhoto() {
    if (currentBlobRef.current) {
      URL.revokeObjectURL(currentBlobRef.current);
      currentBlobRef.current = null;
    }

    setPreview(null);
    setPhotoError("");
    onPhotoUrl?.("");
    onPhotoFile?.(null);
    resetFileInput();
  }

  function getPhotoValidationError(file: File) {
    if (!file.type.startsWith("image/")) {
      return "Unsupported file type. Please upload an image file.";
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return `Image is too large. Please upload an image that is ${MAX_IMAGE_SIZE_MB}MB or smaller.`;
    }

    return "";
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = getPhotoValidationError(file);

    if (validationError) {
      setPhotoError(validationError);
      onPhotoFile?.(null);
      resetFileInput();
      return;
    }

    if (currentBlobRef.current) {
      URL.revokeObjectURL(currentBlobRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    currentBlobRef.current = objectUrl;

    setPhotoError("");
    setPreview(objectUrl);
    onPhotoUrl?.(objectUrl);
    onPhotoFile?.(file);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-1 text-center">
          <h1 className="text-primary text-3xl font-bold">
            Tell us about yourself
          </h1>
          <p className="text-secondary-text my-2">
            This is what people will see when they search you
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-describedby="photo-upload-help photo-upload-error"
              className="border-brand mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-3 border-dashed"
            >
              {displayPhoto ? (
                <Image
                  src={displayPhoto}
                  alt="Photo preview"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="text-brand" />
              )}
            </button>

            {/* {displayPhoto && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                aria-label="Remove uploaded photo"
                className="bg-negative-text hover:bg-negative-text/90 absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-sm transition-colors"
              >
                <X size={15} />
              </button>
            )} */}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mx-auto mt-5 h-13 w-40 rounded-[10px] text-center text-lg font-normal shadow-none transition-colors"
          >
            {displayPhoto ? "Change Photo" : "Upload a Photo"}
          </Button>

          <p
            id="photo-upload-help"
            className="text-tertiary-text mt-2 max-w-[320px] text-center text-xs leading-5"
          >
            {IMAGE_UPLOAD_HELPER_TEXT}
          </p>

          {photoError && (
            <p
              id="photo-upload-error"
              role="alert"
              className="text-danger-text mt-1 max-w-[320px] text-center text-sm"
            >
              {photoError}
            </p>
          )}

          {/* {displayPhoto && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="text-danger-text mt-2 text-sm font-medium transition-colors hover:underline"
            >
              Remove photo
            </button>
          )} */}
        </div>

        <div className="mt-8 flex w-full flex-col gap-1.5 sm:mt-12">
          <div className="w-full">
            <label className="text-secondary-text mb-1 inline-block font-bold">
              <span className="text-danger-text">*</span> Full Name
            </label>
            <Input
              value={fullName}
              onChange={(e) => {
                setHasTouchedFullName(true);
                onUpdateFullName(e);

                if (errors.fullName) {
                  setErrors({ ...errors, fullName: undefined });
                }
              }}
              onBlur={() => setHasTouchedFullName(true)}
              placeholder="Enter your full name"
              aria-invalid={shouldShowFullNameError}
              aria-describedby="full-name-help"
              className={`border-2 bg-white shadow-none ${
                shouldShowFullNameError
                  ? "border-danger-text focus-visible:ring-danger-text"
                  : "border-active-bg"
              }`}
            />
            {shouldShowFullNameError ? (
              <p id="full-name-help" className="text-danger-text mt-1 text-sm">
                {displayedFullNameError}
              </p>
            ) : (
              <p
                id="full-name-help"
                className="text-tertiary-text mt-1 text-xs"
              >
                Use letters, spaces, hyphens, or apostrophes and enter at least
                two names.
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-secondary-text mb-1 inline-block font-bold">
              <span className="text-danger-text">*</span> Bio
            </label>
            <textarea
              className={`w-full resize-none rounded-lg border-2 bg-white p-3 focus:outline-none ${
                errors.bio
                  ? "focus:ring-danger-text border-danger-text focus:ring-1"
                  : "border-active-bg"
              }`}
              value={bio}
              onChange={(e) => {
                onUpdateBio(e);
                if (errors.bio) setErrors({ ...errors, bio: undefined });
              }}
              rows={5}
              placeholder="Product designer & side project builder based in lagos"
            />
            <div className="mt-1 flex items-center justify-between">
              <span
                className={`text-xs ${
                  characterCount > 300
                    ? "text-danger-text font-medium"
                    : "text-tertiary-text"
                }`}
              >
                {characterCount <= 300
                  ? `${characterCount} / 300 characters`
                  : `-${characterCount - 300} characters`}
              </span>
              {errors.bio && (
                <span className="text-danger-text text-sm">{errors.bio}</span>
              )}
            </div>
          </div>

          <Button
            type="button"
            disabled={
              isPending ||
              !isFullNameValid ||
              !bio.trim() ||
              characterCount > 300
            }
            className="bg-brand mt-4 h-13 w-full rounded-[10px] text-base shadow-none transition-colors"
            onClick={handleContinue}
          >
            {isPending ? "Please wait…" : "Continue"}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
