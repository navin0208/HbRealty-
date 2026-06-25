"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, FileText, User, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export default function AdminBlogForm({ initialData }: { initialData?: Blog }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    let imageUrl = formData.get("image") as string;
    const imageFile = formData.get("imageFile") as File;

    if (imageFile && imageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      
      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageUrl = url;
        } else {
          setStatus("error");
          setMessage("Failed to upload image.");
          return;
        }
      } catch (err) {
        setStatus("error");
        setMessage("Error uploading image.");
        return;
      }
    }

    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      image: imageUrl,
      content: formData.get("content"),
    };

    const isEditing = !!initialData;
    const url = isEditing ? `/api/blogs/${initialData.id}` : "/api/blogs";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setMessage(`Blog ${isEditing ? 'updated' : 'published'} successfully!`);
        if (!isEditing) {
          (e.target as HTMLFormElement).reset();
        }
      } else {
        const errorData = await res.json();
        setStatus("error");
        setMessage(errorData.error || "Failed to save blog.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border border-[#062B4A]/10 p-12 rounded-[30px] flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto w-full shadow-[0_20px_50px_rgba(6,43,74,0.05)]">
        <div className="w-20 h-20 bg-[#A98B55]/10 text-[#A98B55] rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-medium text-[#062B4A] tracking-tight">Blog Saved</h3>
        <p className="text-[#062B4A]/60 font-light text-lg">{message}</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
          <button 
            onClick={() => setStatus("idle")}
            className="px-8 py-3.5 bg-[#FAF9F6] text-[#062B4A] border border-[#062B4A]/10 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#062B4A]/5 transition-colors"
          >
            {initialData ? 'Continue Editing' : 'Write Another Blog'}
          </button>
          <Link 
            href="/admin/blogs"
            className="px-8 py-3.5 bg-[#A98B55] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[#A98B55]/90 transition-colors inline-block"
          >
            Go to Blog Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#062B4A]/10 p-8 md:p-12 rounded-[30px] max-w-4xl mx-auto w-full relative overflow-hidden shadow-[0_20px_50px_rgba(6,43,74,0.05)]">
      <div className="relative z-10 mb-10">
        <h3 className="text-3xl md:text-5xl font-medium text-[#062B4A] tracking-tight mb-4">{initialData ? 'Edit Blog' : 'Write Blog'}</h3>
        <p className="text-[#062B4A]/60 font-light text-sm md:text-base">
          {initialData ? 'Update your blog details below.' : 'Share your knowledge and updates with the community.'}
        </p>
      </div>

      {status === "error" && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        
        <div className="space-y-2">
          <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><FileText size={12} /> Blog Title</label>
          <input required type="text" name="title" defaultValue={initialData?.title} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="e.g. Market Trends 2026" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><User size={12} /> Author</label>
            <input required type="text" name="author" defaultValue={initialData?.author} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="e.g. Hitesh Bhutda" />
          </div>
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Cover Image</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="file" 
                name="imageFile" 
                accept="image/*"
                className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3 text-[#062B4A] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-[#062B4A]/10 file:text-[#062B4A] hover:file:bg-[#062B4A]/20 cursor-pointer" 
              />
              <div className="flex items-center text-[#062B4A]/30 text-[10px] font-bold uppercase tracking-widest px-2 whitespace-nowrap">OR URL</div>
              <input type="url" name="image" defaultValue={initialData?.image} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30" placeholder="https://..." />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[#062B4A]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><FileText size={12} /> Content</label>
          <textarea required name="content" defaultValue={initialData?.content} rows={12} className="w-full bg-[#FAF9F6] border border-[#062B4A]/10 rounded-xl px-4 py-3.5 text-[#062B4A] focus:outline-none focus:border-[#062B4A]/40 transition-colors placeholder:text-[#062B4A]/30 resize-y" placeholder="Write your blog content here..." />
        </div>
        
        <button 
          disabled={status === "loading"}
          type="submit" 
          className="w-full bg-[#062B4A] text-white font-bold uppercase tracking-[0.2em] text-[10px] py-5 rounded-xl hover:bg-[#062B4A]/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {status === "loading" ? "Saving..." : (
            <>{initialData ? 'Update Blog' : 'Publish Blog'} <Send size={14} /></>
          )}
        </button>

      </form>
    </div>
  );
}
