"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { CINEMATIC_ASSETS } from "../assets";
import { visibleSizeAtDistance } from "../camera";
import { lerp, type CinematicCurves } from "../timeline";
import type { CinematicControls } from "../DebugPanel";

export const SOUMEN_Z = 0.9;
const FRAME_HEIGHT_FRACTION = 0.94;

interface Props {
  curvesRef: React.RefObject<CinematicCurves>;
  controls: CinematicControls;
  viewportAspect: number;
}

export function SoumenLayer({ curvesRef, controls, viewportAspect }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useTexture(CINEMATIC_ASSETS.soumen.url);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  const baseScale = useMemo(() => {
    const frame = visibleSizeAtDistance(
      controls.cameraStartZ - SOUMEN_Z,
      controls.cameraFov,
      viewportAspect
    );
    return frame.height * FRAME_HEIGHT_FRACTION;
  }, [controls.cameraStartZ, controls.cameraFov, viewportAspect]);

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    const curves = curvesRef.current;
    if (!mesh || !material || !curves) return;

    const recede = lerp(1, controls.soumenRecedeScale, curves.soumenRecedeT);
    const scale = baseScale * recede;
    mesh.scale.set(scale * CINEMATIC_ASSETS.soumen.aspect, scale, 1);

    mesh.position.x = lerp(0, -controls.soumenExitX, curves.soumenMoveT);
    mesh.position.y = lerp(0, -0.06, curves.soumenMoveT);
    mesh.rotation.y = lerp(0, -controls.soumenRotateY, curves.soumenRotateT);

    material.opacity = curves.soumenOpacityT;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, SOUMEN_Z]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
