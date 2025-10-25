import React from "react";
import "../../../styles/globals.css";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureSection({ icon, title, description }: FeatureProps) {
  return (
    <div className="feature-section">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
