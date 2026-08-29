import { Nav } from "@/components/Nav/Nav";
import { CinematicHero } from "@/components/CinematicHero/CinematicHero";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <CinematicHero />
    </main>
  );
}
