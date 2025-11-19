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
      <div className="home-featured-grid">
        {destinations.map((dest, i) => (
          <div
            className="home-card-featured"
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: 0,
              minWidth: 220,
              maxWidth: 260,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom: "100%",
              }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                style={{ objectFit: "cover", borderRadius: "1rem" }}
                sizes="(max-width: 600px) 100vw, 260px"
                priority={i === 0}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "1.2rem 1rem 1.1rem 1rem",
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.62) 70%, rgba(0,0,0,0.08) 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  borderRadius: "0 0 1rem 1rem",
                  textShadow: "0 2px 8px rgba(0,0,0,0.32)",
                  textAlign: "left",
                  letterSpacing: "0.01em",
                }}
              >
                {dest.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
