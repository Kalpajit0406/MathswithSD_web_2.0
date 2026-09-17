"use client";

import React from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export function AboutSection() {
  return (
    <section 
      id="about-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white text-slate-900 border-t border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Teacher Character Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 text-center max-w-sm w-full">
            <div className="text-xs font-display font-bold text-sky-400 uppercase tracking-widest mb-3">
              FOUNDER &amp; HEAD MENTOR
            </div>
            <TeacherCharacter pose="confident" height={320} />
            <div className="mt-4 pt-3 border-t border-white/10">
              <h3 className="font-display font-bold text-lg text-white">Soumen Sir</h3>
              <p className="text-xs text-slate-400 font-body">Senior Mathematics Educator</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-900 font-display text-xs font-bold uppercase tracking-wider">
            02 — ABOUT THE TEACHER
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Dedicated to Transforming How Students Experience Mathematics.
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-body leading-relaxed">
            At <strong>MathsWithSD</strong>, mathematics is taught not as a collection of memorized formulas, but as a logical language for problem-solving. Soumen Sir brings years of focused coaching experience, guiding high school and entrance candidates toward genuine mastery.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-bold font-display flex items-center justify-center shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-base">Classroom First Approach</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-body mt-1">
                  Every concept is built on the board step-by-step, ensuring no student gets left behind in foundational topics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 font-bold font-display flex items-center justify-center shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-950 text-base">Exam Strategy &amp; Rigor</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-body mt-1">
                  Rigorous preparation for Class 11 &amp; 12 Board Examinations and competitive entrance tests (JEE &amp; WBJEE).
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
