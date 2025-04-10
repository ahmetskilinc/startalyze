import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import Header from "@/components/ui/header";
import { redirect } from "next/navigation";
import { authClient } from "@/server/auth/client";
import { env } from "@/lib/env";

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/auth/check-onboarded`);
  // const data = await response.json();

  // if (!data.isOnboarded) {
  //   redirect("/welcome");
  // }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="h-full">
          <ScrollArea className="h-full w-full">{children}</ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
