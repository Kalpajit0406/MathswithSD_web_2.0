import type { Metadata } from "next";
import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export const metadata: Metadata = {
  title: "Physics Department — Scholars Hub Kolkata",
  description:
    "Explore the Scholars Hub Physics curriculum: Classical Mechanics, Electromagnetism, Optics, and Modern Physics for JEE & NEET.",
  openGraph: {
    title: "Physics Department — Scholars Hub",
    description: "Conceptual rigor and interactive physical simulations for WBJEE, JEE Main, JEE Advanced, and NEET.",
    siteName: "Scholars Hub",
  },
};

export default function PhysicsPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Physics"
      icon={
        <svg className="w-10 h-10 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" strokeWidth={1.5} />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" strokeWidth={1.5} />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" strokeWidth={1.5} />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      }
      tagline="Mechanics, Electromagnetism, Quantum & Modern Physics"
      description="The Scholars Hub Physics Department is currently undergoing curriculum development. This section will feature interactive physical simulations, problem sets for JEE and NEET, and conceptual foundation lectures."
      highlights={[
        "Classical Mechanics & Rotational Motion",
        "Electromagnetism & Wave Optics",
        "Modern Physics & Atomic Structure",
        "Interactive Physical Experiments",
      ]}
      pastel={{
        pageBg: "#faf5ff",       // pale lavender
        cardBg: "#f3e8ff",
        borderColor: "#d8b4fe",
        titleColor: "#6b21a8",
        textColor: "#3b0764",
        badgeBg: "bg-purple-200 text-purple-900",
        accentGlow: "rgba(192, 132, 252, 0.4)",
      }}
    />
  );
}
