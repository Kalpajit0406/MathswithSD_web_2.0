export type PageId =
  | "landing"
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "computer-science";

export interface AnimationConfig {
  entrancePreset: "original" | "cinematic-fade" | "slide-up" | "zoom-bounce" | "stagger-reveal";
  heroPreset: "original" | "3d-float" | "glowing-aura" | "subtle-pulse" | "minimal";
  scrollPreset: "original" | "parallax-slide" | "fade-in-up" | "staggered-cards" | "off";
  cardHoverPreset: "original" | "lift-glow" | "3d-tilt" | "border-pulse" | "subtle";
  interactionPreset: "original" | "dynamic" | "subtle" | "none";
  duration: number; // Multiplier: 0.5 to 2.0 (1.0 = normal)
  intensity: number; // Level: 0.5 to 2.0 (1.0 = normal)
  stagger: number; // Delay in seconds: 0 to 0.5
  reducedMotion: boolean;
}

export type ProfilePagesConfig = Record<PageId, AnimationConfig>;

export interface DesignProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
  isOriginal?: boolean;
  pages: ProfilePagesConfig;
}

export const DEFAULT_PAGE_ANIMATION: AnimationConfig = {
  entrancePreset: "original",
  heroPreset: "original",
  scrollPreset: "original",
  cardHoverPreset: "original",
  interactionPreset: "original",
  duration: 1.0,
  intensity: 1.0,
  stagger: 0.1,
  reducedMotion: false,
};

export const DEFAULT_PAGES_CONFIG: ProfilePagesConfig = {
  landing: { ...DEFAULT_PAGE_ANIMATION },
  mathematics: { ...DEFAULT_PAGE_ANIMATION },
  physics: { ...DEFAULT_PAGE_ANIMATION },
  chemistry: { ...DEFAULT_PAGE_ANIMATION },
  biology: { ...DEFAULT_PAGE_ANIMATION },
  "computer-science": { ...DEFAULT_PAGE_ANIMATION },
};

export const INITIAL_PROFILES: DesignProfile[] = [
  {
    id: "profile-1",
    name: "Profile 1 — Original Website",
    description: "The baseline design as it exists in production with original animations and component styling.",
    createdAt: new Date("2026-10-01").toISOString(),
    updatedAt: new Date("2026-10-01").toISOString(),
    modifiedBy: "System Baseline",
    isOriginal: true,
    pages: DEFAULT_PAGES_CONFIG,
  },
  {
    id: "profile-2",
    name: "Profile 2 — Cinematic Animations",
    description: "High-impact entrance reveals, glowing hover cards, and smooth scroll transitions across all pages.",
    createdAt: new Date("2026-10-05").toISOString(),
    updatedAt: new Date("2026-10-08").toISOString(),
    modifiedBy: "Design Team",
    isOriginal: false,
    pages: {
      landing: {
        entrancePreset: "cinematic-fade",
        heroPreset: "3d-float",
        scrollPreset: "parallax-slide",
        cardHoverPreset: "lift-glow",
        interactionPreset: "dynamic",
        duration: 1.2,
        intensity: 1.5,
        stagger: 0.15,
        reducedMotion: false,
      },
      mathematics: {
        entrancePreset: "stagger-reveal",
        heroPreset: "glowing-aura",
        scrollPreset: "staggered-cards",
        cardHoverPreset: "3d-tilt",
        interactionPreset: "dynamic",
        duration: 1.1,
        intensity: 1.4,
        stagger: 0.12,
        reducedMotion: false,
      },
      physics: {
        entrancePreset: "zoom-bounce",
        heroPreset: "3d-float",
        scrollPreset: "parallax-slide",
        cardHoverPreset: "border-pulse",
        interactionPreset: "dynamic",
        duration: 1.0,
        intensity: 1.3,
        stagger: 0.1,
        reducedMotion: false,
      },
      chemistry: {
        entrancePreset: "slide-up",
        heroPreset: "glowing-aura",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "lift-glow",
        interactionPreset: "dynamic",
        duration: 1.0,
        intensity: 1.2,
        stagger: 0.1,
        reducedMotion: false,
      },
      biology: {
        entrancePreset: "cinematic-fade",
        heroPreset: "subtle-pulse",
        scrollPreset: "parallax-slide",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 1.0,
        intensity: 1.1,
        stagger: 0.1,
        reducedMotion: false,
      },
      "computer-science": {
        entrancePreset: "stagger-reveal",
        heroPreset: "3d-float",
        scrollPreset: "staggered-cards",
        cardHoverPreset: "lift-glow",
        interactionPreset: "dynamic",
        duration: 1.2,
        intensity: 1.5,
        stagger: 0.15,
        reducedMotion: false,
      },
    },
  },
  {
    id: "profile-3",
    name: "Profile 3 — Triggered Cinematic Playback",
    description: "Scroll-triggered continuous cinematic video playback with atmospheric cloud reveal and seamless homepage crossfade.",
    createdAt: new Date("2026-10-06").toISOString(),
    updatedAt: new Date("2026-10-09").toISOString(),
    modifiedBy: "Frontend Lead",
    isOriginal: false,
    pages: {
      landing: {
        entrancePreset: "slide-up",
        heroPreset: "minimal",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 0.7,
        intensity: 0.6,
        stagger: 0.05,
        reducedMotion: false,
      },
      mathematics: {
        entrancePreset: "slide-up",
        heroPreset: "minimal",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 0.7,
        intensity: 0.6,
        stagger: 0.05,
        reducedMotion: false,
      },
      physics: {
        entrancePreset: "slide-up",
        heroPreset: "minimal",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 0.7,
        intensity: 0.6,
        stagger: 0.05,
        reducedMotion: false,
      },
      chemistry: {
        entrancePreset: "slide-up",
        heroPreset: "minimal",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 0.7,
        intensity: 0.6,
        stagger: 0.05,
        reducedMotion: false,
      },
      biology: {
        entrancePreset: "slide-up",
        heroPreset: "minimal",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 0.7,
        intensity: 0.6,
        stagger: 0.05,
        reducedMotion: false,
      },
      "computer-science": {
        entrancePreset: "slide-up",
        heroPreset: "minimal",
        scrollPreset: "fade-in-up",
        cardHoverPreset: "subtle",
        interactionPreset: "subtle",
        duration: 0.7,
        intensity: 0.6,
        stagger: 0.05,
        reducedMotion: false,
      },
    },
  },
  {
    id: "profile-4",
    name: "Profile 4 — Experimental Design",
    description: "Bold interactive motion experimentation featuring playful stagger, spring zooms, and pulsing card accents.",
    createdAt: new Date("2026-10-07").toISOString(),
    updatedAt: new Date("2026-10-09").toISOString(),
    modifiedBy: "UX Lab",
    isOriginal: false,
    pages: {
      landing: {
        entrancePreset: "zoom-bounce",
        heroPreset: "glowing-aura",
        scrollPreset: "staggered-cards",
        cardHoverPreset: "3d-tilt",
        interactionPreset: "dynamic",
        duration: 1.4,
        intensity: 1.8,
        stagger: 0.2,
        reducedMotion: false,
      },
      mathematics: {
        entrancePreset: "zoom-bounce",
        heroPreset: "glowing-aura",
        scrollPreset: "staggered-cards",
        cardHoverPreset: "border-pulse",
        interactionPreset: "dynamic",
        duration: 1.4,
        intensity: 1.8,
        stagger: 0.2,
        reducedMotion: false,
      },
      physics: {
        entrancePreset: "zoom-bounce",
        heroPreset: "3d-float",
        scrollPreset: "parallax-slide",
        cardHoverPreset: "lift-glow",
        interactionPreset: "dynamic",
        duration: 1.3,
        intensity: 1.7,
        stagger: 0.18,
        reducedMotion: false,
      },
      chemistry: {
        entrancePreset: "stagger-reveal",
        heroPreset: "glowing-aura",
        scrollPreset: "parallax-slide",
        cardHoverPreset: "3d-tilt",
        interactionPreset: "dynamic",
        duration: 1.3,
        intensity: 1.6,
        stagger: 0.15,
        reducedMotion: false,
      },
      biology: {
        entrancePreset: "cinematic-fade",
        heroPreset: "subtle-pulse",
        scrollPreset: "staggered-cards",
        cardHoverPreset: "lift-glow",
        interactionPreset: "dynamic",
        duration: 1.2,
        intensity: 1.5,
        stagger: 0.15,
        reducedMotion: false,
      },
      "computer-science": {
        entrancePreset: "zoom-bounce",
        heroPreset: "glowing-aura",
        scrollPreset: "staggered-cards",
        cardHoverPreset: "border-pulse",
        interactionPreset: "dynamic",
        duration: 1.5,
        intensity: 2.0,
        stagger: 0.25,
        reducedMotion: false,
      },
    },
  },
];
