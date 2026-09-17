"use client";

import React from "react";
import Image from "next/image";

export type TeacherPose =
  | "standing"
  | "pointing"
  | "confident"
  | "thinking"
  | "presenting"
  | "thumbsup";

export interface PoseDefinition {
  id: TeacherPose;
  title: string;
  image: string;
  alt: string;
}

export const TEACHER_POSES: Record<TeacherPose, PoseDefinition> = {
  standing: {
    id: "standing",
    title: "Standing & Smiling",
    image: "/assets/cinematic/teacher_standing.png",
    alt: "Soumen Sir - Mathematics Teacher",
  },
  pointing: {
    id: "pointing",
    title: "Pointing & Guiding",
    image: "/assets/cinematic/teacher_pointing.png",
    alt: "Soumen Sir pointing to mathematics topic",
  },
  confident: {
    id: "confident",
    title: "Confident Mentorship",
    image: "/assets/cinematic/teacher_confident.png",
    alt: "Soumen Sir standing confident with arms crossed",
  },
  thinking: {
    id: "thinking",
    title: "Explaining & Reflecting",
    image: "/assets/cinematic/teacher_thinking.png",
    alt: "Soumen Sir explaining complex math problem",
  },
  presenting: {
    id: "presenting",
    title: "Open-Palm Presentation",
    image: "/assets/cinematic/teacher_presenting.png",
    alt: "Soumen Sir presenting mathematics course concept",
  },
  thumbsup: {
    id: "thumbsup",
    title: "Welcoming & Encouraging",
    image: "/assets/cinematic/teacher_thumbsup.png",
    alt: "Soumen Sir thumbs up encouragement",
  },
};

interface TeacherCharacterProps {
  pose?: TeacherPose;
  className?: string;
  height?: number;
  priority?: boolean;
}

export function TeacherCharacter({
  pose = "standing",
  className = "",
  height = 420,
  priority = false,
}: TeacherCharacterProps) {
  const poseData = TEACHER_POSES[pose] || TEACHER_POSES.standing;

  return (
    <div className={`relative inline-flex items-center justify-center transition-all duration-500 ${className}`}>
      <Image
        src={poseData.image}
        alt={poseData.alt}
        width={360}
        height={height}
        priority={priority}
        className="w-auto max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] transition-opacity duration-300 pointer-events-none"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
