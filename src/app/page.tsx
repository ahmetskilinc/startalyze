import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import MotionWrapper from "@/components/motion";
import Link from "next/link";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Button } from "@/components/ui/button";


export default async function Home() {

  return (
    <main>
      <SiteBanner />
      <section id="hero" className="relative overflow-hidden">
        {/* DotPattern only inside hero */}
        <DotPattern className="absolute inset-0 z-0 opacity-40" />

        <div className="relative z-10 h-full py-5 md:py-14">
          <div className="flex flex-col">
            <div className="mt-10 grid grid-cols-1 md:mt-10">
              <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
                {/* Intro Button */}
                <MotionWrapper delay={0.3}>
                  <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
                    <span
                      className={cn(
                        "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#7044f5]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                      )}
                      style={{
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "destination-out",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "subtract",
                        WebkitClipPath: "padding-box",
                      }}
                    />
                    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                    <AnimatedGradientText className="text-sm font-medium">
                      Introducing Startalyze
                    </AnimatedGradientText>
                    <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </div>
                </MotionWrapper>

                {/* Heading */}
                <MotionWrapper delay={0.5}>
                  <h1
                    className={cn(
                      "text-black",
                      "relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2",
                      "text-balance text-left font-semibold tracking-tighter md:text-center",
                      "text-4xl sm:text-6xl md:text-7xl lg:text-7xl"
                    )}
                  >
                    <span className="whitespace-nowrap">
                      Validate your startup <AuroraText> idea </AuroraText>
                    </span>
                    <br />
                    before writing a single line of code.
                  </h1>
                </MotionWrapper>

                {/* Description */}
                <MotionWrapper delay={0.6}>
                  <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg mt-4">
                    <strong>Startalyze</strong> helps you test your startup idea in
                    minutes — paste in your idea and instantly get similar products,
                    market insights, SWOT analysis, ideal user personas, and a
                    go-to-market plan.
                  </p>
                </MotionWrapper>

                <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
                  {/* CTA buttons can be added here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   
   <div className="flex justify-center">
       <Link href="/login" className="text-center">
       <Button > Temporary Sign in</Button>
      </Link>
   </div>

    </main>
  );
}

function SiteBanner() {
  return (
    <div className="group relative top-0 bg-indigo-600 py-3 text-white shadow-sm transition-all duration-300 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://startalyze.ai"
          target="_blank"
          className="inline-flex items-center text-xs leading-normal md:text-sm"
        >
          ⚡️{" "}
          <span className="ml-2 font-semibold tracking-tight">
            Build smarter, not harder with{" "}
            <span className="underline underline-offset-4 decoration-white/50 transition-all duration-300 group-hover:decoration-white">
              Startalyze
            </span>
            — Validate ideas, analyze markets, and launch faster than ever.
          </span>
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-white/20" />
    </div>
  );
}
