"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/server/auth/client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { env } from "@/lib/env";

const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  version: z.enum(["free", "pro"]),
});

const OnboardingPage = () => {
  const [userOnboarded, setUserOnboarded] = useState<boolean>(false);
  const [showProPurchase, setShowProPurchase] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/auth/check-onboarded");
      const data = await response.json();
      setUserOnboarded(data.isOnboarded);
    };
    fetchUserData();
  }, []);

  const updateUser = async (values: z.infer<typeof onboardingSchema>) => {
    if (values.version === "pro" && !showProPurchase) {
      setShowProPurchase(true);
      return;
    }

    const { error: userError } = await authClient.updateUser({
      firstName: values.firstName,
      lastName: values.lastName,
      name: `${values.firstName} ${values.lastName}`,
    });

    if (userError) {
      console.error("Error updating user:", userError);
      return;
    }

    if (values.version === "pro" && showProPurchase) {
      redirect(
        "/api/auth/checkout?productId=" + env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
      );
    }

    const { error: userOnboardedError } = await authClient.updateUser({
      onboardingCompleted: true,
    });

    if (userOnboardedError) {
      console.error("Error updating user:", userOnboardedError);
      return;
    }

    setUserOnboarded(true);
  };

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      version: "free",
    },
  });

  if (userOnboarded) {
    redirect("/chat");
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <Card className="rounded-none sm:rounded-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome to Startalyze
            </CardTitle>
            <CardDescription>
              Let&apos;s set up your account with some basic information to get you
              started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateUser)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Your Plan</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={field.value === "free" ? "default" : "outline"}
                          className="w-full"
                          onClick={() => field.onChange("free")}
                        >
                          Free Plan
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "pro" ? "default" : "outline"}
                          className="w-full"
                          onClick={() => field.onChange("pro")}
                        >
                          Pro Plan
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showProPurchase && (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-semibold">Pro Plan Features</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                        <li>Advanced analytics</li>
                        <li>Unlimited links</li>
                        <li>Custom domains</li>
                        <li>Priority support</li>
                      </ul>
                      <div className="mt-4">
                        <p className="text-lg font-bold">$9.99/month</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {showProPurchase ? "Purchase Pro Plan" : "Continue"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
