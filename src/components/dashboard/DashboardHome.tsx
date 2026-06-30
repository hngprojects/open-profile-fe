"use client";

import { useQuery } from "@tanstack/react-query";

import ProfileOverviewCard from "./ProfileOverviewCard";

import DefaultDashboardView from "./templates/DefaultDashboardView";
import CreatorDashboardView from "./templates/CreatorDashboardView";
import PortfolioDashboardView from "./templates/PortfolioDashboardView";
import ProfessionalDashboardView from "./templates/ProfessionalDashboardView";
import TemplateAppearanceProvider from "./templates/TemplateAppearanceProvider";

import {
  dashboardProfileOption,
  profileContentOption,
  profileAppearanceOption,
} from "@/api/profile/profile.options";
import type { ProfileAppearanceSettings } from "@/api/profile/profile.type";
import { getAppearanceResponseGlobal } from "@/utils/profileAppearance";

export default function DashboardHome() {
  const dashboardProfile = useQuery(dashboardProfileOption());
  const profileContent = useQuery(profileContentOption());
  const profileAppearance = useQuery(profileAppearanceOption());

  const apiAppearance = getAppearanceResponseGlobal(profileAppearance.data);
  const profile = dashboardProfile.data;
  const content = profileContent.data;
  const isProfileLoading =
    dashboardProfile.isPending || profileAppearance.isPending;
  const isContentLoading = profileContent.isPending;

  // Determine active template and appearance settings
  // 1. Appearance API
  // 2. Draft content themeSettings
  // 3. Profile templateType fallback
  const themeSettings = (content as Record<string, unknown>)?.themeSettings as
    | Record<string, unknown>
    | undefined;

  const appearanceSettingsData =
    (profileAppearance.data as Record<string, unknown>)?.appearance ||
    (profileAppearance.data as Record<string, unknown>)?.data ||
    profileAppearance.data;
  const components = (appearanceSettingsData as Record<string, unknown>)
    ?.components;

  const appearance =
    apiAppearance || themeSettings || components
      ? ({
          ...(themeSettings ?? {}),
          ...(apiAppearance ?? {}),
          ...(components ? { components } : {}),
        } as ProfileAppearanceSettings)
      : null;

  const rawTemplate = appearance?.template || profile?.templateType;

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

  return (
    <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-5 overflow-x-hidden xl:grid-cols-[0.75fr_1.25fr] 2xl:max-w-[1480px]">
      <div className="flex min-w-0 flex-col gap-4">
        <ProfileOverviewCard profile={profile} isLoading={isProfileLoading} />
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
