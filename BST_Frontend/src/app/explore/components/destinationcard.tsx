"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight, Heart } from "lucide-react";
import "../../../styles/globals.css";

interface DestinationProps {
  title: string;
  location: string;
  description: string;
  image?: string;
  rating?: number;
  reviews?: number;
  onExplore: () => void;
}

export function DestinationCard({
  title,
  location,
  description,
  image,
  rating = 4.5,
  reviews = 0,
  onExplore,
}: DestinationProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <motion.div
      className="destination-card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="card-image-wrapper">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
          }
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="card-image"
          priority={false}
        />
        <div className="card-overlay" />

        <motion.button
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "filled" : ""}`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </motion.button>

        <div className="card-rating">
          <Star className="w-4 h-4 star-icon" fill="currentColor" />
          <span>{rating}</span>
          {reviews > 0 && <span className="reviews">({reviews})</span>}
        </div>
      </div>

      <div className="card-content">
        <div className="card-location">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        <h3>{title}</h3>
        <p>{description}</p>

        <motion.button
          className="explore-btn"
          onClick={onExplore}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="card-shine" />
    </motion.div>
  );
}
