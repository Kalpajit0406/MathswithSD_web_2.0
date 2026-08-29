"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { Canvas, advance, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { WhiteboardLayer } from "./layers/WhiteboardLayer";
import { SoumenLayer } from "./layers/SoumenLayer";
import { computeCurves, lerp, type CinematicCurves } from "./timeline";
import { useCinematicControls, CinematicDebugPanel, type CinematicControls } from "./DebugPanel";

interface SceneProps {
  progressRef: RefObject<number>;
  motionScale: number;
  controls: CinematicControls;
}

function Scene({ progressRef, motionScale, controls }: SceneProps) {
  const curvesRef = useRef<CinematicCurves>(computeCurves(0, motionScale));
  const { camera, size, gl, scene } = useThree();
  const perspCamera = camera as THREE.PerspectiveCamera;
  const aspect = size.width / size.height;

  useEffect(() => {
    perspCamera.fov = controls.cameraFov;
    perspCamera.aspect = aspect;
    perspCamera.near = 0.1;
    perspCamera.far = 50;
    perspCamera.position.set(0, 0, controls.cameraStartZ);
    perspCamera.updateProjectionMatrix();
  }, [perspCamera, controls.cameraFov, aspect, controls.cameraStartZ]);

  // Paint the opening frame immediately once assets/mesh transforms are
  // committed, instead of waiting for the first requestAnimationFrame tick
  // (avoids a blank-canvas flash on slower devices).
  useLayoutEffect(() => {
    advance(performance.now());
  }, [gl, scene, perspCamera]);

  useFrame(() => {
    const curves = computeCurves(progressRef.current, motionScale);
    curvesRef.current = curves;
    perspCamera.position.z = lerp(controls.cameraStartZ, controls.cameraEndZ, curves.cameraPushT);
  });

  return (
    <>
      <WhiteboardLayer curvesRef={curvesRef} controls={controls} viewportAspect={aspect} />
      <SoumenLayer curvesRef={curvesRef} controls={controls} viewportAspect={aspect} />
    </>
  );
}

interface CinematicCanvasProps {
  progressRef: RefObject<number>;
  motionScale: number;
}

export function CinematicCanvas({ progressRef, motionScale }: CinematicCanvasProps) {
  const [controls, setControls] = useCinematicControls();

  return (
    <div className="cinematic-canvas-wrapper absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ fov: controls.cameraFov, position: [0, 0, controls.cameraStartZ] }}
      >
        <color attach="background" args={["#e9e5da"]} />
        <Suspense fallback={null}>
          <Scene progressRef={progressRef} motionScale={motionScale} controls={controls} />
        </Suspense>
      </Canvas>
      <CinematicDebugPanel controls={controls} onChange={setControls} />
    </div>
  );
}
