"use client";

import React from "react";
import { SubjectFaculty } from "./facultyData";

interface TeacherFigureProps {
  faculty: SubjectFaculty;
  isHovered: boolean;
  isActive: boolean;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function TeacherFigure({
  faculty,
  isHovered,
  isActive,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: TeacherFigureProps) {
  const isHighlighted = isHovered || isActive;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${faculty.name} Department Faculty - ${faculty.isLive ? "Live Platform" : "Upcoming"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        zIndex: isHighlighted ? 40 : faculty.silhouette.zIndex,
      }}
      className={`group relative flex flex-col items-center cursor-pointer select-none outline-none focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-3xl transition-all duration-300 ease-out ${
        faculty.silhouette.heightClass
      } ${
        isHighlighted
          ? "scale-[1.06] -translate-y-2"
          : isDimmed
          ? "opacity-50 grayscale-[35%] scale-[0.97]"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient Pastel Glow behind hovered figure */}
      <div
        className="absolute inset-0 rounded-[2.5rem] blur-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundColor: faculty.palette.glowColor,
          opacity: isHighlighted ? 0.8 : 0,
        }}
      />

      {/* Figure SVG Wrapper */}
      <div
        className="relative w-full h-full flex items-end justify-center drop-shadow-md transition-all duration-300"
        style={{
          filter: isHighlighted
            ? `drop-shadow(0 15px 25px ${faculty.palette.glowColor})`
            : "drop-shadow(0 8px 16px rgba(15, 23, 42, 0.08))",
        }}
      >
        <svg
          viewBox="0 0 240 330"
          className="w-full h-full max-h-full transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. SOFT BACKGROUND POSTER ARCH SHAPE */}
          <rect
            x="14"
            y="12"
            width="212"
            height="306"
            rx="106"
            fill={isHighlighted ? faculty.palette.tintColor : "#f1f5f9"}
            stroke={isHighlighted ? faculty.palette.pastelBorder : "#e2e8f0"}
            strokeWidth={isHighlighted ? "3" : "2"}
            className="transition-colors duration-300"
          />

          {/* Subtle Halo Rim inside Arch */}
          <path
            d="M 30,118 C 30,62 70,26 120,26 C 170,26 210,62 210,118"
            stroke={isHighlighted ? faculty.palette.pastelBorder : "#ffffff"}
            strokeWidth="3"
            strokeLinecap="round"
            opacity={isHighlighted ? 0.9 : 0.6}
            className="transition-all duration-300"
          />

          {/* 2. BASE FACELESS SILHOUETTE COMPONENTS */}
          {faculty.silhouette.type === "physics" && (
            <PhysicsSilhouette isHighlighted={isHighlighted} tintColor={faculty.palette.tintColor} />
          )}

          {faculty.silhouette.type === "chemistry" && (
            <ChemistrySilhouette isHighlighted={isHighlighted} tintColor={faculty.palette.tintColor} />
          )}

          {faculty.silhouette.type === "mathematics" && (
            <MathematicsSilhouette isHighlighted={isHighlighted} tintColor={faculty.palette.tintColor} />
          )}

          {faculty.silhouette.type === "biology" && (
            <BiologySilhouette isHighlighted={isHighlighted} tintColor={faculty.palette.tintColor} />
          )}

          {faculty.silhouette.type === "cs" && (
            <ComputerScienceSilhouette isHighlighted={isHighlighted} tintColor={faculty.palette.tintColor} />
          )}
        </svg>
      </div>

      {/* 3. SUBJECT LABEL PILL (on / directly under figure) */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center px-2 pointer-events-none z-10">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-display font-bold shadow-md transition-all duration-300 ${
            isHighlighted
              ? `${faculty.palette.pillBg} scale-105 shadow-lg`
              : "bg-white/95 text-slate-800 border-slate-200/90"
          }`}
        >
          {faculty.isLive && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          )}
          <span>{faculty.name}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   SILHOUETTE 1: PHYSICS (Male — Side-parted academic cut, sharp suit & tie)
   ========================================================================= */
function PhysicsSilhouette({ isHighlighted, tintColor }: { isHighlighted: boolean; tintColor: string }) {
  return (
    <g className="transition-all duration-300">
      {/* Shoulders & Suit Coat */}
      <path
        d="M 32,320 L 32,240 C 32,192 74,166 96,162 L 109,198 L 120,198 L 131,162 C 153,166 195,192 195,240 L 195,320 Z"
        fill="#1e293b"
      />
      {/* Coat Lapels */}
      <path d="M 74,175 L 108,235 L 120,295 L 86,220 Z" fill="#334155" />
      <path d="M 153,175 L 119,235 L 107,295 L 141,220 Z" fill="#334155" />
      
      {/* Pocket Square / Pen silhouette with active pastel accent */}
      <line
        x1="62"
        y1="230"
        x2="78"
        y2="230"
        stroke={isHighlighted ? tintColor : "#94a3b8"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Neck */}
      <path d="M 106,140 L 106,170 C 112,175 128,175 134,170 L 134,140 Z" fill="#cbd5e1" />

      {/* Crisp White Shirt Collar */}
      <polygon points="106,164 120,186 134,164 127,156 120,166 113,156" fill="#f8fafc" />

      {/* Tie */}
      <polygon points="116,178 124,178 127,245 120,260 113,245" fill="#475569" />

      {/* Ears */}
      <ellipse cx="80" cy="100" rx="5.5" ry="11" fill="#cbd5e1" />
      <ellipse cx="160" cy="100" rx="5.5" ry="11" fill="#cbd5e1" />

      {/* Faceless Head (Plain light-grey with NO face) */}
      <ellipse cx="120" cy="98" rx="35" ry="44" fill="#e2e8f0" />

      {/* Hair (Dark grey side-parted academia hairstyle) */}
      <path
        d="M 78,92 C 76,58 90,40 120,40 C 148,40 162,56 162,88 C 156,80 146,74 134,72 C 118,70 98,76 78,92 Z"
        fill="#334155"
      />
      <path d="M 76,92 C 78,74 84,65 94,62 C 90,70 86,82 82,96 Z" fill="#1e293b" />
      
      {/* Subtle glasses silhouette hint on temples (faceless) */}
      <line x1="78" y1="96" x2="86" y2="94" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
      <line x1="162" y1="96" x2="154" y2="94" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* =========================================================================
   SILHOUETTE 2: CHEMISTRY (Male — Clean cropped academia cut, tailored jacket & collar)
   ========================================================================= */
function ChemistrySilhouette({ isHighlighted, tintColor }: { isHighlighted: boolean; tintColor: string }) {
  return (
    <g className="transition-all duration-300">
      {/* Shoulders & Tailored Lab Coat / Jacket */}
      <path
        d="M 32,320 L 32,240 C 32,192 72,166 96,162 L 110,196 L 120,196 L 130,162 C 154,166 194,192 194,240 L 194,320 Z"
        fill="#1e293b"
      />
      {/* Notched Lapels */}
      <path d="M 76,174 L 110,234 L 120,295 L 88,220 Z" fill="#334155" />
      <path d="M 150,174 L 118,234 L 108,295 L 138,220 Z" fill="#334155" />

      {/* Pocket Pen Clip / Silhouette Accent with active pastel tint */}
      <line
        x1="64"
        y1="228"
        x2="78"
        y2="228"
        stroke={isHighlighted ? tintColor : "#94a3b8"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Neck */}
      <path d="M 106,140 L 106,170 C 112,174 128,174 134,170 L 134,140 Z" fill="#cbd5e1" />

      {/* Crisp White Collared Shirt */}
      <polygon points="106,164 120,186 134,164 126,156 120,166 114,156" fill="#f8fafc" />

      {/* Structured Tie */}
      <polygon points="116,176 124,176 126,242 120,258 114,242" fill="#475569" />

      {/* Ears */}
      <ellipse cx="79" cy="99" rx="5.5" ry="11" fill="#cbd5e1" />
      <ellipse cx="161" cy="99" rx="5.5" ry="11" fill="#cbd5e1" />

      {/* Faceless Head (Plain light-grey with NO face) */}
      <ellipse cx="120" cy="97" rx="35" ry="44" fill="#e2e8f0" />

      {/* Hair (Male clean cropped taper cut with neat hairline) */}
      <path
        d="M 77,90 C 76,58 92,42 120,42 C 148,42 163,58 163,90 C 158,82 148,74 136,72 C 122,70 102,76 77,90 Z"
        fill="#334155"
      />
      <path d="M 77,90 C 80,72 88,64 98,60 C 94,70 90,80 86,92 Z" fill="#1e293b" />
    </g>
  );
}

/* =========================================================================
   SILHOUETTE 3: MATHEMATICS (Male — Center Faculty Lead, tallest, tailored suit)
   ========================================================================= */
function MathematicsSilhouette({ isHighlighted, tintColor }: { isHighlighted: boolean; tintColor: string }) {
  return (
    <g className="transition-all duration-300">
      {/* Broad Shoulders & Tailored Navy/Slate Blazer */}
      <path
        d="M 28,330 L 28,235 C 28,185 75,158 100,154 L 114,195 L 126,195 L 140,154 C 165,158 212,185 212,235 L 212,330 Z"
        fill="#0f172a"
      />
      {/* Formal Suit Lapels */}
      <path d="M 75,170 L 112,232 L 120,305 L 88,220 Z" fill="#1e293b" />
      <path d="M 165,170 L 128,232 L 120,305 L 152,220 Z" fill="#1e293b" />

      {/* Amber/Gold Lapel Pin for Lead Faculty */}
      <polygon
        points="76,204 79,209 85,209 80,213 82,219 76,215 70,219 72,213 67,209 73,209"
        fill={isHighlighted ? tintColor : "#f59e0b"}
      />

      {/* Neck */}
      <path d="M 106,136 L 106,168 C 112,173 128,173 134,168 L 134,136 Z" fill="#cbd5e1" />

      {/* Crisp White Shirt Collar */}
      <polygon points="104,160 120,185 136,160 128,150 120,162 112,150" fill="#f8fafc" />

      {/* Structured Dark Grey Tie */}
      <polygon points="115,174 125,174 128,255 120,272 112,255" fill="#334155" />
      {/* Subtle tie stripe accent */}
      <line x1="117" y1="205" x2="123" y2="215" stroke={isHighlighted ? tintColor : "#94a3b8"} strokeWidth="1.5" />
      <line x1="116" y1="230" x2="124" y2="240" stroke={isHighlighted ? tintColor : "#94a3b8"} strokeWidth="1.5" />

      {/* Ears */}
      <ellipse cx="78" cy="98" rx="6" ry="12" fill="#cbd5e1" />
      <ellipse cx="162" cy="98" rx="6" ry="12" fill="#cbd5e1" />

      {/* Faceless Head (Plain light-grey with NO face) */}
      <ellipse cx="120" cy="95" rx="36" ry="46" fill="#e2e8f0" />

      {/* Hair (Crisp modern styled academia cut) */}
      <path
        d="M 75,90 C 73,52 88,34 120,34 C 152,34 167,52 165,90 C 158,80 148,70 134,68 C 118,66 96,70 75,90 Z"
        fill="#1e293b"
      />
      <path d="M 75,90 C 78,70 86,58 98,54 C 92,64 88,78 84,94 Z" fill="#0f172a" />
    </g>
  );
}

/* =========================================================================
   SILHOUETTE 4: BIOLOGY (Male — Swept-back wavy academia cut, vest & collared tie)
   ========================================================================= */
function BiologySilhouette({ isHighlighted, tintColor }: { isHighlighted: boolean; tintColor: string }) {
  return (
    <g className="transition-all duration-300">
      {/* Shoulders & Structured Academia Jacket */}
      <path
        d="M 34,320 L 34,240 C 34,194 74,168 98,162 L 112,195 L 120,195 L 128,162 C 152,168 192,194 192,240 L 192,320 Z"
        fill="#1e293b"
      />
      {/* Tailored Vest / Cardigan Underlayer */}
      <path d="M 88,174 L 118,228 L 120,290 L 96,225 Z" fill="#334155" />
      <path d="M 142,174 L 120,228 L 118,290 L 134,225 Z" fill="#334155" />

      {/* Neck */}
      <path d="M 106,138 L 106,168 C 112,172 128,172 134,168 L 134,138 Z" fill="#cbd5e1" />

      {/* Crisp White Shirt Collar */}
      <polygon points="106,162 120,185 134,162 126,154 120,164 114,154" fill="#f8fafc" />

      {/* Tie with tie clip in active pastel tint */}
      <polygon points="116,176 124,176 126,245 120,260 114,245" fill="#475569" />
      <line
        x1="115"
        y1="210"
        x2="125"
        y2="210"
        stroke={isHighlighted ? tintColor : "#cbd5e1"}
        strokeWidth="2"
      />

      {/* Ears */}
      <ellipse cx="79" cy="100" rx="5.5" ry="11" fill="#cbd5e1" />
      <ellipse cx="161" cy="100" rx="5.5" ry="11" fill="#cbd5e1" />

      {/* Faceless Head (Plain light-grey with NO face) */}
      <ellipse cx="120" cy="98" rx="35" ry="44" fill="#e2e8f0" />

      {/* Hair (Male distinguished wavy swept-back academic hairstyle) */}
      <path
        d="M 76,95 C 74,62 88,40 120,40 C 152,40 166,62 164,95 C 160,82 150,68 136,66 C 120,64 104,66 92,72 C 84,78 78,86 76,95 Z"
        fill="#334155"
      />
      <path d="M 94,54 C 104,46 116,44 130,48 C 120,52 110,54 94,54 Z" fill="#1e293b" />
      <path d="M 76,95 C 78,80 84,72 92,68 C 88,78 84,88 80,98 Z" fill="#1e293b" />
    </g>
  );
}

/* =========================================================================
   SILHOUETTE 5: COMPUTER SCIENCE (Male/Unisex — Textured waves, modern crewneck over shirt)
   ========================================================================= */
function ComputerScienceSilhouette({ isHighlighted, tintColor }: { isHighlighted: boolean; tintColor: string }) {
  return (
    <g className="transition-all duration-300">
      {/* Shoulders & Modern Technical Academia Crewneck */}
      <path
        d="M 34,320 L 34,242 C 34,195 74,168 98,162 C 112,170 128,170 142,162 C 166,168 206,195 206,242 L 206,320 Z"
        fill="#1e293b"
      />
      {/* Crewneck Collar Band */}
      <path
        d="M 98,162 C 112,175 128,175 142,162 C 138,154 102,154 98,162 Z"
        fill="#334155"
        stroke={isHighlighted ? tintColor : "none"}
        strokeWidth="1"
      />

      {/* Neck */}
      <path d="M 106,138 L 106,166 C 112,170 128,170 134,166 L 134,138 Z" fill="#cbd5e1" />

      {/* Crisp White Shirt Collar Peaking Over Crewneck */}
      <polygon points="106,158 114,168 120,158" fill="#f8fafc" />
      <polygon points="134,158 126,168 120,158" fill="#f8fafc" />

      {/* Ears */}
      <ellipse cx="80" cy="100" rx="5.5" ry="11" fill="#cbd5e1" />
      <ellipse cx="160" cy="100" rx="5.5" ry="11" fill="#cbd5e1" />

      {/* Faceless Head (Plain light-grey with NO face) */}
      <ellipse cx="120" cy="98" rx="35" ry="44" fill="#e2e8f0" />

      {/* Hair (Modern textured wavy hair with fringe tips) */}
      <path
        d="M 74,94 C 72,60 84,40 102,38 C 112,36 126,38 136,42 C 154,50 166,66 164,94 C 158,84 148,76 136,74 C 122,72 108,76 96,80 C 88,82 80,88 74,94 Z"
        fill="#334155"
      />
      {/* Textured Fringe Locks */}
      <path d="M 88,78 C 96,74 104,72 112,74 C 104,82 96,86 88,78 Z" fill="#1e293b" />
      <path d="M 120,72 C 132,70 142,74 146,80 C 138,82 128,80 120,72 Z" fill="#1e293b" />
    </g>
  );
}
