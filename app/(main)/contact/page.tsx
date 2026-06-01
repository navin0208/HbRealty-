"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Send, ArrowRight, Clock, Globe2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#031525] font-sans selection:bg-white text-[#062B4A]/30 selection:text-white overflow-x-hidden">

      {/* ═══ CINEMATIC HERO (EDITORIAL) ═══ */}
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact HB Realty" 
            fill 
            className="object-cover grayscale-[30%]"
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="w-12 h-px bg-white/20 mb-8" />
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]"
              >
                Let&apos;s start <br/>
                <span className="font-serif italic text-white/50 pl-0 md:pl-24">building.</span>
              </motion.h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT GRID (MINIMAL) ═══ */}
      <section className="relative py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left — Office Info Cards */}
          <div className="lg:col-span-5 space-y-16 lg:sticky lg:top-40">
            {/* India HQ */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <span className="text-white/30 font-serif italic text-sm">HQ</span>
                <div className="h-px w-8 bg-white/20" />
                <span className="text-white/70 text-[10px] font-medium uppercase tracking-[0.2em]">India Headquarters</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight">Nashik, Maharashtra</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-white/30 shrink-0 mt-1" />
                  <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">Office no 501, Samrat Qubism, Gangapur road, near Veg Aroma Hotel, Nashik, Maharashtra 422013</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-white/30 shrink-0" />
                  <p className="text-white font-medium tracking-wide">+91 91758 48355</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-white/30 shrink-0" />
                  <p className="text-white font-medium tracking-wide">info@hbrealtyindia.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={16} className="text-white/30 shrink-0" />
                  <p className="text-white/60 text-sm font-light">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Osiyan Warehouse */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 pt-8 border-t border-white/5"
            >
              <div className="flex items-center gap-4 pb-2">
                <span className="text-white/30 text-[10px] font-medium uppercase tracking-[0.2em]">Osiyan Warehousing</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={14} className="text-white/30 shrink-0 mt-1" />
                <p className="text-white/50 text-sm font-light max-w-sm leading-relaxed">Gat.No-179/3, Kathwad Phata, Talegaon Dindori, Tal. Dindori, Dist. Nashik, Maharashtra</p>
              </div>
            </motion.div>

            {/* UAE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 pt-8 border-t border-white/5"
            >
              <div className="flex items-center gap-4 pb-2">
                <Globe2 size={14} className="text-white/30" />
                <span className="text-white/30 text-[10px] font-medium uppercase tracking-[0.2em]">UAE Advisory Division</span>
              </div>
              <h4 className="text-lg font-medium text-white tracking-wide">Sanghavi & Bafana</h4>
              <p className="text-white/50 text-sm font-light max-w-sm leading-relaxed">Dubai-based advisory for business setup, compliance, and strategic structuring across the UAE.</p>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-16 border-l border-white/5"
            >
              <div className="relative z-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-32 space-y-8">
                    <CheckCircle2 size={40} className="text-white/50" strokeWidth={1} />
                    <h3 className="text-3xl font-medium text-white tracking-tight">Message <span className="font-serif italic text-white/50">sent.</span></h3>
                    <p className="text-white/40 font-light text-lg max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group mt-8">
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Send another</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-16">
                      <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6">
                        Send an <span className="font-serif italic text-white/50">inquiry.</span>
                      </h2>
                      <p className="text-white/40 font-light text-lg max-w-md">Fill out the form below and our team will reach out to you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">First Name</label>
                          <input required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20" placeholder="John" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">Last Name</label>
                          <input required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">Email Address</label>
                          <input required type="email" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20" placeholder="john@company.com" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">Phone Number</label>
                          <input type="tel" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20" placeholder="+91 98765 43210" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">Interest</label>
                        <select className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white/50 text-base focus:outline-none focus:border-white/40 transition-colors appearance-none">
                          <option value="">Select your interest</option>
                          <option value="warehousing">Warehousing Solutions</option>
                          <option value="land">Land Development</option>
                          <option value="legal">Legal Services</option>
                          <option value="lease">Lease Advisory</option>
                          <option value="dubai">Dubai Advisory</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">Message</label>
                        <textarea required rows={4} className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors resize-none placeholder:text-white/20" placeholder="Tell us about your project requirements..." />
                      </div>
                      <button type="submit" className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group pt-8">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Send Message</span>
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ MAP EMBED SECTION ═══ */}
      <section className="relative py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-[40px] overflow-hidden border border-white/10 h-[400px] relative"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.3!2d73.7756!3d19.9986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU5JzU1LjAiTiA3M8KwNDYnMzIuMiJF!5e0!3m2!1sen!2sin!4v1" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(50%)" }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[40px]" />
        </motion.div>
      </section>

    </main>
  );
}
