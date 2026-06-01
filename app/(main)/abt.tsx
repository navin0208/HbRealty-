'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Warehouse } from 'lucide-react'

// ── Color constants ───────────────────────────────────────────
const GOLD = '#A98B55'

// ── Section data ──────────────────────────────────────────────
const sections = [
    {
        id: 'industrial',
        tag: 'Industrial Division',
        icon: <Warehouse size={18} />,
        headline: 'Industrial',
        headlineAccent: 'Ecosystems',
        body: 'We develop Grade-A warehousing infrastructure with absolute precision. Our spaces are engineered for the future of logistics, backed by decades of legal and operational mastery.',
        services: [
            { n: '01', label: 'Land Development' },
            { n: '02', label: 'Legal Precision' },
            { n: '03', label: 'Logistics Infrastructure' },
        ],
        image: '/warehousing.avif',
        imageAlt: 'Grade-A Warehousing',
        cta: { label: 'View Portfolio', href: '/portfolio' },
        accent: 'Warehousing · 2024',
    },
    {
        id: 'residential',
        tag: 'Residential Division',
        icon: <Building2 size={18} />,
        headline: 'Residential',
        headlineAccent: 'Living',
        body: 'From luxury villas to premium apartments, we craft residential spaces that redefine modern living. Every detail is designed to elevate lifestyle while securing lasting value for discerning investors.',
        services: [
            { n: '01', label: 'Premium Apartments' },
            { n: '02', label: 'Luxury Villas' },
            { n: '03', label: 'Gated Communities' },
        ],
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000',
        imageAlt: 'Luxury Residential Living',
        cta: { label: 'Explore Properties', href: '/properties' },
        accent: 'Residential · 2024',
    },
]

// ══════════════════════════════════════════════════════════════
// DYNAMIC SPLIT SCREEN SHOWCASE
// ══════════════════════════════════════════════════════════════
export function AboutSection() {
    const [hoveredPanel, setHoveredPanel] = useState<string | null>(null)

    return (
        <section
            id="about"
            className="relative bg-[#031525] border-b border-white/5"
        >
            <div className="flex flex-col md:flex-row w-full h-[1000px] md:h-[850px]">
                {sections.map((data, index) => {
                    const isHovered = hoveredPanel === data.id
                    const isOtherHovered = hoveredPanel !== null && hoveredPanel !== data.id
                    
                    return (
                        <motion.div
                            key={data.id}
                            onMouseEnter={() => setHoveredPanel(data.id)}
                            onMouseLeave={() => setHoveredPanel(null)}
                            animate={{
                                // On desktop, width expands. On mobile, height expands.
                                width: typeof window !== 'undefined' && window.innerWidth >= 768 
                                    ? (isHovered ? '65%' : isOtherHovered ? '35%' : '50%') 
                                    : '100%',
                                height: typeof window !== 'undefined' && window.innerWidth < 768
                                    ? (isHovered ? '65%' : isOtherHovered ? '35%' : '50%')
                                    : '100%',
                            }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden group cursor-pointer border-b md:border-b-0 md:border-r border-white/10 last:border-none"
                        >
                            {/* ── Background Image ── */}
                            <motion.div 
                                className="absolute inset-0 w-full h-full"
                                animate={{
                                    scale: isHovered ? 1.05 : 1,
                                    filter: isOtherHovered ? 'brightness(0.4) grayscale(50%)' : 'brightness(0.8) grayscale(0%)'
                                }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Image
                                    src={data.image}
                                    alt={data.imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#031525]/90 via-[#031525]/20 to-transparent" />

                            {/* ── Content Container ── */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col justify-end h-full">
                                
                                {/* Top Tag (Visible immediately, pushed up) */}
                                <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3">
                                    <div className="w-8 h-px bg-[#A98B55]/50" />
                                    <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                                        {data.tag}
                                    </span>
                                </div>
                                
                                {/* Division Number Watermark */}
                                <div className="absolute top-6 right-6 md:top-10 md:right-10">
                                    <span className="text-white text-opacity-[0.15] text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <motion.div 
                                    className="relative z-10 max-w-xl"
                                    animate={{
                                        y: isHovered ? 0 : 20,
                                        opacity: isHovered ? 1 : 0.8
                                    }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-2 flex flex-col md:flex-row md:gap-4 md:items-end">
                                        {data.headline}
                                        <span className="font-serif italic text-[#A98B55] text-3xl md:text-5xl">
                                            {data.headlineAccent}
                                        </span>
                                    </h2>
                                    
                                    <motion.p 
                                        className="text-white/60 text-xs md:text-sm font-light leading-relaxed mb-8 mt-4"
                                        animate={{
                                            opacity: isHovered ? 1 : 0,
                                            height: isHovered ? 'auto' : 0,
                                            marginTop: isHovered ? 16 : 0,
                                            marginBottom: isHovered ? 32 : 0
                                        }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {data.body}
                                    </motion.p>

                                    {/* Services List (Reveals on Hover) */}
                                    <motion.div
                                        className="flex flex-col gap-3 pt-4 border-t border-white/20 overflow-hidden"
                                        animate={{
                                            opacity: isHovered ? 1 : 0,
                                            height: isHovered ? 'auto' : 0
                                        }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {data.services.map((s, i) => (
                                            <div key={s.n} className="flex items-center gap-3">
                                                <span className="text-[#A98B55]/70 text-[10px] font-serif italic w-5 shrink-0">
                                                    {s.n}
                                                </span>
                                                <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium">
                                                    {s.label}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* CTA */}
                                    <div className="mt-8">
                                        <Link
                                            href={data.cta.href}
                                            className="inline-flex items-center gap-3 text-white hover:text-[#A98B55] transition-colors duration-500 group/link"
                                        >
                                            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/link:border-[#A98B55] transition-colors">
                                                <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                                            </span>
                                            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                                                {data.cta.label}
                                            </span>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

// Export as named — LandDevelopmentSection is now merged into AboutSection
export function LandDevelopmentSection() {
    return null
}