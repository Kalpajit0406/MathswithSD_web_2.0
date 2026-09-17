"use client";

import React from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export function ContactSection() {
  return (
    <section 
      id="contact-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white border-t border-slate-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Main Deliberate Final Call to Action */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-display text-xs font-bold uppercase tracking-widest">
                08 — READY TO LEARN?
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Start Building Mathematics Mastery Today.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-xl">
                Whether you&apos;re preparing for Class 11, Class 12 Board Examinations, or entrance tests, Soumen Sir is ready to guide you.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-amber-400 text-slate-950 px-7 py-3.5 font-display font-bold text-sm hover:bg-amber-300 transition-all shadow-xl"
                >
                  <svg className="h-5 w-5 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.623.224-1.2.61-1.636zM15.207 13.414l2.586 2.586-12.001 6.929 9.415-9.515zM17.793 10.586l-2.586 2.586-9.415-9.515 12.001 6.929zm1.414 1.414l3.172 1.832a1.2 1.2 0 0 1 0 2.08l-3.172 1.832-2.121-2.122 2.121-2.822z" />
                  </svg>
                  <span>Download Android App</span>
                </a>

                <a
                  href="https://www.google.com/maps/place/Soumen+Sir's+Math+Coaching+Center/@22.5993056,88.4254474,21z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 text-white px-6 py-3.5 font-display font-semibold text-sm hover:bg-white/20 transition-all"
                >
                  <span>Visit Coaching Center</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <TeacherCharacter pose="thumbsup" height={260} />
            </div>

          </div>

        </div>

        {/* Clean Footer */}
        <footer className="pt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-body">
          <div className="space-y-1 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} MathsWithSD — Soumen Sir&apos;s Mathematics Coaching.</p>
            <p className="text-[11px] text-slate-500">
              Designed &amp; Developed by{" "}
              <span className="font-semibold text-slate-300">Kalpajit Bepary</span> &amp;{" "}
              <span className="font-semibold text-slate-300">Tushant Pramanik</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero-section" className="font-display font-semibold tracking-wider text-slate-300 hover:text-white transition-colors">
              Back to Top ↑
            </a>
            <span className="font-display font-extrabold tracking-widest text-amber-400">
              MATHSWITHSD
            </span>
          </div>
        </footer>

      </div>
    </section>
  );
}
