/**
 * Perspective-camera geometry helpers. Kept framework-agnostic (plain
 * trig) so the numbers are easy to reason about and unit-test independent
 * of react-three-fiber.
 */

export const DEG2RAD = Math.PI / 180;

export interface FrameSize {
  width: number;
  height: number;
}

/** World-space size of the fully-visible frame at `distance` from the camera. */
export function visibleSizeAtDistance(
  distance: number,
  fovDeg: number,
  aspect: number
): FrameSize {
  const height = 2 * distance * Math.tan((fovDeg * DEG2RAD) / 2);
  return { width: height * aspect, height };
}

/**
 * Uniform scale for a unit-height plane (width = textureAspect, height = 1)
 * so it covers `frame` without distorting the texture — the 3D equivalent
 * of CSS `background-size: cover`.
 */
export function coverScale(frame: FrameSize, textureAspect: number): number {
  const scaleForWidth = frame.width / textureAspect;
  const scaleForHeight = frame.height;
  return Math.max(scaleForWidth, scaleForHeight);
}

export const CAMERA_DEFAULTS = {
  fovDeg: 32,
  startZ: 9,
  endZ: 3.4,
};
