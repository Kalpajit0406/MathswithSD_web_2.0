"use client";

import React, { useState, useRef, useEffect } from "react";
import { OpenLiftPlatform } from "../LiftSystem/OpenLiftPlatform";
import { ModuleDetailModal, ModuleData } from "../Modals/ModuleDetailModal";
import { TeacherPose } from "../TeacherCharacter";

export const ALL_MODULES: ModuleData[] = [
  {
    id: "integral-calculus",
    name: "Integral Calculus",
    tag: "Core Topic",
    level: "Advanced",
    formula: "∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + C,  n ≠ -1",
    description: "From standard indefinite integrals to complex definite areas and differential equations, broken down step-by-step.",
    topics: ["Definite Integrals", "Area Under Curves", "Integration by Parts", "Substitution Technique"],
    sampleQuestion: {
      question: "Evaluate the indefinite integral: ∫ (2x + 3) dx",
      hint: "Apply the power rule to 2x and the constant rule to 3. Don't forget the constant of integration C!",
      options: ["x² + 3x + C", "2x² + 3x + C", "x² + 3 + C", "2x² + C"],
      correctIndex: 0,
      explanation: "Using the power rule: ∫ 2x dx = 2 * (x²/2) = x². Using constant rule: ∫ 3 dx = 3x. Adding integration constant gives x² + 3x + C."
    }
  },
  {
    id: "differential-equations",
    name: "Differential Equations",
    tag: "Calculus",
    level: "Intermediate",
    formula: "dy/dx + P(x)y = Q(x)  ⇒  I.F. = e^(∫ P(x) dx)",
    description: "Master first-order linear differential equations, variable separable methods, and physical growth models.",
    topics: ["Variable Separable", "Integrating Factor (I.F.)", "Homogeneous Equations", "Order & Degree"],
    sampleQuestion: {
      question: "What is the integrating factor (I.F.) for the equation: dy/dx + (2/x)y = x³ ?",
      hint: "Here P(x) = 2/x. Compute e^(∫ (2/x) dx) = e^(2 ln x) = e^(ln x²).",
      options: ["x²", "2/x", "ln(x)", "e^(2x)"],
      correctIndex: 0,
      explanation: "∫ (2/x) dx = 2 ln|x| = ln(x²). Therefore, I.F. = e^(ln x²) = x²."
    }
  },
  {
    id: "algebra-matrices",
    name: "Algebra & Matrices",
    tag: "Foundations",
    level: "All Levels",
    formula: "A · A⁻¹ = I  and  A⁻¹ = (1 / |A|) · adj(A)",
    description: "Deep dive into matrix operations, determinant evaluation, system of linear equations, and inverse calculations.",
    topics: ["Matrix Multiplication", "Determinants & Cramer's Rule", "Inverse Matrix", "System of Linear Equations"],
    sampleQuestion: {
      question: "If A is a 2x2 matrix with |A| = 5, what is the value of |2A| ?",
      hint: "For an n x n matrix, |kA| = kⁿ · |A|. Here n = 2 and k = 2.",
      options: ["20", "10", "25", "50"],
      correctIndex: 0,
      explanation: "Since A is a 2x2 matrix (n=2), |2A| = 2² · |A| = 4 · 5 = 20."
    }
  },
  {
    id: "coordinate-geometry",
    name: "Coordinate Geometry",
    tag: "Geometry",
    level: "Intermediate",
    formula: "y - y₁ = m(x - x₁)  &  x² + y² + 2gx + 2fy + c = 0",
    description: "Explore lines, circles, parabolas, ellipses, and hyperbolas with clear visual geometric proofs.",
    topics: ["Straight Lines", "Circles & Tangents", "Parabolas & Conics", "Locus Problems"],
    sampleQuestion: {
      question: "Find the center of the circle: x² + y² - 6x + 4y - 12 = 0",
      hint: "Center of x² + y² + 2gx + 2fy + c = 0 is (-g, -f). Here 2g = -6, 2f = 4.",
      options: ["(3, -2)", "(-3, 2)", "(6, -4)", "(3, 2)"],
      correctIndex: 0,
      explanation: "2g = -6 ⇒ g = -3, so -g = 3. 2f = 4 ⇒ f = 2, so -f = -2. Center = (3, -2)."
    }
  },
  {
    id: "vectors-3d",
    name: "Vectors & 3D Geometry",
    tag: "Spatial Math",
    level: "Advanced",
    formula: "A⃗ · B⃗ = |A⃗||B⃗| cos θ  &  A⃗ × B⃗ = |A⃗||B⃗| sin θ n̂",
    description: "Visualize vectors in 3D space, dot & cross products, plane equations, and shortest distances between lines.",
    topics: ["Dot & Cross Product", "Direction Cosines", "Planes in 3D", "Shortest Distance"],
    sampleQuestion: {
      question: "What is the dot product of two perpendicular non-zero vectors A⃗ and B⃗ ?",
      hint: "Perpendicular vectors have θ = 90°. cos 90° = 0.",
      options: ["0", "1", "|A⃗||B⃗|", "-1"],
      correctIndex: 0,
      explanation: "A⃗ · B⃗ = |A⃗||B⃗| cos 90° = 0."
    }
  },
  {
    id: "trigonometry",
    name: "Trigonometric Functions",
    tag: "Trig Mastery",
    level: "Intermediate",
    formula: "sin² θ + cos² θ = 1  &  sin(A + B) = sin A cos B + cos A sin B",
    description: "Transformations, inverse trigonometric domain-range restrictions, and general solutions of trig equations.",
    topics: ["Inverse Trig Functions", "Trig Identities", "General Solutions", "Height & Distances"],
    sampleQuestion: {
      question: "What is the principal value of sin⁻¹(-1/2) ?",
      hint: "The principal range of sin⁻¹(x) is [-π/2, π/2].",
      options: ["-π/6", "5π/6", "-π/3", "7π/6"],
      correctIndex: 0,
      explanation: "sin(-π/6) = -1/2. Since -π/6 lies in [-π/2, π/2], the principal value is -π/6."
    }
  }
];

export function InteractiveModulesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [modalModule, setModalModule] = useState<ModuleData | null>(null);
  const [liftOffsetY, setLiftOffsetY] = useState<number>(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth vertical alignment offset calculation for active module card
  useEffect(() => {
    if (cardRefs.current[activeIndex]) {
      const activeCard = cardRefs.current[activeIndex];
      const firstCard = cardRefs.current[0];
      if (activeCard && firstCard) {
        let offset = activeCard.offsetTop - firstCard.offsetTop;
        
        // For the last module (Trigonometry), shift lift system higher up
        // so the full lift platform, speech bubble, and character remain 100% fully visible!
        if (activeIndex === 5) {
          offset = Math.max(0, offset - 220);
        } else if (activeIndex === 4) {
          offset = Math.max(0, offset - 110);
        }

        setLiftOffsetY(offset);
      }
    }
  }, [activeIndex]);

  const activeModule = ALL_MODULES[activeIndex];

  // Dynamically vary pose naturally based on active module topic
  const getModulePose = (idx: number): TeacherPose => {
    if (idx === 0) return "pointing";
    if (idx === 1) return "thinking";
    if (idx === 2) return "presenting";
    if (idx === 3) return "pointing";
    if (idx === 4) return "confident";
    return "thumbsup";
  };

  return (
    <section 
      id="interactive-modules"
      className="relative pt-24 pb-36 px-4 sm:px-8 lg:px-12 bg-[#f8f6f0] text-slate-950 border-t border-slate-900/10 overflow-hidden min-h-[1200px]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900/10 font-display text-xs font-bold text-slate-900 uppercase tracking-widest">
            05 — INTERACTIVE MODULES &amp; OPEN-LIFT NAV
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
            Explore Mathematics Curriculum
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-body leading-relaxed">
            Click or hover any module card to align Soumen Sir&apos;s open lift platform. Explore key formulas and interactive practice previews.
          </p>
        </div>

        {/* Split Layout: Left Module List, Right Lift Platform Track */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[850px]">
          
          {/* Left Column: Module Cards */}
          <div className="lg:col-span-7 space-y-4">
            {ALL_MODULES.map((mod, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={mod.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-slate-950 text-white border-amber-400 shadow-2xl scale-[1.01]"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Active Pillar Highlight */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-amber-400 via-sky-400 to-emerald-400 rounded-l-3xl" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isActive ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-700"
                        }`}>
                          {mod.tag}
                        </span>
                        <span className={`text-xs font-mono font-semibold ${isActive ? "text-sky-300" : "text-slate-500"}`}>
                          • {mod.level}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                        {mod.name}
                      </h3>

                      <p className={`text-xs sm:text-sm font-body leading-relaxed ${
                        isActive ? "text-slate-300" : "text-slate-600"
                      }`}>
                        {mod.description}
                      </p>

                      <div className={`mt-3 p-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold inline-block border ${
                        isActive 
                          ? "bg-slate-900 border-amber-400/40 text-amber-300" 
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}>
                        Formula: {mod.formula}
                      </div>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-end justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(idx);
                          setModalModule(mod);
                        }}
                        className={`px-4 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 ${
                          isActive
                            ? "bg-sky-400 text-slate-950 hover:bg-sky-300 scale-105"
                            : "bg-slate-950 text-white hover:bg-slate-800"
                        }`}
                      >
                        <span>Explore Module</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>

                      {isActive && (
                        <span className="text-[11px] font-display font-semibold text-amber-400 animate-pulse hidden sm:inline">
                          👉 Lift Aligned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Open Lift Platform Track (Vertical Movement) */}
          <div className="lg:col-span-5 hidden lg:block relative h-full flex justify-center pl-4">
            <OpenLiftPlatform
              pose={getModulePose(activeIndex)}
              activeModuleName={activeModule.name}
              speechText={`Focusing on ${activeModule.name}! ${activeModule.description}`}
              offsetY={liftOffsetY}
            />
          </div>

          {/* Mobile Docked Character */}
          <div className="lg:hidden col-span-1 mt-8 flex justify-center">
            <OpenLiftPlatform
              pose={getModulePose(activeIndex)}
              activeModuleName={activeModule.name}
              speechText={`Focusing on ${activeModule.name}! ${activeModule.description}`}
              offsetY={0}
            />
          </div>

        </div>

      </div>

      {/* Module Detail Practice Modal */}
      <ModuleDetailModal
        module={modalModule}
        onClose={() => setModalModule(null)}
      />
    </section>
  );
}
