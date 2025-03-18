import React from "react";
import Header from "@/components/layout/Header";
import BookingManager from "@/components/booking/BookingManager";
import PremiumBanner from "@/components/subscription/PremiumBanner";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const BookingsPage = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

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
          <BookingManager className="bg-white p-6 rounded-lg shadow-sm" />
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

export default BookingsPage;
