import React from "react";
import Image from "next/image";
import Link from "next/link";

export function TemplateFooter() {
  return (
    <footer className="border-border mt-24 flex items-center justify-between border-t pt-6 pb-6">
      <p className="text-tertiary-text text-[13px]">© 2026 Open Profile</p>
      <div className="text-tertiary-text flex items-center gap-1.5 text-[13px]">
        Created on
        <Link href="/">
          <Image
            src="/auth/logo.png"
            alt="Open.Profile"
            width={90}
            height={20}
            className="ml-0.5 object-contain dark:invert"
          />
        </Link>
      </div>
    </footer>
  );
}
