import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  User,
} from "@/api/auth/auth.type";
import { ApiOptions, callApi } from "@/api/base";

export function login(data: LoginRequest) {
  return callApi<LoginResponse>({ url: "/auth/login", method: "POST", data });
}

export function signup(data: SignupRequest) {
  return callApi<SignupResponse>({
    url: "/auth/register",
    method: "POST",
    data,
  });
}

export function getCurrentUser({ signal, token }: ApiOptions) {
  return callApi<User>({
    url: "/auth/me",
    method: "GET",
    signal,
    silent: true,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  });
}

export function verifyEmailOtp(data: { email: string; otp: string }) {
  return callApi<{ message: string }>({
    url: "/auth/verify-otp",
    method: "POST",
    data,
  });
}

export function resendOtp(data: { email: string }) {
  return callApi<{ message: string }>({
    url: "/auth/resend-otp",
    method: "POST",
    data,
  });
}

export function forgotPassword(data: { email: string }) {
  return callApi<{ message: string }>({
    url: "/auth/forgot-password",
    method: "POST",
    data,
  });
}

export function verifyResetOtp(data: { email: string; otp: string }) {
  return callApi<{ resetToken: string }>({
    url: "/auth/verify-reset-otp",
    method: "POST",
    data,
  });
}

export function resetPassword(data: {
  resetToken: string;
  newPassword: string;
}) {
  return callApi<{ message: string }>({
    url: "/auth/reset-password",
    method: "POST",
    data,
  });
}

export function logoutApi() {
  return callApi<void>({ url: "/auth/logout", method: "POST" });
}
