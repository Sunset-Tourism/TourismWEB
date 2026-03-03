import { BookingHelp } from "./components/BookingHelp";
import { BookingHero } from "./components/BookingHero";
import { BookingObjectives } from "./components/BookingObjectives";
import { BookingOptions } from "./components/BookingOptions";

export default function BookingPage() {
  return (
    <main className="homepage booking-page">
      <BookingHero />
      <BookingObjectives />
      <BookingOptions />
      <BookingHelp />
    </main>
  );
}
