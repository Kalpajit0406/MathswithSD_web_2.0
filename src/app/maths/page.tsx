"use client";

import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav/Nav";
import { HeroSection } from "@/components/Sections/HeroSection";
import { AboutSection } from "@/components/Sections/AboutSection";
import { ApproachSection } from "@/components/Sections/ApproachSection";
import { CoursesOverviewSection } from "@/components/Sections/CoursesOverviewSection";
import { ClassroomSection } from "@/components/Sections/ClassroomSection";
import { LocationSection } from "@/components/Sections/LocationSection";
import { ContactSection } from "@/components/Sections/ContactSection";
import { AnimatedSection } from "@/components/ProfileSystem/AnimatedSection";
import { MobileActionBar } from "@/components/UI/MobileActionBar";
import { SkeletonHero, SkeletonSection } from "@/components/UI/Skeleton";

// Heavy 3D Three.js whiteboard hero loaded dynamically with Skeleton fallback
const CinematicHero = dynamic(
  () =>
    import("@/components/CinematicHero/CinematicHero").then(
      (mod) => mod.CinematicHero
    ),
  {
    ssr: false,
    loading: () => <SkeletonHero />,
  }
);

// Interactive modules with 3D/canvas math visualizers loaded dynamically
const InteractiveModulesSection = dynamic(
  () =>
    import("@/components/Sections/InteractiveModulesSection").then(
      (mod) => mod.InteractiveModulesSection
    ),
  {
    ssr: false,
    loading: () => <SkeletonSection rows={3} />,
  }
);

// Enquiry Section loaded dynamically
const EnquirySection = dynamic(
  () =>
    import("@/components/Sections/EnquirySection").then(
      (mod) => mod.EnquirySection
    ),
  {
    ssr: false,
    loading: () => <SkeletonSection rows={1} />,
  }
);

export default function MathsPage() {
  return (
    <main className="relative min-h-screen bg-[#fdfbf7] text-[#1e2022] font-body selection:bg-[#991b1b] selection:text-white pb-16 md:pb-0">
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
      <div id="enquiry">
        <EnquirySection />
      </div>

      {/* 09 — CONTACT, ENQUIRY & FINAL CTA: The journey is complete */}
      <ContactSection />

      {/* 10 — MOBILE QUICK ACTIONS (Call, WhatsApp, Enquire) */}
      <MobileActionBar />
    </main>
  );
}
