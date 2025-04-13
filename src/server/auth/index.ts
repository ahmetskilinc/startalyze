import { cache } from "react";
import { env } from "@/lib/env";
import { db } from "@/server/db";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { headers } from "next/headers";
import { polar } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { Resend } from "resend";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { domain } from "@/lib/constants";

export const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

const resend = env.MAILER_API_KEY
  ? new Resend(env.MAILER_API_KEY)
  : { emails: { send: async (...args: any[]) => console.log(args) } };

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: [domain!],
  plugins: [
    openAPI(),
    nextCookies(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      checkout: {
        enabled: true,
        successUrl: "/success?checkout_id={CHECKOUT_ID}",
        products: [
          {
            productId: env.NEXT_PUBLIC_POLAR_FREE_PRODUCT_ID,
            slug: "free",
          },
          {
            productId: env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
            slug: "pro",
          },
        ],
      },
      webhooks: {
        secret: env.POLAR_WEBHOOK_SECRET,
        onSubscriptionActive: async (payload) => {
          console.log(payload);
          const sub = payload.data;
          await db
            .update(user)
            .set({
              plan: "pro",
              updatedAt: new Date(),
            })
            .where(eq(user.email, sub.user.email));

          console.log(`User upgraded to PRO`, sub.user.email);
        },
        onSubscriptionRevoked: async (payload) => {
          console.log(payload, "revoked");
          const sub = payload.data;
          await db
            .update(user)
            .set({
              plan: "free",
              updatedAt: new Date(),
            })
            .where(eq(user.email, sub.user.email));

          console.log(`✅ User plan reverted to FREE`, sub.id);
        },
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: env.EMAIL_FROM_ADDRESS,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: env.EMAIL_FROM_ADDRESS,
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      onboardingCompleted: {
        type: "boolean",
      },
      plan: {
        type: "string",
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
} satisfies BetterAuthOptions);

export const getServerSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    }),
);

export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];
