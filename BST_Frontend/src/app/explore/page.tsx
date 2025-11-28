"use client";

import React from "react";
import { InteractiveMap } from "./components/interactivemap";
import { FeatureSection } from "./components/featuresection";
import { DestinationCard } from "./components/destinationcard";
import { ActionButton } from "./components/actionbutton";
import { MapPin, Calendar, Bus, Compass, Sparkles } from "lucide-react";
import "./explore.css"; // Import explore-specific CSS
import "./components/leaflet-setup.css";
import { motion, Variants } from "framer-motion";

export default function HomePage() {
  const popularDestinations = [
    {
      title: "Tiger's Nest Monastery",
      location: "Paro, Bhutan",
      description: "A sacred Buddhist site perched on a cliffside",
      image:
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
      rating: 4.9,
      reviews: 1234,
    },
    {
      title: "Punakha Dzong",
      location: "Punakha, Bhutan",
      description: "The palace of great happiness and bliss",
      image:
        "https://images.unsplash.com/photo-1587986825883-bc00b6a6033c?w=800&q=80",
      rating: 4.8,
      reviews: 892,
    },
    {
      title: "Thimphu Valley",
      location: "Thimphu, Bhutan",
      description: "The capital city surrounded by mountains",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
      rating: 4.7,
      reviews: 1567,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="homepage">
      {/* Hero Section (updated) */}
      <section className="explore-hero">
        <div className="explore-hero__bg" aria-hidden="true" />
        <div className="explore-hero__pattern" aria-hidden="true" />
        <motion.div
          className="explore-hero__inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="explore-hero__badge"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="explore-hero__badge-icon" />
            <span>Discover Bhutan</span>
          </motion.div>

          <h1 className="explore-hero__title">Explore Bhutan Interactively</h1>
          <p className="explore-hero__subtitle">
            Real-time insights on attractions, sacred sites, festivals and
            travel routes
          </p>

          <div className="explore-hero__actions">
            <ActionButton icon={<Compass />} text="Explore Attractions" />
            <ActionButton icon={<Calendar />} text="View Festivals" outline />
            <ActionButton icon={<Bus />} text="Transportation" outline />
          </div>
        </motion.div>
      </section>

      {/* Interactive Map Section */}
      <motion.section
        className="map-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <InteractiveMap />
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <FeatureSection
            icon={<MapPin />}
            title="Popular Destinations"
            description="Discover the most visited and iconic places in Bhutan"
            color="#2b6777"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FeatureSection
            icon={<Calendar />}
            title="Festivals & Events"
            description="Stay updated with cultural festivals and events"
            color="#c8553d"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FeatureSection
            icon={<Bus />}
            title="Transportation"
            description="Real-time transport routes and schedules"
            color="#52ab98" // updated accent
          />
        </motion.div>
      </motion.section>

      {/* Popular Destinations Section */}
      <section className="destinations">
        <motion.div
          className="destinations-header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Popular Destinations</h2>
          <p>Hand-picked locations that showcase the beauty of Bhutan</p>
        </motion.div>

        <motion.div
          className="destination-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {popularDestinations.map((destination, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DestinationCard
                title={destination.title}
                location={destination.location}
                description={destination.description}
                image={destination.image}
                rating={destination.rating}
                reviews={destination.reviews}
                onExplore={() => alert(`Exploring ${destination.title}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
