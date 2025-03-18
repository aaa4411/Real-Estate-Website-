import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Eye, BarChart2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropertyCardProps {
  id?: string;
  title?: string;
  address?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  imageUrl?: string;
  isPremium?: boolean;
  isNew?: boolean;
  onViewDetails?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  onAddToComparison?: (id: string) => void;
}

const PropertyCard = ({
  id = "1",
  title = "Modern Apartment with City View",
  address = "123 Urban Street, Downtown",
  price = 2500,
  bedrooms = 2,
  bathrooms = 2,
  area = 1200,
  imageUrl = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  isPremium = false,
  isNew = true,
  onViewDetails = (id) => (window.location.href = `/properties/${id}`),
  onToggleFavorite = () => {},
  onShare = () => {},
  onAddToComparison = () => {},
}: PropertyCardProps) => {
  return (
    <Card className="w-full max-w-[360px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={() => onToggleFavorite(id)}
                  >
                    <Heart className="h-5 w-5 text-rose-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={() => onAddToComparison(id)}
                  >
                    <BarChart2 className="h-5 w-5 text-blue-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to comparison</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white"
                    onClick={() => onShare(id)}
                  >
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share property</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="absolute top-2 left-2 flex gap-2">
            {isPremium && (
              <Badge className="bg-amber-500 hover:bg-amber-600">Premium</Badge>
            )}
            {isNew && (
              <Badge className="bg-emerald-500 hover:bg-emerald-600">New</Badge>
            )}
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-white text-black hover:bg-gray-100">
              ${price.toLocaleString()}/month
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{address}</p>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">{bedrooms}</span>
            <span className="text-gray-500">
              bed{bedrooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{bathrooms}</span>
            <span className="text-gray-500">
              bath{bathrooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{area}</span>
            <span className="text-gray-500">sq ft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onViewDetails(id)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
