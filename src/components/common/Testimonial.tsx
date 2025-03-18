import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
}

const Testimonial = ({
  quote,
  author,
  role = "",
  avatarUrl,
  rating = 5,
}: TestimonialProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        {rating > 0 && (
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        )}
        <blockquote className="text-lg mb-6 italic">"{quote}"</blockquote>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={avatarUrl} alt={author} />
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
