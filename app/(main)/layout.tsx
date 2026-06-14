"use client";
// 🚀 ANTIGRAVITY — Enhanced main layout with animation providers

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// Dynamic imports for GSAP-heavy components (SSR-safe)
const SmoothScrollProvider = dynamic(
  () => import("@/components/animations/SmoothScrollProvider"),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/animations/ScrollProgress"),
  { ssr: false }
);
const CurtainLoader = dynamic(
  () => import("@/components/animations/CurtainLoader"),
  { ssr: false }
);

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SmoothScrollProvider>
      {/* 🚀 ANTIGRAVITY — Scroll progress bar */}
      <ScrollProgress />

      {/* 🚀 ANTIGRAVITY — Page load curtain (first visit only) */}
      <CurtainLoader />

      <Navbar />
      
      {/* 🚀 ANTIGRAVITY — Page Transitions */}
      <AnimatePresence mode="wait" onExitComplete={() => {
        // @ts-ignore
        if (window.lenis) {
          // @ts-ignore
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow flex flex-col"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </SmoothScrollProvider>
  );
}
