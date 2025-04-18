import { getChat, getChatMessages, getUserChats, deleteChat as deleteChatAction, createChat as createChatAction } from '@/lib/actions/chat';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { Message } from 'ai';

export const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: getUserChats,
    staleTime: 1000 * 60,
    retry: 3,
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChat(chatId),
    enabled: !!chatId,
    staleTime: 1000 * 60,
    retry: 3,
  });
};

export const useChatMessages = (chatId: string) => {
  return useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId,
    staleTime: 1000 * 30,
    retry: 3,
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (chatId: string) => {
      const result = await deleteChatAction(chatId);
      return { chatId, ...result };
    },
    onMutate: async (chatId) => {
      await queryClient.cancelQueries({ queryKey: ['chats'] });
      await queryClient.cancelQueries({ queryKey: ['chat', chatId] });
      await queryClient.cancelQueries({ queryKey: ['chat-messages', chatId] });

      const previousChats = queryClient.getQueryData(['chats']);

      queryClient.setQueryData(['chats'], (old: any[] = []) => {
        return old?.filter((chat) => chat.id !== chatId) ?? [];
      });

      return { previousChats, optimisticId: chatId };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(['chats'], context.previousChats);
      if (context.optimisticId) {
        queryClient.removeQueries({ queryKey: ['chat', context.optimisticId] });
        queryClient.removeQueries({ queryKey: ['chat-messages', context.optimisticId] });
      }
      toast.error('Failed to delete chat. Please try again.');
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      if (context?.optimisticId) {
        queryClient.removeQueries({ queryKey: ['chat', context.optimisticId] });
        queryClient.removeQueries({ queryKey: ['chat-messages', context.optimisticId] });
      }
      toast.success('Chat deleted successfully');
      router.push('/chat');
    },
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const optimisticId = nanoid();

  return useMutation({
    mutationFn: async ({ userMessage, title }: { userMessage: Message; title: string }) => {
      const result = await createChatAction({ userMessage, title });
      return result;
    },
    onMutate: async ({ userMessage, title }) => {
      await queryClient.cancelQueries({ queryKey: ['chats'] });

      const previousChats = queryClient.getQueryData(['chats']) as any[];

      const optimisticChat = {
        id: optimisticId,
        title: title || `New Chat`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deleted: false,
      };

      queryClient.setQueryData(['chats'], (old: any[] = []) => {
        return [optimisticChat, ...old];
      });

      queryClient.setQueryData(['chat', optimisticId], optimisticChat);
      queryClient.setQueryData(['chat-messages', optimisticId], [
        {
          id: nanoid(),
          chatId: optimisticId,
          content: userMessage.content,
          role: 'user',
          createdAt: new Date().toISOString(),
        },
      ]);

      router.push(`/chat/${optimisticId}`);

      return { previousChats, optimisticId };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(['chats'], context.previousChats);
      if (context?.optimisticId) {
        queryClient.removeQueries({ queryKey: ['chat', context.optimisticId] });
        queryClient.removeQueries({ queryKey: ['chat-messages', context.optimisticId] });
      }
      toast.error('Failed to create chat. Please try again.');
      router.push('/chat');
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      if (context?.optimisticId) {
        queryClient.removeQueries({ queryKey: ['chat', context.optimisticId] });
        queryClient.removeQueries({ queryKey: ['chat-messages', context.optimisticId] });
      }
      router.push(`/chat/${data.chatId}`);
    },
  });
};
