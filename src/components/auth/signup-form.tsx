"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { signUpSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import Link from "next/link";
import { UI_CUSTOM } from "@/lib/constants";

export function SignupForm() {
  const [pending, setPending] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null,
  );

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setPending(true);
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: "",
          firstName: "",
          lastName: "",
          onboardingCompleted: false,
          plan: "free",
        },
        {
          onSuccess: async () => {
            toast.success("Account created", {
              description: "Check your email for a verification link.",
            });
            await authClient.sendVerificationEmail({
              email: values.email,
              callbackURL: "/",
            });
          },
          onError: (ctx) => {
            setPending(false);
            toast.error("Signup failed", {
              description: ctx.error?.message ?? "Something went wrong",
            });
          },
        },
      );
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  };

  const handleSocialSignup = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await authClient.signIn.social(
        { provider, callbackURL: "/account" },
        {
          onError: (ctx) => {
            toast.error("Social signup failed", {
              description:
                ctx.error?.message ?? `Unable to sign up with ${provider}`,
            });
          },
        },
      );
    } catch {
      toast.error("Something went wrong", {
        description: "Try again later.",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <Card className="relative overflow-hidden max-w-[350px] w-full shadow-xl mx-auto">
      <ShineBorder shineColor={UI_CUSTOM.shine_color} />
      <CardHeader>
        <CardTitle className="text-xl">Sign up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={pending}
            >
              {pending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-4 mt-6 mb-4 text-xs uppercase text-muted-foreground">
          <div className="flex-1 border-t border-muted-foreground/30" />
          <span className="px-2 shrink-0">or continue with</span>
          <div className="flex-1 border-t border-muted-foreground/30" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center cursor-pointer justify-center gap-2"
            onClick={() => handleSocialSignup("google")}
            disabled={socialLoading === "google"}
          >
            <FcGoogle className="text-xl" />
            {socialLoading === "google" ? "Redirecting..." : "Google"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center cursor-pointer justify-center gap-2"
            onClick={() => handleSocialSignup("github")}
            disabled={socialLoading === "github"}
          >
            <FaGithub className="text-xl" />
            {socialLoading === "github" ? "Redirecting..." : "GitHub"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground flex flex-col justify-between items-center">
        <div className="text-center">
          <span className="text-xs">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-indigo-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-indigo-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </div>
        <div className="mt-2">
          © {new Date().getFullYear()} Startalyze. All rights reserved.
        </div>
      </CardFooter>
    </Card>
  );
}
