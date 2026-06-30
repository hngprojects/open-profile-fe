import { ArrowRight, ExternalLink, Globe } from "lucide-react";
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
        <div className="text-brand-hover-bg transition-colors">
          {getLinkIcon(url + " " + title)}
        </div>
        <span className="text-primary-text max-w-[120px] truncate text-[14px] font-medium">
          {title}
        </span>
      </div>
      <ExternalLink
        size={14}
        className="text-brand-hover-bg shrink-0 transition-colors"
      />
    </a>
  );
}

export function CreatorLinkCard({ id, title, url }: TemplateLinkCardProps) {
  const displayUrl = (() => {
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      const host = parsed.hostname.replace("www.", "");
      const path = parsed.pathname.replace(/\/$/, "");
      if (
        path &&
        path !== "/" &&
        !host.includes("google.com") &&
        !host.includes("mailto")
      ) {
        const parts = path.split("/");
        const handle = (parts[parts.length - 1] || "").replace(/^@+/, "");
        if (handle && handle.length > 0) {
          return `@${handle}`;
        }
      }
      return host;
    } catch {
      return url;
    }
  })();

  return (
    <a
      key={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-border bg-background hover:border-brand-hover-bg/30 flex w-full items-center justify-between rounded-[20px] border p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="bg-brand-hover-bg/10 text-brand-hover-bg group-hover:bg-brand-hover-bg/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors">
          {getLinkIcon(url + " " + title)}
        </div>
        <div className="flex min-w-0 flex-col items-start">
          <span className="text-primary-text max-w-[180px] truncate text-[15px] font-bold sm:max-w-[360px]">
            {title}
          </span>
          <span className="text-secondary-text max-w-[180px] truncate text-[13px] sm:max-w-[360px]">
            {displayUrl}
          </span>
        </div>
      </div>
      <ArrowRight
        size={16}
        className="text-brand-hover-bg shrink-0 transition-transform group-hover:translate-x-1"
      />
    </a>
  );
}
