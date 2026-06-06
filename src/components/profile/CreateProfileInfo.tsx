import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type CreateProfileInfoProps = {
  bio: string;
  onUpdateBio: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  firstName: string;
  lastName: string;
  onUpdateFirstName: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdateLastName: (e: ChangeEvent<HTMLInputElement>) => void;
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
  firstName,
  lastName,
  onUpdateFirstName,
  onUpdateLastName,
}: CreateProfileInfoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentBlobRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (currentBlobRef.current) {
        URL.revokeObjectURL(currentBlobRef.current);
      }
    };
  }, []);

  const displayPhoto = preview ?? photoUrl;

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    bio?: string;
  }>({});

  const characterCount = bio?.length || 0;

  function handleContinue() {
    const newErrors: { firstName?: string; lastName?: string; bio?: string } =
      {};
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
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

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (currentBlobRef.current) {
      URL.revokeObjectURL(currentBlobRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    currentBlobRef.current = objectUrl;

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
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
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
        </div>

        <div className="mt-16 flex flex-col gap-1.5">
          <div className="flex w-full flex-col items-center gap-4 md:flex-row">
            <span className="flex-1">
              <label className="text-secondary-text mb-1 inline-block font-bold">
                <span className="text-danger-text">*</span> First Name
              </label>
              <Input
                value={firstName}
                onChange={(e) => {
                  onUpdateFirstName(e);
                  if (errors.firstName)
                    setErrors({ ...errors, firstName: undefined });
                }}
                placeholder="Enter your first name"
                className={`border-2 bg-white shadow-none ${errors.firstName ? "border-danger-text focus-visible:ring-danger-text" : "border-active-bg"}`}
              />
              {errors.firstName && (
                <p className="text-danger-text mt-1 text-sm">
                  {errors.firstName}
                </p>
              )}
            </span>
            <span className="flex-1">
              <label className="text-secondary-text mb-1 inline-block font-bold">
                <span className="text-danger-text">*</span> Last Name
              </label>
              <Input
                value={lastName}
                onChange={(e) => {
                  onUpdateLastName(e);
                  if (errors.lastName)
                    setErrors({ ...errors, lastName: undefined });
                }}
                placeholder="Enter your last name"
                className={`border-2 bg-white shadow-none ${errors.lastName ? "border-danger-text focus-visible:ring-danger-text" : "border-active-bg"}`}
              />
              {errors.lastName && (
                <p className="text-danger-text mt-1 text-sm">
                  {errors.lastName}
                </p>
              )}
            </span>
          </div>

          <div className="mt-4">
            <label className="text-secondary-text mb-1 inline-block font-bold">
              <span className="text-danger-text">*</span> Bio
            </label>
            <textarea
              className={`w-full resize-none rounded-lg border-2 bg-white p-3 focus:outline-none ${errors.bio ? "focus:ring-danger-text border-danger-text focus:ring-1" : "border-active-bg"}`}
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
                className={`text-xs ${characterCount > 300 ? "text-danger-text font-medium" : "text-tertiary-text"}`}
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
              !firstName.trim() ||
              !lastName.trim() ||
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
