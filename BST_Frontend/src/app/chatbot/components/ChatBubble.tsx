import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chatbot";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ChatBubbleProps = {
  message: ChatMessage;
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border bg-gradient-to-br from-[#2b6777] to-[#52ab98] text-white">
          <AvatarFallback className="text-[10px] font-semibold">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-xl px-4 py-2 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-[#2b6777] text-white border border-[#2b6777]/40"
            : "bg-white text-[#2b6777] border border-[#e5e7eb]"
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border bg-[#2b6777] text-white">
          <AvatarFallback className="text-[10px] font-semibold">
            YOU
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
