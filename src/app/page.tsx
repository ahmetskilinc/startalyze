import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import MotionWrapper from "@/components/motion";
import Link from "next/link";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Separator } from "@/components/ui/separator";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Card, CardContent } from "@/components/ui/card";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { navLinks, features, UI_CUSTOM } from "@/lib/constants";
import { Globe } from "@/components/ui/globe";

export default async function Home() {
  return (
    <main>
      <SiteBanner />
      <SiteHeader />
      <section id="hero" className="relative overflow-hidden">
        <DotPattern className="absolute inset-0 z-0 opacity-40" />
        <div className="relative z-10 h-full py-5 md:py-6">
          <div className="flex flex-col">
            <div className="mt-10 grid grid-cols-1 md:mt-6">
              <div className="flex flex-col items-center gap-6 px-4 text-center sm:px-6 md:px-10">
                <AnnouncementPill />
                <MotionWrapper delay={0.5}>
                  <h1
                    className={cn(
                      "text-black",
                      "relative max-w-4xl px-4 py-2 text-balance font-semibold tracking-tight",
                      "text-3xl sm:text-6xl md:text-7xl",
                    )}
                  >
                    <span className="whitespace-nowrap">
                      <AuroraText colors={UI_CUSTOM.aurora_text.color}>
                        Validate
                      </AuroraText>{" "}
                      before you create.
                    </span>
                    <br />
                    Launch with confidence.
                  </h1>
                </MotionWrapper>

                <MotionWrapper delay={0.6}>
                  <p className="max-w-2xl text-base text-black dark:font-medium dark:text-white sm:text-lg">
                    <strong>Startalyze</strong> helps you test your startup idea in
                    minutes — paste in your idea and instantly get similar products,
                    market insights, SWOT analysis, ideal user personas, and a
                    go-to-market plan.
                  </p>
                </MotionWrapper>

                <div className="w-full max-w-full sm:max-w-lg py-1 flex flex-col gap-4 sm:flex-row"></div>

                <MotionWrapper delay={0.7}>
                  <div className="md:mt-2 mt-0 w-full container mx-auto px-6 z-10">
                    <HeroVideoDialogDemoTopInBottomOut />
                  </div>
                </MotionWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <HoverEffect className="container mx-auto px-4" items={features} />
      </section>

      <section className="py-12" id="cta">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative flex flex-col lg:flex-row items-center justify-center overflow-hidden rounded-lg border bg-background px-6 sm:px-10 md:px-20 lg:px-40 pt-8 pb-32 sm:pb-40 md:pb-60">
            <Link
              href="/signup"
              target="_blank"
              className="self-end mb-4 lg:absolute lg:top-8 lg:right-8 bg-black text-white py-2 px-4 sm:px-5 md:px-6 rounded-lg text-sm sm:text-base transition-all z-10"
            >
              Unlock Trends
            </Link>

            <span className="pointer-events-none whitespace-nowrap bg-gradient-to-b from-indigo-500 to-indigo-700/80 bg-clip-text text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight text-transparent dark:from-indigo-200 dark:to-indigo-800/10">
              Explore Market Trends
            </span>

            <Globe className="top-28 mt-5" />
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(75,0,130,0.2),rgba(255,255,255,0))]" />
          </div>
        </div>
      </section>
    </main>
  );
}

function SiteBanner() {
  return (
    <div className="group relative top-0 bg-indigo-600 py-3 text-white transition-all duration-300 md:py-0">
      <div className="flex flex-col items-center justify-center gap-4 px-4 text-center md:h-12 md:flex-row">
        <Link
          href="/signin"
          target="_blank"
          className="inline-flex text-xs leading-normal md:text-sm"
        >
          ✨
          <span className="ml-1 font-semibold">
            Startalyze - Validate ideas, analyze markets, and launch faster than
            ever.
          </span>
          <ChevronRight className="ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}

function AnnouncementPill() {
  return (
    <MotionWrapper delay={0.3}>
      <div className="flex flex-col items-center gap-6 text-center">
        <Link
          href={"/"}
          className="inline-flex items-center rounded-full border border-input bg-background px-4 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          🎉
          <Separator className="mx-2 h-4" orientation="vertical" />
          Introducing Startalyze
          <ChevronRight className="ml-1 size-4 text-muted-foreground" />
        </Link>
      </div>
    </MotionWrapper>
  );
}

function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <Card className="relative max-w-7xl overflow-hidden rounded-xl py-1">
      <ShineBorder shineColor={UI_CUSTOM.shine_color} borderWidth={1.5} />

      <CardContent className="px-1">
        <HeroVideoDialog
          className="block dark:hidden w-full z-50"
          animationStyle="top-in-bottom-out"
          videoSrc="https://youtu.be/FO3WwYYzClA?si=IX6bh-2GebD-WEFU"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />

        <HeroVideoDialog
          className="hidden dark:block w-full"
          animationStyle="top-in-bottom-out"
          videoSrc="https://youtu.be/FO3WwYYzClA?si=IX6bh-2GebD-WEFU"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </CardContent>
    </Card>
  );
}

function SiteHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/40 backdrop-blur-lg",
      )}
    >
      <MotionWrapper delay={0.2}>
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Startalyze</span>
          </Link>

          <nav className="hidden gap-4 sm:flex">
            {navLinks?.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground/80"
                >
                  {item.text}
                </Link>
              );
            })}
          </nav>

          <Link href="/signin" target="_blank">
            <ShimmerButton {...UI_CUSTOM.shimmer_btn} className="py-1 text-sm px-4">
              Sign in
            </ShimmerButton>
          </Link>
        </div>
      </MotionWrapper>
    </header>
  );
}
