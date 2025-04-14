"use client";
import { navLinks, UI_CUSTOM } from "@/lib/constants";
import MotionWrapper from "../motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShimmerButton } from "./shimmer-button";
import { Session } from "better-auth";

export function LandingHeader({ session }: { session?: Session }) {
  const scrollHandler = (section: string) => {
    if (!section) return;
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/40 backdrop-blur-lg",
      )}
    >
      <MotionWrapper delay={0.2}>
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center">
            <span className="text-xl font-bold">Startalyze</span>
          </div>

          <nav className="hidden gap-4 sm:flex">
            {navLinks?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => scrollHandler(item.href.toLowerCase())}
                  className="text-sm cursor-pointer font-medium text-foreground/60 hover:text-foreground/80"
                >
                  {item.text}
                </div>
              );
            })}
          </nav>

          {session ? (
            <Link href="/chat">
              <ShimmerButton {...UI_CUSTOM.shimmer_btn} className="py-1 text-sm px-4">
                Chat now
              </ShimmerButton>
            </Link>
          ) : (
            <Link href="/signin">
              <ShimmerButton {...UI_CUSTOM.shimmer_btn} className="py-1 text-sm px-4">
                Sign in
              </ShimmerButton>
            </Link>
          )}
        </div>
      </MotionWrapper>
    </header>
  );
}
