"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Trash, Pencil } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useChats, useChat, useChatMessages } from "@/hooks/use-chats";
import { deleteChat, type Chat } from "@/lib/actions/chat";

export function NavMain() {
  const pathname = usePathname();
  const { data: chats = [], refetch: refetchChats } = useChats();
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const { refetch: refetchChat } = useChat(chatToDelete?.id ?? "");
  const { refetch: refetchMessages } = useChatMessages(chatToDelete?.id ?? "");

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  type GroupedChats = {
    lastDay: typeof chats;
    lastWeek: typeof chats;
    previous: typeof chats;
  };

  const groupedChats = chats.reduce<GroupedChats>(
    (acc, chat) => {
      const chatDate = new Date(chat.createdAt);
      if (chatDate >= oneDayAgo) {
        acc.lastDay.push(chat);
      } else if (chatDate >= sevenDaysAgo) {
        acc.lastWeek.push(chat);
      } else {
        acc.previous.push(chat);
      }
      return acc;
    },
    { lastDay: [], lastWeek: [], previous: [] },
  );

  const renderChatGroup = (chats: Chat[], title: string) => {
    if (chats.length === 0) return null;

    return (
      <>
        <div className="px-3 py-2">
          <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        </div>
        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              asChild
              className={cn(pathname === `/chat/${chat.id}` ? "font-bold" : "")}
            >
              <Link
                href={`/chat/${chat.id}`}
                className="flex items-center justify-between gap-2 group/link relative pr-16"
              >
                <span className="truncate">
                  {chat.title || `Chat ${chat.id.slice(0, 8)}`}
                </span>
                <div className="absolute right-0 flex gap-2 pr-1 transform translate-x-8 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-200">
                  {/* <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setChatToDelete(chat);
                    }}
                    className="hover:text-red-600 cursor-pointer hover:bg-red-100 transition-colors p-1 rounded-md"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </>
    );
  };

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                pathname === "/chat" ? "bg-accent text-accent-foreground" : "",
              )}
            >
              <Link href="/chat" className="flex items-center gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                <span>New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {renderChatGroup(groupedChats.lastDay, "Last 24 Hours")}
          {renderChatGroup(groupedChats.lastWeek, "Last 7 Days")}
          {renderChatGroup(groupedChats.previous, "Previous")}
        </SidebarMenu>
      </SidebarGroup>

      <Dialog
        open={chatToDelete !== null}
        onOpenChange={() => setChatToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChatToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (chatToDelete) {
                  await deleteChat(chatToDelete.id);
                  await Promise.all([
                    refetchChats(),
                    refetchChat(),
                    refetchMessages(),
                  ]);
                  setChatToDelete(null);
                  if (pathname === `/chat/${chatToDelete.id}`) {
                    redirect(`/chat`);
                  }
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
