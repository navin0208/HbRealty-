"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, Construction, Scale, FileText, Briefcase, Globe2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "warehousing",
    title: "Grade A Warehousing",
    desc: "Modern, secure, and strategically located warehouses in Nashik with advanced facilities, 24/7 security, and flexible space options.",
    icon: <Building2 className="w-7 h-7" />,
    accent: "Logistics Excellence",
    image: "/Warehouse p3.jpg",
    link: "/warehousing-2",
    bullets: [
      "Modern infrastructure with high plinth height and wide access roads",
      "Fire-fighting systems, CCTV surveillance, and real-time inventory tracking",
      "Flexible storage space from 80,000 to 1,20,000 sq. ft.",
      "Sustainable operations with rainwater harvesting and green belt plantations"
    ]
  },
  {
    id: "land-dev",
    title: "Land Development",
    desc: "End-to-end land development for industrial and commercial use with infrastructure, compliance, and value-focused planning.",
    icon: <Construction className="w-7 h-7" />,
    accent: "Strategic Growth",
    image: "/Land-Development-HBRealtyindia-min-scaled.jpg",
    link: "/land-development",
    bullets: [
      "Site selection and layout planning",
      "Infrastructure development including drainage and utilities",
      "Greenfield and brownfield development expertise",
      "End-to-end project execution"
    ]
  },
  {
    id: "legal-land",
    title: "Land Legal Services",
    desc: "Complete legal and liaisoning support in Nashik from title verification to government approvals and NOCs.",
    icon: <Scale className="w-7 h-7" />,
    accent: "Legal Mastery",
    image: "/Warehouse-Legal-Clearance-min-scaled.jpg",
    bullets: [
      "Title verification and due diligence",
      "Document drafting and registration support",
      "Assistance with zoning and land-use changes",
      "Liaisoning with government authorities for approvals"
    ]
  },
  {
    id: "legal-warehouse",
    title: "Warehouse Clearance",
    desc: "Fast and reliable approvals for fire safety, environmental compliance, and operational licenses.",
    icon: <FileText className="w-7 h-7" />,
    accent: "Operational Speed",
    image: "/Warehouse-Legal-Clearance-min-scaled.jpg",
    bullets: [
      "Fire safety and environmental compliance",
      "Building plan approvals",
      "Pollution control board clearances",
      "Renewal and amendment of licenses"
    ]
  },
  {
    id: "lease-advisory",
    title: "Lease Advisory",
    desc: "Expert advice and negotiation for warehouse leasing to secure the best terms for your business.",
    icon: <Briefcase className="w-7 h-7" />,
    accent: "Market Intelligence",
    image: "/Warehouse-Lease-Advisory-min-scaled.jpg",
    bullets: [
      "Market research and rental benchmarking",
      "Lease agreement negotiation and drafting",
      "Risk assessment and due diligence",
      "Long-term lease structuring for stability"
    ]
  },
  {
    id: "land-consultancy",
    title: "Land Consultancy",
    desc: "Trusted land consultants providing investment insights, due diligence, and transaction support across Maharashtra.",
    icon: <Globe2 className="w-7 h-7" />,
    accent: "Advisory Excellence",
    image: "/plot-development-.jpg",
    bullets: [
      "Market trends and investment analysis",
      "Project viability reports",
      "Legal and regulatory compliance checks",
      "End-to-end transaction support"
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]/30 overflow-x-hidden">

      {/* ═══ HEADER (EDITORIAL) ═══ */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 bg-[#062B4A] border-b border-white/10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-[1600px] mx-auto">
          <div className="max-w-5xl">
            <div className="w-12 h-px bg-white/20 mb-8" />
            <h1 className="text-4xl md:text-[80px] font-medium text-white tracking-tight leading-[1] mb-8">
              Warehousing & <br/>
              <span className="font-medium text-[#A98B55]">land development.</span>
            </h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="pl-0 md:pl-10 border-l-0 md:border-l border-white/20"
            >
              <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed max-w-2xl pl-0 md:pl-8">
                From raw land acquisition to turnkey infrastructure and legal mastery, our services define the standard for real estate execution.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ SERVICES LIST (VERTICAL STACK) ═══ */}
      <section className="relative">
        {services.map((service, index) => {
          const isDark = index === 1 || index === 3; // Land Development (1), Warehouse Clearance (3) are Dark
          const isEven = index % 2 === 0; // Alternating layout
          const bgClass = isDark 
            ? "bg-[#062B4A] text-white" 
            : (index === 5 ? "bg-white text-[#062B4A]" : "bg-[#FAF9F6] text-[#062B4A]");
          const borderClass = isDark ? "border-white/10" : "border-[#062B4A]/10";
          const bulletColor = isDark ? "bg-white/30" : "bg-[#062B4A]/20";
          const textMutedClass = isDark ? "text-white/60" : "text-[#062B4A]/60";
          const textSubMutedClass = isDark ? "text-white/40" : "text-[#062B4A]/40";
          
          return (
            <div 
              key={service.id} 
              id={service.id}
              className={`relative py-24 md:py-36 border-b ${borderClass} ${bgClass} overflow-hidden`}
            >
              <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  
                  {/* Content Block */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 space-y-6 md:space-y-8 ${!isEven ? "lg:order-2" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-[#A98B55] text-lg">0{index + 1}</span>
                      <div className={`h-px w-12 ${isDark ? "bg-white/20" : "bg-[#062B4A]/20"}`} />
                      <span className={`${textSubMutedClass} font-medium uppercase tracking-[0.2em] text-[10px]`}>
                        {service.accent}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-[54px] font-medium tracking-tight leading-none">
                      {service.title}
                    </h2>

                    <p className={`${textMutedClass} text-lg md:text-xl font-light leading-relaxed`}>
                      {service.desc}
                    </p>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t ${isDark ? "border-white/10" : "border-[#062B4A]/10"}`}>
                      {service.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className={`w-1.5 h-1.5 rounded-full ${bulletColor} mt-2 shrink-0`} />
                          <p className={`${textMutedClass} text-sm font-light leading-relaxed`}>{bullet}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 flex flex-wrap items-center gap-6">
                      {service.link ? (
                        <Link 
                          href={service.link}
                          className={`inline-flex items-center gap-4 transition-colors duration-500 group py-2 ${
                            isDark ? "text-white hover:text-[#A98B55]" : "text-[#062B4A] hover:text-[#A98B55]"
                          }`}
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Learn More</span>
                          <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                        </Link>
                      ) : (
                        <Link 
                          href="/contact" 
                          className={`inline-flex items-center gap-4 transition-colors duration-500 group py-2 ${
                            isDark ? "text-white hover:text-[#A98B55]" : "text-[#062B4A] hover:text-[#A98B55]"
                          }`}
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Enquire Now</span>
                          <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                        </Link>
                      )}
                    </div>
                  </motion.div>

                  {/* Image Block */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 relative aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden group/img ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-[10s] ease-out group-hover/img:scale-105" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A]/20 to-transparent pointer-events-none" />
                  </motion.div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══ DUBAI PRESENCE ═══ */}
      <section className="relative py-40 bg-[#062B4A] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" alt="Dubai Skyline" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062B4A] via-[#062B4A]/90 to-[#062B4A]" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/30" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">Global Reach</span>
            </div>
            <h2 className="text-5xl md:text-[80px] font-medium text-white tracking-tight leading-[0.9] mb-6">
              Dubai <br/> <span className="font-medium text-[#A98B55]">presence.</span>
            </h2>
            <p className="text-white/60 font-light text-xl leading-relaxed mb-12">
              Through Sanghavi & Bafana Consultants, access Dubai business setup, compliance, and strategic structuring across the UAE.
            </p>
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-center gap-4"><span className="text-white/30 text-xs font-bold text-[#A98B55]">01</span><span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">UAE Setup</span></div>
              <div className="flex items-center gap-4"><span className="text-white/30 text-xs font-bold text-[#A98B55]">02</span><span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">Compliance</span></div>
              <div className="flex items-center gap-4"><span className="text-white/30 text-xs font-bold text-[#A98B55]">03</span><span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">Advisory</span></div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-4 text-white hover:text-[#A98B55] transition-colors group w-fit">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Explore Dubai</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE (MINIMAL) ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-[#FAF9F6] border-t border-[#062B4A]/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24 border-b border-[#062B4A]/10 pb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-[#062B4A] tracking-tight">
              Why Choose <br/>
              <span className="font-medium text-[#A98B55]">HB Realty?</span>
            </h2>
            <p className="text-[#062B4A]/50 text-lg font-light max-w-md md:pt-4">Delivering results that last across warehousing, land development, and legal advisory.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {[
              { title: "Experience", desc: "Years of proven expertise in land and warehouse projects.", num: "20+" },
              { title: "Location", desc: "Strategic sites in Nashik connected to major industrial hubs.", num: "5+" },
              { title: "Compliance", desc: "Legal and liaison support to keep projects risk-free.", num: "100%" },
              { title: "Sustainability", desc: "Green practices integrated into every development.", num: "∞" }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start group">
                <div className="text-5xl font-light text-[#062B4A]/30 mb-8 group-hover:text-[#A98B55]/60 transition-colors duration-700">{item.num}</div>
                <div className="h-px w-8 bg-[#062B4A]/20 mb-6" />
                <h4 className="text-[#062B4A] font-medium text-lg tracking-wide mb-3">{item.title}</h4>
                <p className="text-[#062B4A]/50 text-sm font-light leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
