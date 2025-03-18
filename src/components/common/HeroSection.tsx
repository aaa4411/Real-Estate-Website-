import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  children?: React.ReactNode;
  className?: string;
  height?: "sm" | "md" | "lg" | "xl";
  overlay?: "none" | "light" | "medium" | "dark" | "gradient";
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  children,
  className,
  height = "lg",
  overlay = "gradient",
}: HeroSectionProps) => {
  const heightClasses = {
    sm: "min-h-[300px] md:min-h-[400px]",
    md: "min-h-[400px] md:min-h-[500px]",
    lg: "min-h-[500px] md:min-h-[600px]",
    xl: "min-h-[600px] md:min-h-[700px]",
  };

  const overlayClasses = {
    none: "",
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
    gradient: "bg-gradient-to-r from-primary/90 to-primary/70",
  };

  return (
    <section
      className={cn(
        "relative flex items-center justify-center text-white",
        heightClasses[height],
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={`absolute inset-0 z-10 ${overlayClasses[overlay]}`} />

      <div className="container relative z-20 text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {children}

        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {primaryButtonText && primaryButtonLink && (
              <Button size="lg" asChild>
                <a href={primaryButtonLink}>{primaryButtonText}</a>
              </Button>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Button variant="outline" size="lg" asChild>
                <a href={secondaryButtonLink}>{secondaryButtonText}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
