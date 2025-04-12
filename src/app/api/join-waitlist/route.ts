import arcjet, { protectSignup, shield } from "@arcjet/next";
import { NextResponse } from "next/server";
import { waitlistEmails } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { env } from "@/lib/env";

const aj = arcjet({
    key: env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        protectSignup({
            email: {
                mode: "LIVE",
                block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
            },
            bots: {
                mode: "LIVE",
                allow: [],
            },
            rateLimit: {
                mode: "LIVE",
                interval: "10m",
                max: 5,
            },
        }),
    ],
});

export async function POST(req: Request) {
    const { email } = await req.json();

    const decision = await aj.protect(req, {
        email,
    });

    if (decision.isDenied()) {
        if (decision.reason.isEmail()) {
            return NextResponse.json(
                {
                    message: "Invalid or Disposable email",
                },
                { status: 400 },
            );
        } else {
            // Return a generic forbidden response
            return NextResponse.json(
                { message: "Request blocked" },
                { status: 403 }
            );
        }
    } else {
        try {
            const existingEmail = await db.query.waitlistEmails.findFirst({
                where: eq(waitlistEmails.email, email),
            });

            if (!existingEmail) {
                await db.insert(waitlistEmails).values({ email });
            }

            return NextResponse.json({
                message: "Request processed successfully",
            });
        } catch (error) {
            console.log(error)
            return NextResponse.json(
                { message: "Could not process request" },
                { status: 500 }
            );
        }
    }
}