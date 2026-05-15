import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileLinkSuccess({
  username,
  bio,
  photoUrl,
  onContinue,
}: {
  username: string;
  bio: string;
  photoUrl?: string;
  onContinue?: () => void;
}) {
  const profileRef = useRef<HTMLDivElement>(null);

  function runTest() {
    navigator.clipboard.writeText(profileRef.current?.textContent || "");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
            <Image
              src="/avatar.png"
              width={80}
              height={80}
              className="mt-3 h-20 w-20 rounded-full object-cover"
              alt=""
            />
          )}

          <span className="mt-4 flex items-center gap-2 text-center font-bold text-[#747474]">
            open.profile/{username}
            <Copy
              className="rotate-90 transform cursor-pointer"
              size={18}
              onClick={runTest}
            />
          </span>
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
