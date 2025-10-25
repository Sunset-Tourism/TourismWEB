import React from "react";
import "../../../styles/globals.css";

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  outline?: boolean;
}

export function ActionButton({ icon, text, outline }: ActionButtonProps) {
  return (
    <button className={`action-button ${outline ? "outline" : ""}`}>
      {icon}
      <span>{text}</span>
    </button>
  );
}
