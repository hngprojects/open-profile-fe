import { ChangeEvent } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type createProfileLinkProps = {
  username: string;
  available: string;
  isAvailable: boolean;
  onUpdateUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpdateStep: () => void;
};

export default function CreateProfileLink({
  username,
  available,
  isAvailable,
  onUpdateUsername,
  onUpdateStep,
}: createProfileLinkProps) {
  const hasError =
    available.includes("taken") ||
    available.includes("Invalid") ||
    available.includes("Checking") ||
    available.includes("Could not");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-1 text-center">
        <h1 className="text-primary text-3xl font-bold">Create Your Link</h1>

        <p className="mt-1 text-[#454545]">
          Your account has been successfully created. You can now create your
          own unique link with you name
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-2 md:flex-row">
          <label
            htmlFor="username"
            className="bg-neutral-bg flex basis-1/4 rounded-md py-3 pl-3 text-lg font-normal md:items-center md:justify-center"
          >
            open.profile/
          </label>

          <Input
            type="text"
            id="username"
            name="profile-username"
            value={username}
            onChange={onUpdateUsername}
            placeholder="Enter username"
            className={`basis-2/3 bg-[#FAFAFA] py-3 shadow-none md:py-6 md:text-lg ${hasError ? "border-[#A72E2E] text-[#A72E2E]" : "border-[#EDEDED]"} placeholder:text-lg`}
          />
        </div>

        <span
          className={`min-h-6 text-lg md:ml-34 ${hasError ? "text-[#A72E2E]" : "text-[#145B33]"}`}
        >
          {available}
        </span>

        <Button
          type="button"
          className={`mt-4 h-13 w-full rounded-[10px] bg-[#087583] text-[16px] font-medium shadow-none transition-colors ${!isAvailable ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={onUpdateStep}
          disabled={!isAvailable}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
