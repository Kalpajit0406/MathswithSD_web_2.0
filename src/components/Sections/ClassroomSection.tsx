"use client";

import React from "react";
import Image from "next/image";
import { TeacherCharacter } from "../TeacherCharacter";

export function ClassroomSection() {
  return (
    <section 
      id="classroom-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-white text-slate-900 border-t border-slate-200 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900/5 font-display text-xs font-bold text-slate-900 uppercase tracking-widest">
            06 — INSTITUTION &amp; CLASSROOM ENVIRONMENT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Where the Learning Happens
          </h2>
          <p className="text-base text-slate-700 font-body leading-relaxed">
            Experience an environment engineered for deep mathematical focus, clear whiteboard visualization, and personal guidance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          <div className="p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-bold font-display flex items-center justify-center text-xl mb-4">
                ✏️
              </div>
              <h3 className="font-display font-bold text-xl text-white">Whiteboard Logic</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                Step-by-step whiteboard derivations enable students to trace every logical step from start to finish.
              </p>
            </div>
            <div className="mt-6 relative h-40 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/assets/cinematic/whiteboard.png"
                alt="Soumen Sir's Classroom Whiteboard"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-slate-950 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-400 text-slate-950 font-bold font-display flex items-center justify-center text-xl mb-4">
                👥
              </div>
              <h3 className="font-display font-bold text-xl text-white">Personal Attention</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                Controlled batch size ensures Soumen Sir personally reviews every student&apos;s problem-solving steps.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <TeacherCharacter pose="thumbsup" height={160} />
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-950 font-bold font-display flex items-center justify-center text-xl mb-4">
                📱
              </div>
              <h3 className="font-display font-bold text-xl text-white">Official Android App</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                Access lesson videos, revision sheets, and direct assignment submissions anytime via the MathsWithSD mobile app.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-white text-slate-950 font-display font-bold text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get App on Google Play</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
