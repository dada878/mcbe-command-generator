"use client"

import { ReactNode } from "react";
import { Tooltip } from "react-tooltip";

export default function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Tooltip id="tooltip" />
    </>
  );
}
