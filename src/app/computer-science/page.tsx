import { SubjectPlaceholderPage } from "@/components/ScholarsHub/SubjectPlaceholderPage";

export default function ComputerSciencePage() {
  return (
    <SubjectPlaceholderPage
      subjectName="Computer Science"
      icon="💻"
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
