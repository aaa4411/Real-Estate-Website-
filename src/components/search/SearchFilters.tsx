import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Search, MapPin, Home, Building, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  location: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  squareFeet: [number, number];
  yearBuilt: [number, number];
}

const SearchFilters = ({
  onFilterChange,
  className = "",
}: SearchFiltersProps) => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    propertyType: "Any",
    priceRange: [500, 10000],
    bedrooms: "Any",
    bathrooms: "Any",
    amenities: [],
    squareFeet: [500, 5000],
    yearBuilt: [1950, 2023],
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];

    handleFilterChange("amenities", newAmenities);
  };

  const resetFilters = () => {
    const defaultFilters = {
      location: "",
      propertyType: "Any",
      priceRange: [500, 10000],
      bedrooms: "Any",
      bathrooms: "Any",
      amenities: [],
      squareFeet: [500, 5000],
      yearBuilt: [1950, 2023],
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <div className={`w-full bg-white shadow-md rounded-lg p-4 ${className}`}>
      {/* Basic Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Enter location, neighborhood, or address"
            className="pl-10"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any Type</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="Townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setIsAdvancedFiltersOpen(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Price:</span>
          <div className="flex items-center gap-1">
            <span className="text-sm">${filters.priceRange[0]}</span>
            <span className="text-sm">-</span>
            <span className="text-sm">${filters.priceRange[1]}</span>
          </div>
          <Slider
            className="w-40"
            min={500}
            max={10000}
            step={100}
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Beds:</span>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleFilterChange("bedrooms", value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Baths:</span>
          <Select
            value={filters.bathrooms}
            onValueChange={(value) => handleFilterChange("bathrooms", value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="ml-auto"
        >
          <X className="h-4 w-4 mr-1" /> Clear All
        </Button>
      </div>

      {/* Advanced Filters Dialog */}
      <Dialog
        open={isAdvancedFiltersOpen}
        onOpenChange={setIsAdvancedFiltersOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Advanced Filters</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <h3 className="font-medium">Property Details</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium">Square Feet</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{filters.squareFeet[0]}</span>
                  <Slider
                    className="flex-grow"
                    min={500}
                    max={5000}
                    step={100}
                    value={filters.squareFeet}
                    onValueChange={(value) =>
                      handleFilterChange("squareFeet", value)
                    }
                  />
                  <span className="text-sm">{filters.squareFeet[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Year Built</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{filters.yearBuilt[0]}</span>
                  <Slider
                    className="flex-grow"
                    min={1950}
                    max={2023}
                    step={1}
                    value={filters.yearBuilt}
                    onValueChange={(value) =>
                      handleFilterChange("yearBuilt", value)
                    }
                  />
                  <span className="text-sm">{filters.yearBuilt[1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Pool",
                  "Gym",
                  "Parking",
                  "Balcony",
                  "Elevator",
                  "Air Conditioning",
                  "Furnished",
                  "Pets Allowed",
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={() => setIsAdvancedFiltersOpen(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchFilters;
