import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const SectionHeading = ({
  title,
  description,
  align = "center",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("mb-8 md:mb-12", alignmentClasses[align], className)}>
      <h2
        className={cn(
          "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-lg text-muted-foreground max-w-2xl",
            alignmentClasses[align],
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
