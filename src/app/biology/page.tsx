import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function BiologyPage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Biology"
      icon="🧬"
      tagline="Botany, Zoology, Genetics & Human Physiology"
      description="The Scholars Hub Biology Department is preparing for rollout. Designed specifically for medical entrance aspirants and board excellence with visual diagrammatic learning."
      badgeColor="bg-emerald-400"
      highlights={[
        "Human Anatomy & Physiology",
        "Genetics & Molecular Biology",
        "Plant Physiology & Ecology",
        "NEET Focused Mock Series",
      ]}
    />
  );
}
