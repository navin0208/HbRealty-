"use client";
// ── components/animations/SmoothScrollProvider.tsx ──
// 🚀 ANTIGRAVITY — Root-level Lenis smooth scroll initializer

import { useLenis } from "@/hooks/useLenis";
import { ReactNode } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
