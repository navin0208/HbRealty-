"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "HB Realty developed our land in Sinnar into a well-planned warehouse project. Their legal team managed all approvals smoothly, saving us both time and stress.",
    name: "Shweta Nair",
    role: "Land Development & Warehousing Consultants",
    location: "Nashik"
  },
  {
    text: "Setting up our warehouse in Satpur MIDC was hassle-free thanks to HB Realty. They managed land development and government clearances very efficiently.",
    name: "Arvind Kulkarni",
    role: "Warehousing Consultants in Maharashtra",
    location: "Satpur MIDC, Nashik"
  },
  {
    text: "My ancestral land in Igatpuri is now a revenue-generating property. HB Realty handled everything from advisory to liaisoning with full transparency.",
    name: "Meena Deshmukh",
    role: "Warehousing Consultants in Maharashtra",
    location: "Igatpuri, Nashik"
  },
  {
    text: "HB Realty turned my unused land into a fully developed industrial plot within months. Their process was transparent, and they handled every legal requirement without me having to run around.",
    name: "Rajesh Patil",
    role: "Land Owner",
    location: "Nashik"
  }
];

export default function Testimonials() {
  // We duplicate the array to create a seamless infinite scroll loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-24 bg-white overflow-hidden border-b border-[#062B4A]/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-[#A98B55]" />
          <span className="text-[#A98B55] text-[10px] font-bold uppercase tracking-[0.3em]">Client Voices</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-[#062B4A] tracking-tight">
          What Our <span className="font-serif italic font-light text-[#A98B55]">Clients Say</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden flex pb-8 pt-4">
        {/* Left and Right Gradient Masks for smooth fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((t, i) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-[#FAF9F6] border border-[#062B4A]/10 p-8 md:p-10 rounded-[30px] shadow-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="text-[#A98B55]/20 w-10 h-10 mb-6" />
                <p className="text-[#062B4A]/70 text-base md:text-lg font-light leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
              </div>
              <div className="border-t border-[#062B4A]/10 pt-6">
                <h4 className="text-[#062B4A] font-bold text-sm tracking-wide">{t.name}</h4>
                <div className="flex flex-col mt-1 space-y-1">
                  <span className="text-[#A98B55] text-[10px] font-bold uppercase tracking-widest">{t.location}</span>
                  <span className="text-[#062B4A]/40 text-xs font-medium">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
