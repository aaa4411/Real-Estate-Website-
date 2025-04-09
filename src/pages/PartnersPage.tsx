import React, { useState } from "react";
import PageTitle from "@/components/common/PageTitle";
import SectionHeading from "@/components/common/SectionHeading";
import LocalBusinessPartner from "@/components/partnerships/LocalBusinessPartner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const partners = [
  {
    name: "Mobica",
    description:
      "Premium furniture and home accessories with AR preview technology",
    logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
    category: "furniture",
    discount: "15% off for premium members",
    website: "https://example.com/mobica",
    featured: true,
  },
  {
    name: "El Arays",
    description: "Traditional and modern Egyptian furniture designs",
    logo: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200&q=80",
    category: "furniture",
    discount: "10% off your first purchase",
    website: "https://example.com/elarays",
    featured: false,
  },
  {
    name: "Cairo Maintenance",
    description: "Professional property maintenance and repair services",
    logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80",
    category: "maintenance",
    discount: "Free inspection for new homeowners",
    website: "https://example.com/cairomaintenance",
    featured: false,
  },
  {
    name: "CAPMAS Data",
    description: "Official neighborhood statistics and property validation",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80",
    category: "services",
    website: "https://example.com/capmas",
    featured: true,
  },
  {
    name: "Smart Home Solutions",
    description: "Automated home systems and security installations",
    logo: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=200&q=80",
    category: "services",
    discount: "20% off installation for premium members",
    website: "https://example.com/smarthome",
    featured: false,
  },
  {
    name: "Cairo Inspectors",
    description: "Professional property inspection and certification services",
    logo: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=200&q=80",
    category: "inspection",
    discount: "Discounted rates for platform users",
    website: "https://example.com/inspectors",
    featured: false,
  },
  {
    name: "Egyptian Movers",
    description: "Professional moving and relocation services",
    logo: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=200&q=80",
    category: "services",
    discount: "15% off for platform users",
    website: "https://example.com/movers",
    featured: false,
  },
  {
    name: "AUC New Cairo Data",
    description: "Neighborhood statistics and property information near AUC",
    logo: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200&q=80",
    category: "services",
    website: "https://example.com/aucdata",
    featured: false,
  },
];

const PartnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || partner.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8">
      <PageTitle
        title="Local Business Partners - RealEstateAI"
        description="Discover exclusive deals and services from our trusted local partners"
      />

      <SectionHeading
        title="Our Local Business Partners"
        description="Enhance your property experience with services from our trusted partners"
      />

      <div className="mb-8 bg-muted/30 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search partners..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredPartners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner, index) => (
            <LocalBusinessPartner
              key={index}
              name={partner.name}
              description={partner.description}
              logo={partner.logo}
              category={partner.category as any}
              discount={partner.discount}
              website={partner.website}
              featured={partner.featured}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <div className="text-4xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold mb-2">No partners found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any partners matching your search criteria. Please
            try different keywords or filters.
          </p>
        </div>
      )}

      <div className="mt-12 bg-muted/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Become a Partner</h3>
        <p className="text-muted-foreground mb-4">
          Interested in partnering with RealEstateAI? Join our network of local
          businesses and reach thousands of potential customers.
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          Apply for Partnership
        </Button>
      </div>
    </div>
  );
};

export default PartnersPage;
