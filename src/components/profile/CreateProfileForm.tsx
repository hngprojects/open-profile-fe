"use client";

import { useState, type FormEvent } from "react";
import { ROUTES } from "@/constants/routes";
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
import { isApiError } from "@/api/base";
import { uploadImage } from "@/api/uploads/uploads.service";
import { isValidFullName, normalizeFullName } from "@/utils/nameValidation";

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
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
    onSuccess: async (_, variables) => {
      queryClient.setQueryData<import("@/api/auth/auth.type").User>(
        ["auth", "me"],
        (prev) =>
          prev
            ? {
                ...prev,
                onboardingComplete: true,
                photoUrl: variables.photoUrl || prev.photoUrl,
              }
            : prev
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

  async function submitProfile() {
    const normalizedFullName = normalizeFullName(fullName);

    if (
      currentStep !== 2 ||
      !isValidFullName(normalizedFullName) ||
      !bio.trim() ||
      bio.length > 300
    )
      return;

    let finalPhotoUrl = photoUrl;
    if (photoFile && (!photoUrl || !photoUrl.startsWith("http"))) {
      setIsUploadingImage(true);
      try {
        const { url } = await uploadImage(photoFile, "profiles");
        finalPhotoUrl = url;
        setPhotoUrl(url);
      } catch (error: unknown) {
        toast.error(
          isApiError(error)
            ? error.message
            : error instanceof Error
              ? error.message
              : "Failed to upload photo. Please check the selected image and try again."
        );
        setIsUploadingImage(false);
        return;
      }
      setIsUploadingImage(false);
    }

    createProfile.mutate({
      username,
      fullName: normalizedFullName,
      bio,
      ...(finalPhotoUrl && finalPhotoUrl.startsWith("http")
        ? { photoUrl: finalPhotoUrl }
        : {}),
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitProfile();
  }

  const normalizedFullName = normalizeFullName(fullName);
  const [firstName = "", ...otherNames] = normalizedFullName.split(" ");
  const lastName = otherNames.join(" ");

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
            onUpdateBio={(e) => setBio(e.target.value)}
            fullName={fullName}
            onUpdateFullName={(e) => setFullName(e.target.value)}
            onUpdateStep={submitProfile}
            isPending={createProfile.isPending || isUploadingImage}
            photoUrl={photoUrl}
            onPhotoUrl={setPhotoUrl}
            photoFile={photoFile}
            onPhotoFile={setPhotoFile}
          />
        )}

        {currentStep === 3 && (
          <ProfileLinkSuccess
            username={username}
            firstName={firstName}
            lastName={lastName}
            bio={bio}
            photoUrl={photoUrl || undefined}
            onContinue={() =>
              router.replace(`${ROUTES.dashboard.home}?new=true`)
            }
          />
        )}
      </form>
    </AuthLayout>
  );
}
