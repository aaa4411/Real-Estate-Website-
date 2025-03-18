import React from "react";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  description?: string;
  className?: string;
}

const StatsSection = ({
  stats,
  title,
  description,
  className,
}: StatsSectionProps) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <p className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <h3 className="text-xl font-medium mb-2">{stat.label}</h3>
              {stat.description && (
                <p className="text-muted-foreground">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
