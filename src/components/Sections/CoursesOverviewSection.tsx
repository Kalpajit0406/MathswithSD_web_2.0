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
      className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#fdfbf7] text-[#1e2022] border-t border-[#ede7dc] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-[#991b1b]/10 text-[#991b1b] font-display text-xs font-bold uppercase tracking-widest">
            04 — COURSES &amp; CURRICULUM
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1e2022]">
            Targeted Mathematics Programs
          </h2>
          <p className="text-base text-[#555b67] font-body leading-relaxed">
            Structured batches designed specifically for board performance and entrance exam confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((c, idx) => (
            <div 
              key={idx}
              className="p-7 rounded-3xl bg-white border border-[#ede7dc] flex flex-col justify-between hover:border-[#991b1b]/40 transition-all shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#991b1b] text-white">
                  {c.tag}
                </span>
                <h3 className="mt-4 font-display font-bold text-xl text-[#1e2022]">{c.title}</h3>
                <p className="mt-1 text-xs text-[#991b1b] font-mono font-medium">{c.target}</p>
                <p className="mt-3 text-xs sm:text-sm text-[#555b67] font-body leading-relaxed">{c.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ede7dc] flex items-center justify-between text-xs text-[#555b67]">
                <span>In-Person &amp; Mobile App</span>
                <a 
                  href="#enquiry"
                  className="font-display font-bold text-[#991b1b] hover:text-[#be123c] transition-colors"
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
