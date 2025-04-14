import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import React from "react";
import Header from "@/components/ui/header";
import { redirect } from "next/navigation";
import { authClient } from "@/server/auth/client";
import { domain } from "@/lib/constants";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const response = await fetch(`${domain}/api/auth/check-onboarded`);
  // const data = await response.json();

  // if (!data.isOnboarded) {
  //   redirect("/welcome");
  // }

  const session = await auth.api.getSession({ headers: await headers() });
  const proPlan =
    (
      await db.query.user.findFirst({
        where: eq(user.id, session?.user?.id as string),
      })
    )?.plan === "pro";

  return (
    <SidebarProvider>
      <AppSidebar proPlan={proPlan} />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
