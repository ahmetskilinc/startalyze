import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user?.id) {
    redirect("/account");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
