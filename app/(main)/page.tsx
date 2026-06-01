"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useTransform, useMotionTemplate, useInView, useSpring } from "framer-motion";
import { Menu, ArrowRight, Play, ChevronRight, Globe, Shield, Zap, Target, CheckCircle2, Award, Building2, Scale, Users, Plus, Minus, AlertCircle, RefreshCcw, TrendingUp, CheckCircle, FileText, Gavel, Construction, ArrowLeft, MoveRight, MapPin, Phone, Mail, Clock, Volume2, VolumeX } from "lucide-react";
import LiquidLogoSection from "@/components/LiquidLogoSection";
import { useElementScrollProgress, type ElementScrollOffset } from "@/components/useElementScrollProgress";
import HeroCinematic from "@/components/animations/HeroCinematic";
import { cardHover, scaleIn } from "@/lib/animation-variants"; // 🚀 ANTIGRAVITY
import StatsSection from "./stats";
import { AboutSection, LandDevelopmentSection } from "./abt";

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
    title: "Grade A Warehousing",
    desc: "Modern, secure warehouses with advanced facilities and flexible spaces.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
    icon: <Building2 className="w-6 h-6" />,
    color: "#f97316",
    accent: "Logistics Excellence"
  },
  {
    id: 2,
    title: "Land Development ",
    desc: "Strategic land development built for compliance and long-term value.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
    icon: <Construction className="w-6 h-6" />,
    color: "#a855f7",
    accent: "Strategic Growth"
  },
  {
    id: 3,
    title: "Land Legal Services ",
    desc: "Complete legal and liaisoning support in Nashik from title verification to government approvals and NOCs.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000",
    icon: <Scale className="w-6 h-6" />,
    color: "#3b82f6",
    accent: "Legal Mastery"
  },
  {
    id: 4,
    title: "Warehouse Legal Clearance",
    desc: "Fast and reliable approvals for fire safety, environmental compliance, and operational licenses.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000",
    icon: <FileText className="w-6 h-6" />,
    color: "#10b981",
    accent: "Operational Speed"
  }
];



export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const warehouseRef = useRef<HTMLElement>(null);
  const warehouseScroll = useElementScrollProgress(warehouseRef, WAREHOUSE_SCROLL_OFFSET);

  const warehouseY = useTransform(warehouseScroll, [0, 1], ["-10%", "10%"]);
  const panelY = useTransform(warehouseScroll, [0, 1], ["8%", "-8%"]);



  // Auto-play for Services Carousel
  useEffect(() => {
    const duration = 6000;
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
    <main className="relative min-h-screen w-full bg-[#062B4A] font-sans scroll-smooth overflow-x-hidden">
      <HeroCinematic />

      {/* EDITORIAL IMPACT STATS */}
      {/* <section id="global" className="relative py-24 md:py-40 px-6 md:px-12 bg-[#041D34] overflow-hidden border-b border-white/5">
        <div className="relative z-10 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
            <div className="md:col-span-4 flex items-end pb-8">
              <p className="text-white/40 font-serif italic text-2xl md:text-3xl max-w-xs leading-snug">
                Building legacy through precision and architectural foresight.
              </p>
            </div>
            
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 md:pl-24">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-start group">
                <h3 className="text-white text-6xl md:text-[140px] font-light tracking-tighter mb-2 font-serif group-hover:text-[#A98B55]/90 transition-colors duration-700">200<span className="text-4xl md:text-7xl text-white/30">+</span></h3>
                <div className="w-12 h-px bg-white/20 mb-6 group-hover:w-full group-hover:bg-white text-[#062B4A] transition-all duration-700 ease-cinematic" />
                <p className="text-white/50 text-sm md:text-base font-medium">Trusted Global Clients</p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-start group md:mt-24">
                <h3 className="text-white text-6xl md:text-[140px] font-light tracking-tighter mb-2 font-serif group-hover:text-[#A98B55]/90 transition-colors duration-700">27<span className="text-4xl md:text-7xl text-white/30">+</span></h3>
                <div className="w-12 h-px bg-white/20 mb-6 group-hover:w-full group-hover:bg-white text-[#062B4A] transition-all duration-700 ease-cinematic" />
                <p className="text-white/50 text-sm md:text-base font-medium">Years of Legal Mastery</p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-start group">
                <h3 className="text-white text-6xl md:text-[140px] font-light tracking-tighter mb-2 font-serif group-hover:text-[#A98B55]/90 transition-colors duration-700">25<span className="text-4xl md:text-7xl text-white/30">+</span></h3>
                <div className="w-12 h-px bg-white/20 mb-6 group-hover:w-full group-hover:bg-white text-[#062B4A] transition-all duration-700 ease-cinematic" />
                <p className="text-white/50 text-sm md:text-base font-medium">Signature Projects</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}
      <StatsSection />

      <AboutSection />
      <LandDevelopmentSection />

      {/* IMMERSIVE CINEMATIC VIDEO */}
      <section className="relative min-h-screen bg-[#062B4A] overflow-hidden flex flex-col justify-center py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.8em]">Production Showcase</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-none">
              <span className="font-serif italic font-normal text-zinc-500 lowercase">HB</span> Realty
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative w-full h-[70vh] md:h-screen overflow-hidden group border-y border-white/5 cursor-pointer"
          onClick={() => {
            if (videoRef.current) {
              if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
              } else {
                videoRef.current.play();
                setIsPlaying(true);
              }
            }
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-75 scale-105 group-hover:scale-100 transition-transform duration-[10s] ease-out"
          >
            <source src="/HB-Realty-India.mov" type="video/mp4" />
          </video>

          {/* Cinematic Letterboxing Gradients */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#062B4A] to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#062B4A] to-transparent z-10" />

          {/* Centered Play Button (Only on Pause) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 flex items-center justify-center text-white"
                >
                  <Play fill="currentColor" size={32} className="ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tactical Scanned Metadata */}
          <div className="absolute bottom-12 left-12 z-30 hidden md:flex items-end gap-12">
            <div className="space-y-2 border-l border-white/20 pl-6">
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.4em]">Frame Analysis</p>
              <p className="text-white text-xs font-mono tracking-widest">SEQ_01 // INDUSTRIAL_HUB_NASHIK</p>
              <div className="flex items-center gap-4 pt-2">
                <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-white/40"
                  />
                </div>
                <span className="text-white/20 text-[8px] font-mono">SCANNING...</span>
              </div>
            </div>

            {/* Mute/Unmute Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="flex items-center gap-4 group/mute"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover/mute:text-white group-hover/mute:border-white transition-all">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </div>
              <div className="text-left">
                <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.2em] block">Audio Node</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.1em]">{isMuted ? 'Muted' : 'Live'}</span>
              </div>
            </button>
          </div>

          {/* Technical Corners */}
          <div className="absolute inset-8 pointer-events-none">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20" />
          </div>
        </motion.div>
      </section>

      {/* STRATEGIC TRANSFORMATION SECTION */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 bg-[#062B4A] border-b border-white/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-4">
            <span className="text-white/30 text-xs font-bold uppercase tracking-[0.6em] block">Business Lifecycle</span>
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]">Strategic <span className="font-serif italic font-normal text-zinc-500 lowercase">Transformation</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent hidden md:block -translate-y-1/2 pointer-events-none" />
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative p-10 md:p-14 bg-zinc-950/50 border border-white/5 rounded-[40px] md:rounded-none md:rounded-l-[40px] group hover:bg-zinc-900/50 transition-all flex flex-col items-start text-left"><div className="mb-10 p-4 rounded-2xl bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform"><AlertCircle size={28} /></div><h3 className="text-white text-2xl font-bold uppercase tracking-widest mb-8">The Challenge</h3><ul className="space-y-6">{["Unclear land titles.", "Delayed approvals.", "Poor layout planning.", "Hidden infrastructure costs."].map((item, i) => (<li key={i} className="text-white/40 text-sm font-light tracking-wide flex items-center gap-4"><div className="h-[1px] w-4 bg-red-500/30" /> {item}</li>))}</ul></motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative p-10 md:p-14 bg-zinc-900 border-x border-white/5 md:z-10 shadow-2xl flex flex-col items-start text-left"><div className="mb-10 p-4 rounded-2xl bg-purple-500/10 text-purple-500"><RefreshCcw size={28} /></div><h3 className="text-white text-2xl font-bold uppercase tracking-widest mb-8">Our Approach</h3><ul className="space-y-6">{["Verified documentation.", "Approved master planning.", "Infrastructure-ready plots.", "Transparent development process."].map((item, i) => (<li key={i} className="text-white/60 text-sm font-light tracking-wide flex items-center gap-4"><div className="h-[1px] w-4 bg-purple-500/50" /> {item}</li>))}</ul></motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative p-10 md:p-14 bg-white rounded-[40px] md:rounded-none md:rounded-r-[40px] shadow-2xl flex flex-col items-start text-left group"><div className="mb-10 p-4 rounded-2xl bg-[#062B4A]/5 text-black group-hover:scale-110 transition-transform"><TrendingUp size={28} /></div><h3 className="text-black text-2xl font-bold uppercase tracking-widest mb-8">Your Advantage</h3><ul className="space-y-6">{["Secure ownership", "Faster execution", "Operational efficiency", "Long-term capital growth"].map((item, i) => (<li key={i} className="text-black/60 text-sm font-bold tracking-wide flex items-center gap-4"><CheckCircle size={16} className="text-black" /> {item}</li>))}</ul></motion.div>
          </div>
        </div>
      </section>

      {/* ULTRA-PREMIUM CINEMATIC CAPABILITIES CAROUSEL */}
      <section className="relative bg-[#062B4A] py-24 md:py-40 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} className="h-[1px] bg-white/20" />
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.8em] block">Industrial Mastery</span>
              </div>
              <h2 className="text-5xl md:text-[90px] font-bold text-white tracking-tighter uppercase leading-[0.85]">
                What  <br />
                <span className="font-serif italic font-normal text-zinc-500 lowercase">We do</span>
              </h2>
            </div>

            <div className="flex flex-col items-end gap-10">
              <div className="flex items-center gap-4">
                {services.map((_, i) => (
                  <button key={i} onClick={() => { setActiveService(i); setTimerProgress(0); }} className="group relative py-4 px-2">
                    <div className="flex flex-col items-center gap-2">
                      <span className={`text-[10px] font-bold transition-colors ${activeService === i ? 'text-white' : 'text-white/20'}`}>0{i + 1}</span>
                      <div className="relative w-12 h-[2px] bg-white/10 overflow-hidden">
                        {activeService === i && <motion.div initial={{ width: 0 }} animate={{ width: `${timerProgress}%` }} className="absolute inset-0 bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => { setActiveService(prev => (prev - 1 + services.length) % services.length); setTimerProgress(0); }} className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-[#A98B55] hover:border-white transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <ArrowLeft size={24} className="relative z-10" />
                </button>
                <button onClick={() => { setActiveService(prev => (prev + 1) % services.length); setTimerProgress(0); }} className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-[#A98B55] hover:border-white transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <ArrowRight size={24} className="relative z-10" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[450px] md:h-[800px] w-full rounded-3xl md:rounded-[60px] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div key={activeService} initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                <Image src={services[activeService].image} alt={services[activeService].title} fill className="object-cover brightness-75 transition-transform duration-[20s] group-hover:scale-110 ease-out" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-[#062B4A]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#062B4A]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-end items-start">
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="max-w-4xl space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4"><div className="h-[2px] w-8 bg-white" /><span className="text-white font-bold uppercase tracking-[0.4em] text-[10px]">{services[activeService].accent}</span></div>
                      <h3 className="text-white text-5xl md:text-[100px] font-bold tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
                        {services[activeService].title.split(' & ').map((part, i) => (<span key={i} className="block">{i > 0 && <span className="text-zinc-500 font-serif lowercase italic mr-4">&</span>}{part}</span>))}
                      </h3>
                    </div>
                    <p className="text-white/60 text-xl md:text-3xl font-light leading-relaxed max-w-2xl tracking-tight">{services[activeService].desc}</p>
                    <div className="flex flex-wrap items-center gap-10 pt-8">
                      <motion.button whileHover={{ x: 10 }} className="flex items-center gap-6 text-white text-xs font-bold uppercase tracking-[0.4em] transition-all bg-white/10 hover:bg-white hover:text-black py-6 px-12 rounded-full backdrop-blur-xl border border-white/10">Enquire Now <MoveRight size={18} /></motion.button>
                      <div className="flex items-center gap-4 px-8 py-4 border-l border-white/10"><div className="p-3 rounded-xl bg-white/5 text-white">{services[activeService].icon}</div><span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">Operational Excellence</span></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-12 left-12 flex flex-col gap-4"><div className="h-2 w-2 rounded-full bg-white animate-pulse" /><div className="h-2 w-2 rounded-full bg-white/20" /><div className="h-2 w-2 rounded-full bg-white/20" /></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DUBAI — ACT I: CINEMATIC VIDEO MOMENT
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] md:h-screen bg-[#062B4A] overflow-hidden flex items-center justify-center py-10 md:py-20 px-4 md:px-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative w-full h-full max-w-[1600px] rounded-3xl md:rounded-[80px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] group"
        >
          {/* Unobstructed Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Dubai.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Vignette — soft fade on ALL edges within the rounded frame */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 150px 50px rgba(0,0,0,0.8)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-transparent to-[#062B4A]/40 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#062B4A]/80 to-transparent z-10" />

          {/* Title Card — Bottom-aligned with staggered premium animations */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-20">
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
                  <h2 className="text-5xl md:text-[120px] font-bold text-white tracking-tighter uppercase leading-[0.8]">
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
                  <h2 className="text-5xl md:text-[120px] font-serif italic font-normal text-white/60 leading-[0.8] mb-8">
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
                className="text-white/35 text-base md:text-xl font-light max-w-xl leading-relaxed"
              >
                Backed by local expertise. Powered by Sanghavi&nbsp;&amp;&nbsp;Bafana Consultants.
              </motion.p>
            </div>
          </div>

          {/* Film Grain Texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-10" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DUBAI — ACT II: EDITORIAL CONTENT STRIP
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#030303] py-24 md:py-40 overflow-hidden border-b border-white/5">
        {/* Ambient Background */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Lead Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-24"
          >
            <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed">
              We extend your Dubai-facing offering with a trusted on-ground advisory layer, giving clients a clearer path into the UAE market. That means sharper due diligence, practical structuring support, and direct access to a specialist business advisory firm in Dubai.
            </p>
          </motion.div>

          {/* Services — Horizontal Scroll-style Cards */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-32 -mx-6 px-6 md:mx-0 md:px-0">
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
                <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-[#A98B55]/80 group-hover:bg-white text-[#062B4A]/10 transition-all">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-1">{item.label}</p>
                  <p className="text-white/30 text-[10px] font-light">{item.sub}</p>
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
              className="lg:col-span-2 relative bg-gradient-to-br from-amber-900/40 via-amber-950/60 to-[#062B4A] p-12 md:p-16 flex flex-col justify-between min-h-[450px]"
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

                <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.85]">
                  Sanghavi<br />&amp; Bafana
                </h3>
                <p className="text-white/30 font-serif italic text-xl mt-2">Consultants</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-8">
                <motion.a href="#" whileHover={{ x: 3 }} className="inline-flex items-center gap-3 bg-white text-black py-4 px-8 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/90 text-[#062B4A] transition-all">
                  Visit Partner <ArrowRight size={14} />
                </motion.a>
                <motion.a href="#" whileHover={{ x: 3 }} className="inline-flex items-center gap-3 border border-white/20 text-white py-4 px-8 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:border-white transition-all">
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
              className="lg:col-span-3 bg-zinc-950/80 p-12 md:p-16 flex flex-col justify-center space-y-10"
            >
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                A Dubai-based advisory firm focused on company formation, tax, accounting, compliance, and business support services across the UAE. Instead of a generic international referral — a real, credible advisory touchpoint.
              </p>

              <div className="space-y-6">
                <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.5em]">Operational Domains</p>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { label: "UAE", sub: "Local advisory presence", color: "bg-white/90 text-[#062B4A]" },
                    { label: "Tax", sub: "Compliance & structuring", color: "bg-emerald-400" },
                    { label: "Setup", sub: "Formation & support", color: "bg-blue-400" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-3 border-l border-white/5 pl-6">
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
          PROJECTS — UPCOMING & ONGOING CAROUSEL
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#062B4A] py-24 md:py-40 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />

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
                <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-[1px] bg-white/20" />
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.8em]">Portfolio</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
                Our <br />
                <span className="font-serif italic font-normal text-zinc-500 lowercase">Projects</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-base md:text-lg font-light max-w-sm leading-relaxed text-left md:text-right"
            >
              Landmark developments shaping Nashik's industrial and residential future.
            </motion.p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-3 mb-12">
            {["All", "Ongoing", "Upcoming"].map((tab) => (
              <button key={tab} className="group px-6 py-2.5 rounded-full border border-white/10 text-white/40 text-xs font-bold uppercase tracking-[0.3em] hover:border-white hover:text-[#A98B55] transition-all first:bg-white first:text-black first:border-white">
                {tab}
              </button>
            ))}
          </div>

          {/* Carousel Track */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                {
                  status: "Ongoing",
                  statusColor: "bg-emerald-400/20 text-emerald-400 border-emerald-400/30",
                  dotColor: "bg-emerald-400",
                  title: "HB Industrial Park",
                  subtitle: "Phase I",
                  location: "Nashik, Maharashtra",
                  area: "42 Acres",
                  units: "120 Plots",
                  completion: "Dec 2025",
                  image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80",
                },
                {
                  status: "Upcoming",
                  statusColor: "bg-white/90 text-[#062B4A]/20 text-white/80 border-white/40/30",
                  dotColor: "bg-white/90 text-[#062B4A]",
                  title: "HB Logistics Hub",
                  subtitle: "Phase II",
                  location: "Sinnar, Nashik",
                  area: "68 Acres",
                  units: "200 Plots",
                  completion: "Q3 2026",
                  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
                },
                {
                  status: "Upcoming",
                  statusColor: "bg-white/90 text-[#062B4A]/20 text-white/80 border-white/40/30",
                  dotColor: "bg-white/90 text-[#062B4A]",
                  title: "HB Commercial Zone",
                  subtitle: "Premium Commercial",
                  location: "Igatpuri Road, Nashik",
                  area: "24 Acres",
                  units: "80 Units",
                  completion: "Q1 2027",
                  image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
                },
                {
                  status: "Ongoing",
                  statusColor: "bg-emerald-400/20 text-emerald-400 border-emerald-400/30",
                  dotColor: "bg-emerald-400",
                  title: "HB Residential Township",
                  subtitle: "Premium Living",
                  location: "Gangapur Road, Nashik",
                  area: "35 Acres",
                  units: "450 Apartments",
                  completion: "Mar 2026",
                  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
                },
                {
                  status: "Upcoming",
                  statusColor: "bg-white/90 text-[#062B4A]/20 text-white/80 border-white/40/30",
                  dotColor: "bg-white/90 text-[#062B4A]",
                  title: "HB Warehouse Complex",
                  subtitle: "Grade A Warehousing",
                  location: "MIDC, Nashik",
                  area: "55 Acres",
                  units: "60 Units",
                  completion: "Q4 2026",
                  image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80",
                },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative flex-shrink-0 w-[320px] md:w-[420px] h-[480px] md:h-[560px] rounded-[24px] overflow-hidden border border-white/8 snap-start cursor-pointer"
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
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] ${project.statusColor}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${project.dotColor} animate-pulse`} />
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
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center justify-between pt-2 text-white/40 hover:text-[#A98B55] transition-colors group/btn"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em]">View Details</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Progress Indicator */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <div key={i} className={`h-[2px] rounded-full transition-all ${i === 0 ? 'w-8 bg-white' : 'w-4 bg-white/20'}`} />
                ))}
              </div>
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Drag to explore</p>
            </div>
          </div>
        </div>
      </section>


      {/* Expertise Cards Grid */}
      <section id="expertise" className="relative py-24 md:py-40 px-6 md:px-12 bg-[#062B4A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <span className="text-white/30 text-xs font-bold uppercase tracking-[0.5em] block mb-6">Our Expertise</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]"><ScrollRevealText effect="reveal" text="Innovation in" /> <br /><span className="font-serif italic font-normal text-zinc-500 lowercase px-4">Every</span> <ScrollRevealText effect="reveal" text="Dimension" /></h2>
            </div>
            <p className="text-white/40 text-xl font-light leading-relaxed">From the foundation of logistics to the pinnacle of residential luxury, we apply a standard of excellence that is absolute.</p>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 gap-4 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { icon: <Target className="text-zinc-500" />, title: "Precision", desc: "Absolute accuracy in every structural detail." },
              { icon: <Shield className="text-zinc-500" />, title: "Trust", desc: "Integrity at the heart of our operations." },
              { icon: <Zap className="text-zinc-500" />, title: "Efficiency", desc: "Optimizing space for peak performance." },
              { icon: <Globe className="text-zinc-500" />, title: "Global", desc: "Expanding horizons across continents." }
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

      {/* Featured Projects Portfolio */}
      <section id="projects" className="relative py-24 md:py-40 px-6 md:px-12 bg-[#062B4A] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:flex-row gap-6 md:gap-20 -mx-6 px-6 md:mx-0 md:px-0">
          <Link href="/warehousing-2" className="group cursor-pointer flex-shrink-0 w-[300px] snap-center md:flex-1 md:w-auto md:snap-none" data-cursor="view"><div className="relative h-[450px] md:h-[800px] w-full overflow-hidden rounded-3xl mb-10"><Image src="/Cam_05-scaled.jpg" alt="Osiyan Grade-A Warehousing in Nashik — HB Realty India" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" /><div className="absolute inset-0 bg-[#062B4A]/40 group-hover:bg-[#062B4A]/10 transition-colors" /><div className="absolute bottom-6 md:bottom-10 left-6 md:left-10"><h3 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tighter">Osiyan Warehousing</h3><p className="text-white/40 italic font-serif">Dindori, Nashik</p></div></div></Link>
          <Link href="/portfolio" className="group cursor-pointer flex-shrink-0 w-[300px] snap-center md:flex-1 md:pt-40 md:w-auto md:snap-none" data-cursor="view"><div className="relative h-[450px] md:h-[800px] w-full overflow-hidden rounded-3xl mb-10"><Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" alt="Land Development Projects in Nashik — Plotted Communities by HB Realty" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" /><div className="absolute inset-0 bg-[#062B4A]/40 group-hover:bg-[#062B4A]/10 transition-colors" /><div className="absolute bottom-6 md:bottom-10 left-6 md:left-10"><h3 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tighter">Land Development</h3><p className="text-white/40 italic font-serif">Across Maharashtra</p></div></div></Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20/10 via-[#062B4A] to-purple-500/10" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} className="h-[2px] bg-gradient-to-r from-white/20 to-purple-500 mx-auto mb-12" />
          <h2 className="text-6xl md:text-[120px] leading-[0.85] font-bold text-white tracking-tighter uppercase mb-6">Let&apos;s Build <br /><span className="font-serif italic font-normal text-zinc-500 capitalize">Legacy</span></h2>
          <p className="text-white/40 text-xl font-light max-w-xl mx-auto mb-12">Ready to transform your vision into reality? Let&apos;s start the conversation.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white text-[#062B4A] hover:text-[#A98B55] transition-all flex items-center gap-4 shadow-[0_10px_40px_rgba(255,255,255,0.1)]">Contact Our Office <ArrowRight size={18} /></Link>
            <Link href="/properties" className="border border-white/20 text-white px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Explore Properties</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
