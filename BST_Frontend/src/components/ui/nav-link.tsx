import * as React from "react";
import Link, { LinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type IconType = React.ComponentType<{ className?: string }>;

const navLinkVariants = cva(
  // Base matches sidebar-link styling and hover behavior
  "sidebar-link hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      active: {
        true: "bg-accent/30 text-primary shadow-inner",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const iconBoxVariants = cva("icon-box", {
  variants: {
    active: {
      true: "bg-accent/40 text-primary",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps,
    VariantProps<typeof navLinkVariants> {
  icon?: IconType;
  label?: string;
  className?: string;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, icon: Icon, label, active, className, children, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(navLinkVariants({ active, className }))}
        ref={ref}
        {...props}
      >
        {Icon ? (
          <span className={cn(iconBoxVariants({ active }))} aria-hidden>
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        <span className="link-text">{label ?? children}</span>
      </Link>
    );
  }
);
NavLink.displayName = "NavLink";

export default NavLink;
