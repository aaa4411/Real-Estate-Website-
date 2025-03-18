import { supabase } from "./supabase";
import {
  SubscriptionPlan,
  SubscriptionStatus,
  SubscriptionTier,
  UserSubscription,
} from "@/types/subscription";

// Mock subscription plans - in a real app, these would come from your database
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free-plan",
    name: "Free",
    description: "Basic access to property listings",
    price: 0,
    interval: "monthly",
    features: [
      "Basic property search",
      "View property details",
      "Save favorite properties",
    ],
    tier: "free",
  },
  {
    id: "basic-plan",
    name: "Basic",
    description: "Enhanced property search and filters",
    price: 9.99,
    interval: "monthly",
    features: [
      "All Free features",
      "Advanced search filters",
      "Property comparison tool",
      "Email notifications for new listings",
    ],
    tier: "basic",
  },
  {
    id: "premium-plan",
    name: "Premium",
    description: "Full access to all features including virtual tours",
    price: 19.99,
    interval: "monthly",
    features: [
      "All Basic features",
      "Unlimited virtual tours",
      "Priority booking",
      "Professional inspection reports",
      "Direct contact with property owners",
      "AI-powered recommendations",
    ],
    tier: "premium",
  },
  {
    id: "enterprise-plan",
    name: "Enterprise",
    description: "Custom solutions for real estate agencies",
    price: 49.99,
    interval: "monthly",
    features: [
      "All Premium features",
      "Bulk property management",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Analytics dashboard",
    ],
    tier: "enterprise",
  },
];

// Mock user subscription - in a real app, this would be fetched from your database
let mockUserSubscription: UserSubscription | null = null;

// Subscription context management
export async function getCurrentUserSubscription(
  userId: string,
): Promise<UserSubscription | null> {
  // In a real app, you would fetch this from your database
  // For now, we'll use the mock data
  if (mockUserSubscription) {
    return mockUserSubscription;
  }

  // If Supabase is configured, try to fetch from there
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;

      if (data) {
        return {
          id: data.id,
          userId: data.user_id,
          planId: data.plan_id,
          status: data.status as SubscriptionStatus,
          currentPeriodStart: new Date(data.current_period_start),
          currentPeriodEnd: new Date(data.current_period_end),
          cancelAtPeriodEnd: data.cancel_at_period_end,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  }

  return null;
}

export function getSubscriptionPlan(
  planId: string,
): SubscriptionPlan | undefined {
  return subscriptionPlans.find((plan) => plan.id === planId);
}

export function getDaysRemaining(endDate: Date): number {
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function isFeatureAvailable(
  feature: string,
  userSubscription: UserSubscription | null,
): boolean {
  if (!userSubscription) return false;

  const plan = getSubscriptionPlan(userSubscription.planId);
  if (!plan) return false;

  return plan.features.includes(feature);
}

// Mock payment processing - in a real app, you would integrate with a payment provider
export async function processSubscriptionPayment(
  userId: string,
  planId: string,
  paymentDetails: any,
): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
  // Simulate payment processing
  try {
    // In a real app, you would call your payment provider's API here
    console.log(
      "Processing payment for user",
      userId,
      "plan",
      planId,
      "with details",
      paymentDetails,
    );

    // Simulate a successful payment
    const plan = getSubscriptionPlan(planId);
    if (!plan) {
      return { success: false, error: "Invalid plan selected" };
    }

    // Create a new subscription
    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const newSubscription: UserSubscription = {
      id: `sub_${Math.random().toString(36).substring(2, 15)}`,
      userId,
      planId,
      status: "active",
      currentPeriodStart: now,
      currentPeriodEnd: endDate,
      cancelAtPeriodEnd: false,
      createdAt: now,
      updatedAt: now,
    };

    // In a real app, you would save this to your database
    mockUserSubscription = newSubscription;

    // If Supabase is configured, save to database
    if (supabase) {
      const { error } = await supabase.from("subscriptions").upsert({
        id: newSubscription.id,
        user_id: newSubscription.userId,
        plan_id: newSubscription.planId,
        status: newSubscription.status,
        current_period_start: newSubscription.currentPeriodStart.toISOString(),
        current_period_end: newSubscription.currentPeriodEnd.toISOString(),
        cancel_at_period_end: newSubscription.cancelAtPeriodEnd,
        created_at: newSubscription.createdAt.toISOString(),
        updated_at: newSubscription.updatedAt.toISOString(),
      });

      if (error) {
        console.error("Error saving subscription to database:", error);
      }
    }

    return { success: true, subscriptionId: newSubscription.id };
  } catch (error) {
    console.error("Error processing payment:", error);
    return { success: false, error: "Payment processing failed" };
  }
}

export async function cancelSubscription(
  subscriptionId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real app, you would call your payment provider's API here
    console.log("Cancelling subscription", subscriptionId);

    if (!mockUserSubscription || mockUserSubscription.id !== subscriptionId) {
      return { success: false, error: "Subscription not found" };
    }

    // Update the subscription
    mockUserSubscription = {
      ...mockUserSubscription,
      cancelAtPeriodEnd: true,
      updatedAt: new Date(),
    };

    // If Supabase is configured, update in database
    if (supabase) {
      const { error } = await supabase
        .from("subscriptions")
        .update({
          cancel_at_period_end: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscriptionId);

      if (error) {
        console.error("Error updating subscription in database:", error);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { success: false, error: "Failed to cancel subscription" };
  }
}
