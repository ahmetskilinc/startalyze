"use client";

import ChatInput from "@/components/chat-ui/chat-input";
import { useChat as useAIChat } from "@ai-sdk/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderTitle } from "../ui/header-title";
import ChatMessages from "./chat-messages";
import Link from "next/link";
import { useChat, useChatMessages } from "@/hooks/use-chats";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  prompt: z.string(),
});

const ChatPage = ({
  chatId,
}: {
  chatId?: string;
}) => {
  const router = useRouter();
  const isNewChat = !chatId;
  const { data: chat, error: chatError } = useChat(chatId ?? "");
  const { error: messagesError } = useChatMessages(chatId ?? "");
  const [error, setError] = useState<string | null>(null);
  const title = isNewChat
    ? "New Chat"
    : chat?.title || `Chat ${chatId?.slice(0, 8)}`;
  const initialMessages = useChatMessages(chatId ?? "").data;

  const { messages, setInput, handleSubmit, status, reload } = useAIChat({
    initialMessages,
    id: chatId,
    body: { chatId },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { chatId, message: last };
    },
    async onResponse(response) {
      if (isNewChat) {
        const { chatId: newChatId } = await response.json();
        router.push(`/chat/${newChatId}`);
      }
    },
  });

  useEffect(() => {
    if (!isNewChat && (chatError || messagesError)) {
      const error = chatError || messagesError;
      console.error("Failed to load chat:", error);
      if (error instanceof Error && error.message === "Chat not found") {
        setError("This chat doesn't exist or you don't have access to it.");
      } else {
        setError("Failed to load chat. Please try again later.");
      }
    }
  }, [chatError, messagesError, isNewChat]);

  useEffect(() => {
    if (
      initialMessages?.length === 1 &&
      initialMessages[0]?.role === "user" &&
      status !== "streaming" &&
      status !== "submitted"
    ) {
      setInput(initialMessages[0].content);
      reload();
    }
  }, [initialMessages]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const watchedPrompt = form.watch("prompt");
  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  const memoMessages = useMemo(() => messages, [messages]);

  if (error) {
    return (
      <main className="flex flex-col h-[calc(100dvh-4rem)] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-red-500">{error}</div>
          <Link
            href="/chat"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
