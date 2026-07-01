"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Send, ArrowRight, Clock, Globe2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = new FormData();
    
    // Map form fields to the inquiry schema
    data.append('name', `${formData.get('firstName')} ${formData.get('lastName')}`);
    data.append('email', formData.get('email') as string);
    data.append('phone', formData.get('phone') as string);
    data.append('propertyType', formData.get('interest') as string);
    data.append('details', formData.get('message') as string);
    data.append('inquiryType', 'Contact Form');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]/30 overflow-x-hidden">

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
          <div className="absolute inset-0 bg-gradient-to-b from-[#062B4A]/90 via-[#062B4A]/20 to-transparent h-48" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 40, filter: "blur(15px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-white/20 mb-8" />
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]"
              >
                Let&apos;s start <br/>
                <span className="font-medium text-[#A98B55] pl-0 md:pl-24">building.</span>
              </motion.h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT GRID (PREMIUM BLUE) ═══ */}
      <section className="relative py-20 px-6 md:px-12 bg-[#062B4A] text-white selection:bg-white selection:text-[#062B4A]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left — Office Info Cards */}
          <div className="lg:col-span-5 space-y-16 lg:sticky lg:top-40">
            {/* India HQ */}
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <span className="text-white/40 font-light text-sm">HQ</span>
                <div className="h-px w-8 bg-white/20" />
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">India Headquarters</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight">Nashik, Maharashtra</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="text-white/40 shrink-0 mt-1" />
                  <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm">Office no 501, Samrat Qubism, Gangapur road, near Veg Aroma Hotel, Nashik, Maharashtra 422013</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-white/40 shrink-0" />
                  <p className="text-white font-bold tracking-wide">+91 91758 48355</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-white/40 shrink-0" />
                  <p className="text-white font-bold tracking-wide">info@hbrealtyindia.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock size={16} className="text-white/40 shrink-0" />
                  <p className="text-white/60 text-sm font-light">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Osiyan Warehouse */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-4 pb-2">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Osiyan Warehousing</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={14} className="text-white/40 shrink-0 mt-1" />
                <p className="text-white/60 text-sm font-light max-w-sm leading-relaxed">Gat.No-179/3, Kathwad Phata, Talegaon Dindori, Tal. Dindori, Dist. Nashik, Maharashtra</p>
              </div>
            </motion.div>

            {/* UAE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-4 pb-2">
                <Globe2 size={14} className="text-white/40" />
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">UAE Advisory Division</span>
              </div>
              <h4 className="text-lg font-medium text-white tracking-wide">Sanghavi & Bafana</h4>
              <p className="text-white/60 text-sm font-light max-w-sm leading-relaxed">Dubai-based advisory for business setup, compliance, and strategic structuring across the UAE.</p>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-16 border-l border-white/10 rounded-3xl"
            >
              <div className="relative z-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 space-y-8">
                    <CheckCircle2 size={40} className="text-white/40" strokeWidth={1} />
                    <h3 className="text-3xl font-medium text-white tracking-tight">Message <span className="font-medium text-[#A98B55]">sent.</span></h3>
                    <p className="text-white/60 font-light text-lg max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="text-white/60 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group mt-8">
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Send another</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-16">
                      <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6">
                        Send an <span className="font-medium text-[#A98B55]">inquiry.</span>
                      </h2>
                      <p className="text-white/60 font-light text-lg max-w-md">Fill out the form below and our team will reach out to you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">First Name</label>
                          <input name="firstName" required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30" placeholder="First Name" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Last Name</label>
                          <input name="lastName" required type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30" placeholder="Last Name" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Email Address</label>
                          <input name="email" required type="email" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30" placeholder="Email Address" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Phone Number</label>
                          <input name="phone" type="tel" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30" placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Interest</label>
                        <select name="interest" className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white/60 text-base focus:outline-none focus:border-white/40 transition-colors appearance-none">
                          <option value="" className="bg-[#062B4A] text-white">Select your interest</option>
                          <option value="warehousing" className="bg-[#062B4A] text-white">Warehousing Solutions</option>
                          <option value="land" className="bg-[#062B4A] text-white">Land Development</option>
                          <option value="legal" className="bg-[#062B4A] text-white">Legal Services</option>
                          <option value="lease" className="bg-[#062B4A] text-white">Lease Advisory</option>
                          <option value="dubai" className="bg-[#062B4A] text-white">Dubai Advisory</option>
                          <option value="other" className="bg-[#062B4A] text-white">Other</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Message</label>
                        <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors resize-none placeholder:text-white/30" placeholder="Tell us about your project requirements..." />
                      </div>
                      <button disabled={loading} type="submit" className="text-white/70 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group pt-8 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{loading ? "Sending..." : "Send Message"}</span>
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

      {/* ═══ MAP EMBED SECTION (LIGHT) ═══ */}
      <section className="relative py-16 bg-white text-[#062B4A]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-12 flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[#062B4A]/20" />
              <span className="text-[#062B4A]/60 text-[10px] font-bold uppercase tracking-[0.3em]">Visit Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#062B4A] leading-none">
              Our <span className="font-medium text-[#A98B55]">Location</span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-[40px] overflow-hidden border border-[#062B4A]/10 h-[400px] relative shadow-[0_30px_60px_rgba(6,43,74,0.1)]"
          >
            <iframe 
              src="https://maps.google.com/maps?q=HB+REALTY+INDIA,+Nashik&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none border border-[#062B4A]/5 rounded-[40px]" />
          </motion.div>
        </div>
      </section>

    </main>
  );
}
