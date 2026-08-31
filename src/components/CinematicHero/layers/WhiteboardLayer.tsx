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
  const groupRef = useRef<THREE.Group>(null);
  const blurredMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const glassMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  const texture = useTexture(CINEMATIC_ASSETS.whiteboard.url);
  const textureBlurred = useTexture(CINEMATIC_ASSETS.whiteboardBlurred.url);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    textureBlurred.colorSpace = THREE.SRGBColorSpace;
    textureBlurred.anisotropy = 8;
  }, [texture, textureBlurred]);

  const baseScale = useMemo(() => {
    const frame = visibleSizeAtDistance(
      controls.cameraStartZ - BOARD_Z,
      controls.cameraFov,
      viewportAspect
    );
    return coverScale(frame, CINEMATIC_ASSETS.whiteboard.aspect) * 1.06;
  }, [controls.cameraStartZ, controls.cameraFov, viewportAspect]);

  useFrame(() => {
    const group = groupRef.current;
    const blurredMat = blurredMaterialRef.current;
    const glassMat = glassMaterialRef.current;
    const curves = curvesRef.current;
    if (!group || !curves) return;

    const settleScale = lerp(1, controls.boardParallaxScale, curves.boardParallaxT);
    const scale = baseScale * settleScale;
    group.scale.set(scale * CINEMATIC_ASSETS.whiteboard.aspect, scale, 1);
    group.position.x = lerp(0, controls.boardParallaxX, curves.boardParallaxT);
    group.position.y = lerp(0, -0.04, curves.boardParallaxT);

    // Dynamic smooth blur fade: 0 on opening frame, ramps to 1 as user scrolls
    if (blurredMat) {
      blurredMat.opacity = curves.boardBlurT;
    }
    // Frosted glass tint sheen
    if (glassMat) {
      glassMat.opacity = curves.boardBlurT * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, BOARD_Z]}>
      {/* 1. Sharp Base Board (100% visible on initial frame) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* 2. Blurred Board Overlay (opacity 0 at start, smoothly fades in on scroll) */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={blurredMaterialRef}
          map={textureBlurred}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* 3. Glassmorphism Frosted Sheen Overlay */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={glassMaterialRef}
          color="#f4f1ea"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Integration Chalk Text */}
      <IntegrationLayer curvesRef={curvesRef} controls={controls} />
    </group>
  );
}
