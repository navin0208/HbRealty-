"use client";
// ── components/animations/CurtainLoader.tsx ──
// 🚀 ANTIGRAVITY — Full-screen page load curtain that wipes away

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurtainLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on first visit per session
    if (typeof window === "undefined") return;

    const hasLoaded = sessionStorage.getItem("antigravity-loaded");
    if (!hasLoaded) {
      setVisible(true);
      sessionStorage.setItem("antigravity-loaded", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#080808] flex items-center justify-center"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            scaleY: {
              duration: 1.2,
              ease: [0.87, 0, 0.13, 1],
              delay: 0.4,
            },
          }}
          style={{ transformOrigin: "top" }}
          onAnimationComplete={() => setVisible(false)}
        >
          {/* Minimal loading mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/30 text-xs font-bold uppercase tracking-[0.8em]"
          >
            HB Realty
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
