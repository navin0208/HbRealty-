"use client";
// ── hooks/useCountUp.ts ──
// 🚀 ANTIGRAVITY — Animated number counter triggered by viewport entry

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({
  target,
  duration = 1800,
  prefix = "",
  suffix = "",
}: UseCountUpOptions) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Respect reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplayValue(`${prefix}${target.toLocaleString()}${suffix}`);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration, prefix, suffix]);

  return { ref, displayValue };
}
