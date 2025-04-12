import { Button } from "@/components/ui/button";
import EmailForm from "@/components/waitlist/email-form";
import { geistSans } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="overflow-hidden bg-black">
        <div className="-z-10">
          <div
            aria-hidden
            className="bg-linear-to-b to-[#01010d] absolute inset-0 from-transparent"
          />
        </div>
        <section className="relative">
          <div className="relative pt-16 md:pt-24 pb-24 lg:py-28">
            <div className="mx-auto max-w-[90rem] px-2 md:px-12">
              {/* <Link href="https://unsplash.com" className="fixed bottom-4 text-[13px] text-gray-400 left-4" target="_blank">Image from Unsplash</Link> */}
              <header>
                <nav className="z-20 w-fit mx-auto flex justify-center backdrop-blur md:relative bg-zinc-950/50 lg:bg-transparent">
                  <Link
                    href="/"
                    className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border border-neutral-600 p-1 pr-3"
                  >
                    <span className="border border-neutral-600/50 bg-neutral-600/30 rounded-[calc(var(--radius)-0.25rem)] p-1.5 text-xs">
                      <img
                        src="/images/logo.ico"
                        className="size-3 sm:size-4"
                      />
                    </span>
                    <span className="text-[13px] sm:text-sm text-neutral-200">
                      Startalyze - Waitlist Page
                    </span>
                  </Link>
                </nav>
              </header>
              <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto px-1 lg:mt-0 lg:w-4/5" style={geistSans.style}>
                <h1
                  className="mt-8 text-white text-4xl font-semibold md:text-5xl xl:text-[3.5rem] xl:[line-height:1.125]"
                  style={geistSans.style}
                >
                  Valoidate your idea before failing it lol
                </h1>
                <p className="text-neutral-400 mx-auto mt-6 md:mt-8 max-w-3xl text-wrap text-[15px] sm:text-base md:text-lg sm:block">
                Pass environment variable from command line to yarn
                </p>
                <EmailForm />
              </div>
              <section>
                <div className="pt-12">
                  <div className="mx-auto max-w-7xl px-6"></div>
                  <div className="relative mt-8 overflow-hidden md:mr-0 sm:mt-12 md:mt-20">
                    <div
                      aria-hidden
                      className="bg-linear-to-b to-[#01010d] absolute inset-0 z-10 from-transparent from-35% overflow-hidden"
                    />
                    <div className="inset-shadow-2xs ring-background inset-shadow-neutral/20 relative mx-auto max-w-6xl overflow-hidden rounded sm:rounded-2xl border bg-border shadow-lg shadow-zinc-950/15 ring-1 aspect-15/8">
                      <Image
                        className="relative rounded sm:rounded-2xl block sm:pt-px bg-[#01010d]"
                        src="/images/screenshot.png"
                        alt="app screen"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
