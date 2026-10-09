"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useProfile } from "@/context/ProfileContext";

export function CinematicTriggerIntro() {
  const { activeProfileId, activeProfile } = useProfile();

  // Activate ONLY when Profile 3 is selected
  const isProfile3Active =
    activeProfileId === "profile-3" || activeProfile?.id === "profile-3";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  // Reset intro state every time Profile 3 is activated or profile changes
  useEffect(() => {
    if (isProfile3Active) {
      setHasTriggered(false);
      setIsCompleted(false);
      setVideoTime(0);
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        } catch {
          // Ignore seeking errors
        }
      }
    }
  }, [isProfile3Active, activeProfileId]);

  // Lock body scroll during intro presentation
  useEffect(() => {
    if (!isProfile3Active) return;

    if (!isCompleted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isProfile3Active, isCompleted]);

  // Handle video playback trigger
  const triggerPlayback = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video
        .play()
        .catch((err) => console.warn("Scroll-triggered video play error:", err));
    }
  }, [hasTriggered]);

  // Scroll / Wheel / Touch trigger listeners
  useEffect(() => {
    if (!isProfile3Active || hasTriggered) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 5 || e.deltaY < -5) {
        triggerPlayback();
      }
    };

    const handleTouch = () => {
      triggerPlayback();
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [isProfile3Active, hasTriggered, triggerPlayback]);

  // Monitor video progress and handle metadata
  useEffect(() => {
    if (!isProfile3Active) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const handleMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => {
      setVideoTime(video.currentTime);
      if (video.duration && video.currentTime >= video.duration - 0.2) {
        setIsCompleted(true);
        document.body.style.overflow = "auto";
      }
    };

    const handleEnded = () => {
      setIsCompleted(true);
      document.body.style.overflow = "auto";
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 1) {
      handleMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isProfile3Active]);

  if (!isProfile3Active || isCompleted) {
    return null;
  }

  // Cloud parting calculation (fades out as video starts)
  const cloudOpacity = hasTriggered ? Math.max(0, 1 - (videoTime / 1.5)) : 1;
  const cloudOffsetLeft = hasTriggered ? Math.min(100, (videoTime / 1.5) * 100) : 0;
  const cloudOffsetRight = hasTriggered ? Math.min(100, (videoTime / 1.5) * 100) : 0;

  // Final sequence crossfade calculation (last 2.5s of video)
  const remainingTime = videoDuration > 0 ? videoDuration - videoTime : 10;
  const fadeProgress = remainingTime < 2.5 ? Math.min(1, (2.5 - remainingTime) / 2.5) : 0;
  const videoBlur = fadeProgress * 8; // Restrained blur (0px to 8px)
  const videoOpacity = Math.max(0, 1 - fadeProgress * 1.05);

  return (
    <div className="fixed inset-0 w-full h-full z-40 overflow-hidden pointer-events-auto bg-slate-950">
      {/* Enhanced Video Element - Plays Continuously Once Triggered */}
      <video
        ref={videoRef}
        src="/assets/cinematic/Opening Video.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
        style={{
          filter: `contrast(1.10) brightness(1.08) saturate(1.06) blur(${videoBlur}px)`,
          opacity: videoOpacity,
        }}
      />

      {/* Atmospheric Overlay Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40"
        style={{ opacity: videoOpacity }}
      />

      {/* Opening Parting Cloud Mist Overlay */}
      {cloudOpacity > 0.01 && (
        <div
          className="absolute inset-0 z-20 flex pointer-events-none overflow-hidden"
          style={{ opacity: cloudOpacity }}
        >
          {/* Left Cloud Mist Layer */}
          <div
            className="w-1/2 h-full bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/70 backdrop-blur-2xl transition-transform duration-700 ease-out flex items-center justify-end pr-8"
            style={{
              transform: `translateX(-${cloudOffsetLeft}%)`,
              boxShadow: "30px 0 60px rgba(0,0,0,0.9)",
            }}
          >
            <div className="w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
          </div>

          {/* Right Cloud Mist Layer */}
          <div
            className="w-1/2 h-full bg-gradient-to-l from-slate-950 via-slate-900 to-amber-950/70 backdrop-blur-2xl transition-transform duration-700 ease-out flex items-center justify-start pl-8"
            style={{
              transform: `translateX(${cloudOffsetRight}%)`,
              boxShadow: "-30px 0 60px rgba(0,0,0,0.9)",
            }}
          >
            <div className="w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
          </div>

          {/* Opening Badge & Trigger Prompt */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4 pointer-events-auto cursor-pointer"
            onClick={triggerPlayback}
            style={{ opacity: cloudOpacity }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-display text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Profile 3 — Scroll-Triggered Cinematic Playback</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase drop-shadow-2xl">
              SCHOLARS <span className="text-amber-400">HUB</span>
            </h1>
            <div className="pt-2">
              <button
                type="button"
                onClick={triggerPlayback}
                className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold text-xs tracking-wider uppercase transition-all shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <span>Scroll or Click to Play Intro</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
