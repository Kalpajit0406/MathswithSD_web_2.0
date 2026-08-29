import { Nav } from "@/components/Nav/Nav";
import { CinematicHero } from "@/components/CinematicHero/CinematicHero";
import { FeaturesSection } from "@/components/Features/FeaturesSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <CinematicHero />
      <FeaturesSection />
    </main>
  );
}
