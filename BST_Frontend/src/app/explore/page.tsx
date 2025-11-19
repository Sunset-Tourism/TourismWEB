"use client";

import React from "react";
import { InteractiveMap } from "./components/interactivemap";
import { FeatureSection } from "./components/featuresection";
import { DestinationCard } from "./components/destinationcard";
import { ActionButton } from "./components/actionbutton";
import { MapPin, Calendar, Bus, Compass, Sparkles, TrendingUp } from "lucide-react";
import "../../styles/globals.css";
import "./components/leaflet-setup.css";
import { motion, Variants } from "framer-motion";

export default function HomePage() {
  const popularDestinations = [
    {
      title: "Tiger's Nest Monastery",
      location: "Paro, Bhutan",
      description: "A sacred Buddhist site perched on a cliffside offering breathtaking views",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
      rating: 4.9,
      reviews: 1234,
    },
    {
      title: "Punakha Dzong",
      location: "Punakha, Bhutan",
      description: "The palace of great happiness and bliss at the confluence of two rivers",
      image: "https://images.unsplash.com/photo-1587986825883-bc00b6a6033c?w=800&q=80",
      rating: 4.8,
      reviews: 892,
    },
    {
      title: "Thimphu Valley",
      location: "Thimphu, Bhutan",
      description: "The capital city surrounded by majestic Himalayan mountains",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
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
      {/* Hero Section */}
      <section className="hero-explore">
        <div className="hero-pattern" />
        
        <motion.div
          className="hero-decoration"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Sparkles className="decoration-icon" />
        </motion.div>

        <div className="hero-content-wrapper">
          <motion.div
            className="hero-badge"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Discover the Kingdom of Happiness</span>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore Bhutan Interactively
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover hidden gems, cultural festivals, and scenic routes with real-time information
            <br />
            Your journey to the Land of the Thunder Dragon starts here
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

          <motion.div
            className="hero-stats"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="stat-badge">
              <span className="stat-value">100+</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-badge">
              <span className="stat-value">50+</span>
              <span className="stat-label">Festivals</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-badge">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <motion.section
        className="map-section-wrapper"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <InteractiveMap />
      </motion.section>

      {/* Features Section */}
      <section className="features-wrapper">
        <motion.div
          className="section-header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Why Choose Our Platform</h2>
          <p>Everything you need for an unforgettable journey through Bhutan</p>
        </motion.div>

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
              description="Discover the most visited and iconic places in Bhutan with detailed guides and insider tips"
              color="#2b6777"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureSection
              icon={<Calendar />}
              title="Festivals & Events"
              description="Stay updated with cultural festivals, traditional ceremonies, and special events throughout the year"
              color="#c8553d"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureSection
              icon={<Bus />}
              title="Transportation"
              description="Access real-time transport routes, schedules, and travel tips for seamless exploration"
              color="#52b788"
            />
          </motion.div>
        </motion.section>
      </section>

      {/* Popular Destinations Section */}
      <section className="destinations-wrapper">
        <motion.div
          className="destinations-header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Popular Destinations</h2>
          <p>Hand-picked locations that showcase the beauty and spirituality of Bhutan</p>
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
