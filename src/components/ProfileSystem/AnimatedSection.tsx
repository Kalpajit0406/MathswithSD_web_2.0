"use client";

import React, { useMemo } from "react";
import { useProfile } from "@/context/ProfileContext";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  presetType?: "entrance" | "hero" | "scroll" | "cardHover";
  style?: React.CSSProperties;
}

export function AnimatedSection({
  children,
  className = "",
  presetType = "entrance",
  style = {},
}: AnimatedSectionProps) {
  const { activeConfig } = useProfile();

  const animationStyle = useMemo(() => {
    // If reduced motion is forced or detected
    if (activeConfig.reducedMotion) {
      return style;
    }

    const duration = (activeConfig.duration || 1.0) * 0.6; // Base duration scaling
    const intensity = activeConfig.intensity || 1.0;

    let dynamicClasses = "";
    const inlineStyles: React.CSSProperties = { ...style };

    if (presetType === "entrance") {
      switch (activeConfig.entrancePreset) {
        case "cinematic-fade":
          dynamicClasses = "transition-all ease-out animate-fade-in-scale";
          inlineStyles.transitionDuration = `${duration}s`;
          break;
        case "slide-up":
          dynamicClasses = "transition-transform ease-out";
          inlineStyles.transitionDuration = `${duration}s`;
          inlineStyles.transform = `translateY(${Math.round(15 * intensity)}px)`;
          break;
        case "zoom-bounce":
          dynamicClasses = "transition-all cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          inlineStyles.transitionDuration = `${duration * 1.1}s`;
          break;
        case "stagger-reveal":
          dynamicClasses = "transition-opacity ease-in-out";
          inlineStyles.transitionDuration = `${duration}s`;
          break;
        case "original":
        default:
          break;
      }
    } else if (presetType === "hero") {
      switch (activeConfig.heroPreset) {
        case "3d-float":
          dynamicClasses = "animate-pulse hover:translate-y-[-4px] transition-transform duration-500";
          break;
        case "glowing-aura":
          dynamicClasses = "relative overflow-hidden shadow-2xl ring-1 ring-amber-400/40";
          inlineStyles.boxShadow = `0 0 ${Math.round(30 * intensity)}px rgba(251, 191, 36, 0.25)`;
          break;
        case "subtle-pulse":
          dynamicClasses = "animate-pulse";
          inlineStyles.animationDuration = `${3 / duration}s`;
          break;
        case "minimal":
          dynamicClasses = "transition-none";
          break;
        case "original":
        default:
          break;
      }
    } else if (presetType === "cardHover") {
      switch (activeConfig.cardHoverPreset) {
        case "lift-glow":
          dynamicClasses =
            "hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400/80 transition-all duration-300";
          break;
        case "3d-tilt":
          dynamicClasses =
            "hover:scale-[1.03] hover:-rotate-1 transition-all duration-300 shadow-xl";
          break;
        case "border-pulse":
          dynamicClasses =
            "hover:ring-2 hover:ring-amber-400 hover:ring-offset-2 transition-all duration-300";
          break;
        case "subtle":
          dynamicClasses = "hover:opacity-90 transition-opacity duration-200";
          break;
        case "original":
        default:
          break;
      }
    }

    return { dynamicClasses, inlineStyles };
  }, [activeConfig, presetType, style]);

  if (
    activeConfig.entrancePreset === "original" &&
    activeConfig.heroPreset === "original" &&
    activeConfig.scrollPreset === "original" &&
    activeConfig.cardHoverPreset === "original"
  ) {
    return <div className={className} style={style}>{children}</div>;
  }

  const { dynamicClasses, inlineStyles } = animationStyle as {
    dynamicClasses: string;
    inlineStyles: React.CSSProperties;
  };

  return (
    <div className={`${className} ${dynamicClasses}`} style={inlineStyles}>
      {children}
    </div>
  );
}
