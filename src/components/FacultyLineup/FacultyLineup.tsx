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

      {/* Main Faculty Poster Stage */}
      <div className="relative pt-8 sm:pt-12 pb-64 sm:pb-72 md:pb-80">
        
        {/* Ambient Stage Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-radial from-amber-100/40 via-slate-100/20 to-transparent blur-3xl pointer-events-none" />

        {/* 
          Horizontally scrollable container on very small screens, 
          and unified overlapping team lineup on sm+ viewports
        */}
        <div className="w-full overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          <div className="flex items-end justify-start sm:justify-center -space-x-6 sm:-space-x-8 md:-space-x-12 lg:-space-x-14 min-w-max sm:min-w-0 px-8 sm:px-0">
            {FACULTY_MEMBERS.map((faculty) => {
              const isHovered = hoveredId === faculty.id;
              const isActive = activeId === faculty.id;
              const isHighlighted = isHovered || isActive;
              const isDimmed = currentHighlightId !== null && !isHighlighted;

              return (
                <div
                  key={faculty.id}
                  data-faculty-item
                  className="relative snap-center shrink-0 w-[170px] sm:w-[190px] md:w-[210px] lg:w-[225px]"
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
                    onMouseEnter={() => {
                      if (!isTouchDevice) setHoveredId(faculty.id);
                    }}
                    onMouseLeave={() => {
                      if (!isTouchDevice) setHoveredId(null);
                    }}
                    onClick={() => handleFigureClick(faculty)}
                  />

                  {/* Floating Info Block (shown in lower part) */}
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
        <div className="w-4/5 max-w-4xl mx-auto h-3 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full blur-xs opacity-60 mt-2 pointer-events-none" />

      </div>

      {/* Mobile Swipe / Tap Hint Indicators */}
      <div className="sm:hidden flex items-center justify-center gap-1.5 mt-2">
        {FACULTY_MEMBERS.map((faculty) => (
          <button
            key={faculty.id}
            type="button"
            aria-label={`Select ${faculty.name}`}
            onClick={() => setActiveId(faculty.id)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeId === faculty.id
                ? "w-6 bg-amber-500"
                : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
