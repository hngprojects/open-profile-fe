import React from "react";
import { ExternalLink, Globe } from "lucide-react";
import {
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  GithubIcon,
  YoutubeIcon,
} from "@/components/icons/BrandIcons";

export const getLinkIcon = (title: string = "") => {
  const t = title.toLowerCase();
  if (t.includes("instagram"))
    return <InstagramIcon style={{ fontSize: 18 }} />;
  if (t.includes("twitter") || t.includes("x.com") || t === "x")
    return <XIcon style={{ fontSize: 18 }} />;
  if (t.includes("linkedin")) return <LinkedInIcon style={{ fontSize: 18 }} />;
  if (t.includes("github")) return <GithubIcon style={{ fontSize: 18 }} />;
  if (t.includes("youtube")) return <YoutubeIcon style={{ fontSize: 18 }} />;
  return <Globe size={18} />;
};

interface TemplateLinkCardProps {
  id?: string | number;
  title: string;
  url: string;
}

export function TemplateLinkCard({ id, title, url }: TemplateLinkCardProps) {
  return (
    <a
      key={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-border bg-background hover:border-brand-hover-bg/30 flex items-center justify-between rounded-[12px] border p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="text-primary-text group-hover:text-brand-hover-bg transition-colors">
          {getLinkIcon(url + " " + title)}
        </div>
        <span className="text-primary-text text-[14px] font-medium truncate max-w-[120px]">
          {title}
        </span>
      </div>
      <ExternalLink
        size={14}
        className="text-tertiary-text shrink-0 group-hover:text-brand-hover-bg transition-colors"
      />
    </a>
  );
}
