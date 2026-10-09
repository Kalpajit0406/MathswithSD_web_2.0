"use client";

import React from "react";
import Link from "next/link";

import { AnimatedSection } from "@/components/ProfileSystem/AnimatedSection";

export function ScholarsHero() {
  return (
    <AnimatedSection presetType="hero" className="relative">
      <section
        id="hero"
        className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-[#f8f6f0] overflow-hidden text-slate-900"
      >
      {/* Background Gradients & Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e135_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e135_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-amber-300/30 via-sky-200/40 to-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Institution Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-800 font-display text-xs font-bold tracking-wide shadow-md backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="uppercase tracking-widest text-[11px] text-slate-700">Main Institutional Homepage</span>
        </div>

        {/* Primary Title */}
        <div className="space-y-3">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-slate-950 tracking-tight leading-none uppercase">
            SCHOLARS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">HUB</span>
          </h1>
          <p className="font-display text-lg sm:text-2xl text-slate-700 font-semibold tracking-wide max-w-3xl mx-auto">
            Empowering Minds Through Specialized Academic Excellence
          </p>
        </div>

        {/* Institution Subtext */}
        <p className="text-base sm:text-lg text-slate-600 font-body leading-relaxed max-w-2xl mx-auto">
          Welcome to the central portal of <strong>Scholars Hub</strong>. Explore our dedicated subject faculties built to deliver rigorous conceptual understanding, exam success, and lifelong knowledge.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#departments"
            className="px-8 py-4 rounded-full bg-amber-400 text-slate-950 font-display font-bold text-sm hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 hover:scale-105 flex items-center gap-2"
          >
            <span>Explore Departments</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <Link
            href="/maths"
            className="px-8 py-4 rounded-full bg-slate-950 text-white border border-slate-800 font-display font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
          >
            <span>Mathematics Section (Live)</span>
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Quick Highlights Strip */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-300/60">
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900">5</div>
            <div className="text-xs text-slate-600 font-body uppercase tracking-wider mt-1 font-semibold">Core Subjects</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-amber-600">100%</div>
            <div className="text-xs text-slate-600 font-body uppercase tracking-wider mt-1 font-semibold">Conceptual Mastery</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900">Board + Entrance</div>
            <div className="text-xs text-slate-600 font-body uppercase tracking-wider mt-1 font-semibold">Integrated Prep</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold font-display text-amber-600">Interactive</div>
            <div className="text-xs text-slate-600 font-body uppercase tracking-wider mt-1 font-semibold">Modern Learning</div>
          </div>
        </div>

      </div>
    </section>
    </AnimatedSection>
  );
}
