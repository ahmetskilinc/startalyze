import { HeaderTitle } from "@/components/ui/header-title";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { user } from "@/server/db/schema";
import { Suspense } from "react";
import { AccountSettingsForm } from "@/components/account/account-settings-form";

export default async function AccountPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) throw new Error("Unauthorized");
  if (!session.user.id) redirect("/auth/signin");

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  return (
    <div className="flex w-full flex-col">
      <HeaderTitle
        breadcrumbs={[
          {
            label: "Account",
            href: "/account",
          },
          {
            label: "Settings",
          },
        ]}
      />
      <div className="flex flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 md:gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            <AccountSettingsForm user={userData!} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
