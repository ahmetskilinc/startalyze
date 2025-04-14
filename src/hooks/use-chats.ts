import { useQuery } from "@tanstack/react-query";
import { getChat, getChatMessages, getUserChats } from "@/lib/actions/chat";

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getUserChats,
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat(chatId),
    enabled: !!chatId,
  });
};

export const useChatMessages = (chatId: string) => {
  return useQuery({
    queryKey: ["chat-messages", chatId],
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId,
  });
};
