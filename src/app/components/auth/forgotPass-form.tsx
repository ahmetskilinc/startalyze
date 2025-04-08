import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                <GalleryVerticalEnd className="size-5" />
              </div>
              <span className="sr-only">Startalyse</span>
            </a>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Forgot your password?
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to receive a reset link.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
