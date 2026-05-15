export type CreateProfileRequest = {
  username: string;
  fullName: string;
  bio: string;
  photoUrl?: string;
};

export type CreateProfileResponse = {
  username: string;
  fullName: string;
  bio: string;
  photoUrl: string | null;
};

export type UsernameCheckResponse = {
  available: boolean;
  username?: string;
};

export type ProfileResponse = {
  id?: string;
  username: string;
  fullName: string;
  bio: string | null;
  photoUrl: string | null;
  isPublished?: boolean;
};
