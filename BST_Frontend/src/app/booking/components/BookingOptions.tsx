import Link from "next/link";
import { ArrowRight, Building2, Car } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bookingOptions = [
  {
    title: "Book Hotels",
    description:
      "Search hotels, compare prices, view photos and reserve your stay.",
    href: "/booking/hotel",
    icon: Building2,
    cta: "Explore Hotels",
  },
  {
    title: "Book Transport",
    description:
      "Book private transfers, taxis, or group vans for your routes.",
    href: "/booking/transport",
    icon: Car,
    cta: "Explore Transport",
  },
];

export function BookingOptions() {
  return (
    <section className="booking-options-grid">
      {bookingOptions.map((option) => (
        <Link href={option.href} key={option.title} className="booking-option-link">
          <Card className="booking-option-card">
            <CardHeader className="pb-2 text-center booking-option-header">
              <div className="booking-option-icon-wrap">
                <option.icon className="booking-option-icon" aria-hidden="true" />
              </div>
              <CardTitle className="booking-option-title">{option.title}</CardTitle>
            </CardHeader>
            <CardContent className="booking-option-description">
              <p>{option.description}</p>
              <span className="booking-option-btn">
                {option.cta}
                <ArrowRight className="booking-option-btn-icon" aria-hidden="true" />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
