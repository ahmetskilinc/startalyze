import ChatPage from "@/components/chat-ui/chat-page";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return null;

  const { chatId } = await params;

  if (!chatId) {
    return redirect("/chat");
  }

  return <ChatPage chatId={chatId} />;
};

export default page;
