"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import ProfileOverviewCard from "./ProfileOverviewCard";

import DefaultDashboardView from "./templates/DefaultDashboardView";
import CreatorDashboardView from "./templates/CreatorDashboardView";
import PortfolioDashboardView from "./templates/PortfolioDashboardView";
import ProfessionalDashboardView from "./templates/ProfessionalDashboardView";
import TemplateAppearanceProvider from "./templates/TemplateAppearanceProvider";
import { TemplateSelectionModal } from "./TemplateSelectionModal";

import {
  dashboardProfileOption,
  profileContentOption,
  profileAppearanceOption,
  saveTemplateOption,
} from "@/api/profile/profile.options";
import type {
  ProfileAppearanceSettings,
  TemplateType,
} from "@/api/profile/profile.type";
import { getAppearanceResponseGlobal } from "@/utils/profileAppearance";

export default function DashboardHome() {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateType | null>(
    null
  );

  const dashboardProfile = useQuery(dashboardProfileOption());
  const profileContent = useQuery(profileContentOption());
  const profileAppearance = useQuery(profileAppearanceOption());

  const { mutate: saveTemplate } = useMutation({
    mutationKey: saveTemplateOption.mutationKey,
    mutationFn: saveTemplateOption.mutationFn,
    onSuccess() {
      void profileAppearance.refetch();
      void dashboardProfile.refetch();
      void profileContent.refetch();
    },
    onError(error: unknown) {
      console.error(
        error instanceof Error ? error.message : "Failed to save template."
      );
    },
  });

  const handleTemplateSelection = (selectedTemplate: TemplateType | null) => {
    setPreviewTemplate(selectedTemplate);

    if (selectedTemplate) {
      saveTemplate(selectedTemplate);
    }
  };

  const apiAppearance = getAppearanceResponseGlobal(profileAppearance.data);
  const profile = dashboardProfile.data;
  const content = profileContent.data;
  const isProfileLoading =
    dashboardProfile.isPending || profileAppearance.isPending;
  const isContentLoading = profileContent.isPending;

  // Determine active template and appearance settings
  // 1. Preview template from TemplateSelectionModal takes priority
  // 2. Appearance API
  // 3. Draft content themeSettings
  // 4. Profile templateType fallback
  const themeSettings = (content as Record<string, unknown>)?.themeSettings as
    | Record<string, unknown>
    | undefined;

  const appearanceSettingsData =
    (profileAppearance.data as any)?.appearance ||
    (profileAppearance.data as any)?.data ||
    profileAppearance.data;
  const components = (appearanceSettingsData as any)?.components;

  const appearance =
    apiAppearance || themeSettings || components
      ? ({
          ...(themeSettings ?? {}),
          ...(apiAppearance ?? {}),
          ...(components ? { components } : {}),
        } as ProfileAppearanceSettings)
      : null;

  const rawTemplate =
    previewTemplate || appearance?.template || profile?.templateType;

  const activeTemplateMap: Record<
    string,
    "portfolio" | "professional" | "creator" | "default"
  > = {
    portfolio: "portfolio",
    professional: "professional",
    creator: "creator",
    default: "default",
  };

  const activeTemplate =
    typeof rawTemplate === "string"
      ? activeTemplateMap[rawTemplate.toLowerCase()] || "default"
      : "default";

  const [hasSeenModal, setHasSeenModal] = useState(true);

  useEffect(() => {
    if (profile && !profile.templateType) {
      const storageKey = `hasSeenTemplateModal_${profile.username}`;
      const seen = localStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasSeenModal(Boolean(seen));
      if (!seen) {
        localStorage.setItem(storageKey, "true");
      }
    }
  }, [profile]);

  const hasTemplate = !!profile?.templateType;
  const isFirstTimeUser = !!(profile && !hasTemplate && !hasSeenModal);
  const initialModalTemplate = (
    activeTemplate === "default"
      ? "Default"
      : activeTemplate.charAt(0).toUpperCase() + activeTemplate.slice(1)
  ) as TemplateType;

  return (
    <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-5 overflow-x-hidden xl:grid-cols-[0.75fr_1.25fr] 2xl:max-w-[1480px]">
      {isFirstTimeUser && (
        <TemplateSelectionModal
          initialTemplate={initialModalTemplate}
          defaultOpen={true}
          onPreviewChange={handleTemplateSelection}
        />
      )}

      <div className="flex min-w-0 flex-col gap-4">
        <ProfileOverviewCard
          profile={profile}
          isLoading={isProfileLoading}
          previewTemplate={previewTemplate}
        />
      </div>

      <TemplateAppearanceProvider
        appearance={appearance?.global ?? appearance}
        className="flex min-w-0 flex-col gap-5"
      >
        {activeTemplate === "portfolio" ? (
          <PortfolioDashboardView
            profile={profile}
            content={content}
            appearance={appearance}
            isLoadingProfile={isProfileLoading}
            isLoadingContent={isContentLoading}
          />
        ) : activeTemplate === "professional" ? (
          <ProfessionalDashboardView
            profile={profile}
            content={content}
            appearance={appearance}
            isLoadingProfile={isProfileLoading}
            isLoadingContent={isContentLoading}
          />
        ) : activeTemplate === "creator" ? (
          <CreatorDashboardView
            profile={profile}
            content={content}
            appearance={appearance}
            isLoadingProfile={isProfileLoading}
            isLoadingContent={isContentLoading}
          />
        ) : (
          <DefaultDashboardView
            profile={profile}
            content={content}
            appearance={appearance}
            isLoadingProfile={isProfileLoading}
            isLoadingContent={isContentLoading}
          />
        )}
      </TemplateAppearanceProvider>
    </div>
  );
}
