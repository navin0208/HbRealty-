"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, ThermometerSnowflake, Truck, Scale, ChevronDown } from "lucide-react";
import { useState } from "react";

const services = [
  {
    title: "Industrial Shed Construction in Nashik",
    desc: "Custom-designed facilities built to optimize storage, operations, and safety. We handle every stage: planning, permissions, and construction.",
    icon: <Building2 className="w-8 h-8" />,
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Industrial Shed Leasing & Sales",
    desc: "Get access to premium ready-to-use industrial sheds or long-term industrial shed land for lease in Nashik to build your own facility.",
    icon: <ShieldCheck className="w-8 h-8" />,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cold Storage Builder",
    desc: "Specialized design and construction for temperature-controlled storage, ideal for food processing, pharma, and agriculture.",
    icon: <ThermometerSnowflake className="w-8 h-8" />,
    img: "https://images.unsplash.com/photo-1518112390430-f4ab02e9c2c8?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Logistics Park Development",
    desc: "Large-scale industrial and logistics park planning with integrated industrial sheds, transport access, and utilities in Maharashtra.",
    icon: <Truck className="w-8 h-8" />,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Land Development & Legal Liaisoning",
    desc: "From land identification to government clearances, our legal team ensures a smooth setup process for all industrial shed projects.",
    icon: <Scale className="w-8 h-8" />,
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
  }
];

const testimonials = [
  {
    text: "HB Realty developed our plot in Chandwad into a proper industrial layout. Their end-to-end support with legal approvals saved us months of effort.",
    name: "Amit Khanna",
    location: "Chandwad, Nashik"
  },
  {
    text: "Our industrial shed project in Trimbak was completed on schedule with HB Realty's guidance. Their liaisoning and advisory services were truly professional.",
    name: "Neha Desai",
    location: "Trimbak, Nashik"
  },
  {
    text: "We partnered with HB Realty for a project in Lasalgaon. Their knowledge of legal procedures and development standards was a huge advantage for us.",
    name: "Prakash Bhosale",
    location: "Lasalgaon, Nashik"
  },
  {
    text: "Our commercial land in Manmad is now fully utilized thanks to HB Realty. Their advisory team provided excellent guidance and managed approvals smoothly.",
    name: "Mehul Shah",
    location: "Manmad, Nashik"
  },
  {
    text: "Professional, responsive, and highly skilled – the best choice for industrial shed construction and logistics park development in Maharashtra.",
    name: "Sneha Patil",
    location: "Peth, Nashik"
  }
];

const faqs = [
  {
    q: "What industrial shed services do you provide in Nashik?",
    a: "We offer end-to-end Industrial Shed Development Services in Nashik, including construction, leasing, cold storage setup, and facility management for various industries."
  },
  {
    q: "Do you handle industrial shed construction in Nashik?",
    a: "Yes. We specialize in industrial shed construction in Nashik, delivering custom-built facilities designed for logistics, manufacturing, e-commerce, and more."
  },
  {
    q: "Can I lease industrial shed land in Nashik through HB Realty?",
    a: "Absolutely. We provide premium industrial shed land for lease in Nashik as well as ready-to-use industrial shed spaces in prime industrial zones."
  },
  {
    q: "Do you only work in certain areas of Maharashtra?",
    a: "We operate across all major growth hubs in Maharashtra including Nashik, Pune, Aurangabad, and Mumbai outskirts, as well as emerging industrial zones."
  },
  {
    q: "How do I choose the right industrial shed location in Nashik?",
    a: "Our team assesses your operational needs, industry type, and transport access to recommend the best industrial shed options in Nashik for your business."
  },
  {
    q: "Can you manage legal clearances for industrial sheds?",
    a: "Yes. We handle all permissions, government clearances, and compliance required for smooth industrial shed setup in Maharashtra."
  }
];

export default function WarehousingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#031525] font-sans selection:bg-white text-[#062B4A]/30 selection:text-white overflow-x-hidden pb-20">

      {/* ═══ HERO SECTION (EDITORIAL) ═══ */}
      <section className="relative h-[85vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
            alt="Industrial Shed Nashik" fill className="object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite] grayscale-[20%]" priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="w-12 h-px bg-white/20 mb-8" />
            
            <h1 className="text-4xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9] mb-8 max-w-5xl">
              Industrial Sheds & <span className="font-medium text-[#A98B55]">land development.</span>
            </h1>
            
            <div className="pl-0 md:pl-10 border-l-0 md:border-l border-white/20">
              <p className="text-white/50 font-light text-xl leading-relaxed max-w-2xl pl-0 md:pl-8 mb-12">
                From industrial shed construction in Nashik to cold storage facilities and logistics park development across Maharashtra, we deliver end-to-end solutions for your industrial and storage needs.
              </p>
            </div>
            
            <Link href="/contact" className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group md:ml-[72px]">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Contact Us</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ INTRODUCTION (EDITORIAL) ═══ */}
      <section className="relative py-16 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 lg:sticky lg:top-40">
            <div className="w-12 h-px bg-white/20 mb-8" />
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1] mb-8">
              Trusted <br/>
              <span className="font-medium text-[#A98B55]">development.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 space-y-8 mt-0 md:mt-24">
            <p className="text-white/60 font-light text-xl leading-relaxed">
              At HB Realty India, we specialize in <strong className="text-white font-medium">Industrial Shed Development Services in Nashik</strong> providing businesses with strategically located facilities, legal compliance support, and turnkey construction solutions.
            </p>
            <p className="text-white/50 font-light text-lg leading-relaxed mb-12">
              As a leading industrial developer in Maharashtra, we help clients secure industrial shed land for lease in Nashik, build custom storage facilities, and develop large-scale logistics parks tailored to industry demands. From concept to completion, our expert team ensures your industrial shed project is delivered on time, within budget, and in full compliance with local regulations.
            </p>
            <Link href="/contact" className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group w-fit">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Talk to Nashik's Experts</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICES CARDS (MINIMAL) ═══ */}
      <section className="relative py-16 px-6 md:px-12 bg-[#041D34] border-t border-b border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24 border-b border-white/5 pb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
              Our <span className="font-medium text-[#A98B55]">Services</span>
            </h2>
            <p className="text-white/40 text-lg font-light max-w-md">Comprehensive solutions covering every aspect of industrial shed and industrial land development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-12 md:gap-y-20">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <div className="relative h-[300px] md:h-[400px] w-full mb-8 overflow-hidden">
                  <Image src={service.img} alt={service.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[20s] ease-out group-hover:scale-105" />
                  </div>
                
                <h3 className="text-2xl font-medium text-white tracking-tight mb-4 group-hover:text-[#A98B55]/80 transition-colors">{service.title}</h3>
                <p className="text-white/40 font-light text-base leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS (EDITORIAL) ═══ */}
      <section className="relative py-16 px-6 md:px-12 max-w-[1600px] mx-auto overflow-hidden">
        <div className="text-center mb-20 relative z-10">
          <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6">
            Client <span className="font-medium text-[#A98B55]">testimonials.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10 border border-white/5 group hover:border-white/10 transition-colors"
            >
              <p className="text-white/60 font-light leading-relaxed mb-8 text-base">"{t.text}"</p>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">{t.name}</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ SECTION (MINIMAL) ═══ */}
      <section className="relative py-16 px-6 md:px-12 bg-[#041D34] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-12 h-px bg-white/20 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6">Frequently asked <span className="font-medium text-[#A98B55]">questions.</span></h2>
          </div>

          <div className="space-y-0 divide-y divide-white/5">
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
                  <h4 className="text-white font-medium tracking-wide pr-8 group-hover:opacity-70 transition-opacity">{faq.q}</h4>
                  <ChevronDown className={`text-white/30 transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} size={20} strokeWidth={1} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="pb-8 text-white/50 font-light leading-relaxed max-w-2xl">
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PREMIUM CALL TO ACTION ═══ */}
      <section className="relative py-16 px-6 md:px-12 bg-[#FAF9F6] text-[#062B4A]">
        <div className="max-w-[1600px] mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-px bg-[#062B4A]/25 mb-8" />
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Ready to Build Your <br/>
            <span className="font-medium text-[#A98B55]">Next Industrial Shed Project?</span>
          </h2>
          <p className="text-[#062B4A]/60 font-light text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Partner with Maharashtra's leading industrial shed consultants and developers. Let our experts assist you with customized construction, leasing options, and complete legal compliance.
          </p>
          <Link 
            href="/contact" 
            className="bg-[#062B4A] text-white px-12 py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#A98B55] transition-all inline-flex items-center gap-4 shadow-xl"
          >
            Get in Touch Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ═══ GLOBAL & LEGAL CTA (EDITORIAL) ═══ */}
      <section className="relative py-16 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start border-l border-white/5 pl-8 md:pl-12"
          >
            <span className="text-white/30 text-[10px] font-medium uppercase tracking-[0.4em] block mb-6">Legal Advisory by Adv. Manoj Bafana</span>
            <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-6 leading-[1.1]">Complete legal support for <span className="font-medium text-[#A98B55]">real estate.</span></h3>
            <p className="text-white/40 font-light mb-12 max-w-md">27+ Years of Trusted Legal Expertise in Land, Revenue & Real Estate Law ensuring full compliance and peace of mind.</p>
            <Link href="/contact" className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Consult Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start border-l border-white/5 pl-8 md:pl-12"
          >
            <span className="text-white/30 text-[10px] font-medium uppercase tracking-[0.4em] block mb-6">Explore Strategic Growth</span>
            <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-6 leading-[1.1]">Your gateway to global <span className="font-medium text-[#A98B55]">opportunities.</span></h3>
            <p className="text-white/40 font-light mb-12 max-w-md">Gain access to global real estate acumen through Sanghavi & Bafana Consultants in Dubai for strategic cross-border success.</p>
            <Link href="/contact" className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Explore Dubai</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
