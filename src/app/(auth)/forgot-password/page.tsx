"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPasswordOption } from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValid = EMAIL_RE.test(email);

  const forgotMutation = useMutation({
    ...forgotPasswordOption,
    onSuccess: () => {
      toast.success(
        "If an account with that email exists, a reset code has been sent."
      );
      router.push(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
    },
    onError: (err) =>
      toast.error(
        isApiError(err) ? err.message : "Failed to send reset email."
      ),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    forgotMutation.mutate({ email });
  }

  return (
    <AuthLayout>
      <div className="mb-2 text-center">
        <h1 className="text-primary text-2xl font-bold">Forgot Password</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your email address and we&apos;ll send you a reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-label-text text-sm font-medium">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setEmailError(
                email && !EMAIL_RE.test(email)
                  ? "Please enter a valid email address."
                  : ""
              )
            }
            className={`border-input-b placeholder:text-input-text h-11 border bg-[#FAFAFA] shadow-none ${emailError ? "border-red-400" : ""}`}
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <Button
          type="submit"
          disabled={!isValid || forgotMutation.isPending}
          className="bg-brand h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          {forgotMutation.isPending ? "Sending…" : "Continue"}
        </Button>
      </form>
    </AuthLayout>
  );
}
