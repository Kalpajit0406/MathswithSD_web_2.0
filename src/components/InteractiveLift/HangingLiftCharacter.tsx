"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export type CartoonPose =
  | "pointing"
  | "thumbsup"
  | "thinking"
  | "laptop"
  | "confident"
  | "tablet";

export interface PoseDetail {
  id: CartoonPose;
  name: string;
  image: string;
  badge: string;
  defaultSpeech: string;
}

export const POSES: Record<CartoonPose, PoseDetail> = {
  pointing: {
    id: "pointing",
    name: "Let's Build This!",
    image: "/assets/cinematic/soumen_pointing.png",
    badge: "Interactive Pointer",
    defaultSpeech: "Let's build strong mathematical foundations together!",
  },
  thumbsup: {
    id: "thumbsup",
    name: "You Got This!",
    image: "/assets/cinematic/soumen_thumbsup.png",
    badge: "Encourager",
    defaultSpeech: "Keep going! Practice makes concepts crystal clear.",
  },
  thinking: {
    id: "thinking",
    name: "Ideas → Reality",
    image: "/assets/cinematic/soumen_thinking.png",
    badge: "Problem Solver",
    defaultSpeech: "Let's break this complex formula into intuitive steps.",
  },
  laptop: {
    id: "laptop",
    name: "Code Create Impact",
    image: "/assets/cinematic/soumen_laptop.png",
    badge: "Computational Math",
    defaultSpeech: "Mathematics is the backbone of technology & real-world algorithms.",
  },
  confident: {
    id: "confident",
    name: "Stronger Together",
    image: "/assets/cinematic/soumen_confident.png",
    badge: "Mentor",
    defaultSpeech: "Master board exams & competitive entrance tests with confidence!",
  },
  tablet: {
    id: "tablet",
    name: "Smarter Solutions",
    image: "/assets/cinematic/soumen_tablet.png",
    badge: "Analytics & Growth",
    defaultSpeech: "Track your progress and target high-yield problem areas!",
  },
};

interface HangingLiftCharacterProps {
  currentPose?: CartoonPose;
  targetModuleName?: string;
  speechText?: string;
  offsetY?: number; // relative px offset to align with active module card
  onSelectPose?: (pose: CartoonPose) => void;
  showLaserPointer?: boolean;
}

export function HangingLiftCharacter({
  currentPose = "pointing",
  targetModuleName,
  speechText,
  offsetY = 0,
  onSelectPose,
  showLaserPointer = true,
}: HangingLiftCharacterProps) {
  const poseInfo = POSES[currentPose] || POSES.pointing;
  const activeSpeech = speechText || (targetModuleName 
    ? `Focusing on ${targetModuleName}! Click 'Explore' to see key formulas & step-by-step guidance.` 
    : poseInfo.defaultSpeech);

  const [coolingTemp, setCoolingTemp] = useState(24.5);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Synchronized thermal cooling fluctuation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCoolingTemp(+(24 + Math.sin(Date.now() / 1500) * 0.8).toFixed(1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const speakMessage = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeSpeech);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
      setIsAudioActive(true);
      utterance.onend = () => setIsAudioActive(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center transition-transform duration-700 ease-out z-30"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      {/* Dynamic Suspension Cables (Extending upwards) */}
      <div className="absolute -top-60 left-0 right-0 flex justify-between px-8 pointer-events-none h-60 overflow-hidden">
        {/* Left Heavy Cable */}
        <div className="w-1.5 bg-gradient-to-b from-black/80 via-slate-700 to-amber-500/80 h-full relative animate-cable-tension">
          <div className="absolute top-0 -left-1.5 w-4 h-4 rounded-full border-2 border-slate-700 bg-slate-900 shadow-md" />
        </div>
        {/* Right Heavy Cable */}
        <div className="w-1.5 bg-gradient-to-b from-black/80 via-slate-700 to-amber-500/80 h-full relative animate-cable-tension">
          <div className="absolute top-0 -left-1.5 w-4 h-4 rounded-full border-2 border-slate-700 bg-slate-900 shadow-md" />
        </div>
      </div>

      {/* Main Floating Synchronized Lift Container */}
      <div className="relative w-80 sm:w-96 animate-lift-float">
        
        {/* Pointer Laser Beam towards Module (when pointing) */}
        {showLaserPointer && currentPose === "pointing" && (
          <div className="absolute top-28 -right-24 sm:-right-40 w-28 sm:w-44 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-transparent rounded-full blur-[1px] animate-pulse pointer-events-none z-40">
            <div className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          </div>
        )}

        {/* Speech Bubble Header */}
        <div className="relative mb-3 animate-speech-pop">
          <div className="bg-slate-900/95 text-white p-4 rounded-2xl border-2 border-sky-400/50 shadow-2xl backdrop-blur-xl relative">
            {/* Top Badge & Voice Toggle */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
              <span className="flex items-center gap-1.5 font-display font-bold text-sky-400 uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Soumen Sir (AI Guide)
              </span>
              <button
                onClick={speakMessage}
                title="Listen to Soumen Sir"
                className={`p-1 px-2 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-all ${
                  isAudioActive
                    ? "bg-sky-500 text-white animate-pulse"
                    : "bg-white/10 hover:bg-white/20 text-slate-200"
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>{isAudioActive ? "Speaking..." : "Listen"}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-body leading-relaxed">
              &quot;{activeSpeech}&quot;
            </p>

            {/* Speech Bubble Arrow pointing down to character */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 border-sky-400/50 rotate-45" />
          </div>
        </div>

        {/* Lift Scaffold Frame */}
        <div className="relative bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-slate-950/95 border-2 border-slate-700/80 rounded-3xl p-4 shadow-2xl backdrop-blur-md overflow-hidden">
          
          {/* Suspension Hooks Top */}
          <div className="flex justify-between items-center px-4 -mt-2 mb-2">
            <div className="w-6 h-6 rounded-full border-2 border-amber-400/80 bg-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              LIFT-SD // SYNC ACTIVE
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-amber-400/80 bg-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Character Stage / Open Lift Platform */}
          <div className="relative h-64 sm:h-72 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-slate-800">
            
            {/* Background Grid & Classroom Vibe */}
            <div 
              className="absolute inset-0 opacity-20" 
              style={{ 
                backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                backgroundSize: '16px 16px' 
              }} 
            />

            {/* Cartoon Character Display */}
            <div className="relative w-full h-full flex items-center justify-center p-2 z-10 transition-all duration-500">
              <Image
                src={poseInfo.image}
                alt={poseInfo.name}
                width={360}
                height={480}
                priority
                className="max-h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Industrial Side Railings */}
            <div className="absolute inset-y-0 left-2 w-1.5 bg-gradient-to-b from-amber-500/50 via-slate-600 to-amber-500/50 rounded-full" />
            <div className="absolute inset-y-0 right-2 w-1.5 bg-gradient-to-b from-amber-500/50 via-slate-600 to-amber-500/50 rounded-full" />
          </div>

          {/* Integrated Synchronized Cooling Pack Base */}
          <div className="mt-3 relative rounded-2xl border-2 border-sky-500/60 bg-slate-950 p-3 animate-cooling-pulse overflow-hidden">
            
            {/* Background Cooling Ambient Glow */}
            <div className="absolute -inset-1 bg-sky-500/20 blur-md rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-3">
              {/* Spinning Cooling Fan */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-slate-900 border border-sky-400 flex items-center justify-center relative shadow-inner">
                  <svg className="w-6 h-6 text-sky-400 animate-fan-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4m12.728-4.728L7.272 16.728m0-12.728l12.728 12.728" />
                  </svg>
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 absolute" />
                </div>
                <div>
                  <div className="text-[10px] font-display font-bold text-sky-400 tracking-wider uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    COOLING PACK ACTIVE
                  </div>
                  <div className="text-[11px] font-mono text-slate-300">
                    SYNC SPEED: <span className="text-cyan-300 font-bold">100%</span> | {coolingTemp}°C
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="px-2.5 py-1 rounded-full bg-sky-950/80 border border-sky-500/40 text-[10px] font-mono font-bold text-sky-300 uppercase tracking-widest shrink-0">
                LIFT OPTIMAL
              </div>
            </div>
          </div>

          {/* Interactive Pose Switcher Bar */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
            <span className="text-[10px] font-display font-semibold text-slate-400 uppercase tracking-wider px-1">
              Poses:
            </span>
            <div className="flex items-center gap-1">
              {(Object.keys(POSES) as CartoonPose[]).map((pKey) => {
                const p = POSES[pKey];
                const isActive = pKey === currentPose;
                return (
                  <button
                    key={pKey}
                    onClick={() => onSelectPose && onSelectPose(pKey)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-display font-semibold transition-all ${
                      isActive
                        ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                    title={p.name}
                  >
                    {pKey === "pointing" ? "👉 Point" : pKey === "thumbsup" ? "👍 Great" : pKey === "thinking" ? "💡 Think" : pKey === "laptop" ? "💻 Code" : pKey === "confident" ? "💪 Ready" : "📊 Stats"}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
