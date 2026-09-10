"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { loaderAudio } from "./loaderAudio";

interface CinematicLoaderCanvasProps {
  elapsedTimeMs: number;
  isTransitioning: boolean;
  onStartTransition: () => void;
  onTransitionFinished: () => void;
}

export function CinematicLoaderCanvas({
  elapsedTimeMs,
  isTransitioning,
  onStartTransition,
  onTransitionFinished,
}: CinematicLoaderCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const elapsedTimeMsRef = useRef(elapsedTimeMs);
  const isTransitioningRef = useRef(isTransitioning);
  const transitionStartedRef = useRef(false);

  useEffect(() => {
    elapsedTimeMsRef.current = elapsedTimeMs;
  }, [elapsedTimeMs]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    // 1. THREE.JS SCENE SETUP - Deep Black Negative Space
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Mouse Parallax (Ultra-Subtle)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 2. CONTROLLED CINEMATIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff0cc, 0.6);
    scene.add(ambientLight);

    // Subtle Metallic Rim Light
    const rimLight = new THREE.DirectionalLight(0xfff5d6, 2.2);
    rimLight.position.set(6, 8, 5);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0xd4af37, 1.2, 25);
    softFill.position.set(-4, -4, 4);
    scene.add(softFill);

    // 3. LAYER 5: MSD LOGO EMBLEM (High-Resolution & Crisp Metallic Bevel)
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/assets/cinematic/sd_logo.jpg", (tex) => {
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.needsUpdate = true;
    });

    const logoGeo = new THREE.CircleGeometry(2.2, 128);
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      roughness: 0.2,
      metalness: 0.75,
      emissive: 0x1a1400,
      emissiveIntensity: 0.1,
      side: THREE.DoubleSide,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoGroup.add(logoMesh);

    // Precision Metallic Gold Bevel Frame
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.16,
      emissive: 0x5c4a16,
      emissiveIntensity: 0.25,
    });

    const bevelRingGeo = new THREE.TorusGeometry(2.22, 0.035, 32, 128);
    const bevelRing = new THREE.Mesh(bevelRingGeo, goldMat);
    logoGroup.add(bevelRing);

    logoGroup.position.set(0, 0, 0);
    logoGroup.scale.set(0.001, 0.001, 0.001);

    // 4. LAYER 3: ELEGANT METALLIC CIRCULAR RINGS
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Outer Arc Ring (8 Assembling Metallic Arcs)
    const outerRingSegments: THREE.Mesh[] = [];
    const arcCount = 8;
    const arcAngle = (Math.PI * 2) / arcCount;

    for (let i = 0; i < arcCount; i++) {
      const arcGeo = new THREE.TorusGeometry(3.1, 0.018, 16, 48, arcAngle * 0.72);
      const arcMesh = new THREE.Mesh(arcGeo, goldMat);

      const angle = (i / arcCount) * Math.PI * 2;
      const spread = 8 + Math.random() * 4;

      arcMesh.userData = {
        initialX: Math.cos(angle) * spread,
        initialY: Math.sin(angle) * spread,
        initialZ: (Math.random() - 0.5) * 10 - 5,
        targetRotZ: i * arcAngle,
      };

      arcMesh.position.set(
        arcMesh.userData.initialX,
        arcMesh.userData.initialY,
        arcMesh.userData.initialZ
      );
      ringGroup.add(arcMesh);
      outerRingSegments.push(arcMesh);
    }

    // Thin Inner Accent Ring
    const innerRingGeo = new THREE.TorusGeometry(2.65, 0.01, 16, 128);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, goldMat);
    ringGroup.add(innerRingMesh);

    // 5. LAYER 1 & 2: SPARSE ELEGANT PARTICLES (80% Less Density)
    const particleCount = isMobile ? 120 : 250;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals: { x: number; y: number; z: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 35;

      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals.push({
        x,
        y,
        z,
        speed: 0.002 + Math.random() * 0.004,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Sharp dot particle texture (No blurry clouds!)
    const createSharpDotTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 32;
      pCanvas.height = 32;
      const pCtx = pCanvas.getContext("2d")!;
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 245, 214, 1.0)");
      grad.addColorStop(0.4, "rgba(212, 175, 55, 0.8)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleMat = new THREE.PointsMaterial({
      color: 0xfff0cc,
      size: isMobile ? 0.18 : 0.22,
      map: createSharpDotTexture(),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. LAYER 4: OCCASIONAL SUBTLE MATHEMATICAL SYMBOLS
    const mathGroup = new THREE.Group();
    scene.add(mathGroup);

    const mathSymbolsList = ["π", "x", "Δ", "y = mx + c", "a² + b² = c²", "θ"];

    const createMathTexture = (text: string) => {
      const mCanvas = document.createElement("canvas");
      mCanvas.width = 256;
      mCanvas.height = 64;
      const mCtx = mCanvas.getContext("2d")!;
      mCtx.clearRect(0, 0, 256, 64);

      mCtx.font = "500 24px 'Space Grotesk', sans-serif";
      mCtx.textAlign = "center";
      mCtx.textBaseline = "middle";
      mCtx.fillStyle = "#E6C675";
      mCtx.fillText(text, 128, 32);

      const tex = new THREE.CanvasTexture(mCanvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    const mathSprites: THREE.Sprite[] = [];
    const symbolCount = isMobile ? 4 : 7;

    for (let i = 0; i < symbolCount; i++) {
      const sym = mathSymbolsList[i % mathSymbolsList.length];
      const spriteMat = new THREE.SpriteMaterial({
        map: createMathTexture(sym),
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      const angle = (i / symbolCount) * Math.PI * 2 + 0.3;
      const radius = 4.2 + Math.random() * 3.5;

      sprite.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 8
      );
      sprite.scale.set(2.2, 0.55, 1);
      sprite.userData = { angle, radius, rotSpeed: 0.003 };

      mathGroup.add(sprite);
      mathSprites.push(sprite);
    }

    // Audio snap tracking
    let audioSnapPlayed = false;
    let audioTransitionPlayed = false;

    // 7. ANIMATION LOOP & TIMING SYNCHRONIZATION
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const timeSec = elapsedTimeMsRef.current / 1000.0; // Seconds (0.0 to ~4.2s)
      clock.getDelta();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // TIMING & TIMELINE BREAKDOWN:
      // 0.0 - 0.8s: Black space + subtle dust
      // 0.8 - 1.8s: Golden rings assemble
      // 1.8 - 2.8s: MSD Logo floating hero moment
      // 2.8 - 4.2s: Seamless camera push transition into website

      // Trigger transition event at 2.8s
      if (timeSec >= 2.8 && !transitionStartedRef.current) {
        transitionStartedRef.current = true;
        onStartTransition();
      }

      // Finish intro component unmount at 4.2s
      if (timeSec >= 4.2) {
        onTransitionFinished();
        return;
      }

      // CAMERA MOVEMENT
      if (timeSec < 2.8) {
        // Subtle resting position with mouse parallax
        camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
        camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.05;
        camera.position.z = 8.2;
      } else {
        // CONTINUOUS CAMERA TRANSITION (2.8s to 4.2s)
        const transitionProgress = THREE.MathUtils.smoothstep(timeSec, 2.8, 4.2);
        camera.position.z = THREE.MathUtils.lerp(8.2, -4.0, transitionProgress);
        camera.position.x += (0 - camera.position.x) * 0.1;
        camera.position.y += (0 - camera.position.y) * 0.1;

        // Expanding ring during camera pass-through
        ringGroup.scale.setScalar(1.0 + transitionProgress * 3.2);

        if (!audioTransitionPlayed) {
          audioTransitionPlayed = true;
          loaderAudio.playTransitionShimmer();
        }
      }
      camera.lookAt(0, 0, 0);

      // LAYER 5: LOGO EMERGENCE & FLOAT
      const logoProgress = THREE.MathUtils.smoothstep(timeSec, 0.8, 2.0);
      const currentScale = logoProgress * 1.0;
      logoGroup.scale.set(currentScale, currentScale, currentScale);

      logoGroup.rotation.y = Math.sin(timeSec * 0.5) * 0.08 + mouse.x * 0.1;
      logoGroup.rotation.x = Math.cos(timeSec * 0.4) * 0.05 - mouse.y * 0.1;

      // LAYER 3: RINGS ASSEMBLY
      const ringAssemblyRatio = THREE.MathUtils.smoothstep(timeSec, 0.7, 1.8);
      outerRingSegments.forEach((arc) => {
        const u = arc.userData;
        arc.position.x = THREE.MathUtils.lerp(u.initialX, 0, ringAssemblyRatio);
        arc.position.y = THREE.MathUtils.lerp(u.initialY, 0, ringAssemblyRatio);
        arc.position.z = THREE.MathUtils.lerp(u.initialZ, 0, ringAssemblyRatio);
        arc.rotation.z = THREE.MathUtils.lerp(0, u.targetRotZ, ringAssemblyRatio);
      });

      ringGroup.rotation.z = timeSec * 0.06;

      if (timeSec > 1.6 && !audioSnapPlayed) {
        audioSnapPlayed = true;
        loaderAudio.playSubtleAssemblySnap();
      }

      // LAYER 1 & 2: SPARSE PARTICLES ORBITAL DRIFT
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const px = posArr[idx];
        const py = posArr[idx + 1];
        const pz = posArr[idx + 2];

        // Slow orbital rotation
        const angle = 0.0015;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const nx = px * cosA - py * sinA;
        const ny = px * sinA + py * cosA;

        posArr[idx] = nx;
        posArr[idx + 1] = ny;
        posArr[idx + 2] = pz + Math.sin(timeSec + i) * 0.005;
      }
      posAttr.needsUpdate = true;

      // LAYER 4: MATHEMATICAL SYMBOLS SLOW DRIFT
      mathSprites.forEach((sprite) => {
        const u = sprite.userData;
        u.angle += u.rotSpeed;
        sprite.position.x = Math.cos(u.angle) * u.radius;
        sprite.position.y = Math.sin(u.angle) * u.radius;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas || !container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      logoGeo.dispose();
      logoMat.dispose();
      logoTexture.dispose();
      bevelRingGeo.dispose();
      goldMat.dispose();
      innerRingGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      outerRingSegments.forEach((s) => s.geometry.dispose());
      mathSprites.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.SpriteMaterial).map?.dispose();
        s.material.dispose();
      });

      renderer.dispose();
    };
  }, [onStartTransition, onTransitionFinished]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
