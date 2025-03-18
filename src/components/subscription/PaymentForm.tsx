import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionPlan } from "@/types/subscription";
import { processSubscriptionPayment } from "@/lib/subscription";
import { useToast } from "@/components/ui/use-toast";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format",
    ),
  cvv: z.string().min(3, "CVV must be at least 3 digits").max(4),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  plan: SubscriptionPlan;
  userId: string;
  onSuccess: (subscriptionId: string) => void;
  onCancel: () => void;
}

const PaymentForm = ({
  plan,
  userId,
  onSuccess,
  onCancel,
}: PaymentFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: PaymentFormValues) => {
    setIsProcessing(true);
    try {
      // Process the payment
      const result = await processSubscriptionPayment(userId, plan.id, data);

      if (result.success && result.subscriptionId) {
        toast({
          title: "Subscription successful",
          description: `You are now subscribed to the ${plan.name} plan`,
          variant: "default",
        });
        onSuccess(result.subscriptionId);
      } else {
        toast({
          title: "Payment failed",
          description:
            result.error || "An error occurred during payment processing",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete your subscription</CardTitle>
        <CardDescription>
          You're subscribing to the {plan.name} plan at ${plan.price}/
          {plan.interval}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4111 1111 1111 1111"
                      {...field}
                      onChange={(e) => {
                        // Format card number with spaces
                        const value = e.target.value
                          .replace(/\s+/g, "")
                          .replace(/[^0-9]/gi, "");
                        const formattedValue = value.replace(
                          /\B(?=(\d{4})+(?!\d))/g,
                          " ",
                        );
                        field.onChange(formattedValue);
                      }}
                      maxLength={19}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        {...field}
                        onChange={(e) => {
                          // Format expiry date
                          let value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length > 2) {
                            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                          }
                          field.onChange(value);
                        }}
                        maxLength={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        {...field}
                        type="password"
                        maxLength={4}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay $${plan.price}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
