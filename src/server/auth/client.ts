import { env } from "@/lib/env";
import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "@/server/auth";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    customSessionClient<typeof auth>(),
    inferAdditionalFields<typeof auth>(),
  ],
});
