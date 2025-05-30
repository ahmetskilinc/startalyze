'use client';

import { useChat, useChatMessages, useCreateChat } from '@/hooks/use-chats';
import ChatInput from '@/components/chat-ui/chat-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChat as useAIChat } from '@ai-sdk/react';
import { useEffect, useMemo, useState } from 'react';
import { HeaderTitle } from '../ui/header-title';
import { useRouter } from 'next/navigation';
import ChatMessages from './chat-messages';
import { useForm } from 'react-hook-form';
import { Message } from 'ai';
import Link from 'next/link';
import { z } from 'zod';

const FormSchema = z.object({
  prompt: z.string(),
});

type FormData = z.infer<typeof FormSchema>;

const ChatPage = ({ chatId }: { chatId?: string }) => {
  const router = useRouter();
  const isNewChat = !chatId;
  const { data: chat, error: chatError } = useChat(chatId ?? '');
  const { error: messagesError } = useChatMessages(chatId ?? '');
  const [error, setError] = useState<string | null>(null);
  const title = isNewChat ? 'New Chat' : chat?.title || `Chat ${chatId?.slice(0, 8)}`;
  const initialMessages = useChatMessages(chatId ?? '').data;
  const createChat = useCreateChat();

  const { messages, setInput, handleSubmit: aiHandleSubmit, status, reload } = useAIChat({
    initialMessages,
    id: chatId,
    body: { chatId },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { chatId, message: last };
    },
  });

  useEffect(() => {
    if (!isNewChat && (chatError || messagesError)) {
      const error = chatError || messagesError;
      console.error('Failed to load chat:', error);
      if (error instanceof Error && error.message === 'Chat not found') {
        setError("This chat doesn't exist or you don't have access to it.");
      } else {
        setError('Failed to load chat. Please try again later.');
      }
    }
  }, [chatError, messagesError, isNewChat]);

  useEffect(() => {
    if (
      initialMessages?.length === 1 &&
      initialMessages[0]?.role === 'user' &&
      status !== 'streaming' &&
      status !== 'submitted'
    ) {
      setInput(initialMessages[0].content);
      reload();
    }
  }, [initialMessages]);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const watchedPrompt = form.watch('prompt');
  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  const memoMessages = useMemo(() => messages, [messages]);

  const handleFormSubmit = async (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    const formData = form.getValues();
    
    if (isNewChat) {
      const userMessage: Message = {
        role: 'user',
        content: formData.prompt,
        id: Date.now().toString(),
      };
      createChat.mutate({
        userMessage,
        title: formData.prompt.slice(0, 50) + (formData.prompt.length > 50 ? '...' : ''),
      });
      form.reset();
    } else {
      aiHandleSubmit(event, { data: formData });
    }
  };

  if (error) {
    return (
      <main className="flex h-[calc(100dvh-4rem)] flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-semibold text-red-500">{error}</div>
          <Link
            href="/chat"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            New Chat
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col">
      <HeaderTitle breadcrumbs={[{ label: title }]} />
      <ChatMessages messages={memoMessages} status={status} />
      <ChatInput form={form} handleSubmit={handleFormSubmit} status={status} />
    </main>
  );
};

export default ChatPage;
