"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  onSend: (text: string) => Promise<void> | void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const v = value.trim();
    setValue("");
    await onSend(v);
  }
  return (
    <form
      onSubmit={submit}
      className="flex w-full gap-2 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-md"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about Bhutan..."
        className="flex-1 border-none focus-visible:ring-0 focus:outline-none"
        disabled={disabled}
      />
      <Button
        type="submit"
        disabled={disabled || !value.trim()}
        className="bg-[#2b6777] hover:bg-[#225460] text-white font-medium px-6 py-2 min-w-[72px] justify-center"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22 11 13 2 9Z" />
        </svg>
      </Button>
    </form>
  );
}
