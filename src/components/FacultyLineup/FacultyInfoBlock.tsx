"use client";

import React from "react";
import Link from "next/link";
import { SubjectFaculty } from "./facultyData";

interface FacultyInfoBlockProps {
  faculty: SubjectFaculty;
  isVisible: boolean;
  onNavigate: () => void;
  onClose?: () => void;
}

export function FacultyInfoBlock({
  faculty,
  isVisible,
  onNavigate,
  onClose,
}: FacultyInfoBlockProps) {
  // Determine inward alignment classes based on position to avoid viewport cut-off
  const alignmentClass =
    faculty.tooltipAlign === "left"
      ? "left-0 sm:-left-2 md:-left-4 origin-top-left"
      : faculty.tooltipAlign === "right"
      ? "right-0 sm:-right-2 md:-right-4 origin-top-right"
      : "left-1/2 -translate-x-1/2 origin-top";

  const arrowClass =
    faculty.tooltipAlign === "left"
      ? "left-12 sm:left-14"
      : faculty.tooltipAlign === "right"
      ? "right-12 sm:right-14"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      aria-hidden={!isVisible}
      style={{
        zIndex: 50,
      }}
      className={`absolute top-[102%] mt-3 w-[275px] sm:w-[305px] md:w-[325px] transition-all duration-300 ease-out ${alignmentClass} ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 -translate-y-2 pointer-events-none scale-95"
      }`}
    >
      {/* Floating Card Container */}
      <div
        style={{
          backgroundColor: faculty.palette.pastelBg,
          borderColor: faculty.palette.pastelBorder,
          boxShadow: `0 20px 35px -10px ${faculty.palette.glowColor}, 0 4px 12px rgba(15, 23, 42, 0.08)`,
        }}
        className="relative rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-sm"
      >
        {/* Mobile close button if tapped */}
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close details"
            className="sm:hidden absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-900/10 hover:bg-slate-900/20 flex items-center justify-center text-slate-700 text-xs font-bold transition-colors"
          >
            ✕
          </button>
        )}

        {/* Top Header: Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            style={{
              color: faculty.palette.titleColor,
            }}
            className="text-[11px] font-display font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200/60 shadow-xs"
          >
            {faculty.statusText}
          </span>
          <span className="text-[11px] font-mono text-slate-500 font-medium">
            Academic Faculty
          </span>
        </div>

        {/* Title & Specialty */}
        <h3
          style={{ color: faculty.palette.titleColor }}
          className="font-display text-xl sm:text-2xl font-extrabold tracking-tight leading-tight"
        >
          {faculty.name}
        </h3>
        <p
          style={{ color: faculty.palette.textColor }}
          className="text-xs font-display font-semibold mt-0.5 mb-3 leading-snug opacity-90"
        >
          {faculty.specialty}
        </p>

        {/* Bullet Points */}
        <div className="space-y-1.5 py-2.5 my-2 border-y border-slate-900/10">
          {faculty.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <svg
                style={{ color: faculty.palette.titleColor }}
                className="w-3.5 h-3.5 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span
                style={{ color: faculty.palette.textColor }}
                className="font-body leading-tight"
              >
                {bullet}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button: routes to subject page */}
        <div className="pt-2">
          <Link
            href={faculty.route}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
            style={{
              backgroundColor: faculty.isLive ? "#0f172a" : "rgba(15, 23, 42, 0.85)",
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-display font-bold text-xs hover:bg-slate-800 transition-all shadow-md group/btn"
          >
            <span>
              {faculty.isLive ? `Enter ${faculty.name} Website` : `Explore ${faculty.name}`}
            </span>
            <svg
              className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7-7m7 7H3"
              />
            </svg>
          </Link>
        </div>

        {/* Pointer Arrow pointing upwards to figure */}
        <div
          style={{
            backgroundColor: faculty.palette.pastelBg,
            borderColor: faculty.palette.pastelBorder,
          }}
          className={`absolute -top-2 w-4 h-4 rotate-45 border-l border-t ${arrowClass}`}
        />
      </div>
    </div>
  );
}
