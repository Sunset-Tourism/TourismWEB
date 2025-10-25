"use client";

import React from "react";
import { InteractiveMap } from "./components/interactivemap";
import { FeatureSection } from "./components/featuresection";
import { DestinationCard } from "./components/destinationcard";
import { ActionButton } from "./components/actionbutton";
import { MapPin, Calendar, Bus, Compass } from "lucide-react";
import "../../styles/globals.css";
import { motion } from "framer-motion";

export default function HomePage() {
  const popularDestinations = [
    {
      title: "Tiger's Nest Monastery",
      location: "Paro, Bhutan",
      description: "A sacred Buddhist site perched on a cliffside",
    },
    {
      title: "Punakha Dzong",
      location: "Punakha, Bhutan",
      description: "The palace of great happiness and bliss",
    },
    {
      title: "Thimphu Valley",
      location: "Thimphu, Bhutan",
      description: "The capital city surrounded by mountains",
    },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Explore Bhutan Interactively
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Real-time information on attractions, festivals, and transportation
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ActionButton icon={<Compass />} text="Explore Attractions" />
          <ActionButton icon={<Calendar />} text="View Festivals" outline />
          <ActionButton icon={<Bus />} text="Transportation" outline />
        </motion.div>
      </section>

      {/* Interactive Map Section */}
      <motion.section
        className="map-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <InteractiveMap />
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <FeatureSection
          icon={<MapPin />}
          title="Popular Destinations"
          description="Discover the most visited and iconic places in Bhutan"
        />
        <FeatureSection
          icon={<Calendar />}
          title="Festivals & Events"
          description="Stay updated with cultural festivals and events"
        />
        <FeatureSection
          icon={<Bus />}
          title="Transportation"
          description="Real-time transport routes and schedules"
        />
      </section>

      {/* Popular Destinations Section */}
      <section className="destinations">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Popular Destinations
        </motion.h2>

        <div className="destination-grid">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <DestinationCard
                title={destination.title}
                location={destination.location}
                description={destination.description}
                onExplore={() => alert(`Exploring ${destination.title}`)}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
