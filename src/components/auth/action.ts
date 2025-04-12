"use server"

import { db } from "@/server/db";
import { waitlistEmails } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const isUserAllowedAction = async ({ email }: { email: string }) => {
    const isUserAllowed = await db.query.waitlistEmails.findFirst({
        where: and(
            eq(waitlistEmails.email, email),
            eq(waitlistEmails.approved, true)
        )
    });

    if (!isUserAllowed) {
        return false
    }

    return true
}