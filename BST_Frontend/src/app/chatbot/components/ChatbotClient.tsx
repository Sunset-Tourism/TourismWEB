"use client";
import { useState } from "react";
import { ChatMessage } from "@/types/chatbot";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Card } from "@/components/ui/card";
import { apiPost } from "@/lib/api";

export function ChatbotClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const data = await apiPost<{ reply: string }>("/chatbot", {
        message: text,
      });
      const botMsg: ChatMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMessage = {
        role: "assistant",
        content: "Sorry, I couldn't respond. Please try again.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <Card className="flex h-[520px] flex-col overflow-hidden border-[#e5e7eb] bg-[#f2f2f2] p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#2b6777]">Travel Chatbot</h1>
          <span className="text-xs font-medium text-[#2b6777]/60">
            Bhutan Guide AI
          </span>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2b6777]/25">
          <ChatMessages messages={messages} loading={loading} />
        </div>
        <div className="mt-4">
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      </Card>
      <p className="text-center text-xs text-[#2b6777]/60">
        Responses are informational. Verify important travel details with
        official sources.
      </p>
    </div>
  );
}
