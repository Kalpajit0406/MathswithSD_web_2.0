"use client";

import React from "react";
import Link from "next/link";

export function ScholarsAbout() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fdfbf7] border-t border-b border-[#ede7dc] text-[#1e2022] relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Core Pedagogical Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-3xl bg-white border border-[#ede7dc] space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#991b1b] border border-rose-100 flex items-center justify-center font-display font-bold text-lg">
                <svg className="w-5 h-5 text-[#991b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#1e2022]">Concept-First Pedagogy</h4>
              <p className="text-xs text-[#555b67] font-body leading-relaxed">
                Formulas are understood and derived, never memorized blindly. Our teaching emphasizes first-principles reasoning and visual geometry.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#ede7dc] space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d97706] border border-amber-100 flex items-center justify-center font-display font-bold text-lg">
                <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#1e2022]">Targeted Exam Strategy</h4>
              <p className="text-xs text-[#555b67] font-body leading-relaxed">
                Dual preparation designed for top Board results (WBCHSE / CBSE / ISC) alongside competitive speed for WBJEE, JEE Main &amp; Advanced.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#ede7dc] space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#1e2022] border border-[#ede7dc] flex items-center justify-center font-display font-bold text-lg">
                <svg className="w-5 h-5 text-[#1e2022]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#1e2022]">Senior Subject Mentors</h4>
              <p className="text-xs text-[#555b67] font-body leading-relaxed">
                Led by Soumen Sir (15+ years experience) alongside dedicated subject specialists committed to individual doubt clearance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#ede7dc] space-y-3 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#991b1b] border border-rose-100 flex items-center justify-center font-display font-bold text-lg">
                <svg className="w-5 h-5 text-[#991b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-[#1e2022]">Interactive Visual Tools</h4>
              <p className="text-xs text-[#555b67] font-body leading-relaxed">
                Integrating digital simulations, 3D math visualizers, and open-lift curriculum exploration directly into classroom pedagogy.
              </p>
            </div>

          </div>
        </div>

        {/* Right Column - Text Info */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ede7dc] text-[#991b1b] font-display text-xs font-bold uppercase tracking-widest shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b]" />
            Institutional Pedagogy
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1e2022] tracking-tight leading-tight">
            Building Strong Foundations in <span className="text-[#991b1b]">Science &amp; Mathematics</span>
          </h2>

          <p className="text-base text-[#2d3139] font-body leading-relaxed">
            <strong>Scholars Hub</strong> was established with a singular mission: to make complex academic subjects intuitive, structured, and engaging for students aiming for top academic achievements.
          </p>

          <p className="text-sm text-[#555b67] font-body leading-relaxed">
            Starting with our flagship <strong>Mathematics Section (MathsWithSD)</strong> guided by Soumen Sir, Scholars Hub provides a structured learning environment where students master problem-solving skills, logical reasoning, and competitive speed.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/maths"
              className="px-6 py-3.5 rounded-full bg-[#991b1b] text-white font-display font-bold text-xs hover:bg-[#be123c] transition-all shadow-md flex items-center gap-2 active:scale-95 min-h-[44px]"
            >
              <span>Visit Mathematics Department</span>
              <svg className="w-3.5 h-3.5 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
