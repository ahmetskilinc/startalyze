"use client";

import React, { useState, FormEvent, ChangeEvent, JSX, useEffect } from "react";
import { geistSans } from "@/lib/fonts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface FormData {
  email: string;
}

interface ApiResponse {
  message: string;
}

const LOCAL_STORAGE_KEY = "waitlist_email";

export default function EmailForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [savedEmail, setSavedEmail] = useState<string>("");

  // Check localStorage on component mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedEmail) {
        setSavedEmail(storedEmail);
        setAlreadySubmitted(true);
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/join-waitlist", {
        method: "POST",
        body: JSON.stringify({ email: formData.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          toast.error(data.message || "Invalid or Disposable Email.");
          return;
        } else if (response.status === 403) {
          toast.error("Too many requests. Please try again later.");
          return;
        } else {
          toast.error("Something went wrong. Please try again.");
          return;
        }
      }

      // Save to localStorage after successful submission
      localStorage.setItem(LOCAL_STORAGE_KEY, formData.email);
      setSavedEmail(formData.email);
      setAlreadySubmitted(true);

      setFormData({ email: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleReset = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setSavedEmail("");
    setAlreadySubmitted(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-3 mt-10">
      {alreadySubmitted ? (
        <div className="mt-4 text-center">
          <p className="mb-2 text-neutral-400 text-[15px] sm:text-base md:text-lg">
            You&apos;ve joined our waitlist with{" "}
            <strong
              className="text-neutral-200 font-medium underline decoration-0 underline-offset-4"
              style={geistSans.style}
            >
              {savedEmail}
            </strong>
          </p>
          <Button variant="outline" size="sm" onClick={handleReset} className="mt-2">
            Join with a different email
          </Button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full"
        >
          <Input
            className="h-10 flex-grow !text-white border-neutral-300"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            id="email"
            disabled={isLoading}
            required
          />
          <Button
            type="submit"
            size="lg"
            className="cursor-pointer w-full sm:w-auto"
            disabled={isLoading || !formData.email.trim()}
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      )}
    </div>
  );
}
