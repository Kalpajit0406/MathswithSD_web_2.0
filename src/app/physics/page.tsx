import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function PhysicsPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Physics"
      icon="⚛"
      tagline="Mechanics, Electromagnetism, Quantum & Modern Physics"
      description="The Scholars Hub Physics Department is currently under development. This section will feature conceptual physics lessons, problem sets for JEE/NEET, and interactive physical simulations."
      badgeColor="bg-indigo-400"
      highlights={[
        "Mechanics & Thermodynamics",
        "Electromagnetism & Wave Optics",
        "Modern Physics & Atomic Structure",
        "Interactive Lab Simulations",
      ]}
    />
  );
}
