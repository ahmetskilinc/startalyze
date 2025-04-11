import {
  appendResponseMessages,
  createDataStreamResponse,
  Message,
  smoothStream,
  streamText,
} from "ai";
import { aiProvider } from "@/lib/ai/provider";
import { VALIDATE_STARTUP_IDEA_PROMPT } from "@/lib/ai/prompts";
import {
  createChat,
  getChat,
  getChatMessages,
  saveMessage,
} from "@/lib/actions/chat";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { generateTitleFromUserPromptAIAccess } from "@/lib/ai/ai-access";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return Response.json({ message: "Unauthorized Access" }, { status: 401 });
  }

  const { message, chatId }: { message: Message; chatId: string } = await req.json();

  if (!chatId) {
    const title = await generateTitleFromUserPromptAIAccess({
      prompt: message.content,
    });
    const savedChatId = await createChat({ userMessage: message, title });
    return Response.json(
      { success: true, chatId: savedChatId.chatId },
      { status: 200 },
    );
  }

  // fetching previous messages to get more context
  const chat = await getChat(chatId);

  const previousMessages = await getChatMessages(chat.id);

  if (!previousMessages) {
    return redirect("/chat");
  }

  function getUserMessage() {
    if (message.role === "user") {
      return message.content;
    }
  }

  const userMessage = getUserMessage() as string;

  const lastUserMessage = previousMessages
    .filter((msg) => msg.role === "user")
    .at(-1);

  const isDuplicate = lastUserMessage?.content === message.content;

  if (!isDuplicate) {
    await saveMessage(chatId, userMessage, "user");
  } else {
    console.log("Duplicate message detected, skipping DB save.");
  }

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: aiProvider.languageModel("core-work"),
        system: VALIDATE_STARTUP_IDEA_PROMPT,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
        experimental_transform: smoothStream({ chunking: "word" }),
        onFinish: async ({ response }) => {
          const newMessage = appendResponseMessages({
            messages: previousMessages,
            responseMessages: response.messages,
          }).at(-1)!;
          await saveMessage(chatId, newMessage.content, "assistant");
        },
      });
      result.consumeStream();
      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true,
      });
    },
    onError: (error) => {
      console.log(error);
      return "Oops, an error occured!";
    },
  });
}
