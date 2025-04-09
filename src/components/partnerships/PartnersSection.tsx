import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Wrench, Search } from "lucide-react";
import LocalBusinessPartner from "./LocalBusinessPartner";
import SectionHeading from "@/components/common/SectionHeading";

interface PartnersSectionProps {
  title?: string;
  description?: string;
  showAllLink?: string;
  partners?: Array<{
    name: string;
    description: string;
    logo: string;
    category: "furniture" | "services" | "maintenance" | "inspection" | "other";
    discount?: string;
    website?: string;
    featured?: boolean;
  }>;
}

const PartnersSection = ({
  title = "Our Local Business Partners",
  description = "Discover exclusive deals and services from our trusted local partners to enhance your property experience",
  showAllLink = "/partners",
  partners = [
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
  ],
}: PartnersSectionProps) => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container">
        <SectionHeading title={title} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {partners.map((partner, index) => (
            <LocalBusinessPartner
              key={index}
              name={partner.name}
              description={partner.description}
              logo={partner.logo}
              category={partner.category}
              discount={partner.discount}
              website={partner.website}
              featured={partner.featured}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-5 w-5" />
            <span>Furniture Partners: 2</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wrench className="h-5 w-5" />
            <span>Service Partners: 2</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="h-5 w-5" />
            <span>Data Partners: 1</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="group hover:bg-primary hover:text-white transition-colors"
          >
            View All Partners{" "}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
