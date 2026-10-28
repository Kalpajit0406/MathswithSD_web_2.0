"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { ProfileSwitcher } from "@/components/ProfileSystem/ProfileSwitcher";

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
          ? "bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#ede7dc] py-3 shadow-md"
          : "bg-[#fdfbf7]/80 backdrop-blur-sm py-4 border-b border-[#ede7dc]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#991b1b] text-white flex items-center justify-center shadow-md shadow-red-950/20 group-hover:bg-[#be123c] transition-all duration-300">
            <svg className="w-5 h-5 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-[#1e2022] group-hover:text-[#991b1b] transition-colors">
              SCHOLARS <span className="text-[#991b1b]">HUB</span>
            </span>
            <span className="text-[10px] font-body text-[#555b67] tracking-widest uppercase font-semibold">
              Institution of Sciences &amp; Mathematics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className="text-xs font-display font-bold uppercase tracking-wider text-[#2d3139] hover:text-[#991b1b] transition-colors"
          >
            Home
          </a>
          <a
            href="#departments"
            className="text-xs font-display font-bold uppercase tracking-wider text-[#2d3139] hover:text-[#991b1b] transition-colors"
          >
            Departments
          </a>
          <a
            href="#about"
            className="text-xs font-display font-bold uppercase tracking-wider text-[#2d3139] hover:text-[#991b1b] transition-colors"
          >
            About Hub
          </a>
          <a
            href="#contact"
            className="text-xs font-display font-bold uppercase tracking-wider text-[#2d3139] hover:text-[#991b1b] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Direct Action Link to Mathematics & Profile Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/maths"
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95"
            >
              <span>Mathematics Dept</span>
              <svg className="w-3.5 h-3.5 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Discreet Top-Right Profile Switcher */}
          <ProfileSwitcher />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white border border-[#ede7dc] text-[#2d3139] hover:text-[#1e2022] shadow-sm"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7]/98 border-b border-[#ede7dc] px-6 py-4 space-y-3 shadow-xl animate-fade-in-card">
          <a
            href="#hero"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-display font-medium text-[#2d3139] hover:text-[#991b1b] min-h-[44px] flex items-center"
          >
            Home
          </a>
          <a
            href="#departments"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-display font-medium text-[#2d3139] hover:text-[#991b1b] min-h-[44px] flex items-center"
          >
            Departments
          </a>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-display font-medium text-[#2d3139] hover:text-[#991b1b] min-h-[44px] flex items-center"
          >
            About Hub
          </a>
          <div className="pt-3 border-t border-[#ede7dc]">
            <Link
              href="/maths"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs min-h-[44px] shadow-sm"
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
