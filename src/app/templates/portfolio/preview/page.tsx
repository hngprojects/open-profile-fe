"use client";

import PortfolioDashboardView from "@/components/dashboard/templates/PortfolioDashboardView";
import TemplatePreviewLayout from "@/components/dashboard/templates/TemplatePreviewLayout";
import { DashboardProfileResponse } from "@/api/profile/profile.type";

export default function PortfolioTemplatePreviewPage() {
  const dummyProfile: DashboardProfileResponse = {
    username: "johnsmith",
    fullName: "John Smith",
    bio: "I help teams craft thoughtful, user-centered products — from the first sketch to a polished design system.",
    photoUrl: "/profile-preview/avatar.png",
    templateType: "Portfolio",
    themeSettings: null,
    isPublished: true,
    hasUnpublishedChanges: false,
    ctaLabel: null,
    ctaUrl: null,
    components: [],
  };

  return (
    <TemplatePreviewLayout templateName="Portfolio">
      <PortfolioDashboardView profile={dummyProfile} isPreview={true} />
    </TemplatePreviewLayout>
  );
}
