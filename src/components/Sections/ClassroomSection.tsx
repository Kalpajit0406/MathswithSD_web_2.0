"use client";

import React from "react";
import Image from "next/image";
import { TeacherCharacter } from "../TeacherCharacter";

export function ClassroomSection() {
  return (
    <section 
      id="classroom-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white text-[#1e2022] border-t border-[#ede7dc] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-[#991b1b]/10 font-display text-xs font-bold text-[#991b1b] uppercase tracking-widest">
            06 — INSTITUTION &amp; CLASSROOM ENVIRONMENT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1e2022]">
            Where the Learning Happens
          </h2>
          <p className="text-base text-[#555b67] font-body leading-relaxed">
            Experience an environment engineered for deep mathematical focus, clear whiteboard visualization, and personal guidance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          <div className="p-7 rounded-3xl bg-[#fdfbf7] border border-[#ede7dc] flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#991b1b] text-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-[#1e2022]">Blackboard Derivations</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#555b67] font-body leading-relaxed">
                Every proof and calculus derivation is worked out live on the board. Students learn the structural intermediate steps required for full marks in board evaluations.
              </p>
            </div>
            <div className="mt-6 relative h-40 rounded-2xl overflow-hidden border border-[#ede7dc]">
              <Image
                src="/assets/cinematic/whiteboard.png"
                alt="Soumen Sir's Classroom Whiteboard"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#fdfbf7] border border-[#ede7dc] flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#2d3139] text-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-[#1e2022]">Small Batch Mentorship</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#555b67] font-body leading-relaxed">
                Strictly limited batch capacity ensures Soumen Sir personally inspects every student&apos;s working steps, correcting misconceptions before they become habits.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <TeacherCharacter pose="thumbsup" height={160} />
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#fdfbf7] border border-[#ede7dc] flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#991b1b] text-white flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-[#1e2022]">Digital Learning Portal</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#555b67] font-body leading-relaxed">
                Supplementary access to recorded derivation recaps, chapter-wise test archives, and homework submission via the official MathsWithSD mobile application.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ede7dc]">
              <a
                href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95 min-h-[44px]"
              >
                <span>Download App on Google Play</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
