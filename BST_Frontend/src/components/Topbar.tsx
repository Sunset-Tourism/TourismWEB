"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, User } from "lucide-react";

const TITLES: Record<string, string> = {
  "/": "Homepage",
  "/explore": "Explore",
  "/dashboard": "Dashboard",
  "/booking": "Booking",
  "/stories": "Stories",
  "/chatbot": "Chatbot",
};

function humanize(path: string) {
  const seg = path.split("?")[0].split("#")[0];
  const parts = seg.split("/").filter(Boolean);
  if (parts.length === 0) return "Homepage";
  const last = parts[parts.length - 1];
  return last.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Topbar() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? humanize(pathname);
  return (
    <header className="topbar">
      <h1 className="page-title">{title}</h1>
      <div className="topbar-actions">
        <div className="hidden sm:block min-w-[220px] relative">
          <Search className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            suppressHydrationWarning
            className="w-full h-9 pr-12 pl-10! rounded-full border-2 focus-visible:ring-1 focus-visible:ring-offset-0 hover:ring-1"
            placeholder="Search anything"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9 p-0 border-2 border-input focus-visible:ring-1 focus-visible:ring-offset-0 ring-offset-0 hover:ring-1"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Link href="/profile" aria-label="Profile">
          <Avatar className="h-9 w-9 cursor-pointer border-2 border-input focus-visible:ring-1 focus-visible:ring-offset-0 ring-offset-0 hover:ring-1">
            <AvatarFallback className="bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
