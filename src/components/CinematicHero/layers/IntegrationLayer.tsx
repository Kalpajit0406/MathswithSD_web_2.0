"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp, type CinematicCurves } from "../timeline";
import type { CinematicControls } from "../DebugPanel";

const CANVAS_W = 1280;
const CANVAS_H = 440;

function drawTextTexture(fontReady: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  const primaryFont = fontReady
    ? '"Caveat", "Kalam", cursive'
    : '"Kalam", cursive';
  const mathFont = fontReady ? '"Caveat", serif' : 'serif';

  ctx.save();
  ctx.translate(CANVAS_W / 2, CANVAS_H / 2 - 5);
  ctx.rotate(-0.025); // natural handwritten slight tilt

  const INK_PRIMARY = "#12223f";
  const INK_SECONDARY = "#244572";

  // 1. Background formula watermark
  ctx.font = `600 48px ${mathFont}`;
  ctx.fillStyle = "rgba(18, 34, 63, 0.12)";
  ctx.textAlign = "center";
  ctx.fillText("∫ f(x) dx = F(x) + C", 0, -115);

  // 2. Integral Symbol ∫ on the left
  ctx.font = `700 230px ${primaryFont}`;
  ctx.fillStyle = INK_SECONDARY;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("∫", -330, -5);

  // Integral bounds 'a' and 'b'
  ctx.font = `700 55px ${primaryFont}`;
  ctx.fillText("b", -330, -95);
  ctx.fillText("a", -345, 80);

  // 3. Main Word "Integration" in center
  ctx.font = `700 185px ${primaryFont}`;
  ctx.fillStyle = INK_PRIMARY;
  ctx.textAlign = "center";
  ctx.fillText("Integration", 10, 0);

  // 4. Differential "dx" on the right
  ctx.font = `600 130px ${primaryFont}`;
  ctx.fillStyle = INK_SECONDARY;
  ctx.textAlign = "left";
  ctx.fillText("dx", 370, 15);

  // 5. Hand-drawn double underline strokes
  ctx.strokeStyle = INK_PRIMARY;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-360, 95);
  ctx.quadraticCurveTo(10, 115, 450, 92);
  ctx.stroke();

  ctx.strokeStyle = INK_SECONDARY;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-330, 114);
  ctx.quadraticCurveTo(10, 128, 430, 108);
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
      Promise.all([
        document.fonts.load('700 185px "Caveat"'),
        document.fonts.load('700 185px "Kalam"'),
      ]).then(() => {
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

    material.opacity = curves.integrationOpacityT;
    const scale = lerp(0.9, 1, curves.integrationT) * controls.integrationScale * 0.36;
    mesh.scale.set(scale * aspect, scale, 1);

    const exitOffsetY = -0.15 * curves.integrationExitY;
    mesh.position.y = controls.integrationY + exitOffsetY;
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
