import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useSubscription } from "@/context/SubscriptionContext";
import { cancelSubscription } from "@/lib/subscription";
import SubscriptionPlans from "./SubscriptionPlans";
import PaymentForm from "./PaymentForm";
import { SubscriptionPlan } from "@/types/subscription";

interface SubscriptionManagerProps {
  userId: string;
}

const SubscriptionManager = ({
  userId = "demo-user",
}: SubscriptionManagerProps) => {
  const { userSubscription, currentPlan, daysRemaining, refreshSubscription } =
    useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const { toast } = useToast();

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = async (subscriptionId: string) => {
    setShowPaymentForm(false);
    setSelectedPlan(null);
    await refreshSubscription(userId);
  };

  const handleCancelSubscription = async () => {
    if (!userSubscription) return;

    const result = await cancelSubscription(userSubscription.id);

    if (result.success) {
      toast({
        title: "Subscription cancelled",
        description:
          "Your subscription will end at the end of the current billing period",
        variant: "default",
      });
      await refreshSubscription(userId);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to cancel subscription",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>

      {userSubscription && currentPlan ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              You are currently on the {currentPlan.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                {userSubscription.status.charAt(0).toUpperCase() +
                  userSubscription.status.slice(1)}
              </p>
              <p>
                <strong>Billing Period:</strong>{" "}
                {new Date(
                  userSubscription.currentPeriodStart,
                ).toLocaleDateString()}{" "}
                to{" "}
                {new Date(
                  userSubscription.currentPeriodEnd,
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Days Remaining:</strong> {daysRemaining}
              </p>
              {userSubscription.cancelAtPeriodEnd && (
                <p className="text-amber-600">
                  Your subscription will end on{" "}
                  {new Date(
                    userSubscription.currentPeriodEnd,
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Change Plan</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Change Subscription Plan</DialogTitle>
                  <DialogDescription>
                    Select a new plan to upgrade or downgrade your subscription
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="monthly" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
                    <TabsTrigger
                      value="monthly"
                      onClick={() => setBillingInterval("monthly")}
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="yearly"
                      onClick={() => setBillingInterval("yearly")}
                    >
                      Yearly
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly">
                    <SubscriptionPlans
                      onSelectPlan={handleSelectPlan}
                      interval="monthly"
                    />
                  </TabsContent>
                  <TabsContent value="yearly">
                    <SubscriptionPlans
                      onSelectPlan={handleSelectPlan}
                      interval="yearly"
                    />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            {!userSubscription.cancelAtPeriodEnd && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel Subscription</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your subscription will remain active until the end of the
                      current billing period on{" "}
                      {new Date(
                        userSubscription.currentPeriodEnd,
                      ).toLocaleDateString()}
                      . After that, you will be downgraded to the free plan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No Active Subscription</CardTitle>
            <CardDescription>
              You are currently on the free plan. Upgrade to access premium
              features.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button>View Plans</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Choose a Subscription Plan</DialogTitle>
                  <DialogDescription>
                    Select a plan to access premium features
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="monthly" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4">
                    <TabsTrigger
                      value="monthly"
                      onClick={() => setBillingInterval("monthly")}
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      value="yearly"
                      onClick={() => setBillingInterval("yearly")}
                    >
                      Yearly
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly">
                    <SubscriptionPlans
                      onSelectPlan={handleSelectPlan}
                      interval="monthly"
                    />
                  </TabsContent>
                  <TabsContent value="yearly">
                    <SubscriptionPlans
                      onSelectPlan={handleSelectPlan}
                      interval="yearly"
                    />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      )}

      <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <PaymentForm
              plan={selectedPlan}
              userId={userId}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPaymentForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold mb-4">Premium Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Virtual Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Access unlimited 3D virtual tours of properties without scheduling
              in-person visits.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inspection Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              View detailed professional inspection reports for all properties.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Get personalized property recommendations based on your
              preferences and browsing history.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionManager;
