import { env } from "@/lib/env";
import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "@/server/auth";
import { domain } from "@/lib/constants";

export const authClient = createAuthClient({
  baseURL: domain,
  plugins: [
    customSessionClient<typeof auth>(),
    inferAdditionalFields<typeof auth>(),
  ],
});
