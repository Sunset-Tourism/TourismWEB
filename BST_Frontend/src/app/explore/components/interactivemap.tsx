"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Mountain,
  Building2,
  Landmark,
  Navigation,
  Layers,
  Maximize2,
  Minimize2,
  Compass,
  Info,
  X,
} from "lucide-react";
import "../../../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import type { DivIcon } from "leaflet";

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Import useMap directly without dynamic import
import { useMap } from "react-leaflet";

interface Destination {
  id: number;
  name: string;
  position: [number, number];
  description: string;
  type: "monastery" | "dzong" | "valley" | "peak";
  highlights: string[];
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Tiger's Nest Monastery",
    position: [27.4927, 89.3639],
    description: "Sacred Buddhist site perched on a cliff",
    type: "monastery",
    highlights: ["Iconic landmark", "Spiritual journey", "Breathtaking views"],
  },
  {
    id: 2,
    name: "Punakha Dzong",
    position: [27.5919, 89.8636],
    description: "The palace of great happiness",
    type: "dzong",
    highlights: [
      "Historic fortress",
      "Beautiful architecture",
      "River confluence",
    ],
  },
  {
    id: 3,
    name: "Thimphu",
    position: [27.4728, 89.639],
    description: "Capital city surrounded by mountains",
    type: "valley",
    highlights: ["Capital city", "Cultural hub", "Modern amenities"],
  },
  {
    id: 4,
    name: "Paro Valley",
    position: [27.4287, 89.4164],
    description: "Beautiful valley with rich culture",
    type: "valley",
    highlights: ["Airport gateway", "Traditional villages", "Rice fields"],
  },
  {
    id: 5,
    name: "Bumthang",
    position: [27.5542, 90.7417],
    description: "Spiritual heartland of Bhutan",
    type: "valley",
    highlights: ["Sacred sites", "Ancient temples", "Cultural festivals"],
  },
];

const regionCoordinates: Record<
  string,
  { center: [number, number]; zoom: number }
> = {
  Thimphu: { center: [27.4728, 89.639], zoom: 12 },
  Paro: { center: [27.4287, 89.4164], zoom: 11 },
  Punakha: { center: [27.5919, 89.8636], zoom: 11 },
  Bumthang: { center: [27.5542, 90.7417], zoom: 10 },
};

// Custom marker icons for different types with pulse animation
const createCustomIcon = (type: string): DivIcon | null => {
  // Check if we're on the client side
  if (typeof window === "undefined") return null;

  interface LeafletModule {
    divIcon: (options: {
      className: string;
      html: string;
      iconSize: [number, number];
      iconAnchor: [number, number];
      popupAnchor: [number, number];
    }) => DivIcon;
  }

  const L = (window as Window & { L?: LeafletModule }).L;
  if (!L) return null;

  const colors: Record<string, string> = {
    monastery: "#8B4513",
    dzong: "#DC143C",
    valley: "#228B22",
    peak: "#4682B4",
  };

  const color = colors[type] || "#2b6777";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-wrapper">
        <div class="marker-pulse" style="background: ${color}20;"></div>
        <div style="
          background: ${color};
          width: 36px;
          height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 18px;
            font-weight: bold;
          ">📍</div>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

function MapController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo(center, zoom, {
        duration: 1.5,
      });
    }
  }, [center, zoom, map]);

  return null;
}

export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    27.5142, 90.4336,
  ]);
  const [mapZoom, setMapZoom] = useState(8);
  const [mapStyle, setMapStyle] = useState<"default" | "satellite" | "terrain">(
    "default"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showInfo, setShowInfo] = useState(true);

  // Fix Leaflet marker icon issue - MOVED INSIDE COMPONENT
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Dynamically import Leaflet only on client side
      import("leaflet").then((LeafletModule) => {
        interface LeafletLib {
          divIcon: (options: {
            className: string;
            html: string;
            iconSize: [number, number];
            iconAnchor: [number, number];
            popupAnchor: [number, number];
          }) => DivIcon;
          Icon: {
            Default: {
              prototype: Record<string, unknown>;
              mergeOptions: (options: {
                iconRetinaUrl: string;
                iconUrl: string;
                shadowUrl: string;
              }) => void;
            };
          };
        }

        // Make L available globally for createCustomIcon
        (window as Window & { L?: LeafletLib }).L = LeafletModule as unknown as LeafletLib;

        // Fix default icon
        const IconDefault = (LeafletModule as unknown as LeafletLib).Icon.Default;
        delete IconDefault.prototype._getIconUrl;
        IconDefault.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        setMapReady(true);
      });
    }
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "monastery":
        return <Mountain className="w-5 h-5" />;
      case "dzong":
        return <Landmark className="w-5 h-5" />;
      case "valley":
        return <Building2 className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    const coords = regionCoordinates[region];
    if (coords) {
      setMapCenter(coords.center);
      setMapZoom(coords.zoom);
    }
  };

  const resetMap = () => {
    setSelectedRegion(null);
    setMapCenter([27.5142, 90.4336]);
    setMapZoom(8);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDestinationClick = (dest: Destination) => {
    setSelectedDestination(dest);
    setMapCenter(dest.position);
    setMapZoom(13);
  };

  const closeDestinationPanel = () => {
    setSelectedDestination(null);
    resetMap();
  };

  return (
    <section className={`map-section-enhanced ${isFullscreen ? "fullscreen" : ""}`}>
      {/* Enhanced Header */}
      <motion.div
        className="map-header-enhanced"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="map-title-section">
          <div className="map-title-wrapper">
            <Compass className="map-title-icon" />
            <div>
              <h2>Interactive Map of Bhutan</h2>
              <p className="map-subtitle">
                Explore destinations, landmarks, and hidden gems across the kingdom
              </p>
            </div>
          </div>

          <div className="map-controls-group">
            <motion.button
              className="map-control-btn info-btn"
              onClick={() => setShowInfo(!showInfo)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="map-control-btn fullscreen-btn-enhanced"
              onClick={toggleFullscreen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Map Style Switcher */}
        <motion.div
          className="map-style-switcher-enhanced"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Layers className="switcher-icon" />
          <div className="style-buttons-group">
            {(["default", "satellite", "terrain"] as const).map((style) => (
              <motion.button
                key={style}
                className={`style-btn-enhanced ${mapStyle === style ? "active" : ""}`}
                onClick={() => setMapStyle(style)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && !isFullscreen && (
          <motion.div
            className="map-info-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="info-content">
              <h4>How to Use</h4>
              <ul>
                <li>Click markers to view destination details</li>
                <li>Use quick access buttons to jump to regions</li>
                <li>Switch between map styles for different views</li>
                <li>Enable fullscreen for immersive exploration</li>
              </ul>
            </div>
            <button className="close-info-btn" onClick={() => setShowInfo(false)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Container */}
      <div className="map-main-container">
        <motion.div
          className="map-container-enhanced"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {mapReady && (
            <MapContainer
              key={mapStyle}
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              className="leaflet-map-enhanced"
              zoomControl={false}
            >
              {mapStyle === "satellite" && (
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={19}
                />
              )}
              {mapStyle === "terrain" && (
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  maxZoom={17}
                />
              )}
              {mapStyle === "default" && (
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  maxZoom={20}
                />
              )}
              <MapController center={mapCenter} zoom={mapZoom} />
              {destinations.map((dest) => {
                const icon = createCustomIcon(dest.type);
                if (!icon) return null;
                
                return (
                  <Marker key={dest.id} position={dest.position} icon={icon}>
                    <Popup className="custom-popup-enhanced">
                      <div className="map-popup-enhanced">
                        <div className="popup-header-enhanced">
                          <div className="popup-icon-enhanced">{getIcon(dest.type)}</div>
                          <div className="popup-type-badge-enhanced">{dest.type}</div>
                        </div>
                        <h3>{dest.name}</h3>
                        <p className="popup-description-enhanced">{dest.description}</p>
                        <div className="popup-highlights-enhanced">
                          {dest.highlights.map((highlight, idx) => (
                            <span key={idx} className="highlight-badge-enhanced">
                              ✨ {highlight}
                            </span>
                          ))}
                        </div>
                        <button
                          className="popup-btn-enhanced"
                          onClick={() => handleDestinationClick(dest)}
                        >
                          <Navigation className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}

          {/* Floating Stats */}
          <motion.div
            className="map-floating-stats"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {([
              { number: destinations.length, label: "Locations", icon: <MapPin className="w-4 h-4" /> },
              { number: "20+", label: "Districts", icon: <Building2 className="w-4 h-4" /> },
              { number: "100+", label: "Attractions", icon: <Mountain className="w-4 h-4" /> },
            ] as const).map((stat, idx) => (
              <motion.div
                key={idx}
                className="floating-stat-card"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="stat-icon-wrapper">{stat.icon}</div>
                <div className="stat-content">
                  <span className="stat-number-enhanced">{stat.number}</span>
                  <span className="stat-label-enhanced">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Legend */}
          <motion.div
            className="map-legend"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4>Legend</h4>
            <div className="legend-items">
              <div className="legend-item">
                <Mountain className="w-4 h-4" style={{ color: "#8B4513" }} />
                <span>Monastery</span>
              </div>
              <div className="legend-item">
                <Landmark className="w-4 h-4" style={{ color: "#DC143C" }} />
                <span>Dzong</span>
              </div>
              <div className="legend-item">
                <Building2 className="w-4 h-4" style={{ color: "#228B22" }} />
                <span>Valley</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Destination Detail Panel */}
        <AnimatePresence>
          {selectedDestination && (
            <motion.div
              className="destination-detail-panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="panel-header">
                <h3>{selectedDestination.name}</h3>
                <button className="close-panel-btn" onClick={closeDestinationPanel}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="panel-content">
                <div className="panel-type">
                  {getIcon(selectedDestination.type)}
                  <span>{selectedDestination.type}</span>
                </div>
                <p>{selectedDestination.description}</p>
                <div className="panel-highlights">
                  <h4>Highlights</h4>
                  {selectedDestination.highlights.map((h, idx) => (
                    <div key={idx} className="highlight-item">
                      ✨ {h}
                    </div>
                  ))}
                </div>
                <button className="panel-action-btn">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Access Region Selector */}
      <motion.div
        className="region-selector-enhanced"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>Quick Access Regions</h3>
        <div className="region-buttons-grid">
          <AnimatePresence mode="wait">
            {Object.keys(regionCoordinates).map((region, idx) => (
              <motion.button
                key={region}
                className={`region-btn ${selectedRegion === region ? "active" : ""}`}
                onClick={() => handleRegionClick(region)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-4 h-4" />
                <span>{region}</span>
              </motion.button>
            ))}
          </AnimatePresence>
          <motion.button
            className="region-btn reset-btn-enhanced"
            onClick={resetMap}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation className="w-4 h-4" />
            <span>Reset View</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
