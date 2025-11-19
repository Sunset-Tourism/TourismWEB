"use client";
import { StoriesCard } from "./component/stories-card";
import React, { useState } from "react";

const stories = [
  {
    category: "History",
    title: "The Legends of the Divine Madman",
    description:
      "Drukpa Kunley, the 'Divine Madman,' used unconventional methods to teach Buddhism in 15th century Bhutan. His legacy lives on in temples and folklore across the kingdom.",
    image: "/chimelhakhang.png",
  },
  {
    category: "Lifestyle",
    title: "The Art of Weaving in Bhutan",
    description:
      "Traditional Bhutanese weaving is a sacred art passed through generations. Each pattern tells a story, preserving cultural identity through intricate textile designs.",
    image: "/weaving.png",
  },
  {
    category: "Culture",
    title: "Gross National Happiness Philosophy",
    description:
      "Bhutan measures progress through Gross National Happiness rather than GDP, prioritizing spiritual and environmental well-being over material wealth.",
    image: "/gnh.png",
  },
  {
    category: "Traditions",
    title: "Tshechu Festival Celebrations",
    description:
      "Annual Tshechu festivals feature masked dances and religious performances, bringing communities together to celebrate Buddhist teachings and cultural heritage.",
    image: "/tshechu.png",
  },
  {
    category: "History",
    title: "The Architecture of Dzongs",
    description:
      "Bhutan's fortress-monasteries (dzongs) showcase unique architectural brilliance, built without nails and serving as administrative and religious centers for centuries.",
    image: "/dzong.png",
  },
  {
    category: "Lifestyle",
    title: "Living in Harmony with Nature",
    description:
      "Bhutan maintains over 70% forest coverage and is carbon negative, demonstrating how traditional values can guide modern environmental conservation.",
    image: "/nature.png",
  },
];

const categories = [
  "All Stories",
  "History",
  "Culture",
  "Lifestyle",
  "Traditions",
];

export default function StoriesPage() {
  const [selected, setSelected] = useState("All Stories");
  const filteredStories =
    selected === "All Stories"
      ? stories
      : stories.filter((story) => story.category === selected);

  return (
    <section
      className="stories-section"
      style={{ background: "var(--color-bg-secondary)", padding: "2rem 0" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h1
          className="stories-section__title"
          style={{
            fontSize: "var(--fs-h1)",
            color: "var(--color-primary)",
            textAlign: "center",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Stories from the Kingdom
        </h1>
        <p
          className="stories-section__subtitle"
          style={{
            textAlign: "center",
            color: "var(--color-fg)",
            marginBottom: "2rem",
          }}
        >
          Discover Bhutan&apos;s rich traditions, history, and lifestyle
        </p>
        <div
          className="stories-section__filters"
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`stories-section__filter-btn${
                selected === cat ? " stories-section__filter-btn--active" : ""
              }`}
              style={{
                background: selected === cat ? "var(--color-accent)" : "#fff",
                color: selected === cat ? "#fff" : "var(--color-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "var(--fs-nav)",
                boxShadow:
                  selected === cat ? "0 2px 8px rgba(82,171,152,0.08)" : "none",
                transition: "all 0.2s",
              }}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div
          className="stories-section__grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredStories.map((story, idx) => (
            <StoriesCard key={idx} {...story} />
          ))}
        </div>
      </div>
    </section>
  );
}
