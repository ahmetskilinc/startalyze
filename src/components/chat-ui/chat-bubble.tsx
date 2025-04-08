import { geistSans } from "@/lib/fonts";
import { CornerDownRight, Ghost } from "lucide-react";
import { AnimatedShinyText } from "../ui/shiny-text";

export type AIResponseStatus = "ready" | "submitted" | "streaming" | "error";

function AgentAvatar() {
  return (
    <div className="aspect-square h-7 min-w-7 rounded-full grid leading-none place-items-center select-none mr-3 mt-1 shadow-lg shadow-blue-600/10 bg-blue-500">
      <Ghost size={16} className="text-white" />
    </div>
  );
}

export const UserMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      <div className="aspect-square size-7 text-gray-500 dark:text-gray-400 text-sm leading-none rounded-full grid place-items-center select-none mr-3">
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

export const AgentThinking = ({ status }: { status: AIResponseStatus }) => {
  return (
    status === "submitted" && (
      <div className="text-base leading-relaxed flex px-4 pt-4">
        <AgentAvatar />
        <AnimatedShinyText className="inline-flex mx-0 mt-1 text-[15px] tracking-wide items-center justify-center py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span style={geistSans.style}>✨ Thinking...</span>
        </AnimatedShinyText>
      </div>
    )
  );
};
