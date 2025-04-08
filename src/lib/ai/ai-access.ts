import { generateText } from "ai";
import { aiProvider } from "@/lib/ai/provider";
import { GENERATE_TITLE_PROMPT } from "@/lib/ai/prompts";

export async function generateTitleFromUserPromptAIAccess({
  prompt,
}: {
  prompt: string;
}) {
  const { text: title } = await generateText({
    model: aiProvider.languageModel("title-model"),
    system: GENERATE_TITLE_PROMPT,
    prompt: JSON.stringify(prompt),
  });
  return title;
}
