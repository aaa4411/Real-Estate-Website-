import React from "react";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building, MapPin, ArrowRight } from "lucide-react";
import PropertyCard from "./property/PropertyCard";
import PremiumBanner from "./subscription/PremiumBanner";

function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Mock featured properties
  const featuredProperties = [
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
  ];

  // Mock popular locations
  const popularLocations = [
    {
      name: "Downtown",
      propertyCount: 156,
      imageUrl:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    },
    {
      name: "Westside",
      propertyCount: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80",
    },
    {
      name: "Uptown",
      propertyCount: 112,
      imageUrl:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    },
    {
      name: "Riverside",
      propertyCount: 74,
      imageUrl:
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        username="John Doe"
        isPremium={false}
        notificationCount={3}
        onSearch={(query) => console.log("Search query:", query)}
      />

      <PremiumBanner />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <div
          className="h-[600px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover thousands of properties with virtual tours and AI-powered
              recommendations
            </p>
            <div className="max-w-3xl mx-auto bg-white rounded-lg p-2 shadow-lg">
              <form
                className="flex flex-col md:flex-row gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/properties?q=${encodeURIComponent(
                    searchQuery,
                  )}`;
                }}
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by location, property type, or features"
                    className="pl-10 h-12 text-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="h-12 px-6">
                  Search Properties
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Button variant="outline" asChild>
            <Link to="/properties">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
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
            />
          ))}
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Locations</h2>
            <Button variant="outline">
              View All Locations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((location) => (
              <Link
                key={location.name}
                to={`/properties?location=${encodeURIComponent(location.name)}`}
                className="group relative rounded-lg overflow-hidden h-64 shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                <img
                  src={location.imageUrl}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <h3 className="text-xl font-bold">{location.name}</h3>
                  </div>
                  <p className="text-sm">{location.propertyCount} properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Virtual Tours</h3>
            <p className="text-muted-foreground">
              Explore properties from the comfort of your home with our
              interactive 3D virtual tours.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
            <p className="text-muted-foreground">
              Get personalized property suggestions based on your preferences
              and browsing history.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-primary"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Inspection Reports</h3>
            <p className="text-muted-foreground">
              Access detailed professional inspection reports for all properties
              with our premium subscription.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/subscription">
              Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-6 w-6" />
                <span className="text-xl font-bold">RealEstate</span>
              </div>
              <p className="text-gray-400">
                Find your perfect home with our AI-powered real estate platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/properties"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subscription"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Virtual Tours</li>
                <li className="text-gray-400">AI Recommendations</li>
                <li className="text-gray-400">Inspection Reports</li>
                <li className="text-gray-400">Digital Contracts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">support@realestate.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">
                  123 Main Street, Suite 100, San Francisco, CA 94105
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 RealEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
