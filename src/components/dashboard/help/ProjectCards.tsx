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
    <div className="flex flex-col gap-4">
      <div className="h-72.5 w-86 border">
        <Image
          src={img}
          alt={projectTitle}
          className="w-full"
          width={300}
          height={250}
        />
      </div>
      <div className="flex flex-col items-start p-4">
        <div>
          <h5 className="text-xl font-bold">{projectTitle}</h5>
          <p className="text-lg">{projectDescription}</p>
        </div>
        <Button className="p-0 text-sm" variant={null}>
          Link
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCards;
