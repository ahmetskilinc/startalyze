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

const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const OnboardingPage = () => {
  const [userOnboarded, setUserOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/auth/check-onboarded");
      const data = await response.json();
      setUserOnboarded(data.isOnboarded);
    };
    fetchUserData();
  }, []);

  const updateUser = async (values: z.infer<typeof onboardingSchema>) => {
    console.log({
      firstName: values.firstName,
      lastName: values.lastName,
      name: `${values.firstName} ${values.lastName}`,
    });

    const { error: userError } = await authClient.updateUser({
      firstName: values.firstName,
      lastName: values.lastName,
      name: `${values.firstName} ${values.lastName}`,
    });

    if (userError) {
      console.error("Error updating user:", userError);
      return;
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
    },
  });

  if (userOnboarded) {
    redirect("/me/my-links");
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
        <Card className="rounded-none sm:rounded-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome to Startalyzer
            </CardTitle>
            <CardDescription>
              Let&apos;s set up your account with some basic information to get you
              started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateUser)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="grid gap-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Complete Setup
                  </Button>
                  <p className="text-muted-foreground mt-2 text-center text-sm">
                    You can always update these preferences later in your account
                    settings.
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
