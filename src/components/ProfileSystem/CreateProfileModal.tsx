"use client";

import React, { useState } from "react";
import { useProfile } from "@/context/ProfileContext";

export function CreateProfileModal() {
  const {
    profiles,
    activeProfileId,
    createProfile,
    isCreateModalOpen,
    setIsCreateModalOpen,
    developerName,
    setDeveloperName,
  } = useProfile();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sourceProfileId, setSourceProfileId] = useState<string>(activeProfileId);
  const [author, setAuthor] = useState(developerName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isCreateModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter a profile name.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    if (author.trim()) {
      setDeveloperName(author.trim());
    }

    const created = await createProfile(
      name.trim(),
      description.trim(),
      sourceProfileId,
      author.trim() || developerName
    );

    setIsSubmitting(false);

    if (created) {
      setName("");
      setDescription("");
      setIsCreateModalOpen(false);
    } else {
      setErrorMsg("Failed to create profile. Please check server logs or try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsCreateModalOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-5 text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-display font-black text-sm shadow-md">
              <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Create Design Profile</h3>
              <p className="text-xs text-slate-400">
                Experiment with customized page animations and themes
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Profile Name */}
          <div>
            <label className="block font-display font-bold text-slate-200 mb-1">
              Profile Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Profile 5 — Dynamic Spring Animations"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-body"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-display font-bold text-slate-200 mb-1">
              Description / Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what this experimental design profile tests..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-body"
            />
          </div>

          {/* Base Template Selection */}
          <div>
            <label className="block font-display font-bold text-slate-200 mb-1">
              Base Template (Copy initial visual config from)
            </label>
            <select
              value={sourceProfileId}
              onChange={(e) => setSourceProfileId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-body"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.isOriginal ? "(Baseline Original)" : ""}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 mt-1">
              Copies configuration snapshot into an independent profile with no live link.
            </p>
          </div>

          {/* Developer Alias */}
          <div>
            <label className="block font-display font-bold text-slate-200 mb-1">
              Developer Alias / Team Name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Alex (UI Engineer)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-body"
            />
          </div>

          {/* Submit / Cancel Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-display font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Creating Profile...</span>
              ) : (
                <>
                  <span>Create & Activate</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
