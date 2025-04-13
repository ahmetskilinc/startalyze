import "./globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "Startalyze",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
