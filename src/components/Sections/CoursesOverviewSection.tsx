"use client";

import React from "react";

export function CoursesOverviewSection() {
  const COURSES = [
    {
      title: "Class 11 Board & Foundation",
      target: "Class 11 Students",
      desc: "Comprehensive syllabus coverage of Trigonometry, Sets, Functions, Algebra, and Introduction to Calculus.",
      tag: "Foundation",
    },
    {
      title: "Class 12 Board Mastery",
      target: "Class 12 Students",
      desc: "Deep focus on Integral Calculus, Differential Equations, Vectors, 3D Geometry, and Probability for Board Exam Excellence.",
      tag: "Board Mastery",
    },
    {
      title: "JEE & Entrance Coaching",
      target: "Entrance Aspirants",
      desc: "Advanced problem-solving techniques, speed shortcuts, and high-yield question banks for JEE Mains & WBJEE.",
      tag: "Competitive",
    },
  ];

  return (
    <section 
      id="courses-section"
      className="relative py-20 px-4 sm:px-8 lg:px-12 bg-slate-900 text-white border-t border-slate-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-display text-xs font-bold uppercase tracking-widest">
            04 — COURSES &amp; CURRICULUM
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Targeted Mathematics Programs
          </h2>
          <p className="text-base text-slate-300 font-body leading-relaxed">
            Structured batches designed specifically for board performance and entrance exam confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((c, idx) => (
            <div 
              key={idx}
              className="p-7 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-amber-400/50 transition-all shadow-xl"
            >
              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">
                  {c.tag}
                </span>
                <h3 className="mt-4 font-display font-bold text-xl text-white">{c.title}</h3>
                <p className="mt-1 text-xs text-sky-400 font-mono">{c.target}</p>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 font-body leading-relaxed">{c.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Offered In-Person &amp; App</span>
                <a 
                  href="#contact-section"
                  className="font-display font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Enquire &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
