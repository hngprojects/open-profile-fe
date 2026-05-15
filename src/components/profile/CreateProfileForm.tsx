"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { isApiError } from "@/api/base";

type UsernameStatus = "available" | "taken" | "invalid" | "error" | "";

export default function CreateProfileForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const debouncedUsername = useDebounce(username, 500);

  const usernameQuery = useQuery(checkUsernameOption(debouncedUsername));

  const usernameStatus: UsernameStatus = usernameQuery.isLoading
    ? ""
    : usernameQuery.isError
      ? isApiError(usernameQuery.error) && usernameQuery.error.status === 409
        ? "taken"
        : isApiError(usernameQuery.error) && usernameQuery.error.status === 400
          ? "invalid"
          : "error"
      : usernameQuery.data?.available === true
        ? "available"
        : usernameQuery.data?.available === false
          ? "taken"
          : "";

  const availableLabel =
    usernameQuery.isLoading && debouncedUsername
      ? "Checking…"
      : usernameStatus === "available"
        ? "This username is available"
        : usernameStatus === "taken"
          ? "This username is taken"
          : usernameStatus === "invalid"
            ? "Invalid username format"
            : usernameStatus === "error"
              ? "Could not check availability"
              : "";

  const createProfile = useMutation({
    ...createProfileOption,
    onSuccess: () => setCurrentStep(3),
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Failed to create profile."),
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (currentStep !== 2) return;
    createProfile.mutate({
      username,
      fullName,
      bio,
      // only pass photoUrl if it's a real URL (not a blob preview)
      ...(photoUrl && photoUrl.startsWith("http") ? { photoUrl } : {}),
    });
  }

  return (
    <>
      <ProgressBar currentStep={currentStep} />
      <div className="absolute top-4 right-4">
        <button
          type="button"
          onClick={() => {
            document.cookie = "auth=; path=/; max-age=0";
            document.cookie = "access_token=; path=/; max-age=0";
            router.replace("/login");
          }}
          className="text-sm text-gray-500 hover:underline"
        >
          Log out
        </button>
      </div>

      <AuthLayout>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {currentStep === 1 && (
            <CreateProfileLink
              username={username}
              available={availableLabel}
              isAvailable={usernameStatus === "available"}
              onUpdateUsername={(e) => setUsername(e.target.value)}
              onUpdateStep={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <CreateProfileInfo
              bio={bio}
              fullName={fullName}
              onUpdateBio={(e) => setBio(e.target.value)}
              onUpdateFullName={(e) => setFullName(e.target.value)}
              onUpdateStep={() =>
                handleSubmit({
                  preventDefault: () => {},
                } as FormEvent<HTMLFormElement>)
              }
              isPending={createProfile.isPending}
              photoUrl={photoUrl}
              onPhotoUrl={setPhotoUrl}
            />
          )}

          {currentStep === 3 && (
            <ProfileLinkSuccess
              username={username}
              bio={bio}
              photoUrl={photoUrl || undefined}
              onContinue={() => router.replace("/dashboard")}
            />
          )}
        </form>
      </AuthLayout>
    </>
  );
}
