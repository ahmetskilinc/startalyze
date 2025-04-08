import React from "react";
import { Message, useChat } from "ai/react";
import { AIResponseStatus } from "@/components/chat-ui/chat-bubble";
import { UserMessage } from "@/components/chat-ui/chat-bubble";
import { AgentMessage } from "@/components/chat-ui/chat-bubble";
import { AgentThinking } from "@/components/chat-ui/chat-bubble";

type Props = {
  messages: Message[];
  status: AIResponseStatus;
};

const ChatMessages = ({ messages, status }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[46rem] w-full mx-auto">
        <div className="flex flex-col border-l-0">
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
            <div className="h-72" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
