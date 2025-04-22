import { Analytics } from '@vercel/analytics/react';
import { PropsWithChildren } from 'react';
import { Providers } from '@/providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Startalyze',
    default: 'Startalyze',
  },
  description: '',
  icons: [{ rel: 'icon', url: '/assets/favicon.ico' }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
