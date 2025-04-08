"use client";

import { QueryCache, QueryClient, QueryClientProvider as QueryClientProviderImpl } from "@tanstack/react-query";
import { HTTPException } from "hono/http-exception";
import { PropsWithChildren, useState } from "react";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
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

  return <QueryClientProviderImpl client={queryClient}>{children}</QueryClientProviderImpl>;
};
