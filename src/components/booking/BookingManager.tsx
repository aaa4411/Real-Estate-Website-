import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Home, X, Check } from "lucide-react";
import { format } from "date-fns";
import { BookingDetails } from "./BookingCalendar";

interface BookingManagerProps {
  userId?: string;
  className?: string;
}

type Booking = BookingDetails & {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  createdAt: Date;
};

const BookingManager = ({
  userId = "user123",
  className = "",
}: BookingManagerProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch bookings
    const fetchBookings = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      const mockBookings: Booking[] = [
        {
          id: "booking1",
          propertyId: "1",
          propertyTitle: "Modern Apartment with City View",
          propertyAddress: "123 Urban Street, Downtown",
          propertyImage:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
          date: new Date(Date.now() + 86400000 * 3), // 3 days from now
          timeSlot: "10:00 AM",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          notes: "I'd like to know about parking options.",
          status: "confirmed",
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: "booking2",
          propertyId: "2",
          propertyTitle: "Spacious Family Home",
          propertyAddress: "456 Suburban Lane, Westside",
          propertyImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
          date: new Date(Date.now() + 86400000 * 5), // 5 days from now
          timeSlot: "2:00 PM",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          notes: "",
          status: "pending",
          createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          id: "booking3",
          propertyId: "3",
          propertyTitle: "Luxury Penthouse Suite",
          propertyAddress: "789 Skyline Avenue, Uptown",
          propertyImage:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          date: new Date(Date.now() - 86400000 * 2), // 2 days ago
          timeSlot: "11:00 AM",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(555) 123-4567",
          notes: "I'm interested in the building amenities.",
          status: "cancelled",
          createdAt: new Date(Date.now() - 86400000 * 4), // 4 days ago
        },
      ];

      setBookings(mockBookings);
      setIsLoading(false);
    };

    fetchBookings();
  }, [userId]);

  const handleCancelBooking = (bookingId: string) => {
    // In a real app, this would make an API call
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking,
      ),
    );
  };

  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings.filter(
      (booking) =>
        new Date(booking.date) > now &&
        (booking.status === "confirmed" || booking.status === "pending"),
    );
  };

  const getPastBookings = () => {
    const now = new Date();
    return bookings.filter(
      (booking) =>
        new Date(booking.date) < now || booking.status === "cancelled",
    );
  };

  const renderBookingCard = (booking: Booking) => {
    const isPast =
      new Date(booking.date) < new Date() || booking.status === "cancelled";

    return (
      <Card key={booking.id} className="mb-4">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 h-48 md:h-auto relative">
              <img
                src={booking.propertyImage}
                alt={booking.propertyTitle}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${isPast ? "bg-gray-500" : booking.status === "confirmed" ? "bg-green-500" : booking.status === "pending" ? "bg-amber-500" : "bg-red-500"}`}
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold mb-1">
                {booking.propertyTitle}
              </h3>
              <p className="text-muted-foreground flex items-center mb-3">
                <MapPin className="h-4 w-4 mr-1" /> {booking.propertyAddress}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {format(new Date(booking.date), "EEEE, MMMM do, yyyy")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{booking.timeSlot}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Booked on {format(new Date(booking.createdAt), "MMM d, yyyy")}
                </div>
                {!isPast && booking.status !== "cancelled" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    <X className="h-4 w-4 mr-1" /> Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">My Property Viewings</h2>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">
            Upcoming{" "}
            <Badge className="ml-2 bg-primary" variant="secondary">
              {getUpcomingBookings().length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past">
            Past{" "}
            <Badge className="ml-2" variant="outline">
              {getPastBookings().length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          ) : getUpcomingBookings().length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming viewings</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You don't have any scheduled property viewings. Browse
                properties and book a viewing to see them here.
              </p>
            </div>
          ) : (
            getUpcomingBookings().map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="past">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-center">
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          ) : getPastBookings().length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No past viewings</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You don't have any past property viewings. Once you complete or
                cancel viewings, they will appear here.
              </p>
            </div>
          ) : (
            getPastBookings().map(renderBookingCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingManager;
