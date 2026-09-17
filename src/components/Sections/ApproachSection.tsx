"use client";

import React from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export function ApproachSection() {
  const PILLARS = [
    {
      num: "01",
      title: "Visual Geometric Logic",
      description: "Abstract calculus and vectors become clear when visualized geometrically on the board.",
    },
    {
      num: "02",
      title: "Structured Step-by-Step Proofs",
      description: "No skipped steps. Every formula derivation is methodically explained for board exam excellence.",
    },
    {
      num: "03",
      title: "Targeted Problem Banks",
      description: "Carefully curated problem sets ranging from board level fundamentals to high-yield entrance questions.",
    }
  ];

  return (
    <section 
      id="approach-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#f8f6f0] text-slate-950 border-t border-slate-900/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900/10 font-display text-xs font-bold text-slate-900 uppercase tracking-widest">
            03 — TEACHING METHODOLOGY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            How Mathematics Is Taught at MathsWithSD
          </h2>
          <p className="text-base text-slate-700 font-body leading-relaxed">
            Three core pillars designed to take students from foundational confusion to complete conceptual confidence.
          </p>
        </div>

        {/* 3 Pillars Grid with Teacher Character */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            {PILLARS.map((p) => (
              <div 
                key={p.num}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 text-amber-400 font-display font-extrabold text-lg flex items-center justify-center shrink-0">
                  {p.num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-950">{p.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 font-body leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Teacher Character Explaining */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800 text-center max-w-sm w-full">
              <div className="text-xs font-display font-bold text-sky-400 uppercase tracking-widest mb-2">
                EXPLAINING CONCEPTS
              </div>
              <TeacherCharacter pose="thinking" height={320} />
              <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 font-body">
                &quot;When you understand the &apos;why&apos; behind a formula, solving questions becomes second nature.&quot;
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
