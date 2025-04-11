import ChatPage from "@/components/chat-ui/chat-page";
import { getChatMessages } from "@/lib/actions/chat";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  // returning null, because the middleware handles the rest
  if (!session?.user?.id) return null;

  const { chatId } = await params;

  if (!chatId) {
    return redirect("/chat");
  }

  // TODO: yeah here, implement caching on server side :)
  const chats = await getChatMessages(chatId);

  return <ChatPage chatId={chatId} initialMessages={chats} />;
};

export default page;
