"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, Scale, Briefcase, ArrowRight, CheckCircle2, Plus, Minus } from "lucide-react";

const services = [
  {
    id: "industrial-development",
    num: "01",
    title: "Industrial Sheds & Development",
    desc: "Comprehensive solutions from raw land to grade-A industrial infrastructure, ensuring quality and compliance.",
    icon: <Building2 className="w-5 h-5" />,
    accent: "Logistics Excellence",
    image: "/compressed_Warehouse p3.jpg",
    link: "/warehousing-2",
    subServices: [
      {
        title: "Industrial Shed Development",
        desc: "Modern, secure, and strategically located industrial sheds in Nashik with advanced facilities.",
        bullets: [
          "Modern infrastructure with high plinth height and wide access roads",
          "Fire-fighting systems, CCTV surveillance, and real-time inventory tracking",
          "Flexible storage space from 80,000 to 1,20,000 sq. ft.",
          "Sustainable operations with rainwater harvesting and green belt plantations"
        ]
      },
      {
        title: "Land Development",
        desc: "End-to-end land development for industrial and commercial use.",
        bullets: [
          "Site selection and layout planning",
          "Infrastructure development including drainage and utilities",
          "Greenfield and brownfield development expertise",
          "End-to-end project execution"
        ]
      },
      {
        title: "Industrial Shed Approvals & Clearances",
        desc: "Fast and reliable approvals for fire safety, environmental compliance, and operational licenses.",
        bullets: [
          "Fire safety and environmental compliance",
          "Building plan approvals",
          "Pollution control board clearances",
          "Renewal and amendment of licenses"
        ]
      }
    ]
  },
  {
    id: "land-legal",
    num: "02",
    title: "Land Legal & Consultancy",
    desc: "Complete legal, liaisoning, and consulting support across Maharashtra for risk-free investments.",
    icon: <Scale className="w-5 h-5" />,
    accent: "Legal Mastery",
    image: "/Warehouse-Legal-Clearance-min-scaled.jpg",
    link: "/land-development",
    subServices: [
      {
        title: "Land Legal Services",
        desc: "Complete legal and liaisoning support from title verification to government approvals and NOCs.",
        bullets: [
          "Title verification and due diligence",
          "Document drafting and registration support",
          "Assistance with zoning and land-use changes",
          "Liaisoning with government authorities for approvals"
        ]
      },
      {
        title: "Land Consultancy",
        desc: "Trusted land consultants providing investment insights, due diligence, and transaction support.",
        bullets: [
          "Market trends and investment analysis",
          "Project viability reports",
          "Legal and regulatory compliance checks",
          "End-to-end transaction support"
        ]
      }
    ]
  },
  {
    id: "lease-advisory",
    num: "03",
    title: "Lease & Investment Advisory",
    desc: "Expert advice and negotiation to secure the best terms and ROI for your industrial assets.",
    icon: <Briefcase className="w-5 h-5" />,
    accent: "Market Intelligence",
    image: "/Warehouse-Lease-Advisory-min-scaled.jpg",
    link: "/contact",
    subServices: [
      {
        title: "Lease Advisory",
        desc: "Expert advice and negotiation for industrial shed leasing to secure the best terms for your business.",
        bullets: [
          "Market research and rental benchmarking",
          "Lease agreement negotiation and drafting",
          "Risk assessment and due diligence",
          "Long-term lease structuring for stability"
        ]
      },
      {
        title: "Industrial Land & Asset Advisory",
        desc: "Strategic asset management and portfolio optimization across Maharashtra.",
        bullets: [
          "Strategic asset management and portfolio optimization",
          "Valuation and ROI forecasting",
          "Exit strategies and secondary market sales",
          "Joint venture structuring for developments"
        ]
      }
    ]
  }
];

function SubServiceCard({ sub, index, isDark }: { sub: typeof services[0]["subServices"][0]; index: number; isDark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl border backdrop-blur-sm transition-all duration-500 overflow-hidden group/card ${
        isDark
          ? `border-white/[0.08] ${open ? "bg-white/[0.08] shadow-[0_8px_32px_rgba(169,139,85,0.08)]" : "bg-white/[0.03] hover:bg-white/[0.06]"}`
          : `border-[#062B4A]/[0.08] ${open ? "bg-white shadow-[0_8px_40px_rgba(6,43,74,0.08)] border-[#A98B55]/20" : "bg-white/80 hover:bg-white hover:shadow-[0_4px_20px_rgba(6,43,74,0.06)]"}`
      }`}
    >
      {/* Subtle gold left accent when open */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500 ${open ? "bg-[#A98B55]" : "bg-transparent"}`} />

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left"
      >
        <div className="flex items-center gap-5 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold transition-all duration-500 ${
            isDark
              ? (open ? "bg-[#A98B55] text-white" : "bg-white/[0.06] text-[#A98B55]/80 border border-white/10")
              : (open ? "bg-[#062B4A] text-[#A98B55]" : "bg-[#062B4A]/[0.04] text-[#062B4A]/40 border border-[#062B4A]/[0.06]")
          }`}>
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="min-w-0">
            <h4 className={`text-base md:text-xl font-medium tracking-tight transition-colors duration-300 ${isDark ? "text-white" : "text-[#062B4A]"}`}>
              {sub.title}
            </h4>
            {!open && (
              <p className={`text-sm font-light mt-1.5 truncate ${isDark ? "text-white/35" : "text-[#062B4A]/35"}`}>
                {sub.desc}
              </p>
            )}
          </div>
        </div>
        <div className={`shrink-0 ml-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
          isDark
            ? (open ? "bg-[#A98B55] text-white shadow-[0_0_16px_rgba(169,139,85,0.3)]" : "bg-white/[0.06] text-white/40 border border-white/10 group-hover/card:border-white/20")
            : (open ? "bg-[#062B4A] text-white shadow-[0_0_16px_rgba(6,43,74,0.15)]" : "bg-[#062B4A]/[0.04] text-[#062B4A]/30 border border-[#062B4A]/[0.06] group-hover/card:border-[#062B4A]/15")
        }`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-7 md:pb-9 pt-0 pl-[52px] md:pl-[68px]">
              <div className={`h-px w-full mb-6 ${isDark ? "bg-gradient-to-r from-white/10 to-transparent" : "bg-gradient-to-r from-[#062B4A]/10 to-transparent"}`} />
              <p className={`text-sm md:text-[15px] font-light leading-relaxed mb-6 ${isDark ? "text-white/55" : "text-[#062B4A]/55"}`}>
                {sub.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {sub.bullets.map((bullet, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.35 }}
                    className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/[0.03]" : "hover:bg-[#062B4A]/[0.02]"}`}
                  >
                    <CheckCircle2 size={15} className="text-[#A98B55] shrink-0 mt-0.5" />
                    <span className={`text-[13px] leading-relaxed ${isDark ? "text-white/65" : "text-[#062B4A]/65"}`}>
                      {bullet}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#062B4A] selection:text-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 bg-[#062B4A] overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Decorative orb */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#A98B55]/[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-[#A98B55]/[0.04] blur-[100px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 40, filter: "blur(15px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-5xl">
            <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-gradient-to-r from-[#A98B55] to-transparent mb-8" />
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-[80px] font-medium text-white tracking-tight leading-[1] mb-8"
              >
                Our <br />
                <span className="font-medium text-[#A98B55]">Services.</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/50 text-lg md:text-2xl font-light leading-relaxed max-w-2xl"
            >
              From raw land acquisition to turnkey infrastructure and legal mastery, our services define the standard for real estate execution.
            </motion.p>

            {/* Quick service pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {services.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 text-white/60 hover:text-white transition-all duration-500 backdrop-blur-sm"
                >
                  <span className="text-[#A98B55] text-xs font-semibold">{s.num}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em]">{s.title}</span>
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ SERVICES — EACH AS A FULL SECTION ═══ */}
      {services.map((service, sIdx) => {
        const isDark = sIdx === 1;
        const bg = isDark ? "bg-[#062B4A]" : (sIdx === 2 ? "bg-[#FAF9F6]" : "bg-white");
        const mutedColor = isDark ? "text-white/50" : "text-[#062B4A]/50";

        return (
          <section
            key={service.id}
            id={service.id}
            className={`relative ${bg} overflow-hidden`}
          >
            {/* Decorative background pattern for light sections */}
            {!isDark && (
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #062B4A 1px, transparent 0)", backgroundSize: "40px 40px" }} />
            )}
            {isDark && (
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#A98B55]/[0.04] blur-[100px] pointer-events-none" />
            )}

            {/* Full-bleed image banner */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-[20s] ease-out hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')" }} />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto w-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#A98B55] text-3xl md:text-5xl font-extralight">{service.num}</span>
                    <div className="h-px w-8 md:w-16 bg-gradient-to-r from-[#A98B55]/60 to-transparent" />
                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">{service.accent}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.05]">
                    {service.title}
                  </h2>
                </motion.div>
              </div>
            </motion.div>

            {/* Content below image */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

                {/* Left — Description & CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-4 lg:sticky lg:top-32 self-start"
                >
                  {/* Icon badge */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${isDark ? "bg-[#A98B55]/10 text-[#A98B55] border border-[#A98B55]/20" : "bg-[#062B4A]/[0.04] text-[#062B4A]/60 border border-[#062B4A]/[0.08]"}`}>
                    {service.icon}
                  </div>
                  <p className={`text-lg md:text-xl font-light leading-relaxed mb-8 ${mutedColor}`}>
                    {service.desc}
                  </p>
                  <Link
                    href={service.link}
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 group ${
                      isDark
                        ? "border-white/10 text-white hover:bg-white/[0.06] hover:border-[#A98B55]/30 hover:text-[#A98B55]"
                        : "border-[#062B4A]/10 text-[#062B4A] hover:bg-[#062B4A]/[0.04] hover:border-[#A98B55]/30 hover:text-[#A98B55]"
                    }`}
                  >
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Right — Sub-service cards */}
                <div className="lg:col-span-8 space-y-4">
                  {service.subServices.map((sub, i) => (
                    <SubServiceCard key={i} sub={sub} index={i} isDark={isDark} />
                  ))}
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ DUBAI PRESENCE ═══ */}
      <section className="relative py-24 bg-[#062B4A] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" alt="Dubai Skyline" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062B4A] via-[#062B4A]/85 to-[#062B4A]/95" />
        </div>
        {/* Decorative orb */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A98B55]/[0.06] blur-[150px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-[#A98B55] to-transparent" />
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">Global Reach</span>
            </div>
            <h2 className="text-5xl md:text-[80px] font-medium text-white tracking-tight leading-[0.9] mb-6">
              Dubai <br /> <span className="font-medium text-[#A98B55]">presence.</span>
            </h2>
            <p className="text-white/50 font-light text-lg md:text-xl leading-relaxed mb-12">
              Through Sanghavi & Bafana Consultants, access Dubai business setup, compliance, and strategic structuring across the UAE.
            </p>
            <div className="flex flex-col gap-5 mb-12">
              {[
                { num: "01", label: "UAE Setup" },
                { num: "02", label: "Compliance" },
                { num: "03", label: "Advisory" },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-5 group">
                  <div className="w-8 h-8 rounded-lg bg-[#A98B55]/10 border border-[#A98B55]/20 flex items-center justify-center text-[#A98B55] text-xs font-bold group-hover:bg-[#A98B55]/20 transition-colors">{item.num}</div>
                  <span className="text-white/65 text-[12px] font-semibold uppercase tracking-[0.2em] group-hover:text-white/90 transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-[#A98B55]/30 hover:text-[#A98B55] transition-all duration-500 group w-fit">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Explore Dubai</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Right decorative card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.06]">
              <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200" alt="Dubai" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 p-5">
                  <span className="text-[#A98B55] text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Sanghavi & Bafana</span>
                  <p className="text-white/70 text-sm font-light">International consultancy and business structuring for the UAE market.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE (MINIMAL) ═══ */}
      <section className="relative py-20 px-6 md:px-12 bg-[#FAF9F6] overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #062B4A 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16 border-b border-[#062B4A]/10 pb-12"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-[#062B4A] tracking-tight">
              Why Choose <br />
              <span className="font-medium text-[#A98B55]">HB Realty?</span>
            </h2>
            <p className="text-[#062B4A]/45 text-lg font-light max-w-md md:pt-4">Delivering results that last across warehousing, land development, and legal advisory.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Experience", desc: "Years of proven expertise in land and industrial shed projects.", num: "20+" },
              { title: "Location", desc: "Strategic sites in Nashik connected to major industrial hubs.", num: "5+" },
              { title: "Compliance", desc: "Legal and liaison support to keep projects risk-free.", num: "100%" },
              { title: "Sustainability", desc: "Green practices integrated into every development.", num: "∞" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start group cursor-default p-6 md:p-8 rounded-2xl bg-white/60 border border-[#062B4A]/[0.05] hover:border-[#A98B55]/15 hover:shadow-[0_8px_30px_rgba(6,43,74,0.06)] transition-all duration-500"
              >
                <div className="text-4xl md:text-5xl font-light text-[#062B4A]/15 mb-6 group-hover:text-[#A98B55]/40 transition-colors duration-700">{item.num}</div>
                <div className="h-px w-8 bg-gradient-to-r from-[#062B4A]/15 to-transparent mb-5 group-hover:from-[#A98B55]/30 transition-all duration-700" />
                <h4 className="text-[#062B4A] font-medium text-base md:text-lg tracking-wide mb-2">{item.title}</h4>
                <p className="text-[#062B4A]/35 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
