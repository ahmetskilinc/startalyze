import { aiProvider } from '@/lib/ai/provider';
import { generateText } from 'ai';
import { env } from '../env';

export async function generateTitleFromUserPromptAIAccess({ prompt }: { prompt: string }) {
  const { text: title } = await generateText({
    model: aiProvider.languageModel('title-model'),
    system: env.GENERATE_TITLE_PROMPT,
    prompt: JSON.stringify(prompt),
  });
  return title;
}
