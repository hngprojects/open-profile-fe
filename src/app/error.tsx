"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        An unexpected error occurred. Please try again.
      </p>
      {error.digest ? (
        <code className="text-muted-foreground bg-muted rounded px-2 py-1 text-xs">
          ref: {error.digest}
        </code>
      ) : null}
      <Button
        variant={null}
        type="button"
        onClick={() => unstable_retry()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
      >
        Try again
      </Button>
    </main>
  );
}
