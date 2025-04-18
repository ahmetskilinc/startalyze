import { QueryClientProvider } from './query-client';
import { ThemeProvider } from "./theme";
import { BreadcrumbProvider } from './breadcrumb';
import { Toaster } from '@/components/ui/sonner';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <BreadcrumbProvider>
        <QueryClientProvider>
          {children}
          <Toaster />
        </QueryClientProvider>
      </BreadcrumbProvider>
    </ThemeProvider>
  );
};
