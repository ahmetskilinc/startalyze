import { headers } from "next/headers";
import { user } from "@/server/db/schema";
import { auth } from "@/server/auth";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ isOnboarded: false });
    }

    const userData = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    console.log({ isOnboarded: !!userData?.onboardingCompleted });

    return NextResponse.json({ isOnboarded: !!userData?.onboardingCompleted });
  } catch (error) {
    console.error("Error checking user onboarding status:", error);
    return NextResponse.json({ isOnboarded: false }, { status: 500 });
  }
}
