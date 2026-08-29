"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";

interface Options {
  pin: boolean;
  scrollLengthVh: number;
}

/**
 * Drives one master ScrollTrigger over `wrapperRef` and exposes the current
 * progress as a mutable ref (0..1). Reading a ref instead of state avoids a
 * React re-render on every scroll tick — the 3D scene reads it directly
 * inside useFrame, which is where a value that changes 60x/sec belongs.
 */
export function useScrollProgress(
  wrapperRef: RefObject<HTMLElement | null>,
  { pin, scrollLengthVh }: Options
) {
  const progressRef = useRef(0);

  useEffect(() => {
    ensureGsapRegistered();
    const el = wrapperRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${scrollLengthVh}%`,
      pin,
      pinSpacing: pin,
      scrub: 0.4,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [wrapperRef, pin, scrollLengthVh]);

  return progressRef;
}
