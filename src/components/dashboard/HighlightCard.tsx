import Image from "next/image";
import { getImageUrl } from "@/utils/profile";

type Props = {
  profile?: {
    photoUrl?: string | null;
    fullName?: string;
    bio?: string | null;
  };
};

export default function HighlightCard({ profile }: Props) {
  const imageSrc = getImageUrl(profile?.photoUrl);

  return (
    <section className="rounded-[12px] border border-[#EDEDED] bg-white p-6">
      <h2 className="text-2xl font-bold">Highlight</h2>

      <div className="mt-6 flex flex-col gap-8 rounded-[28px] border border-[#EDEDED] p-6 md:flex-row md:items-center">
        <div className="flex flex-1 justify-center bg-[#F4F4F4] p-10">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={profile?.fullName ?? "Profile image"}
              width={260}
              height={180}
              className="h-auto w-full max-w-[260px] rounded-[12px] object-cover"
            />
          ) : (
            <div className="flex h-[180px] w-full max-w-[260px] items-center justify-center rounded-[12px] bg-white text-[#747474]">
              No image yet
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold">
            {profile?.fullName ?? "No title yet"}
          </h3>
          <p className="mt-4 text-lg text-[#747474]">
            {profile?.bio ?? "No bio added yet."}
          </p>
        </div>
      </div>
    </section>
  );
}
