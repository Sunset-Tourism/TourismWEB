"use client";

import React from "react";
import "../../../styles/globals.css";

interface DestinationProps {
  title: string;
  location: string;
  description: string;
  onExplore: () => void;
}

export function DestinationCard({
  title,
  location,
  description,
  onExplore,
}: DestinationProps) {
  return (
    <div className="destination-card">
      <h3>{title}</h3>
      <p className="location">{location}</p>
      <p>{description}</p>
      <button className="explore-btn" onClick={onExplore}>
        Explore
      </button>
    </div>
  );
}
