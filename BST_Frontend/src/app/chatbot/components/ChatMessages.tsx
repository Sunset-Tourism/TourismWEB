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
      <div className="flex h-full items-center justify-center text-center p-8">
        <div className="space-y-3 max-w-sm">
          <h2 className="text-lg font-semibold text-[#2b6777]">
            Ask about Bhutan
          </h2>
          <p className="text-sm text-[#2b6777]/80">
            Try questions like: <br />
            &quot;Best time to visit Punakha?&quot;
            <br />
            &quot;Popular trekking routes?&quot;
            <br />
            &quot;Cultural etiquettes?&quot;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((m, i) => (
        <ChatBubble key={i} message={m} />
      ))}
      {loading && (
        <div className="flex w-full justify-start">
          <div className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#2b6777] shadow-sm animate-pulse">
            Thinking...
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
