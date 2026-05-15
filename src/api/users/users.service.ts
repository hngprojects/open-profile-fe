import { callApi } from "@/api/base";

export type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  username: string | null;
  bio: string | null;
  photoUrl: string | null;
  isPublished: boolean;
  role: string | null;
  authProvider: string;
  isVerified: boolean;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getUserProfile(idOrUsername: string) {
  return callApi<UserProfile>({
    url: `/users/${idOrUsername}`,
    method: "GET",
  });
}
