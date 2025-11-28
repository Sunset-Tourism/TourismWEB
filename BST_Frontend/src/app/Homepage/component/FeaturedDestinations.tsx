import Image from "next/image";

const destinations = [
  {
    name: "Thimphu",
    image: "/thimphu.png",
  },
  {
    name: "Paro",
    image: "/paro.png",
  },
  {
    name: "Bumthang",
    image: "/bumthang.png",
  },
  {
    name: "Punakha",
    image: "/punakha2.png",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="home-featured">
      <h2 className="home-section-title">Featured Destinations</h2>
      <div className="home-section-subtitle">
        Explore Bhutan’s most breathtaking valleys, ancient monasteries, and
        hidden gems curated just for you.
      </div>
      <div className="home-featured-grid">
        {destinations.map((dest, i) => (
          <div className="home-card-featured" key={i}>
            <div className="home-card-featured-media">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="home-card-featured-image"
                sizes="(max-width: 600px) 100vw, (max-width: 768px) 50vw, 240px"
                priority={i === 0}
              />
              <div className="home-card-featured-label">{dest.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
