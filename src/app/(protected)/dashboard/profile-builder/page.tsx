import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import ProfileBuilderContent from "@/components/dashboard/profile-builder/ProfileBuilderContent";
import { ProfileBuilderPublishStateProvider } from "@/components/dashboard/profile-builder/profile-builder-publish-state";
import { Suspense } from "react";

export default function ProfileBuilderPage() {
  return (
    <ProfileBuilderPublishStateProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden bg-[#FAFAFA]">
        <DashboardTopbar />
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileBuilderContent />
        </Suspense>
      </div>
    </ProfileBuilderPublishStateProvider>
  );
}
