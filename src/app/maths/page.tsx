import { Nav } from "@/components/Nav/Nav";
import { CinematicHero } from "@/components/CinematicHero/CinematicHero";
import { HeroSection } from "@/components/Sections/HeroSection";
import { AboutSection } from "@/components/Sections/AboutSection";
import { ApproachSection } from "@/components/Sections/ApproachSection";
import { CoursesOverviewSection } from "@/components/Sections/CoursesOverviewSection";
import { InteractiveModulesSection } from "@/components/Sections/InteractiveModulesSection";
import { ClassroomSection } from "@/components/Sections/ClassroomSection";
import { LocationSection } from "@/components/Sections/LocationSection";
import { EnquirySection } from "@/components/Sections/EnquirySection";
import { ContactSection } from "@/components/Sections/ContactSection";
import { AnimatedSection } from "@/components/ProfileSystem/AnimatedSection";

export default function MathsPage() {
  return (
    <main className="relative min-h-screen bg-[#f8f6f0] text-slate-950 font-body selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Nav />

      {/* 3D WHITEBOARD CINEMATIC INTRO (Red T-Shirt Soumen & Integration Scroll Zoom) */}
      <AnimatedSection presetType="hero">
        <CinematicHero />
      </AnimatedSection>

      {/* 01 — HERO OVERVIEW: Who is the teacher? */}
      <AnimatedSection presetType="entrance">
        <HeroSection />
      </AnimatedSection>

      {/* 02 — ABOUT: What does he teach? */}
      <AnimatedSection presetType="scroll">
        <AboutSection />
      </AnimatedSection>

      {/* 03 — APPROACH: How does he teach? */}
      <AnimatedSection presetType="scroll">
        <ApproachSection />
      </AnimatedSection>

      {/* 04 — COURSES: What can students learn? */}
      <AnimatedSection presetType="cardHover">
        <CoursesOverviewSection />
      </AnimatedSection>

      {/* 05 — DEEP DIVE INTERACTIVE MODULES & OPEN-LIFT */}
      <InteractiveModulesSection />

      {/* 06 — CLASSROOM & INSTITUTE: Where does the learning happen? */}
      <ClassroomSection />

      {/* 07 — LOCATION: Where is it? */}
      <LocationSection />

      {/* 08 — ENQUIRY & ADMISSION: Direct registration form */}
      <EnquirySection />

      {/* 09 — CONTACT, ENQUIRY & FINAL CTA: The journey is complete */}
      <ContactSection />
    </main>
  );
}
