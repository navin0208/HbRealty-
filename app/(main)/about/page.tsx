"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Clock, TrendingUp, CheckCircle, ArrowRight, Quote } from "lucide-react";
import { useElementScrollProgress, type ElementScrollOffset } from "@/components/useElementScrollProgress";

const HERO_SCROLL_OFFSET: ElementScrollOffset = ["start start", "end start"];

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span className="tabular-nums">{value}{suffix}</span>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroScroll = useElementScrollProgress(heroRef, HERO_SCROLL_OFFSET);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-[#062B4A] font-sans selection:bg-white text-[#062B4A]/30 selection:text-white overflow-x-hidden">

      {/* ═══ CINEMATIC HERO WITH PARALLAX ═══ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate Building" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-32 w-full flex flex-col items-start">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9] mb-2"
            >
              Building <span className="font-serif italic text-white/70">legacy,</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12 ml-0 md:ml-32">
            <motion.h1 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]"
            >
              not just <span className="font-serif italic text-white/50">warehouses.</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="pl-0 md:pl-10 border-l-0 md:border-l border-white/20"
          >
            <p className="text-white/50 text-lg md:text-xl font-light max-w-xl pl-0 md:pl-8">
              We build trust. We build legacy. We architect the future of Maharashtra&apos;s infrastructure with absolute precision and cinematic vision.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ FLOATING STATS BAR (EDITORIAL) ═══ */}
      <section className="relative z-20 px-6 md:px-12 max-w-[1600px] mx-auto pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 border-b border-white/5 pb-20">
          {[
            { title: "Transparent Dealings", val: "100%" },
            { title: "Legal Compliance", val: "100%" },
            { title: "Delivered On Time", val: "100%" },
            { title: "Strategic Growth", val: "100%" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <span className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">
                <AnimatedCounter value={stat.val} />
              </span>
              <div className="w-8 h-px bg-white/20 mb-4" />
              <span className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">{stat.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT STORY — EDITORIAL SPLIT ═══ */}
      <section className="relative py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
              <div className="w-12 h-px bg-white/20 mb-8" />
              <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.1] mb-8">
                From <span className="font-serif italic text-white/50">vision</span> <br/> to reality.
              </h2>
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 space-y-16 mt-0 md:mt-24">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-white/70 text-xl md:text-2xl font-light leading-relaxed">
              HB Realty India stands at the forefront of land development and warehousing in Maharashtra. We specialize in identifying, acquiring, and transforming land into thriving commercial and logistics hubs.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} className="text-white/50 text-lg font-light leading-relaxed">
              With a legacy of excellence and innovation, we offer end-to-end real estate solutions combining legal consultancy, infrastructure planning, and warehousing expertise into one seamless experience.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="relative border-l border-white/20 pl-8 md:pl-12 py-4">
              <p className="text-white/70 font-serif italic text-xl md:text-2xl leading-relaxed">
                At the heart of our operations lies <span className="text-white font-sans not-italic font-medium">Osiyan</span>, our state-of-the-art Grade-A warehousing facility in Nashik. Strategically located, it is a reflection of our vision—developing world-class infrastructure to empower India&apos;s growing economy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ VISION — CINEMATIC FULL-WIDTH ═══ */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Vision" 
            fill 
            className="object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062B4A] via-[#062B4A]/80 to-[#062B4A]" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.6em] block mb-6">Our Vision</span>
              <p className="text-white/80 font-light text-3xl md:text-4xl leading-[1.6] italic">
                &ldquo;To become Maharashtra&apos;s most trusted name in land development, warehousing consultancy, and real estate legal services, while contributing to sustainable and intelligent infrastructure growth.&rdquo;
              </p>
              <div className="w-20 h-[2px] bg-white text-[#062B4A] mt-12" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-10">Core Strengths</h3>
              <div className="space-y-6">
                {[
                  "Strategic land development expertise across Maharashtra",
                  "Advanced warehouse planning, construction & leasing",
                  "Full-spectrum real estate legal consultancy",
                  "Transparent processes & regulatory compliance",
                  "Custom solutions for industrial, commercial businesses"
                ].map((strength, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-8 h-[2px] bg-white text-[#062B4A]/50 mt-3 group-hover:w-12 group-hover:bg-white text-[#062B4A] transition-all shrink-0" />
                    <p className="text-white/70 font-light text-lg group-hover:text-[#A98B55] transition-colors">{strength}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US — MINIMALIST ═══ */}
      <section className="relative py-40 px-6 md:px-12 bg-[#041D34]">
        <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-20">
            <div className="md:col-span-1">
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
                Why <br/> <span className="font-serif italic text-white/50">HB Realty?</span>
              </h2>
            </div>
            
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
              {[
                { title: "Proven Track Record", desc: "Decades of industrial land development excellence across Maharashtra." },
                { title: "Legal Mastery", desc: "Expertise in regulatory approvals, NOCs, and complex legal formalities." },
                { title: "Custom Warehousing", desc: "Facilities engineered and built to exact client specifications and global standards." },
                { title: "Strategic Partner", desc: "We act as a growth ally, ensuring sustainable and intelligent infrastructure development." },
              ].map((reason, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start group"
                >
                  <span className="text-white/20 font-serif italic text-2xl mb-6 group-hover:text-[#A98B55]/40 transition-colors">0{i+1}</span>
                  <h4 className="text-white text-lg font-medium tracking-wide mb-4">{reason.title}</h4>
                  <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-sm">{reason.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP — CINEMATIC PORTRAIT ═══ */}
      <section className="relative py-40 px-6 md:px-12 max-w-[1600px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative h-[700px] rounded-[50px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1600" alt="Mr. Hitesh Bafana" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-12 bg-gradient-to-t from-[#062B4A]/90 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-8 bg-white text-[#062B4A]" />
                <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.4em]">Visionary Leadership</span>
              </div>
              <h3 className="text-4xl font-bold text-white uppercase tracking-tighter">Mr. Hitesh Bafana</h3>
              <p className="text-white/50 text-sm font-light uppercase tracking-widest mt-2">Founder & Managing Director</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-10"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
              Guiding <span className="font-serif italic font-normal text-zinc-500 lowercase">The Vision</span>
            </h2>
            <div className="space-y-6">
              <p className="text-white/60 font-light text-xl leading-[1.8]">
                The founder of HB Realty India, is a seasoned professional with extensive experience in real estate legal consultancy, land development, and industrial logistics. His in-depth knowledge of land acquisition laws, liaisoning procedures, and infrastructure compliance has been instrumental in positioning HB Realty as a trusted partner for businesses across Nashik and Maharashtra.
              </p>
              <p className="text-white/60 font-light text-xl leading-[1.8]">
                Under his leadership, HB Realty India has grown into a full-service firm known for its transparent processes, strategic execution, and client-focused approach. Mr. Bafana&apos;s vision is to bridge the gap between raw land and high-value infrastructure through legally sound, future-ready development solutions.
              </p>
            </div>
            <a href="/contact" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white text-[#062B4A] hover:text-[#A98B55] transition-colors">
              Connect With Us <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE TEAM — PREMIUM CARDS ═══ */}
      <section className="relative py-40 px-6 md:px-12 bg-zinc-950 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.6em] block mb-6">The People</span>
              <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
                Our <span className="font-serif italic font-normal text-zinc-500 lowercase">Team</span>
              </h2>
            </div>
            <p className="text-white/40 text-base font-light leading-relaxed max-w-md">
              Each member brings specialized skills, industry experience, and a commitment to delivering excellence across Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Mrs. Bhagyashree Bhamare", role: "Architect", desc: "M S Urban Design London, B Arch Nashik", exp: "4 Years", img: "1573496359142-b8d87734a5a2" },
              { name: "Sagar Patil M.E.", role: "Engineer", desc: "Project Consultant, KP Construction, B.E Civil", exp: "8 Years", img: "1560250097-0b93528c311a" },
              { name: "Mr. Rahul Dingane", role: "RCC & PEB Designer", desc: "Vastustruct Pune, M Tech Structure, B.E Civil", exp: "15 Years", img: "1507003211169-0a1dd7228f2d" },
              { name: "Vrushali Patil-Sonawane", role: "Civil Engineer", desc: "BE Civil", exp: "8 Years", img: "1573496359142-b8d87734a5a2" }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-[30px] overflow-hidden border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="h-[350px] w-full relative bg-[#062B4A]">
                  <Image src={`https://images.unsplash.com/photo-${member.img}?auto=format&fit=crop&q=80&w=800`} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-[#062B4A]/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/90 text-[9px] font-bold uppercase tracking-widest">{member.role}</span>
                    <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{member.exp}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-2">{member.name}</h4>
                  <p className="text-white/40 text-xs font-light leading-relaxed">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
