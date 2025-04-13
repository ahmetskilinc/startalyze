import { geistSans } from "@/lib/fonts";
import { CornerDownRight, Ghost } from "lucide-react";
import { AnimatedShinyText } from "../ui/shiny-text";
import Markdown from "markdown-to-jsx";
import { Message } from "ai";
import { ValidationReport } from "./validation-report";
import Link from "next/link";
import { Button } from "../ui/button";

export type AIResponseStatus = "ready" | "submitted" | "streaming" | "error";

function AgentAvatar() {
  return (
    <div className="aspect-square h-6 min-w-6 rounded-full grid leading-none place-items-center select-none mr-3 shadow-lg shadow-blue-600/10 bg-indigo-500">
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

export const AgentMessage = ({ message }: { message: Message }) => {
  // Try to parse the message content as JSON if it's a validation report
  let validationData = null;
  if (message.content.includes("```json")) {
    try {
      const parts = message.content.split("```json");
      if (parts[1]) {
        const jsonStr = parts[1].split("```")[0];
        if (jsonStr) {
          validationData = JSON.parse(jsonStr.trim());
        }
      }
    } catch (error) {
      console.error("Failed to parse validation report JSON:", error);
    }
  }

  return (
    <div className="text-base leading-relaxed flex">
      <AgentAvatar />
      <div className="flex-1 min-w-0">
        {validationData ? (
          <ValidationReport data={validationData} />
        ) : (
          <Markdown
            className="agent-response text-[15px] [&>*:first-child]:mt-0 space-y-6"
            style={geistSans.style}
          >
            {message.content}
          </Markdown>
        )}
        {message.parts &&
          message.parts.filter((part) => part.type === "source").length >= 1 && (
            <div
              className="mt-6 flex items-center leading-none space-x-3"
              style={geistSans.style}
            >
              <p className="text-[12.5px] font-semibold text-gray-600">Sources:</p>
              <div className="flex space-x-1.5">
                {message.parts
                  .filter((part) => part.type === "source")
                  .map(({ source }, idx) => (
                    <>
                      {source.url && (
                        <Button
                          key={idx}
                          asChild
                          size="sm"
                          variant="outline"
                          className="text-[12.5px] h-fit w-fit px-2 py-1.5"
                        >
                          <Link target="_blank" href={source.url}>
                            {source?.title}
                          </Link>
                        </Button>
                      )}
                    </>
                  ))}
              </div>
            </div>
          )}
      </div>
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
