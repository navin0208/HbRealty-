"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight, Home } from "lucide-react";

export default function MobilePromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-8 left-4 right-4 z-[9999] md:hidden"
        >
          <Link href="/properties?view=list" className="block relative bg-[#062B4A] rounded-[18px] overflow-hidden shadow-2xl border border-white/10 group">
            
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#A98B55]/20 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] mix-blend-overlay opacity-10 pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-transparent text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all z-10"
              aria-label="Close Promo"
            >
              <X size={14} />
            </button>

            <div className="p-3 pr-10 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#A98B55] to-[#8C7040] rounded-xl text-[#062B4A] shrink-0 shadow-lg shadow-[#A98B55]/20">
                <Home size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-white text-sm font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">
                  Looking for Properties?
                </h3>
                <p className="text-[#A98B55] text-[9px] font-bold uppercase tracking-[0.2em]">
                  Buy • Sell • Lease
                </p>
              </div>
              <div className="shrink-0 text-white/40 group-hover:text-[#A98B55] group-hover:translate-x-1 transition-all mr-2">
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
