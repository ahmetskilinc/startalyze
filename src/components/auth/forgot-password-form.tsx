"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { forgotPassSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { authClient } from "@/server/auth/client";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { ShineBorder } from "../ui/shine-border";

export function ForgotPasswordForm() {
  const [pendingForgetPassword, setPendingForgetPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: { email: "" },
  });

  const handleForgetPassword = async (values: z.infer<typeof forgotPassSchema>) => {
    try {
      await authClient.forgetPassword(
        { email: values.email, redirectTo: "/reset-password" },
        {
          onRequest: () => setPendingForgetPassword(true),
          onError: (ctx) => {
            toast.error((ctx.error?.code as string) ?? "Something went wrong", {
              description: ctx.error.message ?? "Something went wrong.",
            });
          },
        },
      );
      setIsSuccess(true);
    } finally {
      setPendingForgetPassword(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="relative overflow-hidden max-w-[350px] w-full shadow-xl">
        <ShineBorder shineColor={["#5C6BC0", "#FFB74D", "#AB47BC"]} />
        <CardContent className="pt-6 pb-10 flex flex-col items-center text-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground">
            We’ve sent a password reset link to your inbox.
            <br />
            Please follow the instructions to reset your password.
          </p>
          <Link
            href="/signin"
            className="w-full max-w-[200px] inline-flex justify-center rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Return to Sign in
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden max-w-[350px] w-full shadow-xl">
      <ShineBorder shineColor={["#5C6BC0", "#FFB74D", "#AB47BC"]} />

      <CardHeader>
        <CardTitle className="text-xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleForgetPassword)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      disabled={pendingForgetPassword}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={pendingForgetPassword}
            >
              {pendingForgetPassword ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-sm text-muted-foreground flex justify-between">
          <Link href="/signin" className="text-indigo-500 hover:text-indigo-600">
            Back to login
          </Link>
          <Link href="/signup" className="text-indigo-500 hover:text-indigo-600">
            Sign up
          </Link>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground justify-center">
        © {new Date().getFullYear()} Startalyze. All rights reserved.
      </CardFooter>
    </Card>
  );
}
