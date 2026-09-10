"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CinematicLoaderCanvas } from "./CinematicLoaderCanvas";
import { LoaderHUD } from "./LoaderHUD";
import { loaderAudio } from "./loaderAudio";

interface CinematicLoaderProps {
  onStartTransition?: () => void;
  onComplete?: () => void;
}

export function CinematicLoader({
  onStartTransition,
  onComplete,
}: CinematicLoaderProps) {
  const [elapsedTimeMs, setElapsedTimeMs] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDestroyed, setIsDestroyed] = useState(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      setElapsedTimeMs(elapsed);

      if (elapsed < 4300) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleStartTransition = useCallback(() => {
    setIsTransitioning(true);
    if (onStartTransition) onStartTransition();
  }, [onStartTransition]);

  const handleTransitionFinished = useCallback(() => {
    setIsVisible(false);
    loaderAudio.stopAll();
    setTimeout(() => {
      setIsDestroyed(true);
      if (onComplete) onComplete();
    }, 700);
  }, [onComplete]);

  const handleUserClick = useCallback(() => {
    loaderAudio.startAmbient();
  }, []);

  if (isDestroyed) return null;

  return (
    <div
      onClick={handleUserClick}
      className={`fixed inset-0 z-[99999] bg-black text-white transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isVisible && !isTransitioning
          ? "opacity-100 pointer-events-auto"
          : isVisible && isTransitioning
          ? "opacity-0 pointer-events-none"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <CinematicLoaderCanvas
        elapsedTimeMs={elapsedTimeMs}
        isTransitioning={isTransitioning}
        onStartTransition={handleStartTransition}
        onTransitionFinished={handleTransitionFinished}
      />
      <LoaderHUD />
    </div>
  );
}
