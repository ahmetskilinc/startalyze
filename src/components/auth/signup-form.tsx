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
import * as F from "@/components/ui/form";
import Link from "next/link";

export function SignupForm() {
  const [pending, setPending] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null,
  );

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        firstName: values.name,
        lastName: values.name,
        onboardingCompleted: false,
        plan: "free",
      },
      {
        onRequest: () => setPending(true),
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
          toast.error("Signup failed", {
            description: ctx.error?.message ?? "Something went wrong",
          });
        },
      },
    );

    setPending(false);
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
    <Card className="relative overflow-hidden max-w-[400px] w-full shadow-xl mx-auto">
      <ShineBorder shineColor={["#5C6BC0", "#FFB74D", "#AB47BC"]} />

      <CardHeader>
        <CardTitle className="text-xl">Sign up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <F.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <F.FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Name</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </F.FormControl>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <F.FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Email</F.FormLabel>
                  <F.FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </F.FormControl>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            <F.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Password</F.FormLabel>
                  <F.FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </F.FormControl>
                  <F.FormMessage />
                </F.FormItem>
              )}
            />
            {/* <F.FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <F.FormItem>
                  <F.FormLabel>Confirm Password</F.FormLabel>
                  <F.FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </F.FormControl>
                  <F.FormMessage />
                </F.FormItem>
              )}
            /> */}
            <Button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={pending}
            >
              {pending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </F.Form>

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
            <Link href="/signin" className="text-indigo-500 hover:underline">
              Sign in
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
