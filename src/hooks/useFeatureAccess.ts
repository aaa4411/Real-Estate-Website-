import { useSubscription } from "@/context/SubscriptionContext";

// Define all premium features in the application
export type PremiumFeature =
  | "virtualTours"
  | "inspectionReports"
  | "aiRecommendations"
  | "priorityBooking"
  | "directContact"
  | "advancedFilters"
  | "propertyComparison"
  | "emailNotifications";

// Map features to the minimum subscription tier required
const featureTierMap: Record<
  PremiumFeature,
  "free" | "basic" | "premium" | "enterprise"
> = {
  virtualTours: "premium",
  inspectionReports: "premium",
  aiRecommendations: "premium",
  priorityBooking: "premium",
  directContact: "premium",
  advancedFilters: "basic",
  propertyComparison: "basic",
  emailNotifications: "basic",
};

export const useFeatureAccess = () => {
  const { currentPlan, isPremium } = useSubscription();

  const canAccessFeature = (feature: PremiumFeature): boolean => {
    if (!currentPlan) return false;

    const requiredTier = featureTierMap[feature];

    // Map tiers to numeric values for comparison
    const tierValues = {
      free: 0,
      basic: 1,
      premium: 2,
      enterprise: 3,
    };

    const userTierValue = tierValues[currentPlan.tier];
    const requiredTierValue = tierValues[requiredTier];

    return userTierValue >= requiredTierValue;
  };

  return {
    canAccessFeature,
    isPremium,
  };
};
