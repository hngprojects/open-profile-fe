"use client";

import CreatorDashboardView from "@/components/dashboard/templates/CreatorDashboardView";
import TemplatePreviewLayout from "@/components/dashboard/templates/TemplatePreviewLayout";
import { DashboardProfileResponse } from "@/api/profile/profile.type";

export default function CreatorTemplatePreviewPage() {
  const dummyProfile: DashboardProfileResponse = {
    username: "johnsmith",
    fullName: "John Smith",
    bio: "I'm a creator focused on the intersection of design, technology, and intentional living.",
    photoUrl: "/profile-preview/avatar.png",
    templateType: "Creator",
    themeSettings: null,
    isPublished: true,
    hasUnpublishedChanges: false,
    ctaLabel: null,
    ctaUrl: null,
    components: [],
  };

  return (
    <TemplatePreviewLayout templateName="Creator">
      <CreatorDashboardView profile={dummyProfile} isPreview={true} />
    </TemplatePreviewLayout>
  );
}
