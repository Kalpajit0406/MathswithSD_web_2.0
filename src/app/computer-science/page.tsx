import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function ComputerSciencePage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Computer Science"
      icon="💻"
      tagline="Data Structures, Algorithmic Logic & Programming"
      description="The Scholars Hub Computer Science Department is coming soon. Master programming fundamentals, algorithmic problem solving, object-oriented concepts, and software logic."
      badgeColor="bg-sky-400"
      highlights={[
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java/Python)",
        "Database Management Systems",
        "Board & Olympiad Coding Prep",
      ]}
    />
  );
}
