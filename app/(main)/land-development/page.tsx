"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Scale, Compass, Landmark, TreePine, ShieldCheck, Quote } from "lucide-react";
import { useState } from "react";

const processSteps = [
  {
    num: "01",
    title: "Land Acquisition & Legal Clearances",
    desc: "We manage every legal aspect including land title verification, zoning compliance, and government approvals.",
    icon: <Scale className="w-8 h-8 text-[#A98B55]" />
  },
  {
    num: "02",
    title: "Site Planning & Infrastructure Design",
    desc: "Our architects and engineers create optimized layouts with proper road networks, utility lines, drainage, and green zones.",
    icon: <Compass className="w-8 h-8 text-[#A98B55]" />
  },
  {
    num: "03",
    title: "Basic Utilities",
    desc: "We construct and install water and electricity lines, preparing the land for industrial, commercial, or plotting use.",
    icon: <Landmark className="w-8 h-8 text-[#A98B55]" />
  },
  {
    num: "04",
    title: "Landscaping & Final Development",
    desc: "We enhance the site with landscaping, security provisions, and premium finishing touches to make it market-ready.",
    icon: <TreePine className="w-8 h-8 text-[#A98B55]" />
  }
];

const testimonials = [
  {
    quote: "HB Realty transformed our land in Yeola into a commercial project within months. Their advisory and liaisoning support made the entire process effortless.",
    author: "S. Patil",
    location: "Yeola, Nashik"
  },
  {
    quote: "From land acquisition to warehouse approvals, HB Realty handled it all for our project in Nashik Road. Their transparent process gave us full confidence.",
    author: "R. Mehta",
    location: "Nashik Road, Nashik"
  },
  {
    quote: "Our family’s open land in Deolali was turned into a planned layout with proper legal clearances. HB Realty managed everything on time and professionally.",
    author: "V. Deshmukh",
    location: "Deolali, Nashik"
  },
  {
    quote: "HB Realty’s team supported us in setting up an industrial warehouse in Ozar. Their expertise in legal processes and local approvals is unmatched.",
    author: "A. Kulkarni",
    location: "Ozar, Nashik"
  },
  {
    quote: "As a farmer in Niphad, I wanted to utilize my land better. HB Realty suggested a development plan and managed the paperwork, turning it into a profitable project.",
    author: "P. Joshi",
    location: "Niphad, Nashik"
  }
];

const faqs = [
  {
    q: "What types of land development projects do you handle?",
    a: "We specialize in industrial, commercial, and warehousing plot development across Maharashtra, including site planning, infrastructure setup, and legal clearances."
  },
  {
    q: "Can you assist with legal approvals for my land?",
    a: "Yes. Our in-house legal team manages title verification, zoning compliance, and all government approvals required for land development."
  },
  {
    q: "How long does a typical land development project take?",
    a: "Project timelines vary depending on land size and requirements, but most developments are completed within 3–9 months with clear milestone tracking."
  },
  {
    q: "Do you only work in certain areas of Maharashtra?",
    a: "We operate across all major growth hubs in Maharashtra including Nashik, Pune, Aurangabad, and Mumbai outskirts, as well as emerging industrial zones."
  },
  {
    q: "Can you help find buyers or tenants after development?",
    a: "Absolutely. Along with development, we also assist with marketing and leasing your plots to qualified buyers or warehouse operators."
  },
  {
    q: "What makes HB Realty different from other land developers?",
    a: "We provide end-to-end solutions, combining legal expertise, engineering excellence, and market insights to deliver projects on time and with higher value potential."
  }
];

export default function LandDevelopmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]/30 overflow-x-hidden pb-20">

      {/* ═══ HERO SECTION (EDITORIAL) ═══ */}
      <section className="relative h-[85vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image 
            src="/Land-Development-HBRealtyindia-min-scaled.jpg" 
            alt="Land Development in Maharashtra" 
            fill 
            className="object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite] brightness-[0.4]" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062B4A] via-[#062B4A]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-12 h-px bg-white/20 mb-8" />
            
            <h1 className="text-4xl md:text-[80px] font-medium text-white tracking-tight leading-[1] mb-8 max-w-5xl">
              Land & <br/><span className="font-medium text-[#A98B55]">Development.</span>
            </h1>
            
            <div className="pl-0 md:pl-10 border-l-0 md:border-l border-white/20">
              <p className="text-white/60 font-light text-xl md:text-2xl leading-relaxed max-w-3xl pl-0 md:pl-8 mb-12">
                Transforming Land into High-Value Assets Across Maharashtra. HB Realty’s expertise in strategic land development.
              </p>
            </div>
            
            <Link 
              href="/contact" 
              className="text-white/80 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group md:ml-[72px] w-fit"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Contact Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ INTRODUCTION (EDITORIAL) ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} 
            className="lg:col-span-5 lg:sticky lg:top-40"
          >
            <div className="w-12 h-px bg-[#062B4A]/20 mb-8" />
            <h2 className="text-4xl md:text-5xl font-medium text-[#062B4A] tracking-tight leading-[1] mb-6">
              Introduction to <br/>
              <span className="font-medium text-[#A98B55]">Land Development.</span>
            </h2>
            <p className="text-[#062B4A]/50 text-base font-light max-w-sm mb-8">
              Unlocking the true potential and appreciation of properties with precision and structured growth planning.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-4 text-[#062B4A] hover:text-[#A98B55] transition-colors duration-500 group py-2"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Contact Us</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} 
            className="lg:col-span-7 space-y-8 mt-0 lg:mt-24"
          >
            <p className="text-[#062B4A]/80 font-light text-xl md:text-2xl leading-relaxed">
              At HB Realty India, we specialize in turning potential into progress. With years of experience in Land Development in Maharashtra, we help landowners, investors, and businesses unlock the true value of their properties.
            </p>
            <p className="text-[#062B4A]/60 font-light text-lg leading-relaxed mb-12">
              From initial surveys and legal clearances to infrastructure design and final development, our team ensures every project is completed with precision, compliance, and long-term growth in mind. We streamline the entire development journey, handling the complex steps of zoning, basic utility layout, and landscaping so that your property delivers maximum yield.
            </p>
            
            <div className="p-8 md:p-12 bg-[#FAF9F6] border border-[#062B4A]/5 rounded-3xl mt-12">
              <h3 className="text-xl font-medium text-[#062B4A] mb-4">Ready to develop your land into a revenue-generating asset?</h3>
              <p className="text-[#062B4A]/60 font-light text-sm md:text-base leading-relaxed mb-8">
                Let our experts handle everything from legal compliance and site designs to final site delivery.
              </p>
              <Link 
                href="/contact" 
                className="bg-[#062B4A] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#A98B55] transition-all inline-flex items-center gap-4"
              >
                Contact Us Today <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROVEN PROCESS (DARK BLUE SECTION) ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-[#062B4A] text-white border-t border-b border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-3xl mb-24">
            <div className="w-12 h-px bg-white/20 mb-8" />
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Our <span className="font-medium text-[#A98B55]">Proven Process.</span>
            </h2>
            <p className="text-white/60 font-light text-lg md:text-xl leading-relaxed">
              We follow a systematic, transparent, and results-driven approach to ensure every land development project exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {processSteps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.05] transition-all group flex flex-col justify-between min-h-[280px]"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    {step.icon}
                    <span className="text-white/10 text-4xl font-bold tracking-tighter leading-none group-hover:text-white/20 transition-colors">
                      {step.num}
                    </span>
                  </div>
                  <h4 className="text-white font-medium text-lg leading-tight tracking-wide">{step.title}</h4>
                </div>
                <p className="text-white/50 text-sm font-light leading-relaxed mt-6">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US (MINIMAL IVORY SECTION) ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-[#FAF9F6]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="w-12 h-px bg-[#062B4A]/20 mb-8" />
              <h2 className="text-4xl md:text-5xl font-medium text-[#062B4A] tracking-tight">
                Why Choose HB Realty <br/>
                <span className="font-medium text-[#A98B55]">for Land Development.</span>
              </h2>
              <p className="text-[#062B4A]/60 text-lg font-light leading-relaxed max-w-xl">
                We handle everything from land acquisition and legal clearances to final infrastructure development, ensuring a smooth, hassle-free, and value-adding process for our clients.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-10 h-10 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#A98B55]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[#062B4A] font-medium tracking-wide text-sm">End-to-End Project Accountability</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/plot-development-.jpg" 
                alt="Why Choose HB Realty" 
                fill 
                className="object-cover brightness-95" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS (REAL EXPERIENCES) ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-24">
            <div className="w-12 h-px bg-[#062B4A]/20 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-medium text-[#062B4A] tracking-tight mb-6">
              What Our <span className="font-medium text-[#A98B55]">Clients Say.</span>
            </h2>
            <p className="text-[#062B4A]/50 text-lg font-light max-w-xl mx-auto">
              Real experiences from landowners, investors, and partners across Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 md:p-10 border border-[#062B4A]/5 bg-[#FAF9F6] hover:bg-white hover:shadow-xl hover:border-[#062B4A]/10 transition-all rounded-3xl flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-[#A98B55]/30 group-hover:text-[#A98B55] transition-colors" />
                  <p className="text-[#062B4A]/70 font-light leading-relaxed text-base italic">"{t.quote}"</p>
                </div>
                <div className="pt-8 border-t border-[#062B4A]/5 mt-8">
                  <h4 className="text-[#062B4A] font-medium text-sm mb-1">{t.author}</h4>
                  <p className="text-[#A98B55] text-[10px] uppercase tracking-[0.2em] font-medium">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION (DARK ACCORDION) ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-[#062B4A] text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Frequently Asked <span className="font-medium text-[#A98B55]">Questions.</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
              We’ve answered some of the most common queries from clients seeking land development experts in Nashik, warehousing consultants in Maharashtra, and real estate legal consultancy services.
            </p>
          </div>

          <div className="space-y-0 divide-y divide-white/10">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-8 flex items-center justify-between text-left"
                >
                  <h4 className="text-white font-medium tracking-wide pr-8 group-hover:text-[#A98B55] transition-colors">{faq.q}</h4>
                  <ChevronDown className={`text-white/30 transition-transform duration-500 ${openFaq === i ? "rotate-180 text-[#A98B55]" : ""}`} size={20} strokeWidth={1.5} />
                </button>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
                    className="pb-8 text-white/50 font-light leading-relaxed max-w-3xl text-sm md:text-base"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PREMIUM CALL TO ACTION ═══ */}
      <section className="relative py-32 px-6 md:px-12 bg-[#062B4A] text-white">
        <div className="max-w-[1600px] mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-px bg-white/20 mb-8" />
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Unlock the Real Value <br/>
            <span className="font-medium text-[#A98B55]">of Your Land.</span>
          </h2>
          <p className="text-white/60 font-light text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            From legal clearances to site layouts, basic utilities, and landscaping, we manage the entire land development cycle with transparency and efficiency.
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-[#062B4A] px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#FAF9F6] hover:text-[#A98B55] transition-all inline-flex items-center gap-4 shadow-xl"
          >
            Start Your Project Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ LEGAL & DUBAI CTA (COMBINED PROMOS) ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-[#062B4A]/10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start border-l border-[#062B4A]/10 pl-8 md:pl-12"
          >
            <span className="text-[#062B4A]/40 text-[10px] font-medium uppercase tracking-[0.4em] block mb-6">Legal Advisory by Adv. Manoj Bafana</span>
            <h3 className="text-3xl md:text-4xl font-medium text-[#062B4A] tracking-tight mb-6 leading-[1.1]">
              Complete legal support for <span className="font-medium text-[#A98B55]">real estate.</span>
            </h3>
            <p className="text-[#062B4A]/60 font-light mb-12 max-w-md text-sm md:text-base leading-relaxed">
              27+ Years of Trusted Legal Expertise in Land, Revenue & Real Estate Law Led by Adv. Manoj Bafana, our legal division provides solid, reliable, and expert-backed support for all your real estate, land development, and industrial legal matters ensuring full compliance and peace of mind.
            </p>
            <Link 
              href="/contact" 
              className="text-[#062B4A] hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Visit Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start border-l border-[#062B4A]/10 pl-8 md:pl-12"
          >
            <span className="text-[#062B4A]/40 text-[10px] font-medium uppercase tracking-[0.4em] block mb-6">Explore Strategic Growth</span>
            <h3 className="text-3xl md:text-4xl font-medium text-[#062B4A] tracking-tight mb-6 leading-[1.1]">
              Your gateway to global <span className="font-medium text-[#A98B55]">opportunities.</span>
            </h3>
            <p className="text-[#062B4A]/60 font-light mb-12 max-w-md text-sm md:text-base leading-relaxed">
              Explore Strategic Growth with Sanghavi & Bafana (Dubai). Partnering with us means more than local excellence you also gain access to global real estate acumen through Sanghavi & Bafana Consultants in Dubai. Specializing in business formation, financial advisory, and regulatory structuring across the UAE, they’re your strategic allies for cross-border success.
            </p>
            <Link 
              href="/contact" 
              className="text-[#062B4A] hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Visit Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
