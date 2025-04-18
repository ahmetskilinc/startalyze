import ChatPage from '@/components/chat-ui/chat-page';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/server/auth';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Chat',
};

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return null;

  const { chatId } = await params;

  if (!chatId) {
    return redirect('/chat');
  }

  return <ChatPage chatId={chatId} />;
};

export default page;
