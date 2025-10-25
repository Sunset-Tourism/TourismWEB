import HomeCard from "./HomeCard";

const themes = [
  {
    title: "Culture",
    description: "Immerse yourself in ancient traditions and monasteries.",
    className: "home-theme-card",
  },
  {
    title: "Wellness",
    description: "Find peace and rejuvenate your spirit in the Himalayas.",
    className: "home-theme-card",
  },
  {
    title: "Adventure",
    description: "Trek through pristine wilderness and mountain trails.",
    className: "home-theme-card",
  },
];

export default function ThemedInfoCards() {
  return (
    <div className="home-themed-info">
      <div className="home-themed-info-grid">
        {themes.map((theme, idx) => (
          <HomeCard key={idx} title={theme.title} className={theme.className}>
            <p>{theme.description}</p>
            <a href="#" className="home-theme-link">
              Explore &rarr;
            </a>
          </HomeCard>
        ))}
      </div>
    </div>
  );
}
