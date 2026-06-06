import ProfileBuilderContent from "@/components/dashboard/profile-builder/ProfileBuilderContent";
import { Suspense } from "react";

export default function CanvasPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileBuilderContent />
    </Suspense>
  );
}
