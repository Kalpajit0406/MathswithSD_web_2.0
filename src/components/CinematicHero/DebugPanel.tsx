"use client";

import { useState } from "react";

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
  cameraFov: 29,
  cameraStartZ: 9,
  cameraEndZ: 5.7,
  soumenExitX: 4.5,
  soumenRotateY: 0.07,
  soumenRecedeScale: 0.98,
  boardParallaxX: -0.66,
  boardParallaxScale: 1.2,
  integrationScale: 0.54,
  integrationX: 0.18,
  integrationY: 0.195,
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
  { key: "cameraFov", label: "Camera FOV", min: 15, max: 60, step: 1 },
  { key: "cameraStartZ", label: "Camera Start Z", min: 3, max: 18, step: 0.1 },
  { key: "cameraEndZ", label: "Camera End Z", min: 1, max: 10, step: 0.1 },
  { key: "soumenExitX", label: "Soumen Exit X", min: 0, max: 10, step: 0.1 },
  { key: "soumenRotateY", label: "Soumen Rotate Y", min: 0, max: 1.5, step: 0.01 },
  { key: "soumenRecedeScale", label: "Soumen Recede Scale", min: 0.4, max: 1.2, step: 0.01 },
  { key: "boardParallaxX", label: "Board Parallax X", min: -2, max: 2, step: 0.01 },
  { key: "boardParallaxScale", label: "Board Parallax Scale", min: 0.8, max: 2, step: 0.01 },
  { key: "integrationScale", label: "Integration Scale", min: 0.1, max: 2.5, step: 0.01 },
  { key: "integrationX", label: "Integration X", min: -1, max: 1, step: 0.005 },
  { key: "integrationY", label: "Integration Y", min: -1, max: 1, step: 0.005 },
  { key: "integrationRotation", label: "Integration Rotation", min: -0.5, max: 0.5, step: 0.005 },
];

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
  const [copied, setCopied] = useState(false);

  const copyConfig = () => {
    const code = `export const DEFAULT_CONTROLS: CinematicControls = ${JSON.stringify(controls, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetDefaults = () => {
    onChange(DEFAULT_CONTROLS);
  };

  return (
    <div className="pointer-events-auto fixed bottom-4 right-4 z-50 w-80 rounded-2xl border border-black/15 bg-white/90 p-1 font-sans text-xs shadow-2xl backdrop-blur-xl transition-all">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left font-display font-semibold text-ink hover:bg-black/5"
      >
        <span className="flex items-center gap-2">
          <span>⚙️</span> Cinematic Adjustments Scale
        </span>
        <span className="rounded-full bg-black/5 px-2 py-0.5 font-mono text-[10px]">
          {open ? "Close −" : "Open Controls +"}
        </span>
      </button>

      {open && (
        <div className="mt-1 max-h-[26rem] space-y-3 overflow-y-auto border-t border-black/10 p-3">
          {FIELDS.map((field) => (
            <label key={field.key} className="block space-y-1">
              <div className="flex items-center justify-between text-[11px] font-medium text-ink">
                <span>{field.label}</span>
                <span className="font-mono text-[10px] text-ink/70 bg-black/5 px-1.5 py-0.5 rounded">
                  {controls[field.key].toFixed(3)}
                </span>
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
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-black/15 accent-ink"
              />
            </label>
          ))}

          <div className="pt-2 flex gap-2 border-t border-black/10">
            <button
              type="button"
              onClick={copyConfig}
              className="flex-1 rounded-lg bg-ink text-white py-1.5 text-[11px] font-semibold hover:bg-ink/90 transition-all"
            >
              {copied ? "Copied JS Code! ✓" : "Copy Config Code"}
            </button>
            <button
              type="button"
              onClick={resetDefaults}
              className="rounded-lg border border-black/20 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-ink hover:bg-black/5 transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
