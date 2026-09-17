import { Nav } from "@/components/Nav/Nav";
import { CinematicHero } from "@/components/CinematicHero/CinematicHero";
import { HeroSection } from "@/components/Sections/HeroSection";
import { AboutSection } from "@/components/Sections/AboutSection";
import { ApproachSection } from "@/components/Sections/ApproachSection";
import { CoursesOverviewSection } from "@/components/Sections/CoursesOverviewSection";
import { InteractiveModulesSection } from "@/components/Sections/InteractiveModulesSection";
import { ClassroomSection } from "@/components/Sections/ClassroomSection";
import { LocationSection } from "@/components/Sections/LocationSection";
import { ContactSection } from "@/components/Sections/ContactSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#f8f6f0] text-slate-950 font-body selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Nav />

      {/* 3D WHITEBOARD CINEMATIC INTRO (Red T-Shirt Soumen & Integration Scroll Zoom) */}
      <CinematicHero />

      {/* 01 — HERO OVERVIEW: Who is the teacher? */}
      <HeroSection />

      {/* 02 — ABOUT: What does he teach? */}
      <AboutSection />

      {/* 03 — APPROACH: How does he teach? */}
      <ApproachSection />

      {/* 04 — COURSES: What can students learn? */}
      <CoursesOverviewSection />

      {/* 05 — DEEP DIVE INTERACTIVE MODULES & OPEN-LIFT */}
      <InteractiveModulesSection />

      {/* 06 — CLASSROOM & INSTITUTE: Where does the learning happen? */}
      <ClassroomSection />

      {/* 07 — LOCATION: Where is it? */}
      <LocationSection />

      {/* 08 — CONTACT, ENQUIRY & FINAL CTA: The journey is complete */}
      <ContactSection />
    </main>
  );
}
