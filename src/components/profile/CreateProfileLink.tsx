import { ChangeEvent } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UsernameStatus = "available" | "taken" | "error" | "checking" | "";

type CreateProfileLinkProps = {
  username: string;
  available: string;
  status: UsernameStatus;
  onUpdateUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdateStep: () => void;
};

export default function CreateProfileLink({
  username,
  available,
  status,
  onUpdateUsername,
  onUpdateStep,
}: CreateProfileLinkProps) {
  const isChecking = status === "checking";
  const isAvailable = status === "available";
  const isUnavailable = status === "taken" || status === "error";

  const canContinue = username.length > 0 && isAvailable;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-1 flex-col justify-center"
    >
      <div className="mb-8 text-center">
        <h1 className="text-primary text-3xl font-bold">Create Your Link</h1>

        <p className="mx-auto mt-3 max-w-[520px] text-[#454545]">
          Your account has been successfully created. You can now create your
          own unique link with your name
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-3">
        <label htmlFor="username" className="font-bold text-[#454545]">
          Enter Name
        </label>

        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <div className="flex h-[56px] items-center rounded-[8px] bg-[#F0F0F0] px-4 text-lg text-[#050505] md:w-[170px]">
            open.profile/
          </div>

          <Input
            type="text"
            id="username"
            name="profile-username"
            value={username}
            onChange={onUpdateUsername}
            placeholder="Enter username"
            className={`h-[56px] flex-1 rounded-[8px] bg-[#FAFAFA] px-4 text-lg shadow-none ${
              isUnavailable
                ? "border-[#FF3158] text-[#A72E2E]"
                : isAvailable
                  ? "border-[#050505] text-[#050505]"
                  : "border-[#EDEDED] text-[#050505]"
            }`}
          />
        </div>

        {available && (
          <span
            className={`text-sm ${
              isUnavailable
                ? "text-[#FF3158]"
                : isChecking
                  ? "text-[#747474]"
                  : "text-[#145B33]"
            }`}
          >
            {available}
          </span>
        )}

        <Button
          type="button"
          className={`mt-5 h-13 w-full rounded-[10px] text-[16px] font-medium shadow-none transition-colors ${
            canContinue
              ? "bg-[#087583] text-white"
              : "cursor-not-allowed bg-[#9ACBD1] text-white"
          }`}
          onClick={onUpdateStep}
          disabled={!canContinue}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
