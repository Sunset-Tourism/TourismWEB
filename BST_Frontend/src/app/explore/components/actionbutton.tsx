import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../../styles/globals.css";

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  outline?: boolean;
}

export function ActionButton({ icon, text, outline }: ActionButtonProps) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      className={`action-button ${outline ? "outline" : ""}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      <motion.span
        className="button-icon"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.span>

      <span className="button-text">{text}</span>

      <motion.span
        className="button-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.button>
  );
}

// Gradients moved to CSS using var(--color-accent)
