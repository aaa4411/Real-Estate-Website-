import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PremiumBanner from "@/components/subscription/PremiumBanner";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { Helmet } from "react-helmet";

interface MainLayoutProps {
  children: React.ReactNode;
  showPremiumBanner?: boolean;
  username?: string;
  isPremium?: boolean;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  pageTitle?: string;
  pageDescription?: string;
}

const MainLayout = ({
  children,
  showPremiumBanner = true,
  username = "John Doe",
  isPremium = false,
  notificationCount = 3,
  onSearch = (query) => console.log("Search query:", query),
  pageTitle = "RealEstateAI - Find Your Perfect Home",
  pageDescription = "Discover your dream property with our AI-powered real estate platform featuring virtual tours and personalized recommendations.",
}: MainLayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isPremium: contextIsPremium, daysRemaining } = useSubscription();

  // Use the prop value if provided, otherwise use the context value
  const effectiveIsPremium =
    isPremium !== undefined ? isPremium : contextIsPremium;

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <Header
        username={username}
        isPremium={effectiveIsPremium}
        notificationCount={notificationCount}
        onSearch={onSearch}
      />

      {showPremiumBanner && (
        <PremiumBanner
          isSubscribed={effectiveIsPremium}
          daysLeft={daysRemaining}
        />
      )}

      <main className="flex-1 container max-w-screen-2xl mx-auto px-4 py-6">
        {children}
      </main>

      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white z-50"
          size="icon"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default MainLayout;
