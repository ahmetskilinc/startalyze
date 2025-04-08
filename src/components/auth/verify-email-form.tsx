"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GalleryVerticalEnd } from "lucide-react";
import { authClient } from "@/server/auth/client";

export function VerifyEmailForm() {
  const [pending, setPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) {
          throw new Error("No verification token found");
        }

        // Use the token to verify the email
        await authClient.verifyEmail({ query: { token } });

        toast.success("Email verified", {
          description: "Your email has been verified successfully.",
        });

        // Redirect to account page after successful verification
        router.push("/account");
      } catch (error) {
        toast.error("Verification failed", {
          description:
            error instanceof Error ? error.message : "Invalid verification token.",
        });
      } finally {
        setPending(false);
      }
    };

    verifyEmail();
  }, []); // Run once when component mounts

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="sr-only">Startalyse</span>
          </a>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Verifying your email
          </h1>
          <p className="text-sm text-muted-foreground">
            {pending
              ? "Please wait while we verify your email..."
              : "Email verification failed. Please try again."}
          </p>
          {!pending && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={async () => {
                try {
                  await authClient.sendVerificationEmail({
                    email: window.location.search
                      ? new URLSearchParams(window.location.search).get("email") ||
                        ""
                      : "",
                    callbackURL: "/account",
                  });
                  toast.success("Verification email sent", {
                    description:
                      "Please check your email for the verification link.",
                  });
                } catch (error) {
                  toast.error("Failed to send verification email", {
                    description:
                      error instanceof Error
                        ? error.message
                        : "Please try again later.",
                  });
                }
              }}
            >
              Resend verification link
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
