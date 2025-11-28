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
      <h2 className="home-experience-title">Experience Bhutanese</h2>
      <div className="home-experience-subtitle">
        Immerse yourself in Bhutan’s rich traditions, local cuisines, and
        vibrant festivals — live the culture, not just visit it.
      </div>
      <div className="home-experience-grid">
        {experiences.map((exp, i) => (
          <div className={`home-exp ${exp.className}`} key={i}>
            <Image
              src={exp.image}
              alt={exp.label}
              fill
              className="home-exp-img"
              sizes="(max-width: 600px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={i === 0}
            />
            <span className="home-exp-label">{exp.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
