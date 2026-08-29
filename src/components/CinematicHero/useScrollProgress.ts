"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";

interface Options {
  pin: boolean;
  scrollLengthVh: number;
}

/**
 * Drives one master ScrollTrigger over `wrapperRef` and exposes the current
 * progress as a mutable ref (0..1). Reading a ref instead of state avoids a
 * React re-render on every scroll tick — the 3D scene reads it directly
 * inside useFrame, which is where a value that changes 60x/sec belongs.
 *
 * Uses `gsap.context()` for clean mounting/unmounting in React 19 / Next.js 15,
 * preventing nested `.pin-spacer` bugs that lock document scrolling.
 */
export function useScrollProgress(
  wrapperRef: RefObject<HTMLElement | null>,
  { pin, scrollLengthVh }: Options
) {
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    ensureGsapRegistered();
    const el = wrapperRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${scrollLengthVh}vh`,
        pin,
        pinSpacing: pin,
        anticipatePin: 1,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });
    }, wrapperRef);

    // Smooth ticker to lerp target progress into progressRef for silky-smooth 60fps movement
    const onTicker = () => {
      const diff = targetProgressRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0001) {
        progressRef.current += diff * 0.15;
      } else {
        progressRef.current = targetProgressRef.current;
      }
    };

    gsap.ticker.add(onTicker);

    // Refresh ScrollTrigger once DOM layout finishes settling
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(onTicker);
      ctx.revert();
    };
  }, [wrapperRef, pin, scrollLengthVh]);

  return progressRef;
}
