"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, Shield, ExternalLink, RefreshCw, AlertCircle, FileText, Calendar, Edit, Building2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export default function AdminBlogsDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Unable to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setActionId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete blog");
      
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setActionId(null);
    }
  };

  const totalBlogs = blogs.length;

  return (
    <main className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#062B4A] selection:text-white text-[#062B4A]">
      
      {/* ═══ ADMIN NAVBAR ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#062B4A]/10 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#062B4A] flex items-center justify-center text-white">
                <Shield size={16} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#062B4A]">HB Realty Admin</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2 border-l border-[#062B4A]/10 pl-6">
              <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg text-[#062B4A]/60 hover:bg-[#062B4A]/5 transition-colors">Properties</Link>
              <Link href="/admin/blogs" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg bg-[#062B4A]/5 text-[#062B4A] transition-colors">Blogs</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/blog" 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#062B4A]/60 hover:text-[#062B4A] transition-colors"
            >
              Public Blog <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto space-y-12">
        
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#062B4A]/10 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#062B4A]/10 border border-[#062B4A]/20 px-3 py-1 rounded-full text-[#062B4A] text-[9px] font-bold uppercase tracking-widest">
              Content Management
            </div>
            <h1 className="text-4xl md:text-[54px] font-medium tracking-tight leading-none text-[#062B4A]">
              Blog <span className="font-serif italic text-[#A98B55]">Console</span>
            </h1>
            <p className="text-[#062B4A]/60 font-light text-base max-w-xl">
              Write, edit, and publish articles to your website's blog. Share market trends, company news, and insights.
            </p>
          </div>
          <Link
            href="/admin/blogs/add"
            className="inline-flex items-center gap-3 bg-[#062B4A] text-white hover:bg-[#062B4A]/90 transition-colors font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-4 rounded-xl shadow-lg shadow-[#062B4A]/10"
          >
            <Plus size={14} /> Write Post
          </Link>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#062B4A]/10 p-6 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(6,43,74,0.02)]">
            <span className="text-[#062B4A]/40 text-[10px] font-bold uppercase tracking-wider">Total Published</span>
            <span className="text-4xl font-light text-[#062B4A] mt-4">{loading ? "..." : totalBlogs}</span>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <p>{error}</p>
            <button onClick={fetchBlogs} className="ml-auto text-xs font-bold underline uppercase tracking-wider flex items-center gap-1.5 hover:text-red-950">
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {/* Listings Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-[#062B4A]/10 border-t-[#062B4A] animate-spin" />
            <span className="text-xs uppercase tracking-widest text-[#062B4A]/50">Loading articles...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#062B4A]/10 rounded-[30px] flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#062B4A]/40">
              <FileText size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-[#062B4A]">No Articles Found</h3>
              <p className="text-[#062B4A]/60 font-light text-sm max-w-sm">The blog database is currently empty. Get started by writing your first post.</p>
            </div>
            <Link
              href="/admin/blogs/add"
              className="inline-flex items-center gap-2 bg-[#062B4A] text-white hover:bg-[#062B4A]/90 transition-colors font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-3.5 rounded-xl"
            >
              Write Post
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-[#062B4A]/10 rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(6,43,74,0.03)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#062B4A]/10 bg-[#062B4A]/5 text-[#062B4A]/60 text-[10px] font-bold uppercase tracking-widest">
                    <th className="py-5 px-6">Cover</th>
                    <th className="py-5 px-6">Title & Author</th>
                    <th className="py-5 px-6">Date</th>
                    <th className="py-5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#062B4A]/5">
                  {blogs.map((b) => {
                    const isUpdating = actionId === b.id;
                    return (
                      <tr key={b.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-zinc-100 border border-[#062B4A]/10 shadow-inner">
                            <Image 
                              src={b.image} 
                              alt={b.title} 
                              fill 
                              className="object-cover" 
                              unoptimized
                            />
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-md">
                          <div className="font-medium text-[#062B4A] truncate" title={b.title}>{b.title}</div>
                          <div className="flex items-center gap-1 text-[#062B4A]/40 text-xs font-mono mt-1">
                            <span>By {b.author}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-xs font-light text-[#062B4A]/80">
                            <Calendar size={12} className="text-[#062B4A]/40" />
                            {new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link
                              href={`/admin/blogs/edit/${b.id}`}
                              className="p-2 border border-[#062B4A]/20 hover:border-[#062B4A] hover:bg-[#062B4A] text-[#062B4A]/80 hover:text-white rounded-lg transition-colors"
                              title="Edit Blog"
                            >
                              <Edit size={14} />
                            </Link>
                            <button
                              disabled={isUpdating}
                              onClick={() => handleDelete(b.id, b.title)}
                              className="p-2 border border-red-200 hover:border-red-500 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete Blog"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
