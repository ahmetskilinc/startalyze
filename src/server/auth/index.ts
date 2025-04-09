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

const client = new Polar({
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
  trustedOrigins: [env.BETTER_AUTH_URL],
  plugins: [
    openAPI(),
    nextCookies(),
    polar({
      client,
      createCustomerOnSignUp: true,
      enableCustomerPortal: true,
      checkout: {
        enabled: true,
        products: [
          {
            productId: env.POLAR_FREE_PRODUCT_ID,
            slug: "free",
          },
          {
            productId: env.POLAR_PRO_PRODUCT_ID,
            slug: "pro",
          },
        ],
        successUrl: "/success?checkout_id={CHECKOUT_ID}",
      },
      webhooks: {
        secret: env.POLAR_WEBHOOK_SECRET,
        onPayload: (payload) => {
          console.log(payload);
          return Promise.resolve();
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
  rateLimit: {
    window: 60,
    max: 5,
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
