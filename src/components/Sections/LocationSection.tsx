"use client";

import React from "react";

export function LocationSection() {
  return (
    <section 
      id="location-section"
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#f8f6f0] text-slate-950 border-t border-slate-900/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-900/10 font-display text-xs font-bold text-slate-900 uppercase tracking-widest">
              07 — CLASSROOM LOCATION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Visit Soumen Sir&apos;s Math Coaching Center
            </h2>
            <p className="text-sm text-slate-600 font-body">
              Located in Kolkata, West Bengal — Easy accessibility for students.
            </p>
          </div>

          <a
            href="https://www.google.com/maps/place/Soumen+Sir's+Math+Coaching+Center/@22.5993056,88.4254474,21z/data=!4m6!3m5!1s0x3a0275cc0d772125:0x9b5302111e4b95e9!8m2!3d22.5993324!4d88.4253361!16s%2Fg%2F11spxq5nsk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-display font-bold text-slate-900 shadow-sm hover:bg-slate-950 hover:text-white transition-all shrink-0 self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Open Google Maps &rarr;</span>
          </a>
        </div>

        {/* Interactive Google Maps Frame */}
        <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-slate-900/10 shadow-xl relative bg-slate-900">
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
    </section>
  );
}
