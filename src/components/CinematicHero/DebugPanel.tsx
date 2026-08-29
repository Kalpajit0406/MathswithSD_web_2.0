"use client";

import { useState } from "react";

const isDev = process.env.NODE_ENV !== "production";

export interface CinematicControls {
  cameraFov: number;
  cameraStartZ: number;
  cameraEndZ: number;
  soumenExitX: number;
  soumenRotateY: number;
  soumenRecedeScale: number;
  boardParallaxX: number;
  boardParallaxScale: number;
  integrationScale: number;
  integrationX: number;
  integrationY: number;
  integrationRotation: number;
}

export const DEFAULT_CONTROLS: CinematicControls = {
  cameraFov: 32,
  cameraStartZ: 9,
  cameraEndZ: 3.4,
  soumenExitX: 3.4,
  soumenRotateY: 0.35,
  soumenRecedeScale: 0.85,
  boardParallaxX: 0.15,
  boardParallaxScale: 1.08,
  integrationScale: 1,
  integrationX: 0.16,
  integrationY: -0.06,
  integrationRotation: -0.03,
};

interface FieldDef {
  key: keyof CinematicControls;
  label: string;
  min: number;
  max: number;
  step: number;
}

const FIELDS: FieldDef[] = [
  { key: "cameraFov", label: "Camera FOV", min: 18, max: 55, step: 1 },
  { key: "cameraStartZ", label: "Camera start Z", min: 4, max: 16, step: 0.1 },
  { key: "cameraEndZ", label: "Camera end Z", min: 1.5, max: 8, step: 0.1 },
  { key: "soumenExitX", label: "Soumen exit X", min: 0, max: 8, step: 0.1 },
  { key: "soumenRotateY", label: "Soumen rotate Y", min: 0, max: 1.2, step: 0.01 },
  { key: "soumenRecedeScale", label: "Soumen recede scale", min: 0.5, max: 1, step: 0.01 },
  { key: "boardParallaxX", label: "Board parallax X", min: -1, max: 1, step: 0.01 },
  { key: "boardParallaxScale", label: "Board parallax scale", min: 1, max: 1.6, step: 0.01 },
  { key: "integrationScale", label: "Integration scale", min: 0.5, max: 2, step: 0.01 },
  { key: "integrationX", label: "Integration X", min: -0.5, max: 0.5, step: 0.005 },
  { key: "integrationY", label: "Integration Y", min: -0.5, max: 0.5, step: 0.005 },
  { key: "integrationRotation", label: "Integration rotation", min: -0.3, max: 0.3, step: 0.005 },
];

/**
 * Lightweight, dependency-free debug controls (Leva does not yet support
 * React 19's removal of ReactDOM.render, so it crashes on mount — this
 * covers the same "live-tune the staging" need without that risk).
 */
export function useCinematicControls(): [CinematicControls, (next: CinematicControls) => void] {
  const [controls, setControls] = useState<CinematicControls>(DEFAULT_CONTROLS);
  return [controls, setControls];
}

interface PanelProps {
  controls: CinematicControls;
  onChange: (next: CinematicControls) => void;
}

export function CinematicDebugPanel({ controls, onChange }: PanelProps) {
  const [open, setOpen] = useState(false);
  if (!isDev) return null;

  return (
    <div className="pointer-events-auto fixed bottom-4 right-4 z-50 w-72 rounded-lg border border-black/10 bg-white/95 font-mono text-[11px] shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-left font-semibold"
      >
        Cinematic Hero — debug
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="max-h-96 space-y-2 overflow-y-auto border-t border-black/10 p-3">
          {FIELDS.map((field) => (
            <label key={field.key} className="block">
              <div className="mb-0.5 flex justify-between">
                <span>{field.label}</span>
                <span>{controls[field.key].toFixed(3)}</span>
              </div>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={controls[field.key]}
                onChange={(e) =>
                  onChange({ ...controls, [field.key]: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
