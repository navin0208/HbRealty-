"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const partners = [
  { name: "Kapoor Diesels", isLink: false, url: "", logo: "/logos/KDG-Logo-Options-4.webp" },
  { name: "Maru Enterprises", isLink: false, url: "", logo: "/logos/Maru.png" },
  { name: "Ather Energy", isLink: false, url: "", logo: "/logos/ather-energy.png" }
];

export default function TrustedPartners() {
  return (
    <section className="relative py-24 md:py-32 bg-[#FAF9F6] border-y border-[#062B4A]/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#062B4A]/20" />
              <span className="text-[#062B4A]/60 text-[10px] font-bold uppercase tracking-[0.3em]">Network of Trust</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#062B4A] tracking-tight">
              Strategic <span className="font-serif italic font-normal text-[#A98B55]">Partners & Clients</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#062B4A]/60 text-base font-light max-w-md"
          >
            Collaborating with industry leaders and trusted specialists to deliver world-class developments, infrastructure, and advisory services across Maharashtra.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
          {partners.map((partner, i) => {
            const content = (
              <>
                <div className="relative w-full h-24 md:h-32 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain object-left" />
                </div>
                {partner.isLink ? (
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-auto group-hover:text-[#A98B55] transition-colors">
                    Visit Website <ExternalLink size={12} />
                  </span>
                ) : (
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-auto">
                    Trusted Client
                  </span>
                )}
              </>
            );

            const className = "group relative flex flex-col justify-center items-start p-8 md:p-12 h-[220px] md:h-[280px] rounded-[30px] border border-[#062B4A]/20 bg-[#062B4A] hover:bg-[#0a385f] transition-all duration-500 shadow-xl cursor-pointer";

            return partner.isLink ? (
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={className}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className={className}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
