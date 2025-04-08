import type { Metadata } from "next";
import { QueryClientProvider } from "../providers/query-client";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme";
import { BreadcrumbProvider } from "@/providers/breadcrumb";

export const metadata: Metadata = {
  title: "JStack App",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <BreadcrumbProvider>
            <QueryClientProvider>
              {children}
              <Toaster />
            </QueryClientProvider>
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
