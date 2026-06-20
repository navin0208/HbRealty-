"use client";
// 🚀 ANTIGRAVITY — Enhanced Navbar with motion variants

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { fadeUp, EASE_CINEMATIC } from "@/lib/animation-variants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🚀 ANTIGRAVITY — useScroll replaces manual scroll listener
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>

      <motion.nav
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top: {
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
          },
          scrolled: {
            backgroundColor: "rgba(6, 43, 74, 0.95)",
            backdropFilter: "blur(12px)",
          },
        }}
        transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-700 ${
          scrolled ? "border-white/5 py-4" : "border-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* 🚀 ANTIGRAVITY — Animated logo entrance */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-4 text-white hover:opacity-70 transition-opacity duration-500 shrink-0">
              <Image src="/logo.png" alt="HB Realty Logo" width={100} height={32} className="brightness-0 invert object-contain" style={{ width: "auto", height: "auto" }} priority />
            </Link>
          </motion.div>

          {/* 🚀 ANTIGRAVITY — Staggered nav links entrance */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_CINEMATIC, delay: 0.3 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="relative group py-2"
                  >
                    <span className={`text-sm font-medium tracking-wide transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/50 group-hover:text-[#A98B55]"
                    }`}>
                      {link.label}
                    </span>
                    {/* 🚀 ANTIGRAVITY — layoutId floating active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 w-full h-px bg-white"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 h-px bg-white/40 w-0 group-hover:w-full transition-all duration-500 ease-cinematic" />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            <div className="w-px h-4 bg-white/20 ml-2 mr-2" />

            {/* Elegant Properties Link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_CINEMATIC, delay: 0.7 }}
            >
              <Link
                href="/properties"
                className="text-sm font-medium text-white/50 hover:text-[#A98B55] transition-colors duration-500"
              >
                Buy / Sell
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/70 hover:text-[#A98B55] transition-colors"
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* 🚀 ANTIGRAVITY — Mobile menu with clipPath slide-down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-40 bg-[#041D34] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE_CINEMATIC }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full py-4 text-4xl font-serif italic transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/40 hover:text-[#A98B55]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE_CINEMATIC }}
              className="mt-4 pt-8 border-t border-white/10 w-48 text-center"
            >
              <Link
                href="/properties"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-4 text-sm font-medium tracking-widest uppercase text-white/50 hover:text-[#A98B55] transition-colors"
              >
                Buy / Sell
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
