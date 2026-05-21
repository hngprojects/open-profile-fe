"use client";

import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

export default function ResetPasswordSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";
  const loginHref = email
    ? `/login?email=${encodeURIComponent(email)}`
    : "/login";

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-5 py-4">
        <BadgeCheck size={80} className="text-link-hover-text" />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#050505]">
            Password Reset Successful
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Your password has been reset. You can now sign in with your new
            password.
          </p>
        </div>

        <Button
          asChild
          className="bg-brand-hover-bg h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none hover:bg-[#065E69]"
        >
          <Link href={loginHref}>Continue</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
