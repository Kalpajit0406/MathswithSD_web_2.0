"use client";

import React, { useState, useEffect } from "react";
import { TeacherCharacter } from "../TeacherCharacter";

export interface ModuleData {
  id: string;
  name: string;
  tag: string;
  level: string;
  formula: string;
  description: string;
  topics: string[];
  sampleQuestion: {
    question: string;
    hint: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

interface ModuleDetailModalProps {
  module: ModuleData | null;
  onClose: () => void;
}

export function ModuleDetailModal({ module, onClose }: ModuleDetailModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!module) return null;

  const isCorrect = selectedOption === module.sampleQuestion.correctIndex;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#1e2022] border border-stone-700 rounded-3xl shadow-2xl text-white p-6 sm:p-8 overflow-hidden max-h-[88vh] overflow-y-auto cursor-default space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Close Modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-4 pr-10">
          <span className="text-[11px] font-display font-bold uppercase tracking-widest text-amber-400">
            {module.tag} • {module.level}
          </span>
          <h3 className="text-2xl font-bold font-display text-white mt-1">{module.name}</h3>
        </div>

        {/* Core Formula Box */}
        <div className="bg-black/60 border border-[#991b1b]/40 rounded-2xl p-4">
          <div className="text-[10px] font-display font-bold text-amber-400 uppercase tracking-widest mb-1">
            KEY CONCEPT FORMULA
          </div>
          <div className="font-mono text-base sm:text-lg text-amber-300 font-bold">
            {module.formula}
          </div>
        </div>

        {/* Soumen Sir Guidance Box */}
        <div className="flex items-center gap-4 bg-stone-900 border border-stone-800 rounded-2xl p-4">
          <div className="shrink-0">
            <TeacherCharacter pose="thumbsup" height={80} />
          </div>
          <div>
            <div className="text-xs font-display font-bold text-amber-400 uppercase tracking-wider mb-1">
              Soumen Sir&apos;s Tip
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-body">
              &quot;{module.sampleQuestion.hint}&quot;
            </p>
          </div>
        </div>

        {/* Interactive Practice Question */}
        <div className="space-y-3">
          <h4 className="text-xs font-display font-bold text-stone-400 uppercase tracking-wider">
            Interactive Practice Question
          </h4>
          <p className="text-sm font-body text-white bg-black/60 p-4 rounded-xl border border-stone-800">
            {module.sampleQuestion.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {module.sampleQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOption(idx);
                    setShowExplanation(true);
                  }}
                  className={`p-3 text-left rounded-xl border font-mono text-xs transition-all flex items-center justify-between min-h-[44px] ${
                    isSelected
                      ? isCorrect
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-rose-950/80 border-[#991b1b] text-rose-300"
                      : "bg-stone-800/80 border-stone-700 hover:border-amber-400 text-stone-200"
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <span className="text-[10px] font-bold font-display px-2 py-0.5 rounded-md bg-white/10">
                      {isCorrect ? "✓ Correct" : "✕ Try Again"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs font-body leading-relaxed animate-fadeIn ${
              isCorrect ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-200" : "bg-stone-900 border-amber-500/50 text-amber-200"
            }`}>
              <span className="font-bold font-display uppercase tracking-wider block mb-1">
                {isCorrect ? "🎉 Great Job!" : "💡 Solution Explanation:"}
              </span>
              {module.sampleQuestion.explanation}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
          <span>MathsWithSD Module Guidance</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#991b1b] text-white font-display font-bold hover:bg-[#be123c] transition-all shadow-md min-h-[44px]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
