import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import PropertyComparison from "@/components/property/PropertyComparison";
import PremiumBanner from "@/components/subscription/PremiumBanner";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropertyGrid from "@/components/property/PropertyGrid";

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

const PropertyComparisonPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);
  const [isAddPropertyDialogOpen, setIsAddPropertyDialogOpen] = useState(false);

  // Mock properties data
  const allProperties: Property[] = [
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
    {
      id: "4",
      title: "Cozy Studio Apartment",
      address: "101 Arts District, Downtown",
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      yearBuilt: 2010,
      parkingSpaces: 1,
      propertyType: "Studio",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      amenities: ["Central Air", "Dishwasher", "Hardwood Floors"],
      features: [
        { name: "Elevator", available: true },
        { name: "Doorman", available: false },
        { name: "Pool", available: false },
        { name: "Balcony", available: false },
      ],
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
      yearBuilt: 2017,
      parkingSpaces: 1,
      propertyType: "Condo",
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      amenities: [
        "Central Air",
        "Dishwasher",
        "Hardwood Floors",
        "Stainless Steel Appliances",
        "Waterfront",
      ],
      features: [
        { name: "Elevator", available: true },
        { name: "Doorman", available: true },
        { name: "Pool", available: true },
        { name: "Balcony", available: true },
      ],
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
      yearBuilt: 1920,
      parkingSpaces: 1,
      propertyType: "Loft",
      imageUrl:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      amenities: [
        "Central Air",
        "Dishwasher",
        "Hardwood Floors",
        "High Ceilings",
        "Exposed Brick",
      ],
      features: [
        { name: "Elevator", available: true },
        { name: "Doorman", available: false },
        { name: "Pool", available: false },
        { name: "Balcony", available: false },
      ],
      isPremium: false,
      isNew: false,
    },
  ];

  // Parse property IDs from URL
  useEffect(() => {
    const propertyIds = searchParams.get("ids")?.split(",") || [];
    if (propertyIds.length > 0) {
      const properties = allProperties.filter((p) =>
        propertyIds.includes(p.id),
      );
      setComparedProperties(properties);
    }
  }, [searchParams]);

  // Handle scroll event to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddProperty = () => {
    setIsAddPropertyDialogOpen(true);
  };

  const handleRemoveProperty = (id: string) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== id));

    // Update URL
    const newIds = comparedProperties
      .filter((p) => p.id !== id)
      .map((p) => p.id)
      .join(",");

    if (newIds) {
      navigate(`/property-comparison?ids=${newIds}`, { replace: true });
    } else {
      navigate("/property-comparison", { replace: true });
    }
  };

  const handleViewProperty = (id: string) => {
    navigate(`/properties/${id}`);
  };

  const handleSelectPropertyToCompare = (id: string) => {
    // Find the property
    const property = allProperties.find((p) => p.id === id);
    if (!property) return;

    // Check if already in comparison
    if (comparedProperties.some((p) => p.id === id)) return;

    // Add to comparison
    const newProperties = [...comparedProperties, property];
    setComparedProperties(newProperties);

    // Update URL
    const newIds = newProperties.map((p) => p.id).join(",");
    navigate(`/property-comparison?ids=${newIds}`, { replace: true });

    // Close dialog
    setIsAddPropertyDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        username="John Doe"
        isPremium={false}
        notificationCount={3}
        onSearch={(query) => console.log("Search query:", query)}
      />

      <main className="flex-1 container max-w-screen-2xl mx-auto px-4 py-6">
        <PremiumBanner isSubscribed={false} daysLeft={30} />

        <div className="mt-6">
          <PropertyComparison
            properties={comparedProperties}
            onAddProperty={handleAddProperty}
            onRemoveProperty={handleRemoveProperty}
            onViewProperty={handleViewProperty}
            onBack={handleBack}
            maxProperties={4}
          />
        </div>
      </main>

      {/* Add Property Dialog */}
      <Dialog
        open={isAddPropertyDialogOpen}
        onOpenChange={setIsAddPropertyDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Property to Compare</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <PropertyGrid
              properties={allProperties.filter(
                (p) => !comparedProperties.some((cp) => cp.id === p.id),
              )}
              onViewDetails={handleSelectPropertyToCompare}
              onToggleFavorite={(id) =>
                console.log(`Toggle favorite for ${id}`)
              }
              onShare={(id) => console.log(`Share property ${id}`)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default PropertyComparisonPage;
