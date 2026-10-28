"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FACULTY_MEMBERS, SubjectFaculty } from "./facultyData";
import { TeacherFigure } from "./TeacherFigure";
import { FacultyInfoBlock } from "./FacultyInfoBlock";

export function FacultyLineup() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect whether device relies on touch rather than hover
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches ||
          !window.matchMedia("(hover: hover)").matches
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Close active tooltip when clicking outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-faculty-item]")) {
        setActiveId(null);
      }
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleFigureClick = (faculty: SubjectFaculty) => {
    if (isTouchDevice) {
      // On mobile / touch, first tap reveals the info card. Second tap navigates.
      if (activeId === faculty.id) {
        router.push(faculty.route);
      } else {
        setActiveId(faculty.id);
      }
    } else {
      // On desktop, clicking navigates directly
      router.push(faculty.route);
    }
  };

  const currentHighlightId = hoveredId || activeId;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-6">
      
      {/* Visual Instruction Badge for Desktop / Mobile */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 text-[11px] font-display font-semibold text-slate-600 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          <span className="hidden sm:inline">
            Hover over any faculty silhouette to view syllabus highlights &amp; specialty, or click to enter
          </span>
          <span className="sm:hidden">
            Tap a faculty silhouette to preview curriculum &amp; enter department
          </span>
        </span>
      </div>

      {/* Main Faculty Poster Stage (Desktop) */}
      <div className="hidden md:block relative pt-8 sm:pt-12 pb-64 sm:pb-72 md:pb-80">
        
        {/* Ambient Stage Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-radial from-amber-100/40 via-slate-100/20 to-transparent blur-3xl pointer-events-none" />

        <div className="w-full">
          <div className="flex items-end justify-center -space-x-8 md:-space-x-12 lg:-space-x-14">
            {FACULTY_MEMBERS.map((faculty) => {
              const isHovered = hoveredId === faculty.id;
              const isActive = activeId === faculty.id;
              const isHighlighted = isHovered || isActive;
              const isDimmed = currentHighlightId !== null && !isHighlighted;

              return (
                <div
                  key={faculty.id}
                  data-faculty-item
                  className="relative shrink-0 w-[190px] md:w-[210px] lg:w-[225px]"
                  style={{
                    zIndex: isHighlighted ? 50 : faculty.silhouette.zIndex,
                  }}
                >
                  {/* Silhouette Figure */}
                  <TeacherFigure
                    faculty={faculty}
                    isHovered={isHovered}
                    isActive={isActive}
                    isDimmed={isDimmed}
                    onMouseEnter={() => setHoveredId(faculty.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleFigureClick(faculty)}
                  />

                  {/* Floating Info Block */}
                  <FacultyInfoBlock
                    faculty={faculty}
                    isVisible={isHighlighted}
                    onNavigate={() => router.push(faculty.route)}
                    onClose={() => setActiveId(null)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Podium Base Shadow Bar */}
        <div className="w-4/5 max-w-4xl mx-auto h-3 bg-gradient-to-r from-transparent via-[#dfd6c5] to-transparent rounded-full blur-xs opacity-60 mt-2 pointer-events-none" />
      </div>

      {/* Mobile-Native Stacked Department Cards (Clean, 1-tap touch navigation) */}
      <div className="md:hidden space-y-4 pt-4">
        {FACULTY_MEMBERS.map((faculty) => {
          const isLive = faculty.id === "maths";
          return (
            <div
              key={faculty.id}
              className={`p-5 rounded-2xl border transition-all ${
                isLive
                  ? "bg-white border-[#991b1b]/30 shadow-md ring-1 ring-[#991b1b]/20"
                  : "bg-white/80 border-[#ede7dc] shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#f7f3ec] border border-[#ede7dc] flex items-center justify-center font-display text-2xl">
                    {faculty.subjectIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base text-[#1e2022]">
                        {faculty.subject}
                      </h3>
                      {isLive ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Live Batches
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[#555b67] text-[10px] font-medium">
                          Admissions Open
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#555b67] font-body mt-0.5">
                      Faculty: <strong className="text-[#1e2022]">{faculty.name}</strong> • {faculty.qualification}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#555b67] font-body mt-3 leading-relaxed">
                {faculty.bio}
              </p>

              <div className="mt-4 pt-3 border-t border-[#ede7dc] flex items-center justify-between gap-2">
                <div className="text-[11px] font-semibold text-[#991b1b]">
                  {faculty.specialty}
                </div>
                <button
                  type="button"
                  onClick={() => router.push(faculty.route)}
                  className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 min-h-[44px] ${
                    isLive
                      ? "bg-[#991b1b] text-white hover:bg-[#be123c] shadow-xs"
                      : "bg-[#f7f3ec] text-[#1e2022] border border-[#ede7dc] hover:bg-[#ede7dc]"
                  }`}
                >
                  <span>{isLive ? "Enter Department" : "View Syllabus & Waitlist"}</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
