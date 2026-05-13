"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PasswordField,
  allPasswordRulesMet,
} from "@/components/auth/PasswordField";
import { resetPassword } from "@/app/actions/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const isValid =
    allPasswordRulesMet(password) && confirm.length > 0 && password === confirm;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData();
    formData.append("resetToken", token);
    formData.append("newPassword", password);
    try {
      const result = await resetPassword(undefined, formData);
      if (result?.redirectTo) router.push(result.redirectTo);
      else if (result?.error) toast.error(result.error);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
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
        <input type="hidden" name="token" value={token} />

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
          disabled={!isValid || pending}
          className="bg-brand h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          {pending ? "Resetting…" : "Continue"}
        </Button>
      </form>
    </AuthLayout>
  );
}
