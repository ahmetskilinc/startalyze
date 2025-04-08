"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPassSchema>) => {};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-3 text-center">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            <GalleryVerticalEnd className="size-5" />
          </div>
          <span className="sr-only">Startalyse</span>
        </a>
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>
  );
}
