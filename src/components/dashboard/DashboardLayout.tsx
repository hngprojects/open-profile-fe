import { ReactNode } from "react";
import DashboardTopbar from "./DashboardTopbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <DashboardTopbar />
      <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-5 sm:px-5 md:px-6 md:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
