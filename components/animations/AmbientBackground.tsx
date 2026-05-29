"use client";
// ── components/animations/AmbientBackground.tsx ──
// 🚀 ANTIGRAVITY — Decorative floating geometry

export default function AmbientBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Circle 1 — large, top-left */}
      <div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full border border-white/[0.03] animate-ambient-1"
      />

      {/* Circle 2 — small, bottom-right */}
      <div
        className="absolute bottom-32 right-16 w-24 h-24 rounded-full border border-white/[0.04] animate-ambient-2"
      />

      {/* Line 1 — diagonal, center-left */}
      <div
        className="absolute top-1/3 left-10 w-px h-48 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent animate-ambient-3 rotate-12"
      />

      {/* Line 2 — horizontal, mid */}
      <div
        className="absolute top-2/3 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-ambient-4"
      />

      {/* Line 3 — vertical, right */}
      <div
        className="absolute top-1/4 right-10 w-px h-64 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-ambient-5"
      />

      {/* Dot cluster 1 */}
      <div className="absolute top-20 right-1/3 flex gap-3 animate-ambient-2">
        <div className="w-1 h-1 rounded-full bg-white/[0.06]" />
        <div className="w-1 h-1 rounded-full bg-white/[0.04]" />
        <div className="w-1 h-1 rounded-full bg-white/[0.08]" />
      </div>

      {/* Dot cluster 2 */}
      <div className="absolute bottom-1/4 left-1/3 flex flex-col gap-2 animate-ambient-4">
        <div className="w-1.5 h-1.5 rounded-full bg-white/[0.05]" />
        <div className="w-1 h-1 rounded-full bg-white/[0.03]" />
      </div>

      {/* Rectangle — outlined */}
      <div
        className="absolute bottom-16 left-1/4 w-16 h-8 border border-white/[0.03] rotate-6 animate-ambient-1"
      />
    </div>
  );
}
