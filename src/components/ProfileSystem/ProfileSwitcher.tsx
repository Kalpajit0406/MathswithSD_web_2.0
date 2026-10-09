"use client";

import React, { useState, useRef, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";

export function ProfileSwitcher() {
  const {
    profiles,
    activeProfileId,
    activeProfile,
    setActiveProfileId,
    setIsEditorOpen,
    setIsCreateModalOpen,
    saveStatus,
  } = useProfile();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const shortName = activeProfile?.name
    .replace(/^Profile \d+\s*—\s*/, "")
    .replace(/^Profile \d+\s*:\s*/, "");

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Small, discreet top-right trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`Active Design Profile: ${activeProfile.name}`}
        className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all text-xs font-display font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
          activeProfile.isOriginal
            ? "bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800"
            : "bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 text-amber-300 border-amber-500/50 hover:border-amber-400"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[11px] font-bold tracking-tight max-w-[120px] truncate">
          {shortName || "Original"}
        </span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 group-hover:text-white ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>

        {saveStatus === "saving" && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 text-slate-100 shadow-2xl border border-slate-700/80 p-3 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-1">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase font-display">
                🎨 Design Profiles
              </span>
              <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-1.5 py-0.5 rounded">
                v2.0
              </span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsEditorOpen(true);
              }}
              className="text-[11px] font-display font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
            >
              <span>Edit Preset</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          {/* Profile List */}
          <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 text-xs">
            {profiles.map((p) => {
              const isActive = p.id === activeProfileId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveProfileId(p.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex flex-col gap-1 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500/60 text-white shadow-inner"
                      : "bg-slate-800/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs flex items-center gap-1.5">
                      {p.name}
                      {p.isOriginal && (
                        <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.2 rounded font-mono font-medium border border-emerald-500/30">
                          Baseline
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 font-mono">
                    <span>By: {p.modifiedBy || "System"}</span>
                    <span>
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action buttons footer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsCreateModalOpen(true);
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
