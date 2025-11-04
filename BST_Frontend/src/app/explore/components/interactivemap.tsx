"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Mountain,
  Building2,
  Landmark,
  Navigation,
} from "lucide-react";
import "../../../styles/globals.css";
import L from "leaflet";

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

// Custom marker icons for different types
const createCustomIcon = (type: string) => {
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
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
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

  // Fix Leaflet marker icon issue - MOVED INSIDE COMPONENT
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as Record<string, any>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    }
    setMapReady(true);
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

  return (
    <section className="map-section">
      <div className="map-header">
        <h2>Explore Bhutan</h2>
        <p className="map-subtitle">
          Click on markers to discover destinations across the kingdom
        </p>

        {/* Map Style Switcher */}
        <div className="map-style-switcher">
          <button
            className={`style-btn ${mapStyle === "default" ? "active" : ""}`}
            onClick={() => setMapStyle("default")}
          >
            Map
          </button>
          <button
            className={`style-btn ${mapStyle === "satellite" ? "active" : ""}`}
            onClick={() => setMapStyle("satellite")}
          >
            Satellite
          </button>
          <button
            className={`style-btn ${mapStyle === "terrain" ? "active" : ""}`}
            onClick={() => setMapStyle("terrain")}
          >
            Terrain
          </button>
        </div>
      </div>

      <div className="map-container-wrapper">
        {mapReady && (
          <MapContainer
            key={mapStyle}
            center={mapCenter}
            zoom={mapZoom}
            scrollWheelZoom={true}
            className="leaflet-map"
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
            {destinations.map((dest) => (
              <Marker
                key={dest.id}
                position={dest.position}
                icon={createCustomIcon(dest.type)}
              >
                <Popup className="custom-popup">
                  <div className="map-popup">
                    <div className="popup-icon">{getIcon(dest.type)}</div>
                    <h3>{dest.name}</h3>
                    <p className="popup-description">{dest.description}</p>
                    <div className="popup-highlights">
                      {dest.highlights.map((highlight, idx) => (
                        <span key={idx} className="highlight-badge">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <button className="popup-btn">
                      <Navigation className="w-4 h-4" />
                      Learn More
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        <div className="map-overlay-stats">
          <div className="stat-item">
            <span className="stat-number">{destinations.length}</span>
            <span className="stat-label">Destinations</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">Districts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Attractions</span>
          </div>
        </div>
      </div>

      <div className="region-selector">
        <h3>Quick Access Regions</h3>
        <div className="map-buttons">
          {Object.keys(regionCoordinates).map((region) => (
            <button
              key={region}
              className={`map-btn ${selectedRegion === region ? "active" : ""}`}
              onClick={() => handleRegionClick(region)}
            >
              <MapPin className="w-4 h-4" />
              {region}
            </button>
          ))}
          <button className="map-btn reset-btn" onClick={resetMap}>
            <Navigation className="w-4 h-4" />
            Reset View
          </button>
        </div>
      </div>
    </section>
  );
}
