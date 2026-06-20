"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import AdminBlogForm from "@/components/admin/AdminBlogForm";
import { supabase } from "@/lib/supabase";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
        if (error || !data) throw new Error("Failed to fetch blog");
        setBlog(data);
      } catch (err) {
        setError("Error loading blog data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#062B4A]/10 border-t-[#A98B55] animate-spin" />
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] font-sans flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-[#062B4A]">{error || "Blog not found"}</h1>
        <Link href="/admin/blogs" className="text-[#A98B55] underline">Back to Blog Dashboard</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white">
      {/* Admin Navigation Header */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#062B4A]/10 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <Link href="/admin/blogs" className="flex items-center gap-4 text-[#062B4A]/60 hover:text-[#062B4A] transition-colors group">
            <div className="w-10 h-10 rounded-full border border-[#062B4A]/10 flex items-center justify-center group-hover:bg-[#062B4A]/5 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Back to Blog Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 bg-[#A98B55]/10 border border-[#A98B55]/20 px-4 py-1.5 rounded-full">
             <Shield size={14} className="text-[#A98B55]" />
             <span className="text-[#A98B55] text-[10px] font-bold uppercase tracking-[0.4em]">Admin Access Mode</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen flex flex-col items-center justify-center">
        <AdminBlogForm initialData={blog} />
      </div>
    </main>
  );
}
