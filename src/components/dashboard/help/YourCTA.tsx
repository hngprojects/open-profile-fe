import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import React from "react";

const YourCTA = () => {
  return (
    <section className="w-full rounded-[12px] border border-[#EDEDED] bg-white p-16">
      <div className="flex flex-col items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-md border p-2 text-sm font-medium">
          <MessageSquare size={12} />
        </span>

        <h4 className="text-2xl font-bold">Your CTA</h4>
        <p className="text-sm">Enter CTA subtitle</p>

        <Button size="lg">Button</Button>
      </div>
    </section>
  );
};

export default YourCTA;
