"use client";

import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { HeaderTitle } from "../header-title";
import ChatMessages from "./chat-messages";
import { ArrowUp } from "lucide-react";
import { geistSans, spaceGrotesk } from "@/lib/fonts";
import { Button } from "../ui/button";
import { AutosizeTextarea } from "../ui/resizable-textarea";

const FormSchema = z.object({
  prompt: z.string(),
});

const NewChatPage = () => {
  const router = useRouter();

  const { handleSubmit, input, handleInputChange, status } = useChat({
    experimental_prepareRequestBody: ({ messages }) => {
      const usersLastMessage = messages[messages.length - 1];
      return {
        message: usersLastMessage,
      };
    },
    async onResponse(response) {
      const { chatId } = await response.json();
      router.push(`/chat/${chatId}`);
    },
  });

  return (
    <main className="flex flex-col justify-center h-screen">
      <div className="px-4 pb-0 w-full max-w-[46rem] mx-auto">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <div className="bg-gradient-to-t from-background via-background/50 select-none pointer-events-none">
              &nbsp;
            </div>
            <div className="bg-background">
              <div className="rounded-2xl relative border bg-neutral-100 dark:bg-[#2f2f2f] placeholder:text-muted-foreground transition-all">
                  <AutosizeTextarea
                    placeholder="Brief Description of Your Startup Idea"
                    maxHeight={150}
                    autoFocus
                    onChange={(event) => handleInputChange(event)}
                    style={geistSans.style}
                    className="z-[10000] text-[15px] w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-white !min-h-28 px-5 pt-5 focus:outline-none resize-none bg-transparent focus-visible:ring-0 shadow-none border-none"
                    translate="no"
                    spellCheck={false}
                  />
                <div className="p-2 flex justify-between items-center">
                  <div></div>
                  <div className="flex space-x-1.5">
                    <Button
                      type="submit"
                      disabled={
                        input === "" ||
                        input === undefined ||
                        status === "submitted"
                      }
                      className="aspect-square size-8 cursor-pointer dark:disabled:bg-white/15 rounded-full border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
                      style={spaceGrotesk.style}
                    >
                      <ArrowUp />
                    </Button>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </form>
        <div className="h-4 w-full bg-background" />
      </div>
    </main>
  );
};

export default NewChatPage;
