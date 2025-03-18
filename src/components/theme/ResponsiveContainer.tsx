import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fluid?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

const paddingClasses = {
  none: "px-0",
  sm: "px-2 sm:px-4",
  md: "px-4 sm:px-6",
  lg: "px-6 sm:px-8",
};

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  maxWidth = "2xl",
  padding = "md",
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        !fluid && maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}
