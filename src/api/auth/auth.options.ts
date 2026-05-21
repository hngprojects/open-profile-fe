import {
  getCurrentUser,
  login,
  signup,
  verifyEmailOtp,
  resendOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  logoutApi,
} from "@/api/auth/auth.service";
import { QueryStaleTime } from "@/api/base/base.const";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const loginOption = mutationOptions({
  mutationKey: ["auth", "login"],
  mutationFn: login,
});

export const signupOption = mutationOptions({
  mutationKey: ["auth", "signup"],
  mutationFn: signup,
});

export const verifyEmailOtpOption = mutationOptions({
  mutationKey: ["auth", "verify-email-otp"],
  mutationFn: verifyEmailOtp,
});

export const resendOtpOption = mutationOptions({
  mutationKey: ["auth", "resend-otp"],
  mutationFn: resendOtp,
});

export const forgotPasswordOption = mutationOptions({
  mutationKey: ["auth", "forgot-password"],
  mutationFn: forgotPassword,
});

export const verifyResetOtpOption = mutationOptions({
  mutationKey: ["auth", "verify-reset-otp"],
  mutationFn: verifyResetOtp,
});

export const resetPasswordOption = mutationOptions({
  mutationKey: ["auth", "reset-password"],
  mutationFn: resetPassword,
});

export const logoutOption = mutationOptions({
  mutationKey: ["auth", "logout"],
  mutationFn: logoutApi,
});

export const getCurrentUserOption = () =>
  queryOptions({
    queryKey: ["auth", "me"],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    staleTime: QueryStaleTime.fiveMins,
  });

export const userQueryOptions = queryOptions({
  queryKey: ["auth", "me"],
  queryFn: ({ signal }) => getCurrentUser({ signal }),
  staleTime: QueryStaleTime.fiveMins,
  retry: false,
});
