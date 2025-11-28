import Image from "next/image";
import Link from "next/link";

// Example hotel data (replace with real data or props as needed)
const hotels = [
  {
    title: "Six Senses Paro",
    image: "/six senses.png",
  },
  {
    title: "AmankoraGangtey",
    image: "/amankora.png",
  },
  {
    title: "Paro Eco Lodge",
    image: "/paro eco lodge.png",
  },
  {
    title: "BeyondPunakha",
    image: "/andBeyond punakha.png",
  },
  {
    isViewMore: true as const,
  },
];

export default function RecommendedHotels() {
  return (
    <section className="home-hotels">
      <h2 className="home-hotel-title">Recommended Hotels</h2>
      <div className="home-hotel-subtitle">
        Stay in comfort and authenticity — handpicked hotels that blend
        Bhutanese charm with modern hospitality.
      </div>
      <div className="home-hotels-scroll">
        {hotels.map((hotel, i) =>
          (hotel as any).isViewMore ? (
            <Link
              href="/booking/hotel"
              className="home-card-hotel view-more-card"
              key={`view-more-${i}`}
            >
              <div className="view-more-title">View more hotels</div>
              <div className="view-more-desc">
                Find more stays and book your perfect trip.
              </div>
              <button className="hotel-btn">Go to Booking</button>
            </Link>
          ) : (
            <div className="home-card-hotel" key={i}>
              <div className="hotel-card-img">
                <Image
                  src={(hotel as any).image}
                  alt={(hotel as any).title}
                  fill
                  className="hotel-card-image"
                  sizes="(max-width: 600px) 100vw, 340px"
                  priority={i === 0}
                />
              </div>
              <div className="hotel-card-title">{(hotel as any).title}</div>
              <div className="hotel-card-btn-row">
                <button className="hotel-btn">More Details</button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
