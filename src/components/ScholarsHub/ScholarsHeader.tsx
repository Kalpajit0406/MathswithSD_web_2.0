"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function ScholarsHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-md"
          : "bg-white/70 backdrop-blur-sm py-4 border-b border-slate-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center font-display font-black text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all duration-300">
            🎓
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
              SCHOLARS <span className="text-amber-500">HUB</span>
            </span>
            <span className="text-[10px] font-body text-slate-500 tracking-widest uppercase font-bold">
              Premier Educational Institution
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#departments"
            className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors"
          >
            Departments
          </a>
          <a
            href="#about"
            className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors"
          >
            About Hub
          </a>
          <a
            href="#contact"
            className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Direct Action Link to Mathematics */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/maths"
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-slate-900 text-white font-display font-bold text-xs hover:bg-slate-800 transition-all shadow-md hover:scale-[1.02]"
          >
            <span>Mathematics Dept</span>
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <a
            href="#hero"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-display font-medium text-slate-700 hover:text-amber-600"
          >
            Home
          </a>
          <a
            href="#departments"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-display font-medium text-slate-700 hover:text-amber-600"
          >
            Departments
          </a>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-display font-medium text-slate-700 hover:text-amber-600"
          >
            About Hub
          </a>
          <div className="pt-2 border-t border-slate-200">
            <Link
              href="/maths"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-display font-bold text-xs"
            >
              <span>Explore Mathematics Department</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
