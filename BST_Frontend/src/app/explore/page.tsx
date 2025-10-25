"use client";

import React from "react";
import { InteractiveMap } from "./components/interactivemap";
import { FeatureSection } from "./components/featuresection";
import { DestinationCard } from "./components/destinationcard";
import { ActionButton } from "./components/actionbutton";
import { MapPin, Calendar, Bus, Compass } from "lucide-react";
import "../../styles/globals.css";

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
        <h1>Explore Bhutan Interactively</h1>
        <p>
          Real-time information on attractions, festivals, and transportation
        </p>

        <div className="hero-buttons">
          <ActionButton icon={<Compass />} text="Explore Attractions" />
          <ActionButton icon={<Calendar />} text="View Festivals" outline />
          <ActionButton icon={<Bus />} text="Transportation" outline />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="map-section">
        <InteractiveMap />
      </section>

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
        <h2>Popular Destinations</h2>
        <div className="destination-grid">
          {popularDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              title={destination.title}
              location={destination.location}
              description={destination.description}
              onExplore={() =>
                console.log(`Exploring ${destination.title}`)
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
