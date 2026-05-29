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
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
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
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
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
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000",
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
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000",
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
    bullets: [
      "Market trends and investment analysis",
      "Project viability reports",
      "Legal and regulatory compliance checks",
      "End-to-end transaction support"
    ]
  }
];

export default function ServicesPage() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const current = services[active];

  useEffect(() => {
    const duration = 8000;
    const interval = 30;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        setActive(prev => (prev + 1) % services.length);
        elapsed = 0;
        setProgress(0);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">

      {/* ═══ HEADER (EDITORIAL) ═══ */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-5xl">
          <div className="w-12 h-px bg-white/20 mb-8" />
          <h1 className="text-4xl md:text-[80px] font-medium text-white tracking-tight leading-[1] mb-8">
            Warehousing & <br/>
            <span className="font-serif italic text-white/50">land development.</span>
          </h1>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="pl-0 md:pl-10 border-l-0 md:border-l border-white/20"
          >
            <p className="text-white/50 text-xl md:text-2xl font-light leading-relaxed max-w-2xl pl-0 md:pl-8">
              From raw land acquisition to turnkey infrastructure and legal mastery, our services define the standard for real estate execution.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ FULL-WIDTH IMMERSIVE SERVICES CAROUSEL ═══ */}
      <section className="relative py-12 overflow-hidden">
        <div className="relative h-[700px] md:h-[800px] w-full overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={current.image} alt={current.title} fill className="object-cover brightness-[0.35]" sizes="100vw" />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center md:items-end pb-16 md:pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full left-0 right-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={active}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl w-full space-y-6 md:space-y-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-white/40 font-serif italic text-lg">{`0${active + 1}`}</span>
                  <div className="h-px w-12 bg-white/20" />
                  <span className="text-white/80 font-medium uppercase tracking-[0.2em] text-[10px]">{current.accent}</span>
                </div>
                <h2 className="text-4xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]">
                  {current.title}
                </h2>
                <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">{current.desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl pt-8 border-t border-white/10 mt-8">
                  {current.bullets.map((bullet, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                      <p className="text-white/50 text-sm font-light">{bullet}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-12">
                  <Link href="/contact" className="text-white/50 hover:text-white transition-colors duration-500 flex items-center gap-4 group">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Enquire Now</span>
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-8 right-8 md:top-auto md:bottom-24 md:right-12 flex flex-col items-end gap-6 z-20">
            <div className="flex items-center gap-4">
              {services.map((_, i) => (
                <button key={i} onClick={() => { setActive(i); setProgress(0); }} className="group relative py-2 px-1">
                  <span className={`text-[10px] font-bold block mb-2 transition-colors ${active === i ? 'text-white' : 'text-white/20'}`}>0{i + 1}</span>
                  <div className="relative w-10 h-[2px] bg-white/10 overflow-hidden">
                    {active === i && <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="absolute inset-0 bg-white" />}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setActive(prev => (prev - 1 + services.length) % services.length); setProgress(0); }} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all hover:bg-white/5">
                <ArrowLeft size={20} />
              </button>
              <button onClick={() => { setActive(prev => (prev + 1) % services.length); setProgress(0); }} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all hover:bg-white/5">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Technical Corners */}
          <div className="absolute inset-6 pointer-events-none hidden md:block">
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/20" />
          </div>
        </div>
      </section>

      {/* ═══ DUBAI PRESENCE ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[50px] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" alt="Dubai Skyline" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
            <div className="relative z-10 p-12 md:p-20 min-h-[550px] flex flex-col justify-end max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-white/60 text-[10px] font-medium uppercase tracking-[0.3em]">Global Reach</span>
              </div>
              <h2 className="text-5xl md:text-[80px] font-medium text-white tracking-tight leading-[0.9] mb-6">
                Dubai <br/> <span className="font-serif italic text-white/50">presence.</span>
              </h2>
              <p className="text-white/60 font-light text-xl leading-relaxed mb-12">
                Through Sanghavi & Bafana Consultants, access Dubai business setup, compliance, and strategic structuring across the UAE.
              </p>
              <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-4"><span className="text-white/30 text-xs font-serif italic">01</span><span className="text-white/70 text-[11px] font-medium uppercase tracking-[0.2em]">UAE Setup</span></div>
                <div className="flex items-center gap-4"><span className="text-white/30 text-xs font-serif italic">02</span><span className="text-white/70 text-[11px] font-medium uppercase tracking-[0.2em]">Compliance</span></div>
                <div className="flex items-center gap-4"><span className="text-white/30 text-xs font-serif italic">03</span><span className="text-white/70 text-[11px] font-medium uppercase tracking-[0.2em]">Advisory</span></div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-4 text-white/50 hover:text-white transition-colors group w-fit">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Explore Dubai</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
              </Link>
            </div>
        </motion.div>
      </section>

      {/* ═══ WHY CHOOSE (MINIMAL) ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24 border-b border-white/5 pb-20">
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
              Why Choose <br/>
              <span className="font-serif italic text-white/50">HB Realty?</span>
            </h2>
            <p className="text-white/40 text-lg font-light max-w-md md:pt-4">Delivering results that last across warehousing, land development, and legal advisory.</p>
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
                <div className="text-5xl font-serif italic text-white/30 mb-8 group-hover:text-white/60 transition-colors duration-700">{item.num}</div>
                <div className="h-px w-8 bg-white/20 mb-6" />
                <h4 className="text-white font-medium text-lg tracking-wide mb-3">{item.title}</h4>
                <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
