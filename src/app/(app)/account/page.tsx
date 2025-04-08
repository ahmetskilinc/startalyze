import { HeaderTitle } from "@/components/header-title";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

export default async function PageCustomizationPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderTitle
        breadcrumbs={[
          {
            label: "Account",
            href: "/account",
          },
        ]}
      />
      <div className="flex flex-col">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <p>Account Page</p>
        </div>
      </div>
    </div>
  );
}
