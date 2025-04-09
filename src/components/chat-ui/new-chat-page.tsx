"use client";

import ChatInput from "@/components/chat-ui/chat-input";
import { createChat } from "@/lib/actions/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeaderTitle } from "../header-title";
import ChatMessages from "./chat-messages";

const FormSchema = z.object({
  prompt: z.string(),
});

const NewChatPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    messages,
    setInput,
    handleSubmit: handleAiSubmit,
    status,
  } = useChat({
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { message: last };
    },
  });

  const handleSubmit = async (
    event?: { preventDefault?: () => void },
    chatRequestOptions?: any,
  ) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    const content = form.getValues("prompt");
    if (!content) return;

    try {
      const { chatId } = await createChat(content);
      // Instead of using handleAiSubmit, we'll redirect immediately
      // The chat page will handle the AI response
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  const watchedPrompt = form.watch("prompt");
  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  const memoMessages = useMemo(() => messages, [messages]);

  return (
    <main className="flex flex-col h-[calc(100dvh-4rem)]">
      <HeaderTitle breadcrumbs={[{ label: "New Chat" }]} />

      <ChatMessages messages={memoMessages} status={status} />

      <ChatInput form={form} handleSubmit={handleSubmit} status={status} />
    </main>
  );
};

export default NewChatPage;
