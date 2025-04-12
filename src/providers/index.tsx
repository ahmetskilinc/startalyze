import { PropsWithChildren } from "react";
// import { ThemeProvider } from "./theme";
import { BreadcrumbProvider } from "./breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "./query-client";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BreadcrumbProvider>
      <QueryClientProvider>
        {children}
        <Toaster />
      </QueryClientProvider>
    </BreadcrumbProvider>
  );
};
