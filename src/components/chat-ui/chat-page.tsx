"use client";

import {
  AgentMessage,
  AgentThinking,
  UserMessage,
} from "@/components/chat-ui/chat-bubble";
import ChatInput from "@/components/chat-ui/chat-input";
import { geistSans } from "@/lib/fonts";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Message, useChat } from "ai/react";
import Link from "next/link";

const FormSchema = z.object({
  prompt: z.string(),
});

const ChatPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { messages, setInput, handleSubmit, status } = useChat({
    body: { chatId: "123" },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { message: last };
    },
  });

  const watchedPrompt = form.watch("prompt");
  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  const memoMessages = useMemo(() => messages, [messages]);

  return (
    <main>
      <div
        className="h-14 border-b px-6 flex items-center text-[15px] top-0 sticky bg-white z-10"
        style={geistSans.style}
      >
        Sample Chat Title
      </div>
      <div className="max-w-[46rem] w-full mx-auto">
        <div className="flex flex-col border-l-0">
          <div className="flex flex-col space-y-8 pt-7 p-4">
            {memoMessages.map((msg, index) => {
              const lastAssistantMsg = memoMessages
                .filter((m) => m.role === "assistant")
                .at(-1);

              if (
                status === "streaming" &&
                msg.role === "assistant" &&
                msg.id === lastAssistantMsg?.id
              ) {
                return null;
              }

              return (
                <div key={index}>
                  {msg.role === "user" && <UserMessage text={msg.content} />}
                  {msg.role === "assistant" && <AgentMessage message={msg} />}
                </div>
              );
            })}

            {status === "streaming" && (
              <AgentMessage
                message={messages.filter((m) => m.role === "assistant").at(-1)!}
              />
            )}

            <AgentThinking status={status} />
            <div className="h-72" />
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="fixed bottom-0 max-w-[46rem] mx-auto w-full flex flex-col justify-end left-1/2 -translate-x-1/2">
          <div className="px-4 pb-0">
            <ChatInput
              form={form}
              handleSubmit={handleSubmit}
              status={status}
            />
            <div className="h-4 w-full bg-background" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
