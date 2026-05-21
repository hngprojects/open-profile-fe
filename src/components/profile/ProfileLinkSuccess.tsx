import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfileLinkSuccess({
  username,
  bio,
  fullName,
  photoUrl,
  onContinue,
}: {
  username: string;
  bio: string;
  fullName: string;
  photoUrl?: string;
  onContinue?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copyResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const getProfileUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin.replace(/\/$/, "")}/${encodeURIComponent(username)}/`;
  };

  const profileUrl = getProfileUrl();

  const initials = fullName?.trim()
    ? fullName
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (username || "").slice(0, 2).toUpperCase() || "?";

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      if (copyResetTimerRef.current) {
        clearTimeout(copyResetTimerRef.current);
      }
      copyResetTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10"
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center text-3xl font-bold">
          Your profile has been published
        </h2>

        <div className="flex w-full flex-col items-center justify-center">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              width={80}
              height={80}
              className="mt-3 h-20 w-20 rounded-full object-cover"
              alt=""
            />
          ) : (
            <div className="mt-3 flex h-20 w-20 items-center justify-center rounded-full bg-[#087583] text-2xl font-bold text-white">
              {initials}
            </div>
          )}

          <div className="pointer-events-auto relative z-30 mt-4 flex items-center gap-2 text-center font-bold text-[#747474]">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-inherit no-underline underline-offset-4 transition-opacity hover:underline hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              {profileUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="relative z-40 flex cursor-pointer items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-100"
              aria-label="Copy profile link"
            >
              {copied ? (
                <Check className="text-green-500" size={18} />
              ) : (
                <Copy className="rotate-90 transform" size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="mt-3 text-center">{bio}</p>

        <Button
          type="button"
          className="mt-4 h-13 w-full rounded-[10px] bg-[#087583] text-[16px] font-normal shadow-none transition-colors"
          onClick={onContinue}
        >
          Continue To Dashboard
        </Button>
      </div>
    </motion.div>
  );
}
