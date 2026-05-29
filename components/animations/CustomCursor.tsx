"use client";
// ── components/animations/CustomCursor.tsx ──
// 🚀 ANTIGRAVITY — Custom luxury cursor with dot + trailing ring

import { useCursor } from "@/hooks/useCursor";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const { dotRef, ringRef, labelRef } = useCursor();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);

    // Respect reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) setIsTouch(true);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Dot — follows cursor instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[10001]"
        style={{
          willChange: "transform",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring — follows with lerp delay */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-11 h-11 rounded-full border border-white/40 pointer-events-none z-[10001] flex items-center justify-center"
        style={{
          willChange: "transform",
          transition: "background-color 0.3s, mix-blend-mode 0.3s",
        }}
      />

      {/* Label — appears inside ring on data-cursor="view" */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[10002] flex items-center justify-center text-[7px] font-bold uppercase tracking-[0.2em] text-white opacity-0"
        style={{
          willChange: "transform",
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
}
