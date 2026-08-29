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
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const progressRef = useScrollProgress(wrapperRef, {
    pin: !reducedMotion,
    scrollLengthVh: reducedMotion ? 140 : 280,
  });

  useEffect(() => {
    ensureGsapRegistered();
    const el = wrapperRef.current;
    const caption = captionRef.current;
    const indicator = scrollIndicatorRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (caption) {
        gsap.to(caption, {
          autoAlpha: 0,
          y: -16,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=25%",
            scrub: true,
          },
        });
      }

      if (indicator) {
        gsap.to(indicator, {
          autoAlpha: 0,
          y: 12,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=15%",
            scrub: true,
          },
        });
      }
    }, wrapperRef);

    return () => {
      ctx.revert();
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

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10 z-10">
        <div />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div ref={captionRef} className="max-w-xl">
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              MathsWithSD
            </h1>
            <p className="mt-2 text-base sm:text-lg text-ink/80 font-body leading-relaxed">
              Learn mathematics with Soumen Sir — real classroom experience &amp; conceptual problem-solving.
            </p>
          </div>

          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-2 text-ink/70 font-display text-xs tracking-widest uppercase animate-bounce self-start sm:self-auto"
          >
            <span>Scroll to explore</span>
            <svg
              className="w-4 h-4 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      <span className="sr-only">
        A cinematic introduction: the camera moves through Soumen Sir&apos;s classroom toward
        the whiteboard as you scroll.
      </span>
    </section>
  );
}
