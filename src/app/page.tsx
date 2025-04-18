import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { LandingHeader } from '@/components/ui/landing-header';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ShineBorder } from '@/components/ui/shine-border';
import { AuroraText } from '@/components/ui/aurora-text';
import { DotPattern } from '@/components/ui/dot-pattern';
import { Card, CardContent } from '@/components/ui/card';
import { TweetCard } from '@/components/ui/tweet-card';
import { Separator } from '@/components/ui/separator';
import { features, UI_CUSTOM } from '@/lib/constants';
import MotionWrapper from '@/components/motion';
import { Globe } from '@/components/ui/globe';
import { ChevronRight } from 'lucide-react';
import { headers } from 'next/headers';
import { auth } from '@/server/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <SiteBanner />
      <LandingHeader session={session?.session} />
      <main className="space-y-12 pb-16">
        {/* Hero Section */}
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
                        'text-black',
                        'relative max-w-4xl px-4 py-2 font-semibold tracking-tight text-balance',
                        'text-3xl sm:text-6xl md:text-7xl',
                      )}
                    >
                      <span className="whitespace-nowrap">
                        <AuroraText colors={UI_CUSTOM.aurora_text.color}>Validate</AuroraText>{' '}
                        before you create.
                      </span>
                      <br />
                      Launch with confidence.
                    </h1>
                  </MotionWrapper>

                  <MotionWrapper delay={0.6}>
                    <p className="max-w-2xl text-base text-black sm:text-lg dark:font-medium dark:text-white">
                      <strong>Startalyze</strong> helps you test your startup idea in minutes —
                      paste in your idea and instantly get similar products, market insights, SWOT
                      analysis, ideal user personas, and a go-to-market plan.
                    </p>
                  </MotionWrapper>

                  <MotionWrapper delay={0.7}>
                    <div className="z-10 container mx-auto mt-0 w-full px-6 md:mt-2">
                      <HeroVideoDialogDemoTopInBottomOut />
                    </div>
                  </MotionWrapper>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="md:py-6">
          <HoverEffect className="container mx-auto px-4" items={features} />
        </section>

        {/* CTA Section */}
        <section className="md:py-6" id="cta">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-background relative flex flex-col items-center justify-center overflow-hidden rounded-lg border px-6 pt-8 pb-32 sm:px-10 sm:pb-40 md:px-20 md:pb-60 lg:flex-row lg:px-40">
              <Link href="/signup">
                <ShimmerButton className="z-10 mb-4 self-end rounded-lg bg-black px-4 py-2 text-sm text-white transition-all sm:px-5 sm:text-base md:px-6 lg:absolute lg:top-8 lg:right-8">
                  Get Early Access
                </ShimmerButton>
              </Link>

              <span className="pointer-events-none bg-gradient-to-b from-indigo-500 to-indigo-700/80 bg-clip-text text-center text-3xl leading-tight font-semibold tracking-tight whitespace-nowrap text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:from-indigo-200 dark:to-indigo-800/10">
                Built for the World
              </span>

              <Globe className="top-28 mt-5" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(75,0,130,0.2),rgba(255,255,255,0))]" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
              <div className="w-full lg:w-3/4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What does Startalyze do?</AccordionTrigger>
                    <AccordionContent>
                      We allow you to paste in your startup idea. We provide similar products,
                      market data, and offer a comprehensive SWOT analysis, user personas, and a
                      go-to-market plan to guide you.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How does the validator analyze the market?</AccordionTrigger>
                    <AccordionContent>
                      The validator scrapes publicly available data, including competitor products
                      and market trends, to generate insights about the potential of your startup
                      idea in the current market.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is the SWOT analysis customizable?</AccordionTrigger>
                    <AccordionContent>
                      Yes, the SWOT analysis is automatically generated based on the market data and
                      your idea. However, you can adjust it manually to better fit your specific
                      goals and vision.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I validate multiple ideas at once?</AccordionTrigger>
                    <AccordionContent>
                      Currently, Startalyze focuses on one idea at a time to provide a deep,
                      detailed analysis. However, multi-idea support is on our roadmap.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Do I need to sign up to use Startalyze?</AccordionTrigger>
                    <AccordionContent>
                      Yes, signup is required to access the validator and save your analysis
                      results. It helps us provide a personalized experience and store your data
                      securely.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      How accurate is the analysis provided by Startalyze?
                    </AccordionTrigger>
                    <AccordionContent>
                      While we use up-to-date data and proven frameworks like SWOT and persona
                      modeling, the accuracy depends on the specificity of your input and the
                      availability of market data. It&apos;s meant to guide, not guarantee outcomes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Can I export or share the analysis reports?</AccordionTrigger>
                    <AccordionContent>
                      Yes, once your analysis is complete, you can export it as a PDF or share a
                      private link with collaborators or investors for easy access and review.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full lg:w-2/4">
                <TweetCard id="1912868181539963371" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*Footer */}
      <div className="border-t py-6">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center">
            <span className="text-xl font-bold">Startalyze</span>
          </div>
          <div className="text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Startalyze. All Rights Reserved.
            </p>
          </div>
          <footer className="flex space-x-6">
            <Link href="/privacy-policy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms & Conditions
            </Link>
          </footer>
        </div>
      </div>
    </>
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
            Startalyze - Validate ideas, analyze markets, and launch faster than ever.
          </span>
          <ChevronRight className="mt-[3px] ml-1 hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
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
          href={'/signup'}
          target="_blank"
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium shadow-sm transition-colors"
        >
          🎉
          <Separator className="mx-2 h-4" orientation="vertical" />
          Introducing Startalyze
          <ChevronRight className="text-muted-foreground ml-1 size-4" />
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
          className="z-50 block w-full"
          animationStyle="top-in-bottom-out"
          videoSrc="https://youtu.be/FO3WwYYzClA?si=IX6bh-2GebD-WEFU"
          thumbnailSrc="/assets/screenshot.png"
          thumbnailAlt="Hero Video"
        />
      </CardContent>
    </Card>
  );
}
