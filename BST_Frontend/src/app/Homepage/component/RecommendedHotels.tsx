import Image from "next/image";

// Example hotel data (replace with real data or props as needed)
const hotels = [
  {
    title: "Six Senses Paro",
    image: "/six senses.png",
  },
  {
    title: "Amankora Gangtey",
    image: "/amankora.png",
  },
  {
    title: "Paro Eco Lodge",
    image: "/paro eco lodge.png",
  },
  {
    title: "&Beyond Punakha River Lodge",
    image: "/andBeyond punakha.png",
  },
];

export default function RecommendedHotels() {
  return (
    <section className="home-hotels">
      <h2 className="home-section-title">Recommended Hotels</h2>
      <div className="home-hotels-grid">
        {hotels.map((hotel, i) => (
          <div
            className="home-card-hotel"
            key={i}
            style={{
              background: "#fff",
              borderRadius: "1.25rem",
              boxShadow: "0 2px 12px rgba(43,103,119,0.09)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 0,
              minHeight: 480,
              maxWidth: 340,
              width: "100%",
            }}
          >
            <div style={{ width: "100%", height: 220, position: "relative" }}>
              <Image
                src={hotel.image}
                alt={hotel.title}
                fill
                style={{
                  objectFit: "cover",
                  borderTopLeftRadius: "1.25rem",
                  borderTopRightRadius: "1.25rem",
                }}
                sizes="(max-width: 600px) 100vw, 340px"
                priority={i === 0}
              />
            </div>
            <div
              style={{
                padding: "1.5rem 1rem 0.5rem 1rem",
                width: "100%",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#444",
                fontFamily: "inherit",
                minHeight: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {hotel.title}
            </div>
            <div
              style={{
                padding: "1rem 0 1.5rem 0",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="hotel-btn">More Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
