// ── lib/animation-variants.ts ──
// 🚀 ANTIGRAVITY — Shared Framer Motion variants

import type { Variants } from "framer-motion";

type BezierTuple = [number, number, number, number];
const EASE_IN: BezierTuple = [0.22, 1, 0.36, 1];
const EASE_SPRING_CURVE: BezierTuple = [0.34, 1.56, 0.64, 1];
const EASE_CURTAIN_CURVE: BezierTuple = [0.87, 0, 0.13, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_IN },
  },
};

export const fadeUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.65, ease: EASE_IN },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SPRING_CURVE },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  hover: {
    y: -12,
    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
    transition: { duration: 0.3, ease: EASE_SPRING_CURVE },
  },
};

export const navbarVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(12px)",
  },
};

export const curtainReveal: Variants = {
  initial: { scaleY: 1, transformOrigin: "top" },
  animate: {
    scaleY: 0,
    transition: { duration: 1.2, ease: EASE_CURTAIN_CURVE, delay: 0.2 },
  },
};

// Easing presets for inline use
export const EASE_CINEMATIC: BezierTuple = [0.22, 1, 0.36, 1];
export const EASE_EXIT: BezierTuple = [0.55, 0, 1, 0.45];
export const EASE_SPRING: BezierTuple = [0.34, 1.56, 0.64, 1];
export const EASE_CURTAIN: BezierTuple = [0.87, 0, 0.13, 1];
