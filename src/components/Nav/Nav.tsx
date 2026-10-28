"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { ProfileSwitcher } from "@/components/ProfileSystem/ProfileSwitcher";

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { label: "About", href: "#about-section" },
    { label: "Approach", href: "#approach-section" },
    { label: "Courses", href: "#courses-section" },
    { label: "Interactive Lift", href: "#interactive-modules" },
    { label: "Classroom", href: "#classroom-section" },
    { label: "Location", href: "#location-section" },
    { label: "Contact", href: "#contact-section" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1e2022]/95 backdrop-blur-md border-b border-[#3e434d]/60 py-3 shadow-xl"
          : "bg-gradient-to-b from-[#121417]/90 to-transparent backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Parent Institution Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-display font-medium text-amber-200 hover:text-white bg-[#2d3139]/90 hover:bg-[#3e434d] px-3 py-1.5 rounded-full border border-amber-600/30 transition-all shadow-sm group"
            title="Return to Scholars Hub Main Institution Landing Page"
          >
            <svg className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Scholars Hub</span>
          </Link>

          <a
            href="#hero-section"
            onClick={(e) => handleNavClick(e, "#hero-section")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#991b1b] text-white flex items-center justify-center font-display font-black text-base shadow-md group-hover:bg-[#be123c] transition-colors">
              ∑
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
                MATHSWITH<span className="text-amber-400">SD</span>
              </span>
              <span className="text-[10px] font-body text-slate-300 -mt-1 tracking-wider uppercase">
                Soumen Sir Coaching
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-display font-semibold tracking-wide text-slate-200 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle & Profile Switcher */}
        <div className="flex items-center gap-3">
          <a
            href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#991b1b] hover:bg-[#be123c] text-white font-display font-bold text-xs transition-all shadow-md active:scale-95"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.623.224-1.2.61-1.636zM15.207 13.414l2.586 2.586-12.001 6.929 9.415-9.515zM17.793 10.586l-2.586 2.586-9.415-9.515 12.001 6.929zm1.414 1.414l3.172 1.832a1.2 1.2 0 0 1 0 2.08l-3.172 1.832-2.121-2.122 2.121-2.822z" />
            </svg>
            <span>Get App</span>
          </a>

          {/* Discreet Top-Right Profile Switcher */}
          <ProfileSwitcher />

          {/* Mobile Menu Button with 44px touch target */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-[#2d3139] border border-[#3e434d] text-slate-200 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1e2022]/98 backdrop-blur-xl border-b border-[#3e434d] px-4 pt-3 pb-6 space-y-3 animate-fade-in-card shadow-2xl">
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 rounded-xl text-sm font-display font-medium text-slate-200 hover:bg-[#2d3139] hover:text-amber-400 active:bg-[#3e434d] transition-all min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#2d3139] flex flex-col gap-2">
            <a
              href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#991b1b] text-white font-display font-bold text-xs hover:bg-[#be123c] transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.623.224-1.2.61-1.636zM15.207 13.414l2.586 2.586-12.001 6.929 9.415-9.515zM17.793 10.586l-2.586 2.586-9.415-9.515 12.001 6.929zm1.414 1.414l3.172 1.832a1.2 1.2 0 0 1 0 2.08l-3.172 1.832-2.121-2.122 2.121-2.822z" />
              </svg>
              <span>Download Android App</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
