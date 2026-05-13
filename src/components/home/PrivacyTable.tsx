import React from "react";

const tabeOfContent = [
  "1. Introduction",
  "2.  About Open Profile",
  "3.  Information We Collect",
  "4.  How We Use Your Information",
  "5.  Public Profiles And Search Visibility",
  "6.  Cookies And Tracking Technologies",
  "7.  Sharing And Disclosure of Information",
  "8. Data Protection And User Rights",
  "9. Children's Privacy",
  "10.  Changes To This Privacy Policy And Contact Information",
];

const PrivacyTable = () => {
  return (
    <div>
      <div>
        <h4 className="text-2xl">Table of Content</h4>
        <ul className=" space-y-4 mt-4">
          {tabeOfContent.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrivacyTable;
