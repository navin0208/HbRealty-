"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize, Download, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import TrustedPartners from "@/components/sections/TrustedPartners";
import { useElementScrollProgress, type ElementScrollOffset } from "@/components/useElementScrollProgress";

const HERO_SCROLL_OFFSET: ElementScrollOffset = ["start start", "end start"];

export const projects = [
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
    image: "/Warehouse p3.jpg",
    hasBrochure: true,
    brochureUrl: "/warehouse-brochure.pdf",
    featured: true,
    status: "Ongoing",
    units: "Phase-1 & 2",
    completion: "Dec 2025",
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
    image: "/VINYASA-1_page-0010.jpg",
    hasBrochure: true,
    brochureUrl: "/VINYASA-1-1.pdf",
    featured: true,
    status: "Ongoing",
    units: "82 Plots",
    completion: "Dec 2026",
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
    image: "/TiratShet-Enclave-Nashik-Gat-No.-2.png",
    hasBrochure: false,
    featured: false,
    status: "Ongoing",
    units: "113 Plots",
    completion: "Q2 2026",
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
    image: "/Maparvadi-Greens-Sinnar-Gat-No.-22l-1.png",
    hasBrochure: false,
    featured: false,
    status: "Upcoming",
    units: "118 Plots",
    completion: "Q3 2026",
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
    image: "/Maparvadi-Meadows-Sinnar-.jpeg",
    hasBrochure: true,
    brochureUrl: "/VINYASA-1-1.pdf",
    featured: false,
    status: "Ongoing",
    units: "57 Plots",
    completion: "Q4 2025",
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
    image: "/plot-development-.jpg",
    hasBrochure: false,
    featured: false,
    status: "Upcoming",
    units: "40 Plots",
    completion: "Q2 2027",
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
    image: "/row-house-.jpg",
    hasBrochure: false,
    featured: false,
    status: "Ongoing",
    units: "4 Units",
    completion: "Q1 2026",
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
    <main className="min-h-screen bg-white font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]/30 overflow-x-hidden">

      {/* ═══ CINEMATIC HERO WITH PARALLAX (EDITORIAL) ═══ */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Portfolio" fill className="object-cover grayscale-[30%]" priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062B4A]/90 via-[#062B4A]/20 to-transparent h-48" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-12 md:pb-16 lg:pb-24 w-full">
          <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-white/20 mb-8" />
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-white tracking-tight leading-[1.1] lg:leading-[0.9]">
              Shaping <span className="font-medium text-[#A98B55]">Maharashtra&apos;s</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden ml-0 md:ml-16 lg:ml-32 mb-8 md:mb-12">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium text-white tracking-tight leading-[1.1] lg:leading-[0.9]">
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
                <span className="text-3xl md:text-4xl font-medium text-[#A98B55] text-white tracking-tight">{stat.val}</span>
                <span className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ FEATURED — EDITORIAL CARDS ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto space-y-32">
        <div className="flex items-center gap-4 mb-16 border-b border-[#062B4A]/10 pb-8">
          <span className="text-[#062B4A]/40 font-light text-lg">01</span>
          <div className="h-px w-12 bg-[#062B4A]/20" />
          <span className="text-[#062B4A]/80 text-[10px] font-medium uppercase tracking-[0.2em]">Featured Works</span>
        </div>

        {featured.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }} 
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-8 lg:gap-12 xl:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image Block */}
            <div className={`xl:col-span-7 relative h-[400px] md:h-[500px] xl:h-[700px] w-full overflow-hidden group ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
              <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-[20s] ease-out group-hover:scale-105 grayscale-[20%]" />
            </div>

            {/* Text Block */}
            <div className={`xl:col-span-5 flex flex-col justify-center w-full overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
              <span className="text-[#062B4A]/55 text-[10px] font-bold uppercase tracking-[0.2em] block mb-4">{project.category}</span>
              <h2 className="text-3xl md:text-5xl lg:text-4xl xl:text-6xl font-medium text-[#062B4A] tracking-tight leading-[1.1] mb-6 break-words pr-4">{project.title}</h2>
              <p className="text-[#062B4A]/60 font-light text-base md:text-lg lg:text-base xl:text-lg leading-relaxed mb-8 xl:mb-10 max-w-lg pr-4">{project.overview}</p>
              
              <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-4 border-b border-[#062B4A]/10 pb-4">
                  <MapPin size={14} className="text-[#062B4A]/40" />
                  <span className="text-[#062B4A]/70 text-xs font-medium uppercase tracking-widest">{project.location}</span>
                </div>
                <div className="flex items-center gap-4 border-b border-[#062B4A]/10 pb-4">
                  <Maximize size={14} className="text-[#062B4A]/40" />
                  <span className="text-[#062B4A]/70 text-xs font-medium uppercase tracking-widest">{project.area}</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <Link href={project.id === "osiyan" ? "/warehousing-2" : "/contact"} className="text-[#062B4A]/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em]">{project.id === "osiyan" ? "Learn More" : "Interested"}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                </Link>
                {project.hasBrochure && project.brochureUrl && (
                  <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer" className="text-[#062B4A]/40 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group">
                    <Download size={14} className="group-hover:-translate-y-1 transition-transform ease-cinematic" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Brochure</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ═══ OTHER PROJECTS — MINIMAL LIST ═══ */}
      <section className="relative py-32 bg-white text-[#062B4A] border-t border-[#062B4A]/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[#062B4A]/40 font-light text-lg">02</span>
            <div className="h-px w-12 bg-[#062B4A]/20" />
            <span className="text-[#062B4A]/80 text-[10px] font-bold uppercase tracking-[0.2em]">All Projects</span>
          </div>

          <div className="space-y-0 divide-y divide-[#062B4A]/10">
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
                      <span className="text-[#062B4A]/50 text-[9px] font-bold uppercase tracking-[0.2em]">{project.category}</span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-medium text-[#062B4A] tracking-tight group-hover:text-[#062B4A]/80 transition-colors duration-500">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-[#062B4A]/60 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{project.location.split(',')[0]}</span>
                  </div>
                  <div className="text-[#062B4A]/45 shrink-0 group-hover:text-[#A98B55] transition-colors duration-500 hidden md:block">
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
                      <div className="px-6 md:px-8 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#062B4A]/10 pt-8">
                        <div className="lg:col-span-5 relative h-[280px] rounded-2xl overflow-hidden border border-[#062B4A]/10 bg-black/5">
                          <Image src={project.image} alt={project.title} fill className="object-cover opacity-85" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className="lg:col-span-7 space-y-6">
                          <p className="text-[#062B4A]/70 font-light text-base leading-relaxed">{project.overview}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.highlights.map((h, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-[#062B4A]/5 border border-[#062B4A]/10 rounded-full text-[#062B4A]/80 text-[10px] font-bold uppercase tracking-widest">{h}</span>
                            ))}
                          </div>
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div>
                              <span className="text-[#062B4A]/40 text-[9px] font-bold uppercase tracking-widest block mb-1">Location</span>
                              <span className="text-[#062B4A] text-sm font-medium">{project.location}</span>
                            </div>
                            <div>
                              <span className="text-[#062B4A]/40 text-[9px] font-bold uppercase tracking-widest block mb-1">Area</span>
                              <span className="text-[#062B4A] text-sm font-medium">{project.area}</span>
                            </div>
                            <div>
                              <span className="text-[#062B4A]/40 text-[9px] font-bold uppercase tracking-widest block mb-1">Scale</span>
                              <span className="text-[#062B4A] text-sm font-medium">{project.details}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 pt-2">
                            <Link href="/contact" className="px-6 py-3 bg-[#062B4A] text-white hover:bg-[#A98B55] font-bold uppercase tracking-widest text-xs rounded-full transition-colors">
                              Contact Us
                            </Link>
                             {project.hasBrochure && project.brochureUrl && (
                              <a href={project.brochureUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#062B4A]/20 text-[#062B4A] font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#062B4A]/5 transition-colors flex items-center gap-2">
                                <Download size={14} /> Brochure
                              </a>
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUSTED PARTNERS & CLIENTS
          ═══════════════════════════════════════════════════════════ */}
      <TrustedPartners />

      {/* ═══ CTA (EDITORIAL / PREMIUM BLUE) ═══ */}
      <section className="relative py-40 px-6 md:px-12 bg-[#062B4A] text-white selection:bg-white selection:text-[#062B4A]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1600px] mx-auto flex flex-col items-center text-center"
        >
          <div className="w-12 h-px bg-white/20 mb-8" />
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-4">
            Interested in a <br/> <span className="font-medium text-[#A98B55]">project?</span>
          </h2>
          <p className="text-white/60 font-light text-lg mb-12 max-w-md">Let us know and our team will get back to you within 24 hours.</p>
          <Link href="/contact" className="text-white/70 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Contact Us</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
