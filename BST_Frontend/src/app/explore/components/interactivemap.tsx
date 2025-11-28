"use client";

import React, { useState, useEffect, useRef } from "react";
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
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

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

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

export function InteractiveMap() {
  // Simplified state
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [mapStyle, setMapStyle] = useState<"default" | "satellite" | "terrain">(
    "default"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  // Single source of truth for center/zoom
    const [center, setCenter] = useState<[number, number]>([27.5142, 90.4336]);
    const [zoom, setZoom] = useState<number>(8);
  
    const mapRef = useRef<LeafletMap | null>(null);
  
    // Apply center/zoom to map
  // Apply center/zoom to map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom, { animate: true });
    }
  }, [center, zoom]);

  // Fix default marker icons (prevent 404 /marker-icon-2x.png and shadow)
  useEffect(() => {
    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });
  }, []);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    const cfg = regionCoordinates[region];
    if (cfg) {
      setCenter(cfg.center);
      setZoom(cfg.zoom);
      setSelectedDestination(null);
    }
  };

  const resetMap = () => {
    setSelectedRegion(null);
    setSelectedDestination(null);
    setCenter([27.5142, 90.4336]);
    setZoom(8);
  };

  const handleDestinationClick = (d: Destination) => {
    setSelectedDestination(d);
    setCenter(d.position);
    setZoom(13);
  };

  const toggleFullscreen = () => setIsFullscreen((v) => !v);

  const getIcon = (type: string) => {
    switch (type) {
      case "monastery":
        return <Mountain className="w-4 h-4" />;
      case "dzong":
        return <Landmark className="w-4 h-4" />;
      case "valley":
        return <Building2 className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const tileLayerConfig = {
    default: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
      maxZoom: 19,
    },
    terrain: {
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 17,
    },
  }[mapStyle];

  return (
    <section
      className={`map-section-enhanced ${isFullscreen ? "fullscreen" : ""}`}
    >
      {/* Header */}
      <motion.div
        className="map-header-enhanced"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="map-title-section">
          <div className="map-title-wrapper">
            <Compass className="map-title-icon" />
            <div>
              <h2>Interactive Map of Bhutan</h2>
              <p className="map-subtitle">
                Explore destinations, switch styles, jump to regions
              </p>
            </div>
          </div>
          <div className="map-controls-group">
            <motion.button
              className="map-control-btn"
              onClick={() => setShowInfo((v) => !v)}
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

        {/* Style Switcher */}
        <motion.div
          className="map-style-switcher-enhanced"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Layers className="switcher-icon" />
          <div className="style-buttons-group">
            {(["default", "satellite", "terrain"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setMapStyle(s)}
                className={`style-btn-enhanced ${
                  mapStyle === s ? "active" : ""
                }`}
              >
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && !isFullscreen && (
          <motion.div
            className="map-info-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="info-content">
              <h4>Quick Tips</h4>
              <ul>
                <li>Use region buttons below to jump</li>
                <li>Switch map style for clarity</li>
                <li>Click marker for details</li>
                <li>Open panel for more highlights</li>
              </ul>
            </div>
            <button
              className="close-info-btn"
              onClick={() => setShowInfo(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map */}
      <div className="map-main-container">
        <motion.div
          className="map-container-enhanced"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom
            className="leaflet-map-enhanced"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution={tileLayerConfig.attribution}
              url={tileLayerConfig.url}
              maxZoom={tileLayerConfig.maxZoom}
            />
            {destinations.map((d) => (
              <Marker key={d.id} position={d.position}>
                <Popup>
                  <strong>{d.name}</strong>
                  <br />
                  {d.description}
                  <br />
                  <button
                    style={{
                      marginTop: "6px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "none",
                      background: "var(--color-primary)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    View
                  </button>
                </Popup>
              </Marker>
            ))}
            {/* Legend */}
            <div className="map-legend">
              <h4>Legend</h4>
              <div className="legend-items">
                <div className="legend-item">
                  <Mountain
                    style={{ color: "#8B4513", width: 14, height: 14 }}
                  />
                  <span>Monastery</span>
                </div>
                <div className="legend-item">
                  <Landmark
                    style={{ color: "#DC143C", width: 14, height: 14 }}
                  />
                  <span>Dzong</span>
                </div>
                <div className="legend-item">
                  <Building2
                    style={{ color: "#228B22", width: 14, height: 14 }}
                  />
                  <span>Valley</span>
                </div>
              </div>
            </div>
          </MapContainer>
        </motion.div>

        {/* Destination Detail Panel */}
        <AnimatePresence>
          {selectedDestination && (
            <motion.div
              className="destination-detail-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="panel-header">
                <h3>{selectedDestination.name}</h3>
                <button
                  className="close-panel-btn"
                  onClick={() => setSelectedDestination(null)}
                >
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
                  {selectedDestination.highlights.map((h, i) => (
                    <div key={i} className="highlight-item">
                      ✨ {h}
                    </div>
                  ))}
                </div>
                <button
                  className="panel-action-btn"
                  onClick={() => alert("Directions feature TBD")}
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Region Selector */}
      <motion.div
        className="region-selector-enhanced"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>Quick Access Regions</h3>
        <div className="region-buttons-grid">
          {Object.keys(regionCoordinates).map((r) => (
            <button
              key={r}
              className={`region-btn ${selectedRegion === r ? "active" : ""}`}
              onClick={() => handleRegionClick(r)}
            >
              <MapPin className="w-4 h-4" />
              <span>{r}</span>
            </button>
          ))}
          <button className="region-btn reset-btn-enhanced" onClick={resetMap}>
            <Navigation className="w-4 h-4" />
            <span>Reset View</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
