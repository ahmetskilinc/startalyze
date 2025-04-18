import { createOpenAI } from "@ai-sdk/openai";
import { createProviderRegistry } from "ai";
import { customProvider } from "ai";
import { env } from "../env";

const fourLLM = createOpenAI({
  baseURL: "https://api.4llm.com/v1",
  apiKey: env.FOURLLM_API_KEY,
  compatibility: "compatible",
});

export const aiRegistery = createProviderRegistry({
  fourLLM,
});

export const aiProvider = customProvider({
  languageModels: {
    "title-model": fourLLM("pone-chat"),
    "core-work": fourLLM("pone-reasoner"),
  },
});
