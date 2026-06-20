"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, Shield, ExternalLink, RefreshCw, AlertCircle, 
  Inbox, Mail, Phone, MapPin, Building2
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function InquiriesDashboard() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // All, New, In Progress, Resolved
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInquiries(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status } : inq));
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (filter !== "All" && inq.status !== filter) return false;
    if (search && !inq.name?.toLowerCase().includes(search.toLowerCase()) && 
        !inq.email?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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
              <Link href="/admin/blogs" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg text-[#062B4A]/60 hover:bg-[#062B4A]/5 transition-colors">Blogs</Link>
              <Link href="/admin/inquiries" className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg bg-[#062B4A]/5 text-[#062B4A] transition-colors">Inquiries</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/properties" 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#062B4A]/60 hover:text-[#062B4A] transition-colors"
            >
              Public Portal <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto space-y-12">
        
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#062B4A]/10 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#A98B55]/10 border border-[#A98B55]/20 px-3 py-1 rounded-full text-[#A98B55] text-[9px] font-bold uppercase tracking-widest">
              Lead Management
            </div>
            <h1 className="text-4xl md:text-[54px] font-medium tracking-tight leading-none text-[#062B4A]">
              Inquiries <span className="font-serif italic text-[#A98B55]">Console</span>
            </h1>
            <p className="text-[#062B4A]/60 font-light text-base max-w-xl">
              Track incoming leads, update their statuses, and review submitted documents and images from clients.
            </p>
          </div>
          
          <button 
            onClick={fetchInquiries}
            className="inline-flex items-center justify-center gap-2 bg-white border border-[#062B4A]/10 text-[#062B4A] hover:bg-[#062B4A]/5 transition-colors font-bold uppercase tracking-wider text-[10px] px-4 py-3 rounded-xl shadow-sm h-fit"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#062B4A]/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#062B4A]/10 rounded-xl py-3 pl-12 pr-4 text-[#062B4A] placeholder:text-[#062B4A]/30 focus:outline-none focus:border-[#A98B55] transition-colors shadow-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {["All", "New", "In Progress", "Resolved"].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all shadow-sm ${
                  filter === status 
                    ? "bg-[#062B4A] text-white border border-[#062B4A]" 
                    : "bg-white border border-[#062B4A]/10 text-[#062B4A]/60 hover:bg-[#062B4A]/5"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Inquiries Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-[#062B4A]/10 border-t-[#A98B55] animate-spin" />
            <span className="text-xs uppercase tracking-widest text-[#062B4A]/50">Loading inquiries...</span>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#062B4A]/10 rounded-[30px] flex flex-col items-center justify-center space-y-6 shadow-[0_10px_30px_rgba(6,43,74,0.02)]">
            <div className="w-16 h-16 rounded-full bg-[#062B4A]/5 flex items-center justify-center text-[#062B4A]/40">
              <Inbox size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-[#062B4A]">No Inquiries Found</h3>
              <p className="text-[#062B4A]/60 font-light text-sm max-w-sm">No leads match your current filters. Try adjusting the search or wait for new submissions.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredInquiries.map((inq, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={inq.id}
                className="bg-white border border-[#062B4A]/10 hover:border-[#062B4A]/20 shadow-[0_10px_30px_rgba(6,43,74,0.02)] rounded-[30px] p-6 md:p-8 transition-colors flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-medium text-[#062B4A]">{inq.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#062B4A]/5 px-2.5 py-1 rounded-md text-[#062B4A]/80 border border-[#062B4A]/10">
                        {inq.inquiry_type}
                      </span>
                    </div>
                    <p className="text-[#062B4A]/40 text-xs">
                      Received {new Date(inq.created_at).toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Status Dropdown */}
                  <div className="relative">
                    <select 
                      value={inq.status}
                      onChange={(e) => updateStatus(inq.id, e.target.value)}
                      className={`bg-white border rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider focus:outline-none appearance-none cursor-pointer pr-8 shadow-sm transition-colors ${
                        inq.status === 'New' ? 'border-red-200 text-red-600 bg-red-50' :
                        inq.status === 'In Progress' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' :
                        'border-emerald-200 text-emerald-600 bg-emerald-50'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-50">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#062B4A]/10">
                  <div className="flex items-center gap-3 text-sm text-[#062B4A]/70">
                    <Mail size={16} className="text-[#A98B55]" />
                    <a href={`mailto:${inq.email}`} className="hover:text-[#062B4A] transition-colors truncate">{inq.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#062B4A]/70">
                    <Phone size={16} className="text-[#A98B55]" />
                    <a href={`tel:${inq.phone}`} className="hover:text-[#062B4A] transition-colors">{inq.phone}</a>
                  </div>
                  {(inq.location || inq.property_type) && (
                    <div className="flex items-center gap-3 text-sm text-[#062B4A]/70 md:col-span-2">
                      <MapPin size={16} className="text-[#A98B55]" />
                      <span>{inq.property_type} in {inq.location} {inq.size ? `(${inq.size})` : ''}</span>
                    </div>
                  )}
                </div>

                {/* Specific Details */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 text-sm">
                  {inq.rate && (
                    <div><span className="text-[#062B4A]/40 block text-[10px] font-bold uppercase tracking-wider mb-1">Rate</span><span className="text-[#062B4A] font-medium">{inq.rate}</span></div>
                  )}
                  {inq.highway_distance && (
                    <div><span className="text-[#062B4A]/40 block text-[10px] font-bold uppercase tracking-wider mb-1">Highway Distance</span><span className="text-[#062B4A] font-medium">{inq.highway_distance}</span></div>
                  )}
                  {inq.legal_status && (
                    <div><span className="text-[#062B4A]/40 block text-[10px] font-bold uppercase tracking-wider mb-1">Legal Status</span><span className="text-[#062B4A] font-medium">{inq.legal_status}</span></div>
                  )}
                  {inq.road_size && (
                    <div><span className="text-[#062B4A]/40 block text-[10px] font-bold uppercase tracking-wider mb-1">Road Size</span><span className="text-[#062B4A] font-medium">{inq.road_size}</span></div>
                  )}
                </div>

                {/* Message */}
                {inq.details && (
                  <div className="mb-6 bg-[#062B4A]/5 border border-[#062B4A]/5 p-4 rounded-xl text-sm text-[#062B4A]/80 leading-relaxed italic shadow-inner">
                    "{inq.details}"
                  </div>
                )}

                {/* Attachments */}
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-[#062B4A]/5">
                  {inq.document_url && (
                    <a href={inq.document_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A98B55] hover:text-white bg-[#A98B55]/10 border border-[#A98B55]/20 hover:bg-[#A98B55] px-3 py-2 rounded-lg transition-colors">
                      <ExternalLink size={14} /> Document
                    </a>
                  )}
                  {inq.image_urls && inq.image_urls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {inq.image_urls.map((url: string, index: number) => (
                         <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#062B4A]/60 hover:text-[#062B4A] bg-white border border-[#062B4A]/10 hover:border-[#062B4A]/30 hover:bg-[#062B4A]/5 px-3 py-2 rounded-lg transition-colors shadow-sm">
                           <ExternalLink size={12} /> Image {index + 1}
                         </a>
                      ))}
                    </div>
                  )}
                  {!inq.document_url && (!inq.image_urls || inq.image_urls.length === 0) && (
                    <span className="text-xs text-[#062B4A]/30 italic">No attachments provided</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
