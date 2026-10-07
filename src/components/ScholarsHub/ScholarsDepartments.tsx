"use client";

import React from "react";
import { FacultyLineup } from "@/components/FacultyLineup/FacultyLineup";

export function ScholarsDepartments() {
  return (
    <section
      id="departments"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#fafaf9] text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 font-display text-xs font-bold uppercase tracking-widest">
            Academic Programs
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Our Subject Departments
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-body">
            Meet the multidisciplinary academic faculty. Explore subject curricula, interactive visualizers, faculty specializations, and admission portals.
          </p>
        </div>

        {/* Interactive Faculty Lineup */}
        <FacultyLineup />

        {/* Future Expansion Banner */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 text-center max-w-4xl mx-auto space-y-3 shadow-sm">
          <h4 className="font-display font-bold text-lg text-slate-950">
            Looking for additional subjects or specialized test series?
          </h4>
          <p className="text-sm text-slate-600 font-body max-w-2xl mx-auto">
            Scholars Hub is expanding its academic faculties. The Mathematics website is fully operational with live admissions, and additional science &amp; technology subjects are launching soon.
          </p>
        </div>

      </div>
    </section>
  );
}
