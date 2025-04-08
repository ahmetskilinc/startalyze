"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserChats } from "@/lib/actions/chat";
import { MessageSquarePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Chat } from "@/lib/actions/chat";

export function NavMain() {
  const pathname = usePathname();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const userChats = await getUserChats();
        setChats(userChats);
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };

    loadChats();
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="New Chat"
            className="bg-blue-600 hover:bg-blue-700 text-neutral-50 hover:text-neutral-50"
          >
            <Link href="/chat/new" className="flex items-center gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              <span>New Chat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              asChild
              className={cn(pathname === `/chat/${chat.id}` ? "font-bold" : "")}
            >
              <Link href={`/chat/${chat.id}`} className="flex items-center gap-2">
                <span className="truncate">
                  {chat.title || `Chat ${chat.id.slice(0, 8)}`}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
