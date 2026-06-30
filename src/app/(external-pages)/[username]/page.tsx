import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  type ProfileResponse,
  type ProfileAppearanceSettings,
} from "@/api/profile/profile.type";
import { env as serverEnv } from "@/env/server";
import CreatorDashboardView from "@/components/dashboard/templates/CreatorDashboardView";
import ProfessionalDashboardView from "@/components/dashboard/templates/ProfessionalDashboardView";
import PortfolioDashboardView from "@/components/dashboard/templates/PortfolioDashboardView";
import DefaultDashboardView from "@/components/dashboard/templates/DefaultDashboardView";
import TemplateAppearanceProvider from "@/components/dashboard/templates/TemplateAppearanceProvider";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ username: string }>;
};

type LegacyContent = {
  themeSettings?: unknown;
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  const res = await fetch(
    `${serverEnv.API_BASE_URL}/api/v1/profiles/${encodeURIComponent(username)}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const json = await res.json();
  const profile: ProfileResponse = json.data ?? json;

  const content = profile.content;

  type PublicProfileAppearance = {
    template?: string;
    accentColour?: string;
    iconColor?: string;
    textColor?: string;
    textColour?: string;
    bgColor?: string;
    backgroundColour?: string;
    font?: string;
    cornerStyle?: string;
    borderRadius?: "sharp" | "rounded" | "pill";
    spacing?: number;
    theme?: "light" | "dark";
  };

  const mapCornerStyleToRadius = (
    cornerStyle?: unknown
  ): "sharp" | "rounded" | "pill" | undefined => {
    if (cornerStyle === "sharp") return "sharp";
    if (cornerStyle === "rounded") return "rounded";
    if (cornerStyle === "pill") return "pill";
    if (cornerStyle === "medium") return "rounded";
    if (cornerStyle === "round") return "pill";
    return undefined;
  };

  const appearanceObj = (profile.appearance ||
    profile.themeSettings ||
    (content as LegacyContent | null)?.themeSettings ||
    {}) as Record<string, unknown>;

  const rawAppearance = (
    appearanceObj && "global" in appearanceObj && appearanceObj.global
      ? appearanceObj.global
      : appearanceObj
  ) as PublicProfileAppearance;

  const themeSettings: PublicProfileAppearance = {
    ...rawAppearance,
    iconColor: rawAppearance.iconColor ?? rawAppearance.accentColour,
    borderRadius:
      rawAppearance.borderRadius ??
      mapCornerStyleToRadius(rawAppearance.cornerStyle),
  };

  const rawTemplate =
    rawAppearance.template || profile.templateType || "default";

  const activeTemplateMap: Record<string, string> = {
    portfolio: "portfolio",
    professional: "professional",
    creator: "creator",
    default: "default",
  };

  const activeTemplate =
    typeof rawTemplate === "string"
      ? activeTemplateMap[rawTemplate.toLowerCase()] || "default"
      : "default";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dashboardProfile: any = {
    ...profile,
    isPublished: true,
    hasUnpublishedChanges: false,
    ctaLabel: null,
    ctaUrl: null,
    components: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profileContent: any = {
    profileId: profile.id || "",
    bio: profile.bio,
    photoUrl: profile.photoUrl,
    content: profile.content,
    source: "published",
    updatedAt: new Date().toISOString(),
  };

  const renderTemplateView = () => {
    switch (activeTemplate) {
      case "creator":
        return (
          <CreatorDashboardView
            profile={dashboardProfile}
            content={profileContent}
            appearance={themeSettings as unknown as ProfileAppearanceSettings}
          />
        );
      case "professional":
        return (
          <ProfessionalDashboardView
            profile={dashboardProfile}
            content={profileContent}
            appearance={themeSettings as unknown as ProfileAppearanceSettings}
          />
        );
      case "portfolio":
        return (
          <PortfolioDashboardView
            profile={dashboardProfile}
            content={profileContent}
            appearance={themeSettings as unknown as ProfileAppearanceSettings}
          />
        );
      default:
        return (
          <DefaultDashboardView
            profile={dashboardProfile}
            content={profileContent}
            appearance={themeSettings as unknown as ProfileAppearanceSettings}
          />
        );
    }
  };

  return (
    <TemplateAppearanceProvider
      appearance={themeSettings}
      className="flex min-h-screen w-full flex-col"
    >
      <div className="relative z-50 flex w-full shrink-0 justify-center py-6">
        <Link href="/">
          <Image
            src="/auth/logo.png"
            alt="Open.Profile"
            width={120}
            height={28}
            className="object-contain drop-shadow-sm transition-opacity hover:opacity-80 dark:invert"
            priority
          />
        </Link>
      </div>
      <div className="flex-1">{renderTemplateView()}</div>
    </TemplateAppearanceProvider>
  );
}
