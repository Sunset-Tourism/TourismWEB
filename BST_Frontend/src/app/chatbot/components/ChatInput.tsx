"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  onSend: (text: string) => Promise<void> | void;
  onStop?: () => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, onStop, disabled }: ChatInputProps) {
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
      className="flex w-full gap-2 rounded-full bg-background p-2 shadow-sm transition-shadow focus-within:shadow"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Message..."
        className="flex-1 border-none bg-transparent focus-visible:ring-0 focus:outline-none"
        disabled={disabled}
      />
      <Button
        type={disabled ? "button" : "submit"}
        onClick={disabled ? onStop : undefined}
        disabled={!disabled && !value.trim()}
        className="h-10 min-w-10 justify-center rounded-full px-3 font-medium text-primary-foreground"
        aria-label={disabled ? "Stop generation" : "Send message"}
      >
        {disabled ? (
          <span className="h-3.5 w-3.5 rounded-[2px] bg-current" />
        ) : (
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
        )}
      </Button>
    </form>
  );
}
