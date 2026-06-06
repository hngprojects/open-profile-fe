"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  dashboardProfileOption,
  profileContentOption,
  draftStateOption,
  upsertDraftOption,
  updateProfileAppearanceOption,
  profileAppearanceOption,
} from "@/api/profile/profile.options";
import { upsertDraft } from "@/api/profile/profile.service";
import LeftSidebar from "./LeftSidebar";
import PreviewCanvas from "./PreviewCanvas";
import RightPanel from "./RightPanel";
import Link from "next/link";
import type { Section } from "./types";
import { THEME_DEFAULTS } from "@/constants/theme";
import type {
  ProfileAppearanceCornerStyle,
  ProfileAppearanceFont,
  UpsertDraftResponse,
} from "@/api/profile/profile.type";
import { contentToSections, sectionsToContent } from "./builder.utils";
import { isApiError } from "@/api/base";
import { ROUTES } from "@/constants/routes";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const createSection = (type: string, customTitle?: string): Section | null => {
  const allowedTypes: Record<string, Section["type"]> = {
    bio: "bio",
    links: "links",
    projects: "projects",
    experience: "experience",
    cta: "experience",
  };

  const resolvedType = allowedTypes[type];
  if (!resolvedType) return null;

  const stableIds: Record<string, string> = {
    bio: "bio",
    links: "links",
    projects: "projects",
    experience: "cta",
    cta: "cta",
  };

  const title =
    customTitle ||
    (resolvedType === "links"
      ? "Links"
      : resolvedType === "projects"
        ? "Portfolio"
        : resolvedType === "bio"
          ? "Profile"
          : "CTA");

  return {
    id: stableIds[type] ?? Math.random().toString(36).substring(2, 11),
    title,
    type: resolvedType,
    visible: true,
    subtitle:
      resolvedType === "links"
        ? ""
        : resolvedType === "experience"
          ? ""
          : undefined,
    links: resolvedType === "links" ? [] : undefined,
    projects: resolvedType === "projects" ? [] : undefined,
    layout: resolvedType === "experience" ? "1" : undefined,
    buttonText:
      resolvedType === "experience" ? "Start a Conversation" : undefined,
    url: resolvedType === "experience" ? "" : undefined,
    iconId: resolvedType === "experience" ? "chat" : undefined,
    iconSrc:
      resolvedType === "experience"
        ? "/profilebuilder_home/icons/chat.svg"
        : undefined,
    iconLabel: resolvedType === "experience" ? "Chat" : undefined,
  };
};

const normalizeColorForApi = (color: string) => {
  if (!color) return "#087583";

  if (color.startsWith("#")) return color;

  const hex = color.split("_")[0];

  return `#${hex}`;
};

const mapFontToApi = (font: string): ProfileAppearanceFont => {
  const fontMap: Record<string, ProfileAppearanceFont> = {
    Afacad: "afacad",
    Inter: "inter",
    "Inter Sans": "inter",
    Serif: "serif",
    "Playfair Serif": "serif",
    Mono: "mono",
    "Roboto Mono": "mono",
    Geologica: "geologica",
    Manrope: "manrope",
  };

  return fontMap[font] ?? "afacad";
};

const mapCornerStyleToApi = (
  borderRadius: "sharp" | "rounded" | "pill"
): ProfileAppearanceCornerStyle => {
  return borderRadius;
};

const clampSpacingForApi = (spacing: number) => {
  return Math.min(Math.max(spacing, 0), 40);
};

const mapFontFromApi = (font: string) => {
  const fontMap: Record<ProfileAppearanceFont, string> = {
    afacad: "Afacad",
    inter: "Inter",
    serif: "Serif",
    mono: "Mono",
    geologica: "Geologica",
    manrope: "Manrope",
  };

  return fontMap[font as ProfileAppearanceFont] ?? "Afacad";
};

const mapCornerStyleFromApi = (cornerStyle: string) => {
  const cornerStyleMap: Record<string, "sharp" | "rounded" | "pill"> = {
    sharp: "sharp",
    medium: "rounded",
    rounded: "rounded",
    round: "pill",
    pill: "pill",
  };

  return cornerStyleMap[cornerStyle] ?? "rounded";
};

export default function ProfileBuilderContent() {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    sectionParam ?? null
  );

  const dashboardProfile = useQuery(dashboardProfileOption());
  const profileContent = useQuery(profileContentOption());
  const draftState = useQuery(draftStateOption());

  const profileAppearance = useQuery(profileAppearanceOption());

  const profile = dashboardProfile.data;

  const isLoading =
    dashboardProfile.isPending ||
    profileContent.isPending ||
    draftState.isPending ||
    profileAppearance.isPending;

  const [font, setFont] = useState("Afacad");
  const [textColor, setTextColor] = useState<string>(THEME_DEFAULTS.TEXT_COLOR);
  const [bgColor, setBgColor] = useState<string>(THEME_DEFAULTS.BG_COLOR);
  const [iconColor, setIconColor] = useState<string>(
    THEME_DEFAULTS.ACCENT_COLORS.DEFAULT
  );
  const [spacing, setSpacing] = useState(20);
  const [borderRadius, setBorderRadius] = useState<
    "sharp" | "rounded" | "pill"
  >("rounded");

  const [appearanceTheme, setAppearanceTheme] = useState<"light" | "dark">(
    "light"
  );

  const [template, setTemplate] = useState<string>("creator");
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);

  const contentLoadedRef = useRef(false);
  const userEditedRef = useRef(false);
  const appearanceHydratingRef = useRef(false);
  const appearanceEditedRef = useRef(false);
  const draftUpdatedAtRef = useRef<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appearanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isAppearanceReady =
      profileAppearance.isSuccess || profileAppearance.isError;

    if (
      contentLoadedRef.current ||
      !profileContent.isSuccess ||
      !draftState.isSuccess ||
      !dashboardProfile.isSuccess ||
      !isAppearanceReady
    ) {
      return;
    }

    contentLoadedRef.current = true;
    const loadedSections = contentToSections(
      profileContent.data,
      dashboardProfile.data
    );

    const appearanceSettingsData =
      profileAppearance.data?.appearance ??
      profileAppearance.data?.data ??
      null;

    const components = appearanceSettingsData?.components;
    if (components) {
      loadedSections.forEach((section) => {
        const componentKey =
          section.type === "experience" ? "cta" : section.type;
        const compApp = components[componentKey] as
          | {
              backgroundColour?: string;
              bgColor?: string;
              textColour?: string;
              textColor?: string;
              accentColour?: string;
              iconColor?: string;
            }
          | undefined;
        if (compApp) {
          if (compApp.backgroundColour)
            section.bgColor = compApp.backgroundColour;
          else if (compApp.bgColor) section.bgColor = compApp.bgColor;

          if (compApp.textColour) section.textColor = compApp.textColour;
          else if (compApp.textColor) section.textColor = compApp.textColor;

          if (compApp.accentColour) section.iconColor = compApp.accentColour;
          else if (compApp.iconColor) section.iconColor = compApp.iconColor;
        }
      });
    }

    const appearanceSettings =
      appearanceSettingsData?.global ?? appearanceSettingsData;

    if (appearanceSettings) {
      appearanceHydratingRef.current = true;

      queueMicrotask(() => {
        if (typeof appearanceSettings.font === "string") {
          setFont(mapFontFromApi(appearanceSettings.font));
        }

        if (typeof appearanceSettings.textColour === "string") {
          setTextColor(appearanceSettings.textColour);
        } else if (typeof appearanceSettings.textColor === "string") {
          setTextColor(appearanceSettings.textColor);
        }

        if (typeof appearanceSettings.backgroundColour === "string") {
          setBgColor(appearanceSettings.backgroundColour);
        } else if (typeof appearanceSettings.bgColor === "string") {
          setBgColor(appearanceSettings.bgColor);
        }

        if (typeof appearanceSettings.accentColour === "string") {
          setIconColor(appearanceSettings.accentColour);
        }

        if (
          typeof appearanceSettings.spacing === "number" &&
          Number.isFinite(appearanceSettings.spacing)
        ) {
          setSpacing(appearanceSettings.spacing);
        }

        if (typeof appearanceSettings.cornerStyle === "string") {
          setBorderRadius(
            mapCornerStyleFromApi(appearanceSettings.cornerStyle)
          );
        }

        if (
          appearanceSettings.theme === "light" ||
          appearanceSettings.theme === "dark"
        ) {
          setAppearanceTheme(appearanceSettings.theme);
        }

        queueMicrotask(() => {
          appearanceHydratingRef.current = false;
          appearanceEditedRef.current = true;
        });
      });
    }

    const themeSettings = (profileContent.data as Record<string, unknown>)
      ?.themeSettings as Record<string, unknown> | undefined;
    const rawTemplate =
      appearanceSettings?.template ||
      themeSettings?.template ||
      dashboardProfile.data?.templateType ||
      "professional";

    if (typeof rawTemplate === "string") {
      setTemplate(rawTemplate.toLowerCase());
    }

    // Automatically initialize section if requested via URL search param and missing
    if (sectionParam) {
      const exists = loadedSections.some((s) => s.id === sectionParam);
      if (!exists) {
        const newSection = createSection(sectionParam);
        if (newSection) {
          loadedSections.push(newSection);
        }
      }
    }

    setSections(loadedSections);
    draftUpdatedAtRef.current = draftState.data.updatedAt ?? null;
  }, [
    profileContent.isSuccess,
    profileContent.data,
    draftState.isSuccess,
    draftState.data,
    dashboardProfile.isSuccess,
    dashboardProfile.data,
    profileAppearance.isSuccess,
    profileAppearance.isError,
    profileAppearance.data,
    sectionParam,
  ]);

  const { mutate: saveAppearance } = useMutation({
    mutationKey: updateProfileAppearanceOption.mutationKey,
    mutationFn: updateProfileAppearanceOption.mutationFn,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: dashboardProfileOption().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: profileAppearanceOption().queryKey,
      });
    },
    onError(error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : "Failed to save appearance settings.";
      toast.error(msg);
    },
  });

  const { mutate: saveDraft } = useMutation({
    mutationKey: upsertDraftOption.mutationKey,
    mutationFn: upsertDraftOption.mutationFn,
    onSuccess(response: UpsertDraftResponse) {
      const updatedAt = response?.data?.updatedAt;
      if (updatedAt) {
        draftUpdatedAtRef.current = updatedAt;
      } else {
        console.warn(
          "[draft] Save succeeded but response did not contain an updatedAt timestamp."
        );
      }
      queryClient.invalidateQueries({
        queryKey: profileContentOption().queryKey,
      });
    },
    onError(error: unknown) {
      const errObj = error as Record<string, unknown>;

      // Backend verifies link URLs and returns 422 INVALID_LINKS when some fail
      // (e.g. Twitter 403, Instagram blocks crawlers) but still saves the data.
      // Treat this as a soft warning — the save succeeded.
      if (
        isApiError(error) &&
        error.status === 422 &&
        error.message?.includes("INVALID_LINKS")
      ) {
        queryClient.invalidateQueries({
          queryKey: profileContentOption().queryKey,
        });
        return;
      }

      console.error("[draft] Save FAILED! Full error object:", error);

      if (
        errObj?.status === 409 ||
        errObj?.statusCode === 409 ||
        (error instanceof Error && error.message?.includes("409"))
      ) {
        toast.error(
          "Draft was modified in another session. Reloading latest changes...",
          { duration: 5000 }
        );
        queryClient.invalidateQueries({
          queryKey: profileContentOption().queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: draftStateOption().queryKey,
        });
        return;
      }

      const msg =
        error instanceof Error ? error.message : "Failed to save draft.";
      toast.error(msg);
    },
  });
  const saveDraftRef = useRef(saveDraft);
  useEffect(() => {
    saveDraftRef.current = saveDraft;
  });

  const sectionsRef = useRef(sections);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  const sectionAppearanceDeps = sections
    .map((s) => `${s.id}-${s.bgColor}-${s.textColor}-${s.iconColor}-${s.font}`)
    .join("|");

  useEffect(() => {
    if (!contentLoadedRef.current) return;

    if (appearanceHydratingRef.current) return;

    if (!appearanceEditedRef.current) {
      appearanceEditedRef.current = true;
      return;
    }

    if (appearanceTimerRef.current) {
      clearTimeout(appearanceTimerRef.current);
    }

    appearanceTimerRef.current = setTimeout(() => {
      const globalAppearance = {
        template: template,
        accentColour: normalizeColorForApi(iconColor),
        backgroundColour: normalizeColorForApi(bgColor),
        textColour: normalizeColorForApi(textColor),
        font: mapFontToApi(font),
        cornerStyle: mapCornerStyleToApi(borderRadius),
        spacing: clampSpacingForApi(spacing),
        theme: "light",
      };

      const buildComponentAppearance = (sectionType: string) => {
        const sec = sectionsRef.current.find((s) => s.type === sectionType);
        if (!sec) return globalAppearance;
        return {
          ...globalAppearance,
          ...(sec.bgColor && {
            backgroundColour: normalizeColorForApi(sec.bgColor),
          }),
          ...(sec.textColor && {
            textColour: normalizeColorForApi(sec.textColor),
          }),
          ...(sec.iconColor && {
            accentColour: normalizeColorForApi(sec.iconColor),
          }),
          ...(sec.font && { font: mapFontToApi(sec.font) }),
        };
      };

      saveAppearance({
        global: globalAppearance,
        components: {
          bio: buildComponentAppearance("bio"),
          links: buildComponentAppearance("links"),
          projects: buildComponentAppearance("projects"),
          cta: buildComponentAppearance("experience"),
        },
      });
      appearanceTimerRef.current = null;
    }, 1000);

    return () => {
      if (appearanceTimerRef.current) {
        clearTimeout(appearanceTimerRef.current);
      }
    };
  }, [
    template,
    font,
    bgColor,
    textColor,
    iconColor,
    spacing,
    borderRadius,
    appearanceTheme,
    saveAppearance,
    sectionAppearanceDeps,
  ]);

  useEffect(() => {
    if (!contentLoadedRef.current) return;
    if (!userEditedRef.current) {
      userEditedRef.current = true;
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      const bioSection = sections.find((s) => s.type === "bio");
      const updatedAt = draftUpdatedAtRef.current;
      const payload = {
        bio: bioSection?.bio ?? null,
        content: sectionsToContent(sections),
        themeSettings: { template },
      };
      saveDraftRef.current({ data: payload, draftVersion: updatedAt });
      saveTimerRef.current = null;
    }, 1000);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [sections, template]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        const bioSection = sectionsRef.current.find((s) => s.type === "bio");
        const updatedAt = draftUpdatedAtRef.current;
        // Appearance settings are persisted through updateProfileAppearance to avoid duplicate writes.
        const payload = {
          bio: bioSection?.bio ?? null,
          content: sectionsToContent(sectionsRef.current),
        };
        upsertDraft(payload, updatedAt).catch((err) => {
          console.error("[draft] Unmount direct save FAILED:", err);
        });
      }
    };
  }, []);

  // const { mutate: doPublish, isPending: isPublishing } = useMutation({
  //   mutationKey: ["profile", "publish"],
  //   mutationFn: publishProfile,
  //   onSuccess() {
  //     draftUpdatedAtRef.current = null;
  //     queryClient.invalidateQueries({ queryKey: ["profile", "content"] });
  //     queryClient.invalidateQueries({ queryKey: ["profile", "draft-state"] });
  //     toast.success("Profile published successfully.");
  //   },
  //   onError(error: unknown) {
  //     const msg =
  //       error instanceof Error ? error.message : "Failed to publish profile.";
  //     toast.error(msg);
  //   },
  // });

  // const handlePublish = () => doPublish(undefined as never);

  const resolvedSections = sections.map((section) =>
    section.id === "bio"
      ? {
          ...section,
          fullName: section.fullName ?? profile?.fullName ?? "",
          bio: section.bio ?? profile?.bio ?? "",
        }
      : section
  );

  useEffect(() => {
    if (sectionParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSectionId(sectionParam);

      setSections((curr) => {
        const exists = curr.some((s) => s.id === sectionParam);
        if (!exists && curr.length > 0) {
          const newSection = createSection(sectionParam);
          if (newSection) {
            return [...curr, newSection];
          }
        }
        return curr;
      });
    }
  }, [sectionParam]);

  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
  };

  const handleAddSection = (title: string, type: string) => {
    const newSection = createSection(type, title);
    if (!newSection) return;

    setSections((prev) => {
      const exists = prev.some(
        (s) => s.id === newSection.id || s.type === newSection.type
      );
      if (exists) return prev;
      return [...prev, newSection];
    });
    setSelectedSectionId(newSection.id);
  };

  const handleRemoveSection = (id: string) => {
    setSectionToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (sectionToDelete) {
      const updated = sections.filter((s) => s.id !== sectionToDelete);
      setSections(updated);
      if (selectedSectionId === sectionToDelete) {
        setSelectedSectionId(updated[0]?.id || null);
      }
      setSectionToDelete(null);
    }
  };

  const handleToggleSectionVisibility = (id: string) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section
      )
    );
  };

  const handleUpdateSection = (id: string, updates: Partial<Section>) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const selectedSection =
    resolvedSections.find((s) => s.id === selectedSectionId) || null;

  if (isLoading) {
    return (
      <>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] px-6 text-center lg:hidden">
          <div className="border-muted-foreground/30 border-t-foreground mb-4 h-8 w-8 animate-spin rounded-full border-2" />
          <h1 className="text-2xl font-bold text-[#050505]">
            Loading profile editor...
          </h1>
        </div>

        <div className="hidden w-full flex-1 gap-4 bg-[#FAFAFA] p-4 lg:flex lg:p-6 lg:px-8">
          {/* Left Sidebar Skeleton */}
          <div className="flex w-[320px] shrink-0 flex-col gap-6 rounded-2xl bg-white p-6">
            <Skeleton className="h-8 w-1/2" />
            <div className="mt-4 flex flex-col gap-3">
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          </div>

          {/* Preview Canvas Skeleton */}
          <div className="flex flex-1 items-center justify-center rounded-2xl">
            <Skeleton className="h-[750px] w-[350px] rounded-[3rem]" />
          </div>

          {/* Right Panel Skeleton */}
          <div className="flex w-[320px] shrink-0 flex-col gap-6 rounded-2xl bg-white p-6">
            <Skeleton className="h-8 w-1/2" />
            <div className="mt-4 flex flex-col gap-4">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-secondary-bg flex min-h-screen flex-col items-center justify-center px-4 text-center lg:hidden">
        <h1 className="text-primary-text text-2xl font-bold">
          Profile editor works best on desktop
        </h1>
        <p className="text-secondary-text mt-3 max-w-[420px]">
          Please use a desktop or large tablet to edit your profile layout.
        </p>
        <Link
          href={ROUTES.dashboard.home}
          className="bg-brand-hover-bg mt-6 rounded-[8px] px-5 py-3 font-semibold text-white"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="bg-primary-bg hidden w-full flex-1 flex-col overflow-hidden lg:flex">
        {/* <BuilderHeader onPublish={handlePublish} isPublishing={isPublishing} /> */}

        <div className="bg-secondary-bg flex flex-1 gap-4 overflow-hidden p-4 lg:p-4 xl:p-6 xl:px-8">
          <LeftSidebar
            sections={resolvedSections}
            selectedSectionId={selectedSectionId}
            selectedSection={selectedSection}
            initialEditingSectionId={sectionParam}
            onSelectSection={handleSelectSection}
            onDeselectSection={() => setSelectedSectionId(null)}
            onAddSection={handleAddSection}
            onRemoveSection={handleRemoveSection}
            onToggleSectionVisibility={handleToggleSectionVisibility}
            onReorderSections={setSections}
            onUpdateSection={handleUpdateSection}
            profile={profile}
          />

          <PreviewCanvas
            font={font}
            textColor={textColor}
            bgColor={bgColor}
            iconColor={iconColor}
            spacing={spacing}
            borderRadius={borderRadius}
            template={template}
            sections={resolvedSections}
            profile={profile}
            selectedSectionId={selectedSectionId}
            onToggleSectionVisibility={handleToggleSectionVisibility}
            onRemoveSection={handleRemoveSection}
          />

          <RightPanel
            font={font}
            onChangeFont={setFont}
            textColor={textColor}
            onChangeTextColor={setTextColor}
            bgColor={bgColor}
            onChangeBgColor={setBgColor}
            iconColor={iconColor}
            onChangeIconColor={setIconColor}
            spacing={spacing}
            onChangeSpacing={setSpacing}
            borderRadius={borderRadius}
            onChangeBorderRadius={setBorderRadius}
            onBackToGlobal={() => setSelectedSectionId(null)}
            selectedSection={selectedSection}
            onUpdateSection={handleUpdateSection}
            template={template}
            onChangeTemplate={(val) =>
              setTemplate((val || "professional").toLowerCase())
            }
          />
        </div>
      </div>

      <Dialog
        open={!!sectionToDelete}
        onOpenChange={(open) => !open && setSectionToDelete(null)}
      >
        <DialogContent className="bg-background w-full max-w-sm rounded-2xl p-6 shadow-xl sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary-text text-left text-lg font-bold">
              Delete Section
            </DialogTitle>
            <DialogDescription className="text-secondary-text mt-2 text-left text-sm">
              Are you sure you want to delete this section? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setSectionToDelete(null)}
              className="text-primary-text hover:bg-hover-bg rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-negative-text hover:bg-negative-text/90 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
