import { CalendarCheck2, CarFront, Hotel } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function BookingObjectives() {
  const objectives = [
    {
      id: "01",
      title: "Flexible Hotel Selection",
      description: "Browse hotels with photos, ratings and price tiers.",
      icon: Hotel,
    },
    {
      id: "02",
      title: "Transport Booking",
      description: "Book taxis, private transfers or shared rides.",
      icon: CarFront,
    },
    {
      id: "03",
      title: "Integrated Itineraries",
      description: "Add bookings to your trip dashboard.",
      icon: CalendarCheck2,
    },
  ];

  return (
    <section className="booking-objectives">
      <p className="booking-objectives-kicker">Booking goals</p>
      <h2 className="home-section-title">Our Booking Objectives</h2>
      <p className="booking-objectives-subtitle">
        Everything you need to coordinate stays and movement in one place.
      </p>
      <div className="booking-objectives-list">
        {objectives.map((item) => (
          <Card key={item.title} className="booking-objective-card">
            <CardContent className="booking-objective-card-content">
              <span className="booking-objective-index">{item.id}</span>
              <span className="booking-objective-icon-wrap" aria-hidden="true">
                <item.icon className="booking-objective-icon" />
              </span>
              <h3 className="booking-objective-title">{item.title}</h3>
              <p className="booking-objective-description">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
