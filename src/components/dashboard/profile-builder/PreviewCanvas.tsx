import type { Section, ProfilePreview } from "./types";
import CreatorPreview from "./previews/CreatorPreview";
import ProfessionalPreview from "./previews/ProfessionalPreview";
import PortfolioPreview from "./previews/PortfolioPreview";
import DefaultPreview from "./previews/DefaultPreview";
import TemplateAppearanceProvider from "../templates/TemplateAppearanceProvider";

interface PreviewCanvasProps {
  font: string;
  textColor: string;
  bgColor: string;
  iconColor: string;
  spacing: number;
  borderRadius: "sharp" | "rounded" | "pill";
  appearanceTheme?: "light" | "dark";
  template?: string;
  sections: Section[];
  profile?: ProfilePreview | null;
  selectedSectionId?: string | null;
  onSelectSection: (id: string) => void;
  onToggleSectionVisibility: (id: string) => void;
  onRemoveSection: (id: string) => void;
}

export default function PreviewCanvas(props: PreviewCanvasProps) {
  const { font } = props;

  const templateKey = props.template
    ? String(props.template).toLowerCase()
    : "";

  const fontStyles: Record<string, string> = {
    Afacad: "font-afacad",
    Inter: "font-sans",
    Serif: "font-playfair",
    "Playfair Display": "font-playfair",
    Mono: "font-mono",
    Geologica: "font-geologica",
    Manrope: "font-sans",
  };

  const selectedFontClass = fontStyles[font] || "font-afacad";

  const previewProps = {
    ...props,
    sections: props.sections,
  };

  return (
    <TemplateAppearanceProvider
      appearance={{
        font: props.font,
        accentColour: props.iconColor,
        iconColor: props.iconColor,
        textColor: props.textColor,
        textColour: props.textColor,
        bgColor: props.bgColor,
        backgroundColour: props.bgColor,
        cornerStyle: props.borderRadius,
        borderRadius: props.borderRadius,
        spacing: props.spacing,
        theme: props.appearanceTheme,
      }}
      className="flex h-full w-full min-w-0 flex-1 flex-col"
    >
      <div
        className={`profile-builder-scrollbar animate-in fade-in flex h-full min-h-0 flex-1 justify-center overflow-y-auto bg-transparent px-4 transition-colors duration-200 lg:px-4 xl:px-12 ${selectedFontClass}`}
      >
        <div className="flex w-full max-w-5xl flex-col gap-6 pb-32">
          {templateKey === "creator" && <CreatorPreview {...previewProps} />}
          {templateKey === "portfolio" && (
            <PortfolioPreview {...previewProps} />
          )}
          {templateKey === "default" && <DefaultPreview {...previewProps} />}
          {(templateKey === "" || templateKey === "professional") && (
            <ProfessionalPreview {...previewProps} />
          )}
        </div>
      </div>
    </TemplateAppearanceProvider>
  );
}
