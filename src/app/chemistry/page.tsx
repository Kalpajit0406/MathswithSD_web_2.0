import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function ChemistryPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Chemistry"
      icon="🧪"
      tagline="Organic Reaction Logic, Inorganic Concepts & Physical Numericals"
      description="The Scholars Hub Chemistry Department is under preparation. It will host step-by-step organic mechanism maps, physical chemistry solver guides, and targeted Board & Entrance prep."
      badgeColor="bg-teal-400"
      highlights={[
        "Organic Reaction Mechanisms",
        "Physical Chemistry Problem Solving",
        "Inorganic Periodic Trends & Bonding",
        "JEE Main & NEET Question Banks",
      ]}
    />
  );
}
