"use client";
import { getCurrentUserOption } from "@/api/auth/auth.options";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image
        src="/favicon.ico"
        alt="Loading..."
        width={48}
        height={48}
        className="animate-pulse"
      />
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading, isError } = useQuery(getCurrentUserOption());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!user.onboardingComplete && pathname !== "/create-profile") {
      router.replace(
        `/create-profile?returnTo=${encodeURIComponent(pathname)}`
      );
    }
  }, [isLoading, isError, user, pathname, router]);

  if (isLoading) return <FullPageLoader />;
  if (isError || !user) return <FullPageLoader />;
  if (!user.onboardingComplete && pathname !== "/create-profile")
    return <FullPageLoader />;

  return <>{children}</>;
}
