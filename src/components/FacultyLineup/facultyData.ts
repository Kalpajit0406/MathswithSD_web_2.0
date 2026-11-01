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
  subjectIcon?: string;
  subject?: string;
  qualification?: string;
  bio?: string;
}

export const FACULTY_MEMBERS: SubjectFaculty[] = [
  {
    id: "physics",
    name: "Physics (Rajesh Sir)",
    label: "Physics",
    subject: "Physics",
    subjectIcon: "⚡",
    qualification: "Senior Physics Faculty • 12+ Yrs Exp",
    bio: "Visual physics intuition, deep numerical problem solving, and rigorous preparation for CBSE/ISC, JEE & NEET aspirants.",
    route: "/physics",
    isLive: true,
    statusText: "Live Department",
    specialty: "Physics Made Simple with Rajesh Sir — Class 9-12 & JEE/NEET",
    bullets: [
      "Conceptual Clarity & Visual Physical Intuition",
      "Interactive Physical Simulations & Derivations",
      "Class 9-12 Foundation & JEE/NEET Numerical Mastery",
      "Dedicated Doubt-Clearing & Small Batches",
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
      heightClass: "h-[300px] sm:h-[335px] md:h-[370px]",
      zIndex: 10,
      scaleClass: "scale-[0.96] origin-bottom",
    },
    tooltipAlign: "left", // opens inward towards center-right
  },
  {
    id: "mathematics",
    name: "Mathematics (Soumen Sir)",
    label: "Mathematics",
    subject: "Mathematics",
    subjectIcon: "📐",
    qualification: "Academic Lead • 15+ Yrs Exp",
    bio: "Specializing in Calculus, Higher Algebra, and 3D visual mathematics for Board exams, JEE Main & Advanced.",
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
    id: "computer-science",
    name: "Computer Science (Arpan Sir)",
    label: "Computer Science",
    subject: "Computer Science",
    subjectIcon: "💻",
    qualification: "Senior CS Faculty • Coding Mentor",
    bio: "Hands-on coding, algorithms, DSA visualizer, and competitive programming for Class 11-12 (CBSE/ISC) & B.Tech / BCA.",
    route: "/computer-science",
    isLive: true,
    statusText: "Live Department",
    specialty: "Computer Science Made Simple with Arpan Sir — Coding & DSA",
    bullets: [
      "Programming Fundamentals (Python, C++, Java)",
      "Interactive DSA Visual Labs & Algorithmic Logic",
      "School (11-12) & College (B.Tech, BCA, MCA) Paths",
      "Hands-on Code Reviews & Personal Mentorship",
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
      heightClass: "h-[300px] sm:h-[335px] md:h-[370px]",
      zIndex: 10,
      scaleClass: "scale-[0.96] origin-bottom",
    },
    tooltipAlign: "right", // opens inward towards center-left
  },
];
