"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  PasswordField,
  allPasswordRulesMet,
} from "@/components/auth/PasswordField";
import {
  loginOption,
  signupOption,
  userQueryOptions,
} from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";
import { Checkbox } from "../ui/checkbox";
import { ROUTES } from "@/constants/routes";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  mode: "login" | "signup";
  googleAuthUrl: string;
};

export function AuthForm({ mode, googleAuthUrl }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isSignup = mode === "signup";

  const loginMutation = useMutation({
    ...loginOption,
    onSuccess: async (data) => {
      await queryClient.resetQueries({ queryKey: userQueryOptions.queryKey });
      const onboardingComplete = data?.user?.onboardingComplete;
      const destination = onboardingComplete ? "/dashboard" : "/create-profile";
      router.replace(returnTo?.startsWith("/") ? returnTo : destination);
    },
    onError: (err) => {
      const isNetworkError =
        !navigator.onLine || (isApiError(err) && !err.status);
      toast.error(
        isNetworkError
          ? "Something went wrong. Please try again."
          : isApiError(err)
            ? err.message
            : "Login failed."
      );
    },
  });

  const signupMutation = useMutation({
    ...signupOption,
    onSuccess: () => {
      router.replace(`/verify-email?email=${encodeURIComponent(email)}`);
    },
    onError: (err) => {
      const isNetworkError =
        !navigator.onLine || (isApiError(err) && !err.status);
      toast.error(
        isNetworkError
          ? "Something went wrong. Please try again."
          : isApiError(err)
            ? err.message
            : "Signup failed."
      );
    },
  });

  const pending = loginMutation.isPending || signupMutation.isPending;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!navigator.onLine) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    let hasError = false;

    if (isSignup) {
      if (!email) {
        setEmailError("Email is required");
        hasError = true;
      } else if (!EMAIL_RE.test(email)) {
        setEmailError("Incorrect email");
        hasError = true;
      }

      if (!password) {
        setPasswordError("Password is required");
        hasError = true;
      } else if (!allPasswordRulesMet(password)) {
        setPasswordError("Password does not meet all requirements");
        hasError = true;
      }
    } else {
      if (!email) {
        setEmailError("Email is required");
        hasError = true;
      } else if (!EMAIL_RE.test(email)) {
        setEmailError("Incorrect email");
        hasError = true;
      }

      if (!password) {
        setPasswordError("Password is required");
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    if (isSignup) {
      signupMutation.mutate({
        email,
        password,
      });
    } else {
      loginMutation.mutate({ email, password });
    }
  }

  const inputClass =
    "h-11 bg-[#FAFAFA] border border-input-b shadow-none placeholder:text-input-text";

  return (
    <AuthLayout>
      <div className="mb-1 text-center">
        <h1 className="text-primary-text text-3xl font-bold">
          {isSignup ? "Join Openprofile" : "Welcome back"}
        </h1>
        <p className="mt-1 text-lg text-gray-500">
          {isSignup
            ? "Create a verified profile that tells the world exactly who you are"
            : "Sign in to your Openprofile account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-label-text font-medium">Email Address</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            onBlur={() =>
              setEmailError(
                !email
                  ? "Email is required"
                  : !EMAIL_RE.test(email)
                    ? "Incorrect email"
                    : ""
              )
            }
            className={`${inputClass} ${emailError ? "border-red-400" : ""}`}
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <PasswordField
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (passwordError) setPasswordError("");
          }}
          required
          showRules={isSignup}
          autoComplete={isSignup ? "new-password" : "current-password"}
          error={passwordError}
          onBlur={() =>
            setPasswordError(
              !password
                ? "Password is required"
                : isSignup && !allPasswordRulesMet(password)
                  ? "Password does not meet all requirements"
                  : ""
            )
          }
        />

        {!isSignup && (
          <div className="-mt-2 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-link-hover-text font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}
        {isSignup && (
          <div className="flex items-start justify-center gap-3">
            <Checkbox
              id="toggle-checkbox"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
              className="h-5 w-5 cursor-pointer border-gray-500"
            />
            <label
              htmlFor="toggle-checkbox"
              className="text-label-text cursor-pointer text-left text-sm leading-tight"
            >
              By continuing, you agree to Openprofile&apos;s{" "}
              <Link
                href={ROUTES.public.privacy}
                className="text-link-hover-text font-semibold hover:underline"
              >
                privacy policy
              </Link>
              , and{" "}
              <Link
                href={ROUTES.public.terms}
                className="text-link-hover-text font-semibold hover:underline"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
        )}
        <Button
          type="submit"
          disabled={pending || !email || !password || (isSignup && !agreed)}
          className={`mt-1 h-13 w-full rounded-[10px] text-base font-medium shadow-none transition-colors ${
            pending || !email || !password
              ? "border-button-b text-label-text border bg-white"
              : "bg-brand-hover-bg hover:bg-brand border-0 text-white"
          }`}
        >
          {pending ? "Please wait…" : "Continue"}
        </Button>
      </form>

      <div className="text-label-text text-center text-xs">OR</div>

      <a
        href={googleAuthUrl}
        className="border-input-b hover:bg-hover-bg bg-primary-bg flex h-11 w-full items-center justify-center gap-3 rounded-lg border font-medium transition-colors"
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

      <p className="text-center text-gray-500">
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
