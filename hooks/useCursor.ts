"use client";
// ── hooks/useCursor.ts ──
// 🚀 ANTIGRAVITY — Custom luxury cursor with trailing ring + hover states

import { useRef, useEffect, useCallback } from "react";

interface CursorState {
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  ringScale: number;
  ringOpacity: number;
  dotScale: number;
  isHovering: boolean;
  label: string;
  blend: boolean;
}

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const state = useRef<CursorState>({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    ringScale: 1,
    ringOpacity: 1,
    dotScale: 1,
    isHovering: false,
    label: "",
    blend: false,
  });
  const rafId = useRef<number>(0);

  const lerp = useCallback((a: number, b: number, t: number) => {
    return a + (b - a) * t;
  }, []);

  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Respect reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const s = state.current;

    const handleMouseMove = (e: MouseEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']"
      );

      if (!closest) {
        s.ringScale = 1;
        s.dotScale = 1;
        s.isHovering = false;
        s.label = "";
        s.blend = false;
        return;
      }

      const cursorAttr = closest.getAttribute("data-cursor");

      if (cursorAttr === "view") {
        s.ringScale = 2.2;
        s.dotScale = 0;
        s.isHovering = true;
        s.label = "VIEW";
        s.blend = false;
      } else if (cursorAttr === "text") {
        s.ringScale = 0.4;
        s.dotScale = 0.2;
        s.isHovering = true;
        s.label = "";
        s.blend = false;
      } else {
        // Default link/button hover
        s.ringScale = 1.6;
        s.dotScale = 0.5;
        s.isHovering = true;
        s.label = "";
        s.blend = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related ||
        !related.closest?.("[data-cursor], a, button, [role='button']")
      ) {
        s.ringScale = 1;
        s.dotScale = 1;
        s.isHovering = false;
        s.label = "";
        s.blend = false;
      }
    };

    const animate = () => {
      s.ringX = lerp(s.ringX, s.x, 0.12);
      s.ringY = lerp(s.ringY, s.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.x - 8}px, ${s.y - 8}px) scale(${s.dotScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${s.ringX - 22}px, ${s.ringY - 22}px) scale(${s.ringScale})`;
        ringRef.current.style.mixBlendMode = s.blend
          ? "difference"
          : "normal";
        ringRef.current.style.backgroundColor = s.blend
          ? "rgba(255,255,255,0.9)"
          : "transparent";
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${s.ringX - 22}px, ${s.ringY - 22}px) scale(${s.ringScale})`;
        labelRef.current.textContent = s.label;
        labelRef.current.style.opacity = s.label ? "1" : "0";
      }

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return { dotRef, ringRef, labelRef };
}
