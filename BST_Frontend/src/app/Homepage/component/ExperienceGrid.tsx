import HomeCard from "./HomeCard";
import Image from "next/image";

const experiences = [
  {
    image: "/festival.png",
    label: "Festivals",
    className: "festivals",
  },
  {
    image: "/food.png",
    label: "Food",
    className: "food",
  },
  {
    image: "/animal.png",
    label: "Wildlife",
    className: "animal",
  },
  {
    image: "/auspicious place.png",
    label: "Auspicious Sites",
    className: "auspicious",
  },
  {
    image: "/adventure.png",
    label: "Adventure",
    className: "adventure",
  },
  {
    image: "/thimphu.png",
    label: "Dzongs",
    className: "dzongs",
  },
];

export default function ExperienceGrid() {
  return (
    <section className="home-experience">
      <h2 className="home-section-title">Experience Bhutanese</h2>
      <div className="home-experience-grid">
        {experiences.map((exp, i) => (
          <div
            className={`home-exp ${exp.className}`}
            key={i}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <Image
              src={exp.image}
              alt={exp.label}
              fill
              className="home-exp-img"
              sizes="(max-width: 600px) 100vw, 220px"
              priority={i === 0}
            />
            <span className="home-exp-label">{exp.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
