import { createDataStreamResponse, Message, smoothStream, streamText } from "ai";
import { aiProvider } from "@/lib/ai/provider";
import { VALIDATE_STARTUP_IDEA_PROMPT } from "@/lib/ai/prompts";

export async function POST(req: Request) {
  // TODO: add authentication check

  const { message }: { message: Message } = await req.json();

  function getUserMessage() {
    if (message.role === "user") {
      return message.content;
    }
  }

  const userMessage = getUserMessage() as string;

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
