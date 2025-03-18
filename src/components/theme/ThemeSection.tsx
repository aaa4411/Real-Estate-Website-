import React from "react";
import { cn } from "@/lib/utils";

interface ThemeSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  background?: "default" | "muted" | "primary" | "accent";
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/30",
  primary: "bg-primary/10",
  accent: "bg-accent/10",
};

const spacingClasses = {
  none: "py-0",
  sm: "py-4",
  md: "py-8",
  lg: "py-12",
  xl: "py-16",
};

export function ThemeSection({
  children,
  title,
  description,
  className,
  contentClassName,
  headerClassName,
  background = "default",
  spacing = "lg",
}: ThemeSectionProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        className,
      )}
    >
      {(title || description) && (
        <div className={cn("text-center mb-8", headerClassName)}>
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
