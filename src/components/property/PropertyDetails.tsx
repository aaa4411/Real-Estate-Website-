import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import BookingDialog from "@/components/booking/BookingDialog";
import VirtualTour from "@/components/property/VirtualTour";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  Share2,
  Calendar,
  MapPin,
  Ruler,
  Home,
  Bath,
  BedDouble,
  Car,
  Maximize2,
  FileText,
  CheckCircle2,
  XCircle,
  Info,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

interface PropertyDetailsProps {
  id?: string;
  title?: string;
  description?: string;
  address?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  yearBuilt?: number;
  parkingSpaces?: number;
  propertyType?: string;
  images?: string[];
  amenities?: string[];
  features?: { name: string; available: boolean }[];
  inspectionReport?: {
    date: string;
    inspector: string;
    rating: number;
    issues: {
      category: string;
      description: string;
      severity: "low" | "medium" | "high";
    }[];
    pdfUrl?: string;
  };
  floorPlan?: {
    imageUrl: string;
    rooms: { name: string; dimensions: string; area: number }[];
  };
  agent?: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  onBack?: () => void;
  onBookViewing?: () => void;
  onContactAgent?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
}

const PropertyDetails = ({
  id = "1",
  title = "Modern Apartment with City View",
  description = "This stunning modern apartment offers breathtaking city views and luxurious finishes throughout. Located in a prime downtown location, this property features an open concept living space, gourmet kitchen with high-end appliances, and a spacious primary suite with a spa-like bathroom. Building amenities include a fitness center, rooftop terrace, and 24-hour concierge service.",
  address = "123 Urban Street, Downtown",
  price = 2500,
  bedrooms = 2,
  bathrooms = 2,
  area = 1200,
  yearBuilt = 2018,
  parkingSpaces = 1,
  propertyType = "Apartment",
  images = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?w=1200&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&q=80",
    "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=1200&q=80",
    "https://images.unsplash.com/photo-1560449752-3fd74f5f509c?w=1200&q=80",
  ],
  amenities = [
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
  features = [
    { name: "Elevator", available: true },
    { name: "Doorman", available: true },
    { name: "Pool", available: false },
    { name: "Balcony", available: true },
    { name: "Smart Home Features", available: true },
    { name: "Storage Unit", available: true },
    { name: "Furnished", available: false },
  ],
  inspectionReport = {
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
  floorPlan = {
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
  agent = {
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.johnson@realestate.com",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  onBack = () => {},
  onBookViewing = () => {},
  onContactAgent = () => {},
  onToggleFavorite = () => {},
  onShare = () => {},
}: PropertyDetailsProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-1"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" /> Back to search results
      </Button>

      {/* Property title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1" /> {address}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={isFavorite ? "text-rose-500" : ""}
            onClick={handleToggleFavorite}
          >
            <Heart
              className="h-5 w-5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>
          <Button variant="outline" size="icon" onClick={onShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <BookingDialog
            propertyId={id}
            propertyTitle={title}
            onBookingComplete={(details) =>
              console.log("Booking completed:", details)
            }
            trigger={
              <Button>
                <Calendar className="h-4 w-4 mr-2" /> Book Viewing
              </Button>
            }
          />
        </div>
      </div>

      {/* Price and badges */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Badge className="text-lg py-1.5 px-3 bg-primary text-primary-foreground">
          ${price.toLocaleString()}/month
        </Badge>
        <Badge variant="secondary" className="py-1">
          {propertyType}
        </Badge>
        <Badge variant="outline" className="py-1">
          Available Now
        </Badge>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images and details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={images[activeImageIndex]}
                  alt={`Property image ${activeImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>

            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/4 md:basis-1/5 lg:basis-1/6"
                  >
                    <div
                      className={`relative rounded-md overflow-hidden border cursor-pointer ${index === activeImageIndex ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <AspectRatio ratio={1}>
                        <img
                          src={image}
                          alt={`Property thumbnail ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3" />
              <CarouselNext className="-right-3" />
            </Carousel>
          </div>

          {/* Property details tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="virtualtour">Virtual Tour</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="virtualtour" className="pt-4">
              <VirtualTour
                propertyId={id}
                propertyTitle={title}
                isPremiumFeature={true}
                onUpgradeClick={() =>
                  console.log("Upgrade clicked from virtual tour")
                }
              />
            </TabsContent>

            <TabsContent value="overview" className="space-y-6 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{bedrooms}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{bathrooms}</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{area}</p>
                      <p className="text-sm text-muted-foreground">Sq Ft</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{parkingSpaces}</p>
                      <p className="text-sm text-muted-foreground">Parking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{yearBuilt}</p>
                      <p className="text-sm text-muted-foreground">
                        Year Built
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{propertyType}</p>
                      <p className="text-sm text-muted-foreground">Type</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Features tab */}
            <TabsContent value="features" className="space-y-6 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Property Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {feature.available ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span
                        className={
                          feature.available ? "" : "text-muted-foreground"
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Floor Plan tab */}
            <TabsContent value="floorplan" className="space-y-6 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Floor Plan</h3>
                <div className="mb-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer relative rounded-lg overflow-hidden border">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={floorPlan.imageUrl}
                            alt="Floor plan"
                            className="object-contain w-full h-full"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary">
                            <Maximize2 className="h-4 w-4 mr-2" /> View Full
                            Size
                          </Button>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Floor Plan</DialogTitle>
                        <DialogDescription>
                          Detailed floor plan for {title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <img
                          src={floorPlan.imageUrl}
                          alt="Floor plan full size"
                          className="w-full h-auto"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <h4 className="text-lg font-medium mb-3">Room Dimensions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {floorPlan.rooms.map((room, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{room.name}</h5>
                          <Badge variant="outline">{room.area} sq ft</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Dimensions: {room.dimensions}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Inspection tab */}
            <TabsContent value="inspection" className="space-y-6 pt-4">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Inspection Report</h3>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={inspectionReport.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4 mr-2" /> Download PDF
                    </a>
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Inspection Date: {formatDate(inspectionReport.date)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Inspector: {inspectionReport.inspector}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Overall Rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-5 w-5 ${star <= Math.floor(inspectionReport.rating) ? "text-amber-500" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm font-medium">
                          {inspectionReport.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-medium mb-3">Issues Found</h4>
                {inspectionReport.issues.length === 0 ? (
                  <p className="text-green-600 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" /> No issues found in
                    the inspection
                  </p>
                ) : (
                  <div className="space-y-4">
                    {inspectionReport.issues.map((issue, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">{issue.category}</h5>
                            <Badge
                              variant={
                                {
                                  low: "outline",
                                  medium: "secondary",
                                  high: "destructive",
                                }[issue.severity]
                              }
                            >
                              {issue.severity.charAt(0).toUpperCase() +
                                issue.severity.slice(1)}{" "}
                              Severity
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {issue.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Agent info and actions */}
        <div className="space-y-6">
          {/* Price card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">
                ${price.toLocaleString()}
                <span className="text-lg font-normal">/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <BedDouble className="h-4 w-4" />
                <span>{bedrooms} beds</span>
                <span>•</span>
                <Bath className="h-4 w-4" />
                <span>{bathrooms} baths</span>
                <span>•</span>
                <Maximize2 className="h-4 w-4" />
                <span>{area} sq ft</span>
              </div>
              <BookingDialog
                propertyId={id}
                propertyTitle={title}
                onBookingComplete={(details) =>
                  console.log("Booking completed:", details)
                }
                trigger={
                  <Button className="w-full mb-3">
                    <Calendar className="h-4 w-4 mr-2" /> Book Viewing
                  </Button>
                }
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={onContactAgent}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Contact Agent
              </Button>
            </CardContent>
          </Card>

          {/* Agent card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Listing Agent</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{agent.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Real Estate Agent
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={`tel:${agent.phone}`}>
                    <Phone className="h-4 w-4 mr-2" /> {agent.phone}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={`mailto:${agent.email}`}>
                    <Mail className="h-4 w-4 mr-2" /> {agent.email}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Location info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="rounded-lg overflow-hidden border mb-4">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=800&q=80"
                    alt="Map location"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{address}</p>
                    <p className="text-sm text-muted-foreground">Downtown</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">
                      Walk Score: <span className="font-medium">92</span>{" "}
                      (Walker's Paradise)
                    </p>
                    <p className="text-sm">
                      Transit Score: <span className="font-medium">95</span>{" "}
                      (Excellent Transit)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
