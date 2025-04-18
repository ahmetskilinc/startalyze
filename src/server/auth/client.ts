import { customSessionClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { domain } from '@/lib/constants';
import { auth } from '@/server/auth';

export const authClient = createAuthClient({
  baseURL: domain,
  plugins: [customSessionClient<typeof auth>(), inferAdditionalFields<typeof auth>()],
});
