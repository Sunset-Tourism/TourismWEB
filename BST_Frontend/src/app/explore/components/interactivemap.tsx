"use client";

import React, { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "./leaflet-setup.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export interface MapMarker {
  id: string;
  title: string;
  position: [number, number];
  description?: string;
}

interface InteractiveMapProps {
  markers: MapMarker[];
}

export function InteractiveMap({ markers }: InteractiveMapProps) {
  const fallbackCenter: [number, number] = [27.5142, 90.4336];
  const center = useMemo(
    () => (markers.length > 0 ? markers[0].position : fallbackCenter),
    [markers],
  );

  useEffect(() => {
    import("leaflet").then((L) => {
      const iconProto = L.Icon.Default.prototype as {
        _getIconUrl?: () => void;
      };
      delete iconProto._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });
  }, []);

  return (
    <div className="h-full min-h-[320px] rounded-2xl border border-slate-200 bg-white shadow-sm">
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom
        className="h-full w-full rounded-2xl"
        style={{ minHeight: "320px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <strong>{marker.title}</strong>
              {marker.description && (
                <p className="mt-1 text-sm text-slate-600">
                  {marker.description}
                </p>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
