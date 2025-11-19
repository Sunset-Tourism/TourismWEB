import React from "react";
import { motion } from "framer-motion";
import "../../../styles/globals.css";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

export function FeatureSection({
  icon,
  title,
  description,
  color = "#2b6777",
}: FeatureProps) {
  return (
    <motion.div
      className="feature-section"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="feature-glow" style={{ background: `${color}20` }} />

      <motion.div
        className="feature-icon"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>

      <h3>{title}</h3>
      <p>{description}</p>

      <motion.div
        className="feature-badge"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
}
