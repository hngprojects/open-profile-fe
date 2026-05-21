"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PasswordField,
  allPasswordRulesMet,
} from "@/components/auth/PasswordField";
import { resetPasswordOption } from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const searchParams = useSearchParams();

  const isValid =
    allPasswordRulesMet(password) && confirm.length > 0 && password === confirm;

  const resetMutation = useMutation({
    ...resetPasswordOption,
    onSuccess: () => {
      sessionStorage.removeItem("resetToken");
      const email = searchParams.get("email") ?? "";
      router.push(
        `/forgot-password/success${email ? `?email=${encodeURIComponent(email)}` : ""}`
      );
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Password reset failed."),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currentToken =
      (typeof window !== "undefined"
        ? sessionStorage.getItem("resetToken")
        : null) || searchParams.get("token");

    if (!currentToken) {
      toast.error("Invalid or missing reset token. Please request a new link.");
      return;
    }
    resetMutation.mutate({ resetToken: currentToken, newPassword: password });
  }

  return (
    <AuthLayout>
      <div className="mb-2 text-center">
        <h1 className="text-primary text-2xl font-bold">Reset Password</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose a new password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PasswordField
          value={password}
          onChange={setPassword}
          showRules
          autoComplete="new-password"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-label-text text-sm font-medium">
            Confirm Password
          </label>
          <Input
            name="confirm"
            type="password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              if (confirmError) setConfirmError("");
            }}
            onBlur={() =>
              setConfirmError(
                confirm && password !== confirm ? "Passwords do not match" : ""
              )
            }
            className={`border-input-b placeholder:text-input-text h-11 border bg-[#FAFAFA] shadow-none ${confirmError ? "border-red-400" : ""}`}
          />
          {confirmError && (
            <p className="text-xs text-red-500">{confirmError}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid || resetMutation.isPending}
          className="bg-brand h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          {resetMutation.isPending ? "Resetting…" : "Continue"}
        </Button>
      </form>
    </AuthLayout>
  );
}
