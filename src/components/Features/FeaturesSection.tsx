"use client";

import React from "react";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Classroom Fundamentals",
    description:
      "Deep conceptual clarity straight from Soumen Sir's whiteboard. No shortcuts — just genuine understanding of core principles.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Master Calculus & Integration",
    description:
      "From standard indefinite integrals to complex definite areas and differential equations, broken down step-by-step.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Structured Problem Solving",
    description:
      "Targeted problem sets designed to build confidence for board examinations, entrance tests, and higher mathematics.",
  },
];

const MODULES = [
  { name: "Integral Calculus", tag: "Core Topic", level: "Advanced" },
  { name: "Differential Equations", tag: "Calculus", level: "Intermediate" },
  { name: "Algebra & Matrices", tag: "Foundations", level: "All Levels" },
  { name: "Coordinate Geometry", tag: "Geometry", level: "Intermediate" },
];

export function FeaturesSection() {
  return (
    <div className="relative bg-[#f4f1ea]/80 backdrop-blur-md text-[#141311] z-20 py-20 px-6 sm:px-12 border-t border-black/5 shadow-2xl">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Section 1: Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-display text-xs tracking-widest uppercase text-ink/60 font-semibold">
              The MathsWithSD Difference
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-ink">
              Real Teaching. <br />
              Real Mathematics.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink/75 font-body leading-relaxed">
              Soumen Sir brings decades of teaching expertise into every session.
              Experience how abstract mathematical concepts transform into intuitive,
              visual logic on the board.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {FEATURES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-md hover:shadow-xl hover:bg-white/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-ink/80 leading-relaxed font-body">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Modules Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              Explored Topics &amp; Courses
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink/70 font-body">
              Structured modules crafted to take students from foundational concepts to exam mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.map((mod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-ink/60">
                    {mod.tag}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-bold text-ink">
                    {mod.name}
                  </h4>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-ink/70 font-body">
                  <span>{mod.level}</span>
                  <span className="font-semibold text-ink">Explore &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: App Banner CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Start Learning with Soumen Sir Today
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-body leading-relaxed">
              Download the official MathsWithSD Android application to access comprehensive video lessons, practice papers, and direct guidance.
            </p>
            <div className="pt-2">
              <a
                href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white text-ink px-6 py-3 font-display font-semibold text-sm hover:bg-white/90 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg className="h-5 w-5 text-ink" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.623.224-1.2.61-1.636zM15.207 13.414l2.586 2.586-12.001 6.929 9.415-9.515zM17.793 10.586l-2.586 2.586-9.415-9.515 12.001 6.929zm1.414 1.414l3.172 1.832a1.2 1.2 0 0 1 0 2.08l-3.172 1.832-2.121-2.122 2.121-2.822z" />
                </svg>
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section 4: Map & Classroom Location */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-display text-xs tracking-widest uppercase text-ink/60 font-semibold">
                Classroom Location
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
                Visit Soumen Sir&apos;s Classroom
              </h2>
              <p className="mt-1 text-sm text-ink/70 font-body">
                Soumen Sir&apos;s Math Coaching Center — Kolkata, West Bengal
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/Soumen+Sir's+Math+Coaching+Center/@22.5993056,88.4254474,21z/data=!4m6!3m5!1s0x3a0275cc0d772125:0x9b5302111e4b95e9!8m2!3d22.5993324!4d88.4253361!16s%2Fg%2F11spxq5nsk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-4 py-2 text-xs font-display font-semibold text-ink transition-all hover:bg-ink hover:text-white shrink-0 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Open in Google Maps &rarr;</span>
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-black/10 shadow-lg relative bg-board/40">
            <iframe
              title="Soumen Sir's Math Coaching Center Location Map"
              src="https://maps.google.com/maps?q=22.5993324,88.4253361&z=18&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ink/70 font-body">
          <div className="space-y-1 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} MathsWithSD — Soumen Sir&apos;s Mathematics Classroom.</p>
            <p className="text-[11px] text-ink/60">
              Designed &amp; Developed by{" "}
              <span className="font-semibold text-ink">Kalpajit Bepary</span> &amp;{" "}
              <span className="font-semibold text-ink">Tushant Pramanik</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-display font-semibold tracking-wider text-ink">MATHSWITHSD</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
