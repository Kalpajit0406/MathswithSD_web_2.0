"use client";

import React from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export function AboutSection() {
  return (
    <section 
      id="about-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white text-[#1e2022] border-t border-[#ede7dc] shadow-xs overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Teacher Character Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#1e2022] via-[#2d3139] to-[#1e2022] text-white shadow-xl border border-[#3e434d] text-center max-w-sm w-full">
            <div className="text-xs font-display font-bold text-amber-300 uppercase tracking-widest mb-3">
              FOUNDER &amp; HEAD MENTOR
            </div>
            <TeacherCharacter pose="confident" height={320} />
            <div className="mt-4 pt-3 border-t border-white/10">
              <h3 className="font-display font-bold text-lg text-white">Soumen Sir</h3>
              <p className="text-xs text-slate-300 font-body">Senior Mathematics Educator</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-block px-3 py-1 rounded-full bg-[#991b1b]/10 text-[#991b1b] font-display text-xs font-bold uppercase tracking-wider">
            02 — ABOUT THE TEACHER
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1e2022] tracking-tight leading-tight">
            Dedicated to Transforming How Students Experience Mathematics.
          </h2>

          <p className="text-base sm:text-lg text-[#555b67] font-body leading-relaxed">
            At <strong>MathsWithSD</strong>, mathematics is taught not as a collection of memorized formulas, but as a logical language for problem-solving. Soumen Sir brings 15+ years of focused coaching experience, guiding high school and entrance candidates toward genuine mastery.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fdfbf7] border border-[#ede7dc]">
              <div className="w-10 h-10 rounded-xl bg-[#991b1b] text-white font-bold font-display flex items-center justify-center shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-display font-bold text-[#1e2022] text-base">Classroom First Approach</h4>
                <p className="text-xs sm:text-sm text-[#555b67] font-body mt-1">
                  Every concept is built on the board step-by-step, ensuring no student gets left behind in foundational topics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fdfbf7] border border-[#ede7dc]">
              <div className="w-10 h-10 rounded-xl bg-[#2d3139] text-amber-300 font-bold font-display flex items-center justify-center shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-display font-bold text-[#1e2022] text-base">Exam Strategy &amp; Rigor</h4>
                <p className="text-xs sm:text-sm text-[#555b67] font-body mt-1">
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
