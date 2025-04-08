"use client";

import { PropsWithChildren, useState } from "react";
import { HTTPException } from "hono/http-exception";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              // global error handling, e.g. toast notification ...
            }
          },
        }),
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
