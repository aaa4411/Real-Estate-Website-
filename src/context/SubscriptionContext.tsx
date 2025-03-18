import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SubscriptionPlan, UserSubscription } from "@/types/subscription";
import {
  getCurrentUserSubscription,
  getSubscriptionPlan,
  getDaysRemaining,
  subscriptionPlans,
} from "@/lib/subscription";

interface SubscriptionContextType {
  userSubscription: UserSubscription | null;
  currentPlan: SubscriptionPlan | null;
  daysRemaining: number;
  isLoading: boolean;
  isPremium: boolean;
  refreshSubscription: (userId: string) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  userSubscription: null,
  currentPlan: null,
  daysRemaining: 0,
  isLoading: true,
  isPremium: false,
  refreshSubscription: async () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

interface SubscriptionProviderProps {
  children: ReactNode;
  userId?: string;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
  userId = "demo-user",
}) => {
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshSubscription = async (uid: string) => {
    setIsLoading(true);
    try {
      const subscription = await getCurrentUserSubscription(uid);
      setUserSubscription(subscription);

      if (subscription) {
        const plan = getSubscriptionPlan(subscription.planId);
        setCurrentPlan(plan || null);
        setDaysRemaining(getDaysRemaining(subscription.currentPeriodEnd));
      } else {
        setCurrentPlan(null);
        setDaysRemaining(0);
      }
    } catch (error) {
      console.error("Error refreshing subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      refreshSubscription(userId);
    }
  }, [userId]);

  const isPremium = Boolean(
    userSubscription &&
      userSubscription.status === "active" &&
      currentPlan &&
      (currentPlan.tier === "premium" || currentPlan.tier === "enterprise"),
  );

  return (
    <SubscriptionContext.Provider
      value={{
        userSubscription,
        currentPlan,
        daysRemaining,
        isLoading,
        isPremium,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
