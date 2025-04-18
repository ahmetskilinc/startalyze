import {
  AgentMessage,
  AgentThinking,
  AIResponseStatus,
  UserMessage,
} from '@/components/chat-ui/chat-bubble';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useRef } from 'react';
import { Message } from 'ai/react';

type Props = {
  messages: Message[];
  status: AIResponseStatus;
};

const ChatMessages = ({ messages, status }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100dvh-(201px+64px))]">
      <div className="flex-1">
        <div className="mx-auto w-full max-w-[46rem]">
          <div className="flex flex-col space-y-8 p-4 pt-7">
            {messages.map((msg, index) => {
              return (
                <div key={index}>
                  {msg.role === 'user' && <UserMessage text={msg.content} />}
                  {msg.role === 'assistant' && <AgentMessage message={msg} />}
                </div>
              );
            })}

            <AgentThinking status={status} />
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
