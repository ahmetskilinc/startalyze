import { geistSans } from "@/lib/fonts";
import { CornerDownRight, Ghost } from "lucide-react";
import { AnimatedShinyText } from "../ui/shiny-text";
import Markdown from "markdown-to-jsx";

export type AIResponseStatus = "ready" | "submitted" | "streaming" | "error";

function AgentAvatar() {
  return (
    <div className="aspect-square h-6 min-w-6 rounded-full grid leading-none place-items-center select-none mr-3 shadow-lg shadow-blue-600/10 bg-blue-500">
      <Ghost size={13.5} className="text-white" />
    </div>
  );
}

export const UserMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      <div className="aspect-square size-6 text-gray-500 dark:text-gray-400 text-sm leading-none rounded-full grid place-items-center select-none mr-3">
        <CornerDownRight size={16} className="relative bottom-px" />
      </div>
      <div className="text-base leading-relaxed space-y-2 rounded-br-none max-w-[95%]">
        <p
          style={geistSans.style}
          className="text-gray-800 dark:text-gray-400 text-[15px] mt-0.5"
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export const AgentMessage = ({ content }: { content: string }) => {
  return (
    <div className="text-base leading-relaxed flex">
      <AgentAvatar />
      <Markdown
        className="agent-response text-[15px] [&>*:first-child]:mt-0 space-y-6"
        style={geistSans.style}
      >
        {content}
      </Markdown>
    </div>
  );
};

export const AgentThinking = ({ status }: { status: AIResponseStatus }) => {
  return (
    status === "submitted" && (
      <div className="text-base leading-relaxed flex">
        <AgentAvatar />
        <AnimatedShinyText className="inline-flex mx-0 text-[15px] tracking-wide items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span style={geistSans.style}>✨ Thinking...</span>
        </AnimatedShinyText>
      </div>
    )
  );
};
