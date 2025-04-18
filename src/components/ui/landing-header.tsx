'use client';
import { navLinks, UI_CUSTOM } from '@/lib/constants';
import { ShimmerButton } from './shimmer-button';
import { Session } from 'better-auth';
import MotionWrapper from '../motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function LandingHeader({ session }: { session?: Session }) {
  const scrollHandler = (section: string) => {
    if (!section) return;
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'border-border bg-background/40 sticky top-0 z-40 w-full border-b backdrop-blur-lg',
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
                  className="text-foreground/60 hover:text-foreground/80 cursor-pointer text-sm font-medium"
                >
                  {item.text}
                </div>
              );
            })}
          </nav>

          {session ? (
            <Link href="/chat">
              <ShimmerButton {...UI_CUSTOM.shimmer_btn} className="px-4 py-1 text-sm">
                Chat now
              </ShimmerButton>
            </Link>
          ) : (
            <Link href="/signin">
              <ShimmerButton {...UI_CUSTOM.shimmer_btn} className="px-4 py-1 text-sm">
                Sign in
              </ShimmerButton>
            </Link>
          )}
        </div>
      </MotionWrapper>
    </header>
  );
}
