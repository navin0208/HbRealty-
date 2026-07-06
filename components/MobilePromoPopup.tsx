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
      // Check if user previously closed it in this session
      const hasClosed = sessionStorage.getItem("promo_closed");
      if (!hasClosed) {
        setIsVisible(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem("promo_closed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-[99] md:hidden"
        >
          <Link href="/properties" className="block relative bg-[#062B4A] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#A98B55]/20 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] mix-blend-overlay opacity-10 pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 bg-white/5 rounded-full text-white/50 hover:text-white transition-colors z-10"
              aria-label="Close Promo"
            >
              <X size={16} />
            </button>

            <div className="p-5 flex items-center gap-4">
              <div className="p-3 bg-[#A98B55]/20 rounded-xl text-[#A98B55] shrink-0 border border-[#A98B55]/20">
                <Home size={24} />
              </div>
              <div className="flex-1">
                <span className="text-[#A98B55] text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Looking for Properties?</span>
                <h3 className="text-white text-lg font-bold uppercase tracking-tight leading-none mb-1">
                  Buy • Sell • Lease
                </h3>
                <p className="text-white/60 text-xs font-light">Explore premium industrial spaces.</p>
              </div>
              <div className="shrink-0 p-3 bg-[#A98B55] text-[#062B4A] rounded-full group-hover:scale-110 transition-transform">
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
