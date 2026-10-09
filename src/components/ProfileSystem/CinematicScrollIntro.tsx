"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProfile } from "@/context/ProfileContext";

export function CinematicScrollIntro() {
  const { activeProfileId, activeProfile } = useProfile();

  // Activate ONLY when Profile 2 is selected
  const isProfile2Active =
    activeProfileId === "profile-2" || activeProfile?.id === "profile-2";

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  // Targets for 60fps smooth interpolation
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  // Handle video metadata
  useEffect(() => {
    if (!isProfile2Active) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.pause();

    const handleLoaded = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
    };

    if (video.readyState >= 1) {
      handleLoaded();
    } else {
      video.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [isProfile2Active]);

  // Reset scroll position on profile activation
  useEffect(() => {
    if (isProfile2Active) {
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      setScrollProgress(0);
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
        } catch {
          // Ignore seek errors
        }
      }
    }
  }, [isProfile2Active, activeProfileId]);

  // Native scroll progress calculation relative to pinned 300vh container
  useEffect(() => {
    if (!isProfile2Active) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableRange = containerRef.current.clientHeight - window.innerHeight;

      if (scrollableRange <= 0) return;

      // Calculate progress from 0.0 at container top to 1.0 at container bottom
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableRange));

      targetProgressRef.current = progress;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isProfile2Active]);

  // High-performance RAF animation loop drawing video to canvas with smooth lerp
  useEffect(() => {
    if (!isProfile2Active) return;

    const renderLoop = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Smooth linear interpolation (lerp) for 60fps fluid scrubbing
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.22;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;

      if (video && videoDuration > 0) {
        const safeTime = Math.max(0.05, Math.min(videoDuration - 0.05, p * videoDuration));
        if (!video.seeking && Math.abs(video.currentTime - safeTime) > 0.03) {
          try {
            video.currentTime = safeTime;
          } catch {
            // Ignore seek errors
          }
        }

        // Draw video frame to canvas
        if (canvas && video.readyState >= 2) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            }

            const vWidth = video.videoWidth || 1920;
            const vHeight = video.videoHeight || 1080;
            const vAspect = vWidth / vHeight;
            const cAspect = canvas.width / canvas.height;

            let drawW = canvas.width;
            let drawH = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (cAspect > vAspect) {
              drawH = canvas.width / vAspect;
              offsetY = (canvas.height - drawH) / 2;
            } else {
              drawW = canvas.height * vAspect;
              offsetX = (canvas.width - drawW) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "contrast(1.10) brightness(1.08) saturate(1.06)";
            ctx.drawImage(video, offsetX, offsetY, drawW, drawH);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isProfile2Active, videoDuration]);

  if (!isProfile2Active) {
    return null;
  }

  // Progressive Stage Calculations
  // Stage 1: Cloud mist opening reveal (0% to 20%)
  const cloudProgress = Math.min(1, scrollProgress / 0.2);
  const cloudOpacity = 1 - cloudProgress;
  const cloudOffsetLeft = -cloudProgress * 100;
  const cloudOffsetRight = cloudProgress * 100;

  // Stage 2: Storytelling overlay badges (25% to 70%)
  const showBadge1 = scrollProgress >= 0.25 && scrollProgress <= 0.55;
  const showBadge2 = scrollProgress >= 0.55 && scrollProgress <= 0.75;

  // Stage 3: Final rightward camera turn & homepage crossfade (75% to 100%)
  const fadeProgress = Math.max(0, (scrollProgress - 0.72) / 0.28);
  const videoBlur = fadeProgress * 8; // Restrained blur (0px to 8px)
  const videoOpacity = Math.max(0, 1 - fadeProgress * 1.05);

  return (
    <div
      ref={containerRef}
      className="relative w-full z-30 pointer-events-none"
      style={{ height: "300vh" }} // 3 viewports of native scroll journey
    >
      {/* Sticky Fullscreen Pinned Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Hidden Source Video Element */}
        <video
          ref={videoRef}
          src="/assets/cinematic/Opening Video.mp4"
          muted
          playsInline
          preload="auto"
          className="hidden"
        />

        {/* High-Performance Canvas Display Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-150 ease-out"
          style={{
            filter: `blur(${videoBlur}px)`,
            opacity: videoOpacity,
            transform: `scale(${1 + scrollProgress * 0.03})`,
          }}
        />

        {/* Atmospheric Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40"
          style={{ opacity: videoOpacity }}
        />

        {/* Stage 1: Parting Cloud Mist Reveal (0% to 20%) */}
        {cloudOpacity > 0.01 && (
          <div
            className="absolute inset-0 z-20 flex pointer-events-none overflow-hidden"
            style={{ opacity: cloudOpacity }}
          >
            {/* Left Cloud Mist Layer */}
            <div
              className="w-1/2 h-full bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/70 backdrop-blur-2xl transition-transform duration-75 ease-out flex items-center justify-end pr-8"
              style={{
                transform: `translateX(${cloudOffsetLeft}%)`,
                boxShadow: "30px 0 60px rgba(0,0,0,0.9)",
              }}
            >
              <div className="w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
            </div>

            {/* Right Cloud Mist Layer */}
            <div
              className="w-1/2 h-full bg-gradient-to-l from-slate-950 via-slate-900 to-amber-950/70 backdrop-blur-2xl transition-transform duration-75 ease-out flex items-center justify-start pl-8"
              style={{
                transform: `translateX(${cloudOffsetRight}%)`,
                boxShadow: "-30px 0 60px rgba(0,0,0,0.9)",
              }}
            >
              <div className="w-96 h-96 rounded-full bg-amber-400/20 blur-3xl" />
            </div>

            {/* Title Overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4"
              style={{ opacity: cloudOpacity }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-display text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Profile 2 — Cinematic Scroll Journey</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase drop-shadow-2xl">
                SCHOLARS <span className="text-amber-400">HUB</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm font-display tracking-widest uppercase font-semibold flex items-center gap-2">
                <span>Scroll Down to Enter Environment</span>
                <svg className="w-4 h-4 text-amber-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </p>
            </div>
          </div>
        )}

        {/* Stage 2: Storytelling Overlays (25% to 75%) */}
        {showBadge1 && (
          <div className="absolute top-1/3 left-8 sm:left-16 z-20 max-w-sm p-6 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-white shadow-2xl space-y-2 animate-in fade-in slide-in-from-left-6 duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              01 / CONCEPTUAL MASTERY
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              Real Teaching &amp; Visual Logic
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-body">
              Transforming abstract mathematics into intuitive, visual understanding.
            </p>
          </div>
        )}

        {showBadge2 && (
          <div className="absolute bottom-1/3 right-8 sm:right-16 z-20 max-w-sm p-6 rounded-2xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-white shadow-2xl space-y-2 animate-in fade-in slide-in-from-right-6 duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              02 / ACADEMIC EXCELLENCE
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              Dedicated Subject Faculties
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-body">
              Rigorous board &amp; competitive entrance examination preparation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
