"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { forgotPassSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
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
          onRequest: () => {
            setPendingForgetPassword(true);
          },
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
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
          <p className="text-sm text-muted-foreground text-center">
            We have sent a password reset link to your email address.
            <br />
            Please check your inbox and follow the instructions.
          </p>
          <Link
            href="/signin"
            className="mt-4 w-full max-w-[200px] inline-flex justify-center rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Return to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Link href="#" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            <GalleryVerticalEnd className="size-5" />
          </div>
          <span className="sr-only">Startalyse</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?
          <br />
          <Link
            href="/signin"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Back to login
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleForgetPassword)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={pendingForgetPassword}>
            {pendingForgetPassword ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
