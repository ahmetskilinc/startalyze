"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageSquarePlus, Trash, Pencil } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useChats } from "@/hooks/use-chats";
import { deleteChat, type Chat } from "@/lib/actions/chat";

export function NavMain() {
  const pathname = usePathname();
  const { data: chats = [] } = useChats();

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
                <div className="absolute right-0 flex gap-2 transform translate-x-8 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-200">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); /* Add edit handler */
                    }}
                    className="hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteChat(chat.id);
                      if (pathname === `/chat/${chat.id}`) {
                        redirect(`/chat`);
                      }
                    }}
                    className="hover:text-red-600"
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
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="New Chat"
            className="bg-blue-600 hover:bg-blue-700 text-neutral-50 hover:text-neutral-50"
          >
            <Link href="/chat" className="flex items-center gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              <span>New Chat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {renderChatGroup(groupedChats.lastDay, "Last day")}
        {renderChatGroup(groupedChats.lastWeek, "Last 7 days")}
        {renderChatGroup(groupedChats.previous, "Previous")}
      </SidebarMenu>
    </SidebarGroup>
  );
}
