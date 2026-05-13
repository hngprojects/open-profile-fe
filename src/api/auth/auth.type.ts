export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

export type SignupRequest = {
  email: string;
  password: string;
  fullName: string;
};

export type SignupResponse = {
  message?: string;
};

export type User = {
  id: string;
  email: string;
  fullName?: string;
};
