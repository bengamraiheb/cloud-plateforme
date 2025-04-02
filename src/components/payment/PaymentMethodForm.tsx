
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const creditCardSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number must be at most 19 digits" })
    .regex(/^[0-9\s-]+$/, { message: "Card number can only contain digits, spaces or hyphens" }),
  cardName: z.string().min(3, { message: "Cardholder name is required" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string().length(3, { message: "CVV must be 3 digits" }).regex(/^[0-9]+$/, { message: "CVV can only contain digits" }),
});

export function PaymentMethodForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("credit-card");
  
  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  async function onSubmit(values: z.infer<typeof creditCardSchema>) {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Payment method added:", values);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Format credit card number with spaces
  const formatCreditCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (paymentSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg backdrop-blur-sm bg-card/80 border-white/10">
        <CardContent className="pt-6 flex flex-col items-center justify-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h3 className="text-xl font-bold text-center">Payment Method Added</h3>
          <p className="text-center text-muted-foreground">
            Your payment method has been successfully added to your account.
          </p>
          <Button 
            onClick={() => setPaymentSuccess(false)}
            className="mt-4 bg-gradient-to-r from-primary to-secondary"
          >
            Add Another Payment Method
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg backdrop-blur-sm bg-card/80 border-white/10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="credit-card" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="credit-card" className="data-[state=active]:bg-primary/10">
              <CreditCard className="h-4 w-4 mr-2" />
              Credit Card
            </TabsTrigger>
            <TabsTrigger value="paypal" className="data-[state=active]:bg-primary/10">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.29 6.65c-.5 0-.92.14-1.28.42l.78-4.96c.04-.22.22-.38.44-.38h5.24c.96 0 1.74.22 2.24.64.48.4.74 1 .76 1.78 0 .24-.02.46-.06.7-.38 1.98-1.68 2.66-3.36 2.66h-.34c-.24 0-.42.2-.46.42l-.38 2.24c-.02.14-.14.28-.3.28h-1.9c-.24 0-.38-.2-.34-.4l.96-3.4zm4.4 4.76c.18-.98.9-1.04 1.62-1.04h.36c.24 0 .38-.2.34-.4l-.22-1.4c-.04-.22-.26-.38-.48-.38h-.42c-.5 0-.84.08-1.06.24-.22.18-.36.44-.42.8l-.26 1.78c-.04.2.1.4.34.4h.2zM11.36 13c.6 0 1.14-.36 1.24-.94l.26-1.66c.04-.22.26-.38.48-.38h.98c2.04 0 3.44-1 3.92-3.44.2-1.04.06-1.94-.5-2.54-.62-.66-1.7-.94-3.02-.94H9.93c-.5 0-.94.38-1.02.88l-2.5 15.08c-.04.22.1.42.34.42h2.98c.24 0 .44-.2.48-.4l.5-3.18c.1-.58.64-1 1.24-1h1.41zm7.82-9.62c.1.62-.02 1.3-.4 1.98-.5.9-1.2 1.32-2.1 1.32h-.76c-.24 0-.38.2-.34.4l.72 4.4c.04.22.2.36.44.36h2.02c.22 0 .42-.16.46-.4l1.4-8.32c.02-.14-.1-.26-.24-.26h-1.02c-.08 0-.16.06-.18.12z"/>
              </svg>
              PayPal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-card" className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="4242 4242 4242 4242" 
                          {...field} 
                          onChange={(e) => {
                            const formattedValue = formatCreditCardNumber(e.target.value);
                            field.onChange(formattedValue);
                          }}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          disabled={isLoading}
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
                              const formattedValue = formatExpiryDate(e.target.value);
                              field.onChange(formattedValue);
                            }}
                            maxLength={5}
                            disabled={isLoading}
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
                            maxLength={3}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full mt-2 bg-gradient-to-r from-primary to-secondary" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Add Payment Method"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="paypal">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <svg className="h-16 w-16 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.29 6.65c-.5 0-.92.14-1.28.42l.78-4.96c.04-.22.22-.38.44-.38h5.24c.96 0 1.74.22 2.24.64.48.4.74 1 .76 1.78 0 .24-.02.46-.06.7-.38 1.98-1.68 2.66-3.36 2.66h-.34c-.24 0-.42.2-.46.42l-.38 2.24c-.02.14-.14.28-.3.28h-1.9c-.24 0-.38-.2-.34-.4l.96-3.4zm4.4 4.76c.18-.98.9-1.04 1.62-1.04h.36c.24 0 .38-.2.34-.4l-.22-1.4c-.04-.22-.26-.38-.48-.38h-.42c-.5 0-.84.08-1.06.24-.22.18-.36.44-.42.8l-.26 1.78c-.04.2.1.4.34.4h.2zM11.36 13c.6 0 1.14-.36 1.24-.94l.26-1.66c.04-.22.26-.38.48-.38h.98c2.04 0 3.44-1 3.92-3.44.2-1.04.06-1.94-.5-2.54-.62-.66-1.7-.94-3.02-.94H9.93c-.5 0-.94.38-1.02.88l-2.5 15.08c-.04.22.1.42.34.42h2.98c.24 0 .44-.2.48-.4l.5-3.18c.1-.58.64-1 1.24-1h1.41zm7.82-9.62c.1.62-.02 1.3-.4 1.98-.5.9-1.2 1.32-2.1 1.32h-.76c-.24 0-.38.2-.34.4l.72 4.4c.04.22.2.36.44.36h2.02c.22 0 .42-.16.46-.4l1.4-8.32c.02-.14-.1-.26-.24-.26h-1.02c-.08 0-.16.06-.18.12z"/>
              </svg>
              <p className="text-center">You'll be redirected to PayPal to link your account</p>
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => window.location.href = "/api/payments/paypal/authorize"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  "Connect with PayPal"
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground w-full text-center">
          Your payment information is securely processed and stored by our payment provider. We do not store your complete card details.
        </p>
      </CardFooter>
    </Card>
  );
}
