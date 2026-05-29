'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'

// ── Reusable animated line ────────────────────────────────────
function AnimLine({ delay = 0, className = '', style }: { delay?: number; className?: string; style?: React.CSSProperties }) {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left', ...style }}
            className={`h-px bg-white/20 ${className}`}
        />
    )
}

// ── Floating label pill ───────────────────────────────────────
function FloatingLabel({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.03] backdrop-blur-sm"
        >
            <span className="w-1 h-1 rounded-full bg-amber-500/80 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">{text}</span>
        </motion.div>
    )
}

// ── Service row item ──────────────────────────────────────────
function ServiceRow({ number, label, index }: { number: string; label: string; index: number }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-4 py-1 cursor-default"
        >
            <motion.span
                animate={{ color: hovered ? '#f59e0b' : 'rgba(255,255,255,0.25)' }}
                transition={{ duration: 0.3 }}
                className="text-xs font-serif italic w-5 shrink-0"
            >
                {number}
            </motion.span>
            <motion.span
                animate={{ color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)', x: hovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] uppercase tracking-[0.2em] font-medium"
            >
                {label}
            </motion.span>
            <motion.div
                animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
                className="flex-1 h-px bg-amber-500/50"
            />
        </motion.div>
    )
}

// ══════════════════════════════════════════════════════════════
// SECTION 1 — INDUSTRIAL ECOSYSTEMS (Warehousing)
// ══════════════════════════════════════════════════════════════
export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
    const imageY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 bg-[#080808] border-b border-white/5 overflow-hidden"
        >
            {/* Ambient corner glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">

                    {/* ── Image Side ── */}
                    <div className="md:col-span-7 relative">
                        {/* Floating label above image */}
                        <div className="mb-4">
                            <FloatingLabel text="Grade-A Infrastructure" delay={0.1} />
                        </div>

                        {/* Image container with parallax */}
                        <motion.div
                            initial={{ opacity: 0, clipPath: 'inset(12% 8% 12% 8%)' }}
                            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-[520px] md:h-[780px] w-full overflow-hidden"
                        >
                            <motion.div style={{ y: imageY }} className="absolute inset-[-8%] w-[116%] h-[116%]">
                                <Image
                                    src="/warehousing.avif"
                                    alt="Grade-A Warehousing"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />

                            {/* Overlay corner accent */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="absolute bottom-6 left-6 flex items-end gap-3"
                            >
                                <div className="w-8 h-8 border border-amber-500/30" />
                                <span className="text-white/20 text-[10px] uppercase tracking-[0.2em]">Warehousing · 2024</span>
                            </motion.div>
                        </motion.div>

                        {/* Thin animated border accent below image */}
                        <AnimLine delay={1.0} className="mt-4 w-1/3" />
                    </div>

                    {/* ── Text Side ── */}
                    <div className="md:col-span-5 relative z-10 flex flex-col justify-center md:-ml-24 md:mt-32">
                        <motion.div
                            style={{ y: textY }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="bg-[#080808] p-10 md:p-16 border border-white/10 relative"
                        >
                            {/* Corner accent dots */}
                            <span className="absolute top-3 left-3 w-1 h-1 bg-amber-500/40 rounded-full" />
                            <span className="absolute top-3 right-3 w-1 h-1 bg-white/10 rounded-full" />
                            <span className="absolute bottom-3 left-3 w-1 h-1 bg-white/10 rounded-full" />
                            <span className="absolute bottom-3 right-3 w-1 h-1 bg-amber-500/40 rounded-full" />

                            {/* Animated top line */}
                            <AnimLine delay={0.4} className="w-12 mb-12" />

                            {/* Headline with word stagger */}
                            <div className="mb-4 overflow-hidden">
                                <motion.h2
                                    initial={{ y: 40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-4xl md:text-5xl font-medium text-white tracking-tight"
                                >
                                    Industrial
                                </motion.h2>
                            </div>
                            <div className="overflow-hidden mb-6">
                                <motion.h2
                                    initial={{ y: 40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.52, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-4xl md:text-5xl font-serif italic text-white/60 tracking-tight"
                                >
                                    Ecosystems
                                </motion.h2>
                            </div>

                            {/* Body text */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-10"
                            >
                                We develop Grade-A warehousing infrastructure with absolute precision. Our spaces are engineered
                                for the future of logistics, backed by decades of legal and operational mastery.
                            </motion.p>

                            {/* Services list */}
                            <div className="flex flex-col gap-5 pt-6 border-t border-white/5">
                                <ServiceRow number="01" label="Land Development" index={0} />
                                <ServiceRow number="02" label="Legal Precision" index={1} />
                            </div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.85, duration: 0.8 }}
                                className="mt-12"
                            >
                                <Link
                                    href="/portfolio"
                                    className="inline-flex items-center gap-4 text-white/40 hover:text-white transition-colors duration-500 group"
                                >
                                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium">View Portfolio</span>
                                    <motion.div
                                        className="flex items-center"
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight size={13} />
                                    </motion.div>
                                    {/* Underline */}
                                    <motion.span
                                        className="absolute bottom-0 left-0 h-px bg-amber-500/60 w-0 group-hover:w-full transition-all duration-500"
                                    />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}


// ══════════════════════════════════════════════════════════════
// SECTION 2 — MASTER PLANNING (Land Development)
// ══════════════════════════════════════════════════════════════
export function LandDevelopmentSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
    const imageY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['2%', '-2%'])

    return (
        <section
            id="land-development"
            ref={sectionRef}
            className="relative py-32 bg-[#080808] border-b border-white/5 overflow-hidden"
        >
            {/* Ambient left glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.025] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">

                    {/* ── Text Side (left, overlaps image) ── */}
                    <div className="md:col-span-5 relative z-10 flex flex-col justify-center md:mb-32 md:order-1 order-2 md:mr-[-100px]">
                        <motion.div
                            style={{ y: textY }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="bg-[#080808] p-10 md:p-16 border border-white/10 relative"
                        >
                            {/* Corner accent dots */}
                            <span className="absolute top-3 left-3 w-1 h-1 bg-amber-500/40 rounded-full" />
                            <span className="absolute top-3 right-3 w-1 h-1 bg-white/10 rounded-full" />
                            <span className="absolute bottom-3 left-3 w-1 h-1 bg-white/10 rounded-full" />
                            <span className="absolute bottom-3 right-3 w-1 h-1 bg-amber-500/40 rounded-full" />

                            {/* Animated top line */}
                            <AnimLine delay={0.4} className="w-12 mb-12" />

                            {/* Headline */}
                            <div className="mb-2 overflow-hidden">
                                <motion.h2
                                    initial={{ y: 40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-4xl md:text-5xl font-medium text-white tracking-tight"
                                >
                                    Master
                                </motion.h2>
                            </div>
                            <div className="overflow-hidden mb-6">
                                <motion.h2
                                    initial={{ y: 40, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.52, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-4xl md:text-5xl font-serif italic text-white/60 tracking-tight"
                                >
                                    Planning
                                </motion.h2>
                            </div>

                            {/* Body */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-10"
                            >
                                Transforming raw potential into strategic assets. Our land development expertise ensures
                                absolute compliance, seamless approvals, and infrastructure-ready spaces for visionary investors.
                            </motion.p>

                            {/* Services — right-aligned numbers */}
                            <div className="flex flex-col gap-5 pt-6 border-t border-white/5">
                                {[
                                    { n: '01', label: 'Acquisition & Zoning' },
                                    { n: '02', label: 'Turnkey Infrastructure' },
                                ].map((item, i) => {
                                    const [hovered, setHovered] = useState(false)
                                    return (
                                        <motion.div
                                            key={item.n}
                                            initial={{ opacity: 0, x: 16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                            onMouseEnter={() => setHovered(true)}
                                            onMouseLeave={() => setHovered(false)}
                                            className="flex items-center justify-between cursor-default"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <motion.div
                                                    animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    style={{ transformOrigin: 'left' }}
                                                    className="h-px flex-1 bg-amber-500/50 max-w-[60px]"
                                                />
                                                <motion.span
                                                    animate={{ color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)', x: hovered ? -4 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-[11px] uppercase tracking-[0.2em] font-medium"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            </div>
                                            <motion.span
                                                animate={{ color: hovered ? '#f59e0b' : 'rgba(255,255,255,0.25)' }}
                                                transition={{ duration: 0.3 }}
                                                className="text-xs font-serif italic ml-4 shrink-0"
                                            >
                                                {item.n}
                                            </motion.span>
                                        </motion.div>
                                    )
                                })}
                            </div>

                            {/* CTA — left arrow */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.85, duration: 0.8 }}
                                className="mt-12"
                            >
                                <Link
                                    href="/properties"
                                    className="inline-flex items-center gap-4 text-white/40 hover:text-white transition-colors duration-500 group"
                                >
                                    <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.3 }}>
                                        <ArrowLeft size={13} />
                                    </motion.div>
                                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Explore Opportunities</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Image Side (right) ── */}
                    <div className="md:col-span-7 relative md:order-2 order-1">
                        {/* Floating label */}
                        <div className="mb-4 flex justify-end">
                            <FloatingLabel text="Strategic Land Assets" delay={0.15} />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, clipPath: 'inset(12% 8% 12% 8%)' }}
                            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-[520px] md:h-[780px] w-full overflow-hidden"
                        >
                            <motion.div style={{ y: imageY }} className="absolute inset-[-8%] w-[116%] h-[116%]">
                                <Image
                                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000"
                                    alt="Land Development"
                                    fill
                                    className="object-cover grayscale-[20%]"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />

                            {/* Bottom-right corner accent */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="absolute bottom-6 right-6 flex items-end gap-3"
                            >
                                <span className="text-white/20 text-[10px] uppercase tracking-[0.2em]">Land Dev · 2024</span>
                                <div className="w-8 h-8 border border-amber-500/30" />
                            </motion.div>

                            {/* Vertical progress line on right edge */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformOrigin: 'top' }}
                                className="absolute top-8 right-0 w-px h-[calc(100%-64px)] bg-gradient-to-b from-amber-500/40 via-white/10 to-transparent"
                            />
                        </motion.div>

                        <AnimLine delay={1.0} className="mt-4 ml-auto w-1/3" style={{ transformOrigin: 'right' }} />
                    </div>

                </div>
            </div>
        </section>
    )
}