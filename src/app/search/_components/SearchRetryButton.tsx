"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchRetryButton() {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  function handleRetry() {
    setIsRetrying(true);
    router.refresh(); // Triggers a re-fetch of Server Components

    // We optionally remove the loading state after a delay because
    // router.refresh doesn't easily give us a promise resolving when done.
    setTimeout(() => setIsRetrying(false), 1000);
  }

  return (
    <button
      onClick={handleRetry}
      disabled={isRetrying}
      className="border-secondary-b text-primary-text bg-background flex items-center gap-2 rounded-[8px] border px-6 py-2.5 font-medium transition-colors hover:bg-[#F5F5F5] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />
      {isRetrying ? "Retrying..." : "Retry Search"}
    </button>
  );
}
