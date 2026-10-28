import type { Metadata } from "next";
import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export const metadata: Metadata = {
  title: "Computer Science Department — Scholars Hub Kolkata",
  description:
    "Systematic algorithmic training, data structures, and programming foundations in Python, Java, and C++ at Scholars Hub.",
  openGraph: {
    title: "Computer Science Department — Scholars Hub",
    description: "Computational thinking, informatics olympiad preparation, and programming mastery for school & entrance.",
    siteName: "Scholars Hub",
  },
};

export default function ComputerSciencePage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Computer Science"
      icon={
        <svg className="w-10 h-10 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      }
      tagline="Algorithms, Data Structures & Computational Thinking"
      description="The Scholars Hub Computer Science Department will offer systematic algorithmic training, programming foundations in Python, Java, and C++, and computational problem-solving for aspiring software engineers."
      highlights={[
        "Data Structures & Algorithmic Complexity",
        "Python, Java & C++ Programming Tracks",
        "Competitive Coding & Informatics Olympiad",
        "Full-Stack Web & Software Engineering Intro",
      ]}
      pastel={{
        pageBg: "#f0f9ff",       // pale sky blue
        cardBg: "#e0f2fe",
        borderColor: "#7dd3fc",
        titleColor: "#0369a1",
        textColor: "#082f49",
        badgeBg: "bg-sky-200 text-sky-900",
        accentGlow: "rgba(56, 189, 248, 0.4)",
      }}
    />
  );
}
