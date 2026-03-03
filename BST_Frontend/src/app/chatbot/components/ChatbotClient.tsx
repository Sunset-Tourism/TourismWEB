"use client";
import { useRef, useState } from "react";
import { ChatMessage } from "@/types/chatbot";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Card } from "@/components/ui/card";
import { apiPostStream } from "@/lib/api";

export function ChatbotClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  function stopStreaming() {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setLoading(false);
  }

  async function sendMessage(text: string) {
    if (loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const assistantPlaceholder: ChatMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, userMsg, assistantPlaceholder]);
    setLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await apiPostStream(
        "/chatbot/stream",
        { message: text },
        (chunk) => {
          setMessages((prev) => {
            if (prev.length === 0) return prev;
            const next = [...prev];
            const lastIndex = next.length - 1;
            const last = next[lastIndex];

            if (last.role !== "assistant") return next;

            next[lastIndex] = {
              ...last,
              content: `${last.content}${chunk}`,
            };
            return next;
          });
        },
        controller.signal,
      );

      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        const last = next[lastIndex];

        if (last?.role === "assistant" && !last.content.trim()) {
          next[lastIndex] = {
            ...last,
            content: "I could not generate a response right now. Please try again.",
          };
        }
        return next;
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      const errMsg: ChatMessage = {
        role: "assistant",
        content: "Sorry, I couldn't respond. Please try again.",
      };
      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        const last = next[lastIndex];

        if (last?.role === "assistant" && !last.content.trim()) {
          next[lastIndex] = errMsg;
          return next;
        }

        return [...prev, errMsg];
      });
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-13.5rem)] min-h-[460px] flex-col overflow-hidden">
      <Card className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-[var(--color-bg-secondary)] p-4 shadow-sm md:p-6">
        <div className="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/25">
          <ChatMessages messages={messages} loading={loading} />
        </div>
        <div className="mt-5 pt-4">
          <ChatInput onSend={sendMessage} onStop={stopStreaming} disabled={loading} />
        </div>
      </Card>
    </div>
  );
}
