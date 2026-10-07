"use client";

import React from "react";
import Link from "next/link";

interface SubjectPlaceholderProps {
  subjectName: string;
  icon: string;
  tagline: string;
  description: string;
  badgeColor: string;
  highlights: string[];
}

export function SubjectPlaceholderPage({
  subjectName,
  icon,
  tagline,
  description,
  badgeColor,
  highlights,
}: SubjectPlaceholderProps) {
  return (
    <main className="relative min-h-screen bg-[#fafaf9] text-slate-900 font-body flex flex-col justify-between overflow-hidden">
      {/* Background Lighting & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e135_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e135_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-300/20 via-indigo-200/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Link */}
      <header className="fixed top-0 inset-x-0 z-50 py-4 px-6 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shadow-sm">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-display font-black text-sm">
            🎓
          </div>
          <span className="font-display font-bold text-base tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
            SCHOLARS <span className="text-amber-500">HUB</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/maths"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white font-display font-bold text-xs hover:bg-slate-800 transition-all shadow-sm"
          >
            <span>Mathematics Section (Live)</span>
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-display font-semibold text-xs hover:text-slate-950 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Hub Home</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl w-full rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 text-center space-y-8 shadow-xl">
          
          {/* Badge & Subject Icon */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-black text-4xl shadow-inner text-slate-900">
              {icon}
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-display text-xs font-bold uppercase tracking-widest">
              <span className={`w-2 h-2 rounded-full ${badgeColor}`} />
              Future Subject Expansion
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              {subjectName} <span className="text-amber-600">Department</span>
            </h1>
            <p className="font-display text-sm sm:text-base text-amber-700 font-semibold">
              {tagline}
            </p>
          </div>

          <p className="text-sm text-slate-600 font-body leading-relaxed max-w-lg mx-auto">
            {description}
          </p>

          {/* Feature preview list */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
            <div className="text-xs font-display font-bold text-slate-600 uppercase tracking-wider">
              Upcoming Department Features:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/maths"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-amber-400 text-slate-950 font-display font-bold text-xs hover:bg-amber-300 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Visit Live Mathematics Section</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-display font-semibold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Scholars Hub</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500 font-body relative z-10">
        &copy; {new Date().getFullYear()} Scholars Hub Institution — {subjectName} Department Portal
      </footer>
    </main>
  );
}
