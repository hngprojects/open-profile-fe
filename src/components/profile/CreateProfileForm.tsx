"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useDebounce } from "@/hooks/useDebounce";
import ProgressBar from "../profile/ProgressBar";
import CreateProfileLink from "./CreateProfileLink";
import CreateProfileInfo from "./CreateProfileInfo";
import ProfileLinkSuccess from "./ProfileLinkSuccess";
import {
  createProfileOption,
  checkUsernameOption,
} from "@/api/profile/profile.options";
import { callApi, isApiError } from "@/api/base";

type UsernameStatus = "available" | "taken" | "error" | "checking" | "";

export default function CreateProfileForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const debouncedUsername = useDebounce(username, 300);
  const isUsernameSynced = username === debouncedUsername;

  const usernameQuery = useQuery(checkUsernameOption(debouncedUsername));

  const usernameStatus: UsernameStatus = !debouncedUsername
    ? ""
    : !isUsernameSynced || usernameQuery.isLoading || usernameQuery.isFetching
      ? "checking"
      : usernameQuery.isError
        ? "error"
        : usernameQuery.data?.available
          ? "available"
          : "taken";

  const availableLabel =
    usernameStatus === "checking"
      ? "Checking..."
      : usernameStatus === "available"
        ? "Available"
        : usernameStatus === "taken"
          ? "Username not available"
          : usernameStatus === "error"
            ? "Could not check availability"
            : "";

  const createProfile = useMutation({
    ...createProfileOption,
    onSuccess: async () => {
      if (photoFile) {
        try {
          const form = new FormData();
          form.append("photo", photoFile);
          await callApi({
            url: `/profiles/${username}`,
            method: "PATCH",
            data: form,
          });
        } catch {
          toast.error("Profile created but photo upload failed.");
        }
      }
      queryClient.setQueryData<import("@/api/auth/auth.type").User>(
        ["auth", "me"],
        (prev) => (prev ? { ...prev, onboardingComplete: true } : prev)
      );
      setCurrentStep(3);
    },
    onError: (err) => {
      if (isApiError(err) && err.status === 409) {
        queryClient.setQueryData<import("@/api/auth/auth.type").User>(
          ["auth", "me"],
          (prev) => (prev ? { ...prev, onboardingComplete: true } : prev)
        );
        setCurrentStep(3);
        return;
      }
      toast.error(isApiError(err) ? err.message : "Failed to create profile.");
    },
  });

  function submitProfile() {
    if (currentStep !== 2) return;

    createProfile.mutate({
      username,
      fullName,
      bio,
      ...(photoUrl && photoUrl.startsWith("http") ? { photoUrl } : {}),
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitProfile();
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-full w-full flex-1 flex-col gap-8"
      >
        <ProgressBar currentStep={currentStep} />
        {currentStep === 1 && (
          <CreateProfileLink
            username={username}
            available={availableLabel}
            status={usernameStatus}
            onUpdateUsername={(e) =>
              setUsername(
                e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
              )
            }
            onUpdateStep={() => {
              if (isUsernameSynced && usernameStatus === "available") {
                setCurrentStep(2);
              }
            }}
          />
        )}

        {currentStep === 2 && (
          <CreateProfileInfo
            bio={bio}
            fullName={fullName}
            onUpdateBio={(e) => setBio(e.target.value)}
            onUpdateFullName={(e) => setFullName(e.target.value)}
            onUpdateStep={submitProfile}
            isPending={createProfile.isPending}
            photoUrl={photoUrl}
            onPhotoUrl={setPhotoUrl}
            photoFile={photoFile}
            onPhotoFile={setPhotoFile}
          />
        )}

        {currentStep === 3 && (
          <ProfileLinkSuccess
            username={username}
            fullName={fullName}
            bio={bio}
            photoUrl={photoUrl || undefined}
            onContinue={() => router.replace("/dashboard")}
          />
        )}
      </form>
    </AuthLayout>
  );
}
