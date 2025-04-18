'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { AutosizeTextarea } from '@/components/ui/resizable-textarea';
import { geistSans, spaceGrotesk } from '@/lib/fonts';
import { AIResponseStatus } from './chat-bubble';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ChatRequestOptions } from 'ai';
import { ArrowUp } from 'lucide-react';

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
    <div className="bg-background sticky bottom-0 border-t">
      <div className="mx-auto max-w-[46rem] p-4">
        <Form {...form}>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
              form.setValue('prompt', '');
            }}
            className="placeholder:text-muted-foreground relative rounded-2xl border bg-neutral-100 transition-all dark:bg-[#2f2f2f]"
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
                      className="z-[10000] !min-h-28 w-full resize-none border-none bg-transparent px-5 pt-5 text-[15px] text-gray-800 shadow-none placeholder:text-gray-500 focus:outline-none focus-visible:ring-0 dark:text-white dark:placeholder:text-gray-400"
                      translate="no"
                      spellCheck={false}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (e.shiftKey) {
                            // Let the default behavior handle new line
                            return;
                          } else {
                            e.preventDefault();
                            if (field.value && field.value.trim() !== '') {
                              handleSubmit();
                              form.setValue('prompt', '');
                            }
                          }
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end p-2">
              <Button
                type="submit"
                disabled={form.watch('prompt') === '' || form.watch('prompt') === undefined}
                className="aspect-square size-8 cursor-pointer rounded-full border-indigo-200 bg-indigo-600 text-white hover:bg-indigo-700 dark:disabled:bg-white/15"
                style={spaceGrotesk.style}
              >
                <ArrowUp />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatInput;
