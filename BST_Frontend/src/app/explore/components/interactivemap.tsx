import React from "react";
import "../../../styles/globals.css";

export function InteractiveMap() {
  return (
    <section className="map-section">
      <h2>Explore Bhutan</h2>
      <div className="interactive-map">
        <div className="map-overlay">
          <h3>Bhutan Tourism Zones</h3>
          <p>
            Discover major destinations like Thimphu, Paro, Punakha, and
            Bumthang. Click below to explore regions.
          </p>
          <div className="map-buttons">
            <button className="map-btn">Thimphu</button>
            <button className="map-btn">Paro</button>
            <button className="map-btn">Punakha</button>
            <button className="map-btn">Bumthang</button>
          </div>
        </div>
      </div>
    </section>
  );
}
