"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/app/actions/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValid = EMAIL_RE.test(email);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = await forgotPassword(
        undefined,
        new FormData(e.currentTarget)
      );
      toast.success(
        "If an account with that email exists, a reset code has been sent."
      );
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
                email && !EMAIL_RE.test(email) ? "Incorrect email" : ""
              )
            }
            className={`border-input-b placeholder:text-input-text h-11 border bg-[#FAFAFA] shadow-none ${emailError ? "border-red-400" : ""}`}
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <Button
          type="submit"
          disabled={!isValid || pending}
          className="bg-brand h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          {pending ? "Sending…" : "Continue"}
        </Button>
      </form>
    </AuthLayout>
  );
}
