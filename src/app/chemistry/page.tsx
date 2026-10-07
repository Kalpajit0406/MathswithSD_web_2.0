import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function ChemistryPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Chemistry"
      icon="🧪"
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
