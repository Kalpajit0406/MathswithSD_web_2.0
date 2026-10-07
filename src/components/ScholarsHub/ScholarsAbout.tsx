"use client";

import React from "react";
import Link from "next/link";

export function ScholarsAbout() {
  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-slate-200/80 text-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Conceptual Illustration / Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-display font-bold text-lg">
                💡
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Concept-First Pedagogy</h4>
              <p className="text-xs text-slate-600 font-body leading-relaxed">
                We believe formulas are understood, not memorized. Our teaching focuses on first-principles reasoning and visual clarity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-display font-bold text-lg">
                🎯
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Targeted Exam Strategy</h4>
              <p className="text-xs text-slate-600 font-body leading-relaxed">
                Dual preparation designed for top Board results alongside WBJEE, JEE Main, JEE Advanced, and NEET success.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-display font-bold text-lg">
                👨‍🏫
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Expert Subject Mentors</h4>
              <p className="text-xs text-slate-600 font-body leading-relaxed">
                Dedicated subject specialists who care about individual student growth and concept mastery.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-display font-bold text-lg">
                🖥️
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900">Interactive Digital Tools</h4>
              <p className="text-xs text-slate-600 font-body leading-relaxed">
                Integrating digital simulations, 3D visualizers, and interactive lift modules directly into learning.
              </p>
            </div>

          </div>
        </div>

        {/* Right Column - Text Info */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-display text-xs font-bold uppercase tracking-widest">
            Institutional Vision
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Building Strong Foundations in <span className="text-amber-600">Science &amp; Mathematics</span>
          </h2>

          <p className="text-base text-slate-700 font-body leading-relaxed">
            <strong>Scholars Hub</strong> was established with a singular mission: to make complex academic subjects intuitive, structured, and engaging for students aiming for top academic achievements.
          </p>

          <p className="text-sm text-slate-600 font-body leading-relaxed">
            Starting with our flagship <strong>Mathematics Section (MathsWithSD)</strong> guided by Soumen Sir, Scholars Hub provides a structured learning environment where students master problem-solving skills, logical reasoning, and competitive speed.
          </p>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/maths"
              className="px-6 py-3.5 rounded-full bg-slate-950 text-white font-display font-bold text-xs hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
            >
              <span>Visit Mathematics Department</span>
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
