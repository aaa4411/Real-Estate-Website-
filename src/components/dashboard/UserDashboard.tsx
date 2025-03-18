import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PropertyCard from "@/components/property/PropertyCard";
import PremiumBanner from "@/components/subscription/PremiumBanner";
import { useSubscription } from "@/context/SubscriptionContext";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import {
  Home,
  Heart,
  Clock,
  Calendar,
  Search,
  Settings,
  Bell,
  Star,
  Building,
  MapPin,
  ArrowRight,
  Plus,
} from "lucide-react";

interface UserDashboardProps {
  username?: string;
  email?: string;
  avatarUrl?: string;
}

const UserDashboard = ({
  username = "John Doe",
  email = "john.doe@example.com",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
}: UserDashboardProps) => {
  const { isPremium, daysRemaining } = useSubscription();
  const { canAccessFeature } = useFeatureAccess();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for saved properties
  const savedProperties = [
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

  // Mock data for recent searches
  const recentSearches = [
    {
      id: "search1",
      location: "Downtown",
      filters: "2+ beds, $2000-$3000/month",
      date: "2 days ago",
    },
    {
      id: "search2",
      location: "Westside",
      filters: "3+ beds, $3000-$5000/month",
      date: "1 week ago",
    },
    {
      id: "search3",
      location: "Uptown",
      filters: "Luxury apartments, $4000+/month",
      date: "2 weeks ago",
    },
  ];

  // Mock data for upcoming viewings
  const upcomingViewings = [
    {
      id: "viewing1",
      propertyTitle: "Modern Apartment with City View",
      address: "123 Urban Street, Downtown",
      date: "Tomorrow, 10:00 AM",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    },
    {
      id: "viewing2",
      propertyTitle: "Spacious Family Home",
      address: "456 Suburban Lane, Westside",
      date: "Saturday, 2:00 PM",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
  ];

  // Mock data for recommended properties
  const recommendedProperties = [
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
      matchScore: 95,
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
      matchScore: 92,
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
      matchScore: 88,
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: "activity1",
      type: "property_view",
      description: "You viewed Modern Apartment with City View",
      date: "Today, 2:30 PM",
      icon: <Eye className="h-4 w-4" />,
    },
    {
      id: "activity2",
      type: "saved_property",
      description: "You saved Spacious Family Home to favorites",
      date: "Yesterday, 11:15 AM",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      id: "activity3",
      type: "booking",
      description: "You scheduled a viewing for Luxury Penthouse Suite",
      date: "2 days ago, 4:45 PM",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "activity4",
      type: "search",
      description: "You searched for properties in Downtown",
      date: "3 days ago, 10:20 AM",
      icon: <Search className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Banner */}
      <PremiumBanner isSubscribed={isPremium} daysLeft={daysRemaining} />

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Card */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="w-full md:w-2/3">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl} alt={username} />
                  <AvatarFallback>
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-2xl font-bold">{username}</h2>
                      <p className="text-muted-foreground">{email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPremium && (
                        <Badge className="bg-amber-500 text-white">
                          <Star className="h-3 w-3 mr-1" /> Premium
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" /> Edit Profile
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="py-1.5">
                        <Heart className="h-3.5 w-3.5 mr-1 text-rose-500" />
                        {savedProperties.length} Saved Properties
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="py-1.5">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-blue-500" />
                        {upcomingViewings.length} Upcoming Viewings
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="py-1.5">
                        <Clock className="h-3.5 w-3.5 mr-1 text-amber-500" />
                        {recentSearches.length} Recent Searches
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-3">
                <Button className="flex flex-col h-auto py-4" variant="outline">
                  <Search className="h-5 w-5 mb-1" />
                  <span>Search Properties</span>
                </Button>
                <Button className="flex flex-col h-auto py-4" variant="outline">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span>My Viewings</span>
                </Button>
                <Button className="flex flex-col h-auto py-4" variant="outline">
                  <Heart className="h-5 w-5 mb-1" />
                  <span>Saved Properties</span>
                </Button>
                <Button className="flex flex-col h-auto py-4" variant="outline">
                  <Bell className="h-5 w-5 mb-1" />
                  <span>Notifications</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 md:w-[600px] mb-8">
            <TabsTrigger value="overview">
              <Home className="h-4 w-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Heart className="h-4 w-4 mr-2" /> Saved
            </TabsTrigger>
            <TabsTrigger value="viewings">
              <Calendar className="h-4 w-4 mr-2" /> Viewings
            </TabsTrigger>
            <TabsTrigger value="recommended">
              <Star className="h-4 w-4 mr-2" /> Recommended
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                    >
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Recent Searches</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSearches.map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{search.location}</p>
                          <p className="text-sm text-muted-foreground">
                            {search.filters}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {search.date}
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Search Again</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Properties */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Featured Properties</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.slice(0, 3).map((property) => (
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
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Properties Tab */}
          <TabsContent value="saved" className="space-y-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Saved Properties</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Create Collection
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {savedProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No saved properties
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      You haven't saved any properties yet. Browse properties
                      and click the heart icon to save them here.
                    </p>
                    <Button className="mt-4">
                      <Search className="h-4 w-4 mr-2" /> Browse Properties
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProperties.map((property) => (
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
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Viewings Tab */}
          <TabsContent value="viewings" className="space-y-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Upcoming Viewings</CardTitle>
                  <Button variant="ghost" size="sm">
                    View Calendar <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingViewings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No upcoming viewings
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      You don't have any scheduled property viewings. Browse
                      properties and book a viewing to see them here.
                    </p>
                    <Button className="mt-4">
                      <Search className="h-4 w-4 mr-2" /> Browse Properties
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingViewings.map((viewing) => (
                      <div
                        key={viewing.id}
                        className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden"
                      >
                        <div className="w-full md:w-1/4 h-48 md:h-auto">
                          <img
                            src={viewing.imageUrl}
                            alt={viewing.propertyTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {viewing.propertyTitle}
                            </h3>
                            <p className="text-muted-foreground">
                              {viewing.address}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span className="font-medium">
                                {viewing.date}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                              <Button size="sm" variant="destructive">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">
                    <div className="flex items-center">
                      AI Recommended Properties
                      {!isPremium && (
                        <Badge
                          variant="outline"
                          className="ml-2 border-amber-500 text-amber-500"
                        >
                          Premium Feature
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!canAccessFeature("aiRecommendations") ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <Sparkles className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Unlock AI Recommendations
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      Upgrade to Premium to get personalized property
                      recommendations based on your preferences and browsing
                      history.
                    </p>
                    <Button className="bg-amber-500 hover:bg-amber-600">
                      <Star className="h-4 w-4 mr-2" /> Upgrade to Premium
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedProperties.map((property) => (
                      <div key={property.id} className="flex justify-center">
                        <div className="relative w-full max-w-[360px]">
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
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-blue-500">
                              {property.matchScore}% Match
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;

// Helper component for the activity icon
const Eye = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Custom Sparkles icon component
const Sparkles = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
