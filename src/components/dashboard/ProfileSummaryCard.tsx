import Image from "next/image";
import { getImageUrl } from "@/utils/profile";
import { getInitials } from "@/utils/avatar";
import { Skeleton } from "../ui/skeleton";

type Props = {
  profile?: {
    fullName?: string;
    bio?: string | null;
    photoUrl?: string | null;
  };
  isLoading?: boolean;
};

export default function ProfileSummaryCard({ profile, isLoading }: Props) {
  const rawUrl = profile?.photoUrl;
  const profileImageUrl = rawUrl
    ? rawUrl.startsWith("/profile-preview/")
      ? rawUrl
      : getImageUrl(rawUrl)
    : null;

  const initials = getInitials(profile?.fullName);

  return (
    <section className="border-border bg-background flex flex-col gap-5 rounded-[12px] border p-6 md:flex-row md:items-start">
      {isLoading ? (
        <Skeleton className="h-24 w-24 shrink-0 rounded-full" />
      ) : profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt={profile?.fullName ?? "Profile avatar"}
          width={96}
          height={96}
          unoptimized
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="bg-brand-hover-bg text-inverse-text flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-3xl font-extrabold">
          {initials}
        </div>
      )}

      <div className="min-w-0 flex-1">
        {isLoading ? (
          <Skeleton className="h-9" />
        ) : (
          <h2 className="text-primary-text text-3xl font-extrabold tracking-tight break-all md:text-4xl">
            {profile?.fullName ?? "No Name"}
          </h2>
        )}

        {isLoading ? (
          <Skeleton className="mt-4 h-5" />
        ) : (
          <p className="text-primary-text mt-4 max-w-[650px] text-xl leading-8 font-medium break-all">
            {profile?.bio ?? "No bio added yet."}
          </p>
        )}
      </div>
    </section>
  );
}
