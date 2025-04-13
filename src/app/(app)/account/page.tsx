import { HeaderTitle } from "@/components/ui/header-title";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

export default async function PageCustomizationPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    redirect("/signin");
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderTitle
        breadcrumbs={[
          {
            label: "Account",
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
