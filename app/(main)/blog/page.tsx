"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

// Helper to calculate read time
const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        // Sort by newest first
        const sorted = data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load blogs", err);
        setLoading(false);
      });
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherPosts = posts.length > 1 ? posts.slice(1) : [];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#062B4A]/10 border-t-[#062B4A] animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]/30 overflow-x-hidden">

      {/* ═══ HEADER (EDITORIAL) ═══ */}
      <section className="relative pt-40 pb-12 px-6 md:px-12 bg-[#062B4A] border-b border-white/10">
        <div className="max-w-[1600px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40, filter: "blur(15px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-white/20 mb-8" />
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[90px] font-medium text-white tracking-tight leading-[0.9]"
              >
                Industry <span className="font-medium text-[#A98B55]">insights.</span>
              </motion.h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURED POST — CINEMATIC CARD ═══ */}
      {featuredPost && (
        <section className="relative py-8 px-6 md:px-12 max-w-[1600px] mx-auto">
          <Link href={`/blog/${featuredPost.id}`}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[500px] md:h-[600px] overflow-hidden group cursor-pointer rounded-2xl"
            >
            <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover grayscale-[30%] transition-transform duration-[20s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
            
            <div className="absolute top-8 left-8 border border-white/20 px-4 py-1.5">
              <span className="text-white/70 text-[9px] font-medium uppercase tracking-[0.3em]">Featured</span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mb-6">
                  <span className="text-white/70">Insights</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span className="flex items-center gap-2"><Clock size={12} /> {calculateReadTime(featuredPost.content)}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.1] mb-6 group-hover:text-[#A98B55]/80 transition-colors">{featuredPost.title}</h2>
                <p className="text-white/50 font-light text-lg leading-relaxed mb-8 hidden md:block max-w-xl line-clamp-3">{featuredPost.content}</p>
                <div className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Read Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                </div>
              </div>
            </div>
          </motion.div>
          </Link>
        </section>
      )}

      {/* ═══ ARTICLE GRID (MINIMAL) ═══ */}
      <section className="relative py-16 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-[#062B4A]/10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {otherPosts.map((post, i) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <motion.article 
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} 
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
                whileHover={{ y: -8 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col h-full"
              >
              <div className="relative h-[300px] w-full overflow-hidden mb-8">
                <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[10s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#062B4A]/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="flex items-center gap-4 text-[#062B4A]/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
                <span className="text-[#062B4A]/60">Insights</span>
                <div className="w-px h-3 bg-[#062B4A]/15" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <div className="w-px h-3 bg-[#062B4A]/15" />
                <span className="flex items-center gap-2"><Clock size={12} className="text-[#062B4A]/30" /> {calculateReadTime(post.content)}</span>
              </div>
              <h3 className="text-2xl font-medium text-[#062B4A] leading-[1.2] mb-4 group-hover:text-[#A98B55]/70 transition-colors tracking-tight">{post.title}</h3>
              <p className="text-[#062B4A]/50 text-base font-light leading-relaxed mb-8 flex-1 line-clamp-3">{post.content}</p>
              <div className="text-[#062B4A]/50 group-hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 mt-auto">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Read Article</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
              </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA (EDITORIAL) ═══ */}
      <section className="relative py-16 bg-[#062B4A] text-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative py-16 md:py-12"
          >
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.div initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="h-px bg-white/20 mx-auto mb-10" />
              <motion.h3 
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-8"
              >
                Stay <span className="font-medium text-[#A98B55]">informed.</span>
              </motion.h3>
              <p className="text-white/50 font-light text-lg mb-16 leading-relaxed">Get the latest insights on land development, warehousing, and real estate delivered to your inbox.</p>
              
              <div className="flex flex-col md:flex-row items-end justify-center gap-6 max-w-lg mx-auto">
                <div className="flex-1 w-full text-left">
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] block mb-3 pl-2">Email Address</label>
                  <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white text-base focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/20" />
                </div>
                <button className="text-white/50 hover:text-[#A98B55] transition-colors duration-500 flex items-center gap-4 group pb-3 border-b border-transparent">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Subscribe</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform ease-cinematic" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
