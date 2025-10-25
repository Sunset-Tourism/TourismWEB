"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  LayoutDashboard,
  CalendarDays,
  BookOpenText,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
// cn no longer used after NavLink refactor
import NavLink from "@/components/ui/nav-link";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Homepage", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/dashboard", label: "Travel Dashboard", icon: LayoutDashboard },
  { href: "/booking", label: "Booking", icon: CalendarDays },
  { href: "/stories", label: "Stories", icon: BookOpenText },
  { href: "/chatbot", label: "Chatbot", icon: MessageSquare },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sidebar-inner">
      <div className="sidebar-brand">
        <Link href="/" className="brand">
          <span className="brand-icon" />
          <span>Bhutan Smart Tourism</span>
        </Link>
      </div>
      <ul className="sidebar-links">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className={active ? "active" : undefined}>
              <NavLink href={item.href} icon={item.icon} active={active}>
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-footer">
        <NavLink
          href="/settings"
          icon={SettingsIcon}
          aria-label="Settings"
          active={pathname === "/settings"}
        >
          Settings
        </NavLink>

        <NavLink href="#" icon={LogOut} aria-label="Logout" active={false}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
}
