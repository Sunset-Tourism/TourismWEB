import React from "react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  className?: string;
}

export function FeatureSection({
  icon,
  title,
  description,
  color = "#2563eb",
  className = "",
}: FeatureProps) {
  return (
    <div className={`feature-section ${className}`.trim()}>
      <div
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg"
        style={{ backgroundColor: `${color}1a`, color }}
      >
        {icon}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
