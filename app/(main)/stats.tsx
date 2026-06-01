'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── CountUp Hook ──────────────────────────────────────────────
function useCountUp(target: number, duration = 2200, startOnView = true) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    useEffect(() => {
        if (!inView && startOnView) return
        let startTime: number | null = null
        const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

        const tick = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const elapsed = timestamp - startTime
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(easeOutExpo(progress) * target))
            if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [inView, target, duration, startOnView])

    return { count, ref }
}

// ── Single Stat Item ──────────────────────────────────────────
interface StatProps {
    value: number
    suffix?: string
    label: string
    index: number
    description: string
}

function StatItem({ value, suffix = '+', label, index, description }: StatProps) {
    const { count, ref } = useCountUp(value, 2000 + index * 200)
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex flex-col items-start group cursor-default select-none"
        >
            {/* Ambient glow behind number */}
            <motion.div
                animate={{ opacity: hovered ? 0.4 : 0, scale: hovered ? 1 : 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-6 -left-4 w-48 h-48 md:w-72 md:h-72 rounded-full bg-blue-100 blur-3xl pointer-events-none"
            />

            {/* Number */}
            <div className="relative flex items-end gap-1 md:gap-2 mb-3">
                <motion.span
                    animate={{ color: hovered ? '#041D34' : '#062B4A' }}
                    transition={{ duration: 0.5 }}
                    className="text-[72px] md:text-[148px] font-medium tracking-tighter leading-none font-sans"
                >
                    {count}
                </motion.span>
                <motion.span
                    animate={{ color: hovered ? '#041D34' : 'rgba(6, 43, 74, 0.4)' }}
                    transition={{ duration: 0.5 }}
                    className="text-[32px] md:text-[64px] font-medium leading-none mb-2 md:mb-4 font-sans"
                >
                    {suffix}
                </motion.span>
            </div>

            {/* Animated divider line */}
            <div className="relative h-px w-full mb-5 overflow-hidden">
                {/* Base dim line */}
                <div className="absolute inset-0 bg-[#062B4A]/10" />
                {/* Animated fill */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.18 + 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-0 bg-[#062B4A]/30"
                />
                {/* Hover fill */}
                <motion.div
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-0 bg-[#062B4A]"
                />
                {/* Shimmer on hover */}
                <motion.div
                    animate={{ x: hovered ? '100%' : '-100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent mix-blend-overlay"
                />
            </div>

            {/* Label */}
            <motion.p
                animate={{ color: hovered ? 'rgba(6, 43, 74, 1)' : 'rgba(6, 43, 74, 0.6)' }}
                transition={{ duration: 0.4 }}
                className="text-sm md:text-base font-medium tracking-wide uppercase"
            >
                {label}
            </motion.p>

            {/* Description — revealed on hover (desktop) */}
            <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{
                    opacity: hovered ? 1 : 0,
                    height: hovered ? 'auto' : 0,
                    marginTop: hovered ? 12 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#062B4A]/50 text-xs md:text-sm font-light leading-relaxed max-w-[200px] overflow-hidden"
            >
                {description}
            </motion.p>
        </motion.div>
    )
}

// ── Floating Background Ticker ────────────────────────────────
function BackgroundTicker() {
    const words = ['PRECISION', 'LEGACY', 'ARCHITECTURE', 'TRUST', 'MASTERY', 'VISION', 'CRAFT']
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="flex gap-16 whitespace-nowrap absolute bottom-8 opacity-[0.02]"
            >
                {[...words, ...words, ...words, ...words].map((w, i) => (
                    <span key={i} className="text-[#062B4A] text-6xl md:text-8xl font-sans font-bold tracking-widest uppercase">
                        {w}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// ── Vertical Divider (desktop between stats) ──────────────────
function VerticalDivider({ delay }: { delay: number }) {
    return (
        <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="hidden md:block w-px bg-gradient-to-b from-transparent via-[#062B4A]/10 to-transparent self-stretch"
        />
    )
}

// ── Main Section ──────────────────────────────────────────────
const stats = [
    {
        value: 200,
        suffix: '+',
        label: 'Trusted Global Clients',
        description: 'Families and investors who chose us for life-defining decisions.',
    },
    {
        value: 27,
        suffix: '+',
        label: 'Years of Legal Mastery',
        description: 'Decades of navigating complex real estate structures with precision.',
    },
    {
        value: 25,
        suffix: '+',
        label: 'Signature Projects',
        description: 'Landmark developments that have shaped skylines and communities.',
    },
]

export default function StatsSection() {
    return (
        <section
            id="global"
            className="relative py-24 md:py-40 px-6 md:px-12 bg-white overflow-hidden border-b border-[#062B4A]/10"
        >
            {/* Background scrolling ticker */}
            <BackgroundTicker />

            {/* Ambient top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#062B4A]/10 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-[1600px] mx-auto">

                {/* Eyebrow label */}
                <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.5em' }}
                    whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#062B4A]/40 text-xs uppercase tracking-[0.2em] mb-16 md:mb-24 font-bold"
                >
                    By the Numbers
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">

                    {/* Left — Quote */}
                    <div className="md:col-span-4 flex items-end pb-8">
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[#062B4A]/70 font-serif italic text-2xl md:text-3xl max-w-xs leading-snug"
                        >
                            Building legacy through precision and architectural foresight.
                        </motion.p>
                    </div>

                    {/* Right — Stats */}
                    <div className="md:col-span-8 md:pl-24">

                        {/* Desktop: horizontal row with dividers */}
                        <div className="hidden md:flex items-start gap-0">
                            {stats.map((stat, i) => (
                                <div key={stat.label} className="flex flex-1">
                                    <div className="flex-1 px-10 first:pl-0 last:pr-0">
                                        <StatItem {...stat} index={i} />
                                    </div>
                                    {i < stats.length - 1 && <VerticalDivider delay={i * 0.18 + 0.3} />}
                                </div>
                            ))}
                        </div>

                        {/* Mobile: stacked grid */}
                        <div className="grid grid-cols-1 gap-12 md:hidden">
                            {stats.map((stat, i) => (
                                <div key={stat.label}>
                                    <StatItem {...stat} index={i} />
                                    {i < stats.length - 1 && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3, duration: 0.8 }}
                                            style={{ transformOrigin: 'left' }}
                                            className="mt-12 h-px bg-[#062B4A]/10"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Bottom fade line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                    className="mt-20 md:mt-32 h-px bg-gradient-to-r from-[#062B4A]/5 via-[#062B4A]/15 to-transparent"
                />
            </div>
        </section>
    )
}