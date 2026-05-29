"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, Download, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useElementScrollProgress, type ElementScrollOffset } from "@/components/useElementScrollProgress";

const HERO_SCROLL_OFFSET: ElementScrollOffset = ["start start", "end start"];

const projects = [
  {
    id: "osiyan",
    title: "Osiyan Warehousing",
    subtitle: "Grade-A Industrial Development",
    category: "Warehousing",
    location: "Akrale MIDC, Dindori, Nashik",
    area: "9 Acres (≈38,000 sq.m)",
    details: "Phase-1: 80,000 sq.ft | Phase-2: 1,20,000 sq.ft",
    overview: "A premium Grade-A industrial warehouse positioned near Nashik Airport and major highways. Phase One features a 80,000 sq.ft warehouse block with 19 loading docks, 10-meter clear height, and advanced trimix flooring. Fully secured with an RCC compound wall, 2 lakh liters water tank, and a dedicated transformer.",
    highlights: ["19 Loading Docks", "10m Clear Height", "2L Litre Water Tank", "Dedicated Transformer"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: true,
    featured: true,
  },
  {
    id: "vinyasa",
    title: "Vinyasa",
    subtitle: "Wellness Premium Community",
    category: "Wellness & Residential",
    location: "Kurungawadi, Igatpuri",
    area: "82,574 sq.m",
    details: "82 Premium Plots",
    overview: "Wellness-first plotted living in Igatpuri. Conceived around nature and mindful living, this community features yoga zones, reflexology walks, organic farming, and resort-like amenities.",
    highlights: ["Yoga Zones", "Organic Farming", "Gated Community", "Mountain Air"],
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: true,
    featured: true,
  },
  {
    id: "tirasheet",
    title: "Tirasheet Enclave",
    subtitle: "Premium Plotted Development",
    category: "Land Development",
    location: "Tiratshet, Nashik",
    area: "48,200 sq.m",
    details: "113 Plots",
    overview: "A serene, infrastructure-ready development blending open vistas of hills and vineyards with a premium entry experience. Features internal roads, lighting, and utilities up to the plot boundary.",
    highlights: ["Hills & Vineyards", "113 Plots", "Road Access", "Premium Entry"],
    image: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: false,
    featured: false,
  },
  {
    id: "maparvadi-greens",
    title: "Maparvadi Greens",
    subtitle: "Plotted Township Concept",
    category: "Land Development",
    location: "Sinnar, Nashik (Gat No. 22)",
    area: "16,341.25 sq.m",
    details: "118 Plots",
    overview: "A larger plotted township concept planned with wider internal roads and landscaped pockets. Perfect for families planning custom homes near Nashik's rapidly expanding growth belt.",
    highlights: ["118 Plots", "Wide Roads", "Green Verges", "Near Highway"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: false,
    featured: false,
  },
  {
    id: "maparvadi-meadows",
    title: "Maparvadi Meadows",
    subtitle: "Compact Well-Planned Community",
    category: "Land Development",
    location: "Maparvadi, Sinnar (Gat No. 50)",
    area: "17,700 sq.m",
    details: "57 Plots (incl. amenity plot)",
    overview: "Designed for end users and investors seeking clean planning, good road access, and a calm residential setting. Neat plot grid for optimal home design and Vastu planning.",
    highlights: ["57 Plots", "Vastu Ready", "Amenity Plot", "Clean Layout"],
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: true,
    featured: false,
  },
  {
    id: "kasbevani",
    title: "Kasbevani Land Project",
    subtitle: "Structured Residential Plots",
    category: "Land Development",
    location: "Kasbevani, Dindori, Nashik",
    area: "8,900 sq.m",
    details: "40 Plots (incl. amenity plot)",
    overview: "A planned land development strategically located in Dindori. Focuses on well-structured residential plots with systematic layout planning and dedicated community facilities.",
    highlights: ["40 Plots", "Systematic Layout", "Community Space", "Dindori Location"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: false,
    featured: false,
  },
  {
    id: "row-houses",
    title: "4 Premium Row Houses",
    subtitle: "Modern Residential Development",
    category: "Residential",
    location: "Maparvadi, Sinnar, Nashik (Plot 29 & 30)",
    area: "Layouts: 129.69 & 145.94 sq.m",
    details: "4 Units",
    overview: "Contemporary facade with vertical fins and glass balconies. Ground-floor living with upstairs bedrooms for privacy. Includes dedicated gated entry, covered parking, and large windows for natural light.",
    highlights: ["Glass Balconies", "Covered Parking", "Gated Entry", "Natural Light"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
    hasBrochure: false,
    featured: false,
  }
];

export default function PortfolioPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);
  
  const heroRef = useRef<HTMLElement>(null);
  const scrollYProgress = useElementScrollProgress(heroRef, HERO_SCROLL_OFFSET);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-[#020202] font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">

      {/* ═══ CINEMATIC HERO WITH PARALLAX (EDITORIAL) ═══ */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Portfolio" fill className="object-cover grayscale-[30%]" priority 
          />
          <div className="absolute inset-0 bg-[#080808]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 w-full">
          <div className="w-12 h-px bg-white/20 mb-8" />
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]">
              Shaping <span className="font-serif italic text-white/50">Maharashtra&apos;s</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden ml-0 md:ml-32 mb-12">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]">
              future.
            </motion.h1>
          </div>
          
          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap gap-12 mt-12 pl-0 md:pl-32 border-l-0 md:border-l border-white/20 md:py-4">
            {[
              { val: "7", label: "Active Projects" },
              { val: "2.5L+", label: "Sq.m Developed" },
              { val: "500+", label: "Total Plots" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-start gap-2">
                <span className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">{stat.val}</span>
                <span className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ FEATURED — EDITORIAL CARDS ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto space-y-32">
        <div className="flex items-center gap-4 mb-16 border-b border-white/5 pb-8">
          <span className="text-white/30 font-serif italic text-lg">01</span>
          <div className="h-px w-12 bg-white/20" />
          <span className="text-white/80 text-[10px] font-medium uppercase tracking-[0.2em]">Featured Works</span>
        </div>

        {featured.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image Block */}
            <div className={`lg:col-span-7 relative h-[500px] md:h-[700px] overflow-hidden group ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
              <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-[20s] ease-out group-hover:scale-105 grayscale-[20%]" />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            </div>

            {/* Text Block */}
            <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
              <span className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] block mb-4">{project.category}</span>
              <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1] mb-6">{project.title}</h2>
              <p className="text-white/50 font-light text-lg leading-relaxed mb-10 max-w-lg">{project.overview}</p>
              
              <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <MapPin size={14} className="text-white/30" />
                  <span className="text-white/70 text-xs font-medium uppercase tracking-widest">{project.location}</span>
                </div>
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <Maximize size={14} className="text-white/30" />
                  <span className="text-white/70 text-xs font-medium uppercase tracking-widest">{project.area}</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <Link href={project.id === "osiyan" ? "/warehousing-2" : "/contact"} className="text-white/50 hover:text-white transition-colors duration-500 flex items-center gap-4 group">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em]">{project.id === "osiyan" ? "Learn More" : "Interested"}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                </Link>
                {project.hasBrochure && (
                  <button className="text-white/30 hover:text-white transition-colors duration-500 flex items-center gap-4 group">
                    <Download size={14} className="group-hover:-translate-y-1 transition-transform ease-cinematic" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Brochure</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ═══ OTHER PROJECTS — MINIMAL LIST ═══ */}
      <section className="relative py-20 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5 pt-32">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-white/30 font-serif italic text-lg">02</span>
          <div className="h-px w-12 bg-white/20" />
          <span className="text-white/80 text-[10px] font-medium uppercase tracking-[0.2em]">All Projects</span>
        </div>

        <div className="space-y-0 divide-y divide-white/5">
          {others.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <button 
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                className="w-full py-8 md:py-12 flex flex-col md:flex-row md:items-center gap-6 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/40 text-[9px] font-medium uppercase tracking-[0.2em]">{project.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-medium text-white tracking-tight group-hover:opacity-70 transition-opacity duration-500">{project.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-white/40 shrink-0">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em]">{project.location.split(',')[0]}</span>
                </div>
                <div className="text-white/30 shrink-0 group-hover:text-white transition-colors duration-500 hidden md:block">
                  {expandedId === project.id ? <ChevronUp size={20} strokeWidth={1} /> : <ChevronDown size={20} strokeWidth={1} />}
                </div>
              </button>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-8">
                      <div className="lg:col-span-5 relative h-[280px] rounded-2xl overflow-hidden border border-white/10">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="lg:col-span-7 space-y-6">
                        <p className="text-white/60 font-light text-base leading-relaxed">{project.overview}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((h, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-[10px] font-bold uppercase tracking-widest">{h}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest block mb-1">Location</span>
                            <span className="text-white text-sm">{project.location}</span>
                          </div>
                          <div>
                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest block mb-1">Area</span>
                            <span className="text-white text-sm">{project.area}</span>
                          </div>
                          <div>
                            <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest block mb-1">Scale</span>
                            <span className="text-white text-sm">{project.details}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <Link href="/contact" className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-amber-500 hover:text-white transition-colors">
                            Contact Us
                          </Link>
                          {project.hasBrochure && (
                            <button className="px-6 py-3 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                              <Download size={14} /> Brochure
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CTA (EDITORIAL) ═══ */}
      <section className="relative py-40 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-12 h-px bg-white/20 mb-8" />
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-4">
            Interested in a <br/> <span className="font-serif italic text-white/50">project?</span>
          </h2>
          <p className="text-white/40 font-light text-lg mb-12 max-w-md">Let us know and our team will get back to you within 24 hours.</p>
          <Link href="/contact" className="text-white/50 hover:text-white transition-colors duration-500 flex items-center gap-4 group">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Contact Us</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
