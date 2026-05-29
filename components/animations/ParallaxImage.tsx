"use client";
// ── components/animations/ParallaxImage.tsx ──
// 🚀 ANTIGRAVITY — Parallax wrapper for images

import { useParallax } from "@/hooks/useParallax";
import { ReactNode } from "react";

interface ParallaxImageProps {
  speed?: number;
  className?: string;
  children: ReactNode;
}

export default function ParallaxImage({
  speed = 0.3,
  className = "",
  children,
}: ParallaxImageProps) {
  const parallaxRef = useParallax(speed);

  return (
    <div className={`overflow-hidden will-change-transform ${className}`}>
      <div ref={parallaxRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
