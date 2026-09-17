"use client";

import React from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export function HeroSection() {
  const handleScrollToModules = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("interactive-modules");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("about-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-16 px-4 sm:px-8 lg:px-12 bg-[#f8f6f0] overflow-hidden"
    >
      {/* Smooth Glassmorphism Transition Strip from 3D Whiteboard Intro */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#e9e5da]/90 via-[#f8f6f0]/70 to-[#f8f6f0] backdrop-blur-xl pointer-events-none z-10" />

      {/* Subtle Background Radial Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/30 via-sky-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-900 font-display text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            MathsWithSD • Personal Coaching &amp; Mentorship
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
            Real Teaching. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-sky-600 to-slate-900">
              Real Mathematics.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-700 font-body leading-relaxed max-w-2xl">
            Learn mathematics with <strong>Soumen Sir</strong>. Experience how abstract calculus, algebra, and geometry transform into intuitive, visual logic for Board Examinations and Entrance Tests.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#interactive-modules"
              onClick={handleScrollToModules}
              className="px-7 py-3.5 rounded-full bg-slate-950 text-white font-display font-bold text-sm hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              <span>Explore Courses &amp; Modules</span>
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <a
              href="#about-section"
              onClick={handleScrollToAbout}
              className="px-6 py-3.5 rounded-full bg-white/80 text-slate-900 border border-slate-300 font-display font-semibold text-sm hover:bg-white hover:border-slate-400 transition-all shadow-sm"
            >
              <span>Meet Soumen Sir</span>
            </a>
          </div>

          {/* Feature highlights */}
          <div className="pt-6 border-t border-slate-900/10 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-2xl font-bold font-display text-slate-950">100%</div>
              <div className="text-xs text-slate-600 font-body">Conceptual Clarity</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-slate-950">Board + Entrance</div>
              <div className="text-xs text-slate-600 font-body">Targeted Prep</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-slate-950">Small Batches</div>
              <div className="text-xs text-slate-600 font-body">Personal Care</div>
            </div>
          </div>

        </div>

        {/* Right Column: Clean Character Composition */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Subtle Frame / Whiteboard Backdrop */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
            
            {/* Header Chalk Details */}
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 border-b border-white/10 pb-2">
              <span>MATHSWITHSD // CLASSROOM</span>
              <span className="text-amber-400 font-bold">SOUMEN SIR</span>
            </div>

            {/* Character Standing inside Frame */}
            <div className="relative z-10 my-auto flex justify-center">
              <TeacherCharacter pose="standing" height={360} priority />
            </div>

            {/* Footer Badge */}
            <div className="relative z-10 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <div className="text-xs font-display font-bold text-amber-400 uppercase tracking-wider">
                Soumen Sir&apos;s Math Coaching
              </div>
              <div className="text-[11px] font-body text-slate-300">
                Kolkata, West Bengal
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
