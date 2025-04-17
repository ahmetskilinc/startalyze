import {
  AgentMessage,
  AgentThinking,
  AIResponseStatus,
  UserMessage,
} from "@/components/chat-ui/chat-bubble";
import { Message } from "ai/react";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  messages: Message[];
  status: AIResponseStatus;
};

const ChatMessages = ({ messages, status }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100dvh-(201px+64px))]">
      <div className="flex-1">
        <div className="max-w-[46rem] w-full mx-auto">
          <div className="flex flex-col space-y-8 pt-7 p-4">
            {messages.map((msg, index) => {
              const isLastAssistantMsg =
                msg.role === "assistant" &&
                msg.id === messages.filter((m) => m.role === "assistant").at(-1)?.id;

              if (status === "streaming" && isLastAssistantMsg) {
                return null;
              }

              return (
                <div key={index}>
                  {msg.role === "user" && <UserMessage text={msg.content} />}
                  {msg.role === "assistant" && <AgentMessage message={msg} />}
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
