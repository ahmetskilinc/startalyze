import { google } from "@ai-sdk/google";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";
import { customProvider } from "ai";

export const aiRegistery = createProviderRegistry({ google });

export const aiProvider = customProvider({
  languageModels: {
    "title-model": google("gemini-2.0-flash-001"),
    "core-work": google("gemini-2.0-pro-exp-02-05", {
      useSearchGrounding: true,
      dynamicRetrievalConfig: {
        mode: "MODE_UNSPECIFIED",
        dynamicThreshold: 0.8,
      },
    }),
  },
});
