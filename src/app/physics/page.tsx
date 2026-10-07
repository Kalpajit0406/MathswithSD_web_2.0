import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function PhysicsPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Physics"
      icon="⚛"
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
