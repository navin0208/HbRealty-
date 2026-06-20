"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

export default function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        if (error || !data) throw new Error("Not found");
        setPost(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#062B4A]/10 border-t-[#062B4A] animate-spin" />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-6 text-[#062B4A]">
        <h1 className="text-4xl font-medium tracking-tight">Article not found</h1>
        <p className="text-[#062B4A]/50">The blog post you're looking for doesn't exist or was removed.</p>
        <Link href="/blog" className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-[#062B4A] pb-1 hover:text-[#A98B55] hover:border-[#A98B55] transition-colors">
          Return to Journal
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white overflow-x-hidden">
      
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] w-full flex items-end pb-12 md:pb-24 px-6 md:px-12 bg-[#06111C]">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover opacity-40" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06111C] via-[#06111C]/60 to-transparent" />
        
        <div className="relative z-10 max-w-[1000px] mx-auto w-full">
          <Link href="/blog" className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Insights</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span className="text-[#A98B55]">Insights</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><Calendar size={14} className="mb-0.5" /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-2"><Clock size={14} className="mb-0.5" /> {calculateReadTime(post.content)}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white">
              <User size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{post.author}</p>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Author</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT SECTION ═══ */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-[900px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg md:prose-xl max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-[#062B4A] prose-p:text-[#062B4A]/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-[#A98B55] prose-strong:text-[#062B4A] whitespace-pre-wrap"
        >
          {post.content}
        </motion.div>
      </section>

      {/* ═══ FOOTER CTA ═══ */}
      <section className="py-24 border-t border-[#062B4A]/10 bg-[#062B4A]/5 text-center px-6">
        <h3 className="text-2xl md:text-4xl font-medium text-[#062B4A] tracking-tight mb-6">Enjoyed this article?</h3>
        <p className="text-[#062B4A]/60 font-light max-w-lg mx-auto mb-10">Read more insights on our blog or get in touch with our team for expert real estate guidance.</p>
        <Link href="/blog" className="inline-flex items-center gap-4 bg-[#062B4A] text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#A98B55] transition-colors duration-500">
          More Articles <ArrowRight size={14} />
        </Link>
      </section>
      
    </main>
  );
}
