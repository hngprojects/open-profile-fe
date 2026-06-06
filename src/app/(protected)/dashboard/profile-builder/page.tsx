import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import ProfileBuilderContent from "@/components/dashboard/profile-builder/ProfileBuilderContent";
import { Suspense } from "react";

export default function ProfileBuilderPage() {
  return (
    <div className="flex h-screen w-full flex-col bg-[#FAFAFA] overflow-hidden">
      <DashboardTopbar />
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileBuilderContent />
      </Suspense>
    </div>
  );
}
