"use client";

import { AgentThinking, UserMessage } from "@/components/chat-ui/chat-bubble";
import ChatInput from "@/components/chat-ui/chat-input";
import { geistSans } from "@/lib/fonts";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  prompt: z.string(),
});

const page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <main>
      <div
        className="h-14 border-b px-6 flex items-center text-[15px] top-0 sticky bg-white z-10"
        style={geistSans.style}
      >
        Connecting Food Businesses & Charities
      </div>
      <div className="max-w-[46rem] w-full mx-auto">
        <div className="flex flex-col border-l-0">
          <div className="flex flex-col space-y-8 pt-7 p-4">
            <div>
              {/* TODO: dynamically map chats */}
              <UserMessage
                text={
                  "Food waste from small restaurants and cafes is significant, yet donating small, variable amounts of surplus food to shelters is logistically challenging. We propose 'FoodFlow Connect,' a non-profit mobile platform that allows restaurants/cafes to list daily surplus food items easily. Verified local charities and food banks get real-time notifications and can claim/schedule pickups via optimized routes suggested by the app. The target users are small food businesses and registered local charities/food banks. Our value is simplifying the donation process, reducing food waste, and efficiently connecting supply with need through technology, funded by grants and corporate sponsorships."
                }
              />
            </div>
          </div>
          <AgentThinking status={"submitted"} />
          <div className="h-72" />
        </div>
      </div>
      <div className="w-full relative">
        <div className="fixed bottom-0 max-w-[46rem] mx-auto w-full flex flex-col justify-end left-1/2 -translate-x-1/2">
          <div className="px-4 pb-0">
            <ChatInput form={form} />
            <div className="h-4 w-full bg-background" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
