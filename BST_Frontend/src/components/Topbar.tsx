"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, LogOut, Settings, User } from "lucide-react";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer border-2 border-input focus-visible:ring-1 focus-visible:ring-offset-0 ring-offset-0 hover:ring-1">
              <AvatarFallback className="bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="#"
                className="flex items-center gap-2 text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
