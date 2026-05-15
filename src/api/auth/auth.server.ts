import "server-only";
import { callApiServer } from "@/api/base/base.server";

export function forgotPassword(data: { email: string }) {
  return callApiServer<{ message: string }>({
    url: "/auth/forgot-password",
    method: "POST",
    data,
  });
}

export function verifyResetOtp(data: { email: string; otp: string }) {
  return callApiServer<{ resetToken: string }>({
    url: "/auth/verify-reset-otp",
    method: "POST",
    data,
  });
}

export function resetPassword(data: {
  resetToken: string;
  newPassword: string;
}) {
  return callApiServer<{ message: string }>({
    url: "/auth/reset-password",
    method: "POST",
    data,
  });
}

export function verifyEmailOtp(data: { email: string; otp: string }) {
  return callApiServer<{ message: string }>({
    url: "/auth/verify-otp",
    method: "POST",
    data,
  });
}

export function resendOtp(data: { email: string }) {
  return callApiServer<{ message: string }>({
    url: "/auth/resend-otp",
    method: "POST",
    data,
  });
}

export function logoutApi() {
  return callApiServer<void>({ url: "/auth/logout", method: "POST" });
}

export function refreshTokenApi(data: { refreshToken: string }) {
  return callApiServer<{ accessToken: string; refreshToken: string }>({
    url: "/auth/refresh-token",
    method: "POST",
    data,
  });
}
