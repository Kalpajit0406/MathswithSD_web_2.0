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
          dynamicClasses = "animate-fade-in-scale";
          inlineStyles.animationDuration = `${duration}s`;
          break;
        case "slide-up":
          dynamicClasses = "animate-slide-up-entrance";
          inlineStyles.animationDuration = `${duration}s`;
          break;
        case "zoom-bounce":
          dynamicClasses = "animate-zoom-bounce";
          inlineStyles.animationDuration = `${duration * 1.1}s`;
          break;
        case "stagger-reveal":
          dynamicClasses = "animate-fade-in-scale";
          inlineStyles.animationDuration = `${duration * 1.2}s`;
          break;
        case "original":
        default:
          break;
      }
    } else if (presetType === "hero") {
      switch (activeConfig.heroPreset) {
        case "3d-float":
          dynamicClasses = "animate-float-gentle hover:-translate-y-1 transition-transform duration-300";
          break;
        case "glowing-aura":
          dynamicClasses = "relative overflow-hidden";
          inlineStyles.boxShadow = `0 0 ${Math.round(28 * intensity)}px rgba(153, 27, 27, 0.25)`;
          inlineStyles.borderColor = "rgba(153, 27, 27, 0.4)";
          break;
        case "subtle-pulse":
          dynamicClasses = "animate-subtle-pulse-glow";
          inlineStyles.animationDuration = `${Math.max(1.5, 3.5 / duration)}s`;
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
            "hover:-translate-y-2 hover:shadow-xl hover:shadow-red-950/15 hover:border-[#991b1b]/50 transition-all duration-300";
          break;
        case "3d-tilt":
          dynamicClasses =
            "hover:scale-[1.02] hover:-rotate-0.5 transition-all duration-300 shadow-md";
          break;
        case "border-pulse":
          dynamicClasses =
            "hover:ring-2 hover:ring-[#991b1b]/60 hover:ring-offset-2 transition-all duration-300";
          break;
        case "subtle":
          dynamicClasses = "hover:opacity-95 hover:bg-white transition-all duration-200";
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
