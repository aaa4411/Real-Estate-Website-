import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import PropertyDetails from "@/components/property/PropertyDetails";
import PremiumBanner from "@/components/subscription/PremiumBanner";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Mock property data - in a real app, you would fetch this based on the ID
  const property = {
    id: id || "1",
    title: "Modern Apartment with City View",
    description:
      "This stunning modern apartment offers breathtaking city views and luxurious finishes throughout. Located in a prime downtown location, this property features an open concept living space, gourmet kitchen with high-end appliances, and a spacious primary suite with a spa-like bathroom. Building amenities include a fitness center, rooftop terrace, and 24-hour concierge service.",
    address: "123 Urban Street, Downtown",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    yearBuilt: 2018,
    parkingSpaces: 1,
    propertyType: "Apartment",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=1200&q=80",
      "https://images.unsplash.com/photo-1560449752-3fd74f5f509c?w=1200&q=80",
    ],
    amenities: [
      "Central Air",
      "Dishwasher",
      "Hardwood Floors",
      "Stainless Steel Appliances",
      "Walk-in Closet",
      "Washer/Dryer In Unit",
      "Fitness Center",
      "Rooftop Terrace",
      "24-hour Concierge",
      "Pet Friendly",
    ],
    features: [
      { name: "Elevator", available: true },
      { name: "Doorman", available: true },
      { name: "Pool", available: false },
      { name: "Balcony", available: true },
      { name: "Smart Home Features", available: true },
      { name: "Storage Unit", available: true },
      { name: "Furnished", available: false },
    ],
    inspectionReport: {
      date: "2023-05-15",
      inspector: "John Smith, Certified Home Inspector",
      rating: 4.5,
      issues: [
        {
          category: "Electrical",
          description: "Minor outlet issues in guest bedroom",
          severity: "low",
        },
        {
          category: "Plumbing",
          description: "Slow drain in guest bathroom",
          severity: "low",
        },
        {
          category: "HVAC",
          description: "Air filter needs replacement",
          severity: "low",
        },
      ],
      pdfUrl: "#",
    },
    floorPlan: {
      imageUrl:
        "https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?w=1200&q=80",
      rooms: [
        { name: "Living Room", dimensions: "15' x 18'", area: 270 },
        { name: "Kitchen", dimensions: "12' x 14'", area: 168 },
        { name: "Primary Bedroom", dimensions: "14' x 16'", area: 224 },
        { name: "Guest Bedroom", dimensions: "12' x 14'", area: 168 },
        { name: "Primary Bathroom", dimensions: "8' x 10'", area: 80 },
        { name: "Guest Bathroom", dimensions: "6' x 8'", area: 48 },
        { name: "Balcony", dimensions: "6' x 12'", area: 72 },
      ],
    },
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@realestate.com",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  };

  // Handle scroll event to show/hide scroll to top button
  React.useEffect(() => {
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

  const handleBookViewing = () => {
    console.log(`Booking viewing for property ${id}`);
    // In a real app, you would open a booking dialog or navigate to a booking page
  };

  const handleContactAgent = () => {
    console.log(`Contacting agent for property ${id}`);
    // In a real app, you would open a contact form or dialog
  };

  const handleToggleFavorite = () => {
    console.log(`Toggle favorite for property ${id}`);
    // In a real app, you would update the user's favorites in the database
  };

  const handleShare = () => {
    console.log(`Sharing property ${id}`);
    // In a real app, you would open a share dialog with social media options
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
          <PropertyDetails
            id={property.id}
            title={property.title}
            description={property.description}
            address={property.address}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            area={property.area}
            yearBuilt={property.yearBuilt}
            parkingSpaces={property.parkingSpaces}
            propertyType={property.propertyType}
            images={property.images}
            amenities={property.amenities}
            features={property.features}
            inspectionReport={property.inspectionReport}
            floorPlan={property.floorPlan}
            agent={property.agent}
            onBack={handleBack}
            onBookViewing={handleBookViewing}
            onContactAgent={handleContactAgent}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
          />
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

export default PropertyDetailsPage;
