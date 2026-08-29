"use client";

import { useEffect, useRef } from "react";
import { CinematicCanvas } from "./CinematicCanvas";
import { useScrollProgress } from "./useScrollProgress";
import { usePrefersReducedMotion } from "./responsive";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";

const REDUCED_MOTION_SCALE = 0.3;

export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const progressRef = useScrollProgress(wrapperRef, {
    pin: !reducedMotion,
    scrollLengthVh: reducedMotion ? 140 : 280,
  });

  // Small independent fade for the on-screen caption/H1 — decoupled from
  // the 3D scene since it's a plain DOM opacity tween.
  useEffect(() => {
    ensureGsapRegistered();
    const el = wrapperRef.current;
    const caption = captionRef.current;
    if (!el || !caption) return;

    const tween = gsap.to(caption, {
      autoAlpha: 0,
      y: -12,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=25%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative h-screen w-full overflow-hidden bg-board"
    >
      <CinematicCanvas
        progressRef={progressRef}
        motionScale={reducedMotion ? REDUCED_MOTION_SCALE : 1}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
        <div ref={captionRef} className="max-w-xl">
          <h1 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-ink">
            MathsWithSD
          </h1>
          <p className="mt-1 text-sm sm:text-base text-ink/70">
            Learn mathematics with Soumen Sir — real classroom, real problem-solving.
          </p>
        </div>
      </div>

      <span className="sr-only">
        A cinematic introduction: the camera moves through Soumen Sir&apos;s classroom toward
        the whiteboard as you scroll.
      </span>
    </section>
  );
}
