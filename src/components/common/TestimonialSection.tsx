import React from "react";
import SectionHeading from "./SectionHeading";
import Testimonial from "./Testimonial";
import { cn } from "@/lib/utils";

interface TestimonialData {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialSectionProps {
  title?: string;
  description?: string;
  testimonials: TestimonialData[];
  className?: string;
}

const TestimonialSection = ({
  title = "What Our Clients Say",
  description = "Hear from our satisfied customers about their experience using our platform to find their perfect home.",
  testimonials,
  className,
}: TestimonialSectionProps) => {
  return (
    <section className={cn("py-16 bg-muted/30", className)}>
      <div className="container">
        <SectionHeading title={title} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatarUrl={testimonial.avatarUrl}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
