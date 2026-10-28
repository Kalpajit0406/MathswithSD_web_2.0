"use client";

import React from "react";
import { TeacherCharacter, TeacherPose } from "../TeacherCharacter";

interface OpenLiftPlatformProps {
  pose?: TeacherPose;
  activeModuleName?: string;
  speechText?: string;
  offsetY?: number;
  showLaserPointer?: boolean;
}

export function OpenLiftPlatform({
  pose = "pointing",
  activeModuleName,
  speechText,
  offsetY = 0,
}: OpenLiftPlatformProps) {
  const displaySpeech = speechText || (activeModuleName
    ? `Reviewing ${activeModuleName}. Examine core definitions, theorem proofs, and standard examination questions.`
    : "Welcome to MathsWithSD. Select a curriculum module to review chapter derivations and problem solving.");

  return (
    <div
      className="relative flex flex-col items-center transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) z-30"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      {/* Main Classroom Study Platform Structure */}
      <div className="relative w-80 sm:w-84 animate-lift-subtle-float">
        
        {/* Integrated Speech Guidance Bubble */}
        <div className="relative mb-2.5 animate-speech-entrance">
          <div className="bg-[#1e2022] text-white p-3.5 rounded-2xl border border-[#991b1b]/40 shadow-xl backdrop-blur-md relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5 text-[11px]">
              <span className="font-display font-bold text-amber-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Soumen Sir — MathsWithSD
              </span>
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                FACULTY STUDY
              </span>
            </div>

            <p className="text-xs font-body leading-snug text-stone-200">
              &quot;{displaySpeech}&quot;
            </p>

            {/* Speech Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#1e2022] border-r border-b border-[#991b1b]/40 rotate-45" />
          </div>
        </div>

        {/* Architectural Study Frame */}
        <div className="relative bg-gradient-to-b from-[#1e2022] via-stone-900 to-[#1e2022] border border-stone-700/80 rounded-3xl p-3 shadow-2xl backdrop-blur-md overflow-hidden">
          
          {/* Top Railing */}
          <div className="flex justify-between items-center px-3 py-1 border-b border-white/10 text-[10px] font-mono text-stone-400 tracking-widest uppercase mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>CLASSROOM STUDY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">ACTIVE TOPIC</span>
            </div>
          </div>

          {/* Platform Floor & Teacher Character Stage */}
          <div className="relative h-60 sm:h-64 w-full flex items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-black border border-stone-800">
            
            {/* Background Chalkboard Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{ 
                backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)',
                backgroundSize: '20px 20px' 
              }} 
            />

            {/* Teacher Standing inside Study */}
            <div className="relative z-10 pb-1">
              <TeacherCharacter pose={pose} height={230} priority />
            </div>

            {/* Side Steel Guide Rails */}
            <div className="absolute inset-y-0 left-2 w-1 bg-gradient-to-b from-amber-500/40 via-stone-600 to-amber-500/40 rounded-full" />
            <div className="absolute inset-y-0 right-2 w-1 bg-gradient-to-b from-amber-500/40 via-stone-600 to-amber-500/40 rounded-full" />

            {/* Platform Floor Illuminated Base */}
            <div className="absolute bottom-0 inset-x-0 h-3.5 bg-gradient-to-r from-stone-900 via-[#991b1b]/40 to-stone-900 border-t border-[#991b1b]/40" />
          </div>

          {/* Minimal Elegant Base Trim */}
          <div className="mt-2 pt-1.5 border-t border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-400 px-1.5">
            <span>SOUMEN SIR&apos;S STUDY</span>
            <span className="text-amber-400 font-semibold">{activeModuleName || "CURRICULUM"}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
