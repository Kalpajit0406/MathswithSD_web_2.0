"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
}

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  const roundedClass = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer bg-[#ede7dc]/70 ${roundedClass} ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl border border-[#ede7dc] bg-[#fdfbf7]/80 shadow-sm space-y-4">
      <Skeleton className="w-12 h-12" rounded="xl" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
      <div className="pt-2 flex items-center justify-between">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-8" rounded="full" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="w-full min-h-[500px] flex flex-col justify-center items-center text-center px-4 py-16 space-y-6">
      <Skeleton className="w-36 h-7" rounded="full" />
      <Skeleton className="w-3/4 max-w-2xl h-12 md:h-16" rounded="lg" />
      <Skeleton className="w-1/2 max-w-lg h-5" rounded="md" />
      <div className="flex flex-wrap gap-4 pt-4 justify-center">
        <Skeleton className="w-40 h-12" rounded="full" />
        <Skeleton className="w-36 h-12" rounded="full" />
      </div>
    </div>
  );
}

export function SkeletonSection({ rows = 3 }: { rows?: number }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <Skeleton className="w-32 h-6" rounded="full" />
        <Skeleton className="w-72 h-10" />
        <Skeleton className="w-96 max-w-full h-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonVideoIntro() {
  return (
    <div className="relative w-full h-[60vh] max-h-[600px] min-h-[360px] rounded-2xl overflow-hidden border border-[#ede7dc] bg-[#ede7dc]/40 flex flex-col items-center justify-center p-6 space-y-4">
      <Skeleton className="w-16 h-16" rounded="full" />
      <Skeleton className="w-48 h-6" />
      <Skeleton className="w-64 max-w-full h-4" />
    </div>
  );
}
