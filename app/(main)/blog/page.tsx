"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "The Future of Grade-A Warehousing in Maharashtra",
    excerpt: "How modern logistics infrastructure is transforming the industrial landscape of Nashik and beyond, driving economic growth across the state.",
    date: "May 15, 2026",
    readTime: "6 min",
    category: "Insights",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
    featured: true,
  },
  {
    id: 2,
    title: "Navigating Land Legalities: A Complete Guide for Investors",
    excerpt: "Understanding title verification, NOCs, and the regulatory landscape of real estate investment in Maharashtra.",
    date: "April 22, 2026",
    readTime: "8 min",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 3,
    title: "Expanding Horizons: Setup Advisory in Dubai",
    excerpt: "Our strategic partnership with Sanghavi & Bafana opens new doors for Indian businesses entering the UAE market.",
    date: "March 10, 2026",
    readTime: "5 min",
    category: "Global",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
  {
    id: 4,
    title: "Sustainability in Industrial Development",
    excerpt: "Green practices, rainwater harvesting, and eco-conscious design principles shaping the next generation of warehouses.",
    date: "February 18, 2026",
    readTime: "4 min",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = posts.find(p => p.featured);
  const otherPosts = posts.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-[#062B4A] font-sans selection:bg-white text-[#062B4A]/30 selection:text-white overflow-x-hidden">

      {/* ═══ HEADER (EDITORIAL) ═══ */}
      <section className="relative pt-40 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <div className="w-12 h-px bg-white/20 mb-8" />
          <h1 className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]">
            Industry <span className="font-serif italic text-white/50">insights.</span>
          </h1>
        </motion.div>
      </section>

      {/* ═══ FEATURED POST — CINEMATIC CARD ═══ */}
      {featuredPost && (
        <section className="relative py-8 px-6 md:px-12 max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] md:h-[600px] overflow-hidden group cursor-pointer"
          >
            <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover grayscale-[30%] transition-transform duration-[20s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
            
            <div className="absolute top-8 left-8 border border-white/20 px-4 py-1.5">
              <span className="text-white/70 text-[9px] font-medium uppercase tracking-[0.3em]">Featured</span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mb-6">
                  <span className="text-white/70">{featuredPost.category}</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span>{featuredPost.date}</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span className="flex items-center gap-2"><Clock size={12} /> {featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.1] mb-6 group-hover:text-[#A98B55]/80 transition-colors">{featuredPost.title}</h2>
                <p className="text-white/50 font-light text-lg leading-relaxed mb-8 hidden md:block max-w-xl">{featuredPost.excerpt}</p>
                <div className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Read Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ═══ ARTICLE GRID (MINIMAL) ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {otherPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-[300px] w-full overflow-hidden mb-8">
                <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[10s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#041D34]/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="flex items-center gap-4 text-white/30 text-[10px] font-medium uppercase tracking-[0.2em] mb-5">
                <span className="text-white/50">{post.category}</span>
                <div className="w-px h-3 bg-white/20" />
                <span>{post.date}</span>
                <div className="w-px h-3 bg-white/20" />
                <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
              </div>
              <h3 className="text-2xl font-medium text-white leading-[1.2] mb-4 group-hover:text-[#A98B55]/70 transition-colors tracking-tight">{post.title}</h3>
              <p className="text-white/40 text-base font-light leading-relaxed mb-8 flex-1">{post.excerpt}</p>
              <div className="text-white/50 group-hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Read Article</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA (EDITORIAL) ═══ */}
      <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative py-24 md:py-32"
        >
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="w-12 h-px bg-white/20 mx-auto mb-10" />
            <h3 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-8">
              Stay <span className="font-serif italic text-white/50">informed.</span>
            </h3>
            <p className="text-white/40 font-light text-lg mb-16 leading-relaxed">Get the latest insights on land development, warehousing, and real estate delivered to your inbox.</p>
            
            <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-lg mx-auto">
              <div className="flex-1 w-full text-left">
                <label className="text-white/30 text-[10px] font-medium uppercase tracking-[0.2em] block mb-3 pl-2">Email Address</label>
                <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b border-white/10 px-2 py-3 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20" />
              </div>
              <button className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group pb-3 border-b border-transparent">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Subscribe</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
