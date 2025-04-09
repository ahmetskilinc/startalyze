import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import Header from "@/components/ui/header";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="h-[calc(100vh-(4rem))]">
          <ScrollArea className="h-full w-full">{children}</ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
