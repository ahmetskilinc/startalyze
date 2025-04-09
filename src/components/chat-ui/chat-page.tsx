"use client";

import ChatInput from "@/components/chat-ui/chat-input";
import { useChat as useAIChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderTitle } from "../header-title";
import ChatMessages from "./chat-messages";
import Link from "next/link";
import { useChat, useChatMessages } from "@/hooks/use-chats";

const FormSchema = z.object({
  prompt: z.string(),
});

const ChatPage = () => {
  const params = useParams();
  const chatId = params.chatId as string;
  const { data: chat, error: chatError } = useChat(chatId);
  const { data: chatMessages, error: messagesError } = useChatMessages(chatId);
  const [error, setError] = useState<string | null>(null);
  const title = chat?.title || `Chat ${chatId.slice(0, 8)}`;

  const initialMessages = useMemo(() => {
    if (!chatMessages) return [];
    return chatMessages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role as "user" | "assistant",
    }));
  }, [chatMessages]);

  const { messages, input, setInput, handleSubmit, status, reload } = useAIChat({
    initialMessages,
    id: chatId,
    body: { chatId },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { chatId, message: last };
    },
  });

  useEffect(() => {
    if (chatError || messagesError) {
      const error = chatError || messagesError;
      console.error("Failed to load chat:", error);
      if (error instanceof Error && error.message === "Chat not found") {
        setError("This chat doesn't exist or you don't have access to it.");
      } else {
        setError("Failed to load chat. Please try again later.");
      }
    }
  }, [chatError, messagesError]);

  useEffect(() => {
    if (initialMessages.length === 1 && initialMessages[0]?.role === "user") {
      setInput(initialMessages[0].content);
      reload();
    }
  }, [initialMessages, setInput, reload]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const watchedPrompt = form.watch("prompt");
  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  useEffect(() => {
    if (
      initialMessages.length === 1 &&
      initialMessages[0]?.role === "user" &&
      initialMessages[0]?.content
    ) {
      const content = initialMessages[0].content;
      setTimeout(() => {
        handleSubmit(undefined, { data: { prompt: content } });
      }, 100);
    }
  }, [initialMessages, handleSubmit]);

  const memoMessages = useMemo(() => messages, [messages]);

  if (error) {
    return (
      <main className="flex flex-col h-[calc(100dvh-4rem)] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-red-500">{error}</div>
          <Link
            href="/chat"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            New Chat
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-[calc(100dvh-4rem)]">
      <HeaderTitle breadcrumbs={[{ label: title }]} />
      <ChatMessages messages={memoMessages} status={status} />
      <ChatInput form={form} handleSubmit={handleSubmit} status={status} />
    </main>
  );
};

export default ChatPage;
