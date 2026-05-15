import { ChangeEvent, useRef, useState } from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type CreateProfileInfoProps = {
  bio: string;
  fullName: string;
  onUpdateBio: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdateFullName: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdateStep: () => void;
  isPending?: boolean;
  photoUrl?: string;
  onPhotoUrl?: (url: string) => void;
};

export default function CreateProfileInfo({
  bio,
  fullName,
  onUpdateBio,
  onUpdateFullName,
  onUpdateStep,
  isPending,
  onPhotoUrl,
}: CreateProfileInfoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onPhotoUrl?.(objectUrl);
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
          <p className="my-2 text-[#454545]">
            This is what people will see when they search you
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="border-brand mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-3 border-dashed"
          >
            {preview ? (
              <Image
                src={preview}
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
            {preview ? "Change Photo" : "Upload a Photo"}
          </Button>
        </div>

        <div className="mt-16 flex flex-col gap-1.5">
          <div className="mt-4">
            <label className="mb-1 inline-block font-bold text-[#454545]">
              Full Name
            </label>
            <Input
              value={fullName}
              onChange={onUpdateFullName}
              placeholder="John Doe"
              className="border-2 border-[#ededed] bg-white shadow-none"
            />
          </div>
          <div className="mt-4">
            <label className="mb-1 inline-block font-bold text-[#454545]">
              Bio
            </label>
            <textarea
              className="w-full resize-none rounded-lg border-2 border-[#ededed] bg-white p-3"
              value={bio}
              onChange={onUpdateBio}
              rows={5}
              placeholder="Product designer & side project builder based in lagos"
            />
          </div>

          <Button
            type="button"
            disabled={isPending || !fullName.trim()}
            className="mt-4 h-13 w-full rounded-[10px] bg-[#087583] text-[16px] font-medium shadow-none transition-colors"
            onClick={onUpdateStep}
          >
            {isPending ? "Please wait…" : "Continue"}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
