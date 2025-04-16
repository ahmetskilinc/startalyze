import { Button } from "@/components/ui/button";
import { spaceGrotesk } from "@/lib/fonts";
import Link from "next/link";
import type React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="top-0 sticky h-16 bg-background border-b">
        <nav className="max-w-3xl mx-auto w-full h-full flex items-center justify-between">
          <Link
            href="/"
            style={spaceGrotesk.style}
            className="font-medium tracking-wide"
          >
            Startalyze
          </Link>
          <div>
            <Button>
              <Link href="/chat">Chat</Link>
            </Button>
          </div>
        </nav>
      </header>
      <div className="max-w-screen-md mx-auto px-3 md:px-0 my-4 md:my-8">
        {children}
      </div>
    </>
  );
};

export default layout;
