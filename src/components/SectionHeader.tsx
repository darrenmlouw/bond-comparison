"use client";

import React from "react";

// Type definition for the props
interface SectionHeaderProps {
  label: string; // The label to display inside the header
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label }) => {
  return (
    <div className="relative flex items-center pt-2">
      <div className="flex-shrink mr-2 border-[1px] bg-accent bg-opacity-100 rounded-full p-0.5 px-2 text-xs text-accent-foreground">
        {label}
      </div>
      <div className="flex-grow border-t text-accent"></div>
    </div>
  );
};
