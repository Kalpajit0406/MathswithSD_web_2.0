/**
 * Pure, deterministic mapping from a single scroll-progress scalar (0..1)
 * to normalized 0..1 curves for each layer. No side effects, no framework
 * dependency — this is what makes the scene reversible: every visual state
 * is a function of `progress` alone, never of scroll direction or history.
 *
 * Keyframe intent (see brief section 15):
 *   0.00 opening composition
 *   0.05-0.70 teacher exits left, turning slightly
 *   0.25-1.00 camera pushes toward the board
 *   0.45-0.75 teacher fades (secondary to the movement)
 *   0.78-1.00 "Integration" resolves on the board
 */

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const remap = (value: number, inMin: number, inMax: number) =>
  clamp((value - inMin) / (inMax - inMin));

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export interface CinematicCurves {
  /** 0 = centered, 1 = fully departed to the left */
  soumenMoveT: number;
  /** 0 = facing camera, 1 = fully turned away */
  soumenRotateT: number;
  /** 0 = full scale, 1 = receded scale */
  soumenRecedeT: number;
  /** 1 = fully visible, 0 = faded out */
  soumenOpacityT: number;
  /** 0 = at opening distance, 1 = fully pushed in on the board */
  cameraPushT: number;
  /** subtle board settle/parallax as the camera approaches */
  boardParallaxT: number;
  /** 0 = crisp sharp board, 1 = fully blurred board background */
  boardBlurT: number;
  /** 0 = invisible, 1 = fully resolved chalk word on the board */
  integrationT: number;
  /** 0 = initial position, 1 = translated downwards on exit (0.8 -> 1.0) */
  integrationExitY: number;
  /** 1 = fully visible, 0 = faded out during exit (0.8 -> 1.0) */
  integrationOpacityT: number;
  /** overall scroll progress, unmodified */
  progress: number;
}

export function computeCurves(rawProgress: number, motionScale = 1): CinematicCurves {
  const progress = clamp(rawProgress);

  const moveT = easeInOutCubic(remap(progress, 0.05, 0.7));
  const rotateT = easeInOutCubic(remap(progress, 0.05, 0.5));
  const recedeT = easeInOutCubic(remap(progress, 0.1, 0.65));
  const opacityT = 1 - easeInOutCubic(remap(progress, 0.45, 0.78));
  const pushT = easeInOutCubic(remap(progress, 0.25, 1.0));
  const parallaxT = easeOutCubic(remap(progress, 0.0, 1.0));
  const boardBlurT = easeInOutCubic(remap(progress, 0.05, 0.70));

  // Integration text appears earlier (0.45 -> 0.60), stays visible (0.60 -> 0.80), then exits downwards/fades (0.80 -> 1.00)
  const integrationInT = easeOutCubic(remap(progress, 0.45, 0.60));
  const exitProgress = remap(progress, 0.80, 1.00);
  const integrationExitY = easeInOutCubic(exitProgress);
  const integrationOpacityT = (1 - easeInOutCubic(exitProgress)) * integrationInT;

  return {
    soumenMoveT: moveT * motionScale,
    soumenRotateT: rotateT * motionScale,
    soumenRecedeT: recedeT * motionScale,
    soumenOpacityT: motionScale < 1 ? lerp(1, opacityT, motionScale) : opacityT,
    cameraPushT: pushT * motionScale,
    boardParallaxT: parallaxT * motionScale,
    boardBlurT,
    integrationT: integrationInT,
    integrationExitY,
    integrationOpacityT,
    progress,
  };
}
