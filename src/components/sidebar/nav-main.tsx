'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useChats, useChat, useChatMessages } from '@/hooks/use-chats';
import { MessageSquarePlus, Trash, Pencil } from 'lucide-react';
import { deleteChat, type Chat } from '@/lib/actions/chat';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import * as React from 'react';
import Link from 'next/link';

export function NavMain() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: chats = [], refetch: refetchChats } = useChats();
  const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
  const { refetch: refetchChat } = useChat(chatToDelete?.id ?? '');
  const { refetch: refetchMessages } = useChatMessages(chatToDelete?.id ?? '');

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
          <h2 className="text-muted-foreground text-sm font-medium">{title}</h2>
        </div>
        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              asChild
              className={cn(pathname === `/chat/${chat.id}` ? 'font-bold' : '')}
            >
              <Link
                href={`/chat/${chat.id}`}
                className="group/link relative flex items-center justify-between gap-2 pr-16"
              >
                <span className="truncate">{chat.title || `Chat ${chat.id.slice(0, 8)}`}</span>
                <div className="absolute right-0 flex translate-x-8 transform gap-2 pr-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100">
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
                    className="cursor-pointer rounded-md p-1 transition-colors hover:bg-red-100 hover:text-red-600"
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
              className={cn(pathname === '/chat' ? 'bg-accent text-accent-foreground' : '')}
            >
              <Link href="/chat" className="flex items-center gap-2">
                <MessageSquarePlus className="h-4 w-4" />
                <span>New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {renderChatGroup(groupedChats.lastDay, 'Last 24 Hours')}
          {renderChatGroup(groupedChats.lastWeek, 'Last 7 Days')}
          {renderChatGroup(groupedChats.previous, 'Previous')}
        </SidebarMenu>
      </SidebarGroup>

      <Dialog open={chatToDelete !== null} onOpenChange={() => setChatToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone.
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
                  const chatId = chatToDelete.id;
                  await deleteChat(chatId);
                  if (pathname === `/chat/${chatId}`) {
                    setChatToDelete(null);
                    router.push('/chat');
                  }
                  await Promise.all([refetchChats(), refetchChat(), refetchMessages()]);
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
