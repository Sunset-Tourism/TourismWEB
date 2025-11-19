import HomeHero from "./component/HomeHero";
import FeaturedDestinations from "./component/FeaturedDestinations";
import ExperienceGrid from "./component/ExperienceGrid";
import RecommendedHotels from "./component/RecommendedHotels";
import ThemedInfoSection from "./component/ThemedInfoSection";
import HomeCta from "./component/HomeCta";

export default function Home() {
  return (
    <main className="homepage">
      <HomeHero />
      <FeaturedDestinations />
      <ExperienceGrid />
      <RecommendedHotels />
      <ThemedInfoSection />
      <HomeCta />
    </main>
  );
}
