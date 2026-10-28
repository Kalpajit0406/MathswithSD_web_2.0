import type { Metadata } from "next";
import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export const metadata: Metadata = {
  title: "Chemistry Department — Scholars Hub Kolkata",
  description:
    "Master Organic Mechanisms, Inorganic NCERT trends, and Physical Chemistry thermodynamics at Scholars Hub.",
  openGraph: {
    title: "Chemistry Department — Scholars Hub",
    description: "Deep conceptual foundations and problem solving for Board exams, WBJEE, JEE Main, and NEET.",
    siteName: "Scholars Hub",
  },
};

export default function ChemistryPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Chemistry"
      icon={
        <svg className="w-10 h-10 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      }
      tagline="Organic Mechanisms, Inorganic Trends & Physical Chemistry"
      description="The Scholars Hub Chemistry Department is under active preparation. Master reaction mechanisms, atomic structures, and comprehensive numerical solving for competitive examinations."
      highlights={[
        "Organic Reaction Mechanisms & Stereochemistry",
        "Physical Chemistry Thermodynamics & Kinetics",
        "Coordination Compounds & NCERT Trends",
        "Laboratory Synthesis Concept Walkthroughs",
      ]}
      pastel={{
        pageBg: "#f0fdf4",       // pale mint
        cardBg: "#ecfdf5",
        borderColor: "#6ee7b7",
        titleColor: "#047857",
        textColor: "#022c22",
        badgeBg: "bg-emerald-200 text-emerald-900",
        accentGlow: "rgba(52, 211, 153, 0.4)",
      }}
    />
  );
}
