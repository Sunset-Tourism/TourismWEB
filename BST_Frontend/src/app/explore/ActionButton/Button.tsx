import React from "react";
import "@/styles/globals.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`custom-btn ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
