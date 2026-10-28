"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProfileSwitcher } from "@/components/ProfileSystem/ProfileSwitcher";
import { AnimatedSection } from "@/components/ProfileSystem/AnimatedSection";

export interface SubjectPlaceholderProps {
  subjectName: string;
  icon: React.ReactNode;
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
  const [studentName, setStudentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentClass, setStudentClass] = useState<"11" | "12" | "Repeater">("11");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: studentName.trim() || `${subjectName} Aspirant`,
          parentPhone: parentPhone.trim(),
          studentClass: studentClass,
          goal: "Board + Entrance",
          message: `Early-Bird Launch Waitlist for ${subjectName} Department (Class ${studentClass})`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed. Please check your number.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main
      style={{ backgroundColor: pastel.pageBg }}
      className="relative min-h-screen text-slate-900 font-body flex flex-col justify-between overflow-hidden transition-colors duration-500"
    >
      {/* Background Subtle Grid & Ambient Pastel Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div
        style={{ backgroundColor: pastel.accentGlow }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[90px] pointer-events-none opacity-40"
      />

      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 z-50 py-3.5 px-6 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#ede7dc] flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#991b1b] text-white flex items-center justify-center shadow-xs">
            <svg className="w-4 h-4 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <span className="font-display font-bold text-base tracking-tight text-[#1e2022] group-hover:text-[#991b1b] transition-colors">
            SCHOLARS <span className="text-[#991b1b]">HUB</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/maths"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs transition-all shadow-xs active:scale-95"
          >
            <span>Mathematics Section (Live)</span>
            <svg className="w-3.5 h-3.5 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#ede7dc] text-[#2d3139] font-display font-semibold text-xs hover:text-[#1e2022] hover:bg-[#f7f3ec] transition-all min-h-[38px]"
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
              className="w-20 h-20 mx-auto rounded-3xl bg-white border flex items-center justify-center font-display font-bold text-3xl shadow-xs text-slate-800"
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

          {/* Early-Bird Batch Pre-Registration & Notification */}
          <div className="p-6 rounded-2xl bg-white border border-[#ede7dc] text-left space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-[#1e2022]">
                Join the {subjectName} Launch Waitlist
              </span>
              <span className="text-[10px] font-semibold text-[#991b1b] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Early-Bird Batch
              </span>
            </div>
            <p className="text-xs text-[#555b67] font-body">
              Be the first to receive syllabus blueprints, batch schedules, and fee concession details when admissions open.
            </p>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-display font-bold text-sm text-emerald-800">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pre-Registration Confirmed!</span>
                </div>
                <p className="text-xs text-emerald-700 font-body">
                  Thank you! You are on the priority waitlist for {subjectName}. Soumen Sir&apos;s team will reach out with batch timings and curriculum material before public enrollment opens.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-2.5 pt-1">
                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-[#991b1b] font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student Name"
                    className="px-3.5 py-2.5 rounded-xl border border-[#ede7dc] bg-[#fdfbf7] text-xs text-[#1e2022] placeholder-[#555b67]/60 focus:outline-none focus:ring-1 focus:ring-[#991b1b] min-h-[44px]"
                  />
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value as "11" | "12" | "Repeater")}
                    className="px-3.5 py-2.5 rounded-xl border border-[#ede7dc] bg-[#fdfbf7] text-xs text-[#1e2022] focus:outline-none focus:ring-1 focus:ring-[#991b1b] min-h-[44px]"
                  >
                    <option value="11">Class 11 Aspirant</option>
                    <option value="12">Class 12 Aspirant</option>
                    <option value="Repeater">Dropper / Repeater</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="10-digit Mobile / WhatsApp Number"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#ede7dc] bg-[#fdfbf7] text-xs text-[#1e2022] placeholder-[#555b67]/60 focus:outline-none focus:ring-1 focus:ring-[#991b1b] min-h-[44px]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs transition-all shadow-xs active:scale-95 disabled:opacity-70 min-h-[44px] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Reserving...</span>
                      </>
                    ) : (
                      <span>Join Priority Waitlist</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/maths"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs transition-all shadow-md shadow-red-950/20 flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
            >
              <span>Visit Live Mathematics Classroom</span>
              <svg className="w-4 h-4 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#1e2022] border border-[#ede7dc] font-display font-bold text-xs hover:bg-[#f7f3ec] transition-all shadow-xs flex items-center justify-center gap-2 min-h-[44px]"
            >
              <svg className="w-4 h-4 text-[#555b67]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Scholars Hub</span>
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
