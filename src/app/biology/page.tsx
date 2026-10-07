import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

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
