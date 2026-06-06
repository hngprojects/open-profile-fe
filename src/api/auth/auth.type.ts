export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status?: string;
  user?: {
    id?: string;
    email?: string;
    role?: string;
    onboardingComplete?: boolean;
  };
  accessToken?: string;
  refreshToken?: string;
};

export type SignupRequest = {
  email: string;
  password: string;
};

export type SignupResponse = {
  message?: string;
};

export type User = {
  id: string;
  email: string;
  fullName?: string;
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
