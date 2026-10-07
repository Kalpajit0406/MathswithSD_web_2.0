export interface SubjectFaculty {
  id: string;
  name: string;
  label: string;
  route: string;
  isLive: boolean;
  statusText: string;
  specialty: string;
  bullets: string[];
  palette: {
    pastelBg: string;       // Floating block light background
    pastelBorder: string;   // Thin deeper border
    titleColor: string;     // High readability title
    textColor: string;      // High readability body
    pillBg: string;         // Subject label pill styling classes
    tintColor: string;      // Soft SVG backdrop tint on hover
    glowColor: string;      // Hover halo shadow
    badgeBg: string;        // Badge accent
  };
  silhouette: {
    type: "physics" | "chemistry" | "mathematics" | "biology" | "cs";
    gender: "male" | "female";
    heightClass: string;    // Poster hierarchy
    zIndex: number;         // Overlap stack order
    scaleClass: string;
  };
  tooltipAlign: "left" | "center" | "right";
}

export const FACULTY_MEMBERS: SubjectFaculty[] = [
  {
    id: "physics",
    name: "Physics",
    label: "Physics",
    route: "/physics",
    isLive: false,
    statusText: "Faculty Expansion",
    specialty: "Mechanics, Electromagnetism & Conceptual Simulations",
    bullets: [
      "Mechanics, Quantum & Electromagnetism",
      "Interactive Physical Simulations",
      "JEE & NEET Numerical Problem Solving",
      "Conceptual Core Foundations",
    ],
    palette: {
      pastelBg: "#f3e8ff",       // pale lavender
      pastelBorder: "#d8b4fe",   // purple-300
      titleColor: "#6b21a8",     // purple-700
      textColor: "#3b0764",      // purple-950
      pillBg: "bg-purple-100/90 text-purple-900 border-purple-300",
      tintColor: "#e9d5ff",      // purple-200
      glowColor: "rgba(192, 132, 252, 0.45)",
      badgeBg: "bg-purple-200 text-purple-900",
    },
    silhouette: {
      type: "physics",
      gender: "male",
      heightClass: "h-[290px] sm:h-[320px] md:h-[350px]",
      zIndex: 10,
      scaleClass: "scale-[0.94] origin-bottom",
    },
    tooltipAlign: "left", // opens inward towards center-right
  },
  {
    id: "chemistry",
    name: "Chemistry",
    label: "Chemistry",
    route: "/chemistry",
    isLive: false,
    statusText: "Faculty Expansion",
    specialty: "Organic Mechanisms, Physical Numericals & Lab Logic",
    bullets: [
      "Reaction Mechanisms & Synthesis Logic",
      "Physical Chemistry Numerical Mastery",
      "Inorganic Trends & NCERT Breakdown",
      "Competitive JEE & Board Prep",
    ],
    palette: {
      pastelBg: "#ecfdf5",       // pale mint
      pastelBorder: "#6ee7b7",   // emerald-300
      titleColor: "#047857",     // emerald-700
      textColor: "#022c22",      // emerald-950
      pillBg: "bg-emerald-100/90 text-emerald-900 border-emerald-300",
      tintColor: "#a7f3d0",      // emerald-200
      glowColor: "rgba(52, 211, 153, 0.45)",
      badgeBg: "bg-emerald-200 text-emerald-900",
    },
    silhouette: {
      type: "chemistry",
      gender: "male",
      heightClass: "h-[305px] sm:h-[335px] md:h-[365px]",
      zIndex: 20,
      scaleClass: "scale-[0.98] origin-bottom",
    },
    tooltipAlign: "center",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    label: "Mathematics",
    route: "/maths",
    isLive: true,
    statusText: "● Live Website & Coaching",
    specialty: "Soumen Sir's Calculus, Higher Algebra & 3D Visualizer",
    bullets: [
      "Calculus & Higher Algebra Focus",
      "Interactive 3D Visualizer & Whiteboard",
      "JEE Advanced & Board Mentorship",
      "Direct Personal Doubt Clearing",
    ],
    palette: {
      pastelBg: "#fef9c3",       // pale yellow/cream
      pastelBorder: "#fde047",   // yellow-300
      titleColor: "#854d0e",     // yellow-800
      textColor: "#422006",      // yellow-950
      pillBg: "bg-amber-100/95 text-amber-950 border-amber-400 shadow-sm",
      tintColor: "#fef08a",      // yellow-200
      glowColor: "rgba(250, 204, 21, 0.55)",
      badgeBg: "bg-amber-300 text-amber-950 font-bold",
    },
    silhouette: {
      type: "mathematics",
      gender: "male",
      heightClass: "h-[325px] sm:h-[360px] md:h-[395px]", // middle one slightly taller and in front
      zIndex: 30,
      scaleClass: "scale-105 origin-bottom",
    },
    tooltipAlign: "center",
  },
  {
    id: "biology",
    name: "Biology",
    label: "Biology",
    route: "/biology",
    isLive: false,
    statusText: "Faculty Expansion",
    specialty: "Human Physiology, Botany & NEET Specialization",
    bullets: [
      "High-Yield Diagrammatic Breakdown",
      "Human Physiology & Genetics Depth",
      "NEET UG Entrance Target Program",
      "Mnemonics & Visual Recall Systems",
    ],
    palette: {
      pastelBg: "#fff1f2",       // pale pink/peach
      pastelBorder: "#fda4af",   // rose-300
      titleColor: "#be123c",     // rose-700
      textColor: "#4c0519",      // rose-950
      pillBg: "bg-rose-100/90 text-rose-900 border-rose-300",
      tintColor: "#fecdd3",      // rose-200
      glowColor: "rgba(251, 113, 133, 0.45)",
      badgeBg: "bg-rose-200 text-rose-900",
    },
    silhouette: {
      type: "biology",
      gender: "male",
      heightClass: "h-[305px] sm:h-[335px] md:h-[365px]",
      zIndex: 20,
      scaleClass: "scale-[0.98] origin-bottom",
    },
    tooltipAlign: "center",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    label: "Computer Science",
    route: "/computer-science",
    isLive: false,
    statusText: "Faculty Expansion",
    specialty: "Data Structures, Algorithmic Thinking & Coding",
    bullets: [
      "Data Structures & Algorithmic Design",
      "Python, Java & C++ Programming",
      "Computational Logic & Problem Solving",
      "Modern Software Foundations",
    ],
    palette: {
      pastelBg: "#f0f9ff",       // pale sky blue
      pastelBorder: "#7dd3fc",   // sky-300
      titleColor: "#0369a1",     // sky-700
      textColor: "#082f49",      // sky-950
      pillBg: "bg-sky-100/90 text-sky-900 border-sky-300",
      tintColor: "#bae6fd",      // sky-200
      glowColor: "rgba(56, 189, 248, 0.45)",
      badgeBg: "bg-sky-200 text-sky-900",
    },
    silhouette: {
      type: "cs",
      gender: "male",
      heightClass: "h-[290px] sm:h-[320px] md:h-[350px]",
      zIndex: 10,
      scaleClass: "scale-[0.94] origin-bottom",
    },
    tooltipAlign: "right", // opens inward towards center-left
  },
];
