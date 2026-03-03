import Link from "next/link";

import { Button } from "@/components/ui/button";

export function BookingHelp() {
  return (
    <section className="home-cta booking-help-cta">
      <h3 className="home-cta-title">Need help?</h3>
      <p className="home-cta-desc booking-help-desc">
        Use the AI guide (bottom-right) for assistance with bookings, group
        requests or special needs.
      </p>
      <Button asChild className="home-cta-btn booking-help-btn">
        <Link href="/dashboard">Go to Plan Trip &amp; Dashboard</Link>
      </Button>
    </section>
  );
}
