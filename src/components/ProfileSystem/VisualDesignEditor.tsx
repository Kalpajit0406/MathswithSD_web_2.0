"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { PageId, AnimationConfig, DesignProfile } from "@/types/profile";
import Link from "next/link";

const PAGES: { id: PageId; label: string; href: string }[] = [
  { id: "landing", label: "Landing Page", href: "/" },
  { id: "mathematics", label: "Mathematics", href: "/maths" },
  { id: "physics", label: "Physics", href: "/physics" },
  { id: "chemistry", label: "Chemistry", href: "/chemistry" },
  { id: "biology", label: "Biology", href: "/biology" },
  { id: "computer-science", label: "Computer Science", href: "/computer-science" },
];

export function VisualDesignEditor() {
  const {
    profiles,
    activeProfileId,
    activeProfile,
    activePage,
    setActiveProfileId,
    updateProfile,
    deleteProfile,
    isEditorOpen,
    setIsEditorOpen,
    setIsCreateModalOpen,
    saveStatus,
    saveError,
  } = useProfile();

  const [selectedPage, setSelectedPage] = useState<PageId>(activePage);
  const [editedProfile, setEditedProfile] = useState<DesignProfile>(activeProfile);
  const [activeTab, setActiveTab] = useState<"presets" | "parameters" | "manage">("presets");

  // Keep local editor state in sync when active profile or page changes
  useEffect(() => {
    setSelectedPage(activePage);
  }, [activePage]);

  useEffect(() => {
    setEditedProfile(activeProfile);
  }, [activeProfile]);

  if (!isEditorOpen) return null;

  const currentPageConfig: AnimationConfig =
    editedProfile.pages?.[selectedPage] || {
      entrancePreset: "original",
      heroPreset: "original",
      scrollPreset: "original",
      cardHoverPreset: "original",
      interactionPreset: "original",
      duration: 1.0,
      intensity: 1.0,
      stagger: 0.1,
      reducedMotion: false,
    };

  const handleConfigChange = (key: keyof AnimationConfig, value: unknown) => {
    const updatedPages = {
      ...editedProfile.pages,
      [selectedPage]: {
        ...currentPageConfig,
        [key]: value,
      },
    };

    const updated = {
      ...editedProfile,
      pages: updatedPages,
      updatedAt: new Date().toISOString(),
    };

    setEditedProfile(updated);
  };

  const handleSave = async () => {
    if (editedProfile.isOriginal) {
      alert(
        "Profile 1 (Original Website) is the non-negotiable baseline. Please use 'Create New Profile' to save custom changes."
      );
      return;
    }
    await updateProfile(editedProfile);
  };

  const handleDelete = async () => {
    if (editedProfile.isOriginal) return;
    if (
      confirm(
        `Are you sure you want to delete profile "${editedProfile.name}"? This cannot be undone.`
      )
    ) {
      const ok = await deleteProfile(editedProfile.id);
      if (ok) {
        setIsEditorOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col text-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editor Top Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-display font-black text-lg shadow-md">
              🎛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base text-white">Visual Design Editor</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {editedProfile.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure animations and interaction presets per page
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Status Indicator */}
            {saveStatus === "saving" && (
              <span className="text-xs text-amber-400 font-mono animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Saving...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                ✓ Saved to Server
              </span>
            )}
            {saveError && (
              <span className="text-xs text-rose-400 font-mono">⚠️ {saveError}</span>
            )}

            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Design Editor"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Profile Selector & Page Tabs */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Active Profile Switcher in Editor */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-display font-medium">Editing Profile:</span>
            <select
              value={activeProfileId}
              onChange={(e) => setActiveProfileId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-display font-semibold focus:outline-none focus:border-amber-400"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.isOriginal ? "(Original Baseline)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Target Page Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-slate-400 font-display font-medium mr-1">Target Page:</span>
            {PAGES.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => setSelectedPage(page.id)}
                className={`px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition-all whitespace-nowrap ${
                  selectedPage === page.id
                    ? "bg-amber-400 text-slate-950 shadow-md"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Sub-Header / Nav */}
        <div className="px-6 pt-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("presets")}
              className={`pb-2 font-display font-bold transition-colors border-b-2 ${
                activeTab === "presets"
                  ? "text-amber-400 border-amber-400"
                  : "text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              Animation Presets
            </button>
            <button
              onClick={() => setActiveTab("parameters")}
              className={`pb-2 font-display font-bold transition-colors border-b-2 ${
                activeTab === "parameters"
                  ? "text-amber-400 border-amber-400"
                  : "text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              Timing & Parameters
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`pb-2 font-display font-bold transition-colors border-b-2 ${
                activeTab === "manage"
                  ? "text-amber-400 border-amber-400"
                  : "text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              Profile Info & Actions
            </button>
          </div>

          {/* Quick link to current page preview */}
          {PAGES.find((p) => p.id === selectedPage) && (
            <Link
              href={PAGES.find((p) => p.id === selectedPage)?.href || "/"}
              className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 font-mono mb-1"
              onClick={() => setIsEditorOpen(false)}
            >
              <span>View Page ({selectedPage})</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </div>

        {/* Main Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {activeTab === "presets" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Entrance Animations */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <label className="block font-display font-bold text-amber-300">
                  ✨ Page Entrance Animation
                </label>
                <select
                  value={currentPageConfig.entrancePreset}
                  onChange={(e) => handleConfigChange("entrancePreset", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-body focus:border-amber-400"
                >
                  <option value="original">Original Baseline (No override)</option>
                  <option value="cinematic-fade">Cinematic Fade & Scale</option>
                  <option value="slide-up">Smooth Slide Up</option>
                  <option value="zoom-bounce">Zoom & Spring Bounce</option>
                  <option value="stagger-reveal">Staggered Element Reveal</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Controls how section elements reveal when navigating to this page.
                </p>
              </div>

              {/* Hero Section Animation */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <label className="block font-display font-bold text-amber-300">
                  🚀 Hero Section Style
                </label>
                <select
                  value={currentPageConfig.heroPreset}
                  onChange={(e) => handleConfigChange("heroPreset", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-body focus:border-amber-400"
                >
                  <option value="original">Original Baseline</option>
                  <option value="3d-float">3D Floating & Particle Atmosphere</option>
                  <option value="glowing-aura">Glowing Radial Accent</option>
                  <option value="subtle-pulse">Subtle Breathing Pulse</option>
                  <option value="minimal">Minimal Static Hero</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Controls visual effects and hero container background dynamics.
                </p>
              </div>

              {/* Scroll Triggered Animations */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <label className="block font-display font-bold text-amber-300">
                  📜 Scroll Reveal Pattern
                </label>
                <select
                  value={currentPageConfig.scrollPreset}
                  onChange={(e) => handleConfigChange("scrollPreset", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-body focus:border-amber-400"
                >
                  <option value="original">Original Baseline</option>
                  <option value="parallax-slide">Parallax Slide & Shift</option>
                  <option value="fade-in-up">Fade In Upwards</option>
                  <option value="staggered-cards">Staggered Card Wave</option>
                  <option value="off">Instant (Off)</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Determines how sub-sections animate into view as user scrolls down.
                </p>
              </div>

              {/* Subject Card Animations */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <label className="block font-display font-bold text-amber-300">
                  🎴 Card & Item Hover Style
                </label>
                <select
                  value={currentPageConfig.cardHoverPreset}
                  onChange={(e) => handleConfigChange("cardHoverPreset", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-body focus:border-amber-400"
                >
                  <option value="original">Original Baseline</option>
                  <option value="lift-glow">Lift & Amber Glow Shadow</option>
                  <option value="3d-tilt">3D Perspective Tilt</option>
                  <option value="border-pulse">Border Neon Pulse</option>
                  <option value="subtle">Subtle Darken</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Styles interactivity for department cards, feature modules, and buttons.
                </p>
              </div>
            </div>
          )}

          {activeTab === "parameters" && (
            <div className="space-y-5">
              {/* Duration Multiplier Slider */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-display font-bold text-amber-300">
                    ⏱️ Animation Duration Multiplier
                  </label>
                  <span className="font-mono text-amber-400 font-bold">
                    {currentPageConfig.duration}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={currentPageConfig.duration}
                  onChange={(e) => handleConfigChange("duration", parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Fast (0.5x)</span>
                  <span>Normal (1.0x)</span>
                  <span>Cinematic Slow (2.0x)</span>
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-display font-bold text-amber-300">
                    💥 Motion Intensity Factor
                  </label>
                  <span className="font-mono text-amber-400 font-bold">
                    {currentPageConfig.intensity}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={currentPageConfig.intensity}
                  onChange={(e) => handleConfigChange("intensity", parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Subtle (0.5x)</span>
                  <span>Standard (1.0x)</span>
                  <span>High Impact (2.0x)</span>
                </div>
              </div>

              {/* Stagger Delay Slider */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-display font-bold text-amber-300">
                    🌊 Stagger Delay (Seconds between elements)
                  </label>
                  <span className="font-mono text-amber-400 font-bold">
                    {currentPageConfig.stagger}s
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={currentPageConfig.stagger}
                  onChange={(e) => handleConfigChange("stagger", parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Reduced Motion Toggle */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between">
                <div>
                  <label className="block font-display font-bold text-amber-300">
                    ♿ Respect Reduced Motion Preference
                  </label>
                  <p className="text-[10px] text-slate-400">
                    Force disable dynamic animations for users with motion sensitivity.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleConfigChange("reducedMotion", !currentPageConfig.reducedMotion)
                  }
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                    currentPageConfig.reducedMotion ? "bg-amber-400" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      currentPageConfig.reducedMotion ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === "manage" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <h4 className="font-display font-bold text-amber-300">Profile Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[10px]">Profile Name</label>
                    <input
                      type="text"
                      disabled={editedProfile.isOriginal}
                      value={editedProfile.name}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-body"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px]">Description</label>
                    <input
                      type="text"
                      disabled={editedProfile.isOriginal}
                      value={editedProfile.description}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-body"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-700">
                  <span>ID: {editedProfile.id}</span>
                  <span>Author: {editedProfile.modifiedBy}</span>
                  <span>
                    Updated:{" "}
                    {editedProfile.updatedAt
                      ? new Date(editedProfile.updatedAt).toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              {!editedProfile.isOriginal && (
                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 font-display font-semibold transition-colors"
                  >
                    🗑️ Delete Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditorOpen(false);
                      setIsCreateModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-display font-semibold"
                  >
                    Duplicate Profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Editor Bottom Save Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            {editedProfile.isOriginal ? (
              <span className="text-emerald-400">
                🔒 Profile 1 (Original) is locked to preserve baseline.
              </span>
            ) : (
              <span>Changes apply live to browser preview. Click Save to persist.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-display font-semibold transition-colors text-xs"
            >
              Close
            </button>

            {!editedProfile.isOriginal && (
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-xs transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>Save Profile Settings</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
