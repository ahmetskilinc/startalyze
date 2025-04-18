import {
  appendResponseMessages,
  createDataStreamResponse,
  Message,
  smoothStream,
  streamText,
} from 'ai';
import { createChat, getChat, getChatMessages, saveMessage } from '@/lib/actions/chat';
import { generateTitleFromUserPromptAIAccess } from '@/lib/ai/ai-access';
import { aiProvider } from '@/lib/ai/provider';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/server/auth';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return Response.json({ message: 'Unauthorized Access' }, { status: 401 });
  }

  const { message, chatId }: { message: Message; chatId: string } = await req.json();

  if (!chatId) {
    const title = await generateTitleFromUserPromptAIAccess({
      prompt: message.content,
    });
    const savedChatId = await createChat({ userMessage: message, title });
    return Response.json({ success: true, chatId: savedChatId.chatId }, { status: 200 });
  }

  const chat = await getChat(chatId);

  const previousMessages = await getChatMessages(chat.id);

  if (chat.deleted) {
    return Response.json({ message: 'Chat not found' }, { status: 404 });
  }

  if (!previousMessages) {
    return redirect('/chat');
  }

  function getUserMessage() {
    if (message.role === 'user') {
      return message.content;
    }
  }

  const userMessage = getUserMessage() as string;

  const lastUserMessage = previousMessages.filter((msg) => msg.role === 'user').at(-1);

  const isDuplicate = lastUserMessage?.content === message.content;

  if (!isDuplicate) {
    await saveMessage(chatId, userMessage, 'user');
  } else {
    console.log('Duplicate message detected, skipping DB save.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  return createDataStreamResponse({
    execute: async (dataStream) => {
      try {
        const result = streamText({
          model: aiProvider.languageModel('core-work'),
          system: env.VALIDATE_STARTUP_IDEA_PROMPT,
          messages: [
            {
              role: 'user',
              content: userMessage,
            },
          ],
          experimental_transform: smoothStream({ chunking: 'line' }),
          temperature: 0.7,
          onFinish: async ({ response }) => {
            const newMessage = appendResponseMessages({
              messages: previousMessages,
              responseMessages: response.messages,
            }).at(-1)!;
            await saveMessage(chatId, newMessage.content, 'assistant');
            clearTimeout(timeoutId);
          },
        });

        result.consumeStream();
        result.mergeIntoDataStream(dataStream);
      } catch (error: unknown) {
        console.error('AI Stream Error:', error);
        clearTimeout(timeoutId);

        if (error instanceof Error) {
          if (error.message.includes('abort') || error.message.includes('timeout')) {
            throw new Error('The request timed out. Please try again.');
          }
          if (error.message.includes('rate limit')) {
            throw new Error("We're experiencing high demand. Please try again in a moment.");
          }
        }
        throw new Error('An error occurred while processing your request. Please try again.');
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unexpected error occurred. Please try again.';
    },
  });
}
