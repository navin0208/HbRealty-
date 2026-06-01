"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import AmbientBackground from "@/components/animations/AmbientBackground";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slides = [
  {
    id: 1,
    image: "/Cam_06-scaled.jpg",
    heading: "Grade-A Warehousing",
    serifText: "Nashik",
    description: "Building Maharashtra's next generation of industrial infrastructure. From Osiyan MIDC to your doorstep — warehousing built right.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
    heading: "Land Development",
    serifText: "Experts",
    description: "Transforming raw land into thriving plotted communities and industrial parks across Nashik, Sinnar, and Dindori.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000",
    heading: "Global Advisory",
    serifText: "Dubai",
    description: "Cross-border real estate consulting through Sanghavi & Bafana — your bridge from Maharashtra to the UAE market.",
  },
];

export default function HeroCinematic() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Layer Refs for Parallax
  const ambientLayer = useRef<HTMLDivElement>(null);
  const imageLayer = useRef<HTMLDivElement>(null);
  const midLayer = useRef<HTMLDivElement>(null);
  const contentLayer = useRef<HTMLDivElement>(null);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrub
      }
    });

    // 5-Layer Parallax setup
    // 1. Ambient Layer (deepest) moves a bit down
    if (ambientLayer.current) tl.to(ambientLayer.current, { y: "20%", ease: "none" }, 0);
    
    // 2. Image Layer moves down more
    if (imageLayer.current) tl.to(imageLayer.current, { y: "30%", ease: "none" }, 0);
    
    // 3. Mid Layer (grain) moves slightly up to create depth contrast
    if (midLayer.current) tl.to(midLayer.current, { y: "-10%", ease: "none" }, 0);
    
    // 4. Content Layer moves down the fastest to clear the screen
    if (contentLayer.current) tl.to(contentLayer.current, { y: "50%", ease: "none", opacity: 0 }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const wordVariant = {
    hidden: { clipPath: "inset(100% 0 0 0)", y: 20 },
    visible: { 
      clipPath: "inset(0% 0 0 0)", 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const current = slides[currentSlide];
  const words = current.heading.split(" ");

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#062B4A]">
      
      {/* INITIAL CURTAIN WIPE (Only on mount) */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute inset-0 z-50 bg-[#041D34] origin-top pointer-events-none"
      />

      {/* LAYER 1: Ambient Floating Geometry */}
      <div ref={ambientLayer} className="absolute inset-0 z-0 opacity-60">
        <AmbientBackground />
      </div>

      {/* LAYER 2: Main Image with Ken Burns (Slider) */}
      <div ref={imageLayer} className="absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* 22s Ken Burns CSS class defined in globals.css */}
            <div className="absolute inset-0 w-full h-full animate-ken-burns origin-center scale-105">
              <Image 
                src={current.image} 
                alt={current.heading} 
                fill 
                className="object-cover opacity-60" 
                priority 
                sizes="100vw" 
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#062B4A]/80 via-[#062B4A]/20 to-[#062B4A] z-20" />
      </div>

      {/* LAYER 3: Mid-ground Texture/Grain */}
      <div ref={midLayer} className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] mix-blend-overlay" />
      </div>

      {/* LAYER 4: Content (Slider) */}
      <div ref={contentLayer} className="relative z-30 flex flex-col items-start justify-end h-screen pb-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl space-y-6"
          >
            
            {/* Eyebrow Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <div className="h-[1px] w-8 bg-white/40" />
              <span className="text-white/60 font-serif italic text-2xl md:text-3xl tracking-wide">{current.serifText}</span>
            </motion.div>

            {/* Headline Word-by-Word Reveal */}
            <motion.h1 
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.04, delayChildren: 0.4 }}
              className="text-5xl md:text-[110px] leading-[0.9] font-medium text-white tracking-tight flex flex-wrap gap-[0.2em]"
            >
              {words.map((word, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block pb-2">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="pl-0 md:pl-32 border-l-0 md:border-l border-white/20 pt-4"
            >
              <p className="text-white/60 text-lg md:text-xl max-w-lg font-light leading-relaxed pl-0 md:pl-8">
                {current.description}
              </p>
              
              {/* CTAs */}
              <div className="flex items-center gap-6 mt-10 pl-0 md:pl-8">
                <Link href="/portfolio" className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white text-[#062B4A] hover:text-[#A98B55] transition-all">
                  Explore Portfolio
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="group flex items-center gap-4 text-white/50 hover:text-[#A98B55] transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Contact Us</span>
                </Link>
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 right-12 z-40 hidden md:flex flex-col gap-4">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white scale-150' : 'bg-white/30 hover:bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* LAYER 5: Animated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.4em]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>

    </section>
  );
}
