"use client";

import React, { useEffect, useState } from "react";
import { tableOfContent, getTableOfContentId } from "./PrivacyContent";

const PrivacyTable = () => {
  const [activeId, setActiveId] = useState<string>(
    getTableOfContentId(tableOfContent[0]?.heading || "")
  );
  const isClickingRef = React.useRef(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const headingElements = tableOfContent
        .map((item) => {
          const id = getTableOfContentId(item.heading);
          const el = document.getElementById(id);
          return { id, el };
        })
        .filter((item) => item.el !== null);

      let currentActiveId = headingElements[0]?.id || "";
      for (const { id, el } of headingElements) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            currentActiveId = id;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => handleScroll(), 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      isClickingRef.current = true;
      setActiveId(id);
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        isClickingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="bg-primary-bg sticky top-28 rounded-[20px] p-6 md:p-8">
      <h4 className="text-primary-text font-inter mb-6 text-xl font-bold tracking-tight">
        Table Of Contents
      </h4>
      <ul className="text-secondary-text space-y-1 text-sm font-medium md:text-base">
        {tableOfContent.map((item, index) => {
          const id = getTableOfContentId(item.heading);
          const isActive = activeId === id;

          return (
            <li key={index}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block rounded-lg px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-brand-subtle-bg text-brand-text font-semibold"
                    : "hover:bg-hover-bg hover:text-primary-text"
                }`}
              >
                {item.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrivacyTable;
