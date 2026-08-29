"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CINEMATIC_ASSETS } from "../assets";
import { visibleSizeAtDistance, coverScale } from "../camera";
import { lerp, type CinematicCurves } from "../timeline";
import type { CinematicControls } from "../DebugPanel";
import { IntegrationLayer } from "./IntegrationLayer";

export const BOARD_Z = 0;

interface Props {
  curvesRef: React.RefObject<CinematicCurves>;
  controls: CinematicControls;
  viewportAspect: number;
}

export function WhiteboardLayer({ curvesRef, controls, viewportAspect }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(CINEMATIC_ASSETS.whiteboard.url);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  // Sized to fully cover the frame at the *farthest* camera distance
  // (start of scroll) — since the camera only ever moves closer to the
  // board, this guarantees full coverage for the entire scroll range
  // purely through real perspective, with no compensating rescale needed.
  const baseScale = useMemo(() => {
    const frame = visibleSizeAtDistance(
      controls.cameraStartZ - BOARD_Z,
      controls.cameraFov,
      viewportAspect
    );
    return coverScale(frame, CINEMATIC_ASSETS.whiteboard.aspect) * 1.06;
  }, [controls.cameraStartZ, controls.cameraFov, viewportAspect]);

  useFrame(() => {
    const mesh = meshRef.current;
    const curves = curvesRef.current;
    if (!mesh || !curves) return;

    const settleScale = lerp(1, controls.boardParallaxScale, curves.boardParallaxT);
    const scale = baseScale * settleScale;
    mesh.scale.set(scale * CINEMATIC_ASSETS.whiteboard.aspect, scale, 1);
    mesh.position.x = lerp(0, controls.boardParallaxX, curves.boardParallaxT);
    mesh.position.y = lerp(0, -0.04, curves.boardParallaxT);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, BOARD_Z]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
      {/* nested so "Integration" inherits the board's own parallax/scale — it stays glued to the board surface */}
      <IntegrationLayer curvesRef={curvesRef} controls={controls} />
    </mesh>
  );
}
