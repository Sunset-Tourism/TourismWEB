"use client";

import React from "react";
import { MapPin, Calendar, Bus, Compass, Sparkles } from "lucide-react";
import { InteractiveMap, type MapMarker } from "./components/interactivemap";
import { FeatureSection } from "./components/featuresection";
import { DestinationCard } from "./components/destinationcard";
import { ActionButton } from "./components/actionbutton";

interface Destination {
  title: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  position: [number, number];
}

const destinations: Destination[] = [
  {
    title: "Tiger's Nest Monastery",
    location: "Paro, Bhutan",
    description: "A sacred Buddhist site perched on the cliffside",
    image: "/parotaktsang.jpg",
    rating: 4.9,
    reviews: 1234,
    position: [27.4927, 89.3639],
  },
  {
    title: "Punakha Dzong",
    location: "Punakha, Bhutan",
    description: "The palace of great happiness and bliss",
    image: "/punakhadzong.webp",
    rating: 4.8,
    reviews: 892,
    position: [27.5919, 89.8636],
  },
  {
    title: "Thimphu Valley",
    location: "Thimphu, Bhutan",
    description: "The capital city surrounded by gentle mountains",
    image: "/Thimphuvalley.webp",
    rating: 4.7,
    reviews: 1567,
    position: [27.4728, 89.639],
  },
];

const featureCards = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Popular places",
    description: "See the core highlights of Bhutan without endless scrolling.",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "Festivals",
    description: "Keep track of major cultural events before you travel.",
  },
  {
    icon: <Bus className="h-5 w-5" />,
    title: "Simple routing",
    description: "Know how to get around with buses, taxis, and guides.",
  },
];

const heroStats = [
  {
    label: "Destinations",
    value: "30+",
    detail: "Curated pins",
  },
  {
    label: "Culture spots",
    value: "18",
    detail: "Monasteries & dzongs",
  },
  {
    label: "Avg. rating",
    value: "4.8",
    detail: "Traveler reviews",
  },
];

const planningSteps = [
  {
    title: "Pick a region",
    detail: "Use the map pins to choose a valley or city you want to visit.",
  },
  {
    title: "Add activities",
    detail: "Mark the monasteries, hikes, or markets you care about most.",
  },
  {
    title: "Plan travel",
    detail: "Note transport and lodging so the trip stays relaxed and simple.",
  },
];

const journeyOutline = [
  {
    window: "Days 1-2",
    title: "Acclimate in Thimphu",
    detail: "Markets, artisan cafés, and the Buddha Dordenma ridge walk.",
  },
  {
    window: "Days 3-4",
    title: "Dochula to Punakha",
    detail: "Stop at 108 chortens, then float down to the Mo Chhu valley.",
  },
  {
    window: "Day 5",
    title: "Punakha slow morning",
    detail: "Trail the rice terraces and cross the suspension bridge.",
  },
  {
    window: "Days 6-7",
    title: "Haa / Bumthang",
    detail: "Pick alpine homestays or pine forest treks before departing.",
  },
];

const mapToggles = ["Festivals", "Homestays", "Trek routes", "Transit hubs"];

const mapMarkers: MapMarker[] = destinations.map((destination, index) => ({
  id: `destination-${index}`,
  title: destination.title,
  position: destination.position,
  description: destination.description,
}));

const mapHighlights = [
  {
    title: "Valley layers",
    detail: "Pins cluster by region so distance is obvious at a glance.",
  },
  {
    title: "Drive arcs",
    detail: "Soft bands mark two- and four-hour stretches to keep pace gentle.",
  },
  {
    title: "Offline cache",
    detail: "Map stays visible when you lose signal on the mountain passes.",
  },
];

export default function ExplorePage() {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % planningSteps.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-slate-900">
      <section className="hero-explore">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <Sparkles className="h-4 w-4 text-[#f97316]" />
            Planning studio
          </div>
          <h1>Explore Bhutan the simple way</h1>
          <p className="hero-description">
            Every destination and travel note starts with the map. Pinpoint a
            place, read a short description, and keep your planning calm and
            focused.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ActionButton
              icon={<Compass className="h-4 w-4" />}
              text="Start exploring"
            />
            <ActionButton
              icon={<Calendar className="h-4 w-4" />}
              text="Festivals"
              outline
            />
            <ActionButton
              icon={<Bus className="h-4 w-4" />}
              text="Travel options"
              outline
            />
          </div>
          <div className="hero-stats">
            {heroStats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div className="stat-badge text-center">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                  <span className="text-xs text-slate-400">{stat.detail}</span>
                </div>
                {index < heroStats.length - 1 && (
                  <span className="stat-divider" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="explore-map-band">
        <div className="section-header section-header--compact">
          <p>Map-first planning</p>
          <h2>See valleys, dzongs, and drive times together</h2>
          <p>
            Use the interactive map to anchor your ideas, then keep the cadence
            card and outline to the side so nothing feels rushed.
          </p>
        </div>
        <div className="map-band-inner">
          <div className="map-panel">
            <div className="map-panel__viewport">
              <InteractiveMap markers={mapMarkers} />
            </div>
            <div className="map-panel__caption">
              <p>
                Pins show the main monasteries and valleys so you can orient
                yourself from the very start. Zoom to reveal more intimate
                homestays.
              </p>
              <ul className="map-highlight-list">
                {mapHighlights.map((highlight) => (
                  <li key={highlight.title}>
                    <h4>{highlight.title}</h4>
                    <p>{highlight.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="map-info-panel">
            <div className="map-info-card">
              <p className="map-info-card__label">Planning cadence</p>
              <h3>Keep it to three beats</h3>
              <p>Let the rhythm be region, activity, then travel logistics.</p>
              <div className="step-slider" aria-live="polite">
                {planningSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`step-item step-item--slider${
                      index === activeStep ? " is-active" : ""
                    }`}
                    aria-hidden={index !== activeStep}
                  >
                    <h4>{step.title}</h4>
                    <p>{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="map-info-card">
              <p className="map-info-card__label">Journey outline</p>
              <h3>Seven calm days</h3>
              <p>Tap a row to highlight the pins for that window.</p>
              <ol className="itinerary-list">
                {journeyOutline.map((stop) => (
                  <li key={stop.title}>
                    <span className="itinerary-window">{stop.window}</span>
                    <span className="itinerary-title">{stop.title}</span>
                    <span className="itinerary-detail">{stop.detail}</span>
                  </li>
                ))}
              </ol>
              <div className="map-toggles">
                {mapToggles.map((toggle) => (
                  <button
                    key={toggle}
                    type="button"
                    className="map-toggle-pill"
                  >
                    {toggle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-wrapper">
        <div className="section-header">
          <p>Highlights</p>
          <h2>Quick things to know</h2>
          <p>
            Just three cards that explain how to use this page—no extra panels
            or tabs.
          </p>
        </div>
        <div className="features">
          {featureCards.map((feature) => (
            <FeatureSection
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="map-section-wrapper">
        <div className="destinations-header">
          <p>Destinations</p>
          <h2>Places worth bookmarking</h2>
          <p>A short list of highlights so the page stays light.</p>
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.title}
              title={destination.title}
              location={destination.location}
              description={destination.description}
              image={destination.image}
              rating={destination.rating}
              reviews={destination.reviews}
              onExplore={() => alert(`Exploring ${destination.title}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
