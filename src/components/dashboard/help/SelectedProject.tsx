import React from "react";
import ProjectCards from "./ProjectCards";

const data = [
  {
    img: "/placeholder.svg",
    projectTitle: "Project Title 1",
    projectDescription: "Project Description 1",
  },
  {
    img: "/placeholder.svg",
    projectTitle: "Project Title ",
    projectDescription: "Project Description 2",
  },
  {
    img: "/placeholder.svg",
    projectTitle: "Project Title 3",
    projectDescription: "Project Description 3",
  },
  {
    img: "/placeholder.svg",
    projectTitle: "Project Title 4",
    projectDescription: "Project Description 4",
  },
];

const SelectedProject = () => {
  return (
    <section className="w-full rounded-[12px] border border-[#EDEDED] bg-white">
      <div>
        <h2 className="p-3 text-2xl font-bold">Selected Projects</h2>
      </div>
      <div className="grid grid-cols-2">
        {data.map((item, index) => (
          <div key={index}>
            <ProjectCards
              img={item.img}
              projectTitle={item.projectTitle}
              projectDescription={item.projectDescription}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedProject;
