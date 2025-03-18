import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import PropertyCard from "./PropertyCard";
import LoadingPropertyCard from "@/components/common/LoadingPropertyCard";

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  isPremium: boolean;
  isNew: boolean;
}

interface PropertyGridProps {
  properties?: Property[];
  totalProperties?: number;
  currentPage?: number;
  propertiesPerPage?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (sortBy: string) => void;
  onViewChange?: (view: "grid" | "list") => void;
  onFilterToggle?: () => void;
  isLoading?: boolean;
}

const PropertyGrid = ({
  properties = [
    {
      id: "1",
      title: "Modern Apartment with City View",
      address: "123 Urban Street, Downtown",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      isPremium: true,
      isNew: true,
    },
    {
      id: "2",
      title: "Spacious Family Home",
      address: "456 Suburban Lane, Westside",
      price: 3800,
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      isPremium: false,
      isNew: true,
    },
    {
      id: "3",
      title: "Luxury Penthouse Suite",
      address: "789 Skyline Avenue, Uptown",
      price: 5200,
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2800,
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      isPremium: true,
      isNew: false,
    },
    {
      id: "4",
      title: "Cozy Studio Apartment",
      address: "101 Arts District, Downtown",
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      isPremium: false,
      isNew: false,
    },
    {
      id: "5",
      title: "Waterfront Condo with Marina View",
      address: "202 Harbor Drive, Seaside",
      price: 4100,
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      isPremium: true,
      isNew: true,
    },
    {
      id: "6",
      title: "Historic Loft in Arts District",
      address: "303 Gallery Row, Downtown",
      price: 3200,
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      imageUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      isPremium: false,
      isNew: false,
    },
  ],
  totalProperties = 24,
  currentPage = 1,
  propertiesPerPage = 6,
  onPageChange = () => {},
  onSortChange = () => {},
  onViewChange = () => {},
  onFilterToggle = () => {},
  isLoading = false,
}: PropertyGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleViewChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    onViewChange(mode);
  };

  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  const totalPages = Math.ceil(totalProperties / propertiesPerPage);

  return (
    <div className="w-full bg-gray-50 p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-gray-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * propertiesPerPage + 1,
              totalProperties,
            )}{" "}
            - {Math.min(currentPage * propertiesPerPage, totalProperties)} of{" "}
            {totalProperties} properties
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterToggle}
              className="sm:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("grid")}
                className="rounded-none border-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewChange("list")}
                className="rounded-none border-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Select defaultValue="newest" onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="size-asc">Size: Small to Large</SelectItem>
                <SelectItem value="size-desc">Size: Large to Small</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 place-items-center">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-full max-w-[360px]">
                <LoadingPropertyCard />
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your search filters to find more properties that
              match your criteria.
            </p>
          </div>
        ) : (
          <div
            className={`
            ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col space-y-4"
            }
          `}
          >
            {properties.map((property) => (
              <div key={property.id} className="flex justify-center">
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  address={property.address}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  imageUrl={property.imageUrl}
                  isPremium={property.isPremium}
                  isNew={property.isNew}
                  onViewDetails={(id) =>
                    (window.location.href = `/properties/${id}`)
                  }
                  onToggleFavorite={(id) =>
                    console.log(`Toggle favorite for property ${id}`)
                  }
                  onShare={(id) => console.log(`Share property ${id}`)}
                />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <Button
                variant="outline"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center mx-4">
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;
