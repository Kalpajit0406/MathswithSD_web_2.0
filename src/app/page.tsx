import { ScholarsHeader } from "@/components/ScholarsHub/ScholarsHeader";
import { ScholarsHero } from "@/components/ScholarsHub/ScholarsHero";
import { ScholarsAbout } from "@/components/ScholarsHub/ScholarsAbout";
import { ScholarsDepartments } from "@/components/ScholarsHub/ScholarsDepartments";
import { ScholarsFooter } from "@/components/ScholarsHub/ScholarsFooter";
import { CinematicScrollIntro } from "@/components/ProfileSystem/CinematicScrollIntro";
import { CinematicTriggerIntro } from "@/components/ProfileSystem/CinematicTriggerIntro";

export default function ScholarsHubMainPage() {
  return (
    <main className="relative min-h-screen bg-[#fafaf9] text-slate-900 font-body selection:bg-amber-400 selection:text-slate-950">
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
    </main>
  );
}
