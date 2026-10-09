"use client";

import React from "react";
import Link from "next/link";
import { ProfileSwitcher } from "@/components/ProfileSystem/ProfileSwitcher";
import { AnimatedSection } from "@/components/ProfileSystem/AnimatedSection";

export interface SubjectPlaceholderProps {
  subjectName: string;
  icon: string;
  tagline: string;
  description: string;
  highlights: string[];
  pastel: {
    pageBg: string;       // Soft full-page background
    cardBg: string;       // Card background in pastel tint
    borderColor: string;  // Border in slightly deeper shade
    titleColor: string;   // High-contrast title
    textColor: string;    // Readable text
    badgeBg: string;      // "Coming Soon" badge
    accentGlow: string;   // Ambient halo
  };
}

export function SubjectPlaceholderPage({
  subjectName,
  icon,
  tagline,
  description,
  highlights,
  pastel,
}: SubjectPlaceholderProps) {
  return (
    <main
      style={{ backgroundColor: pastel.pageBg }}
      className="relative min-h-screen text-slate-900 font-body flex flex-col justify-between overflow-hidden transition-colors duration-500"
    >
      {/* Background Subtle Grid & Ambient Pastel Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div
        style={{ backgroundColor: pastel.accentGlow }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[110px] pointer-events-none opacity-60"
      />

      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 z-50 py-4 px-6 bg-white/85 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-display font-black text-sm shadow-xs">
            🎓
          </div>
          <span className="font-display font-bold text-base tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
            SCHOLARS <span className="text-amber-500">HUB</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/maths"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white font-display font-bold text-xs hover:bg-slate-800 transition-all shadow-xs"
          >
            <span>Mathematics Section (Live)</span>
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-display font-semibold text-xs hover:text-slate-950 hover:bg-slate-200 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>

          {/* Universal Profile Switcher */}
          <ProfileSwitcher />
        </div>
      </header>

      {/* Main Content Showcase */}
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 relative z-10">
        <AnimatedSection presetType="hero" className="w-full max-w-2xl">
          <div
            style={{
              backgroundColor: pastel.cardBg,
              borderColor: pastel.borderColor,
              boxShadow: `0 25px 50px -12px ${pastel.accentGlow}, 0 4px 16px rgba(15, 23, 42, 0.06)`,
            }}
            className="w-full rounded-3xl border p-8 sm:p-12 text-center space-y-8 backdrop-blur-sm"
          >
          {/* Badge & Subject Icon */}
          <div className="space-y-4">
            <div
              style={{ borderColor: pastel.borderColor }}
              className="w-20 h-20 mx-auto rounded-3xl bg-white border flex items-center justify-center font-display font-black text-4xl shadow-inner text-slate-900"
            >
              {icon}
            </div>

            {/* "Coming Soon" Badge */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: pastel.borderColor,
                color: pastel.titleColor,
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-display font-extrabold uppercase tracking-widest shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Coming Soon
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-2">
            <h1
              style={{ color: pastel.titleColor }}
              className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              {subjectName} <span className="opacity-80">Department</span>
            </h1>
            <p
              style={{ color: pastel.textColor }}
              className="font-display text-sm sm:text-base font-semibold max-w-lg mx-auto opacity-90"
            >
              {tagline}
            </p>
          </div>

          <p
            style={{ color: pastel.textColor }}
            className="text-sm font-body leading-relaxed max-w-lg mx-auto opacity-80"
          >
            {description}
          </p>

          {/* Curriculum Preview List */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderColor: pastel.borderColor,
            }}
            className="p-6 rounded-2xl border text-left space-y-3 shadow-xs"
          >
            <div
              style={{ color: pastel.titleColor }}
              className="text-xs font-display font-bold uppercase tracking-wider"
            >
              Upcoming Faculty &amp; Curriculum Highlights:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <svg
                    style={{ color: pastel.titleColor }}
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span style={{ color: pastel.textColor }} className="font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 text-white font-display font-bold text-xs hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Scholars Hub</span>
            </Link>

            <Link
              href="/maths"
              style={{
                borderColor: pastel.borderColor,
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-slate-800 border font-display font-bold text-xs hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Visit Live Mathematics Section</span>
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200/80 text-center text-xs text-slate-500 font-body relative z-10">
        &copy; {new Date().getFullYear()} Scholars Hub Institution — {subjectName} Academic Portal
      </footer>
    </main>
  );
}
