import {
  AgentMessage,
  AgentThinking,
  AIResponseStatus,
  UserMessage,
} from "@/components/chat-ui/chat-bubble";
import { Message } from "ai/react";
import { useEffect, useRef } from "react";

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
    <div className="flex-1">
      <div className="max-w-[46rem] w-full mx-auto">
        <div className="flex flex-col space-y-8 pt-7 p-4">
          {messages.map((msg, index) => {
            const lastAssistantMsg = messages
              .filter((m) => m.role === "assistant")
              .at(-1);

            if (
              status === "streaming" &&
              msg.role === "assistant" &&
              msg.id === lastAssistantMsg?.id
            ) {
              return null;
            }

            return (
              <div key={index}>
                {msg.role === "user" && <UserMessage text={msg.content} />}
                {msg.role === "assistant" && <AgentMessage message={msg} />}
              </div>
            );
          })}

          {status === "streaming" && (
            <AgentMessage
              message={messages.filter((m) => m.role === "assistant").at(-1)!}
            />
          )}

          <AgentThinking status={status} />
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
