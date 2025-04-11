import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Button asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    </main>
  );
}
