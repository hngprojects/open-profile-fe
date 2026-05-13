"use server";
import { redirect } from "next/navigation";
import * as authService from "@/api/auth/auth.service";
import { isApiError } from "@/api/base";

function extractError(err: unknown, fallback: string): string {
  if (isApiError(err)) {
    return err.message;
  }
  return fallback;
}

export type AuthState = { error?: string; redirectTo?: string } | undefined;
export type AuthAction = {
  status?: string;
  resetToken?: string;
  error?: string;
  redirectTo?: string;
  success?: boolean;
};

export async function deleteSessionAction() {
  redirect("/login");
}

export async function forgotPassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required." };

  try {
    await authService.forgotPassword({ email });
    return {
      redirectTo: `/forgot-password/verify?email=${encodeURIComponent(email)}`,
    };
  } catch (err) {
    return { error: extractError(err, "Failed to send reset email.") };
  }
}

export async function verifyResetOtp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthAction> {
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;

  if (!email || !otp)
    return { status: "error", error: "Missing email or code." };

  try {
    const data = await authService.verifyResetOtp({ email, otp });
    return {
      status: "success",
      resetToken: data.resetToken,
      redirectTo: `/forgot-password/reset?token=${encodeURIComponent(data.resetToken)}&email=${encodeURIComponent(email)}`,
    };
  } catch (err) {
    return {
      status: "error",
      error: extractError(err, "Verification failed."),
    };
  }
}

export async function resetPassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const resetToken = formData.get("resetToken") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!resetToken || !newPassword) return { error: "Missing required fields." };

  try {
    await authService.resetPassword({ resetToken, newPassword });
    return { redirectTo: "/forgot-password/success" };
  } catch (err) {
    return { error: extractError(err, "Password reset failed.") };
  }
}

export async function resendOtp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthAction> {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required." };

  try {
    const data = await authService.resendOtp({ email });
    return { success: true, ...data };
  } catch (err) {
    return { error: extractError(err, "Failed to resend OTP.") };
  }
}

export async function verifyEmailOtp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;

  if (!email || !otp) return { error: "Missing email or code." };

  try {
    await authService.verifyEmailOtp({ email, otp });
    return { redirectTo: "/verify-email/success" };
  } catch (err) {
    return { error: extractError(err, "Verification failed.") };
  }
}

export async function logout() {
  try {
    await authService.logoutApi();
  } catch (_err) {
    // Ignored
  }
  redirect("/login");
}

export async function refreshToken() {
  try {
    await authService.refreshTokenApi({ refreshToken: "" });
    return { success: true };
  } catch (_err) {
    return { error: "Session expired." };
  }
}
