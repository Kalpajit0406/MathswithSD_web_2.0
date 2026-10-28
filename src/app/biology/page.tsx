import type { Metadata } from "next";
import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export const metadata: Metadata = {
  title: "Biology Department — Scholars Hub Kolkata",
  description:
    "Comprehensive life science education: Human Physiology, Genetics, Botany, and specialized NEET UG training at Scholars Hub.",
  openGraph: {
    title: "Biology Department — Scholars Hub",
    description: "High-yield diagrammatic guides and conceptual depth for CBSE/ISC Boards and NEET UG entrance.",
    siteName: "Scholars Hub",
  },
};

export default function BiologyPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Biology"
      icon="🧬"
      tagline="Human Physiology, Genetics, Botany & NEET Excellence"
      description="The Scholars Hub Biology Department will soon provide comprehensive life science education, high-yield diagrams, human physiology deep dives, and specialized NEET UG training."
      highlights={[
        "Human Physiology & Endocrine Systems",
        "Genetics, Molecular Biology & Evolution",
        "Plant Morphology & Plant Physiology",
        "High-Yield Diagrammatic Memory Guides",
      ]}
      pastel={{
        pageBg: "#fff5f5",       // pale pink/peach
        cardBg: "#fff1f2",
        borderColor: "#fda4af",
        titleColor: "#be123c",
        textColor: "#4c0519",
        badgeBg: "bg-rose-200 text-rose-900",
        accentGlow: "rgba(251, 113, 133, 0.4)",
      }}
    />
  );
}
