import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ThemeCardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  elevation?: "none" | "sm" | "md" | "lg";
  border?: boolean;
}

const elevationClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

export function ThemeCard({
  title,
  children,
  footer,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  elevation = "sm",
  border = true,
}: ThemeCardProps) {
  return (
    <Card
      className={cn(
        elevationClasses[elevation],
        !border && "border-0",
        "bg-card",
        className,
      )}
    >
      {title && (
        <CardHeader className={headerClassName}>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", !title && "pt-6", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("flex justify-between", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
