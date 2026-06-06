import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const ProjectCards = ({
  img,
  projectTitle,
  projectDescription,
}: {
  img: string;
  projectTitle: string;
  projectDescription: string;
}) => {
  return (
    <div className="border-tertiary-b flex min-w-0 flex-col border-b sm:border-r">
      <div className="bg-secondary-bg flex aspect-[4/3] w-full items-center justify-center">
        <Image
          src={img}
          alt={projectTitle}
          width={300}
          height={250}
          className="h-full w-full object-contain p-8"
        />
      </div>

      <div className="flex flex-col items-start p-4">
        <h5 className="text-xl font-bold">{projectTitle}</h5>
        <p className="text-lg">{projectDescription}</p>

        <Button className="mt-2 p-0 text-sm" variant={null}>
          Link
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCards;
