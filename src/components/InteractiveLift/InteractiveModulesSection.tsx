"use client";

import React, { useState, useRef, useEffect } from "react";
import { HangingLiftCharacter, CartoonPose } from "./HangingLiftCharacter";
import { ModulePracticeModal, ModuleData } from "./ModulePracticeModal";

const DETAILED_MODULES: ModuleData[] = [
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
  const [currentPose, setCurrentPose] = useState<CartoonPose>("pointing");
  const [modalModule, setModalModule] = useState<ModuleData | null>(null);
  const [liftOffsetY, setLiftOffsetY] = useState<number>(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate position offset for lift alignment when active module changes
  useEffect(() => {
    if (cardRefs.current[activeIndex]) {
      const activeCard = cardRefs.current[activeIndex];
      const firstCard = cardRefs.current[0];
      if (activeCard && firstCard) {
        const offset = activeCard.offsetTop - firstCard.offsetTop;
        setLiftOffsetY(offset);
      }
    }
  }, [activeIndex]);

  const activeModule = DETAILED_MODULES[activeIndex];

  return (
    <section 
      id="modules-section"
      className="relative bg-[#f4f1ea]/90 backdrop-blur-md text-[#141311] z-20 py-24 px-4 sm:px-8 lg:px-12 border-t border-black/5 shadow-2xl overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-500/40 text-amber-900 font-display text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Interactive Learning Federation
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Explored Core Modules &amp; Courses
          </h2>
          <p className="text-base sm:text-lg text-ink/80 font-body leading-relaxed">
            Hover over or click any module card to align Soumen Sir&apos;s hanging open-lift character in real time!
            Explore key formulas and test your understanding with interactive problem previews.
          </p>
        </div>

        {/* Main Split Layout: Left Modules List, Right Hanging Lift Character */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative min-h-[700px]">
          
          {/* Left Column: Interactive Module Cards (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            {DETAILED_MODULES.map((mod, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={mod.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onMouseEnter={() => {
                    if (idx !== activeIndex) {
                      setActiveIndex(idx);
                      setCurrentPose("pointing");
                    }
                  }}
                  onClick={() => {
                    setActiveIndex(idx);
                    setCurrentPose("pointing");
                  }}
                  className={`group relative p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white border-amber-400 shadow-2xl scale-[1.01]"
                      : "bg-white/60 backdrop-blur-md border-white/80 hover:bg-white/90 hover:border-slate-300 text-ink shadow-md"
                  }`}
                >
                  {/* Active Indicator Pillar */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-amber-400 via-sky-400 to-emerald-400 rounded-l-3xl" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isActive ? "bg-amber-400 text-slate-950" : "bg-ink/10 text-ink/70"
                        }`}>
                          {mod.tag}
                        </span>
                        <span className={`text-xs font-mono font-semibold ${isActive ? "text-sky-300" : "text-ink/60"}`}>
                          • {mod.level}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                        {mod.name}
                      </h3>

                      <p className={`text-xs sm:text-sm font-body leading-relaxed ${
                        isActive ? "text-slate-300" : "text-ink/75"
                      }`}>
                        {mod.description}
                      </p>

                      {/* Formula Preview Badge */}
                      <div className={`mt-3 p-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold inline-block border ${
                        isActive 
                          ? "bg-slate-950 border-amber-400/40 text-amber-300" 
                          : "bg-black/5 border-black/10 text-ink"
                      }`}>
                        Formula: {mod.formula}
                      </div>
                    </div>

                    {/* Action Button */}
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
                            : "bg-ink text-white hover:bg-ink/90"
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

          {/* Right Column: Hanging Lift Structure with Soumen Sir (5 cols on lg) */}
          <div className="lg:col-span-5 hidden lg:block relative h-full flex justify-center pl-4">
            <HangingLiftCharacter
              currentPose={currentPose}
              targetModuleName={activeModule.name}
              speechText={`Focusing on ${activeModule.name}! ${activeModule.description}`}
              offsetY={liftOffsetY}
              onSelectPose={(p) => setCurrentPose(p)}
              showLaserPointer={true}
            />
          </div>

          {/* Mobile Docked Character (Visible on screens < lg) */}
          <div className="lg:hidden col-span-1 mt-8 flex justify-center">
            <HangingLiftCharacter
              currentPose={currentPose}
              targetModuleName={activeModule.name}
              speechText={`Focusing on ${activeModule.name}! ${activeModule.description}`}
              offsetY={0}
              onSelectPose={(p) => setCurrentPose(p)}
              showLaserPointer={false}
            />
          </div>

        </div>

      </div>

      {/* Module Practice Modal */}
      <ModulePracticeModal
        module={modalModule}
        onClose={() => setModalModule(null)}
      />
    </section>
  );
}
