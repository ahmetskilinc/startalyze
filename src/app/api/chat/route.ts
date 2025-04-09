import { appendResponseMessages, createDataStreamResponse, Message, smoothStream, streamText } from "ai";
import { aiProvider } from "@/lib/ai/provider";
import { VALIDATE_STARTUP_IDEA_PROMPT } from "@/lib/ai/prompts";
import { getChatMessages, saveMessage } from "@/lib/actions/chat";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return Response.json({ message: "Unauthorized Access" }, {status: 401});
  }

  const { message, chatId }: { message: Message, chatId: string } = await req.json();

  // fetching previous messages to get more context
  const previousMessages = await getChatMessages(chatId)

  if (!previousMessages) {
    return redirect("/chat/new")
  }

  function getUserMessage() {
    if (message.role === "user") {
      return message.content;
    }
  }

  const userMessage = getUserMessage() as string;

  await saveMessage(chatId, userMessage, "user");

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
