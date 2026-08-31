import type { Metadata } from "next";
import { Space_Grotesk, Inter, Kalam, Caveat } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const chalk = Kalam({
  subsets: ["latin"],
  variable: "--font-chalk",
  weight: ["400", "700"],
});

const scriptFont = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "MathsWithSD — Learn Mathematics with Soumen Sir",
  description:
    "MathsWithSD is Soumen Sir's mathematics classroom — real teaching, real problem-solving, brought online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${chalk.variable} ${scriptFont.variable}`} suppressHydrationWarning>
      <body className="font-body">{children}</body>
    </html>
  );
}
