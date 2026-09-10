"use client";

import React, { useState, useEffect } from "react";
import { loaderAudio } from "./loaderAudio";

export function LoaderHUD() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(loaderAudio.getMuted());
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    loaderAudio.setMuted(nextMuted);
    if (!nextMuted) {
      loaderAudio.startAmbient();
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex justify-between items-start p-6 sm:p-10 z-20 font-display select-none">
      {/* Brand Minimal Identifier */}
      <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-amber-200/50">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_6px_#ffd700]" />
        <span className="font-semibold text-amber-100/70">MATHSWITHSD</span>
      </div>

      {/* Subtle Audio Toggle Button */}
      <button
        onClick={toggleSound}
        type="button"
        className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-black/40 backdrop-blur-md text-amber-300/80 hover:text-amber-100 hover:border-amber-400/50 transition-all duration-300 text-[10px] tracking-widest uppercase"
        title={isMuted ? "Unmute audio" : "Mute audio"}
      >
        <span>{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
      </button>
    </div>
  );
}
