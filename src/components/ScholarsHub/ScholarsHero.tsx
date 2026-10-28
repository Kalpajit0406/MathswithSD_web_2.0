"use client";

import React from "react";
import Link from "next/link";

import { AnimatedSection } from "@/components/ProfileSystem/AnimatedSection";

export function ScholarsHero() {
  return (
    <AnimatedSection presetType="hero" className="relative">
      <section
        id="hero"
        className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdfbf7] via-[#f7f3ec] to-[#ede7dc]/40 overflow-hidden text-[#1e2022]"
      >
      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfd6c540_1px,transparent_1px),linear-gradient(to_bottom,#dfd6c540_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Founder & Institution Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#ede7dc] text-[#2d3139] font-display text-xs font-semibold tracking-wide shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
          <span>Scholars Hub Kolkata • Directed by <strong className="text-[#1e2022]">Soumen Sir</strong></span>
        </div>

        {/* Primary Title */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1e2022] tracking-tight leading-tight">
            SCHOLARS <span className="text-[#991b1b]">HUB</span>
          </h1>
          <p className="font-display text-xl sm:text-2xl text-[#2d3139] font-semibold tracking-wide max-w-3xl mx-auto">
            Comprehensive Higher Secondary &amp; Competitive Entrance Coaching
          </p>
        </div>

        {/* Institution Subtext */}
        <p className="text-base sm:text-lg text-[#555b67] font-body leading-relaxed max-w-3xl mx-auto">
          Scholars Hub provides serious academic coaching for students preparing for Class 11 &amp; 12 Board Examinations (WBCHSE, CBSE, ISC) and competitive entrance tests (WBJEE, JEE Main, JEE Advanced). Grounded in 15+ years of pedagogical rigor, our curriculum develops deep analytical reasoning and first-principles mastery.
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/maths"
            className="px-8 py-4 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-sm transition-all shadow-md shadow-red-950/20 hover:scale-[1.02] active:scale-95 flex items-center gap-2 min-h-[48px]"
          >
            <span>Mathematics Department (Live Batches)</span>
            <svg className="w-4 h-4 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <a
            href="#departments"
            className="px-8 py-4 rounded-full bg-white text-[#1e2022] border border-[#ede7dc] font-display font-bold text-sm hover:bg-[#f7f3ec] transition-all shadow-xs flex items-center gap-2 active:scale-95 min-h-[48px]"
          >
            <span>View All Department Syllabi</span>
            <svg className="w-4 h-4 text-[#991b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Authentic Social Proof & Institutional Track Record */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#ede7dc]">
          <div className="p-4 rounded-2xl bg-white/95 border border-[#ede7dc] shadow-xs text-left">
            <div className="text-2xl sm:text-3xl font-bold font-display text-[#1e2022]">15+ Years</div>
            <div className="text-xs text-[#555b67] font-body mt-1 font-medium">Academic Teaching Heritage</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/95 border border-[#ede7dc] shadow-xs text-left">
            <div className="text-2xl sm:text-3xl font-bold font-display text-[#991b1b]">1,200+</div>
            <div className="text-xs text-[#555b67] font-body mt-1 font-medium">Qualified Board &amp; Entrance Students</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/95 border border-[#ede7dc] shadow-xs text-left">
            <div className="text-2xl sm:text-3xl font-bold font-display text-[#1e2022]">100/100</div>
            <div className="text-xs text-[#555b67] font-body mt-1 font-medium">Exemplary Board Examination Scores</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/95 border border-[#ede7dc] shadow-xs text-left">
            <div className="text-2xl sm:text-3xl font-bold font-display text-[#d97706]">Classroom + App</div>
            <div className="text-xs text-[#555b67] font-body mt-1 font-medium">Offline Lectures &amp; Digital Portal</div>
          </div>
        </div>

      </div>
    </section>
    </AnimatedSection>
  );
}
