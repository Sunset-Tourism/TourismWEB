import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-section py-16 text-center bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <Mountain size={48} className="text-blue-600 mb-2" />
        <h1 className="text-4xl font-bold mb-2">
          Discover Bhutan’s Hidden Beauty
        </h1>
        <p className="text-lg text-gray-600 mb-4 max-w-xl">
          Explore breathtaking landscapes, rich culture, and unforgettable
          experiences.
        </p>
        <Button className="accent-btn">Plan Your Trip</Button>
      </div>
    </section>
  );
}
