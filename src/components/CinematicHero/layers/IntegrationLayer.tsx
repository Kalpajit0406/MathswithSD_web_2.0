"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp, type CinematicCurves } from "../timeline";
import type { CinematicControls } from "../DebugPanel";

const CANVAS_W = 1024;
const CANVAS_H = 384;
const TEXT = "Integration";
const INK = "#1c2a4a"; // matches the board's blue marker ink

function drawTextTexture(fontReady: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  const fontFamily = fontReady
    ? "var(--font-chalk), cursive"
    : "cursive";
  ctx.font = `700 200px ${fontReady ? '"Kalam"' : fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.save();
  ctx.translate(CANVAS_W / 2, CANVAS_H / 2 - 10);
  ctx.rotate(-0.02);
  ctx.fillText(TEXT, 0, 0);

  // hand-drawn underline, roughly beneath the word
  const metrics = ctx.measureText(TEXT);
  const halfWidth = metrics.width / 2;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-halfWidth * 0.9, 90);
  ctx.quadraticCurveTo(0, 100, halfWidth * 0.92, 84);
  ctx.stroke();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

interface Props {
  curvesRef: React.RefObject<CinematicCurves>;
  controls: CinematicControls;
}

export function IntegrationLayer({ curvesRef, controls }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.load('700 200px "Kalam"').then(() => {
        if (!cancelled) setFontReady(true);
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const texture = useMemo(() => drawTextTexture(fontReady), [fontReady]);
  const aspect = CANVAS_W / CANVAS_H;

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    const curves = curvesRef.current;
    if (!mesh || !material || !curves) return;

    material.opacity = curves.integrationT;
    const scale = lerp(0.9, 1, curves.integrationT) * controls.integrationScale * 0.34;
    mesh.scale.set(scale * aspect, scale, 1);
  });

  return (
    <mesh
      ref={meshRef}
      position={[controls.integrationX, controls.integrationY, 0.002]}
      rotation={[0, 0, controls.integrationRotation]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
