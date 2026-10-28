"use client";

import React from "react";

export function CoursesOverviewSection() {
  const COURSES = [
    {
      title: "Class 11: Higher Secondary Foundation",
      target: "WBCHSE, CBSE & ISC Candidates",
      desc: "Complete foundational syllabus: Trigonometric Functions, Real Relations & Functions, Coordinate Geometry, Complex Numbers, Sequences, and Introduction to Differential Calculus.",
      tag: "Class 11",
    },
    {
      title: "Class 12: Board Examination Mastery",
      target: "Class 12 Board Aspirants",
      desc: "Exhaustive coverage of Differential & Integral Calculus, Differential Equations, 3D Coordinate Geometry, Vector Algebra, and Probability with rigorous step-marking practice.",
      tag: "Class 12",
    },
    {
      title: "WBJEE & JEE Advanced Intensive",
      target: "Engineering Entrance Aspirants",
      desc: "Advanced analytical problem banks, multi-concept calculus applications, coordinate locus problems, and speed-accuracy optimization for WBJEE & JEE Main.",
      tag: "Entrance Track",
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
            04 — ACADEMIC CURRICULUM
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1e2022]">
            Structured Mathematics Programs
          </h2>
          <p className="text-base text-[#555b67] font-body leading-relaxed">
            Chapter-wise syllabus sequences tailored to Higher Secondary Board scoring guidelines and competitive entrance requirements.
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
