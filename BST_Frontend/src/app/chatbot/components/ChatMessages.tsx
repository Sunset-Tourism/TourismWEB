"use client";
import { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chatbot";
import { ChatBubble } from "./ChatBubble";

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
};

export function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-6 py-10 text-center">
        <div className="max-w-sm space-y-2">
          <h2 className="font-heading text-lg font-semibold text-primary md:text-xl">
            How can I help?
          </h2>
          <p className="text-sm text-primary/70">
            Ask anything about your trip.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-3 pt-10 pb-2 md:px-4 md:pt-11">
      {messages.map((m, i) => (
        <ChatBubble key={i} message={m} />
      ))}
      {loading && (
        <div className="flex w-full justify-start">
          <div className="animate-pulse rounded-2xl bg-background px-4 py-2 text-sm text-primary shadow-sm">
            Thinking
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
