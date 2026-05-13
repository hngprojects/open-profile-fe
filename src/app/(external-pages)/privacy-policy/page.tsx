import { CTA } from "@/components/home/CTA";
import PrivacyContent from "@/components/home/PrivacyContent";
import PrivacyHero from "@/components/home/PrivacyHero";
import PrivacyTable from "@/components/home/PrivacyTable";
import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#065E69] selection:text-white overflow-hidden text-primary">
      <Navbar />
      <PrivacyHero />
      <div className="flex flex-col lg:flex-row lg:max-w-6xl mx-auto gap-10 py-16 px-4">
        <div className="flex-1">
          <PrivacyTable />
        </div>
        <div className="flex-2">
          <PrivacyContent />
        </div>
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
