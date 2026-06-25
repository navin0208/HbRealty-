"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useTransform, useMotionTemplate, useInView, useSpring, useScroll } from "framer-motion";
import { Menu, ArrowRight, Play, ChevronRight, Globe, Shield, Zap, Target, CheckCircle2, Award, Building2, Scale, Users, Plus, Minus, AlertCircle, RefreshCcw, TrendingUp, CheckCircle, FileText, Gavel, Construction, ArrowLeft, MoveRight, MapPin, Phone, Mail, Clock, Volume2, VolumeX, Briefcase, X } from "lucide-react";
import LiquidLogoSection from "@/components/LiquidLogoSection";
import { useElementScrollProgress, type ElementScrollOffset } from "@/components/useElementScrollProgress";
import HeroCinematic from "@/components/animations/HeroCinematic";
import { cardHover, scaleIn, blurIn, staggerContainerSlow, fadeUp, fadeUpStagger } from "@/lib/animation-variants"; // 🚀 ANTIGRAVITY
import StatsSection from "./stats";
import { AboutSection, LandDevelopmentSection } from "./abt";
import TrustedPartners from "@/components/sections/TrustedPartners";
import Testimonials from "@/components/sections/Testimonials";
import { projects as portfolioProjects } from "./portfolio/page";

const SCROLL_REVEAL_OFFSET: ElementScrollOffset = ["start 0.9", "start 0.4"];
const WAREHOUSE_SCROLL_OFFSET: ElementScrollOffset = ["start end", "end start"];

// --- Advanced Scroll Effects Component ---
function ScrollRevealText({
  text,
  className,
  effect = "reveal",
}: {
  text: string;
  className?: string;
  effect?: "reveal" | "blur" | "kerning" | "scramble";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useElementScrollProgress(containerRef, SCROLL_REVEAL_OFFSET);

  const revealPct = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const revealPctEnd = useTransform(scrollYProgress, [0, 1], [20, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.5em", "0em"]);

  const maskImage = useMotionTemplate`linear-gradient(to right, rgba(0,0,0,1) ${revealPct}%, rgba(0,0,0,0.1) ${revealPctEnd}%)`;

  const [scrambled, setScrambled] = useState(text);
  useEffect(() => {
    if (effect !== "scramble") return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.1 && v < 0.9) {
        const chars = "!@#$%^&*()_+{}[]|;:,.<>?";
        const newText = text.split('').map((char, i) => {
          if (char === ' ' || i < text.length * v) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        setScrambled(newText);
      } else if (v >= 0.9) {
        setScrambled(text);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, text, effect]);

  return (
    <div ref={containerRef} className="relative overflow-visible inline-block w-full text-left">
      <motion.span
        style={{
          opacity,
          y: effect === "scramble" ? 0 : y,
          filter: effect === "blur" ? useMotionTemplate`blur(${blur}px)` : "none",
          letterSpacing: effect === "kerning" ? letterSpacing : "inherit",
          WebkitMaskImage: effect === "reveal" ? maskImage : "none",
          maskImage: effect === "reveal" ? maskImage : "none",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          display: "inline-block",
        }}
        className={className}
      >
        {effect === "scramble" ? scrambled : text}
      </motion.span>
    </div>
  );
}

const services = [
  {
    id: 1,
    title: "Grade A Industrial Sheds",
    desc: "Modern, secure industrial sheds with advanced facilities and flexible spaces.",
    image: "/compressed_Warehouse p3.jpg",
    icon: <Building2 className="w-6 h-6" />,
    color: "#f97316",
    accent: "Logistics Excellence"
  },
  {
    id: 2,
    title: "Land Development",
    desc: "Strategic land development built for compliance and long-term value.",
    image: "/Land-Development-HBRealtyindia-min-scaled.jpg",
    icon: <Construction className="w-6 h-6" />,
    color: "#a855f7",
    accent: "Strategic Growth"
  },
  {
    id: 3,
    title: "Land Legal Services",
    desc: "Complete legal and liaisoning support in Nashik from title verification to government approvals and NOCs.",
    image: "/Warehouse-Legal-Clearance-min-scaled.jpg",
    icon: <Scale className="w-6 h-6" />,
    color: "#3b82f6",
    accent: "Legal Mastery"
  },
  {
    id: 4,
    title: "Industrial Shed Legal Clearance",
    desc: "Fast and reliable approvals for fire safety, environmental compliance, and operational licenses.",
     image: "/compressed_warehouse_clearance.jpg",
    icon: <FileText className="w-6 h-6" />,
    color: "#10b981",
    accent: "Operational Speed"
  },
  {
    id: 5,
    title: "Lease Advisory",
    desc: "Expert advice and negotiation for industrial shed leasing to secure the best terms for your business.",
    image: "/Warehouse-Lease-Advisory-min-scaled.jpg",
    icon: <Briefcase className="w-6 h-6" />,
    color: "#ec4899",
    accent: "Market Intelligence"
  },
  {
    id: 6,
    title: "Land Consultancy",
    desc: "Trusted land consultants providing investment insights, due diligence, and transaction support across Maharashtra.",
    image: "/plot-development-.jpg",
    icon: <Globe className="w-6 h-6" />,
    color: "#06b6d4",
    accent: "Advisory Excellence"
  }
];


export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [activeProjectTab, setActiveProjectTab] = useState("All");
  const [activeReel, setActiveReel] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const warehouseRef = useRef<HTMLElement>(null);
  const warehouseScroll = useElementScrollProgress(warehouseRef, WAREHOUSE_SCROLL_OFFSET);

  const warehouseY = useTransform(warehouseScroll, [0, 1], ["-10%", "10%"]);
  const panelY = useTransform(warehouseScroll, [0, 1], ["8%", "-8%"]);

  // Scroll-driven "From Vision to Reality" marquee
  const visionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: visionScroll } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });
  const visionX = useTransform(visionScroll, [0, 1], ["15%", "-60%"]);
  const visionX2 = useTransform(visionScroll, [0, 1], ["-30%", "20%"]);
  const visionOpacity = useTransform(visionScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const visionScale = useTransform(visionScroll, [0, 0.5, 1], [0.9, 1, 0.9]);



  // Auto-play for Services Carousel (Slower cycle for readability)
  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setTimerProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        setActiveService((prev) => (prev + 1) % services.length);
        elapsed = 0;
        setTimerProgress(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [activeService]);

  return (
    <main className="relative min-h-screen w-full bg-white font-sans scroll-smooth overflow-x-hidden selection:bg-[#062B4A] selection:text-white">
      <HeroCinematic />

      <StatsSection />

      <AboutSection />
      <LandDevelopmentSection />

      {/* ═══════════════════════════════════════════════════════════
          SCROLL-DRIVEN "FROM VISION TO REALITY" MARQUEE
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={visionRef}
        className="relative py-8 md:py-12 overflow-hidden bg-[#FAF9F6] border-y border-[#062B4A]/5"
      >
        {/* Ambient gradient blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#A98B55]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#062B4A]/5 blur-[100px] pointer-events-none" />

        <motion.div style={{ opacity: visionOpacity, scale: visionScale }} className="relative z-10">
          {/* Row 1: slides right to left */}
          <motion.div style={{ x: visionX }} className="flex items-center gap-8 md:gap-12 whitespace-nowrap mb-2 md:mb-4">
            <span className="text-[#062B4A] text-[48px] sm:text-[64px] md:text-[100px] lg:text-[140px] font-bold tracking-tighter uppercase leading-none">From Vision</span>
            <div className="h-[3px] w-16 md:w-32 bg-[#A98B55] rounded-full shrink-0" />
            <span className="text-[#062B4A]/10 text-[48px] sm:text-[64px] md:text-[100px] lg:text-[140px] font-bold tracking-tighter uppercase leading-none">Precision</span>
            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#A98B55] shrink-0" />
            <span className="text-[#062B4A]/20 text-[48px] sm:text-[64px] md:text-[100px] lg:text-[140px] font-bold tracking-tighter uppercase leading-none">Legacy</span>
          </motion.div>

          {/* Row 2: slides left to right */}
          <motion.div style={{ x: visionX2 }} className="flex items-center gap-8 md:gap-12 whitespace-nowrap">
            <span className="text-[#062B4A]/10 text-[48px] sm:text-[64px] md:text-[100px] lg:text-[140px] font-bold tracking-tighter uppercase leading-none">Craft</span>
            <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#062B4A]/20 shrink-0" />
            <span className="text-[#062B4A] text-[48px] sm:text-[64px] md:text-[100px] lg:text-[140px] font-bold tracking-tighter uppercase leading-none">To Reality</span>
            <div className="h-[3px] w-16 md:w-32 bg-[#062B4A]/20 rounded-full shrink-0" />
            <span className="text-[#A98B55]/30 text-[48px] sm:text-[64px] md:text-[100px] lg:text-[140px] font-serif italic font-normal tracking-tighter lowercase leading-none">mastery</span>
          </motion.div>
        </motion.div>
      </section>

      {/* IMMERSIVE CINEMATIC VIDEO */}
      <section className="relative w-full bg-white py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#062B4A]/20" />
                <span className="text-[#062B4A]/60 text-[10px] font-bold uppercase tracking-[0.3em]">Cinematic View</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium text-[#062B4A] tracking-tight">
                Production <span className="font-medium text-[#A98B55]">Showcase</span>
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Reels Container (Responsive Carousel) */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[1, 2, 3].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[75vw] sm:w-[60vw] md:w-full aspect-[9/16] shrink-0 snap-center rounded-[24px] md:rounded-[30px] overflow-hidden group shadow-xl border border-[#062B4A]/10 bg-[#041D34]"
              >
                {/* Reel Placeholder Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-[10s]"
                >
                  <source src={i === 0 ? "/Video-64.mp4" : i === 1 ? "/Video-305.mp4" : "/Video-996.mp4"} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                
                {/* Reel Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                  <div 
                    className="flex items-center gap-3 mb-4 pointer-events-auto cursor-pointer w-fit group/btn"
                    onClick={() => setActiveReel(i === 0 ? "/Video-64.mp4" : i === 1 ? "/Video-305.mp4" : "/Video-996.mp4")}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-[#041D34] transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <Play fill="currentColor" size={14} className="ml-1" />
                    </div>
                    <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors drop-shadow-md">Play Reel</span>
                  </div>
                  <h3 className="text-white font-medium text-lg md:text-xl lg:text-2xl leading-snug">
                    {i === 0 && "Transforming Nashik's Industrial Landscape"}
                    {i === 1 && "Inside Osiyan: Grade-A Infrastructure"}
                    {i === 2 && "The Future of Industrial Sheds"}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC TRANSFORMATION SECTION */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#FAF9F6] border-b border-[#062B4A]/10 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-4">
            <span className="text-[#062B4A]/50 text-xs font-bold uppercase tracking-[0.6em] block">Business Lifecycle</span>
            <h2 className="text-4xl md:text-7xl font-bold text-[#062B4A] tracking-tighter uppercase leading-[0.9]">Strategic <span className="font-serif italic font-normal text-zinc-400 lowercase">Transformation</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#062B4A]/10 to-transparent hidden md:block -translate-y-1/2 pointer-events-none" />
            
            {/* Challenge Card (Light) */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative p-10 md:p-14 bg-white border border-[#062B4A]/10 rounded-[40px] md:rounded-none md:rounded-l-[40px] shadow-sm group hover:bg-zinc-50 transition-all flex flex-col items-start text-left">
              <div className="mb-10 p-4 rounded-2xl bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform"><AlertCircle size={28} /></div>
              <h3 className="text-[#062B4A] text-2xl font-bold uppercase tracking-widest mb-8">The Challenge</h3>
              <ul className="space-y-6">
                {["Unclear land titles.", "Delayed approvals.", "Poor layout planning.", "Hidden infrastructure costs."].map((item, i) => (
                  <li key={i} className="text-[#062B4A]/60 text-sm font-light tracking-wide flex items-center gap-4">
                    <div className="h-[1px] w-4 bg-red-500/30" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Approach Card (Subtle tint) */}
            <motion.div initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative p-10 md:p-14 bg-[#062B4A]/5 border-y md:border-y-0 md:border-x border-[#062B4A]/10 md:z-10 shadow-md flex flex-col items-start text-left">
              <div className="mb-10 p-4 rounded-2xl bg-purple-500/10 text-purple-500"><RefreshCcw size={28} /></div>
              <h3 className="text-[#062B4A] text-2xl font-bold uppercase tracking-widest mb-8">Our Approach</h3>
              <ul className="space-y-6">
                {["Verified documentation.", "Approved master planning.", "Infrastructure-ready plots.", "Transparent development process."].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="text-[#062B4A]/70 text-sm font-light tracking-wide flex items-center gap-4">
                    <div className="h-[1px] w-4 bg-purple-500/50" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Advantage Card (Inverted Highlight) */}
            <motion.div initial={{ opacity: 0, x: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative p-10 md:p-14 bg-[#062B4A] rounded-[40px] md:rounded-none md:rounded-r-[40px] shadow-2xl flex flex-col items-start text-left group">
              <div className="mb-10 p-4 rounded-2xl bg-white/10 text-[#A98B55] group-hover:scale-110 transition-transform"><TrendingUp size={28} /></div>
              <h3 className="text-white text-2xl font-bold uppercase tracking-widest mb-8">Your Advantage</h3>
              <ul className="space-y-6">
                {["Secure ownership", "Faster execution", "Operational efficiency", "Long-term capital growth"].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }} className="text-white/70 text-sm font-light tracking-wide flex items-center gap-4">
                    <CheckCircle size={16} className="text-[#A98B55]" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ULTRA-PREMIUM CINEMATIC CAPABILITIES CAROUSEL */}
      <section className="relative bg-[#062B4A] py-12 md:py-16 lg:py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-24 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} className="h-[1px] bg-white/20" />
                <span className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.6em] sm:tracking-[0.8em] block">Industrial Mastery</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-bold text-white tracking-tighter uppercase leading-[0.9] sm:leading-[0.85]">
                What  <br />
                <span className="font-serif italic font-normal text-zinc-500 lowercase">We do</span>
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-6 md:gap-10 w-full md:w-auto">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide max-w-full">
                {services.map((_, i) => (
                  <button key={i} onClick={() => { setActiveService(i); setTimerProgress(0); }} className="group relative py-2 px-1 sm:py-4 sm:px-2 shrink-0">
                    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                      <span className={`text-[9px] sm:text-[10px] font-bold transition-colors ${activeService === i ? 'text-white' : 'text-white/20'}`}>0{i + 1}</span>
                      <div className="relative w-8 sm:w-12 h-[2px] bg-white/10 overflow-hidden">
                        {activeService === i && <motion.div initial={{ width: 0 }} animate={{ width: `${timerProgress}%` }} className="absolute inset-0 bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 sm:gap-4 self-end md:self-auto">
                <button onClick={() => { setActiveService(prev => (prev - 1 + services.length) % services.length); setTimerProgress(0); }} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-[#A98B55] hover:border-white transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <ArrowLeft size={18} className="sm:hidden relative z-10" />
                  <ArrowLeft size={24} className="hidden sm:block relative z-10" />
                </button>
                <button onClick={() => { setActiveService(prev => (prev + 1) % services.length); setTimerProgress(0); }} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-[#A98B55] hover:border-white transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <ArrowRight size={18} className="sm:hidden relative z-10" />
                  <ArrowRight size={24} className="hidden sm:block relative z-10" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[550px] sm:h-[650px] md:h-[750px] lg:h-[800px] w-full rounded-3xl md:rounded-[60px] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div key={activeService} initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                <Image src={services[activeService].image} alt={services[activeService].title} fill className="object-cover brightness-75 transition-transform duration-[20s] group-hover:scale-110 ease-out" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-[#062B4A]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#062B4A]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 p-6 sm:p-12 md:p-20 lg:p-24 flex flex-col justify-end items-start">
                  <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="max-w-4xl space-y-6 sm:space-y-10">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-4"><div className="h-[2px] w-6 sm:w-8 bg-white" /><span className="text-white font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px]">{services[activeService].accent}</span></div>
                      <h3 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-[90px] xl:text-[100px] font-bold tracking-tighter uppercase leading-[0.9] sm:leading-[0.8] drop-shadow-2xl">
                        {services[activeService].title.split(' & ').map((part, i) => (<span key={i} className="block">{i > 0 && <span className="text-zinc-500 font-serif lowercase italic mr-2 sm:mr-4">&</span>}{part}</span>))}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm sm:text-base md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl tracking-tight">{services[activeService].desc}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 sm:pt-8">
                      {services[activeService].id === 1 ? (
                        <Link href="/warehousing-2">
                          <motion.button whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] transition-all bg-white/10 hover:bg-white hover:text-[#062B4A] py-3.5 px-7 sm:py-4.5 sm:px-9 rounded-full backdrop-blur-xl border border-white/10">
                            Learn More <MoveRight size={14} />
                          </motion.button>
                        </Link>
                      ) : services[activeService].id === 2 ? (
                        <Link href="/land-development">
                          <motion.button whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] transition-all bg-white/10 hover:bg-white hover:text-[#062B4A] py-3.5 px-7 sm:py-4.5 sm:px-9 rounded-full backdrop-blur-xl border border-white/10">
                            Learn More <MoveRight size={14} />
                          </motion.button>
                        </Link>
                      ) : null}
                      <Link href="/contact">
                        <motion.button whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] transition-all bg-white hover:bg-white/80 text-[#062B4A] py-3.5 px-7 sm:py-4.5 sm:px-9 rounded-full border border-white/10">
                          Enquire Now <MoveRight size={14} />
                        </motion.button>
                      </Link>
                      <div className="hidden md:flex items-center gap-4 px-8 py-4 border-l border-white/10"><div className="p-3 rounded-xl bg-white/5 text-white">{services[activeService].icon}</div><span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">Operational Excellence</span></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-6 left-6 sm:top-12 sm:left-12 flex flex-col gap-3 sm:gap-4"><div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse" /><div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/20" /><div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/20" /></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LEGAL LEGACY — ADV. MANOJ BAFANA
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#041D34] py-12 md:py-20 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] mix-blend-overlay opacity-5 pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden shadow-2xl group">
                <Image 
                  src="/compressed_Manoj-Bafana.jpg"
                  alt="Adv. Manoj Bafana"
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041D34]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 border border-white/10 rounded-[30px] pointer-events-none" />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-12 bg-[#A98B55] text-[#041D34] p-6 md:p-8 rounded-full flex items-center justify-center shadow-xl border-4 border-[#041D34]">
                <div className="text-center">
                  <span className="block text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-1">27+</span>
                  <span className="block text-[8px] font-bold uppercase tracking-[0.2em]">Years of<br/>Legacy</span>
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:col-span-7 pt-10 lg:pt-0"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#A98B55]" />
                <span className="text-[#A98B55] text-[10px] font-bold uppercase tracking-[0.3em]">Our Strategic Partner</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-[70px] font-medium text-white tracking-tight leading-[1.1] mb-6">
                Legal Mastery & <br/>
                <span className="font-serif italic font-light text-white/60">Foresight</span>
              </h2>
              
              <h3 className="text-xl md:text-2xl text-white font-medium mb-8 tracking-wide">
                Adv. Manoj Bafana & Associates
              </h3>

              <div className="space-y-6 text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl relative">
                <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#A98B55] to-transparent" />
                <p className="pl-4 md:pl-0">
                  With a rich experience spanning over 27 years, the firm has built a strong reputation for its expertise, professionalism, and commitment to delivering top-notch legal solutions to its clients in land and properties.
                </p>
                <p className="pl-4 md:pl-0">
                  Advocate Manoj R Bafana & Associates is a reputable and established legal firm, specialising in various aspects of land matters and related legal services.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 md:gap-8 border-t border-white/10 pt-10">
                <div className="space-y-1">
                  <span className="text-white text-base md:text-lg font-medium block">Title Verification</span>
                  <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] block">Due Diligence</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="space-y-1">
                  <span className="text-white text-base md:text-lg font-medium block">Gov. Approvals</span>
                  <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] block">Liaisoning</span>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                <div className="space-y-1 hidden sm:block">
                  <span className="text-white text-base md:text-lg font-medium block">Dispute Resolution</span>
                  <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] block">Legal Support</span>
                </div>
              </div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DUBAI — ACT I: CINEMATIC VIDEO MOMENT
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] sm:h-[80vh] md:h-screen bg-[#062B4A] overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative w-full h-full overflow-hidden group rounded-[32px] md:rounded-[60px] lg:rounded-[80px] border border-white/10 shadow-2xl"
        >
          {/* Unobstructed Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Dubai-compressed.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Vignette — soft fade on ALL edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-transparent to-[#062B4A]/20 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#062B4A]/80 to-transparent z-10" />

          {/* Title Card — Bottom-aligned with staggered premium animations */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 sm:pb-16 md:pb-24">
            <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12">
              <div className="max-w-6xl">
                {/* Label line */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="h-[2px] bg-white/40"
                />
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[1em]">UAE Advisory Division</span>
              </motion.div>

              {/* "Built for" */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-bold text-white tracking-tighter uppercase leading-[0.85] sm:leading-[0.8]">
                    Built for
                  </h2>
                </motion.div>
              </div>

              {/* "Dubai" */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-serif italic font-normal text-white/60 leading-[0.85] sm:leading-[0.8] mb-6 sm:mb-8">
                    Dubai
                  </h2>
                </motion.div>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-white/35 text-sm sm:text-base md:text-xl font-light max-w-xl leading-relaxed"
              >
                Backed by local expertise. Powered by Sanghavi&nbsp;&amp;&nbsp;Bafana Consultants.
              </motion.p>
            </div>
          </div>
        </div>

          {/* Film Grain Texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-10" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DUBAI — ACT II: EDITORIAL CONTENT STRIP
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#062B4A] py-12 md:py-16 lg:py-24 overflow-hidden border-t border-white/5">
        {/* Ambient Background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Lead Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12 md:mb-24"
          >
            <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed">
              We extend your Dubai-facing offering with a trusted on-ground advisory layer, giving clients a clearer path into the UAE market. That means sharper due diligence, practical structuring support, and direct access to a specialist business advisory firm in Dubai.
            </p>
          </motion.div>

          {/* Services — Horizontal Scroll-style Cards */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 md:mb-32 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { label: "Property Sourcing", sub: "Transaction coordination", icon: <Building2 size={20} /> },
              { label: "Company Formation", sub: "UAE entry support", icon: <Globe size={20} /> },
              { label: "Tax & Compliance", sub: "Bookkeeping guidance", icon: <Shield size={20} /> },
              { label: "Documentation", sub: "Structuring assistance", icon: <FileText size={20} /> },
              { label: "Banking Setup", sub: "Business advisory", icon: <Scale size={20} /> },
              { label: "Investor Support", sub: "End-to-end handholding", icon: <Users size={20} /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white text-[#062B4A]/5 hover:border-white/50/20 transition-all duration-700 text-center flex flex-col items-center gap-4 flex-shrink-0 w-[220px] snap-center md:w-auto md:snap-none"
              >
                <div className="p-3 rounded-2xl bg-[#A98B55]/10 text-[#A98B55] group-hover:text-[#A98B55]/80 group-hover:bg-white transition-all">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white group-hover:text-[#062B4A] text-xs font-bold uppercase tracking-[0.15em] mb-1 transition-colors duration-500">{item.label}</p>
                  <p className="text-white/30 group-hover:text-[#062B4A]/60 text-[10px] font-light transition-colors duration-500">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partner Spotlight — Cinematic Split */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-[40px] overflow-hidden border border-white/5">
            {/* Left: Gold Accent Block */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative bg-gradient-to-br from-amber-900/40 via-amber-950/60 to-[#062B4A] p-8 sm:p-12 md:p-16 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] md:min-h-[450px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/90 text-[#062B4A] animate-pulse" />
                  <span className="text-white/80/60 text-[9px] font-bold uppercase tracking-[0.6em]">Partner Spotlight</span>
                </div>

                {/* Partner Logo */}
                <div className="mb-8 relative w-32 h-16 grayscale brightness-200 contrast-125 opacity-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                  <Image
                    src="/S-b.png"
                    alt="Sanghavi & Bafana Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <h3 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Sanghavi<br />&amp; Bafana
                </h3>
                <p className="text-white/30 font-serif italic text-xl mt-2">Consultants</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-8">
                <motion.a href="https://sanghaviandbafana.com/" target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }} className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-[#062B4A] py-3 px-6 sm:py-4 sm:px-8 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] transition-all">
                  Visit Partner <ArrowRight size={14} />
                </motion.a>
                <motion.a href="https://sanghaviandbafana.com/" target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }} className="inline-flex items-center gap-3 border border-white/20 hover:border-white text-white py-3 px-6 sm:py-4 sm:px-8 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] transition-all">
                  Their Team <ArrowRight size={14} />
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 bg-zinc-950/80 p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-10"
            >
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                A Dubai-based advisory firm focused on company formation, tax, accounting, compliance, and business support services across the UAE. Instead of a generic international referral — a real, credible advisory touchpoint.
              </p>

              <div className="space-y-6">
                <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.5em]">Operational Domains</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  {[
                    { label: "UAE", sub: "Local advisory presence", color: "bg-white/90 text-[#062B4A]" },
                    { label: "Tax", sub: "Compliance & structuring", color: "bg-emerald-400" },
                    { label: "Setup", sub: "Formation & support", color: "bg-blue-400" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2 border-l border-white/5 pl-4 sm:pl-6">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${stat.color}`} />
                        <span className="text-white text-2xl font-bold tracking-tighter uppercase">{stat.label}</span>
                      </div>
                      <span className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] block">{stat.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CLIENT VOICES & TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <Testimonials />

      {/* ═══════════════════════════════════════════════════════════
          TRUSTED PARTNERS & CLIENTS
          ═══════════════════════════════════════════════════════════ */}
      <TrustedPartners />



      {/* ═══════════════════════════════════════════════════════════
          PROJECTS — UPCOMING & ONGOING CAROUSEL
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-white py-16 md:py-24 overflow-hidden border-t border-[#062B4A]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,43,74,0.015)_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4">
                <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-[1px] bg-[#062B4A]/20" />
                <span className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-[0.8em]">Portfolio</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold text-[#062B4A] tracking-tighter uppercase leading-[0.85]">
                Our <br />
                <span className="font-serif italic font-normal text-zinc-400 lowercase">Projects</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#062B4A]/50 text-base md:text-lg font-light max-w-sm leading-relaxed text-left md:text-right"
            >
              Landmark developments shaping Nashik's industrial and residential future.
            </motion.p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-3 mb-12">
            {["All", "Ongoing", "Upcoming"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveProjectTab(tab)}
                className={`group px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-[0.3em] transition-all ${
                  activeProjectTab === tab 
                    ? 'bg-[#062B4A] text-white border-[#062B4A]' 
                    : 'border-[#062B4A]/15 text-[#062B4A]/50 hover:border-[#062B4A] hover:text-[#A98B55]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Carousel Track */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {(activeProjectTab === "All"
                ? portfolioProjects
                : portfolioProjects.filter(p => p.status === activeProjectTab)
              ).map((project, i) => {
                const isOngoing = project.status === "Ongoing";
                const statusColor = isOngoing
                  ? "bg-emerald-400/20 text-emerald-400 border-emerald-400/30"
                  : "bg-[#062B4A]/10 text-[#062B4A] border-[#062B4A]/25";
                const dotColor = isOngoing ? "bg-emerald-400" : "bg-[#062B4A]";

                return (
                  <Link href="/portfolio" key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group relative flex-shrink-0 w-[320px] md:w-[420px] h-[480px] md:h-[560px] rounded-[24px] overflow-hidden border border-[#062B4A]/10 snap-start cursor-pointer shadow-md"
                      data-cursor="view"
                    >
                      {/* Background Image with Hover Zoom */}
                      <div className="absolute inset-0 transition-transform duration-[2s] ease-out group-hover:scale-110">
                        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="420px" />
                      </div>

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-[#062B4A]/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#062B4A]/90 to-transparent" />

                      {/* Status Badge — Top Right */}
                      <div className="absolute top-5 right-5 z-10">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] ${statusColor}`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${dotColor} animate-pulse`} />
                          {project.status}
                        </div>
                      </div>

                      {/* Index — Top Left */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="text-white/20 text-xs font-bold font-mono">0{i + 1}</span>
                      </div>

                      {/* Bottom Content */}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-7 space-y-4">
                        {/* Location */}
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-white/40" />
                          <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">{project.location}</span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tighter uppercase leading-tight">{project.title}</h3>
                          <p className="text-white/40 font-serif italic text-base mt-1">{project.subtitle}</p>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] w-full bg-white/10" />

                        {/* Metadata Row */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em] block">Area</span>
                            <span className="text-white text-sm font-bold">{project.area}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em] block">Units</span>
                            <span className="text-white text-sm font-bold">{project.units}</span>
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em] block">Completion</span>
                            <span className="text-white text-sm font-bold">{project.completion}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="w-full flex items-center justify-between pt-2 text-white/40 hover:text-[#A98B55] transition-colors group/btn">
                          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">View Details</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Scroll Progress Indicator */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {(activeProjectTab === "All"
                  ? portfolioProjects
                  : portfolioProjects.filter(p => p.status === activeProjectTab)
                ).map((_, i) => (
                  <div key={i} className={`h-[2px] rounded-full transition-all ${i === 0 ? 'w-8 bg-[#062B4A]' : 'w-4 bg-[#062B4A]/20'}`} />
                ))}
              </div>
              <p className="text-[#062B4A]/40 text-[10px] font-bold uppercase tracking-[0.4em]">Drag to explore</p>
            </div>
          </div>
        </div>
      </section>


      {/* Expertise Cards Grid */}
      <section id="expertise" className="relative py-16 md:py-24 px-6 md:px-12 bg-[#062B4A]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32"
          >
            <motion.div variants={blurIn}>
              <span className="text-white/30 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Our Expertise</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]"><ScrollRevealText effect="reveal" text="Innovation in" /> <br /><span className="font-serif italic font-normal text-zinc-500 lowercase px-4">Every</span> <ScrollRevealText effect="reveal" text="Dimension" /></h2>
            </motion.div>
            <motion.p variants={blurIn} className="text-white/40 text-xl font-light leading-relaxed">From the foundation of logistics to the pinnacle of residential luxury, we apply a standard of excellence that is absolute.</motion.p>
          </motion.div>
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 gap-4 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { icon: <Target className="text-[#A98B55]" />, title: "Precision", desc: "Absolute accuracy in every structural detail." },
              { icon: <Shield className="text-[#A98B55]" />, title: "Trust", desc: "Integrity at the heart of our operations." },
              { icon: <Zap className="text-[#A98B55]" />, title: "Efficiency", desc: "Optimizing space for peak performance." },
              { icon: <Globe className="text-[#A98B55]" />, title: "Global", desc: "Expanding horizons across continents." }
            ].map((item, i) => (
              <motion.div key={i} initial="rest" whileHover="hover" variants={cardHover} animate={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="flex-shrink-0 w-[260px] snap-center md:w-auto md:snap-none p-10 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.05] transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-4">{item.title}</h4>
                <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden bg-[#062B4A]">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} className="h-[2px] bg-[#A98B55] mx-auto mb-12" />
          <motion.h2 
            initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[120px] leading-[0.85] font-bold text-white tracking-tighter uppercase mb-6"
          >
            Let&apos;s Build <br /><span className="font-serif italic font-normal text-[#FAF9F6] capitalize">Legacy</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-xl font-light max-w-xl mx-auto mb-12"
          >
            Ready to transform your vision into reality? Let&apos;s start the conversation.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="/contact" className="bg-white text-[#062B4A] px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#FAF9F6] hover:text-[#A98B55] transition-all flex items-center gap-4 shadow-xl">Contact Our Office <ArrowRight size={18} /></Link>
            <Link href="/properties" className="border border-white/20 text-white px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Explore Properties</Link>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setActiveReel(null)}
          >
            <button 
              onClick={() => setActiveReel(null)}
              className="absolute top-6 right-6 md:top-12 md:right-12 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeReel}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
