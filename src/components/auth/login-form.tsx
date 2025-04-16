"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShineBorder } from "../ui/shine-border";
import { authClient } from "@/server/auth/client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { UI_CUSTOM } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";

export function SigninForm() {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null,
  );

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      setPending(true);
      await authClient.signIn.email(
        { email: values.email, password: values.password },
        {
          onSuccess: () => {
            router.push("/chat");
          },
          onError: (ctx) => {
            setPending(false);
            toast.error("Login failed", {
              description: ctx.error?.message ?? "Invalid credentials",
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

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await authClient.signIn.social(
        { provider, callbackURL: "/chat" },
        {
          onError: (ctx) => {
            toast.error("Social login failed", {
              description: ctx.error?.message ?? `Unable to login with ${provider}`,
            });
          },
        },
      );
    } catch (error) {
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
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
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
            <Button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              disabled={pending}
            >
              {pending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-sm text-muted-foreground flex justify-end">
          <Link
            href="/forgot-password"
            className="text-indigo-500 hover:text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center gap-4 mt-6 mb-4 text-xs uppercase text-muted-foreground">
          <div className="flex-1 border-t border-muted-foreground/30" />
          <span className="px-2 shrink-0">or continue with</span>
          <div className="flex-1 border-t border-muted-foreground/30" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center cursor-pointer justify-center gap-2"
            onClick={() => handleSocialLogin("google")}
            disabled={socialLoading === "google"}
          >
            <FcGoogle className="text-xl" />
            {socialLoading === "google" ? "Redirecting..." : "Google"}
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center cursor-pointer justify-center gap-2"
            onClick={() => handleSocialLogin("github")}
            disabled={socialLoading === "github"}
          >
            <FaGithub className="text-xl" />
            {socialLoading === "github" ? "Redirecting..." : "GitHub"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Don&apos; have an account?{" "}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Sign up
            </Link>
          </span>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground flex flex-col justify-between items-center">
        <div className="text-center">
          <span className="text-xs">
            By signing in, you agree to our{" "}
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
