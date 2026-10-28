"use client";

import React from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export function HeroSection() {
  const handleScrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("enquiry-section");
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
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-16 px-4 sm:px-8 lg:px-12 bg-[#fdfbf7] overflow-hidden"
    >
      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfd6c535_1px,transparent_1px),linear-gradient(to_bottom,#dfd6c535_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ede7dc] text-[#1e2022] font-display text-xs font-bold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
            <span>MathsWithSD • Personal Coaching &amp; Mentorship</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[#1e2022] tracking-tight leading-[1.1]">
            Real Teaching. <br />
            <span className="text-[#991b1b]">
              Real Mathematics.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#555b67] font-body leading-relaxed max-w-2xl">
            Learn mathematics with <strong>Soumen Sir</strong>. Experience how abstract calculus, algebra, and coordinate geometry transform into intuitive, visual logic for Board Examinations and Entrance Tests.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#enquiry-section"
              onClick={handleScrollToEnquiry}
              className="px-7 py-3.5 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-sm transition-all shadow-md shadow-red-950/20 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Courses &amp; Enrol</span>
              <svg className="w-4 h-4 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <a
              href="#about-section"
              onClick={handleScrollToAbout}
              className="px-6 py-3.5 rounded-full bg-white text-[#1e2022] border border-[#ede7dc] font-display font-semibold text-sm hover:bg-[#f7f3ec] transition-all shadow-xs active:scale-95"
            >
              <span>Meet Soumen Sir</span>
            </a>
          </div>

          {/* Pedagogical Credentials & Small Batches */}
          <div className="pt-6 border-t border-[#ede7dc] grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-2xl font-bold font-display text-[#1e2022]">15+ Years</div>
              <div className="text-xs text-[#555b67] font-body mt-0.5">Teaching Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-[#991b1b]">Board + Entrance</div>
              <div className="text-xs text-[#555b67] font-body mt-0.5">Integrated Prep</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-[#1e2022]">Small Batches</div>
              <div className="text-xs text-[#555b67] font-body mt-0.5">Individual Attention</div>
            </div>
          </div>

        </div>

        {/* Right Column: Clean Character Composition */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Whiteboard Classroom Frame */}
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#1e2022] via-[#2d3139] to-[#1e2022] border-4 border-[#3e434d] shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
            
            {/* Header Chalk Details */}
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-300 border-b border-white/10 pb-2">
              <span>MATHSWITHSD // CLASSROOM</span>
              <span className="text-amber-400 font-bold">SOUMEN SIR</span>
            </div>

            {/* Character Standing inside Frame */}
            <div className="relative z-10 my-auto flex justify-center">
              <TeacherCharacter pose="standing" height={360} priority />
            </div>

            {/* Footer Badge */}
            <div className="relative z-10 bg-[#121417]/85 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <div className="text-xs font-display font-bold text-amber-300 uppercase tracking-wider">
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
