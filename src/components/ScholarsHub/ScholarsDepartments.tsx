"use client";

import React from "react";
import Link from "next/link";

interface SubjectDepartment {
  id: string;
  name: string;
  route: string;
  status: "live" | "upcoming";
  tagline: string;
  description: string;
  icon: string;
  color: {
    badge: string;
    border: string;
    glow: string;
    accent: string;
  };
  highlights: string[];
}

const SUBJECT_DEPARTMENTS: SubjectDepartment[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    route: "/maths",
    status: "live",
    tagline: "Soumen Sir's Mathematics Coaching",
    description:
      "Explore deep calculus, visual algebra, geometry, and entrance test preparation with interactive 3D learning and personal mentorship.",
    icon: "∑",
    color: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-300",
      border: "border-amber-400/80 shadow-md hover:border-amber-500",
      glow: "from-amber-400/20 to-amber-500/5",
      accent: "text-amber-700",
    },
    highlights: ["Board & Entrance Prep", "Interactive 3D Visualizer", "Calculus & Algebra Focus"],
  },
  {
    id: "physics",
    name: "Physics",
    route: "/physics",
    status: "upcoming",
    tagline: "Mechanics, Quantum & Electromagnetism",
    description:
      "Future home of Scholars Hub Physics department. Master conceptual physics, laboratory simulations, and competitive problem solving.",
    icon: "⚛",
    color: {
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
      border: "border-slate-200 hover:border-indigo-400",
      glow: "from-indigo-400/10 to-transparent",
      accent: "text-indigo-700",
    },
    highlights: ["Theoretical Foundations", "Simulated Experiments", "JEE / NEET Prep"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    route: "/chemistry",
    status: "upcoming",
    tagline: "Organic, Inorganic & Physical Chemistry",
    description:
      "Future home of Scholars Hub Chemistry department. Reaction mechanisms, atomic structure, and comprehensive numerical solving.",
    icon: "🧪",
    color: {
      badge: "bg-teal-50 text-teal-700 border-teal-200",
      border: "border-slate-200 hover:border-teal-400",
      glow: "from-teal-400/10 to-transparent",
      accent: "text-teal-700",
    },
    highlights: ["Reaction Logic", "Physical Numericals", "NCERT & Advanced"],
  },
  {
    id: "biology",
    name: "Biology",
    route: "/biology",
    status: "upcoming",
    tagline: "Botany, Zoology & Medical Entrance",
    description:
      "Future home of Scholars Hub Biology department. Comprehensive study of life sciences, human physiology, and NEET excellence.",
    icon: "🧬",
    color: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      border: "border-slate-200 hover:border-emerald-400",
      glow: "from-emerald-400/10 to-transparent",
      accent: "text-emerald-700",
    },
    highlights: ["High-Yield Diagrams", "Physiology Deep Dives", "NEET Specialized"],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    route: "/computer-science",
    status: "upcoming",
    tagline: "Algorithms, Data Structures & Coding",
    description:
      "Future home of Scholars Hub Computer Science department. Logic building, programming languages, and computational problem-solving.",
    icon: "💻",
    color: {
      badge: "bg-sky-50 text-sky-700 border-sky-200",
      border: "border-slate-200 hover:border-sky-400",
      glow: "from-sky-400/10 to-transparent",
      accent: "text-sky-700",
    },
    highlights: ["Data Structures", "Python & Java", "Algorithmic Thinking"],
  },
];

export function ScholarsDepartments() {
  return (
    <section
      id="departments"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafaf9] text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 font-display text-xs font-bold uppercase tracking-widest">
            Academic Programs
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Our Subject Departments
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-body">
            Select a subject department to access curriculum details, interactive modules, faculty information, and admission details.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBJECT_DEPARTMENTS.map((subject) => {
            const isLive = subject.status === "live";

            return (
              <div
                key={subject.id}
                className={`group relative rounded-3xl bg-white border ${subject.color.border} p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden`}
              >
                {/* Ambient Glow */}
                <div
                  className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${subject.color.glow} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center font-display font-black text-2xl shadow-inner group-hover:scale-110 transition-transform text-slate-900">
                      {subject.icon}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full border text-[11px] font-display font-bold tracking-wider uppercase ${subject.color.badge}`}
                    >
                      {isLive ? "● LIVE WEBSITE" : "COMING SOON"}
                    </span>
                  </div>

                  {/* Subject Name & Tagline */}
                  <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {subject.name}
                  </h3>
                  <p className={`text-xs font-display font-semibold ${subject.color.accent} mt-1 mb-3`}>
                    {subject.tagline}
                  </p>

                  {/* Subject Description */}
                  <p className="text-sm text-slate-600 font-body leading-relaxed mb-6">
                    {subject.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-slate-100">
                    {subject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subject CTA Link */}
                <Link
                  href={subject.route}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-display font-bold text-sm transition-all duration-300 ${
                    isLive
                      ? "bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md group-hover:scale-[1.02]"
                      : "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 hover:text-slate-950"
                  }`}
                >
                  <span>
                    {isLive ? `Enter ${subject.name} Website` : `Explore ${subject.name}`}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Future Expansion Banner */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 text-center max-w-4xl mx-auto space-y-3 shadow-sm">
          <h4 className="font-display font-bold text-lg text-slate-900">
            Looking for additional subjects or specialized test series?
          </h4>
          <p className="text-sm text-slate-600 font-body max-w-2xl mx-auto">
            Scholars Hub is expanding its academic faculties. The Mathematics website is fully operational, and additional subjects are coming online shortly.
          </p>
        </div>

      </div>
    </section>
  );
}
