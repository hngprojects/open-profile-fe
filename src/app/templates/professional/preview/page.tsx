"use client";

import ProfessionalDashboardView from "@/components/dashboard/templates/ProfessionalDashboardView";
import TemplatePreviewLayout from "@/components/dashboard/templates/TemplatePreviewLayout";
import { DashboardProfileResponse } from "@/api/profile/profile.type";

export default function ProfessionalTemplatePreviewPage() {
  const dummyProfile: DashboardProfileResponse = {
    username: "johnsmith",
    fullName: "John Smith",
    bio: "Senior Product Designer with 8+ years of experience helping startups and enterprises build intuitive, human-centered products.",
    photoUrl: "/profile-preview/avatar.png",
    templateType: "Professional",
    themeSettings: null,
    isPublished: true,
    hasUnpublishedChanges: false,
    ctaLabel: null,
    ctaUrl: null,
    components: [],
  };

  return (
    <TemplatePreviewLayout templateName="Professional">
      <ProfessionalDashboardView profile={dummyProfile} isPreview={true} />
    </TemplatePreviewLayout>
  );
}
