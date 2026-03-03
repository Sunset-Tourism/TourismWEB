import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chatbot";

type ChatBubbleProps = {
  message: ChatMessage;
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex w-full items-end px-3.5 md:px-4",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] overflow-hidden rounded-2xl px-5 py-4 text-sm leading-6 break-words whitespace-pre-wrap [overflow-wrap:anywhere] shadow-sm md:max-w-[75%]",
          isUser ? "mr-1.5 md:mr-2" : "ml-1.5 md:ml-2",
          isUser
            ? "bg-primary text-primary-foreground shadow-[0_2px_10px_rgba(43,103,119,0.22)]"
            : "bg-white/95 text-primary",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
