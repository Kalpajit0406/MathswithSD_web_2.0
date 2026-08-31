"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";

export function Nav() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const container = containerRef.current;
    const heroEl = document.getElementById("hero-wrapper") || document.body;

    const ctx = gsap.context(() => {
      if (container) {
        gsap.fromTo(
          container,
          {
            backgroundColor: "rgba(233, 229, 218, 0)",
            backdropFilter: "blur(0px)",
            borderColor: "rgba(20, 19, 17, 0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          {
            backgroundColor: "rgba(233, 229, 218, 0.65)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(20, 19, 17, 0.12)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            scrollTrigger: {
              trigger: heroEl,
              start: "top+=5% top",
              end: "top+=70% top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none p-4 sm:p-6 flex justify-center">
      <div
        ref={containerRef}
        className="w-full max-w-7xl flex items-center justify-between px-5 py-3 rounded-full border border-transparent transition-all duration-300"
      >
        <span className="pointer-events-auto font-display text-sm font-medium tracking-[0.2em] text-ink">
          MATHSWITHSD
        </span>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://play.google.com/store/search?q=mathswithsd&c=apps&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-ink/20 bg-board/60 px-3 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-label="Download MathsWithSD app on Google Play"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0 text-ink"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.623.224-1.2.61-1.636zM15.207 13.414l2.586 2.586-12.001 6.929 9.415-9.515zM17.793 10.586l-2.586 2.586-9.415-9.515 12.001 6.929zm1.414 1.414l3.172 1.832a1.2 1.2 0 0 1 0 2.08l-3.172 1.832-2.121-2.122 2.121-2.822z" />
            </svg>
            <span className="font-display text-xs font-semibold tracking-wider text-ink uppercase">
              <span className="hidden sm:inline">Get </span>App
            </span>
          </a>

          <button
            type="button"
            className="pointer-events-auto font-display text-sm font-medium tracking-[0.2em] text-ink transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>
      </div>
    </header>
  );
}
