import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/server/auth';

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
