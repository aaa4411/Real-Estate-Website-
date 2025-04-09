import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface LocalBusinessPartnerProps {
  name: string;
  description: string;
  logo: string;
  category: "furniture" | "services" | "maintenance" | "inspection" | "other";
  discount?: string;
  website?: string;
  featured?: boolean;
  onClick?: () => void;
}

const LocalBusinessPartner = ({
  name = "Mobica",
  description = "Premium furniture and home accessories",
  logo = "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=200&q=80",
  category = "furniture",
  discount = "10% off for premium members",
  website = "https://example.com",
  featured = false,
  onClick = () => window.open(website, "_blank"),
}: LocalBusinessPartnerProps) => {
  const categoryColors = {
    furniture: "bg-blue-100 text-blue-800",
    services: "bg-purple-100 text-purple-800",
    maintenance: "bg-amber-100 text-amber-800",
    inspection: "bg-green-100 text-green-800",
    other: "bg-gray-100 text-gray-800",
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-md ${featured ? "border-primary border-2" : ""}`}
    >
      <div className="relative p-4">
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-white font-medium shadow-sm">
            Featured Partner
          </Badge>
        )}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={logo}
              alt={`${name} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge
              className={`mt-1 ${categoryColors[category]} font-medium shadow-sm`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
        {discount && (
          <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded-md">
            {discount}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full hover:bg-primary hover:text-white transition-colors"
          onClick={onClick}
        >
          Visit Website <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocalBusinessPartner;
