import React, { useState } from "react";
import Header from "@/components/layout/Header";
import SearchFilters from "@/components/search/SearchFilters";
import PropertyGrid from "@/components/property/PropertyGrid";
import PremiumBanner from "@/components/subscription/PremiumBanner";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

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

const PropertySearch = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mock properties data
  const properties = [
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
  ];

  // Handle scroll event to show/hide scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleViewChange = (view: "grid" | "list") => {
    setViewMode(view);
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        username="John Doe"
        isPremium={false}
        notificationCount={3}
        onSearch={(query) => console.log("Search query:", query)}
      />

      <main className="flex-1 container max-w-screen-2xl mx-auto px-4 py-6">
        <PremiumBanner isSubscribed={false} daysLeft={30} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filters sidebar - hidden on mobile unless toggled */}
          {isFilterVisible && (
            <div className="lg:block">
              <SearchFilters
                onFilterChange={handleFilterChange}
                className="sticky top-24"
              />
            </div>
          )}

          {/* Property grid */}
          <div>
            <PropertyGrid
              properties={properties}
              totalProperties={24}
              currentPage={currentPage}
              propertiesPerPage={6}
              onPageChange={handlePageChange}
              onSortChange={handleSortChange}
              onViewChange={handleViewChange}
              onFilterToggle={toggleFilters}
            />
          </div>
        </div>
      </main>

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

export default PropertySearch;
