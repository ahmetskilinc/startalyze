import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import Header from '@/components/ui/header';
import { redirect } from 'next/navigation';
import { user } from '@/server/db/schema';
import { headers } from 'next/headers';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import React from 'react';

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  // const onboarded = (
  //   await db.query.user.findFirst({
  //     where: eq(user.id, session?.user?.id as string),
  //   })
  // )?.onboardingCompleted;

  // if (!onboarded) {
  //   redirect("/welcome");
  // }

  const proPlan =
    (
      await db.query.user.findFirst({
        where: eq(user.id, session?.user?.id as string),
      })
    )?.plan === 'pro';

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
