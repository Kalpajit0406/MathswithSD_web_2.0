"use client";

import React from "react";
import Link from "next/link";

export function ScholarsFooter() {
  return (
    <footer id="contact" className="bg-[#1e2022] text-white border-t border-stone-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-800">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#991b1b] text-white flex items-center justify-center font-display font-black text-lg shadow-sm">
              🎓
            </div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
              SCHOLARS <span className="text-[#991b1b]">HUB</span>
            </span>
          </div>
          <p className="text-sm text-stone-300 font-body leading-relaxed max-w-md">
            Scholars Hub is a premier academic institution committed to conceptual rigor, visual learning, and competitive exam excellence in Mathematics, Physics, Chemistry, Biology, and Computer Science.
          </p>
          <div className="text-xs text-stone-400 font-mono">
            Location: Kolkata, West Bengal, India • In-Person &amp; Live Hybrid Batches
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-amber-400">
            Subject Departments
          </h4>
          <ul className="space-y-2.5 text-xs font-display">
            <li>
              <Link href="/maths" className="text-white hover:text-amber-300 font-bold flex items-center gap-2 transition-colors">
                <span>Mathematics (Soumen Sir)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#991b1b] text-[10px] text-white font-bold">Live</span>
              </Link>
            </li>
            <li>
              <Link href="/physics" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <span>Physics Department</span>
                <span className="text-[10px] text-stone-400">Waitlist</span>
              </Link>
            </li>
            <li>
              <Link href="/chemistry" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <span>Chemistry Department</span>
                <span className="text-[10px] text-stone-400">Waitlist</span>
              </Link>
            </li>
            <li>
              <Link href="/biology" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <span>Biology Department</span>
                <span className="text-[10px] text-stone-400">Waitlist</span>
              </Link>
            </li>
            <li>
              <Link href="/computer-science" className="text-stone-400 hover:text-white transition-colors flex items-center gap-2">
                <span>Computer Science</span>
                <span className="text-[10px] text-stone-400">Waitlist</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-amber-400">
            Institution Desk
          </h4>
          <p className="text-xs text-stone-300 font-body leading-relaxed">
            For department inquiries, admissions, or faculty support, please reach out via our direct department portals.
          </p>
          <div className="pt-2">
            <Link
              href="/maths#contact-section"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-xs font-display font-bold text-stone-200 hover:text-white hover:bg-[#991b1b] hover:border-[#991b1b] transition-all min-h-[44px]"
            >
              <span>Mathematics Department Enquiry</span>
              <svg className="w-3.5 h-3.5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-body gap-4">
        <div>
          &copy; {new Date().getFullYear()} <strong>Scholars Hub</strong>. All rights reserved. Directed by Soumen Sir.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/maths" className="hover:text-amber-400 transition-colors">
            Maths Department
          </Link>
          <a href="#hero" className="hover:text-amber-400 transition-colors">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
