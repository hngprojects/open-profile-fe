"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ExternalPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pagesWithLayout = [
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/waitlist",
    "/how-it-works",
  ];

  const showLayout = pagesWithLayout.includes(pathname);

  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
