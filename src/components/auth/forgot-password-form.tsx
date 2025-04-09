"use client";

import { z } from "zod";
import Link from "next/link";
import * as F from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { forgotPassSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof forgotPassSchema>) => {};

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
            href="/login"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Back to login
          </Link>
        </p>
      </div>

      <F.Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <F.FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <F.FormItem>
                <F.FormLabel>Email</F.FormLabel>
                <F.FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </F.FormControl>
                <F.FormMessage />
              </F.FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </F.Form>
    </div>
  );
}
