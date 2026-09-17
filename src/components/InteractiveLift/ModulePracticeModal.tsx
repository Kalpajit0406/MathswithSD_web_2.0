"use client";

import React, { useState } from "react";
import Image from "next/image";

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

interface ModulePracticeModalProps {
  module: ModuleData | null;
  onClose: () => void;
}

export function ModulePracticeModal({ module, onClose }: ModulePracticeModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  React.useEffect(() => {
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
        className="relative w-full max-w-2xl bg-slate-900 border-2 border-sky-500/40 rounded-3xl shadow-2xl text-white p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto cursor-default"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
          title="Close Modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold font-display text-xl shadow-lg">
            ∑
          </div>
          <div>
            <span className="text-xs font-display font-semibold uppercase tracking-widest text-sky-400">
              {module.tag} • {module.level}
            </span>
            <h3 className="text-2xl font-bold font-display text-white">{module.name}</h3>
          </div>
        </div>

        {/* Core Formula Box */}
        <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 mb-6 relative overflow-hidden">
          <div className="text-[11px] font-display font-bold text-amber-400 uppercase tracking-widest mb-1">
            KEY CONCEPT FORMULA
          </div>
          <div className="font-mono text-lg sm:text-xl text-cyan-300 font-bold">
            {module.formula}
          </div>
        </div>

        {/* Soumen Sir Guidance Box */}
        <div className="flex items-start gap-4 bg-sky-950/40 border border-sky-500/30 rounded-2xl p-4 mb-6">
          <div className="relative w-12 h-12 shrink-0 rounded-full border-2 border-sky-400 overflow-hidden bg-slate-900">
            <Image
              src="/assets/cinematic/soumen_thumbsup.png"
              alt="Soumen Sir"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-display font-bold text-sky-400 uppercase tracking-wider mb-1">
              Soumen Sir&apos;s Pro Tip
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-body">
              &quot;{module.sampleQuestion.hint}&quot;
            </p>
          </div>
        </div>

        {/* Interactive Practice Question */}
        <div className="space-y-4">
          <h4 className="text-sm font-display font-bold text-slate-300 uppercase tracking-wider">
            Interactive Practice Question
          </h4>
          <p className="text-base font-body text-white bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {module.sampleQuestion.question}
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {module.sampleQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOption(idx);
                    setShowExplanation(true);
                  }}
                  className={`p-3 text-left rounded-xl border font-mono text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? isCorrect
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-rose-950/80 border-rose-500 text-rose-300"
                      : "bg-slate-800/80 border-slate-700 hover:border-sky-400 hover:bg-slate-800 text-slate-200"
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <span className="text-xs font-bold font-display px-2 py-0.5 rounded-md bg-white/10">
                      {isCorrect ? "✓ Correct" : "✕ Try Again"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation / Breakdown */}
          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-body leading-relaxed animate-fadeIn ${
              isCorrect ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-200" : "bg-amber-950/50 border-amber-500/50 text-amber-200"
            }`}>
              <span className="font-bold font-display uppercase tracking-wider block mb-1">
                {isCorrect ? "🎉 Great Job!" : "💡 Solution Hint:"}
              </span>
              {module.sampleQuestion.explanation}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>MathsWithSD Module Preview</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-sky-500 text-slate-950 font-display font-bold hover:bg-sky-400 transition-all shadow-md"
          >
            Continue Exploring
          </button>
        </div>

      </div>
    </div>
  );
}
