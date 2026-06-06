"use client";

import DefaultDashboardView from "@/components/dashboard/templates/DefaultDashboardView";
import TemplatePreviewLayout from "@/components/dashboard/templates/TemplatePreviewLayout";
import { DashboardProfileResponse } from "@/api/profile/profile.type";

export default function DefaultTemplatePreviewPage() {
  const dummyProfile: DashboardProfileResponse = {
    username: "johnsmith",
    fullName: "John Smith",
    bio: "I'm a designer and developer. I build things for the web.",
    photoUrl: "/profile-preview/avatar.png",
    templateType: "Default",
    themeSettings: null,
    isPublished: true,
    hasUnpublishedChanges: false,
    ctaLabel: null,
    ctaUrl: null,
    components: [],
  };

  const dummyContent = {
    profileId: "dummy-1",
    bio: "I'm a designer and developer. I build things for the web.",
    photoUrl: "/profile-preview/avatar.png",
    source: "draft" as const,
    updatedAt: new Date().toISOString(),
    content: {
      sectionOrder: ["bio", "links", "projects", "experience"],
      bio: {
        visible: true,
        content: "I'm a designer and developer. I build things for the web.",
      },
      links: {
        visible: true,
        sectionTitle: "Featured Links",
        items: [
          { id: "link-1", title: "Portfolio", url: "https://john.studio" },
          { id: "link-2", title: "Twitter", url: "https://twitter.com/johnsmith" },
          { id: "link-3", title: "GitHub", url: "https://github.com/johnsmith" },
        ],
      },
      projects: {
        visible: true,
        sectionTitle: "Selected Projects",
        items: [
          {
            id: "proj-1",
            title: "Atlas - Onboarding kit for SaaS",
            description: "A complete design system and onboarding flow",
            buttonText: "View Project",
            url: "#",
            imageSrc: "/profile-preview/feature1.jpg",
          },
          {
            id: "proj-2",
            title: "Field - Mobile Journaling app",
            description: "A calm journaling experience with a custom typography stack.",
            buttonText: "View Project",
            url: "#",
            imageSrc: "/profile-preview/feature2.jpg",
          },
        ],
      },
      cta: {
        visible: true,
        label: "Work with me",
        url: "mailto:hello@example.com",
        title: "Open to new projects.",
        subtitle: "Have an idea or product you're building? I can help you design it the right way.",
      },
    },
  };

  return (
    <TemplatePreviewLayout templateName="Default">
      <DefaultDashboardView profile={dummyProfile} content={dummyContent} />
    </TemplatePreviewLayout>
  );
}
