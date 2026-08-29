"use client";

import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;

export interface ViewportInfo {
  width: number;
  height: number;
  aspect: number;
  isMobile: boolean;
}

function readViewport(): ViewportInfo {
  if (typeof window === "undefined") {
    return { width: 1920, height: 1080, aspect: 1920 / 1080, isMobile: false };
  }
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    aspect: width / height,
    isMobile: width < MOBILE_BREAKPOINT,
  };
}

export function useViewportInfo(): ViewportInfo {
  const [viewport, setViewport] = useState<ViewportInfo>(readViewport);

  useEffect(() => {
    const onResize = () => setViewport(readViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return viewport;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}
