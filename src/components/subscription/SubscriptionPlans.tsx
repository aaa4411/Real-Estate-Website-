import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan } from "@/types/subscription";
import { subscriptionPlans } from "@/lib/subscription";
import { useSubscription } from "@/context/SubscriptionContext";

interface SubscriptionPlansProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
  interval?: "monthly" | "yearly";
}

const SubscriptionPlans = ({
  onSelectPlan,
  interval = "monthly",
}: SubscriptionPlansProps) => {
  const { currentPlan, isPremium } = useSubscription();

  const filteredPlans = subscriptionPlans.filter(
    (plan) => plan.interval === interval,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
      {filteredPlans.map((plan) => {
        const isCurrentPlan = currentPlan?.id === plan.id;
        const isPremiumPlan =
          plan.tier === "premium" || plan.tier === "enterprise";

        return (
          <Card
            key={plan.id}
            className={`flex flex-col border-2 ${isCurrentPlan ? "border-amber-500" : "border-gray-200"} ${isPremiumPlan ? "bg-gradient-to-b from-amber-50 to-white" : ""}`}
          >
            <CardHeader>
              {isCurrentPlan && (
                <Badge className="w-fit mb-2 bg-amber-500">Current Plan</Badge>
              )}
              {plan.tier === "premium" && (
                <Badge className="w-fit mb-2 bg-amber-500">Most Popular</Badge>
              )}
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/{interval}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => onSelectPlan(plan)}
                className={`w-full ${isCurrentPlan ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : plan.tier === "premium" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default SubscriptionPlans;
