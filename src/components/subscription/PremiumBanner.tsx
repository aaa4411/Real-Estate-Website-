import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Zap, Star } from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";

interface PremiumBannerProps {
  isSubscribed?: boolean;
  daysLeft?: number;
  onUpgrade?: () => void;
  onViewBenefits?: () => void;
}

const PremiumBanner = ({
  isSubscribed,
  daysLeft,
  onUpgrade = () => console.log("Upgrade clicked"),
  onViewBenefits = () => console.log("View benefits clicked"),
}: PremiumBannerProps) => {
  const { isPremium, daysRemaining, isLoading } = useSubscription();
  const navigate = useNavigate();

  // Use props if provided, otherwise use context values
  const isSubscribedValue =
    isSubscribed !== undefined ? isSubscribed : isPremium;
  const daysLeftValue = daysLeft !== undefined ? daysLeft : daysRemaining;

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate("/subscription");
    }
  };

  const handleViewBenefits = () => {
    if (onViewBenefits) {
      onViewBenefits();
    } else {
      navigate("/subscription");
    }
  };

  if (isLoading) {
    return null; // Don't show banner while loading subscription status
  }

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 flex flex-col sm:flex-row items-center justify-between shadow-md gap-3">
      <div className="flex items-center space-x-3">
        <Crown className="h-6 w-6 text-amber-200" />
        {isSubscribedValue ? (
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-amber-200 text-amber-800 font-medium shadow-sm"
            >
              Premium Active
            </Badge>
            <span className="text-sm font-medium">
              {daysLeftValue} days remaining on your subscription
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="font-medium">Unlock Premium Features</span>
            <Badge
              variant="secondary"
              className="bg-amber-200 text-amber-800 font-medium shadow-sm"
            >
              <Zap className="h-3 w-3 mr-1" />
              Limited Offer
            </Badge>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {!isSubscribedValue && (
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-amber-600 hover:bg-amber-50 shadow-md hover:shadow-lg transition-all"
            onClick={handleUpgrade}
          >
            <Star className="h-4 w-4 mr-1" />
            Upgrade Now
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-amber-400 hover:text-white transition-colors"
          onClick={handleViewBenefits}
        >
          {isSubscribedValue ? "Manage Subscription" : "View Benefits"}
        </Button>
      </div>
    </div>
  );
};

export default PremiumBanner;
