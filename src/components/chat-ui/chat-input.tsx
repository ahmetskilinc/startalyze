"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { AutosizeTextarea } from "@/components/ui/resizable-textarea";
import { geistSans, spaceGrotesk } from "@/lib/fonts";
import { ChatRequestOptions } from "ai";
import { ArrowUp } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AIResponseStatus } from "./chat-bubble";

const ChatInput = ({
  form,
  handleSubmit,
}: {
  form: UseFormReturn<{
    prompt: string;
  }>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  status: AIResponseStatus;
}) => {
  return (
    <div className="sticky bottom-0 bg-background border-t">
      <div className="px-4 pb-0 max-w-[46rem] mx-auto">
        <Form {...form}>
          <div>
            <div className="bg-gradient-to-t from-background via-background/50 select-none pointer-events-none">
              &nbsp;
            </div>
            <div className="bg-background">
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                  form.setValue("prompt", "");
                }}
                className="rounded-2xl relative border bg-neutral-100 dark:bg-[#2f2f2f] placeholder:text-muted-foreground transition-all"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutosizeTextarea
                          placeholder="Brief Description of Your Startup Idea"
                          maxHeight={150}
                          autoFocus
                          style={geistSans.style}
                          className="z-[10000] text-[15px] w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-white !min-h-28 px-5 pt-5 focus:outline-none resize-none bg-transparent focus-visible:ring-0 shadow-none border-none"
                          translate="no"
                          spellCheck={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="p-2 flex justify-between items-center">
                  <div></div>
                  <div className="flex space-x-1.5">
                    <Button
                      type="submit"
                      disabled={
                        form.watch("prompt") === "" ||
                        form.watch("prompt") === undefined
                      }
                      className="aspect-square size-8 cursor-pointer dark:disabled:bg-white/15 rounded-full border-indigo-200 bg-indigo-600 text-white hover:bg-indigo-700"
                      style={spaceGrotesk.style}
                    >
                      <ArrowUp />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Form>
        <div className="h-4 w-full bg-background" />
      </div>
    </div>
  );
};

export default ChatInput;
