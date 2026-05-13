"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  PasswordField,
  allPasswordRulesMet,
} from "@/components/auth/PasswordField";
import { loginOption, signupOption } from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  mode: "login" | "signup";
  googleAuthUrl: string;
};

export function AuthForm({ mode, googleAuthUrl }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const isSignup = mode === "signup";

  const isValid: boolean = isSignup
    ? name.trim().split(/\s+/).length >= 2 &&
      EMAIL_RE.test(email) &&
      allPasswordRulesMet(password)
    : EMAIL_RE.test(email) && password.length > 0;

  const loginMutation = useMutation({
    ...loginOption,
    onSuccess: async () => {
      router.replace(returnTo?.startsWith("/") ? returnTo : "/dashboard");
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Login failed."),
  });

  const signupMutation = useMutation({
    ...signupOption,
    onSuccess: () => {
      router.replace(`/verify-email?email=${encodeURIComponent(email)}`);
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Signup failed."),
  });

  const pending = loginMutation.isPending || signupMutation.isPending;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSignup) {
      signupMutation.mutate({ fullName: name, email, password });
    } else {
      loginMutation.mutate({ email, password });
    }
  }

  const inputClass =
    "h-11 bg-[#FAFAFA] border border-input-b shadow-none placeholder:text-input-text";

  return (
    <AuthLayout>
      <div className="mb-1 text-center">
        <h1 className="text-2xl font-bold text-[#050505]">
          {isSignup ? "Join Openprofile" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isSignup
            ? "Create a verified profile that tells the world exactly who you are"
            : "Sign in to your Openprofile account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <div className="flex flex-col gap-1.5">
            <label className="text-label-text text-sm font-medium">
              Full Name
            </label>
            <Input
              name="name"
              placeholder="Enter your name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() =>
                setNameError(
                  name.trim().split(/\s+/).length < 2
                    ? "Enter first and last name"
                    : ""
                )
              }
              className={`${inputClass} ${nameError ? "border-red-400" : ""}`}
            />
            {nameError && <p className="text-xs text-red-500">{nameError}</p>}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-label-text text-sm font-medium">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setEmailError(
                email && !EMAIL_RE.test(email) ? "Incorrect email" : ""
              )
            }
            className={`${inputClass} ${emailError ? "border-red-400" : ""}`}
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <PasswordField
          value={isSignup ? password : undefined}
          onChange={isSignup ? setPassword : () => {}}
          required={isSignup}
          showRules={isSignup}
          autoComplete={isSignup ? "new-password" : "current-password"}
        />

        {!isSignup && (
          <div className="-mt-2 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-link-hover-text text-sm font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          disabled={pending || (isSignup && !isValid)}
          className={`mt-1 h-[52px] w-full rounded-[10px] text-[16px] font-medium shadow-none transition-colors ${
            isSignup && !isValid
              ? "border-button-b text-label-text border bg-white"
              : "bg-brand-hover-bg border-0 text-[#FEFEFE] hover:bg-[#065E69]"
          }`}
        >
          {pending ? "Please wait…" : "Continue"}
        </Button>
      </form>

      {isSignup && (
        <p className="text-label-text text-center text-xs">
          By Continuing, you agree to Openprofile&apos;s{" "}
          <Link
            href="/privacy"
            className="text-link-hover-text font-semibold hover:underline"
          >
            privacy policy
          </Link>
          , and{" "}
          <Link
            href="/terms"
            className="text-link-hover-text font-semibold hover:underline"
          >
            Terms and Conditions
          </Link>
        </p>
      )}

      <div className="text-label-text text-center text-xs">OR</div>

      <a
        href={googleAuthUrl}
        className="border-input-b flex h-11 w-full items-center justify-center gap-3 rounded-lg border bg-[#FAFAFA] text-sm font-medium transition-colors hover:bg-[#f0f0f0]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
            fill="#4285F4"
          />
          <path
            d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
            fill="#34A853"
          />
          <path
            d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
            fill="#EA4335"
          />
        </svg>
        {isSignup ? "Sign up with Google" : "Continue with Google"}
      </a>

      <p className="text-center text-sm text-gray-500">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-link-hover-text font-medium hover:underline"
            >
              Sign In here
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-link-hover-text font-medium hover:underline"
            >
              Sign up here
            </Link>
          </>
        )}
      </p>
    </AuthLayout>
  );
}
