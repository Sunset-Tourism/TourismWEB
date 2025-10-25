import DestinationCard from "./DestinationCard";
import { Landmark, Castle, Mountain } from "lucide-react";

const destinations = [
  {
    icon: <Landmark className="text-blue-600" size={32} />,
    title: "Paro Valley",
    description:
      "Known for the iconic Tiger’s Nest Monastery and serene valleys.",
  },
  {
    icon: <Mountain className="text-green-600" size={32} />,
    title: "Thimphu City",
    description:
      "Experience Bhutan’s modern capital blended with cultural heritage.",
  },
  {
    icon: <Castle className="text-purple-600" size={32} />,
    title: "Punakha Dzong",
    description:
      "Visit the stunning fortress at the confluence of Pho and Mo Chhu rivers.",
  },
];

export default function PopularDestinations() {
  return (
    <section className="card-section py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Popular Destinations
      </h2>
      <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((dest, idx) => (
          <DestinationCard key={idx} {...dest} />
        ))}
      </div>
    </section>
  );
}
