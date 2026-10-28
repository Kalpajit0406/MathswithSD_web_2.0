"use client";

import dynamic from "next/dynamic";
import { ScholarsHeader } from "@/components/ScholarsHub/ScholarsHeader";
import { ScholarsHero } from "@/components/ScholarsHub/ScholarsHero";
import { ScholarsAbout } from "@/components/ScholarsHub/ScholarsAbout";
import { ScholarsDepartments } from "@/components/ScholarsHub/ScholarsDepartments";
import { ScholarsFooter } from "@/components/ScholarsHub/ScholarsFooter";
import { MobileActionBar } from "@/components/UI/MobileActionBar";
import { SkeletonVideoIntro } from "@/components/UI/Skeleton";

// Dynamic lazy loaded cinematic scroll/trigger intro components with skeleton fallback for high efficiency
const CinematicScrollIntro = dynamic(
  () =>
    import("@/components/ProfileSystem/CinematicScrollIntro").then(
      (mod) => mod.CinematicScrollIntro
    ),
  {
    ssr: false,
    loading: () => <SkeletonVideoIntro />,
  }
);

const CinematicTriggerIntro = dynamic(
  () =>
    import("@/components/ProfileSystem/CinematicTriggerIntro").then(
      (mod) => mod.CinematicTriggerIntro
    ),
  {
    ssr: false,
  }
);

export default function ScholarsHubMainPage() {
  return (
    <main className="relative min-h-screen bg-[#fdfbf7] text-[#1e2022] font-body selection:bg-[#991b1b] selection:text-white pb-16 md:pb-0">
      {/* 00 — PROFILE 2 SCROLL-CONTROLLED INTRO & PROFILE 3 TRIGGERED PLAYBACK INTRO */}
      <CinematicScrollIntro />
      <CinematicTriggerIntro />

      {/* 01 — INSTITUTION HEADER */}
      <ScholarsHeader />

      {/* 02 — HERO SECTION (SCHOLARS HUB) */}
      <ScholarsHero />

      {/* 03 — INSTITUTION ABOUT & VISION */}
      <ScholarsAbout />

      {/* 04 — SUBJECT SELECTION GRID (Mathematics, Physics, Chemistry, Biology, CS) */}
      <ScholarsDepartments />

      {/* 05 — INSTITUTION FOOTER */}
      <ScholarsFooter />

      {/* 06 — MOBILE QUICK ACTION BAR (Call, WhatsApp, Enquire) */}
      <MobileActionBar />
    </main>
  );
}

