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
import { Label } from "@/components/ui/label";
import { ShineBorder } from "../ui/shine-border";
import { authClient } from "@/server/auth/client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { UI_CUSTOM } from "@/lib/constants";

export function SigninForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null,
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setPending(true);
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            router.push("/account");
          },
          onError: (ctx) => {
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
    } finally {
      setPending(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await authClient.signIn.social(
        { provider, callbackURL: "/account" },
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
    <Card className="relative overflow-hidden max-w-[350px] w-full shadow-xl">
      <ShineBorder shineColor={UI_CUSTOM.shine_color} />
      <CardHeader>
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={pending}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={pending}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={pending}
          >
            {pending ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-sm text-muted-foreground flex justify-between">
          <Link
            href="/forgot-password"
            className="text-indigo-500 hover:text-indigo-600"
          >
            Forgot password?
          </Link>
          <Link href="/signup" className="text-indigo-500 hover:text-indigo-600">
            Sign up
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

        <div className="mt-4 text-xs text-muted-foreground text-center">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-indigo-500 hover:text-indigo-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-indigo-500 hover:text-indigo-600"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground justify-center">
        © {new Date().getFullYear()} Startalyze. All rights reserved.
      </CardFooter>
    </Card>
  );
}
