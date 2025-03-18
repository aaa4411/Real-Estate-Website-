import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  parkingSpaces: number;
  propertyType: string;
  imageUrl: string;
  amenities: string[];
  features?: { name: string; available: boolean }[];
  isPremium?: boolean;
  isNew?: boolean;
}

interface PropertyComparisonProps {
  properties?: Property[];
  onAddProperty?: () => void;
  onRemoveProperty?: (id: string) => void;
  onViewProperty?: (id: string) => void;
  onBack?: () => void;
  maxProperties?: number;
}

const PropertyComparison = ({
  properties = [],
  onAddProperty = () => {},
  onRemoveProperty = () => {},
  onViewProperty = () => {},
  onBack = () => {},
  maxProperties = 4,
}: PropertyComparisonProps) => {
  const { canAccessFeature } = useFeatureAccess();
  const [activeIndex, setActiveIndex] = useState(0);

  // If no properties are provided, use these default properties
  const defaultProperties: Property[] = [
    {
      id: "1",
      title: "Modern Apartment with City View",
      address: "123 Urban Street, Downtown",
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      yearBuilt: 2018,
      parkingSpaces: 1,
      propertyType: "Apartment",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      amenities: [
        "Central Air",
        "Dishwasher",
        "Hardwood Floors",
        "Stainless Steel Appliances",
      ],
      features: [
        { name: "Elevator", available: true },
        { name: "Doorman", available: true },
        { name: "Pool", available: false },
        { name: "Balcony", available: true },
      ],
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
      yearBuilt: 2015,
      parkingSpaces: 2,
      propertyType: "House",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      amenities: [
        "Central Air",
        "Dishwasher",
        "Hardwood Floors",
        "Fireplace",
        "Garage",
      ],
      features: [
        { name: "Elevator", available: false },
        { name: "Doorman", available: false },
        { name: "Pool", available: true },
        { name: "Balcony", available: false },
      ],
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
      yearBuilt: 2020,
      parkingSpaces: 2,
      propertyType: "Penthouse",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      amenities: [
        "Central Air",
        "Dishwasher",
        "Hardwood Floors",
        "Stainless Steel Appliances",
        "Fireplace",
        "Rooftop Terrace",
      ],
      features: [
        { name: "Elevator", available: true },
        { name: "Doorman", available: true },
        { name: "Pool", available: true },
        { name: "Balcony", available: true },
      ],
      isPremium: true,
      isNew: false,
    },
  ];

  const displayProperties =
    properties.length > 0 ? properties : defaultProperties;

  // Check if property comparison feature is available
  const isComparisonAvailable = canAccessFeature
    ? canAccessFeature("propertyComparison")
    : true;

  // Get all unique amenities across all properties
  const allAmenities = Array.from(
    new Set(displayProperties.flatMap((property) => property.amenities || [])),
  ).sort();

  // Get all unique features across all properties
  const allFeatures = Array.from(
    new Set(
      displayProperties.flatMap((property) =>
        property.features ? property.features.map((f) => f.name) : [],
      ),
    ),
  ).sort();

  // Function to check if a property has a specific amenity
  const hasAmenity = (property: Property, amenity: string) => {
    return property.amenities?.includes(amenity) || false;
  };

  // Function to check if a property has a specific feature
  const hasFeature = (property: Property, featureName: string) => {
    if (!property.features) return false;
    const feature = property.features.find((f) => f.name === featureName);
    return feature ? feature.available : false;
  };

  // Function to highlight differences
  const highlightDifference = (values: any[]) => {
    if (values.length <= 1) return false;
    const firstValue = values[0];
    return !values.every((v) => v === firstValue);
  };

  // Mobile navigation for properties
  const handleNext = () => {
    setActiveIndex((prev) =>
      prev < displayProperties.length - 1 ? prev + 1 : prev,
    );
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  if (!isComparisonAvailable) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Property Comparison</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-amber-500"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Property comparison is a premium feature. Upgrade to our Basic or
            Premium plan to compare properties side by side.
          </p>
          <Button className="bg-amber-500 hover:bg-amber-600">
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Property Comparison</h1>
        {displayProperties.length < maxProperties && (
          <Button onClick={onAddProperty}>
            <Plus className="h-4 w-4 mr-2" /> Add Property
          </Button>
        )}
      </div>

      {/* Mobile view - show one property at a time with navigation */}
      <div className="md:hidden">
        {displayProperties.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={activeIndex === 0}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Property {activeIndex + 1} of {displayProperties.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={activeIndex === displayProperties.length - 1}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <Card className="w-full">
              <CardHeader className="p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 rounded-full bg-white/80 hover:bg-white"
                  onClick={() =>
                    onRemoveProperty(displayProperties[activeIndex].id)
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="h-48 w-full overflow-hidden rounded-md">
                  <img
                    src={displayProperties[activeIndex].imageUrl}
                    alt={displayProperties[activeIndex].title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg mt-2">
                  {displayProperties[activeIndex].title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {displayProperties[activeIndex].address}
                </p>
                <Badge className="mt-2">
                  ${displayProperties[activeIndex].price.toLocaleString()}/month
                </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Property Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span>
                          {displayProperties[activeIndex].propertyType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bedrooms:</span>
                        <span>{displayProperties[activeIndex].bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Bathrooms:
                        </span>
                        <span>{displayProperties[activeIndex].bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Area:</span>
                        <span>{displayProperties[activeIndex].area} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Year Built:
                        </span>
                        <span>{displayProperties[activeIndex].yearBuilt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Parking:</span>
                        <span>
                          {displayProperties[activeIndex].parkingSpaces} spaces
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Amenities</h3>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {allAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          {hasAmenity(
                            displayProperties[activeIndex],
                            amenity,
                          ) ? (
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Features</h3>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {allFeatures.map((feature) => (
                        <div key={feature} className="flex items-center">
                          {hasFeature(
                            displayProperties[activeIndex],
                            feature,
                          ) ? (
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <X className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={() =>
                    onViewProperty(displayProperties[activeIndex].id)
                  }
                >
                  View Property
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              No properties to compare
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Add properties to start comparing them side by side.
            </p>
            <Button onClick={onAddProperty}>
              <Plus className="h-4 w-4 mr-2" /> Add Property
            </Button>
          </div>
        )}
      </div>

      {/* Desktop view - show properties side by side */}
      <div className="hidden md:block">
        {displayProperties.length > 0 ? (
          <ScrollArea className="w-full">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 p-4 text-left"></th>
                    {displayProperties.map((property) => (
                      <th
                        key={property.id}
                        className="p-4 min-w-[300px] max-w-[350px]"
                      >
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 rounded-full bg-white/80 hover:bg-white z-10"
                            onClick={() => onRemoveProperty(property.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="h-48 w-full overflow-hidden rounded-md">
                            <img
                              src={property.imageUrl}
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h3 className="font-medium text-lg mt-2 line-clamp-1">
                            {property.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {property.address}
                          </p>
                          <Badge className="mt-2">
                            ${property.price.toLocaleString()}/month
                          </Badge>
                        </div>
                      </th>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <th className="p-4 min-w-[300px]">
                        <div className="h-48 w-full border-2 border-dashed border-muted rounded-md flex items-center justify-center">
                          <Button
                            variant="outline"
                            onClick={onAddProperty}
                            className="flex flex-col h-auto py-4"
                          >
                            <Plus className="h-8 w-8 mb-2" />
                            <span>Add Property</span>
                          </Button>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={displayProperties.length + 2} className="p-2">
                      <Separator />
                      <h3 className="font-medium my-2">Property Details</h3>
                    </td>
                  </tr>
                  <tr
                    className={
                      highlightDifference(
                        displayProperties.map((p) => p.propertyType),
                      )
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium text-muted-foreground">
                      Type
                    </td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-type`} className="p-4">
                        {property.propertyType}
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>
                  <tr
                    className={
                      highlightDifference(
                        displayProperties.map((p) => p.bedrooms),
                      )
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium text-muted-foreground">
                      Bedrooms
                    </td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-bedrooms`} className="p-4">
                        {property.bedrooms}
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>
                  <tr
                    className={
                      highlightDifference(
                        displayProperties.map((p) => p.bathrooms),
                      )
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium text-muted-foreground">
                      Bathrooms
                    </td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-bathrooms`} className="p-4">
                        {property.bathrooms}
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>
                  <tr
                    className={
                      highlightDifference(displayProperties.map((p) => p.area))
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium text-muted-foreground">
                      Area
                    </td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-area`} className="p-4">
                        {property.area} sq ft
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>
                  <tr
                    className={
                      highlightDifference(
                        displayProperties.map((p) => p.yearBuilt),
                      )
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium text-muted-foreground">
                      Year Built
                    </td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-year`} className="p-4">
                        {property.yearBuilt}
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>
                  <tr
                    className={
                      highlightDifference(
                        displayProperties.map((p) => p.parkingSpaces),
                      )
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td className="p-4 font-medium text-muted-foreground">
                      Parking
                    </td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-parking`} className="p-4">
                        {property.parkingSpaces} spaces
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>

                  <tr>
                    <td colSpan={displayProperties.length + 2} className="p-2">
                      <Separator className="my-4" />
                      <h3 className="font-medium my-2">Amenities</h3>
                    </td>
                  </tr>
                  {allAmenities.map((amenity) => {
                    const hasHighlight = highlightDifference(
                      displayProperties.map((p) => hasAmenity(p, amenity)),
                    );
                    return (
                      <tr
                        key={amenity}
                        className={hasHighlight ? "bg-amber-50" : ""}
                      >
                        <td className="p-4 font-medium text-muted-foreground">
                          {amenity}
                        </td>
                        {displayProperties.map((property) => (
                          <td
                            key={`${property.id}-${amenity}`}
                            className="p-4 text-center"
                          >
                            {hasAmenity(property, amenity) ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                        {displayProperties.length < maxProperties && (
                          <td className="p-4"></td>
                        )}
                      </tr>
                    );
                  })}

                  <tr>
                    <td colSpan={displayProperties.length + 2} className="p-2">
                      <Separator className="my-4" />
                      <h3 className="font-medium my-2">Features</h3>
                    </td>
                  </tr>
                  {allFeatures.map((feature) => {
                    const hasHighlight = highlightDifference(
                      displayProperties.map((p) => hasFeature(p, feature)),
                    );
                    return (
                      <tr
                        key={feature}
                        className={hasHighlight ? "bg-amber-50" : ""}
                      >
                        <td className="p-4 font-medium text-muted-foreground">
                          {feature}
                        </td>
                        {displayProperties.map((property) => (
                          <td
                            key={`${property.id}-${feature}`}
                            className="p-4 text-center"
                          >
                            {hasFeature(property, feature) ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                        {displayProperties.length < maxProperties && (
                          <td className="p-4"></td>
                        )}
                      </tr>
                    );
                  })}

                  <tr>
                    <td className="p-4"></td>
                    {displayProperties.map((property) => (
                      <td key={`${property.id}-action`} className="p-4">
                        <Button
                          className="w-full"
                          onClick={() => onViewProperty(property.id)}
                        >
                          View Property
                        </Button>
                      </td>
                    ))}
                    {displayProperties.length < maxProperties && (
                      <td className="p-4"></td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              No properties to compare
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Add properties to start comparing them side by side.
            </p>
            <Button onClick={onAddProperty}>
              <Plus className="h-4 w-4 mr-2" /> Add Property
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyComparison;
