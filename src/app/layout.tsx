import type { Metadata } from "next";
import { Space_Grotesk, Inter, Kalam, Caveat } from "next/font/google";
import "./globals.css";
import { CinematicLoader } from "@/components/CinematicLoader/CinematicLoader";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const chalk = Kalam({
  subsets: ["latin"],
  variable: "--font-chalk",
  weight: ["400", "700"],
  display: "swap",
});

const scriptFont = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MathsWithSD — Learn Mathematics with Soumen Sir",
  description:
    "MathsWithSD is Soumen Sir's mathematics classroom — real teaching, real problem-solving, brought online for Board & Entrance exams.",
  keywords: [
    "MathsWithSD",
    "Soumen Sir",
    "Mathematics Coaching",
    "Class 11 Maths",
    "Class 12 Maths",
    "JEE Main Maths",
    "WBJEE Maths",
    "Calculus Coaching Kolkata",
  ],
  authors: [{ name: "Soumen Sir" }],
  openGraph: {
    title: "MathsWithSD — Soumen Sir's Mathematics Coaching",
    description:
      "Experience how abstract calculus, algebra, and geometry transform into intuitive, visual logic.",
    siteName: "MathsWithSD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MathsWithSD — Soumen Sir's Mathematics Coaching",
    description:
      "Experience how abstract calculus, algebra, and geometry transform into intuitive, visual logic.",
  },
};

import { ProfileWrapper } from "@/components/ProfileSystem/ProfileWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${chalk.variable} ${scriptFont.variable}`} suppressHydrationWarning>
      <body className="font-body">
        <ProfileWrapper>
          <CinematicLoader />
          {children}
        </ProfileWrapper>
      </body>
    </html>
  );
}
